# Virtuoso-Bridge-Lite

<!-- metadata
{
  "id": "virtuoso-bridge-lite",
  "title": "Virtuoso-Bridge-Lite",
  "name": "Virtuoso-Bridge-Lite",
  "direction": "agent-infrastructure",
  "date": null,
  "date_basis": "unknown",
  "tags": ["infrastructure", "tool-use", "analog-rf", "simulation", "eda-flow"],
  "types": ["project", "platform"],
  "links": [
    {"label": "Virtuoso and Spectre bridge implementation", "url": "https://github.com/Arcadia-1/virtuoso-bridge-lite", "kind": "repository"},
    {"label": "Official setup and usage guide", "url": "https://virtuoso-bridge.tokenzhang.com/guide/", "kind": "source"},
    {"label": "Optional MCP adapter documentation", "url": "https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/main/mcp/README.md", "kind": "source"}
  ],
  "related": ["eda-mcp"],
  "also_in": ["analog-rf"],
  "summary": [
    "Connects analog and mixed-signal design agents to Virtuoso and Spectre through Python, CLI, and optional MCP interfaces for design editing, simulation, and result reading.",
    "通过 Python、命令行和可选 MCP 接口，将模拟与混合信号设计 Agent 连接到 Virtuoso、Spectre，支持设计编辑、仿真与结果读取。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** Not recorded / 待核实
- **Date basis / 日期依据：** Date not recorded / 日期待核实
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Simulation / 仿真](../tags/simulation.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md)

## Links / 相关链接

- **Repository / 仓库：** [Virtuoso and Spectre bridge implementation](https://github.com/Arcadia-1/virtuoso-bridge-lite)
- **Source / 原始来源：** [Official setup and usage guide](https://virtuoso-bridge.tokenzhang.com/guide/)
- **Source / 原始来源：** [Optional MCP adapter documentation](https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/main/mcp/README.md)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [Arcadia-1/virtuoso-bridge-lite](https://github.com/Arcadia-1/virtuoso-bridge-lite) | 997 | 2026-11-04T21:50:47Z | 2026-11-05T00:47:44Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [EDA_MCP](../../resources/agent-infrastructure/eda-mcp.md)
<!-- resource:end -->

## English

[Virtuoso-Bridge-Lite](https://github.com/Arcadia-1/virtuoso-bridge-lite) connects coding agents to local or remote Cadence Virtuoso and Spectre environments. Python and command-line interfaces support SKILL execution, library/cell inspection, schematic and layout operations, Maestro simulation setup, and standalone Spectre simulation with PSF ASCII result parsing. The repository includes agent skills, examples, tests, and an [optional MCP adapter](https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/main/mcp/README.md) for exposing the existing APIs to MCP clients.

This is an independent MIT-licensed project. Use requires the relevant Cadence installations and licenses, plus process models or a PDK where applicable. Its offline checks and successful tool calls do not establish circuit correctness or electrical signoff. The first public date has not been verified; repository creation and push times are not used as publication dates.

## 简体中文

[Virtuoso-Bridge-Lite](https://github.com/Arcadia-1/virtuoso-bridge-lite)将编码 Agent 连接到本地或远程的 Cadence Virtuoso、Spectre 环境。Python 与命令行接口支持 SKILL 执行、库与 cell 查询、原理图和版图操作、Maestro 仿真设置，以及独立 Spectre 仿真和 PSF ASCII 结果解析。仓库提供 Agent 技能、示例、测试，以及向 MCP 客户端开放现有 API 的[可选 MCP 适配层](https://github.com/Arcadia-1/virtuoso-bridge-lite/blob/main/mcp/README.md)。

这是采用 MIT 许可证的独立项目。运行需要相应的 Cadence 安装和许可证，并按任务需要准备工艺模型或 PDK。离线检查和成功调用工具不代表电路正确或通过电气签核。首次公开日期尚未核实，不将仓库创建或推送时间用作发布日期。
