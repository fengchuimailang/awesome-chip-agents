# ChiProgramBench: Can LLM Agents Rebuild Efficient Circuits from Pin-Level Experiments?

<!-- metadata
{
  "id": "chiprogrambench",
  "title": "ChiProgramBench: Can LLM Agents Rebuild Efficient Circuits from Pin-Level Experiments?",
  "name": "ChiProgramBench",
  "direction": "verification-debugging",
  "date": "2026-11-23",
  "date_basis": "source",
  "tags": ["benchmark", "evaluation", "specification", "simulation", "ppa"],
  "types": ["paper", "benchmark"],
  "links": [
    {
      "label": "ChiProgramBench: Can LLM Agents Rebuild Efficient Circuits from Pin-Level Experiments?",
      "url": "https://arxiv.org/abs/2611.31082",
      "kind": "paper"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Evaluates agents on 18 circuit-reconstruction tasks using pin-level experiments, hidden cycle-exact tests, and correctness-gated PPA scoring.",
    "通过引脚级实验、隐藏逐周期测试及以正确性为前提的 PPA 评分，评测 Agent 在 18 项电路重建任务中的表现。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2026-11-23
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Benchmark / dataset / 基准 / 数据集
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [Benchmark / 基准](../tags/benchmark.md) · [Evaluation / 评测](../tags/evaluation.md) · [Specifications / 规格推断](../tags/specification.md) · [Simulation / 仿真](../tags/simulation.md) · [PPA / QoR / PPA / QoR](../tags/ppa.md)

## Links / 相关链接

- **Paper / 论文：** [ChiProgramBench: Can LLM Agents Rebuild Efficient Circuits from Pin-Level Experiments?](https://arxiv.org/abs/2611.31082)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

Agents probe hidden, stateful simulated circuits and submit gate-level netlists built from public library cells. The two settings provide either anonymized pins or additional functional descriptions; PPA earns credit only after all hidden cases pass. Across 432 trials with six agent configurations, the authors report full-pass rates of 12.0% and 14.8%, respectively. These are preprint results for the benchmark's reconstruction setting. The arXiv v1 submission timestamp is 2026-11-23 17:32:36 UTC; no separate benchmark repository was verified.

## 简体中文

Agent 对隐藏的有状态仿真电路进行探测，并提交由公共库单元构成的门级网表。两种设置分别仅提供匿名引脚，或额外提供功能说明；只有通过全部隐藏用例后，PPA 才计分。作者在六种 Agent 配置的 432 次试验中报告，两种设置的全部用例通过率分别为 12.0% 和 14.8%。这些预印本结果对应基准中的电路重建场景。arXiv 首版提交时间为 2026-11-23 17:32:36 UTC；暂未核实独立的基准仓库。
