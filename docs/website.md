# Website and shared content / 网站与内容同步

## English

### Shared content

Edit `resources/` metadata and English/Chinese descriptions, plus the fixed vocabulary in `data/taxonomy.json`. Run `python3 scripts/catalog.py` to update Markdown. Website builds call `scripts/export_site.py`, reuse the same catalog validation, and export descriptions, links, relationships, and metric snapshots to ignored `site/src/generated/catalog.json`. Generated JSON, HTML, and dependencies are not committed.

The website generates English and Simplified Chinese home, catalog, direction, metric, and resource pages as HTML. React hydrates search and filters. Query parameters preserve filters when sharing links or switching languages. Publication dates, year-only precision, unknown dates, cross-references, and source notes follow the catalog. The footer identifies the source revision and local changes.

The interactive catalog shows 24 entries per page, with card and compact list views. URLs preserve `q`, `direction`, `type`, `tag`, `collection`, `sort`, `page`, and `view`. Collections distinguish tools/platforms, papers/benchmarks, and benchmarks/datasets using existing metadata. Home task shortcuts use these same filters. Without JavaScript, catalog HTML includes every resource.

Detail links carry a validated local `from` route to return to the same results. Optional tab-scoped session storage restores the scroll position; browsing works when storage is unavailable. Copy-link actions share the clean resource URL, excluding return context, and show a selectable URL if clipboard access fails. The first-contribution shortcut opens GitHub issues labeled `good first issue`.

See [frontend commands](../site/README.md) and the [website design system](design-system.md) for shared shadcn components, typography, and responsive layout rules. Resource editing remains standard-library-only Python; frontend development additionally requires Node.js 24.

### Publication

Pull requests validate generated Markdown, run Python tests, build the website, and check prerendered resource pages and internal links.

Enable **Settings → Pages → Build and deployment → Source: GitHub Actions**. Default-branch content updates deploy automatically; **Actions → Deploy website → Run workflow** starts a manual deployment. Workflow files must first be pushed to GitHub. Local development does not publish the website or change Pages settings.

The default URL is inferred from the GitHub owner and repository. For a custom domain, configure it in Pages and set repository Actions variable `SITE_URL` to the full HTTPS website root with a trailing slash. The build derives the Vite base path, canonical URLs, alternate-language URLs, sitemap, and robots file.

The existing statistics schedule is Monday 00:00 Asia/Shanghai. It refreshes repository and configured download snapshots, regenerates Markdown, and commits data and rendered content. It explicitly calls deployment after refresh, including partial provider failures, rather than relying on another push workflow triggered by a bot commit. Failed providers retain good snapshots and still report a failed refresh.

### Visit and click analytics

Use an existing Umami **3.2.0 or newer** instance. Set repository Actions **variables**, or configure `site/.env.local` for local development:

- `VITE_UMAMI_SCRIPT_URL`: HTTPS tracker script URL.
- `VITE_UMAMI_WEBSITE_ID`: public website identifier.
- `VITE_UMAMI_DOMAINS`: optional comma-separated allowed hostnames.

Without configuration the site sends no analytics requests. After deployment and real visits, counts are available in your Umami dashboard. Private dashboard/API credentials are never included in the website.

Events include `outbound_link` (resource ID, link kind, destination origin/path, language), `catalog_filter` (filter and value), `catalog_search` (query length and result count), and `contribute` (recommendation entry point). Manual pageviews exclude query strings and referrers. Raw search text is excluded. Do Not Track and Global Privacy Control disable tracking; analytics errors never block navigation.

Successful copy-link actions emit `share_link` with resource ID and language. New source and contribution links reuse outbound-link tracking. No return URL or clipboard content is sent.

### Download metadata

Optional `download_sources` metadata identifies verified distribution sources. Each source has a stable resource-local `id`. The following package names are examples:

~~~json
{
  "download_sources": [
    {"id": "npm-month", "provider": "npm", "package": "@author/chip-mcp", "period": "last-month"},
    {"id": "pypi-month", "provider": "pypistats", "package": "chip-mcp", "period": "month"},
    {"id": "mcp-assets", "provider": "github-releases", "repository": "author/chip-mcp", "tag_prefix": "mcp-", "asset_pattern": "*.whl"}
  ]
}
~~~

- **npm:** official download-count API; `last-week` or `last-month`, default `last-month`. Preserve the actual returned date interval.
- **PyPI Stats:** third-party PyPI package statistics; `day`, `week`, or `month`, default `month`. The recent endpoint provides windows without exact interval dates. Cache requests per day.
- **GitHub Releases:** sum matching assets in currently available non-draft, non-prerelease releases, paginating releases and assets. Optional `tag_prefix` and `asset_pattern` constrain scope. The repository must be linked by the resource. Source archives, Git clones, deleted assets, and registry downloads are outside this metric.

Run `python3 scripts/download_stats.py`, then `python3 scripts/catalog.py`. Only configured sources are queried. Snapshots in `data/download-stats.json` appear in both Markdown and website details. Failures retain successful values and collection timestamps, record the failed attempt, and return failure. Source identity changes discard counts from the previous identity. Missing data is unavailable, never an invented zero.

Package downloads, asset downloads, unique users, and verified MCP installations are different measures. Website clicks are measured separately. Sources, reporting scopes, and collection timestamps remain visible. This version does not provide public click rankings, Docker metrics, or all-time PyPI totals.

