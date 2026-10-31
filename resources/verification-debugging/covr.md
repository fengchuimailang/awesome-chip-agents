# CovR: Coverage-Aware Hardware Verification via Reasoning-Guided Reinforcement Learning

<!-- metadata
{
  "id": "covr",
  "title": "CovR: Coverage-Aware Hardware Verification via Reasoning-Guided Reinforcement Learning",
  "name": "CovR",
  "direction": "verification-debugging",
  "date": "2026-09-15",
  "date_basis": "source",
  "tags": [
    "verification",
    "testbench",
    "simulation",
    "evaluation"
  ],
  "types": [
    "paper"
  ],
  "links": [
    {
      "label": "CovR: Coverage-Aware Hardware Verification via Reasoning-Guided Reinforcement Learning",
      "url": "https://arxiv.org/abs/2609.19189",
      "kind": "paper"
    }
  ],
  "related": [
    "autobench",
    "verilogeval",
    "rtllm",
    "cvdp"
  ],
  "also_in": [],
  "summary": [
    "Combines agentic testbench refinement with simulation and coverage rewards to train coverage-aware verification models.",
    "结合 Agent 测试平台迭代与仿真、覆盖率奖励，训练面向覆盖率的验证模型。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-09-15
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [Verification / 验证](../tags/verification.md) · [Testbench / 测试平台](../tags/testbench.md) · [Simulation / 仿真](../tags/simulation.md) · [Evaluation / 评测](../tags/evaluation.md)

## Links / 相关链接

- **Paper / 论文：** [CovR: Coverage-Aware Hardware Verification via Reasoning-Guided Reinforcement Learning](https://arxiv.org/abs/2609.19189)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [AutoBench](../../resources/verification-debugging/autobench.md)
- [VerilogEval](../../resources/rtl-generation/verilogeval.md)
- [RTLLM](../../resources/rtl-generation/rtllm.md)
- [CVDP](../../resources/rtl-generation/cvdp.md)
<!-- resource:end -->

## English

### Papers

[CovR: Coverage-Aware Hardware Verification via Reasoning-Guided Reinforcement Learning](https://arxiv.org/abs/2609.19189) (first public 2026-09-15; revised 2026-09-19, preprint) — Uses self-reflection and simulation feedback to refine testbenches, builds 16,514 specification–RTL–reasoning–testbench training tuples, and trains a student model with simulation and coverage rewards. Evaluations cover VerilogEval, RTLLM V2.0, and CVDP, including integration as a stimulus engine in verification workflows. Reported coverage and mutation-detection results measure different aspects of test quality; coverage alone does not establish functional correctness.

## 简体中文

### 论文

[CovR: Coverage-Aware Hardware Verification via Reasoning-Guided Reinforcement Learning](https://arxiv.org/abs/2609.19189)（首次公开于 2026-09-15，2026-09-19 修订，预印本）— 通过自反思和仿真反馈迭代测试平台，构建 16,514 条规格–RTL–推理–测试平台训练样本，再以仿真与覆盖率奖励训练学生模型。在 VerilogEval、RTLLM V2.0 和 CVDP 上评测，并考察其作为验证流程激励引擎的效果。论文报告的覆盖率与变异检测结果衡量测试质量的不同方面；仅有覆盖率不能证明功能正确性。
