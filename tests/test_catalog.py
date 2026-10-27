"""Behavioral checks for catalog navigation and metadata refresh failures."""

import copy
import importlib.util
import json
from pathlib import Path
import re
import sys
import unittest
from urllib.error import HTTPError, URLError
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("catalog", ROOT / "scripts/catalog.py")
catalog = importlib.util.module_from_spec(spec)
spec.loader.exec_module(catalog)


class RefreshTests(unittest.TestCase):
    def setUp(self):
        self.records = [{"meta": {"links": [
            {"url": "https://github.com/author/implementation/tree/main/eval"},
            {"url": "https://github.com/author/implementation"},
            {"url": "https://github.com/author/benchmark"},
        ]}}]

    def test_repo_roots_are_deduplicated_and_each_repo_has_its_own_stats(self):
        calls = []

        def fetch(repo):
            calls.append(repo)
            return {"stargazers_count": 10 if repo.endswith("implementation") else 2,
                    "pushed_at": "2026-10-01T00:00:00Z", "full_name": repo}

        cache, failures = catalog.refresh_stats(self.records, {}, fetch, "2026-10-27T00:00:00Z")
        self.assertFalse(failures)
        self.assertCountEqual(calls, ["author/implementation", "author/benchmark"])
        self.assertEqual(cache["author/implementation"]["stars"], 10)
        self.assertEqual(cache["author/benchmark"]["stars"], 2)

    def test_partial_failure_preserves_successful_snapshot_and_collection_date(self):
        old = {"author/implementation": {
            "stars": 8, "pushed_at": "2026-09-01T00:00:00Z",
            "fetched_at": "2026-10-01T00:00:00Z",
        }}
        untouched = copy.deepcopy(old)

        def fetch(repo):
            if repo.endswith("implementation"):
                raise HTTPError("https://api.github.com", 403, "rate limited", {}, None)
            return {"stargazers_count": 2, "pushed_at": None, "full_name": repo}

        cache, failures = catalog.refresh_stats(self.records, old, fetch, "2026-10-27T00:00:00Z")
        self.assertEqual(old, untouched)
        self.assertEqual(len(failures), 1)
        snapshot = cache["author/implementation"]
        self.assertEqual(snapshot["stars"], 8)
        self.assertEqual(snapshot["fetched_at"], "2026-10-01T00:00:00Z")
        self.assertEqual(snapshot["pushed_at"], "2026-09-01T00:00:00Z")
        self.assertEqual(snapshot["last_attempt_at"], "2026-10-27T00:00:00Z")
        self.assertEqual(snapshot["fetch_error"], "HTTP 403")
        self.assertEqual(cache["author/benchmark"]["stars"], 2)
        self.assertIn("previous snapshot", " ".join(catalog.repo_cells("author/implementation", cache, 0)))

    def test_failure_without_snapshot_never_invents_zero_stars(self):
        def fetch(repo):
            raise URLError("offline")

        cache, failures = catalog.refresh_stats(self.records, {}, fetch, "2026-10-27T00:00:00Z")
        self.assertEqual(len(failures), 2)
        self.assertNotIn("stars", cache["author/implementation"])
        self.assertIn("unavailable", " ".join(catalog.repo_cells("author/implementation", cache, 0)))


class NavigationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.taxonomy, cls.records = catalog.load_catalog()
        cls.cache = json.loads((ROOT / "data/repo-stats.json").read_text())
        cls.outputs = catalog.render_all(cls.taxonomy, cls.records, cls.cache)

    def test_local_markdown_links_resolve(self):
        errors = []
        pages = dict(self.outputs)
        for name in ("CONTRIBUTING.md", "docs/migration-audit.md"):
            pages[ROOT / name] = (ROOT / name).read_text()
        for page, text in pages.items():
            # Metadata is data, not rendered Markdown.
            text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
            for link in re.findall(r"\]\(([^\s)]+)\)", text):
                if "://" in link or link.startswith("#"):
                    continue
                target = (page.parent / unquote(link.split("#")[0])).resolve()
                if target not in self.outputs and not target.exists():
                    errors.append(f"{page.relative_to(ROOT)} -> {link}")
        self.assertFalse(errors, "\n".join(errors))

    def test_primary_indexes_match_in_both_languages(self):
        for direction in self.taxonomy["directions"]:
            en = self.outputs[ROOT / "resources" / direction / "README.md"]
            zh = self.outputs[ROOT / "resources" / direction / "README_zh.md"]
            pattern = r"\*\*\[[^]]+\]\(([^)]+)\)\*\*"
            self.assertEqual(re.findall(pattern,en), re.findall(pattern,zh), direction)
            for r in self.records:
                if r["meta"]["direction"] == direction:
                    self.assertIn(catalog.resource_url(r,"../../"), en)

    def test_month_order_and_push_time_do_not_change_publication_groups(self):
        records = [{"meta":{"id":str(i),"date":d}} for i,d in enumerate(
            [None,"2025-12","2026","2026-01","2026-10-18","2026-10-01"]) ]
        self.assertEqual([r["meta"]["date"] for r in catalog.sorted_records(records)],
                         ["2026-10-18","2026-10-01","2026-01","2026","2025-12",None])
        sample = next(r for r in self.records if r["meta"]["id"] == "veri-sure")
        self.assertEqual(catalog.month(sample["meta"],0),"2026-01")
        self.assertIn("revised 2026-10-15", sample["body"])

    def test_every_tag_has_an_index_and_a_back_link(self):
        for record in self.records:
            for tag in record["meta"]["tags"]:
                index = ROOT / "resources/tags" / (tag+".md")
                self.assertIn(index, self.outputs)
                self.assertIn(catalog.resource_url(record,"../../"), self.outputs[index])

    def test_benchmark_catalog_covers_original_section_and_dataset_papers_once(self):
        indexes = [self.outputs[ROOT / "resources/benchmarks" / name]
                   for name in ("README.md", "README_zh.md")]
        pattern = r"\*\*\[[^]]+\]\(([^)]+)\)\*\*"
        paths = [re.findall(pattern, text) for text in indexes]
        self.assertEqual(paths[0], paths[1])
        self.assertEqual(len(paths[0]), len(set(paths[0])))
        for record in self.records:
            if "\n### Benchmarks and Datasets\n" in record["body"]:
                self.assertIn(catalog.resource_url(record, "../../"), paths[0])
        # A dataset published as a paper must remain discoverable here, while
        # a news announcement about future evaluations must not appear as data.
        self.assertIn("../../resources/architecture-hls-codesign/hlsfactory-agent.md", paths[0])
        self.assertIn("../../resources/architecture-hls-codesign/dpc4.md", paths[0])
        self.assertNotIn("../../resources/agent-infrastructure/mistral-nvidia-evaluation-2026.md", paths[0])
        for filename in ("README.md", "README_zh.md"):
            self.assertIn(f"resources/benchmarks/{filename}", self.outputs[ROOT / filename])


if __name__ == "__main__":
    unittest.main()
