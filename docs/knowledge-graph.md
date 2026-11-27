# Progress graph / 进展图谱

## English

The English and Chinese `/graph/` pages use G6 5.1.1 with a D3 force-directed layout. The graph library and graph data load only on graph pages; the entire site is still prerendered static HTML suitable for GitHub Pages. Resource and relation lists remain available without JavaScript. Search, direction, layers, relation filters, selection and dates are preserved in share URLs and language switches.

### Sources and automation

`scripts/export_site.py` exports two ignored files: `site/src/generated/catalog.json` and `graph.json`. It derives resources, topic membership, deduplicated GitHub repositories and editorial `RELATED_TO` links from the canonical catalog. GitHub owner logins remain repository attributes, even when no identity mapping is verified. Repository push times never become publication or relation dates. Normal builds and checks require no network access.

`scripts/graph_sources.py` explicitly collects structured primary-source evidence:

```sh
python3 scripts/graph_sources.py --resource rtlfixer --resource mage
python3 scripts/export_site.py
# Refresh all eligible records, using successful evidence for 30 days:
python3 scripts/graph_sources.py --all
```

`--force` bypasses the cache; `--output /tmp/graph-candidates.json` writes a separate review file. arXiv supplies up to its first three `citation_author` entries in source order, never an inferred lead/corresponding author. IDs combine the resource ID with a name hash: same-name authors across papers remain separate until a verified identity mapping exists. No contributor lists are collected. GitHub's repository API supplies verified organization-account owners; a personal account alone never creates a Person entity. Repository redirects require editorial review. `GITHUB_TOKEN`/`GH_TOKEN` are optional and are only sent to GitHub's API.

The weekly existing refresh workflow runs `--all` with the built-in GitHub token, validates the graph, and commits successful evidence in `data/graph-sources.json`. Failures preserve previous successful evidence and collection times, save other successes and return failure. A 420-second request-start budget prevents a provider outage from exhausting the workflow; remaining sources are retried next time (`--max-seconds` changes the budget). Changing a linked paper or removing a repository prevents reuse of its old evidence. A recorded owner is a current snapshot, not ownership history. Publication dates remain separate from evidence retrieval dates.

### Editorial enrichment

`data/knowledge-graph.json` supplies reviewed people, organizations, methods and semantic relations that cannot safely be inferred from catalog tags or arbitrary prose. Every entity has a stable namespaced `id`, a `kind`, bilingual `label`, `evidence`, optional `date` and `recorded_at`, and `attributes`. Every relation has `kind`, `source`, `target`, `evidence`, optional `date`, `end_date`, `recorded_at`, and `attributes`. The exporter assigns deterministic relation IDs and date precision. Missing dates remain JSON `null`; `recorded_at` uses a timezone-qualified timestamp. Evidence includes an HTTP(S) `url`, a precise `locator`, `kind` (`primary` or `catalog`) and optional `retrieved_at`.

| Entity | Scope |
| --- | --- |
| `resource` | One canonical work; paper and official implementation remain one work, linked to a repository node |
| `person` | Explicit authors or verified real people; no name-based global merging |
| `organization` | Explicit companies, universities, labs or verified GitHub organization accounts, distinguished by attributes |
| `repository` | Deduplicated GitHub repository, with raw owner account |
| `topic` | Existing direction taxonomy |
| `method` | Selected core methods supported by evidence; tags are not automatically promoted |

| Relation | Direction and requirements |
| --- | --- |
| `IN_TOPIC` | Resource → Topic; primary or secondary direction |
| `USES_METHOD` | Resource → Method; explicit supporting evidence |
| `AUTHOR_OF` | Person → Resource; primary author-list evidence |
| `AFFILIATED_WITH` | Person → Organization; primary source and `attributes.resource` naming the specific `resource:<id>` |
| `HAS_REPOSITORY` | Resource → Repository; recorded link and `attributes.role` |
| `OWNED_BY` | Repository → verified Person/Organization; primary identity evidence |
| `EXTENDS` | Resource → Resource; explicit primary-source claim |
| `EVALUATED_ON` | Resource → benchmark/dataset Resource; primary evidence and bilingual `attributes.conditions` |
| `COMPARES_WITH` | Resource → Resource; primary evidence and bilingual `attributes.conditions`, no unconditional superiority claim |
| `RELATED_TO` | Symmetric editorial link; no inheritance or performance claim |

