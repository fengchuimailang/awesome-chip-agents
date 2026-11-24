# SLIC: Reinforcement Fine-Tuning Small LMs for Multi-Turn Analog Circuit Optimization

<!-- metadata
{
  "id": "slic",
  "title": "SLIC: Reinforcement Fine-Tuning Small LMs for Multi-Turn Analog Circuit Optimization",
  "name": "SLIC",
  "direction": "analog-rf",
  "date": "2026-11-10",
  "date_basis": "source",
  "tags": ["analog-rf", "sizing", "simulation", "benchmark", "evaluation"],
  "types": ["paper", "project", "benchmark"],
  "links": [
    {"label": "SLIC paper", "url": "https://arxiv.org/abs/2611.13452", "kind": "paper"},
    {"label": "SLIC implementation and benchmark", "url": "https://github.com/slic-agent/slic-agent", "kind": "repository"},
    {"label": "SLIC project page", "url": "https://slic-agent.github.io/", "kind": "source"},
    {"label": "MIT News research article", "url": "https://news.mit.edu/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123", "kind": "source"}
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Trains a local small language model for simulator-guided analog sizing and evaluates it across amplifier topologies and process nodes.",
    "训练可本地部署的小语言模型，通过仿真反馈优化模拟电路尺寸，并跨放大器拓扑和工艺节点评测。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2026-11-10
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Open-source project / 开源项目; Benchmark / dataset / 基准 / 数据集
- **Direction / 方向：** Analog and RF Design / 模拟与 RF 电路
- **Tags / 标签：** [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Circuit sizing / 电路尺寸优化](../tags/sizing.md) · [Simulation / 仿真](../tags/simulation.md) · [Benchmark / 基准](../tags/benchmark.md) · [Evaluation / 评测](../tags/evaluation.md)

## Links / 相关链接

- **Paper / 论文：** [SLIC paper](https://arxiv.org/abs/2611.13452)
- **Repository / 仓库：** [SLIC implementation and benchmark](https://github.com/slic-agent/slic-agent)
- **Source / 原始来源：** [SLIC project page](https://slic-agent.github.io/)
- **Source / 原始来源：** [MIT News research article](https://news.mit.edu/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [slic-agent/slic-agent](https://github.com/slic-agent/slic-agent) | — | — | — | Unavailable / 暂不可用 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。
<!-- resource:end -->

## English

[SLIC](https://arxiv.org/abs/2611.13452) trains a 4B language model with reinforcement learning to iteratively adjust parameters of fixed analog amplifier topologies using simulator feedback. Its benchmark covers 41 topologies, including held-out topologies and transfer across technology nodes. The authors also evaluate transfer to a commercial PDK with local inference. [MIT News](https://news.mit.edu/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123) covered the work on 2026-11-23.

## 简体中文

[SLIC](https://arxiv.org/abs/2611.13452) 使用强化学习训练 4B 语言模型，依据仿真反馈迭代调整固定拓扑模拟放大器的参数。其基准包含 41 种拓扑，并评测未见拓扑及跨工艺节点的迁移；作者还使用本地推理评估了向商业 PDK 的迁移。[MIT News](https://news.mit.edu/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123) 于 2026-11-23 介绍了该工作。
