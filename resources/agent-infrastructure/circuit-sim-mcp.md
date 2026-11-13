# Circuit Simulation MCP Server

<!-- metadata
{
  "id": "circuit-sim-mcp",
  "title": "Circuit Simulation MCP Server",
  "name": "circuit-sim-mcp",
  "date": null,
  "tags": [
    "infrastructure",
    "tool-use",
    "analog-rf",
    "simulation"
  ],
  "types": [
    "platform"
  ],
  "links": [
    {
      "label": "PySpice MCP server implementation",
      "url": "https://github.com/ghensley/circuit-sim-mcp",
      "kind": "repository"
    }
  ],
  "related": [
    "ltspice-mcp",
    "qucs-mcp"
  ],
  "also_in": [
    "analog-rf"
  ],
  "summary": [
    "A PySpice/ngspice MCP server for circuit construction, DC, AC, and transient simulation, and result inspection.",
    "基于 PySpice/ngspice 的 MCP 服务，支持电路构建、DC、AC、瞬态仿真和结果检查。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "unknown"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** Not recorded / 待核实
- **Date basis / 日期依据：** Date not recorded / 日期待核实
- **Type / 类型：** Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Simulation / 仿真](../tags/simulation.md)

## Links / 相关链接

- **Repository / 仓库：** [PySpice MCP server implementation](https://github.com/ghensley/circuit-sim-mcp)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [ghensley/circuit-sim-mcp](https://github.com/ghensley/circuit-sim-mcp) | 1 | 2025-07-11T01:18:35Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [ltspice-mcp](../../resources/agent-infrastructure/ltspice-mcp.md)
- [qucs-mcp](../../resources/agent-infrastructure/qucs-mcp.md)
<!-- resource:end -->

## English

circuit-sim-mcp exposes PySpice and ngspice to an agent through tools for constructing circuits, adding components, running DC, AC, and transient analyses, and inspecting results. The repository documents an Apple Silicon/ngspice 44 setup and separates its basic main-branch implementation from advanced experimental features. ngspice and its native library remain external prerequisites; the author's platform-validation claims have not been independently reproduced here. The first public date has not been verified.

## 简体中文

circuit-sim-mcp 通过工具向 Agent 开放 PySpice 与 ngspice，用于构建电路、添加元件、执行 DC、AC 和瞬态分析并检查结果。仓库记录了 Apple Silicon/ngspice 44 配置，并将主分支基础实现与高级实验功能区分维护。ngspice 和原生库仍是外部前置条件，作者的平台验证声明未在此独立复现。首次公开日期尚未核实。

