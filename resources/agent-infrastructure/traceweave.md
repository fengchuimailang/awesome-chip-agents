# TraceWeave

<!-- metadata
{
  "id": "traceweave",
  "title": "TraceWeave",
  "name": "TraceWeave",
  "date": "2026-08-27",
  "tags": [
    "infrastructure",
    "tool-use",
    "verification",
    "debugging",
    "waveform"
  ],
  "types": [
    "project",
    "platform"
  ],
  "links": [
    {
      "label": "Simulation-debugging MCP server",
      "url": "https://github.com/gokeshenzhen/TraceWeave",
      "kind": "repository"
    },
    {
      "label": "Earliest verified tagged release (v2.0.0)",
      "url": "https://github.com/gokeshenzhen/TraceWeave/releases/tag/v2.0.0",
      "kind": "source"
    }
  ],
  "related": [
    "wave-mcp",
    "waveform-mcp",
    "back-to-the-future"
  ],
  "also_in": [
    "verification-debugging"
  ],
  "summary": [
    "An RTL/SoC debugging MCP server linking compile records, logs, RTL, waveforms, signal connectivity, and X/Z provenance.",
    "面向 RTL/SoC 的调试 MCP 服务，将编译记录、日志、RTL、波形、信号连通性和 X/Z 来源关联起来。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "source"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-08-27
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Verification / 验证](../tags/verification.md) · [Debugging / 调试](../tags/debugging.md) · [Waveforms / 波形分析](../tags/waveform.md)

## Links / 相关链接

- **Repository / 仓库：** [Simulation-debugging MCP server](https://github.com/gokeshenzhen/TraceWeave)
- **Source / 原始来源：** [Earliest verified tagged release (v2.0.0)](https://github.com/gokeshenzhen/TraceWeave/releases/tag/v2.0.0)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [gokeshenzhen/TraceWeave](https://github.com/gokeshenzhen/TraceWeave) | 131 | 2026-10-13T11:54:53Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [wave-mcp](../../resources/agent-infrastructure/wave-mcp.md)
- [waveform-mcp](../../resources/agent-infrastructure/waveform-mcp.md)
- [Back to the Future](../../resources/verification-debugging/back-to-the-future.md)
<!-- resource:end -->

## English

TraceWeave exposes evidence-driven simulation debugging through MCP. It connects compile records, simulation logs, RTL source, and VCD/FSDB waveforms, with optional FST support on Linux, to locate failure times, signals, and driving logic. Documented capabilities include hierarchy and source browsing, driver/load/connectivity queries, X/Z history, waveform comparison, protocol analysis, and log parsing. VCD and Source Graph paths can operate without a commercial license; FSDB reads require a local Verdi FsdbReader SDK, and Verdi NPI/KDB paths additionally require the corresponding commercial tools and licenses. The project uses MIT.

The date follows the earliest verified tagged release, v2.0.0 on August 27, 2026; it does not establish the date of the first development version.

## 简体中文

TraceWeave 通过 MCP 提供证据驱动的仿真调试。它关联编译记录、仿真日志、RTL 源码和 VCD/FSDB 波形，并在 Linux 上提供可选 FST 支持，以定位失败时间、信号和驱动逻辑。文档中的能力包括层次与源码浏览、驱动/负载/连通性查询、X/Z 历史、波形对比、协议分析和日志解析。VCD 和 Source Graph 路径可不依赖商业许可证；FSDB 读取需要本地 Verdi FsdbReader SDK，Verdi NPI/KDB 路径还需要相应商业工具与许可证。项目采用 MIT。

日期采用最早核实的标记版本，即 2026 年 8 月 27 日的 v2.0.0，不代表首个开发版本的日期。

