# Autoformalizing Memory Specifications with Agents

<!-- metadata
{
  "id": "drambench",
  "title": "Autoformalizing Memory Specifications with Agents",
  "name": "DRAMBench / memory autoformalization",
  "direction": "verification-debugging",
  "date": "2026-04-23",
  "date_basis": "source",
  "tags": [
    "specification",
    "formal",
    "verification",
    "benchmark",
    "dataset"
  ],
  "types": [
    "paper",
    "benchmark"
  ],
  "links": [
    {
      "label": "Autoformalizing Memory Specifications with Agents",
      "url": "https://arxiv.org/abs/2605.00058",
      "kind": "paper"
    },
    {
      "label": "Normal Computing: DRAMBench release and evaluation method",
      "url": "https://www.normalcomputing.com/blog/from-specifications-to-formal-models-autoformalizing-memory-chips-with-drambench",
      "kind": "source"
    },
    {
      "label": "Fraunhofer IESE: DRAMBench and DRAMPyML",
      "url": "https://www.iese.fraunhofer.de/blog/drambench-autoformalizing-dram-specifications/",
      "kind": "source"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Evaluates agents translating DRAM specifications into timed Petri nets, with protocol-behavior and timing-constraint metrics.",
    "评测 Agent 将 DRAM 规格转为带时序 Petri 网的能力，提供协议行为与时序约束指标。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2026-04-23
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Benchmark / dataset / 基准 / 数据集
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [Specifications / 规格推断](../tags/specification.md) · [Formal verification / 形式验证](../tags/formal.md) · [Verification / 验证](../tags/verification.md) · [Benchmark / 基准](../tags/benchmark.md) · [Dataset / 数据集](../tags/dataset.md)

## Links / 相关链接

- **Paper / 论文：** [Autoformalizing Memory Specifications with Agents](https://arxiv.org/abs/2605.00058)
- **Source / 原始来源：** [Normal Computing: DRAMBench release and evaluation method](https://www.normalcomputing.com/blog/from-specifications-to-formal-models-autoformalizing-memory-chips-with-drambench)
- **Source / 原始来源：** [Fraunhofer IESE: DRAMBench and DRAMPyML](https://www.iese.fraunhofer.de/blog/drambench-autoformalizing-dram-specifications/)

## Paper citations / 论文引用

- **OpenAlex：** [0 citations / 次引用](https://openalex.org/W7160183707)
- **DOI：** [10.48550/arxiv.2605.00058](https://doi.org/10.48550/arxiv.2605.00058)
- **Fetched (UTC) / 采集时间：** 2026-11-24T02:53:34Z
- **Indexed in / 收录来源：** arXiv (Cornell University)

Exact DOI match in OpenAlex, including arXiv preprints. Counts depend on coverage and paper age; they are not quality scores or evidence of peer review.

按 DOI 精确匹配 OpenAlex，包含 arXiv 预印本。引用量受收录范围和发表时间影响，不代表质量评分或已通过同行评审。

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

[Autoformalizing Memory Specifications with Agents](https://arxiv.org/abs/2605.00058) — Normal Computing and Fraunhofer IESE study translating natural-language DRAM specifications into DRAMPyML timed Petri nets, which can support assertion, stimulus, and coverage generation. DRAMBench supplies reference protocol models for evaluating hardware autoformalization. The authors compare legal command sequences using Jaccard similarity and assess timing-constraint recall separately.

The date follows [Normal Computing's release post](https://www.normalcomputing.com/blog/from-specifications-to-formal-models-autoformalizing-memory-chips-with-drambench) (2026-04-23), corroborated by [Fraunhofer IESE](https://www.iese.fraunhofer.de/blog/drambench-autoformalizing-dram-specifications/) (2026-04-24); the paper's initial arXiv submission is 2026-04-30, with an ICLR Verif-AI 2 Workshop 2026 reference. The task evaluates specification formalization, rather than complete RTL verification closure.

## 简体中文

[Autoformalizing Memory Specifications with Agents](https://arxiv.org/abs/2605.00058) — Normal Computing 与 Fraunhofer IESE 研究将 DRAM 自然语言规格转换为 DRAMPyML 带时序 Petri 网，以支持断言、激励和覆盖率材料生成。DRAMBench 提供协议参考模型，用于评测硬件规格自动形式化；作者使用合法命令序列的 Jaccard 相似度，并单独评估时序约束召回率。

日期沿用 [Normal Computing 发布文章](https://www.normalcomputing.com/blog/from-specifications-to-formal-models-autoformalizing-memory-chips-with-drambench)（2026-04-23），[Fraunhofer IESE](https://www.iese.fraunhofer.de/blog/drambench-autoformalizing-dram-specifications/) 于次日另行介绍；论文首次提交 arXiv 的日期为 2026-04-30，页面列出 ICLR Verif-AI 2 Workshop 2026。任务评测规格形式化，不等同于完整 RTL 验证闭合。
