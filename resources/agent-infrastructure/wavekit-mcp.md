# wavekit-mcp

<!-- metadata
{
  "id": "wavekit-mcp",
  "download_sources": [
    {
      "id": "pypi-month",
      "provider": "pypistats",
      "package": "wavekit-mcp",
      "period": "month"
    }
  ],
  "title": "wavekit-mcp",
  "name": "wavekit-mcp",
  "direction": "agent-infrastructure",
  "date": "2026-03-12",
  "date_basis": "source",
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
      "label": "Persistent waveform-analysis MCP server",
      "url": "https://github.com/cxzzzz/wavekit-mcp",
      "kind": "repository"
    },
    {
      "label": "First PyPI release (0.1.0)",
      "url": "https://pypi.org/project/wavekit-mcp/0.1.0/",
      "kind": "source"
    }
  ],
  "related": [
    "waveform-mcp",
    "wave-mcp",
    "traceweave"
  ],
  "also_in": [
    "verification-debugging"
  ],
  "summary": [
    "Provides a persistent MCP Python environment for querying and analyzing VCD, FST, and FSDB waveforms with wavekit.",
    "通过持久化 MCP Python 环境调用 wavekit，查询和分析 VCD、FST 与 FSDB 波形。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-03-12
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Waveforms / 波形分析](../tags/waveform.md) · [Debugging / 调试](../tags/debugging.md)

## Links / 相关链接

- **Repository / 仓库：** [Persistent waveform-analysis MCP server](https://github.com/cxzzzz/wavekit-mcp)
- **Source / 原始来源：** [First PyPI release (0.1.0)](https://pypi.org/project/wavekit-mcp/0.1.0/)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [cxzzzz/wavekit-mcp](https://github.com/cxzzzz/wavekit-mcp) | 11 | 2026-07-27T16:22:17Z | 2026-11-22T21:38:14Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Download metrics / 下载指标

| Source / 来源 | Downloads / 下载量 | Scope / 范围 | Fetched (UTC) / 采集 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [pypistats: wavekit-mcp](https://pypistats.org/packages/wavekit-mcp) | 74 | PyPI Stats: last month | 2026-11-22T21:38:19Z | Snapshot / 快照 |

Package and release-asset download counts use different scopes; they are not unique users, verified MCP installations, or website link clicks.

包下载量与 Release 附件下载量采用不同口径，不等于独立用户、已核实的 MCP 安装量或本站链接点击量。

## Related resources / 相关资源

- [waveform-mcp](../../resources/agent-infrastructure/waveform-mcp.md)
- [wave-mcp](../../resources/agent-infrastructure/wave-mcp.md)
- [TraceWeave](../../resources/agent-infrastructure/traceweave.md)
<!-- resource:end -->

## English

wavekit-mcp gives AI assistants a persistent Python execution session backed by wavekit for loading VCD, FST, and FSDB waveforms, applying temporal pattern matching, computing statistics, detecting anomalies, and extracting events. Its MCP tools include session management, code execution, execution history, and API-documentation lookup, so intermediate Python objects can persist across calls while the server returns bounded textual results.

The README documents RestrictedPython-based worker execution, disabled file I/O by default, and configurable import and path allowlists. It also states that this is not a complete sandbox for hostile code. The server and the underlying wavekit package are separate dependencies; the first PyPI release of wavekit-mcp was published on March 12, 2026.

## 简体中文

wavekit-mcp 为 AI 助手提供基于 wavekit 的持久化 Python 执行会话，用于加载 VCD、FST 和 FSDB 波形，执行时序模式匹配、统计分析、异常检测和事件提取。其 MCP 工具包括会话管理、代码执行、执行历史和 API 文档查询，使中间 Python 对象能够跨调用保留，同时对返回的文本结果设置上限。

README 说明其工作进程使用 RestrictedPython，默认关闭文件 I/O，并可配置导入和路径白名单；项目也明确指出这不是针对恶意代码的完整沙箱。服务端与底层 wavekit 包需要分别安装；wavekit-mcp 首个 PyPI 版本于 2026 年 3 月 12 日发布。
