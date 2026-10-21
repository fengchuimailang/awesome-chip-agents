# Repository Guidelines

## Project Structure

This repository is a curated resource list, not a software package. `README.md` is the English landing page and `README_zh.md` is its Simplified Chinese counterpart. Both contain the same scope, categories, and resources. `LICENSE` covers original repository content; linked papers, code, and datasets retain their own terms. There are currently no source modules, tests, or generated assets.

## Development and Validation

No build, install, or test command is required. Before submitting documentation changes, run:

```sh
git diff --check
```

Review both README files together: confirm headings and resource entries correspond, Markdown links point to useful primary sources, and descriptions are concise and factual. For news, verify the announcement date and link to the original announcement or recording. No automated link checker is configured.

## Style and Naming

Use Markdown with ATX headings (`##`), hyphen bullets, and one concise description per resource. Keep English and Chinese sections in the same order and translate descriptions when practical; titles may stay in their original language. Put each item in the most relevant section, avoid duplicates, and keep dated material roughly chronological. Distinguish vendor-reported claims from independently evaluated results. Use `README_zh.md` for the Chinese edition; preserve this exact filename for the repository's language link.

## Contribution Guidelines

Add only resources directly relevant to LLM agents in chip design or their evaluation. Include a stable source link, original title, brief relevance statement, and publication year or announcement date when available. Prefer papers, official project pages, repositories, benchmarks, and original news sources. Do not copy third-party content into this repository without permission; linking and concise descriptions are preferred.

Keep pull requests focused and update both language versions for resource or policy changes. Include a short summary and note that `git diff --check` passed. Recent history uses a Conventional Commit-style subject, for example `docs: add bilingual chip agents resource list`; follow that pattern with a concise imperative description.
