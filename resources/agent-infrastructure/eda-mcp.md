# EDA_MCP: Agentic Full-Flow EDA Control Plane & Autonomous Chip Design Workspace

<!-- metadata
{
  "id": "eda-mcp",
  "title": "EDA_MCP: Agentic Full-Flow EDA Control Plane & Autonomous Chip Design Workspace",
  "name": "EDA_MCP",
  "direction": "agent-infrastructure",
  "date": null,
  "date_basis": "unknown",
  "tags": ["infrastructure", "tool-use", "eda-flow", "analog-rf", "simulation"],
  "types": ["project", "platform"],
  "links": [
    {"label": "MCP server implementation and tool setup", "url": "https://github.com/SiliCAD/EDA_MCP", "kind": "repository"}
  ],
  "related": [],
  "also_in": ["analog-rf"],
  "summary": [
    "Exposes remote Virtuoso and Eldo sessions to agents through MCP, with workspace synchronization and physical-verification workflows.",
    "通过 MCP 向 Agent 开放远程 Virtuoso、Eldo 会话，并提供工作区同步和物理验证流程。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** Not recorded / 待核实
- **Date basis / 日期依据：** Date not recorded / 日期待核实
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md) · [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Simulation / 仿真](../tags/simulation.md)

## Links / 相关链接

- **Repository / 仓库：** [MCP server implementation and tool setup](https://github.com/SiliCAD/EDA_MCP)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [SiliCAD/EDA_MCP](https://github.com/SiliCAD/EDA_MCP) | 34 | 2026-10-27T20:33:43Z | 2026-10-31T05:54:35Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。
<!-- resource:end -->

## English

[EDA_MCP](https://github.com/SiliCAD/EDA_MCP) connects local AI agents to remote Linux EDA environments through FastMCP and SSH. It provides workspace synchronization, Virtuoso SKILL execution, interactive Eldo simulation, waveform visualization, and remote commands for Calibre DRC, LVS, and parasitic extraction workflows. The repository includes client/server code, configuration templates, tests, and an author-provided demonstration.

Use requires access to the corresponding commercial EDA installations, licenses, and PDK. The full-flow demonstration is reported by the project authors. The first public date has not been verified.

## 简体中文

[EDA_MCP](https://github.com/SiliCAD/EDA_MCP)通过 FastMCP 与 SSH，将本地 AI Agent 连接到远程 Linux EDA 环境。它提供工作区同步、Virtuoso SKILL 执行、Eldo 交互仿真、波形可视化，以及用于 Calibre DRC、LVS 和寄生参数提取流程的远程命令接口。仓库包含客户端与服务端代码、配置模板、测试和作者提供的演示。

运行需要可访问的商业 EDA 安装、相应许可证和 PDK。完整流程演示属于项目作者报告，首次公开日期尚未核实。
