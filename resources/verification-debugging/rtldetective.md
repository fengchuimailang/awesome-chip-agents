# RTLDetective: Agentic RTL Debugging through Dataflow Analysis and Simulation-Guided Fault Localization

<!-- metadata
{
  "id": "rtldetective",
  "title": "RTLDetective: Agentic RTL Debugging through Dataflow Analysis and Simulation-Guided Fault Localization",
  "name": "RTLDetective",
  "direction": "verification-debugging",
  "date": "2026-11-23",
  "date_basis": "source",
  "tags": ["rtl", "debugging", "simulation", "waveform", "multi-agent"],
  "types": ["paper"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2611.31709", "kind": "paper"},
    {"label": "Full text: methods and evaluation", "url": "https://arxiv.org/html/2611.31709v1", "kind": "source"}
  ],
  "related": ["rtlfixer", "verilogcoder", "veri-sure"],
  "also_in": [],
  "summary": [
    "Combines signal dependencies, waveform analysis, and simulation interventions to localize RTL faults and guide multi-agent repair.",
    "结合信号依赖、波形分析与仿真干预定位 RTL 故障，引导多 Agent 修复。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-11-23
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Debugging / 调试](../tags/debugging.md) · [Simulation / 仿真](../tags/simulation.md) · [Waveforms / 波形分析](../tags/waveform.md) · [Multi-agent / 多 Agent](../tags/multi-agent.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2611.31709)
- **Source / 原始来源：** [Full text: methods and evaluation](https://arxiv.org/html/2611.31709v1)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [RTLFixer](../../resources/verification-debugging/rtlfixer.md)
- [VerilogCoder](../../resources/rtl-generation/verilogcoder.md)
- [Veri-Sure](../../resources/rtl-generation/veri-sure.md)
<!-- resource:end -->

## English

[RTLDetective](https://arxiv.org/abs/2611.31709), first submitted on **2026-11-23**, combines signal-dependency graphs and compact waveform traces with two agents. A lightweight localizer predicts internal signal values and tests them with temporary `force/release` interventions in simulation; a repair agent uses this evidence and a curated RTL debugging knowledge base to propose changes. The approach does not require a golden model of internal signals.

In the [v1 evaluation](https://arxiv.org/html/2611.31709v1), the authors report 167/194 repairs (86.1%) on an extended MEIC benchmark spanning 15 RTLLM designs, compared with 140/194 for MEIC at ten iterations with the same primary repair model. The total includes 113 syntax errors and 81 functional bugs, so 86.1% is not a functional-only result. Success means passing the supplied testbench, rather than a proof of complete functional correctness. At ten iterations, runtime is higher than MEIC (71.4 vs. 28.4 seconds per bug), despite fewer LLM calls. Evaluation is limited to one benchmark and one primary repair model.

## 简体中文

[RTLDetective](https://arxiv.org/abs/2611.31709) 首次提交于 **2026-11-23**，结合信号依赖图、压缩波形与两个 Agent：轻量定位 Agent 预测内部信号值，通过临时 `force/release` 仿真干预检验假设；修复 Agent 根据定位证据和人工整理的 RTL 调试知识库修改代码。该方法不要求提供内部信号的黄金参考模型。

在 [v1 评测](https://arxiv.org/html/2611.31709v1)中，作者在覆盖 15 个 RTLLM 设计的扩展 MEIC 基准上报告修复 167/194 个错误（86.1%）；相同主修复模型、十轮预算下，MEIC 修复 140/194 个。总数包含 113 个语法错误和 81 个功能错误，86.1% 并非纯功能错误修复率。成功标准是通过所给测试平台，并非完整功能正确性证明。十轮预算下，尽管 LLM 调用较少，每例耗时仍高于 MEIC（71.4 秒对 28.4 秒）。评测仅覆盖一个基准和一种主修复模型。
