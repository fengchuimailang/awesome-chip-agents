#!/usr/bin/env python3
"""Collect OpenAlex citation snapshots by exact DOI, using only the stdlib."""

import argparse
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlencode, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DOI = re.compile(r"10\.\d{4,9}/\S+", re.I)


def paper_identity(meta):
    """Use the first supported recorded paper link; never guess from a title."""
    for link in meta["links"]:
        if link["kind"] != "paper":
            continue
        parsed = urlparse(link["url"])
        if parsed.hostname in ("doi.org", "dx.doi.org"):
            doi = unquote(parsed.path.lstrip("/")).lower()
            if DOI.fullmatch(doi):
                return doi
        if parsed.hostname in ("arxiv.org", "www.arxiv.org"):
            match = re.fullmatch(r"/(?:abs|pdf)/(\d{4}\.\d{4,5})(?:v\d+)?(?:\.pdf)?/?", parsed.path)
            if match:
                return "10.48550/arxiv." + match[1]
    return None


def snapshot_for(meta, cache):
    snapshot = cache.get(meta["id"], {})
    # Changing a source must never attach the previous paper's count.
    identity = paper_identity(meta)
    return snapshot if identity and snapshot.get("doi") == identity and snapshot.get("provider") == "openalex" else {}


def refresh(records, cache, fetch=None, now=None, force=False):
    """Keep successful data on failure; refresh at most every 30 days by default."""
    now = now or datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    instant = datetime.fromisoformat(now.replace("Z", "+00:00"))
    metadata = {r["meta"]["id"]: r["meta"] for r in records}
    identities = {rid: paper_identity(meta) for rid, meta in metadata.items()}
    identities = {rid: doi for rid, doi in identities.items() if doi}
    updated = {rid: snapshot_for(metadata[rid], cache).copy() for rid in identities}
    due = {}
    for rid, doi in identities.items():
        snapshot = updated[rid]
        checked = snapshot.get("fetched_at")
        if not force and checked and not snapshot.get("fetch_error"):
            age = instant - datetime.fromisoformat(checked.replace("Z", "+00:00"))
            if 0 <= age.total_seconds() < 30 * 86400:
                continue
        due.setdefault(doi, []).append(rid)

    def fetch_api(url):
        key = os.environ.get("OPENALEX_API_KEY")
        if key:
            url += "&" + urlencode({"api_key": key})
        request = Request(url, headers={"User-Agent": "awesome-chip-agents-catalog/1.0", "Accept": "application/json"})
        for attempt in range(3):
            try:
                with urlopen(request, timeout=25) as response:
                    return json.load(response)
            except HTTPError as exc:
                if exc.code not in (429, 500, 502, 503, 504) or attempt == 2:
                    raise
                time.sleep(2 ** attempt)

    fetch = fetch or fetch_api
    failures = []
    dois = sorted(due)
    # Batch exact identifiers to reduce API usage; no fuzzy search fallback.
    for start in range(0, len(dois), 40):
        batch = dois[start:start + 40]
        url = "https://api.openalex.org/works?" + urlencode({
            "filter": "doi:" + "|".join("https://doi.org/" + doi for doi in batch),
            "per_page": 100,
            "select": "id,doi,title,cited_by_count,publication_year,primary_location",
        })
        try:
            payload = fetch(url)
            if not isinstance(payload.get("results"), list) or payload.get("meta", {}).get("count", 0) > 100:
                raise ValueError("Invalid or truncated response")
            matches = {}
            for work in payload["results"]:
                doi = (work.get("doi") or "").removeprefix("https://doi.org/").lower()
                if doi in batch:
                    matches.setdefault(doi, []).append(work)
        except HTTPError as exc:
            error = f"HTTP {exc.code}"
            matches = None
        except (URLError, TimeoutError, OSError):
            error = "Network request failed"
            matches = None
        except (ValueError, KeyError, TypeError, AttributeError):
            error = "Invalid API response"
            matches = None
        for doi in batch:
            for rid in due[doi]:
                previous = updated[rid]
                snapshot = {**previous, "provider": "openalex", "doi": doi, "last_attempt_at": now}
                problem = error if matches is None else None
                if matches is not None:
                    candidates = matches.get(doi, [])
                    if not candidates:
                        if "citation_count" in previous:
                            problem = "Previously matched paper missing from response"
                        else:
                            snapshot.update(status="not-found", fetched_at=now, fetch_error=None)
                    elif len(candidates) != 1:
                        problem = "Ambiguous DOI match"
                    else:
                        work = candidates[0]
                        count = work.get("cited_by_count")
                        work_url = work.get("id", "")
                        location = work.get("primary_location") or {}
                        source = (location.get("source") or {}) if isinstance(location, dict) else None
                        title = work.get("title")
                        year = work.get("publication_year")
                        if (type(count) is not int or count < 0 or not isinstance(work_url, str)
                                or not re.fullmatch(r"https://openalex.org/W\d+", work_url)
                                or not isinstance(source, dict)
                                or source.get("display_name") is not None and not isinstance(source["display_name"], str)
                                or title is not None and not isinstance(title, str)
                                or year is not None and type(year) is not int):
                            problem = "Invalid API response"
                        else:
                            snapshot.update(status="matched", citation_count=count, url=work_url,
                                            title=title, publication_year=year,
                                            indexed_in=source.get("display_name"), fetched_at=now, fetch_error=None)
                if problem:
                    snapshot["fetch_error"] = problem
                    failures.append(f"{rid}: {problem}")
                updated[rid] = snapshot
    return dict(sorted(updated.items())), failures


def main():
    from catalog import load_catalog

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Refresh even snapshots less than 30 days old")
    args = parser.parse_args()
    _, records = load_catalog()
    path = ROOT / "data/paper-stats.json"
    old = json.loads(path.read_text()) if path.exists() else {}
    snapshots, failures = refresh(records, old, force=args.force)
    path.write_text(json.dumps(snapshots, ensure_ascii=False, indent=2) + "\n")
    for failure in failures:
        print("Warning: " + failure, file=sys.stderr)
    available = sum("citation_count" in s for s in snapshots.values())
    print(f"Paper snapshots: {available}/{len(snapshots)} exact DOI matches; {len(failures)} refresh failures.")
    return int(bool(failures))


if __name__ == "__main__":
    raise SystemExit(main())
