# Waveform MCP Server

<!-- metadata
{
  "id": "waveform-mcp",
  "title": "Waveform MCP Server",
  "name": "waveform-mcp",
  "date": "2026-03-11",
  "tags": [
    "infrastructure",
    "tool-use",
    "waveform",
    "debugging"
  ],
  "types": [
    "project",
    "platform"
  ],
  "links": [
    {
      "label": "Rust MCP server and CLI",
      "url": "https://github.com/jiegec/waveform-mcp",
      "kind": "repository"
    },
    {
      "label": "Earliest published crate version (0.4.0)",
      "url": "https://crates.io/crates/waveform-mcp/0.4.0",
      "kind": "source"
    }
  ],
  "related": [
    "wave-mcp",
    "traceweave",
    "eda-mcp-littleblackcq"
  ],
  "also_in": [
    "verification-debugging"
  ],
  "summary": [
    "A Rust MCP server and CLI using wellen to query VCD/FST hierarchy, signal metadata, values, and events.",
    "基于 Rust 与 wellen 的 MCP 服务和 CLI，用于查询 VCD/FST 层次、信号元数据、取值和事件。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "source"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-03-11
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Waveforms / 波形分析](../tags/waveform.md) · [Debugging / 调试](../tags/debugging.md)

## Links / 相关链接

- **Repository / 仓库：** [Rust MCP server and CLI](https://github.com/jiegec/waveform-mcp)
- **Source / 原始来源：** [Earliest published crate version (0.4.0)](https://crates.io/crates/waveform-mcp/0.4.0)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [jiegec/waveform-mcp](https://github.com/jiegec/waveform-mcp) | 49 | 2026-11-10T16:22:07Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [wave-mcp](../../resources/agent-infrastructure/wave-mcp.md)
- [TraceWeave](../../resources/agent-infrastructure/traceweave.md)
- [eda-mcp (LittleBlackCQ)](../../resources/agent-infrastructure/eda-mcp-littleblackcq.md)
<!-- resource:end -->

## English

waveform-mcp uses the Rust wellen library to read and analyze VCD and FST files. It exposes hierarchy, signal metadata, signal values, change events, and expression-based conditional events through eight MCP tools, with stdio and streamable HTTP transports. A standalone waveform-cli provides the same waveform-query building blocks for scripts and other servers. Simulation and RTL elaboration remain external to this focused waveform reader. The project uses MIT.

The date follows the earliest version currently documented by crates.io, 0.4.0 on March 11, 2026; an earlier repository-publication date has not been verified.

## 简体中文

waveform-mcp 使用 Rust 的 wellen 库读取和分析 VCD、FST 文件。它通过八个 MCP 工具提供层次、信号元数据、信号取值、变化事件和基于表达式的条件事件查询，并支持 stdio 与可流式 HTTP 传输。独立的 waveform-cli 为脚本和其他服务提供相同的波形查询基础能力。该项目专注于波形读取，仿真和 RTL 精化仍由外部工具完成，采用 MIT。

日期采用 crates.io 当前记录的最早版本，即 2026 年 3 月 11 日的 0.4.0；更早的仓库公开日期尚未核实。

