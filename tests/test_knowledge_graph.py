"""Graph identity, evidence, temporal precision and source-failure behavior."""

from contextlib import redirect_stderr, redirect_stdout
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import export_site
import graph_sources
from knowledge_graph import build_graph, precision

NOW = "2026-11-26T00:00:00Z"
SOURCE = [{"url": "https://example.org/paper", "locator": "Author block", "kind": "primary", "retrieved_at": NOW}]


class KnowledgeGraphTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        (self.root / "data").mkdir()
        self.taxonomy = {"directions": {"rtl": ["RTL", "RTL"]}}
        self.resources = [{"id": rid, "name": rid, "title": rid, "date": "2026", "date_basis": "year-only",
                           "path": "resources/rtl/" + rid + ".md", "summary": [rid, rid], "types": ["paper"],
                           "direction": "rtl", "also_in": [], "related": ["b" if rid == "a" else "a"],
                           "links": [{"url": "https://example.org/" + rid}],
                           "repositories": [{"name": "Example/Repo" if rid == "a" else "example/repo", "pushed_at": NOW}]}
                          for rid in ("a", "b")]

    def build(self, supplement=None):
        if supplement is not None:
            (self.root / "data/knowledge-graph.json").write_text(json.dumps({"schema_version": 1, **supplement}))
        return build_graph(self.root, self.taxonomy, self.resources, "https://github.com/example/catalog")

    def test_derived_graph_deduplicates_repos_and_symmetric_links_without_inventing_people_or_dates(self):
        graph = self.build()
        repos = [n for n in graph["nodes"] if n["kind"] == "repository"]
        self.assertEqual(len(repos), 1)
        self.assertEqual(repos[0]["attributes"]["github_owner"], "Example")
        self.assertIsNone(repos[0]["date"])
        related = [e for e in graph["edges"] if e["kind"] == "RELATED_TO"]
        self.assertEqual(len(related), 1)
        self.assertEqual(len(related[0]["evidence"]), 2)
        self.assertTrue(all(e["date"] is None for e in graph["edges"]))
        self.assertFalse(any(n["kind"] == "person" for n in graph["nodes"]))
        self.assertEqual(graph, self.build())

    def test_catalog_export_covers_all_six_types_and_has_no_dangling_edges(self):
        graph = export_site.build_payload()["graph"]
        self.assertEqual(set(graph["entity_types"]), {n["kind"] for n in graph["nodes"]})
        nodes = {n["id"] for n in graph["nodes"]}
        self.assertEqual(len(nodes), len(graph["nodes"]))
        self.assertEqual(len({e["id"] for e in graph["edges"]}), len(graph["edges"]))
        for edge in graph["edges"]:
            self.assertIn(edge["source"], nodes)
            self.assertIn(edge["target"], nodes)
            self.assertTrue(edge["evidence"])
        self.assertEqual(precision("2026"), "year")
        self.assertEqual(precision("2026-11"), "month")
        with self.assertRaises(ValueError):
            precision("2026-02-30")

    def test_affiliations_require_a_paper_scope_and_evaluations_require_conditions(self):
        nodes = [{"id": "person:a", "kind": "person", "label": ["A", "A"], "evidence": SOURCE},
                 {"id": "organization:o", "kind": "organization", "label": ["O", "O"], "evidence": SOURCE}]
        affiliation = {"kind": "AFFILIATED_WITH", "source": "person:a", "target": "organization:o", "evidence": SOURCE}
        with self.assertRaisesRegex(ValueError, "scoped"):
            self.build({"nodes": nodes, "edges": [affiliation]})
        affiliation["attributes"] = {"resource": "resource:a"}
        result = self.build({"nodes": nodes, "edges": [affiliation]})
        self.assertTrue(any(e["kind"] == "AFFILIATED_WITH" for e in result["edges"]))
        comparison = {"kind": "COMPARES_WITH", "source": "resource:a", "target": "resource:b", "evidence": SOURCE}
        with self.assertRaisesRegex(ValueError, "conditions"):
            self.build({"nodes": [], "edges": [comparison]})
        comparison["attributes"] = {"conditions": "A non-bilingual string must not disappear in the inspector"}
        with self.assertRaisesRegex(ValueError, "bilingual"):
            self.build({"nodes": [], "edges": [comparison]})
        comparison["attributes"] = {"conditions": ["Same benchmark", "相同基准"]}
        comparison["evidence"] = [{**SOURCE[0], "kind": "catalog"}]
        with self.assertRaisesRegex(ValueError, "primary"):
            self.build({"nodes": [], "edges": [comparison]})

    def test_stale_extracted_identity_is_not_attached_to_a_changed_source(self):
        facts = graph_sources.author_facts({"id": "a", "date": "2026"}, '<meta name="citation_author" content="Author">', "https://old.example/paper", NOW)
        (self.root / "data/graph-sources.json").write_text(json.dumps({"schema_version": 1, "snapshots": {
            "authors:a": {"url": "https://old.example/paper", "retrieved_at": NOW, **facts}}}))
        self.assertFalse(any(n["kind"] == "person" for n in self.build()["nodes"]))


