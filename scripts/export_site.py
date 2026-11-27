#!/usr/bin/env python3
"""Export the website from the same validated records as the Markdown catalog."""

import argparse
import json
from pathlib import Path
import re
import subprocess

from catalog import ROOT, load_catalog, repositories, sorted_records
from paper_stats import paper_identity, snapshot_for
from reading_paths import load_paths
from knowledge_graph import build_graph


def repository_url(root):
    result = subprocess.run(
        ["git", "remote", "get-url", "origin"], cwd=root,
        capture_output=True, text=True, check=False,
    )
    remote = result.stdout.strip().removesuffix(".git")
    match = re.fullmatch(r"(?:https://github.com/|git@github.com:)([\w.-]+/[\w.-]+)", remote)
    return "https://github.com/" + match[1] if match else ""


def build_payload(root=ROOT):
    taxonomy, records = load_catalog(root)
    cache = json.loads((root / "data/repo-stats.json").read_text())
    usage_path = root / "data/download-stats.json"
    usage = json.loads(usage_path.read_text()) if usage_path.exists() else {}
    paper_path = root / "data/paper-stats.json"
    papers = json.loads(paper_path.read_text()) if paper_path.exists() else {}
    revision = subprocess.run(
        ["git", "rev-parse", "HEAD"], cwd=root, capture_output=True, text=True, check=False,
    ).stdout.strip()
    dirty = subprocess.run(
        ["git", "status", "--porcelain", "--", "resources", "data", "scripts"],
        cwd=root, capture_output=True, text=True, check=False,
    ).stdout.strip()
    exported = []
    for record in sorted_records(records):
        meta = record["meta"]
        descriptions = re.search(
            r"\n## English\n(.*?)\n## 简体中文\n(.*)\Z", record["body"], re.S,
        )
        if not descriptions or any(not part.strip() for part in descriptions.groups()):
            raise ValueError("Empty bilingual description: " + meta["id"])
        exported.append({
            **meta,
            "description": [part.strip() for part in descriptions.groups()],
            "path": record["path"].relative_to(root).as_posix(),
            "paper": {"doi": paper_identity(meta), **snapshot_for(meta, papers)},
            "repositories": [
                {"name": repo, **cache.get(repo.lower(), {})}
                for repo in repositories(meta)
            ],
            "downloads": [
                {"source": source, "snapshot": (
                    usage.get(meta["id"] + ":" + source["id"], {})
                    if usage.get(meta["id"] + ":" + source["id"], {}).get("source") == source else {}
                )}
                for source in meta.get("download_sources", [])
            ],
        })
    return {
        "schema_version": 1, "repository": repository_url(root),
        "revision": revision, "working_tree": bool(dirty),
        "taxonomy": taxonomy, "resources": exported, "reading_paths": load_paths(root, records),
        "graph": build_graph(root, taxonomy, exported, repository_url(root)),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "site/src/generated/catalog.json")
    args = parser.parse_args()
    payload = build_payload()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    graph = payload.pop("graph")
    args.output.with_name("graph.json").write_text(json.dumps(graph, ensure_ascii=False, indent=2) + "\n")
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print("Exported", len(payload["resources"]), "resources from the shared catalog.")


if __name__ == "__main__":
    main()
