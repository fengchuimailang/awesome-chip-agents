#!/usr/bin/env python3
"""Explicitly refresh arXiv author and GitHub organization-owner graph evidence."""

import argparse
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.request import Request, urlopen

from catalog import ROOT, load_catalog, repositories


class ArxivMetadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.authors = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name") == "citation_author" and attrs.get("content", "").strip():
            self.authors.append(attrs["content"].strip())


def author_facts(meta, html, url, now):
    parser = ArxivMetadata()
    parser.feed(html)
    if not parser.authors:
        raise ValueError("No arXiv citation_author metadata")
    if len(set(parser.authors[:3])) != len(parser.authors[:3]):
        raise ValueError("Same-name authors in one paper require explicit identity review")
    source = [{"url": url, "locator": "citation_author (first three names in source order)",
               "kind": "primary", "retrieved_at": now}]
    nodes, edges = [], []
    for order, name in enumerate(parser.authors[:3], 1):
        # Names are not globally unique. Keep identities scoped until an ORCID/verified mapping exists.
        key = "person:" + meta["id"] + ":" + hashlib.sha256(name.encode()).hexdigest()[:12]
        nodes.append({"id": key, "kind": "person", "label": [name, name], "recorded_at": now,
                      "attributes": {"identity_scope": "resource:" + meta["id"], "author_position": order,
                                     "listed_authors": len(parser.authors)}, "evidence": source})
        edges.append({"kind": "AUTHOR_OF", "source": key, "target": "resource:" + meta["id"],
                      "date": None, "recorded_at": now, "evidence": source})
    return {"nodes": nodes, "edges": edges}


def owner_facts(name, payload, now):
    if payload.get("full_name", "").lower() != name.lower():
        raise ValueError("Repository identity changed; review the canonical URL before refreshing")
    owner = payload.get("owner", {})
    if owner.get("type") != "Organization":
        # A GitHub User account is not sufficient evidence for a real person's identity.
        return {"nodes": [], "edges": []}
    login, owner_id = owner["login"], owner["id"]
    source = [{"url": "https://api.github.com/repos/" + name,
               "locator": "owner.id / owner.login / owner.type", "kind": "primary", "retrieved_at": now}]
    key = "organization:github:" + str(owner_id)
    return {"nodes": [{"id": key, "kind": "organization", "label": [login, login], "recorded_at": now,
                       "attributes": {"github": login, "url": "https://github.com/" + login,
                                      "organization_kind": "github-organization"}, "evidence": source}],
            "edges": [{"kind": "OWNED_BY", "source": "repository:" + name.lower(), "target": key,
                       "recorded_at": now, "evidence": source}]}


def fetch(url):
    headers = {"User-Agent": "awesome-chip-agents-graph/1.0", "Accept": "application/json, text/html"}
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token and url.startswith("https://api.github.com/"):
        headers["Authorization"] = "Bearer " + token
    request = Request(url, headers=headers)
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--resource", action="append", help="Canonical resource ID; repeat to select several")
    group.add_argument("--all", action="store_true", help="Refresh all recorded arXiv papers and GitHub owners")
    parser.add_argument("--output", type=Path, default=ROOT / "data/graph-sources.json")
    parser.add_argument("--force", action="store_true", help="Bypass the 30-day cache")
    parser.add_argument("--max-seconds", type=int, default=420, help="Stop starting requests after this many seconds (default: 420)")
    args = parser.parse_args()
    if args.max_seconds < 1:
        parser.error("--max-seconds must be positive")
    _, records = load_catalog()
    by_id = {r["meta"]["id"]: r["meta"] for r in records}
    selected = set(by_id) if args.all else set(args.resource)
    if selected - set(by_id):
        parser.error("Unknown resource IDs: " + ", ".join(sorted(selected - set(by_id))))
    old = json.loads(args.output.read_text()) if args.output.exists() else {}
    snapshots = old.get("snapshots", {})
    active = set()
    tasks = {}
    for rid, meta in by_id.items():
        for link in meta["links"]:
            if re.fullmatch(r"https://arxiv.org/abs/\d{4}\.\d{4,5}(?:v\d+)?", link["url"]):
                key = "authors:" + rid
                active.add(key)
                if rid in selected:
                    tasks[key] = ("authors", meta, link["url"])
        for repo in repositories(meta):
            key = "owner:" + repo.lower()
            active.add(key)
            if rid in selected:
                tasks[key] = ("owner", repo, "https://api.github.com/repos/" + repo)
    snapshots = {key: value for key, value in snapshots.items() if key in active}
    failed = []
    deadline = time.monotonic() + args.max_seconds
    last_arxiv = 0.0
    for key, (kind, item, url) in sorted(tasks.items()):
        now = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
        previous = snapshots.get(key)
        if previous and previous.get("url") != url:
            del snapshots[key]
            previous = None
        if previous and not args.force and (datetime.fromisoformat(now.replace("Z", "+00:00")) - datetime.fromisoformat(previous["retrieved_at"].replace("Z", "+00:00"))).days < 30:
            continue
        if time.monotonic() >= deadline:
            failed.append(key)
            print("Time budget reached; remaining evidence will be retried on the next run.", file=sys.stderr)
            break
        try:
            if kind == "authors":
                time.sleep(max(0, 3 - (time.monotonic() - last_arxiv)))
                last_arxiv = time.monotonic()
                facts = author_facts(item, fetch(url), url, now)
            else:
                facts = owner_facts(item, json.loads(fetch(url)), now)
            snapshots[key] = {"url": url, "retrieved_at": now, **facts}
            print("Collected", key)
        except Exception as error:
            failed.append(key)
            print("Retained previous evidence for", key, "(" + type(error).__name__ + ")", file=sys.stderr)
    payload = {"schema_version": 1, "snapshots": snapshots}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    return bool(failed)


if __name__ == "__main__":
    sys.exit(main())