For example, a paper-scoped affiliation edge uses:

```json
{
  "kind": "AFFILIATED_WITH",
  "source": "person:paper-id:verified-author-id",
  "target": "organization:verified-lab-id",
  "date": null,
  "recorded_at": "2026-11-26T00:00:00Z",
  "attributes": {"resource": "resource:paper-id"},
  "evidence": [{
    "url": "https://example.org/paper",
    "locator": "Author affiliations, page 1",
    "kind": "primary",
    "retrieved_at": "2026-11-26T00:00:00Z"
  }]
}
```

The example uses placeholder IDs/URLs and must not be copied as production facts. Missing affiliations, extensions and comparisons are left absent. The initial enrichment covers a small set of real papers; absence of an edge is not evidence that no relationship exists. Future LLM extraction should produce review candidates with source locators; it must not publish inferred facts directly.

### Time semantics

The first version explores **publication months**. Cumulative mode includes works through the selected month; Window mode includes publications inside an inclusive range; Compare shows the end-of-month baseline and endpoint, marking explicitly dated additions with thick outlines and ended relations with long dashes. Ended relations require ordered exact `date`/`end_date`; the end date is exclusive. Playback advances the endpoint by month. Colors always indicate entity/relation types, not change status.

Year-only dates span January–December; they are not converted to January publications. Unknown dates and year intervals crossing a boundary appear as optional context, never as additions. Undated links, including current owners and author lists from retrieved versions, remain dotted context when their endpoints are visible. They do not establish that a link existed historically. A dated source revision does not automatically date all claims back to the paper's initial release. This is an evidence timeline, not a bitemporal database or a reconstruction of what the catalog knew at each historical instant.

Selection and time playback preserve existing node positions. Search, direction and layer changes fit the resulting view; **Rearrange** explicitly reruns the force layout. New context nodes start near connected nodes. Use the lists for keyboard navigation or if graphics fail. The inspector exposes source locators, retrieval times, date precision, paper affiliation scope and evaluation conditions.

Search, direction and the timeline stay above the graph; advanced filters contain layers, relation types and time modes. The canvas toolbar provides zoom, fit, rearrange and fullscreen. The fullscreen workspace keeps filters and selection details available; Escape exits. When browser fullscreen is unavailable, the workspace expands within the page.