References: [Vite prerendering](https://vite.dev/guide/ssr.html#pre-rendering-ssg), [Umami configuration](https://docs.umami.is/docs/tracker-configuration), [Umami functions](https://docs.umami.is/docs/tracker-functions), [npm statistics](https://github.com/npm/registry/blob/main/docs/download-counts.md), [PyPI Stats](https://pypistats.org/api/), [GitHub release assets](https://docs.github.com/en/rest/releases/assets).

## 简体中文

### 内容同步

日常编辑 `resources/` 的 metadata、中英文介绍及 `data/taxonomy.json` 固定词表。运行 `python3 scripts/catalog.py` 更新 Markdown。网站构建调用 `scripts/export_site.py`，复用同一份目录校验，导出正文、链接、关联资源和指标快照到不提交的 `site/src/generated/catalog.json`。生成的 JSON、HTML 和依赖不提交仓库。

中英文首页、列表、方向、统计和资源详情均生成 HTML，React 接管搜索筛选。URL 查询参数保留筛选条件，支持分享和切换语言。日期精度、未知日期、跨方向入口及来源说明沿用目录。页脚标注来源版本和本地修改状态。

交互列表每页显示 24 项，可切换卡片与紧凑列表。URL 保留 `q`、`direction`、`type`、`tag`、`collection`、`sort`、`page`、`view`。资源集合按已有 metadata 区分工具与平台、论文与基准、基准与数据集，首页任务快捷入口复用这些筛选。关闭 JavaScript 后，列表 HTML 仍包含全部资源。

详情链接通过经过校验的站内 `from` 路径返回原结果；可选的标签页会话存储用于恢复滚动位置，存储不可用时仍可浏览。复制链接使用不含返回上下文的资源地址，剪贴板访问失败时显示可选中复制的地址。首次贡献入口打开 GitHub 中标记为 `good first issue` 的任务。

命令见[网站说明](../site/README.md)，shadcn 公共组件、字号和响应式规则见[网站设计规范](design-system.md)。普通资源编辑仍只依赖 Python 标准库；前端开发另外需要 Node.js 24。

### 发布

PR 检查 Markdown 生成结果、运行 Python 测试、构建网站，并验证预渲染资源页和站内链接。

在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。默认分支内容更新后自动部署，也可在 **Actions → Deploy website → Run workflow** 手动运行。工作流文件推送后才会生效；本地开发不会发布网站或更改 Pages 设置。

默认地址根据 GitHub 用户和仓库名称生成。自定义域名需在 Pages 配置，并设置 Actions 变量 `SITE_URL` 为完整 HTTPS 网站根地址，以 `/` 结尾。构建据此生成 Vite 子路径、规范地址、另一语言地址、站点地图和 robots 文件。

现有指标刷新时间为每周一北京时间 00:00。流程刷新仓库和下载来源、重新生成 Markdown、提交快照，并显式调用部署工作流。部分来源失败时仍发布成功数据和保留的快照，同时刷新任务明确报告失败，无需依赖机器人提交再次触发 push。

### 访问与链接点击

使用已有的 **Umami 3.2.0 或更新版本**。在仓库 Actions **Variables** 配置以下公开值；本地可写入 `site/.env.local`：

- `VITE_UMAMI_SCRIPT_URL`：HTTPS 脚本地址。
- `VITE_UMAMI_WEBSITE_ID`：公开的网站标识。
- `VITE_UMAMI_DOMAINS`：可选，允许统计的域名，以逗号分隔。

未配置时不发送统计请求。部署并产生真实访问后，在 Umami 后台查看；浏览器代码不包含后台查询密钥。

事件包括 `outbound_link`（资源 ID、类型、目标域名和路径、语言）、`catalog_filter`（筛选项和值）、`catalog_search`（搜索词长度与结果数）及推荐入口的 `contribute`。页面访问去除查询参数和来源网址，不发送搜索原文；遵循 Do Not Track 和 Global Privacy Control，统计故障不影响跳转。

成功复制分享链接后，`share_link` 事件仅包含资源 ID 和语言。新增来源与贡献链接复用外链点击统计，不发送返回地址或剪贴板内容。

### 下载统计

资源 metadata 可添加 `download_sources`，格式见英文示例。每项来源有稳定且在资源内唯一的 `id`；示例包名仅作说明，正式配置需核实对应关系。

- **npm**：官方接口，支持 `last-week` 和 `last-month`，默认最近一个月；保留实际起止日期。
- **PyPI Stats**：第三方服务，统计 PyPI 包下载，支持 `day`、`week`、`month`。recent 接口提供窗口值，没有准确起止日期；按日缓存。
- **GitHub Releases**：分页读取当前可用的非草稿、非预发布版本及附件，可用 `tag_prefix` 和 `asset_pattern` 限定范围。仓库必须已被资源链接；不计源码归档、Git clone、删除的附件或其他包管理器下载。

运行 `python3 scripts/download_stats.py`，再运行 `python3 scripts/catalog.py`。只采集显式配置的来源，快照保存到 `data/download-stats.json`，由 Markdown 和网站共同展示。失败保留成功值与原采集时间，记录尝试结果并返回失败；来源身份变化不会沿用旧包计数。缺少数据时显示暂无数据。

包下载、附件下载、独立用户和已核实的 MCP 安装量是不同指标，本站点击单独统计。界面保留来源、口径及采集时间。本版不提供公开点击排行榜、Docker 指标或 PyPI 全历史累计量。接口原始文档见英文部分。
