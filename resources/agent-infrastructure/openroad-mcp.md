# OpenROAD MCP Server

<!-- metadata
{
  "id": "openroad-mcp",
  "title": "OpenROAD MCP Server",
  "name": "OpenROAD MCP",
  "date": "2026-02-19",
  "tags": [
    "infrastructure",
    "tool-use",
    "physical-design",
    "eda-flow"
  ],
  "types": [
    "project",
    "platform"
  ],
  "links": [
    {
      "label": "MCP server implementation",
      "url": "https://github.com/The-OpenROAD-Project/OpenROAD-MCP",
      "kind": "repository"
    },
    {
      "label": "First tagged release (v0.1.0)",
      "url": "https://github.com/The-OpenROAD-Project/OpenROAD-MCP/releases/tag/v0.1.0",
      "kind": "source"
    }
  ],
  "related": [
    "mcp4eda",
    "hw-agent-tooling",
    "agentic-asic"
  ],
  "also_in": [
    "physical-design"
  ],
  "summary": [
    "Connects agents to OpenROAD and ORFS through MCP sessions, Tcl commands, metrics, and report-image inspection.",
    "通过 MCP 会话、Tcl 命令、指标和报告图像检查，将 Agent 连接到 OpenROAD 与 ORFS。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "source"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-02-19
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Physical design / 物理设计](../tags/physical-design.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md)

## Links / 相关链接

- **Repository / 仓库：** [MCP server implementation](https://github.com/The-OpenROAD-Project/OpenROAD-MCP)
- **Source / 原始来源：** [First tagged release (v0.1.0)](https://github.com/The-OpenROAD-Project/OpenROAD-MCP/releases/tag/v0.1.0)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [The-OpenROAD-Project/OpenROAD-MCP](https://github.com/The-OpenROAD-Project/OpenROAD-MCP) | 35 | 2026-11-13T00:29:54Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [MCP4EDA](../../resources/agent-infrastructure/mcp4eda.md)
- [hw-agent-tooling](../../resources/agent-infrastructure/hw-agent-tooling.md)
- [agentic-asic](../../resources/agent-infrastructure/agentic-asic.md)
<!-- resource:end -->

## English

OpenROAD MCP Server exposes interactive OpenROAD sessions, Tcl command execution, command history, metrics, and OpenROAD-flow-scripts (ORFS) report images to MCP clients. It provides an interface for agents to inspect and control physical-design work rather than a replacement for the underlying EDA tools. Operation requires Node.js 22 or newer and a local OpenROAD installation; ORFS and the corresponding design and technology files are needed for ORFS workflows. The server uses BSD-3-Clause.

The date follows the earliest verified GitHub release, v0.1.0 on February 19, 2026; the initial repository publication date has not been established.

## 简体中文

OpenROAD MCP Server 向 MCP 客户端开放交互式 OpenROAD 会话、Tcl 命令执行、命令历史、指标和 OpenROAD-flow-scripts（ORFS）报告图像，使 Agent 能够检查和控制物理设计工作。它是底层 EDA 工具的接口；运行需要 Node.js 22 或更高版本及本地 OpenROAD，使用 ORFS 流程还需要相应的 ORFS、设计和工艺文件。服务端采用 BSD-3-Clause。

日期采用最早核实的 GitHub 发布记录，即 2026 年 2 月 19 日的 v0.1.0；仓库最初公开日期尚未确认。

