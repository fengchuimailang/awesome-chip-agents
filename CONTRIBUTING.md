# Contributing / 贡献指南

Keep resources directly relevant to **LLM agents for chip design or their evaluation**. Prefer original papers, author repositories, official project pages, benchmarks, and original announcements. Use factual descriptions and identify vendor-reported results. Do not copy third-party papers or documentation into this repository.

仅收录与**芯片设计 LLM Agent 或其评测直接相关**的资源。优先使用论文、作者仓库、官方项目页、基准和原始公告；简介应客观，并注明厂商自行报告的结果。请勿复制第三方论文或文档全文。

## Structure / 目录结构

- `README.md`, `README_zh.md`: generated bilingual direction navigation / 自动生成的中英文方向导航。
- `resources/<direction>/<id>.md`: one editorial file per research work or project, with shared metadata and English/Chinese descriptions / 每项工作一份详情，共用元数据，提供中英文说明。
- `resources/<direction>/README*.md`: generated monthly tables and cross-references, with resource summaries, tags/types, sources, repositories, Stars, and push/collection dates / 自动生成的月度表格与跨方向入口，展示资源简介、标签与类型、来源、仓库、Stars、推送及采集日期。
- `resources/tags/`: generated tag indexes / 自动生成的标签索引。
- `resources/benchmarks/`: generated benchmark and dataset catalog, grouped by primary direction and publication month / 自动生成的基准与数据集总索引，按主要方向和发布月份组织。
- `resources/news/`, `resources/videos/`: generated chronological news and video indexes / 自动生成的动态和视频时间索引。
- `data/taxonomy.json`: fixed direction, type, and tag vocabulary; label arrays are `[English, 简体中文]` / 固定分类、类型与标签词表，标签数组顺序为 `[英文, 简体中文]`。
- `data/repo-stats.json`: GitHub metadata snapshots / GitHub 指标快照。

## Add or Edit a Resource / 新增或修改资源

Choose one primary direction and a stable lowercase, hyphen-separated ID. Merge a paper, its implementation, and accompanying material into one record when they describe the same work. A separately named benchmark with its own task definition can have a record linked through `related`. Unrelated projects sharing a name need distinct IDs.

选择一个主要方向与稳定的小写连字符 ID。同一工作的论文、实现与配套材料合并维护；有独立名称和任务定义的基准可以单独建档，并用 `related` 关联。名称相同但无关的项目必须使用不同 ID。

Create `resources/<direction>/<id>.md` using [the resource template](templates/resource.md). Edit the JSON inside `<!-- metadata ... -->`, plus the English and Chinese descriptions below the rendered block. Do not edit the `<!-- resource:start -->` block or generated indexes directly.

使用[资源模板](templates/resource.md)创建 `resources/<direction>/<id>.md`。编辑 `<!-- metadata ... -->` 内的 JSON，以及生成区块下方的中英文说明；不要直接编辑 `<!-- resource:start -->` 区块和自动生成的索引。

- Preserve the original full title in `title`; use `name` as a short index label / `title` 保留原始完整标题，`name` 用作简短索引名称。
- Supply concise `summary: [English, 简体中文]`, and at least two fixed-vocabulary tags, normally 3–5 / 填写简短中英文 `summary`，使用至少两个固定标签，通常 3–5 个。
- `types` may contain multiple values from `data/taxonomy.json` / `types` 可使用词表中的多个资源类型。
- The benchmark/dataset catalog includes technical resources with type `benchmark` or tag `benchmark` / `dataset`, once per primary direction. News and videos remain in their own indexes / 基准与数据集总索引汇总类型为 `benchmark` 或带 `benchmark` / `dataset` 标签的研究资源，每项仅列于主要方向；新闻和视频保留在各自索引中。
- `links` must include useful primary HTTPS sources. Use `paper`, `repository`, or `source` as `kind`. Repository labels should identify the implementation, benchmark, evaluation tools, or other relevant role. Subdirectory links are supported; statistics cover the containing repository / `links` 提供有用的 HTTPS 原始来源，`kind` 为 `paper`、`repository` 或 `source`。仓库标签应注明实现、基准或评测工具等用途；支持子目录链接，指标统计其所属仓库。
- Only add verified related repositories; no recorded repository means “not recorded”, not proof that none exists / 仅添加经核实的相关仓库；未记录仓库并不代表其不存在。
- Use `also_in` for secondary direction IDs and `related` for other resource IDs / `also_in` 指定其他相关方向，`related` 指定相关资源 ID。
- For videos, include the original date, channel or organizer, and relevant timestamp where available / 视频注明原始日期、频道或主办方，有条件时提供相关时间点。

Then regenerate and validate using Python 3.10+; no third-party packages are needed:

使用 Python 3.10+ 重新生成并校验，无需安装第三方依赖：