class GraphCollectorTests(unittest.TestCase):
    def test_same_name_is_scoped_by_paper_and_order_changes_keep_identity(self):
        html = '<meta name="citation_author" content="A"><meta name="citation_author" content="B">'
        first = graph_sources.author_facts({"id": "one", "date": "2024-08"}, html, SOURCE[0]["url"], NOW)
        second = graph_sources.author_facts({"id": "two", "date": "2024-08"}, html, SOURCE[0]["url"], NOW)
        self.assertNotEqual(first["nodes"][0]["id"], second["nodes"][0]["id"])
        reverse = graph_sources.author_facts({"id": "one", "date": "2024-08"}, html.replace('content="A"', 'content="TEMP"').replace('content="B"', 'content="A"').replace('content="TEMP"', 'content="B"'), SOURCE[0]["url"], NOW)
        self.assertEqual(first["nodes"][0]["id"], reverse["nodes"][1]["id"])

    def test_personal_github_account_is_not_inferred_to_be_a_person(self):
        payload = {"full_name": "a/repo", "owner": {"login": "a", "type": "User", "id": 1}}
        self.assertEqual(graph_sources.owner_facts("a/repo", payload, NOW), {"nodes": [], "edges": []})
        payload["full_name"] = "new-owner/repo"
        with self.assertRaises(ValueError):
            graph_sources.owner_facts("a/repo", payload, NOW)

    def test_provider_failure_keeps_last_successful_evidence_and_reports_failure(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "sources.json"
            previous = {"schema_version": 1, "snapshots": {"authors:one": {
                "url": "https://arxiv.org/abs/2408.08927", "retrieved_at": NOW, "nodes": [], "edges": []}}}
            path.write_text(json.dumps(previous))
            record = {"meta": {"id": "one", "links": [{"url": previous["snapshots"]["authors:one"]["url"]}]}}
            with patch.object(sys, "argv", ["graph_sources.py", "--resource", "one", "--output", str(path), "--force"]), \
                 patch.object(graph_sources, "load_catalog", return_value=({}, [record])), \
                 patch.object(graph_sources, "repositories", return_value=[]), \
                 patch.object(graph_sources, "fetch", side_effect=OSError("offline")), \
                 redirect_stdout(io.StringIO()), redirect_stderr(io.StringIO()):
                self.assertTrue(graph_sources.main())
            self.assertEqual(json.loads(path.read_text()), previous)

    def test_budget_expiry_preserves_evidence_and_reports_remaining_work(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "sources.json"
            previous = {"schema_version": 1, "snapshots": {"authors:one": {
                "url": "https://arxiv.org/abs/2408.08927", "retrieved_at": NOW, "nodes": [], "edges": []}}}
            path.write_text(json.dumps(previous))
            record = {"meta": {"id": "one", "links": [{"url": previous["snapshots"]["authors:one"]["url"]}]}}
            with patch.object(sys, "argv", ["graph_sources.py", "--resource", "one", "--output", str(path), "--force", "--max-seconds", "1"]), \
                 patch.object(graph_sources, "load_catalog", return_value=({}, [record])), \
                 patch.object(graph_sources, "repositories", return_value=[]), \
                 patch.object(graph_sources.time, "monotonic", side_effect=[0, 2]), \
                 patch.object(graph_sources, "fetch") as fetch, \
                 redirect_stdout(io.StringIO()), redirect_stderr(io.StringIO()):
                self.assertTrue(graph_sources.main())
                fetch.assert_not_called()
            self.assertEqual(json.loads(path.read_text()), previous)
