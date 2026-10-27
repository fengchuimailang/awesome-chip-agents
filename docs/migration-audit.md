# Catalog migration audit / 目录迁移核对

核对日期 / Checked: 2026-10-27

以本次整理前保存的中英文 README 为基准，逐条匹配当前资源详情中的原始介绍，并比对原条目中的 Markdown 链接。此核对确认迁移完整性，不代表外部来源的持续可用性或内容已全部重新核实。

Compared every original entry and its Markdown links against the current resource files using the pre-migration English and Chinese README snapshots. This checks migration completeness, not external availability or a fresh factual review of every source.

## Results / 结果

| Original section / 原章节 | English entries / 英文条目 | Chinese entries / 中文条目 |
| --- | ---: | ---: |
| Papers / 论文 | 28 | 28 |
| Open-source Projects / 开源项目 | 19 | 19 |
| Benchmarks and Datasets / 基准与数据集 | 25 | 25 |
| Tools and Platforms / 工具与平台 | 8 | 8 |
| Surveys and Tutorials / 综述与教程 | 3 | 3 |
| Talks and Videos / 演讲与视频 | 5 | 5 |
| News and Updates / 新闻与动态 | 12 | 12 |

- 原有英文 100 条、中文 100 条介绍均完整保留；105 个不同的原始条目链接均保留。 / All 100 English and 100 Chinese entries, including 105 distinct original links, are preserved.
- 原有 100 条列表条目合并为 84 份资源详情；减少的 16 条是同一工作在论文、项目或基准章节的重复入口，其原始介绍均保留在共用详情内。 / The 100 original list entries now share 84 canonical detail files; 16 repeated entries were merged without losing their original descriptions.
- 原“基准与数据集”25 项全部出现在新总索引；另纳入原论文 / 项目章节中的 HLSFactory-Agent，共 26 项。 / All 25 original benchmarks/datasets appear in the new catalog, plus HLSFactory-Agent from the original paper/project sections (26 total).
- 仓库指标保持 35 份成功快照；本次新增入口无需重新访问网络。 / All 35 successful repository snapshots are retained; this index update does not require a network refresh.

## Original benchmark and dataset mapping / 原基准与数据集去向

| Original resource / 原资源 | Current detail / 当前详情 |
| --- | --- |
| VerilogEval | [详情 / Details](../resources/rtl-generation/verilogeval.md) |
| RTLLM | [详情 / Details](../resources/rtl-generation/rtllm.md) |
| OpenLLM-RTL | [详情 / Details](../resources/rtl-generation/openllm-rtl.md) |
| CVDP | [详情 / Details](../resources/rtl-generation/cvdp.md) |
| RTL-Repo | [详情 / Details](../resources/rtl-generation/rtl-repo.md) |
| ChipBench | [详情 / Details](../resources/rtl-generation/chipbench.md) |
| ArchXBench | [详情 / Details](../resources/rtl-generation/archxbench.md) |
| RTL-BenchMT | [详情 / Details](../resources/rtl-generation/rtl-benchmt.md) |
| RTL-BenchLS | [详情 / Details](../resources/rtl-generation/rtl-benchls.md) |
| HWE-Bench · Bug repair | [详情 / Details](../resources/verification-debugging/hwe-bench-bug-repair.md) |
| SynthAgentic-Eval | [详情 / Details](../resources/rtl-generation/synthagentic-eval.md) |
| HWE Bench · RISC-V design | [详情 / Details](../resources/architecture-hls-codesign/hwe-bench-riscv.md) |
| SCORE | [详情 / Details](../resources/rtl-generation/score.md) |
| DPC4 | [详情 / Details](../resources/architecture-hls-codesign/dpc4.md) |
| CircuitNet | [详情 / Details](../resources/physical-design/circuitnet.md) |
| HWE-Bench · Schematic design | [详情 / Details](../resources/board-system-design/hwe-bench-schematic.md) |
| PostEDA-Bench | [详情 / Details](../resources/physical-design/posteda-bench.md) |
| PDAgent-Bench | [详情 / Details](../resources/physical-design/pdagent-bench.md) |
| WaveformQA | [详情 / Details](../resources/verification-debugging/waveformqa.md) |
| GRADE-RTL | [详情 / Details](../resources/rtl-generation/grade-rtl.md) |
| VeriBugBench | [详情 / Details](../resources/verification-debugging/veribugbench.md) |
| HLS-Eval | [详情 / Details](../resources/architecture-hls-codesign/hls-eval.md) |
| Long-Horizon Analog Design Bench | [详情 / Details](../resources/analog-rf/long-horizon-analog-design-bench.md) |
| Build-A-Chip-Bench | [详情 / Details](../resources/physical-design/build-a-chip-bench.md) |
| ScaleBench | [详情 / Details](../resources/rtl-generation/scalebench.md) |

## Navigation / 新入口

- [中文基准与数据集总索引](../resources/benchmarks/README_zh.md)
- [English benchmark and dataset catalog](../resources/benchmarks/README.md)
