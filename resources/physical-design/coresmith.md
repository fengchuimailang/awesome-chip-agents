# CoreSmith

<!-- metadata
{
  "id": "coresmith",
  "title": "CoreSmith",
  "name": "CoreSmith",
  "direction": "physical-design",
  "date": "2026-10-09",
  "date_basis": "source",
  "tags": ["physical-design", "eda-flow", "rtl", "multi-agent", "tool-use"],
  "types": ["project", "platform"],
  "links": [
    {"label": "Official implementation", "url": "https://github.com/facebookexperimental/coresmith", "kind": "repository"},
    {"label": "Initial open-source release changelog", "url": "https://github.com/facebookexperimental/coresmith/blob/main/CHANGELOG.md", "kind": "source"}
  ],
  "related": ["orfs-agent", "openroad"],
  "also_in": ["rtl-generation", "architecture-hls-codesign"],
  "summary": [
    "Orchestrates specification, RTL, verification, synthesis, and physical design with agents and tool-feedback repair loops.",
    "通过 Agent 与工具反馈修复循环，编排规格、RTL、验证、综合和物理设计。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-10-09
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Physical Design and EDA Flows / 物理设计与 EDA 流程
- **Tags / 标签：** [Physical design / 物理设计](../tags/physical-design.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md) · [RTL / RTL](../tags/rtl.md) · [Multi-agent / 多 Agent](../tags/multi-agent.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Repository / 仓库：** [Official implementation](https://github.com/facebookexperimental/coresmith)
- **Source / 原始来源：** [Initial open-source release changelog](https://github.com/facebookexperimental/coresmith/blob/main/CHANGELOG.md)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [facebookexperimental/coresmith](https://github.com/facebookexperimental/coresmith) | 51 | 2026-10-29T04:50:24Z | 2026-11-08T20:18:36Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [ORFS-agent](../../resources/physical-design/orfs-agent.md)
- [OpenROAD](../../resources/physical-design/openroad.md)
<!-- resource:end -->

## English

[CoreSmith](https://github.com/facebookexperimental/coresmith), published under facebookexperimental, uses LangGraph to coordinate architecture planning, Verilog generation, cocotb testbenches, synthesis, and backend implementation. Its toolchain includes Verilator, Yosys, OpenROAD, Magic, and netgen with Sky130 support. Diagnosis and retry loops feed tool failures back to the agents; a daemon, CLI, and MCP interface expose pipeline state and review decisions.

The [changelog](https://github.com/facebookexperimental/coresmith/blob/main/CHANGELOG.md) dates the initial open-source release, version 1.0.0, to **2026-10-09**. The README's reference to development in March 2026 is retained as development history rather than used as a public-release date.

## 简体中文

[CoreSmith](https://github.com/facebookexperimental/coresmith) 发布于 facebookexperimental 组织下，通过 LangGraph 协调架构规划、Verilog 生成、cocotb 测试平台、综合和后端实现。工具链包含 Verilator、Yosys、OpenROAD、Magic 与 netgen，支持 Sky130；诊断与重试循环把工具失败反馈给 Agent，守护进程、CLI 和 MCP 接口用于访问流程状态及处理评审决策。

[更新日志](https://github.com/facebookexperimental/coresmith/blob/main/CHANGELOG.md)将 **2026-10-09** 的 1.0.0 版本标为首次开源发布。README 提到的 2026 年 3 月属于开发历史，不作为公开发布日期。
