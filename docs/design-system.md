# Website design system / 网站设计规范

## Foundation / 基础

The website uses React + Vite, Tailwind CSS v4, and shadcn/ui with Radix primitives. `site/components.json` records the registry and import aliases. The editable component sources live in `site/src/components/ui/`; the shared brand, typography, radius, and surface tokens live in `site/src/style.css`.

网站采用 React + Vite、Tailwind CSS v4 与基于 Radix 的 shadcn/ui。`site/components.json` 记录组件来源和路径别名；可维护的组件源码位于 `site/src/components/ui/`，品牌色、字号、圆角和表面颜色统一在 `site/src/style.css` 定义。

Keep the green palette and chip illustration. Use semantic tokens such as `primary`, `muted-foreground`, `card`, and `border`. The current theme is light. Inter is self-hosted; Chinese text uses system Chinese fonts. No external font service is required.

保留绿色主题与芯片插画。使用 `primary`、`muted-foreground`、`card` 和 `border` 等语义颜色。目前采用浅色主题；Inter 字体随网站托管，中文使用系统字体，无需外部字体服务。

Use a warm light background, white content cards, and restrained green tints to separate sections. The hero's dark circuit board is a decorative inline SVG in `ChipIllustration.tsx`, with no external image request. Circuit colors and card shadows use shared tokens.

采用偏暖的浅色底、白色内容卡片和淡绿色分区。首屏的深绿电路板由 `ChipIllustration.tsx` 中的内联 SVG 绘制，仅作装饰，无需外部图片请求；电路颜色与卡片阴影使用统一变量。

## Type and spacing / 字号与间距

Sizes use rem, with a browser default of 16px. English and Chinese share the same scale; Chinese headings avoid negative letter spacing.

字号使用 rem，以浏览器默认 16px 为基准。中英文共用字号层级，中文标题不采用负字距。

| Role / 用途 | Default size / 默认字号 | Rule / 规则 |
| --- | --- | --- |
| Body, resource summaries, search and select / 正文、资源说明、搜索和选择框 | 16px | Line height 1.75 / 行高 1.75 |
| Intro text / 页面导语 | 18px | Line height 1.7–1.75 / 行高 1.7–1.75 |
| Card titles / 卡片标题 | 20px | Sidebar panel titles 18px / 侧栏标题 18px |
| Section titles / 栏目标题 | 24–30px | Scale with available width / 随可用宽度调整 |
| Eyebrows, action links, navigation, field labels / 栏目提示、操作链接、导航、表单标签 | 14px | Keep on mobile / 手机端保持字号 |
| Tags, dates, counts in card footers, source timestamps / 标签、日期、卡片底部计数、来源时间 | 13px | Supporting information / 辅助信息 |

Use Tailwind's 4px spacing scale; prefer 8, 12, 16, 24, 32, 48, and 64px. Standard controls are at least 44px tall; primary large actions are 48px. Tag links are at least 32px tall and wrap. Card padding is 24px, compact sidebar panels 16px. The shared radius is 12px, with smaller controls and tags derived from it.

间距使用 Tailwind 的 4px 刻度，优先采用 8、12、16、24、32、48、64px。标准控件至少高 44px，主要大按钮为 48px；标签链接至少高 32px，并允许换行。卡片内边距 24px，紧凑侧栏 16px；统一基础圆角为 12px，控件和标签圆角由此派生。

The hero artwork and reading-path panel use a 24px radius and return to 16px on mobile. Hover effects use a small lift or soft shadow; reduced-motion preferences disable transitions and smooth scrolling.

首屏插画与阅读路线分区使用 24px 圆角，手机端收为 16px。悬停反馈采用轻微抬升或柔和阴影；用户设置减少动态效果时，关闭过渡和顺滑滚动。

## Components and responsive layout / 组件与响应式

Use `Button` for actions, `Badge` for resource tags, composed `Card` sections for resources and panels, `FieldGroup` + `Field` + `FieldLabel` for forms, `InputGroup` for search, `NativeSelect` for filters, `Collapsible` for mobile filters, `ToggleGroup` for view/category choices, `Pagination` for page navigation, `Empty` for no results, and `Separator` for dividers. Preserve semantic headings and visible keyboard focus. Native selects retain the platform's mobile picker.

