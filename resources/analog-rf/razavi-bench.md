# Razavi-Bench: An Expert-Curated Benchmark for Analog-Design Reasoning

<!-- metadata
{
  "id": "razavi-bench",
  "title": "Razavi-Bench: An Expert-Curated Benchmark for Analog-Design Reasoning",
  "name": "Razavi-Bench",
  "direction": "analog-rf",
  "date": "2026-07-02",
  "date_basis": "source",
  "tags": [
    "analog-rf",
    "benchmark",
    "evaluation",
    "tool-use",
    "simulation"
  ],
  "types": [
    "benchmark"
  ],
  "links": [
    {
      "label": "Official benchmark and leaderboard / 官方基准与榜单",
      "url": "https://razavi-bench.tokenzhang.com/",
      "kind": "source"
    },
    {
      "label": "Benchmark tasks and evaluation tools / 基准任务与评测工具",
      "url": "https://github.com/Arcadia-1/razavi-bench",
      "kind": "repository"
    },
    {
      "label": "Citation and release date / 引用信息与发布日期",
      "url": "https://github.com/Arcadia-1/razavi-bench/blob/main/CITATION.cff",
      "kind": "source"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Evaluates analog-circuit reasoning on 50 multimodal questions adapted from Razavi's articles, supporting direct QA and agent evaluation with optional ngspice/Sky130 tools.",
    "使用改编自 Razavi 文章的 50 道多模态题评测模拟电路推理，支持直接问答与 Agent 评测，并提供可选的 ngspice/Sky130 工具。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2026-07-02
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Benchmark / dataset / 基准 / 数据集
- **Direction / 方向：** Analog and RF Design / 模拟与 RF 电路
- **Tags / 标签：** [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Benchmark / 基准](../tags/benchmark.md) · [Evaluation / 评测](../tags/evaluation.md) · [Tool use / 工具调用](../tags/tool-use.md) · [Simulation / 仿真](../tags/simulation.md)

## Links / 相关链接

- **Source / 原始来源：** [Official benchmark and leaderboard / 官方基准与榜单](https://razavi-bench.tokenzhang.com/)
- **Repository / 仓库：** [Benchmark tasks and evaluation tools / 基准任务与评测工具](https://github.com/Arcadia-1/razavi-bench)
- **Source / 原始来源：** [Citation and release date / 引用信息与发布日期](https://github.com/Arcadia-1/razavi-bench/blob/main/CITATION.cff)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [Arcadia-1/razavi-bench](https://github.com/Arcadia-1/razavi-bench) | 104 | 2026-11-08T18:13:18Z | 2026-11-08T20:18:36Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。
<!-- resource:end -->

## English

### Benchmarks and Datasets

[Razavi-Bench](https://razavi-bench.tokenzhang.com/) is an analog-design reasoning benchmark by Zhishuai Zhang. Its [citation file](https://github.com/Arcadia-1/razavi-bench/blob/main/CITATION.cff) records a release date of 2026-07-02. The 50 multimodal questions are adapted from Behzad Razavi's *Analog Design Experiments With AI—Part 1* (Fall 2025, 30 questions) and *Part 2* (Spring 2026, 20 questions), published in IEEE Solid-State Circuits Magazine. Tasks include figures where needed and curated reference answers; the project publishes model answers and judge scores.

The [evaluation modes](https://github.com/Arcadia-1/razavi-bench/blob/main/agentic/README.md) cover direct multimodal QA, agents reading task files and writing an answer, and agents additionally equipped with ngspice, a Sky130 model subset, and a simulation skill. All modes score the final answer against reference answers using the same [0–4 rubric](https://github.com/Arcadia-1/razavi-bench/blob/main/evaluation_rubric.md). The leaderboard uses an LLM judge; the rubric is inferred from Razavi's original comments and scores. Simulation supports reasoning, while simulator files and logs are not graded.

Under the [project license](https://github.com/Arcadia-1/razavi-bench/blob/main/LICENSE), software code is Apache-2.0. Benchmark materials, adapted with Razavi's permission, have separate terms allowing viewing, citation, non-commercial research reference, and local evaluation; redistribution, training use, or incorporation into third-party benchmarks requires prior written permission.

## 简体中文

### 基准与数据集

[Razavi-Bench](https://razavi-bench.tokenzhang.com/) 是 Zhishuai Zhang 整理的模拟设计推理基准，[引用文件](https://github.com/Arcadia-1/razavi-bench/blob/main/CITATION.cff)记录的发布日期为 2026-07-02。其 50 道多模态题改编自 Behzad Razavi 在 IEEE Solid-State Circuits Magazine 发表的 *Analog Design Experiments With AI—Part 1*（2025 年秋季，30 题）和 *Part 2*（2026 年春季，20 题）。任务提供必要的电路图与整理后的参考答案，项目公开模型回答与裁判评分。

[评测模式](https://github.com/Arcadia-1/razavi-bench/blob/main/agentic/README.md)包括直接多模态问答、Agent 读取任务文件并提交答案，以及额外提供 ngspice、Sky130 模型子集和仿真 skill 的 Agent 模式。所有模式均对照参考答案，按同一套 [0–4 分规则](https://github.com/Arcadia-1/razavi-bench/blob/main/evaluation_rubric.md)评价最终回答。榜单使用 LLM 裁判，评分指南由项目根据 Razavi 原文中的评论和评分推导整理。仿真用于辅助推理，仿真文件和日志不参与评分。

[项目许可](https://github.com/Arcadia-1/razavi-bench/blob/main/LICENSE)将软件代码与基准材料分开：代码采用 Apache-2.0；经 Razavi 许可改编的基准材料另有条款，允许查看、引用、非商业研究参考与本地评测，再分发、用于训练或并入第三方基准须事先取得书面许可。
