# Analog Canvas

<!-- metadata
{
  "id": "analog-canvas",
  "download_sources": [
    {
      "id": "mcp-release-assets",
      "provider": "github-releases",
      "repository": "cascode-ai/analog-canvas",
      "tag_prefix": "mcp-"
    }
  ],
  "title": "Analog Canvas",
  "name": "Analog Canvas",
  "direction": "agent-infrastructure",
  "date": "2026-08-14",
  "date_basis": "source",
  "tags": ["infrastructure", "tool-use", "analog-rf", "eda-flow"],
  "types": ["project", "platform"],
  "links": [
    {
      "label": "Schematic editor and Agent interfaces",
      "url": "https://github.com/cascode-ai/analog-canvas",
      "kind": "repository"
    },
    {
      "label": "Agent integration and workflow documentation",
      "url": "https://github.com/cascode-ai/analog-canvas/blob/main/docs/agent/README.md",
      "kind": "source"
    },
    {
      "label": "Earliest verified MCP release (mcp-v0.1.0)",
      "url": "https://github.com/cascode-ai/analog-canvas/releases/tag/mcp-v0.1.0",
      "kind": "source"
    }
  ],
  "related": ["qucs-mcp", "ltspice-mcp", "virtuoso-bridge-lite"],
  "also_in": ["analog-rf"],
  "summary": [
    "A hierarchical schematic editor exposing typed circuit snapshots and transaction-based edits to agents through MCP and HTTP, with SPICE/Spectre interchange.",
    "层级原理图编辑器，通过 MCP 与 HTTP 向 Agent 提供结构化电路快照和事务式编辑，并支持 SPICE/Spectre 交换。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-08-14
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md)

## Links / 相关链接

- **Repository / 仓库：** [Schematic editor and Agent interfaces](https://github.com/cascode-ai/analog-canvas)
- **Source / 原始来源：** [Agent integration and workflow documentation](https://github.com/cascode-ai/analog-canvas/blob/main/docs/agent/README.md)
- **Source / 原始来源：** [Earliest verified MCP release (mcp-v0.1.0)](https://github.com/cascode-ai/analog-canvas/releases/tag/mcp-v0.1.0)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [cascode-ai/analog-canvas](https://github.com/cascode-ai/analog-canvas) | 185 | 2026-11-22T20:26:23Z | 2026-11-22T21:38:14Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Download metrics / 下载指标

| Source / 来源 | Downloads / 下载量 | Scope / 范围 | Fetched (UTC) / 采集 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [github-releases: cascode-ai/analog-canvas](https://github.com/cascode-ai/analog-canvas/releases) | 7,292 | Available assets / 当前可用附件; tag prefix: mcp- | 2026-11-22T21:38:19Z | Snapshot / 快照 |

Package and release-asset download counts use different scopes; they are not unique users, verified MCP installations, or website link clicks.

包下载量与 Release 附件下载量采用不同口径，不等于独立用户、已核实的 MCP 安装量或本站链接点击量。

## Related resources / 相关资源

- [qucs-mcp](../../resources/agent-infrastructure/qucs-mcp.md)
- [ltspice-mcp](../../resources/agent-infrastructure/ltspice-mcp.md)
- [Virtuoso-Bridge-Lite](../../resources/agent-infrastructure/virtuoso-bridge-lite.md)
<!-- resource:end -->

## English

Analog Canvas is a connectivity-aware web schematic editor for human and LLM-agent workflows. It supports reusable circuit hierarchy, structural SPICE/Spectre import, deterministic netlist export, and SVG/PDF figures. A versioned stdio MCP adapter and HTTP Agent Kit expose the editor's typed circuit snapshots and transaction-based edits, supporting inspect-edit-review workflows on a shared circuit model.

The Agent documentation also covers simulation calls, measurements, and result handoff; availability depends on the connected deployment and simulator setup. The Windows offline preview excludes Agent and simulation services. The repository includes circuit fixtures and examples. Code uses AGPL-3.0-only; third-party assets and reference datasets retain their own terms.

The date follows the earliest verified MCP release, mcp-v0.1.0 on August 14, 2026; an earlier initial project-publication date has not been established.

## 简体中文

Analog Canvas 是面向人与 LLM Agent 工作流、可感知电路连通性的网页原理图编辑器。它支持可复用的电路层级、结构化 SPICE/Spectre 导入、确定性网表导出及 SVG/PDF 图稿。带版本的 stdio MCP 适配器和 HTTP Agent Kit 开放编辑器的结构化电路快照与事务式编辑，使 Agent 能基于同一电路模型完成检查、修改和复核。

Agent 文档还覆盖仿真调用、测量和结果交接，实际可用性取决于连接的部署环境和仿真器配置。Windows 离线预览版不提供 Agent 与仿真服务。仓库包含电路测试样例和示例；代码采用 AGPL-3.0-only，第三方资产和参考数据集保留各自条款。

日期采用最早核实的 MCP 发布版本，即 2026 年 8 月 14 日的 mcp-v0.1.0；项目更早的首次公开日期尚未确认。
