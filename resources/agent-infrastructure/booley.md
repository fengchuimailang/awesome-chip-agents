# Booley

<!-- metadata
{
  "id": "booley",
  "title": "Booley",
  "name": "Booley",
  "direction": "agent-infrastructure",
  "date": null,
  "date_basis": "unknown",
  "tags": ["infrastructure", "rtl", "tool-use", "verification", "waveform"],
  "types": ["project", "platform"],
  "links": [
    {"label": "Agentic RTL IDE implementation", "url": "https://github.com/boldaxolotl/booley", "kind": "repository"},
    {"label": "Official documentation", "url": "https://booley.dev/", "kind": "source"}
  ],
  "related": ["coresmith", "verilogcoder"],
  "also_in": ["rtl-generation", "verification-debugging"],
  "summary": [
    "Connects coding agents to reproducible RTL tool flows, waveform queries, and deterministic acceptance checks in VS Code.",
    "在 VS Code 中为编码 Agent 提供可复现的 RTL 工具流程、波形查询和确定性验收检查。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** Not recorded / 待核实
- **Date basis / 日期依据：** Date not recorded / 日期待核实
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [RTL / RTL](../tags/rtl.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Verification / 验证](../tags/verification.md) · [Waveforms / 波形分析](../tags/waveform.md)

## Links / 相关链接

- **Repository / 仓库：** [Agentic RTL IDE implementation](https://github.com/boldaxolotl/booley)
- **Source / 原始来源：** [Official documentation](https://booley.dev/)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [boldaxolotl/booley](https://github.com/boldaxolotl/booley) | 22 | 2026-10-30T22:10:52Z | 2026-10-31T05:54:36Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [CoreSmith](../../resources/physical-design/coresmith.md)
- [VerilogCoder](../../resources/rtl-generation/verilogcoder.md)
<!-- resource:end -->

## English

[Booley](https://github.com/boldaxolotl/booley) supplies a Docker-based environment for coding agents working on Verilog and SystemVerilog projects in VS Code. FuseSoC-based flows return structured simulation, lint, synthesis, and FPGA results; Goal Mode checks recorded results against acceptance criteria such as tests, coverage, area, and timing. Its `bwave` tooling lets agents query simulation traces during debugging.

The repository provides implementation code, tests, documentation, and a linked PicoRV32 demo. Commercial EDA integrations have separate availability and licensing requirements. The first public date has not been verified; dated updates in the changelog are not treated as the initial release.

## 简体中文

[Booley](https://github.com/boldaxolotl/booley)为在 VS Code 中处理 Verilog、SystemVerilog 项目的编码 Agent 提供基于 Docker 的运行环境。基于 FuseSoC 的流程返回结构化仿真、lint、综合和 FPGA 结果；Goal Mode 根据已记录结果检查测试、覆盖率、面积及时序等验收条件，`bwave` 工具支持 Agent 在调试时查询仿真波形。

仓库包含实现代码、测试、文档，并链接了 PicoRV32 演示项目。商业 EDA 集成各有可用性与授权要求。首次公开日期尚未核实，未将更新日志中的后续版本日期作为首次发布日。
