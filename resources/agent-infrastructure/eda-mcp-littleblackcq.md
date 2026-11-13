# eda-mcp

<!-- metadata
{
  "id": "eda-mcp-littleblackcq",
  "title": "eda-mcp",
  "name": "eda-mcp (LittleBlackCQ)",
  "date": null,
  "tags": [
    "infrastructure",
    "tool-use",
    "rtl",
    "simulation",
    "waveform"
  ],
  "types": [
    "platform"
  ],
  "links": [
    {
      "label": "Containerized MCP server and toolchain",
      "url": "https://github.com/LittleBlackCQ/eda-mcp",
      "kind": "repository"
    }
  ],
  "related": [
    "waveform-mcp",
    "mcp4eda",
    "eda-mcp"
  ],
  "also_in": [
    "rtl-generation",
    "verification-debugging"
  ],
  "summary": [
    "A Dockerized MCP server bundling Yosys synthesis, Icarus simulation, Verilator lint, and waveform-cli queries.",
    "Docker 化 MCP 服务，打包 Yosys 综合、Icarus 仿真、Verilator lint 和 waveform-cli 查询。"
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
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [RTL / RTL](../tags/rtl.md) · [Simulation / 仿真](../tags/simulation.md) · [Waveforms / 波形分析](../tags/waveform.md)

## Links / 相关链接

- **Repository / 仓库：** [Containerized MCP server and toolchain](https://github.com/LittleBlackCQ/eda-mcp)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [LittleBlackCQ/eda-mcp](https://github.com/LittleBlackCQ/eda-mcp) | 2 | 2026-06-17T06:42:14Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [waveform-mcp](../../resources/agent-infrastructure/waveform-mcp.md)
- [MCP4EDA](../../resources/agent-infrastructure/mcp4eda.md)
- [EDA_MCP](../../resources/agent-infrastructure/eda-mcp.md)
<!-- resource:end -->

## English

LittleBlackCQ's eda-mcp packages a Python stdio MCP server with Yosys, Icarus Verilog, Verilator, and waveform-cli in a Docker image. Tools cover workspace file operations, synthesis, simulation, lint, and VCD/FST hierarchy, values, and event queries. It is distinct from SiliCAD's EDA_MCP and does not document a physical-design backend. The repository includes a counter example and an end-to-end smoke-test script.

The first public date has not been verified. The reviewed repository has no top-level license file or license declaration in pyproject.toml; the bundled third-party tools retain their own terms.

## 简体中文

LittleBlackCQ 的 eda-mcp 将 Python stdio MCP 服务与 Yosys、Icarus Verilog、Verilator 和 waveform-cli 打包进 Docker 镜像。工具覆盖工作区文件操作、综合、仿真、lint，以及 VCD/FST 层次、取值和事件查询。它与 SiliCAD 的 EDA_MCP 是不同项目，文档未提供物理设计后端。仓库包含计数器示例和端到端冒烟测试脚本。

首次公开日期尚未核实。所核实仓库未提供顶层许可证文件，pyproject.toml 也未声明许可证；打包的第三方工具仍适用各自条款。