```sh
python3 scripts/catalog.py
python3 scripts/catalog.py --check
python3 -m unittest discover -s tests
git diff --check
```

Review both language indexes together. Include a short PR summary and note that `git diff --check` passed. Follow Conventional Commit-style subjects, for example `docs: add bilingual resource for rtl verification`.

一起检查中英文索引。PR 提供简短说明并注明 `git diff --check` 已通过；提交标题遵循 Conventional Commit 风格。

## Publication Dates / 发布日期

- `date` supports `YYYY-MM-DD`, `YYYY-MM`, `YYYY`, or JSON `null`. Use the earliest documented public date of the resource, rather than a later conference or revision date / 支持完整日期、月份、年份和 JSON `null`；优先采用可核实的首次公开日期。
- `date_basis: "source"`: date recorded by the original source / 原始来源记录的日期。
- `date_basis: "arxiv-month"`: use the [arXiv identifier month](https://info.arxiv.org/help/arxiv_identifier.html) when the exact initial-public day has not been checked. This is month-level archival precision, not an inferred day / 具体首次公开日未核实时，使用 arXiv 编号月份归档，不推测具体日期。
- `date_basis: "year-only"`: only a publication/conference year is recorded; month is unverified / 只有发表或会议年份，月份待核实。
- `date_basis: "unknown"` requires `date: null` / 日期未知时填写 `null`。
- Months sort newest first within each direction. Year-only records follow dated months of that year; undated records come last. Preserve conference and revision notes in descriptions / 同方向按月份倒序；只有年份的记录放在该年已知月份之后，日期未知的置于末尾。会议与修订信息保留在说明中。
- Repository creation, latest push, and collection dates never determine a resource's publication month / 仓库创建、推送和采集时间均不决定资源发布月份。

## Repository Metadata

仓库指标采用 [GitHub repository REST API](https://docs.github.com/en/rest/repos/repos#get-a-repository) 的 `stargazers_count` 与 `pushed_at`；后者是仓库最近推送时间，可能涉及任一分支，并非最近发布版本或默认分支提交时间。所有时间为 UTC。Stars 和推送频率仅辅助了解关注度与活动，不代表研究质量。

Repository statistics use `stargazers_count` and `pushed_at` from the linked API. The push timestamp can reflect any branch and is distinct from a release or the latest default-branch commit. All timestamps use UTC. These indicators describe attention and activity, not research quality.

The [refresh workflow](.github/workflows/refresh-repository-stats.yml) runs Mondays at 03:17 UTC (11:17 Asia/Shanghai), or manually via **Actions → Refresh repository statistics → Run workflow**. It uses the built-in `GITHUB_TOKEN` and commits only snapshots and rendered Markdown to the checked-out branch; no personal token is required. Scheduled runs use the default branch. Repository rules must permit the bot's write, otherwise the push will fail visibly. The workflow begins running once these files are pushed to GitHub; it has not been activated by local editing.

[刷新流程](.github/workflows/refresh-repository-stats.yml)每周一北京时间 11:17 执行，也可在 Actions 页面手动运行；使用内置 `GITHUB_TOKEN`，只提交指标快照与生成的 Markdown。定时任务运行于默认分支；仓库规则需要允许机器人写入，否则推送步骤会报错。工作流文件推送到 GitHub 后才会生效，本地编辑不会激活它。

For a local refresh / 本地刷新：

```sh
python3 scripts/catalog.py --refresh
```

Optionally provide `GITHUB_TOKEN` or `GH_TOKEN` through your shell environment to increase the public API rate limit. If neither is set, the script reuses an existing GitHub CLI login when available, otherwise it reads the public API without authentication. Never put tokens in resource files or committed data. API availability and rate limits still apply.

可通过 shell 环境变量提供 `GITHUB_TOKEN` 或 `GH_TOKEN` 提升 API 限额；未设置时优先复用现有 GitHub CLI 登录，否则匿名读取公开 API。不要将令牌写入资源文件或提交的数据。

Each successful fetch records its own `fetched_at`. A failed refresh retains the last successful Stars and push timestamp, records `last_attempt_at` and a short error, and marks the rendered snapshot as stale. With no successful snapshot, values remain unavailable. Partial successes are still saved; the command and workflow return failure so missing updates are visible. `--check` uses local snapshots and never accesses the network. Removing a resource also requires removing its obsolete generated tag page if that tag is no longer used.

成功采集记录 `fetched_at`；失败时保留上次成功值，记录尝试时间与简短错误，并在页面注明刷新失败。没有成功快照时显示暂不可用。部分成功的数据仍会保存，但命令和工作流会返回失败以提示检查。`--check` 只读本地数据，不访问网络。删除资源后，如果某标签不再使用，需同时删除对应的旧标签索引页。
