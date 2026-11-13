# qucs-mcp

<!-- metadata
{
  "id": "qucs-mcp",
  "title": "qucs-mcp",
  "name": "qucs-mcp",
  "date": null,
  "tags": [
    "infrastructure",
    "tool-use",
    "analog-rf",
    "simulation"
  ],
  "types": [
    "project",
    "platform"
  ],
  "links": [
    {
      "label": "Qucs/QucsStudio MCP server",
      "url": "https://github.com/leonardoAB1/qucs-mcp",
      "kind": "repository"
    }
  ],
  "related": [
    "ltspice-mcp",
    "circuit-sim-mcp"
  ],
  "also_in": [
    "analog-rf"
  ],
  "summary": [
    "A Python MCP server for generating Qucs schematics, running headless QucsStudio simulations, and parsing result files.",
    "Python MCP 服务，用于生成 Qucs 原理图、运行无界面 QucsStudio 仿真并解析结果文件。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "unknown"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** Not recorded / 待核实
- **Date basis / 日期依据：** Date not recorded / 日期待核实
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Simulation / 仿真](../tags/simulation.md)

## Links / 相关链接

- **Repository / 仓库：** [Qucs/QucsStudio MCP server](https://github.com/leonardoAB1/qucs-mcp)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [leonardoAB1/qucs-mcp](https://github.com/leonardoAB1/qucs-mcp) | 2 | 2026-07-11T06:34:12Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [ltspice-mcp](../../resources/agent-infrastructure/ltspice-mcp.md)
- [circuit-sim-mcp](../../resources/agent-infrastructure/circuit-sim-mcp.md)
<!-- resource:end -->

## English

qucs-mcp gives an MCP-compatible agent tools to create Qucs/QucsStudio schematics and netlists, run the qucssim backend, parse binary .dat results, and manage circuit project files. Documented simulation types include DC, AC, transient, parameter sweeps, and S-parameters. The documented installation uses Windows QucsStudio, Python 3.11 or newer, and uv; the simulator must be installed separately. The package metadata declares MIT. The first public date has not been verified.

## 简体中文

qucs-mcp 为兼容 MCP 的 Agent 提供创建 Qucs/QucsStudio 原理图与网表、运行 qucssim 后端、解析二进制 .dat 结果及管理电路项目文件的工具。文档列出的仿真类型包括 DC、AC、瞬态、参数扫描和 S 参数。安装说明采用 Windows QucsStudio、Python 3.11 或更高版本及 uv，需要另行安装仿真器。包元数据声明 MIT，首次公开日期尚未核实。