Validation: `python3 -m unittest discover -s tests`, `cd site && npm run build && npm test`. Tests cover identities, source changes/failures, evidence requirements, time boundaries, share URLs, graph endpoints, bilingual prerendering and repository subpaths. See [G6 force layout documentation](https://g6.antv.antgroup.com/en/manual/layout/D3ForceLayout/).

## 简体中文

中英文 `/graph/` 页面使用 G6 5.1.1 的 D3 力导向布局。图谱库和图谱数据仅在图谱页面加载，网站仍输出可由 GitHub Pages 托管的静态 HTML；关闭 JavaScript 后仍能阅读资源与关系列表。搜索、方向、图层、关系筛选、所选条目与时间会保留在分享链接和语言切换中。

### 数据与自动更新

`scripts/export_site.py` 共用目录校验，生成不提交的 `site/src/generated/catalog.json` 和 `graph.json`。资源、方向、去重后的 GitHub 仓库及编辑关联直接从规范资源文件提取。owner 账号始终保留为仓库属性，不需要先猜测真人或机构身份。仓库推送时间不会成为资源发布或关系发生时间；普通构建和检查无需联网。

运行英文部分的采集命令可从 arXiv 读取原文署名前三位作者，从 GitHub API 核实组织账号 owner，结果存入 `data/graph-sources.json`。`--resource` 可重复指定资源，`--all` 处理全部适用资源，成功记录缓存 30 天；`--force` 强制刷新，`--output` 可输出独立候选文件供审阅。同名作者按论文隔离，不按名字跨论文合并；顺序不代表负责人或通讯作者。个人 GitHub 账号不会直接生成人物节点，不采集次要仓库贡献者。仓库重定向需人工核实新链接。

现有每周刷新流程会使用内置 GitHub token 执行采集、校验并提交成功的证据。来源失败时保留上次成功数据与采集时间，其余成功结果仍保存，任务返回失败。默认 420 秒后不再启动新请求，余下来源在下次重试；可用 `--max-seconds` 调整。修改论文链接或移除仓库后，不会把旧身份数据套到新来源。owner 表示当前快照，不表示历史归属。发布日期、关系发生日期与采集时间分开记录。

### 实体与关系

采用六类实体：资源、人物、机构、仓库、方向、方法。论文及其官方实现保留为一个规范资源，再关联仓库；GitHub 账号为属性；学校、公司、研究所和实验室均属于机构，并保留具体类型。核心方法需要原始依据，不把所有标签提升为方法。

十类关系及方向见上表，分别为：属于方向、采用方法、作者、论文署名机构、关联仓库、仓库归属、扩展工作、评测于、实验对比、编辑关联。署名机构必须限定具体论文，不推断当前雇佣关系；评测和对比必须填写双语实验条件；“编辑关联”不表示继承或优劣。

在 `data/knowledge-graph.json` 补充经过审阅的人物、机构、方法与语义关系。实体保留稳定的类型前缀 ID、双语名称、来源与属性；关系保留端点、来源、发生／结束日期、采集时间与条件等属性。来源必须有 HTTP(S) 地址、具体定位、来源类型和可用的采集时间。未知日期为 `null`，禁止补造；发生日期精度由脚本计算，关系 ID 自动稳定生成。英文示例仅展示格式，含占位内容，不能作为正式事实。

首批作者、机构和语义关系只覆盖少量真实工作，其余逐步补齐。缺少连线不代表不存在关系。未来通过 LLM 从论文抽取时，应先形成带原文定位的候选，再审阅发布。

### 时间与交互

首版按**发布月份**探索：累计模式显示截至某月的资源；时间窗口显示包含首尾月份的发布记录；快照对比比较两个月末，明确日期的新增用加粗表示，结束关系用长虚线表示。结束日期为不再有效的首日，起止日期都必须精确到日。播放按月推进终点，颜色始终表示实体／关系类型。

仅年份的日期表示全年范围，不推测为一月；跨越时间边界的年份记录及未知日期，可选作背景显示，不计入新增。无日期连线用点线显示，包括当前 owner 和已采集版本的署名作者，不能用来证明历史关系。某修订版出现的事实不能自动追溯到论文首次发布。当前实现是依据已收录资料形成的时间线，不是双时态数据库，也不还原每个历史时刻目录已经知道的全部内容。

选中条目和播放时间保留已有节点坐标；搜索、方向或图层变化后适应画布，“重新排列”才显式重新运行力导向布局。新增背景节点从邻近节点开始排列。实体与关系列表支持键盘浏览，也可在图形不可用时使用；详情展示原始依据、定位、日期精度、采集时间、署名范围与实验条件。

搜索、方向和时间线位于图谱上方；图层、关系类型和时间模式收在高级筛选中。画布内工具提供缩放、适应画布、重新排列和全屏。全屏时仍可筛选和查看详情，按 Esc 退出；浏览器不支持原生全屏时，工作区会在页面内铺满。

验证命令见英文部分及[网站指南](website.md)，无需新增数据库或常驻服务。
