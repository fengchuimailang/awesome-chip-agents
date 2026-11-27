# Kolpona: An Agentic Framework with Gradient-Free Neuron Programming for RTL Generation

<!-- metadata
{
  "id": "kolpona",
  "title": "Kolpona: An Agentic Framework with Gradient-Free Neuron Programming for RTL Generation",
  "name": "Kolpona",
  "direction": "rtl-generation",
  "date": "2026-11-25",
  "date_basis": "source",
  "tags": ["rtl", "generation", "simulation", "tool-use"],
  "types": ["paper"],
  "links": [
    {"label": "Kolpona: An Agentic Framework with Gradient-Free Neuron Programming for RTL Generation", "url": "https://arxiv.org/abs/2611.33973", "kind": "paper"}
  ],
  "related": ["verilogeval", "rtllm"],
  "also_in": [],
  "summary": [
    "Combines gradient-free neuron edits with tool-using agents and simulation-based candidate selection for RTL generation.",
    "结合无梯度神经元编辑、工具调用 Agent 和基于仿真的候选选择，生成 RTL。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-11-25
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** RTL Generation and Editing / RTL 生成与编辑
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Code generation / 代码生成](../tags/generation.md) · [Simulation / 仿真](../tags/simulation.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Paper / 论文：** [Kolpona: An Agentic Framework with Gradient-Free Neuron Programming for RTL Generation](https://arxiv.org/abs/2611.33973)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [VerilogEval](../../resources/rtl-generation/verilogeval.md)
- [RTLLM](../../resources/rtl-generation/rtllm.md)
<!-- resource:end -->

## English

[Kolpona](https://arxiv.org/abs/2611.33973), submitted on **2026-11-25**, combines closed-form edits to individual model neurons with tool-using RTL generation agents. Edits are retained using testbench results on practice tasks; at inference, candidate designs are selected using specifications and simulation without reference labels.

The authors report VerilogEval v2 pass@1 of 77.6% with Qwen3.5-4B and 94.9% with Qwen3.8-27B for the full framework. These are paper-reported results, not independent reproduction. The authors note that edits require human diagnosis and reference testbenches, selection depends on the judge and simulation stimuli, and public benchmarks may overlap with model training data.

## 简体中文

[Kolpona](https://arxiv.org/abs/2611.33973) 于 **2026-11-25** 提交，结合对模型单个神经元的闭式权重编辑和调用工具的 RTL 生成 Agent。方法依据练习任务的测试平台结果保留编辑；推理时利用规格与仿真结果，在不使用参考标签的情况下选择候选设计。

作者报告完整框架在 VerilogEval v2 上使用 Qwen3.5-4B 达到 77.6% pass@1，使用 Qwen3.8-27B 达到 94.9%；这些是论文报告的结果，尚非独立复现。作者指出，编辑需要人工诊断与参考测试平台，候选选择依赖评判模型和仿真激励，公开基准也可能与模型训练数据重叠。
