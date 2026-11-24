"""Validate bilingual editorial reading paths shared by Markdown and the site."""

import json
import re


def load_paths(root, records):
    path = root / "data/reading-paths.json"
    if not path.exists():
        return []
    paths = json.loads(path.read_text())
    ids = {r["meta"]["id"] for r in records}
    seen = set()

    def pair(value):
        return isinstance(value, list) and len(value) == 2 and all(isinstance(s, str) and s.strip() and "\n" not in s for s in value)

    if not isinstance(paths, list):
        raise ValueError("Reading paths must be a list")
    for item in paths:
        if not isinstance(item, dict):
            raise ValueError("Reading path must be an object")
        pid = item.get("id")
        if not isinstance(pid, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", pid) or pid in seen:
            raise ValueError("Invalid or duplicate reading path")
        seen.add(pid)
        if not all(pair(item.get(key)) for key in ("title", "summary", "prerequisites")):
            raise ValueError("Bilingual reading path text required: " + pid)
        steps = item.get("steps")
        if not isinstance(steps, list) or not 4 <= len(steps) <= 6:
            raise ValueError("Reading paths need 4–6 steps: " + pid)
        resources = set()
        for step in steps:
            if not isinstance(step, dict):
                raise ValueError("Reading step must be an object")
            rid = step.get("resource")
            if not isinstance(rid, str) or rid not in ids or rid in resources or not all(pair(step.get(key)) for key in ("why", "focus")):
                raise ValueError("Invalid reading step: " + pid)
            resources.add(rid)
    return paths