操作使用 `Button`，资源标签使用 `Badge`，资源与侧栏使用完整组合的 `Card`，表单使用 `FieldGroup` + `Field` + `FieldLabel`，搜索使用 `InputGroup`，筛选使用 `NativeSelect`，手机筛选折叠使用 `Collapsible`，视图和分类选择使用 `ToggleGroup`，翻页使用 `Pagination`，无结果使用 `Empty`，分隔使用 `Separator`。保留语义标题和清晰的键盘焦点，原生下拉框在手机上使用系统选择器。

Change component defaults centrally instead of overriding colors and typography at each call site. Use page classes for layout. On narrow screens, wrap headings and actions and reduce grid columns rather than shrinking body and control text. Keep resource detail prose at 16px in both layouts.

组件的字号、颜色和默认尺寸集中维护，页面样式负责布局。窄屏时让标题和操作换行、减少网格列数，保持正文与控件的可读字号；详情正文在桌面和手机端均为 16px。

The five-step reading path uses connected numbered markers: five columns on wide screens, two columns on tablets, and a vertical timeline on mobile. Task and direction cards combine an icon, a descriptive heading, and a clear navigation affordance. Search, sort, filters, and selected conditions share one bordered control panel.

五步阅读路线使用连续的数字标记：宽屏五列、平板两列、手机纵向时间线。任务与方向卡片组合图标、明确标题和跳转提示。搜索、排序、筛选和已选条件集中于同一个带边框的操作面板。

## Links and discovery / 链接与发现

Use Lucide SVGs consistently: right arrows for internal detail links, up-right arrows for external links, and stars for snapshot counts. The GitHub mark comes from Octicons; its MIT notice ships in `site/public/octicons-license.txt`. The header reuses the chip favicon. Icons supplement visible labels or accessible names.

统一使用 Lucide SVG：站内详情链接用向右箭头，外链用右上箭头，快照计数用星形图标。GitHub 标识取自 Octicons，MIT 声明随 `site/public/octicons-license.txt` 发布；页头复用芯片 favicon。图标配合可见文字或无障碍名称使用。

Resource cards expose at most one recorded repository, paper, and original-source link; details retain all links. Never infer a website or dataset URL. Compact lists use 16px summaries and 18px titles. Mobile filters start collapsed, with removable selected conditions outside the collapsed region. Page navigation scrolls to and focuses the results toolbar.

资源卡片最多各展示一条已记录的代码仓库、论文和原始来源链接，详情保留全部链接，不推测官网或数据集地址。紧凑列表保持 16px 说明和 18px 标题；手机筛选默认收起，已选条件在折叠区外单独移除。翻页后滚动并聚焦结果工具栏。

Resource profiles use small CSS bars with the shared `primary` and `border` tokens, plus visible text counts and provenance. Bars are decorative for assistive technology; text provides the metric name and value. Do not use a progress-bar role for popularity or citation counts. Dashed unavailable tracks differ from measured-zero solid tracks. Avoid score colors, composite ratings, and relative “recent” labels inferred from push dates. Keep the same scale in cards and compact lists; reading-path badges link to recorded steps.

资源速览用共享 `primary` 与 `border` 变量绘制小型 CSS 横条，并显示计数和来源。横条对辅助技术仅作装饰，由文字提供指标名称与数值；关注度与引用量不使用进度条语义。虚线表示缺失，空实线表示实际零值。避免评分颜色、综合分数和仅凭推送日期推断的“近期活跃”标签。卡片与紧凑列表使用同一尺度，阅读路线标签链接到已有步骤。

## Maintenance / 维护

From `site/`, add components using `npx shadcn@latest add <name>`. Existing sources contain deliberate readability changes; review upstream diffs before updating them. Run the production build and static-page checks, then check both languages at desktop and mobile widths. Verify search, filters, keyboard focus, and language switching. See [frontend commands](../site/README.md).

在 `site/` 中使用 `npx shadcn@latest add <name>` 添加组件。现有源码已按可读性要求调整，更新组件前先查看上游差异。运行生产构建与静态页面检查，再检查中英文的桌面和手机排版，以及搜索、筛选、键盘焦点和语言切换。命令见[前端说明](../site/README.md)。
