# FPGA-GEN: Target-Aware RTL Generation via HLS

<!-- metadata
{
  "id": "fpga-gen",
  "title": "FPGA-GEN: Target-Aware RTL Generation via HLS",
  "name": "FPGA-GEN",
  "direction": "architecture-hls-codesign",
  "date": "2026-11-19",
  "date_basis": "source",
  "tags": ["hls", "rtl", "generation", "fpga", "verification", "evaluation"],
  "types": ["paper"],
  "links": [
    {
      "label": "FPGA-GEN: Target-Aware RTL Generation via HLS",
      "url": "https://arxiv.org/abs/2611.25351",
      "kind": "paper"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Uses bounded tool-feedback loops and target-aware candidate selection to generate and validate HLS C/C++ for FPGA designs.",
    "通过受限工具反馈循环和面向目标器件的候选筛选，生成并验证 FPGA 设计用的 HLS C/C++。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-11-19
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Architecture, HLS and Hardware/Software Co-design / 架构探索、HLS 与软硬件协同设计
- **Tags / 标签：** [HLS / HLS](../tags/hls.md) · [RTL / RTL](../tags/rtl.md) · [Code generation / 代码生成](../tags/generation.md) · [FPGA / FPGA](../tags/fpga.md) · [Verification / 验证](../tags/verification.md) · [Evaluation / 评测](../tags/evaluation.md)

## Links / 相关链接

- **Paper / 论文：** [FPGA-GEN: Target-Aware RTL Generation via HLS](https://arxiv.org/abs/2611.25351)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

The paper describes an agentic workflow that generates or repairs HLS C/C++ using explicit task contracts, bounded tool-feedback loops, and hardware-aware candidate selection. The authors report 407/425 public-testbench passes on HLS-Eval and admission of 104/107 HLS-LeVeri designs after held-out co-simulation and Vivado synthesis/fit checks. These are author-reported preprint results; the paper does not provide a separate implementation link in its arXiv record.

## 简体中文

论文介绍一种 Agent 工作流，借助明确的任务约束、受限工具反馈循环和硬件感知候选筛选，生成或修复 HLS C/C++。作者报告称，该方法在 HLS-Eval 上通过 407/425 项公开测试平台测试，并在留出协同仿真及 Vivado 综合/器件适配检查后接纳 104/107 个 HLS-LeVeri 设计。这些结果来自近期预印本作者报告；arXiv 记录未提供单独的实现仓库链接。
