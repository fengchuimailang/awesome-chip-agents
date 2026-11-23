# From FIPS to FPGA with LLM Agents: Measuring What Tests and Reviews Miss in Post-Quantum Cryptographic Hardware

<!-- metadata
{
  "id": "from-fips-to-fpga",
  "title": "From FIPS to FPGA with LLM Agents: Measuring What Tests and Reviews Miss in Post-Quantum Cryptographic Hardware",
  "name": "From FIPS to FPGA with LLM Agents",
  "direction": "verification-debugging",
  "date": "2026-11-19",
  "date_basis": "source",
  "tags": ["rtl", "verification", "formal", "testbench", "evaluation", "fpga"],
  "types": ["paper"],
  "links": [
    {
      "label": "From FIPS to FPGA with LLM Agents: Measuring What Tests and Reviews Miss in Post-Quantum Cryptographic Hardware",
      "url": "https://arxiv.org/abs/2611.25339",
      "kind": "paper"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Studies verification gates and LLM review for an agent-assisted post-quantum cryptography FPGA design, auditing them with netlist mutants and formal checks.",
    "研究 Agent 辅助后量子密码 FPGA 设计中的验证关卡与 LLM 审查，并用网表变异和形式检查审计其有效性。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-11-19
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Verification / 验证](../tags/verification.md) · [Formal verification / 形式验证](../tags/formal.md) · [Testbench / 测试平台](../tags/testbench.md) · [Evaluation / 评测](../tags/evaluation.md) · [FPGA / FPGA](../tags/fpga.md)

## Links / 相关链接

- **Paper / 论文：** [From FIPS to FPGA with LLM Agents: Measuring What Tests and Reviews Miss in Post-Quantum Cryptographic Hardware](https://arxiv.org/abs/2611.25339)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

The authors describe a verification-gated workflow used to port ML-KEM-768 and ML-DSA-65 accelerators to a Zynq UltraScale+ card, then audit its evidence with netlist mutants, reviewer-agent replays, and formal checks. They report that existing simulation gates detected 76% of 399 tool-selected netlist mutants, and that formal checks caught planted key-custody flaws missed by LLM review. The results are from a recent preprint and are specific to the studied design and evaluation setup.

## 简体中文

作者介绍了一套带验证关卡的工作流，用于将 ML-KEM-768 和 ML-DSA-65 加速器移植到 Zynq UltraScale+ 卡，并通过网表变异、审查 Agent 重放和形式检查审计验证证据。作者报告称，现有仿真关卡检测出 399 个工具选取网表变异中的 76%；形式检查发现了 LLM 审查未能识别的密钥托管缺陷。该研究为近期预印本，其结果仅对应所研究的设计和评测设置。
