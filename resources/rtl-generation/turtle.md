# TuRTLe: A Unified Evaluation of LLMs for RTL Generation

<!-- metadata
{
  "id": "turtle",
  "title": "TuRTLe: A Unified Evaluation of LLMs for RTL Generation",
  "name": "TuRTLe",
  "direction": "rtl-generation",
  "date": "2025-03-20",
  "date_basis": "source",
  "tags": ["rtl", "generation", "benchmark", "evaluation", "ppa"],
  "types": ["paper", "project", "platform"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2504.01986", "kind": "paper"},
    {"label": "Unified evaluation framework", "url": "https://github.com/HPAI-BSC/TuRTLe", "kind": "repository"},
    {"label": "Dated project announcements", "url": "https://github.com/HPAI-BSC/TuRTLe#news", "kind": "source"},
    {"label": "Official leaderboard", "url": "https://huggingface.co/spaces/HPAI-BSC/TuRTLe-Leaderboard", "kind": "source"}
  ],
  "related": ["verilogeval", "rtllm", "rtl-repo"],
  "also_in": [],
  "summary": [
    "Unifies RTL generation benchmarks and evaluates syntax, functionality, synthesis, PPA, and code completion with EDA tools.",
    "统一多套 RTL 生成基准，借助 EDA 工具评估语法、功能、可综合性、PPA 和代码补全。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2025-03-20
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Open-source project / 开源项目; Tool / platform / 工具 / 平台
- **Direction / 方向：** RTL Generation and Editing / RTL 生成与编辑
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Code generation / 代码生成](../tags/generation.md) · [Benchmark / 基准](../tags/benchmark.md) · [Evaluation / 评测](../tags/evaluation.md) · [PPA / QoR / PPA / QoR](../tags/ppa.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2504.01986)
- **Repository / 仓库：** [Unified evaluation framework](https://github.com/HPAI-BSC/TuRTLe)
- **Source / 原始来源：** [Dated project announcements](https://github.com/HPAI-BSC/TuRTLe#news)
- **Source / 原始来源：** [Official leaderboard](https://huggingface.co/spaces/HPAI-BSC/TuRTLe-Leaderboard)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [HPAI-BSC/TuRTLe](https://github.com/HPAI-BSC/TuRTLe) | 53 | 2026-07-22T09:21:39Z | 2026-10-31T05:54:36Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [VerilogEval](../../resources/rtl-generation/verilogeval.md)
- [RTLLM](../../resources/rtl-generation/rtllm.md)
- [RTL-Repo](../../resources/rtl-generation/rtl-repo.md)
<!-- resource:end -->

## English

[TuRTLe](https://github.com/HPAI-BSC/TuRTLe) is a unified evaluation framework integrating VerilogEval, RTLLM, VGen, RTL-Repo, and NotSoTiny. It automates checks using Icarus Verilog, Verilator, Yosys, and LibreLane/OpenROAD, with API-based inference and containerized evaluation. It is relevant as evaluation infrastructure for generated RTL.

The project's [announcements](https://github.com/HPAI-BSC/TuRTLe#news) date the public leaderboard to **2025-03-20**; the [paper](https://arxiv.org/abs/2504.01986) was first submitted on **2025-03-31**, despite its April arXiv identifier. Code release followed on **2025-05-19**. The repository identifies the original work as MLCAD 2025 and links a 2026 TODAES extension; those later dates do not replace the earliest public milestone.

## 简体中文

[TuRTLe](https://github.com/HPAI-BSC/TuRTLe) 是统一评测框架，集成 VerilogEval、RTLLM、VGen、RTL-Repo 和 NotSoTiny，使用 Icarus Verilog、Verilator、Yosys 及 LibreLane/OpenROAD 自动检查生成的 RTL，并提供 API 推理与容器化评测，可作为 RTL 生成工作的评测基础设施。

项目[公告](https://github.com/HPAI-BSC/TuRTLe#news)记录排行榜于 **2025-03-20** 公开；[论文](https://arxiv.org/abs/2504.01986)首次提交于 **2025-03-31**，虽然 arXiv 编号属于 4 月；代码于 **2025-05-19** 发布。仓库将原始工作列为 MLCAD 2025，并链接了 2026 年 TODAES 扩展版；后续发表日期不替代最早公开里程碑。
