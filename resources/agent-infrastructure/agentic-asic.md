# agentic-asic

<!-- metadata
{
  "id": "agentic-asic",
  "title": "agentic-asic",
  "name": "agentic-asic",
  "date": "2026-09-05",
  "tags": [
    "infrastructure",
    "tool-use",
    "rtl",
    "physical-design",
    "eda-flow"
  ],
  "types": [
    "project",
    "platform"
  ],
  "links": [
    {
      "label": "MCP client and ASIC-flow orchestrator",
      "url": "https://github.com/zesun33/agentic-asic",
      "kind": "repository"
    },
    {
      "label": "Initial release changelog",
      "url": "https://github.com/zesun33/agentic-asic/blob/main/CHANGELOG.md",
      "kind": "source"
    }
  ],
  "related": [
    "hw-agent-tooling",
    "openroad-mcp",
    "mcp4eda",
    "autoeda"
  ],
  "also_in": [
    "rtl-generation",
    "verification-debugging",
    "physical-design"
  ],
  "summary": [
    "An MCP client orchestrating RTL review, simulation, formal checks, synthesis, P&R, GDS checks, and an FPGA track with structured reports.",
    "作为 MCP 客户端编排 RTL 审查、仿真、形式验证、综合、布局布线、GDS 检查及 FPGA 流程，并生成结构化报告。"
  ],
  "direction": "agent-infrastructure",
  "date_basis": "source"
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-09-05
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [RTL / RTL](../tags/rtl.md) · [Physical design / 物理设计](../tags/physical-design.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md)

## Links / 相关链接

- **Repository / 仓库：** [MCP client and ASIC-flow orchestrator](https://github.com/zesun33/agentic-asic)
- **Source / 原始来源：** [Initial release changelog](https://github.com/zesun33/agentic-asic/blob/main/CHANGELOG.md)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [zesun33/agentic-asic](https://github.com/zesun33/agentic-asic) | 1 | 2026-10-05T13:18:48Z | 2026-11-13T07:27:00Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [hw-agent-tooling](../../resources/agent-infrastructure/hw-agent-tooling.md)
- [OpenROAD MCP](../../resources/agent-infrastructure/openroad-mcp.md)
- [MCP4EDA](../../resources/agent-infrastructure/mcp4eda.md)
- [AutoEDA](../../resources/agent-infrastructure/autoeda.md)
<!-- resource:end -->

## English

agentic-asic is a command-line MCP client and flow orchestrator. It coordinates eight separately maintained EDA servers for RTL review, Verilog/cocotb simulation, formal checks, synthesis, OpenROAD implementation, GDS signoff checks, and an FPGA track. The repository includes structured reports, deterministic examples, and bounded heuristics for recovering from selected placement or timing failures. Its README explicitly limits conclusions to the selected design, constraints, tools, and PDK; a successful run does not establish manufacturing qualification. The project uses Apache-2.0.

The initial v0.1.0 changelog dates the resource to September 5, 2026.

## 简体中文

agentic-asic 是命令行 MCP 客户端与流程编排器，协调八个独立维护的 EDA 服务，覆盖 RTL 审查、Verilog/cocotb 仿真、形式检查、综合、OpenROAD 实现、GDS signoff 检查及 FPGA 流程。仓库包含结构化报告、确定性示例，以及针对部分布局或时序失败的有限启发式恢复。README 明确将结论限定在选定设计、约束、工具和 PDK 范围内；成功运行不能证明具备量产资格。项目采用 Apache-2.0。

v0.1.0 初始更新日志将日期记为 2026 年 9 月 5 日。

