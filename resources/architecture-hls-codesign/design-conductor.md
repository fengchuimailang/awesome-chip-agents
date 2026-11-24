# Design Conductor: An agent autonomously builds a 1.5 GHz Linux-capable RISC-V CPU

<!-- metadata
{
  "id": "design-conductor",
  "title": "Design Conductor: An agent autonomously builds a 1.5 GHz Linux-capable RISC-V CPU",
  "name": "Design Conductor / VerCore",
  "direction": "architecture-hls-codesign",
  "date": "2026",
  "date_basis": "year-only",
  "tags": [
    "architecture",
    "risc-v",
    "eda-flow",
    "multi-agent",
    "vendor-report"
  ],
  "types": [
    "paper"
  ],
  "links": [
    {
      "label": "Design Conductor technical report",
      "url": "https://arxiv.org/abs/2603.08716",
      "kind": "paper"
    },
    {
      "label": "Verkor: Design Conductor and reported designs",
      "url": "https://verkor.io/",
      "kind": "source"
    }
  ],
  "related": [
    "design-conductor-2"
  ],
  "also_in": [
    "physical-design"
  ],
  "summary": [
    "Coordinates LLM agents from CPU specifications through RTL, verification, and GDSII; VerCore results are developer-reported.",
    "协调 LLM Agent 完成 CPU 规格到 RTL、验证及 GDSII 的流程；VerCore 结果由开发方报告。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026
- **Date basis / 日期依据：** Publication / conference year only; first-public month not verified / 仅记录发表 / 会议年份；首次公开月份待核实
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** Architecture, HLS and Hardware/Software Co-design / 架构探索、HLS 与软硬件协同设计
- **Tags / 标签：** [Architecture exploration / 架构探索](../tags/architecture.md) · [RISC-V / RISC-V](../tags/risc-v.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md) · [Multi-agent / 多 Agent](../tags/multi-agent.md) · [Vendor-reported / 厂商报告](../tags/vendor-report.md)

## Links / 相关链接

- **Paper / 论文：** [Design Conductor technical report](https://arxiv.org/abs/2603.08716)
- **Source / 原始来源：** [Verkor: Design Conductor and reported designs](https://verkor.io/)

## Paper citations / 论文引用

- **OpenAlex：** [10 citations / 次引用](https://openalex.org/W7134962201)
- **DOI：** [10.48550/arxiv.2603.08716](https://doi.org/10.48550/arxiv.2603.08716)
- **Fetched (UTC) / 采集时间：** 2026-11-24T02:53:34Z
- **Indexed in / 收录来源：** arXiv (Cornell University)

Exact DOI match in OpenAlex, including arXiv preprints. Counts depend on coverage and paper age; they are not quality scores or evidence of peer review.

按 DOI 精确匹配 OpenAlex，包含 arXiv 预印本。引用量受收录范围和发表时间影响，不代表质量评分或已通过同行评审。

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [Design Conductor 2.0 / VerTQ](../../resources/architecture-hls-codesign/design-conductor-2.md)
<!-- resource:end -->

## English

[Design Conductor](https://arxiv.org/abs/2603.08716) — Verkor's report on a proprietary LLM-agent system coordinating architecture exploration, RTL and testbench generation, simulation debugging, and backend EDA tools. The authors report generating VerCore from a 219-word specification in 12 hours, with Spike-based functional checks and 1.48 GHz timing closure in ASAP7. These are developer-reported simulation and implementation results.

The report promises VerCore RTL and rebuild scripts; no implementation repository is recorded here without a verified release. Date note: the arXiv identifier indicates March 2026, while its displayed submission history says 2026-02-06; only the year is recorded pending resolution.

## 简体中文

[Design Conductor](https://arxiv.org/abs/2603.08716) — Verkor 关于专有 LLM Agent 系统的技术报告，覆盖架构探索、RTL 与测试平台生成、仿真调试及后端 EDA 工具调用。作者报告从 219 词规格出发，在 12 小时内生成 VerCore，通过基于 Spike 的功能检查，并在 ASAP7 下实现 1.48 GHz 时序收敛；这些是开发方报告的仿真与实现结果。

报告承诺公开 VerCore RTL 与重建脚本，本文不在未核实发布的情况下登记实现仓库。日期说明：arXiv 编号对应 2026 年 3 月，但页面提交历史显示 2026-02-06；冲突解决前仅记录年份。
