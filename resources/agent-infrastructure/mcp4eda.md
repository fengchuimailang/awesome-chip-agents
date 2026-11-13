# MCP4EDA: LLM-Powered Model Context Protocol RTL-to-GDSII Automation with Backend Aware Synthesis Optimization

<!-- metadata
{
  "id": "mcp4eda",
  "title": "MCP4EDA: LLM-Powered Model Context Protocol RTL-to-GDSII Automation with Backend Aware Synthesis Optimization",
  "name": "MCP4EDA",
  "date": "2025-07-25",
  "tags": [
    "infrastructure",
    "tool-use",
    "rtl",
    "physical-design",
    "eda-flow"
  ],
  "types": [
    "paper",
    "project",
    "platform"
  ],
  "links": [
    {
      "label": "Original paper",
      "url": "https://arxiv.org/abs/2507.19570",
      "kind": "paper"
    },
    {
      "label": "MCP server implementation",
      "url": "https://github.com/NellyW8/MCP4EDA",
      "kind": "repository"
    }
  ],
  "related": [
    "openroad-mcp",
    "autoeda",
    "eda-mcp-littleblackcq"
  ],
  "also_in": [
    "rtl-generation",
    "verification-debugging",
    "physical-design"
  ],
  "summary": [
    "An MCP-based RTL-to-GDSII framework integrating synthesis, simulation, OpenLane, and backend feedback for synthesis optimization.",
    "基于 MCP 的 RTL-to-GDSII 框架，集成综合、仿真、OpenLane，并利用后端反馈优化综合。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "source"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2025-07-25
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [RTL / RTL](../tags/rtl.md) · [Physical design / 物理设计](../tags/physical-design.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2507.19570)
- **Repository / 仓库：** [MCP server implementation](https://github.com/NellyW8/MCP4EDA)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [NellyW8/MCP4EDA](https://github.com/NellyW8/MCP4EDA) | 113 | 2025-07-29T15:06:21Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [OpenROAD MCP](../../resources/agent-infrastructure/openroad-mcp.md)
- [AutoEDA](../../resources/agent-infrastructure/autoeda.md)
- [eda-mcp (LittleBlackCQ)](../../resources/agent-infrastructure/eda-mcp-littleblackcq.md)
<!-- resource:end -->

## English

MCP4EDA combines an MCP server with a paper on natural-language RTL-to-GDSII automation. The repository documents Yosys synthesis, Icarus Verilog simulation, GTKWave analysis, OpenLane implementation, and KLayout inspection. The paper describes using physical-implementation feedback to improve synthesis decisions; its timing and area improvements are author-reported results. The implementation requires separately installed EDA tools, Docker for the documented OpenLane flow, and appropriate design and technology inputs.

The paper and implementation share this record. The date is the paper's first arXiv submission, July 25, 2025.

## 简体中文

MCP4EDA 将 MCP 服务与自然语言 RTL-to-GDSII 自动化论文结合。仓库记录了 Yosys 综合、Icarus Verilog 仿真、GTKWave 分析、OpenLane 实现和 KLayout 检查。论文描述了利用物理实现反馈改进综合决策，时序和面积改善属于作者报告结果。实现需要另行安装 EDA 工具；文档中的 OpenLane 流程还需要 Docker，以及相应的设计与工艺输入。

论文与实现合并维护于本条目，日期采用论文首次提交 arXiv 的 2025 年 7 月 25 日。

