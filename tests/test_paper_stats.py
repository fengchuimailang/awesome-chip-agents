"""Citation identity, missing-data semantics, and shared reading-path behavior."""

import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest
from urllib.error import URLError
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import catalog
import export_site
import paper_stats
from reading_paths import load_paths

NOW = "2026-11-24T00:00:00Z"
DOI = "10.48550/arxiv.2311.04887"


class PaperStatsTests(unittest.TestCase):
    def setUp(self):
        self.meta = {"id": "example", "links": [{"kind": "paper", "url": "https://arxiv.org/abs/2311.04887v2"}]}
        self.records = [{"meta": self.meta}]
        self.work = {"id": "https://openalex.org/W123", "doi": "https://doi.org/" + DOI,
                     "title": "Example", "cited_by_count": 0, "publication_year": 2023,
                     "primary_location": {"source": {"display_name": "arXiv"}}}

    def fetch(self, url):
        self.assertEqual(parse_qs(urlparse(url).query)["filter"], ["doi:https://doi.org/" + DOI])
        return {"meta": {"count": 1}, "results": [self.work]}

    def test_exact_identifiers_and_real_zero_survive_monthly_cache(self):
        data, failures = paper_stats.refresh(self.records, {}, self.fetch, NOW)
        self.assertFalse(failures)
        self.assertEqual(data["example"]["citation_count"], 0)
        self.assertEqual(data["example"]["indexed_in"], "arXiv")
        def offline(url):
            self.fail("Fresh snapshots must not make network requests")
        cached, failures = paper_stats.refresh(self.records, data, offline, "2026-11-25T00:00:00Z")
        self.assertEqual(cached, data)
        self.assertFalse(failures)
        for link in ("https://arxiv.org/pdf/2311.04887v3.pdf", "https://doi.org/10.48550/ARXIV.2311.04887"):
            self.assertEqual(paper_stats.paper_identity({"links": [{"kind": "paper", "url": link}]}), DOI)
        self.assertIsNone(paper_stats.paper_identity({"links": [{"kind": "paper", "url": "https://example.org/Example"}]}))

    def test_failure_preserves_successful_count_date_and_input_cache(self):
        old, _ = paper_stats.refresh(self.records, {}, self.fetch, "2026-10-01T00:00:00Z")
        untouched = copy.deepcopy(old)
        def offline(url):
            raise URLError("offline")
        updated, failures = paper_stats.refresh(self.records, old, offline, NOW)
        self.assertTrue(failures)
        self.assertEqual(old, untouched)
        self.assertEqual(updated["example"]["citation_count"], 0)
        self.assertEqual(updated["example"]["fetched_at"], "2026-10-01T00:00:00Z")
        self.assertEqual(updated["example"]["last_attempt_at"], NOW)
        self.assertTrue(updated["example"]["fetch_error"])

    def test_unindexed_is_distinct_from_failed_and_zero_without_title_guessing(self):
        other = {**self.work, "doi": "https://doi.org/10.1234/unrelated", "cited_by_count": 2000}
        data, failures = paper_stats.refresh(self.records, {}, lambda _: {"results": [other]}, NOW)
        self.assertFalse(failures)
        self.assertEqual(data["example"]["status"], "not-found")
        self.assertNotIn("citation_count", data["example"])
        def offline(url):
            raise URLError("offline")
        data, failures = paper_stats.refresh(self.records, {}, offline, NOW)
        self.assertTrue(failures)
        self.assertNotIn("status", data["example"])
        self.assertNotIn("citation_count", data["example"])

    def test_source_changes_discard_old_counts_and_forced_refresh_bypasses_cache(self):
        old, _ = paper_stats.refresh(self.records, {}, self.fetch, NOW)
        fresh, failures = paper_stats.refresh(self.records, old, self.fetch, NOW, force=True)
        self.assertFalse(failures)
        self.meta["links"][0]["url"] = "https://doi.org/10.1234/changed"
        self.assertEqual(paper_stats.snapshot_for(self.meta, old), {})
        changed, _ = paper_stats.refresh(self.records, old, lambda _: {"results": []}, NOW)
        self.assertNotIn("citation_count", changed["example"])
        self.assertEqual(fresh, old)

    def test_ambiguous_invalid_and_truncated_responses_never_invent_counts(self):
        variants = [{"results": [self.work, self.work]}, {"results": [self.work], "meta": {"count": 101}},
                    {"results": [{**self.work, "primary_location": "invalid"}]}, {"results": "invalid"},
                    {"results": [{**self.work, "primary_location": {"source": {"display_name": []}}}]}]
        variants += [{"results": [{**self.work, "cited_by_count": value}]} for value in (-1, True, "12", None)]
        for payload in variants:
            with self.subTest(payload=payload):
                data, failures = paper_stats.refresh(self.records, {}, lambda _: payload, NOW)
                self.assertTrue(failures)
                self.assertNotIn("citation_count", data["example"])


class ReadingPathTests(unittest.TestCase):
    def test_shared_path_and_citation_snapshot_reach_both_languages_and_website(self):
        taxonomy, records = catalog.load_catalog()
        paths = load_paths(ROOT, records)
        papers = json.loads((ROOT / "data/paper-stats.json").read_text())
        outputs = catalog.render_all(taxonomy, records, {}, papers=papers, paths=paths)
        payload = export_site.build_payload()
        self.assertEqual(paths, payload["reading_paths"])
        for lang, filename in enumerate(("README.md", "README_zh.md")):
            home = outputs[ROOT / filename]
            for path in paths:
                self.assertIn(path["title"][lang], home)
                for step in path["steps"]:
                    self.assertIn(step["why"][lang], home)
                    self.assertIn(step["focus"][lang], home)
        for resource in payload["resources"]:
            snapshot = paper_stats.snapshot_for(resource, papers)
            if "citation_count" in snapshot:
                detail = outputs[ROOT / resource["path"]]
                self.assertIn(snapshot["url"], detail)
                self.assertIn(snapshot["fetched_at"], detail)
                self.assertEqual(resource["paper"]["citation_count"], snapshot["citation_count"])

    def test_paths_reject_missing_targets_duplicates_and_incomplete_translations(self):
        _, records = catalog.load_catalog()
        original = load_paths(ROOT, records)
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "data").mkdir()
            for change in ("unknown", "duplicate", "translation"):
                paths = copy.deepcopy(original)
                step = paths[0]["steps"][0]
                if change == "unknown":
                    step["resource"] = "not-a-record"
                elif change == "duplicate":
                    paths[0]["steps"][1]["resource"] = step["resource"]
                else:
                    step["why"] = ["English only"]
                (root / "data/reading-paths.json").write_text(json.dumps(paths))
                with self.subTest(change=change), self.assertRaises(ValueError):
                    load_paths(root, records)


if __name__ == "__main__":
    unittest.main()
