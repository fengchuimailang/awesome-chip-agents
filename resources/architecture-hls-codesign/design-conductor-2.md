# Design Conductor 2.0: An agent builds a TurboQuant inference accelerator in 80 hours

<!-- metadata
{
  "id": "design-conductor-2",
  "title": "Design Conductor 2.0: An agent builds a TurboQuant inference accelerator in 80 hours",
  "name": "Design Conductor 2.0 / VerTQ",
  "direction": "architecture-hls-codesign",
  "date": "2026-05-06",
  "date_basis": "source",
  "tags": [
    "architecture",
    "codesign",
    "multi-agent",
    "fpga",
    "vendor-report"
  ],
  "types": [
    "paper"
  ],
  "links": [
    {
      "label": "Design Conductor 2.0 technical report",
      "url": "https://arxiv.org/abs/2605.05170",
      "kind": "paper"
    },
    {
      "label": "Verkor: Design Conductor and reported designs",
      "url": "https://verkor.io/",
      "kind": "source"
    }
  ],
  "related": [
    "design-conductor"
  ],
  "also_in": [
    "physical-design"
  ],
  "summary": [
    "Reports multi-agent design of the VerTQ accelerator, with FPGA mapping, ASIC implementation metrics, and token-use analysis.",
    "报告多 Agent 设计 VerTQ 加速器的过程，提供 FPGA 映射、ASIC 实现指标与 Token 用量分析。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-05-06
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Architecture, HLS and Hardware/Software Co-design / 架构探索、HLS 与软硬件协同设计
- **Tags / 标签：** [Architecture exploration / 架构探索](../tags/architecture.md) · [HW/SW co-design / 软硬件协同](../tags/codesign.md) · [Multi-agent / 多 Agent](../tags/multi-agent.md) · [FPGA / FPGA](../tags/fpga.md) · [Vendor-reported / 厂商报告](../tags/vendor-report.md)

## Links / 相关链接

- **Paper / 论文：** [Design Conductor 2.0 technical report](https://arxiv.org/abs/2605.05170)
- **Source / 原始来源：** [Verkor: Design Conductor and reported designs](https://verkor.io/)

## Paper citations / 论文引用

- **OpenAlex：** [7 citations / 次引用](https://openalex.org/W7160537595)
- **DOI：** [10.48550/arxiv.2605.05170](https://doi.org/10.48550/arxiv.2605.05170)
- **Fetched (UTC) / 采集时间：** 2026-11-24T02:53:34Z
- **Indexed in / 收录来源：** arXiv (Cornell University)

Exact DOI match in OpenAlex, including arXiv preprints. Counts depend on coverage and paper age; they are not quality scores or evidence of peer review.

按 DOI 精确匹配 OpenAlex，包含 arXiv 预印本。引用量受收录范围和发表时间影响，不代表质量评分或已通过同行评审。

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [Design Conductor / VerCore](../../resources/architecture-hls-codesign/design-conductor.md)
<!-- resource:end -->

## English

[Design Conductor 2.0](https://arxiv.org/abs/2605.05170) (2026-05-06) — Verkor's follow-up report on a multi-agent harness using frontier models for autonomous hardware design. It examines four designs, including VerTQ, which implements TurboQuant attention processing from a research-paper specification. The authors report roughly 80 hours of autonomous work and an FPGA mapping at 125 MHz; ASIC implementation metrics are reported separately.

The paper discusses harness changes, token consumption, and limitations. Outcomes are developer-reported, and the agent harness remains proprietary; the report is not an independently reproduced benchmark.

## 简体中文

[Design Conductor 2.0](https://arxiv.org/abs/2605.05170)（2026-05-06）— Verkor 关于使用前沿模型和多 Agent Harness 自主设计硬件的后续报告。报告分析四项设计，包括从论文规格出发实现 TurboQuant 注意力处理的 VerTQ。作者报告自主工作约 80 小时，并以 125 MHz 映射到 FPGA；ASIC 实现指标另行报告。

论文讨论 Harness 改进、Token 消耗与局限。结果由开发方报告，Agent Harness 仍为专有系统；该报告不代表独立复现的基准。
