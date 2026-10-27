# Repository Guidelines

## Project Structure

This repository is a curated resource catalog, not an installable software package. `README.md` is the English landing page and `README_zh.md` is its Simplified Chinese counterpart. Both are generated from bilingual resource files in `resources/<direction>/<id>.md`. Direction indexes group resources by publication month; benchmark/dataset, tag, news, and video indexes provide alternate entry points. `resources/benchmarks/` groups benchmarks and datasets by primary direction, then month. `data/taxonomy.json` defines the fixed vocabulary, and `data/repo-stats.json` holds GitHub snapshots. `scripts/catalog.py` renders the catalog using only the Python standard library. See `CONTRIBUTING.md` for the metadata schema and template. `LICENSE` covers original repository content; linked resources retain their own terms.

## Development and Validation

No dependency installation is required. After editing resource metadata or descriptions, regenerate and validate:

```sh
python3 scripts/catalog.py
python3 scripts/catalog.py --check
python3 -m unittest discover -s tests
git diff --check
```

Review both language indexes together: confirm headings and resource entries correspond, Markdown links point to useful primary sources, and descriptions are concise and factual. For news, verify the announcement date and link to the original announcement or recording. Local links are checked in tests; external links still require editorial review. Use `python3 scripts/catalog.py --refresh` only when a network refresh of repository statistics is intended; failures preserve successful snapshots.

## Style and Naming

Use Markdown with ATX headings (`##`), tables for generated resource indexes, hyphen bullets for editorial lists, and concise descriptions. Edit resource JSON metadata comments and English/Chinese editorial sections; do not hand-edit generated indexes or rendered metadata blocks. Keep one canonical file per work, one primary direction, and multiple fixed-vocabulary tags; use `also_in` and `related` for cross-references. Preserve original titles and source notes. Sort by publication month descending, keeping year-only and undated records explicit; repository push times never determine publication groups. Distinguish vendor-reported claims from independently evaluated results. Preserve the exact filename `README_zh.md` for the Chinese edition.

## Contribution Guidelines

Add only resources directly relevant to LLM agents in chip design or their evaluation. Include a stable source link, original title, brief relevance statement, and publication year or announcement date when available. Prefer papers, official project pages, repositories, benchmarks, and original news sources. Do not copy third-party content into this repository without permission; linking and concise descriptions are preferred.

Keep pull requests focused and update both language versions for resource or policy changes. Include a short summary and note that `git diff --check` passed. Recent history uses a Conventional Commit-style subject, for example `docs: add bilingual chip agents resource list`; follow that pattern with a concise imperative description.
