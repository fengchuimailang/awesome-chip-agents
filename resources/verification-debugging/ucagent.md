# UCAgent (UnityChip Verification Agent)

<!-- metadata
{
  "id": "ucagent",
  "title": "UCAgent (UnityChip Verification Agent)",
  "name": "UCAgent",
  "direction": "verification-debugging",
  "date": null,
  "date_basis": "unknown",
  "tags": ["rtl", "verification", "testbench", "simulation", "tool-use"],
  "types": ["project", "platform"],
  "links": [
    {"label": "Hardware unit-test agent implementation", "url": "https://github.com/XS-MLVP/UCAgent", "kind": "repository"},
    {"label": "Official developer manual", "url": "https://ucagent.open-verify.cc/content/00_index/", "kind": "source"}
  ],
  "related": ["autobench", "booley"],
  "also_in": ["agent-infrastructure"],
  "summary": [
    "Runs staged LLM workflows for chip unit testing, with test generation, coverage analysis, Checker acceptance, and MCP integration with coding agents.",
    "面向芯片单元测试的分阶段 LLM 验证流程，支持测试生成、覆盖率分析、Checker 验收及通过 MCP 对接编码 Agent。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** Not recorded / 待核实
- **Date basis / 日期依据：** Date not recorded / 日期待核实
- **Type / 类型：** Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Verification / 验证](../tags/verification.md) · [Testbench / 测试平台](../tags/testbench.md) · [Simulation / 仿真](../tags/simulation.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Repository / 仓库：** [Hardware unit-test agent implementation](https://github.com/XS-MLVP/UCAgent)
- **Source / 原始来源：** [Official developer manual](https://ucagent.open-verify.cc/content/00_index/)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [XS-MLVP/UCAgent](https://github.com/XS-MLVP/UCAgent) | 248 | 2026-11-24T09:16:23Z | 2026-11-24T09:27:41Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [AutoBench](../../resources/verification-debugging/autobench.md)
- [Booley](../../resources/agent-infrastructure/booley.md)
<!-- resource:end -->

## English

[UCAgent](https://github.com/XS-MLVP/UCAgent) is an open-source LLM agent for digital-circuit unit testing. It takes a DUT and verification requirements through stages that generate verification documents, tests, coverage models, and reports. The `picker` dependency exposes RTL as a Python-driven DUT; UCAgent manages the workflow and checks stage artifacts with Checkers.

The implementation supports direct model access, MCP integration with external coding agents, human review, and a Master web interface for task management. Start with the repository's `Adder` example, then use the [developer manual](https://ucagent.open-verify.cc/content/00_index/) to inspect the workflow and results. These are documented capabilities; no independent performance evaluation is recorded here. The project's first-public date has not been verified.

## 简体中文

[UCAgent](https://github.com/XS-MLVP/UCAgent) 是面向数字电路单元测试的开源 LLM Agent，根据待测设计（DUT）及验证需求，分阶段生成验证文档、测试、覆盖率模型和报告。其依赖 `picker` 将 RTL 封装为可由 Python 驱动的 DUT，UCAgent 负责流程管理，并使用 Checker 检查阶段产物。

实现支持直连模型、通过 MCP 对接外部编码 Agent、人工审查，以及用于任务管理的 Master Web 界面。入门可先运行仓库中的 `Adder` 示例，再结合[开发者手册](https://ucagent.open-verify.cc/content/00_index/)了解工作流与结果。以上为官方文档描述的功能，此处未记录独立性能评测；项目首次公开日期尚待核实。
