# Redwood: A Frontier AI Accelerator Designed, Verified, and Deployed from Scratch in 2 Weeks by AI

<!-- metadata
{
  "id": "redwood",
  "title": "Redwood: A Frontier AI Accelerator Designed, Verified, and Deployed from Scratch in 2 Weeks by AI",
  "name": "Architect Labs / Redwood",
  "direction": "architecture-hls-codesign",
  "date": "2026-08-26",
  "date_basis": "source",
  "tags": [
    "architecture",
    "codesign",
    "verification",
    "fpga",
    "vendor-report"
  ],
  "types": [
    "paper"
  ],
  "links": [
    {
      "label": "Redwood technical report",
      "url": "https://arxiv.org/abs/2608.26418",
      "kind": "paper"
    },
    {
      "label": "Architect Labs: Introducing Redwood",
      "url": "https://architectlabs.com/blog/redwood",
      "kind": "source"
    }
  ],
  "related": [],
  "also_in": [
    "rtl-generation",
    "verification-debugging"
  ],
  "summary": [
    "Reports agent-driven accelerator and software co-design with FPGA validation; ASIC efficiency figures are projections.",
    "报告 Agent 驱动的加速器与软件协同设计及 FPGA 验证；ASIC 能效数据为预测值。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-08-26
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Architecture, HLS and Hardware/Software Co-design / 架构探索、HLS 与软硬件协同设计
- **Tags / 标签：** [Architecture exploration / 架构探索](../tags/architecture.md) · [HW/SW co-design / 软硬件协同](../tags/codesign.md) · [Verification / 验证](../tags/verification.md) · [FPGA / FPGA](../tags/fpga.md) · [Vendor-reported / 厂商报告](../tags/vendor-report.md)

## Links / 相关链接

- **Paper / 论文：** [Redwood technical report](https://arxiv.org/abs/2608.26418)
- **Source / 原始来源：** [Architect Labs: Introducing Redwood](https://architectlabs.com/blog/redwood)

## Paper citations / 论文引用

- **OpenAlex：** [1 citations / 次引用](https://openalex.org/W7204549752)
- **DOI：** [10.48550/arxiv.2608.26418](https://doi.org/10.48550/arxiv.2608.26418)
- **Fetched (UTC) / 采集时间：** 2026-11-24T02:53:34Z
- **Indexed in / 收录来源：** arXiv (Cornell University)

Exact DOI match in OpenAlex, including arXiv preprints. Counts depend on coverage and paper age; they are not quality scores or evidence of peer review.

按 DOI 精确匹配 OpenAlex，包含 arXiv 预印本。引用量受收录范围和发表时间影响，不代表质量评分或已通过同行评审。

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

[Redwood](https://arxiv.org/abs/2608.26418) (initial preprint 2026-08-26; revised 2026-08-28) — Architect Labs reports an AI system that co-generates performance models, RTL, UVM environments, formal-verification artifacts, firmware, and kernels from specifications written by two human architects. Its [project announcement](https://architectlabs.com/blog/redwood) describes long-running agents, EDA feedback, and hardware-in-the-loop validation.

Redwood Nano runs inference on an FPGA. The Samsung 8 nm performance-per-watt comparison is an ASIC projection, not measured fabricated-silicon performance; the announcement describes full GDSII and tapeout as subsequent work. Automation, coverage, and performance results are developer-reported.

## 简体中文

[Redwood](https://arxiv.org/abs/2608.26418)（预印本首发 2026-08-26，修订于 2026-08-28）— Architect Labs 报告由两位人工架构师编写规格，再由 AI 系统协同生成性能模型、RTL、UVM 环境、形式验证材料、固件与内核。[项目公告](https://architectlabs.com/blog/redwood)介绍了长时运行 Agent、EDA 反馈与硬件在环验证。

Redwood Nano 在 FPGA 上运行推理。Samsung 8 nm 下的能效比较属于 ASIC 预测，不是制造后硅片实测；公告将完整 GDSII 与流片列为后续工作。自动化、覆盖率和性能结果均由开发方报告。
