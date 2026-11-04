# EEsizer: LLM-Based AI Agent for Sizing of Analog and Mixed Signal Circuit

<!-- metadata
{
  "id": "eesizer",
  "title": "EEsizer: LLM-Based AI Agent for Sizing of Analog and Mixed Signal Circuit",
  "name": "EEsizer",
  "direction": "analog-rf",
  "date": "2025-09-29",
  "date_basis": "source",
  "tags": ["analog-rf", "sizing", "simulation", "tool-use"],
  "types": ["paper", "project"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2509.25510", "kind": "paper"},
    {"label": "Sizing agent notebooks and circuit examples", "url": "https://github.com/eelab-dev/EEsizer", "kind": "repository"}
  ],
  "related": ["eeschematic", "analogagent"],
  "also_in": [],
  "summary": [
    "Uses LLM function calls, ngspice measurements, and optimization history to iteratively size analog and mixed-signal circuits.",
    "结合 LLM 函数调用、ngspice 测量与优化历史，迭代调整模拟及混合信号电路尺寸。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2025-09-29
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Open-source project / 开源项目
- **Direction / 方向：** Analog and RF Design / 模拟与 RF 电路
- **Tags / 标签：** [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Circuit sizing / 电路尺寸优化](../tags/sizing.md) · [Simulation / 仿真](../tags/simulation.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2509.25510)
- **Repository / 仓库：** [Sizing agent notebooks and circuit examples](https://github.com/eelab-dev/EEsizer)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [eelab-dev/EEsizer](https://github.com/eelab-dev/EEsizer) | 38 | 2026-04-23T22:00:32Z | 2026-10-31T05:54:35Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [EEschematic](../../resources/analog-rf/eeschematic.md)
- [AnalogAgent](../../resources/analog-rf/analogagent.md)
<!-- resource:end -->

## English

[EEsizer](https://arxiv.org/abs/2509.25510), first submitted on **2025-09-29** and revised on **2025-12-22**, takes a SPICE netlist and natural-language performance constraints. An LLM invokes predefined simulation and analysis functions, observes measured performance, and proposes updated device sizes using prior optimization history.

The [author repository](https://github.com/eelab-dev/EEsizer) provides notebooks for several LLM providers, initial circuit netlists, and variation-analysis examples. Reproduction requires ngspice and LLM access. The arXiv record lists the journal version in IEEE Transactions on Circuits and Systems I, 2026; the catalog retains the initial preprint date.

## 简体中文

[EEsizer](https://arxiv.org/abs/2509.25510) 首次提交于 **2025-09-29**，于 **2025-12-22** 修订，以 SPICE 网表和自然语言性能约束为输入。LLM 调用预定义仿真与分析函数，观察测量结果，并结合已有优化历史提出新的器件尺寸。

[作者仓库](https://github.com/eelab-dev/EEsizer)提供面向多种 LLM 服务的 Notebook、初始电路网表和变化分析示例；复现需要 ngspice 与 LLM 访问权限。arXiv 记录将期刊版列为 IEEE Transactions on Circuits and Systems I, 2026；本目录保留首次预印本日期。
