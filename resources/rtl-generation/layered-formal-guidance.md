# Bridging the Semantic Gap from Natural Language Specifications to RTL with Layered Formal Guidance

<!-- metadata
{
  "id": "layered-formal-guidance",
  "title": "Bridging the Semantic Gap from Natural Language Specifications to RTL with Layered Formal Guidance",
  "name": "Layered Formal Guidance",
  "direction": "rtl-generation",
  "date": "2026-11-23",
  "date_basis": "source",
  "tags": ["rtl", "generation", "formal", "specification", "debugging"],
  "types": ["paper"],
  "links": [
    {
      "label": "Bridging the Semantic Gap from Natural Language Specifications to RTL with Layered Formal Guidance",
      "url": "https://arxiv.org/abs/2611.30766",
      "kind": "paper"
    }
  ],
  "related": [],
  "also_in": ["verification-debugging"],
  "summary": [
    "Augments specifications with formal properties and uses model-checker counterexamples to refine RTL, specifications, or assertions in a bounded loop.",
    "用形式属性补充规格，并在受限循环中依据模型检查反例修订 RTL、规格或断言。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-11-23
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** RTL Generation and Editing / RTL 生成与编辑
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Code generation / 代码生成](../tags/generation.md) · [Formal verification / 形式验证](../tags/formal.md) · [Specifications / 规格推断](../tags/specification.md) · [Debugging / 调试](../tags/debugging.md)

## Links / 相关链接

- **Paper / 论文：** [Bridging the Semantic Gap from Natural Language Specifications to RTL with Layered Formal Guidance](https://arxiv.org/abs/2611.30766)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

Layered Formal Guidance derives SVA properties before RTL generation, checks candidate RTL against them, and attributes failures to implementation bugs, specification ambiguity, or property errors. Its feedback loop can revise each artifact. The authors evaluate correctness separately against a fixed golden reference: passing generated assertions establishes consistency with those properties, without guaranteeing full functional correctness. This is a preprint; arXiv records v1 at 2026-11-23 14:39:00 UTC. No separate implementation repository was verified.

## 简体中文

Layered Formal Guidance 在生成 RTL 前提取 SVA 属性，对候选 RTL 进行属性检查，并将失败归因于实现缺陷、规格歧义或属性错误，再通过反馈循环修订相应材料。作者另用固定黄金参考评估功能正确性：通过生成的断言只能说明与这些属性一致，无法保证完整功能正确性。该文为预印本，arXiv 记录的首版提交时间为 2026-11-23 14:39:00 UTC。暂未核实独立的实现仓库。
