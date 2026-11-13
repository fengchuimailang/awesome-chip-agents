# wave-mcp: Open-source, license-free MCP server for RTL waveform debug

<!-- metadata
{
  "id": "wave-mcp",
  "title": "wave-mcp: Open-source, license-free MCP server for RTL waveform debug",
  "name": "wave-mcp",
  "direction": "agent-infrastructure",
  "date": "2026-08",
  "date_basis": "source",
  "tags": ["infrastructure", "tool-use", "rtl", "waveform", "debugging"],
  "types": ["project", "platform"],
  "links": [
    {"label": "MCP server implementation and documentation", "url": "https://github.com/Tencent/wave-mcp", "kind": "repository"},
    {"label": "First functional release (v0.1.0)", "url": "https://github.com/Tencent/wave-mcp/releases/tag/v0.1.0", "kind": "source"},
    {"label": "Official changelog", "url": "https://github.com/Tencent/wave-mcp/blob/main/CHANGELOG.md", "kind": "source"}
  ],
  "related": ["eda-mcp", "booley", "back-to-the-future"],
  "also_in": ["verification-debugging"],
  "summary": [
    "Exposes FST waveform queries, RTL driver analysis, value/X tracing, and waveform comparison to LLM agents through MCP.",
    "通过 MCP 为 LLM Agent 提供 FST 波形查询、RTL 驱动分析、值与 X 态追踪及波形对比。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-08
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [RTL / RTL](../tags/rtl.md) · [Waveforms / 波形分析](../tags/waveform.md) · [Debugging / 调试](../tags/debugging.md)

## Links / 相关链接

- **Repository / 仓库：** [MCP server implementation and documentation](https://github.com/Tencent/wave-mcp)
- **Source / 原始来源：** [First functional release (v0.1.0)](https://github.com/Tencent/wave-mcp/releases/tag/v0.1.0)
- **Source / 原始来源：** [Official changelog](https://github.com/Tencent/wave-mcp/blob/main/CHANGELOG.md)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [Tencent/wave-mcp](https://github.com/Tencent/wave-mcp) | 282 | 2026-10-23T02:50:19Z | 2026-11-13T06:44:50Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [EDA_MCP](../../resources/agent-infrastructure/eda-mcp.md)
- [Booley](../../resources/agent-infrastructure/booley.md)
- [Back to the Future](../../resources/verification-debugging/back-to-the-future.md)
<!-- resource:end -->

## English

[wave-mcp](https://github.com/Tencent/wave-mcp), from Tencent's Penglai Lab verification team, combines FST waveform access with pyslang RTL elaboration to give LLM agents hierarchy, signal-value, connectivity, driver, and fan-in/fan-out queries. It supports cross-module value/X tracing, pass/fail waveform comparison, and RTL-only static sessions before simulation. MCP and CLI interfaces expose these capabilities; simulation runs in the user's existing flow.

The repository includes implementation code, examples, tests, and offline deployment tooling. Production-chip, OpenTitan, and XiangShan validation results are reported by the authors, rather than independently evaluated here. The core project uses Apache-2.0; FSDB conversion requires separately available Verdi FsdbReader libraries, and the browser viewer requires separately built Surfer assets. Linux x86_64 is the main supported platform.

The publication month is recorded as August 2026: the [changelog](https://github.com/Tencent/wave-mcp/blob/main/CHANGELOG.md) dates the initial release to August 20, while v0.1.0 was published on [GitHub](https://github.com/Tencent/wave-mcp/releases/tag/v0.1.0) and [PyPI](https://pypi.org/project/wave-mcp/0.1.0/) on August 25. The earlier [PyPI v0.0.1](https://pypi.org/project/wave-mcp/0.0.1/) explicitly reserved the package name without a functional release.

## 简体中文

[wave-mcp](https://github.com/Tencent/wave-mcp)由腾讯蓬莱实验室验证团队开源，将 FST 波形访问与 pyslang RTL 精化结合，为 LLM Agent 提供层次、信号值、连通性、驱动和扇入/扇出查询。它支持跨模块值与 X 态追踪、pass/fail 波形对比，以及仿真前仅凭 RTL 的静态分析；这些能力可通过 MCP 或 CLI 调用，仿真仍由使用者现有流程完成。

仓库包含实现代码、示例、测试和离线部署工具。生产芯片项目、OpenTitan 与香山上的验证结果由项目作者报告，此处未进行独立评测。核心项目采用 Apache-2.0；FSDB 转换依赖另行提供的 Verdi FsdbReader 运行库，浏览器查看器需要单独构建 Surfer 资产。主要支持平台为 Linux x86_64。

发布月份记为 2026 年 8 月：[更新日志](https://github.com/Tencent/wave-mcp/blob/main/CHANGELOG.md)将首次发布记为 8 月 20 日，而 [GitHub v0.1.0](https://github.com/Tencent/wave-mcp/releases/tag/v0.1.0) 与 [PyPI v0.1.0](https://pypi.org/project/wave-mcp/0.1.0/) 发布于 8 月 25 日。更早的 [PyPI v0.0.1](https://pypi.org/project/wave-mcp/0.0.1/)明确仅用于包名占位，尚未提供可用版本。
