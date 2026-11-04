# EEschematic: Multimodal-LLM Based AI Agent for Schematic Generation of Analog Circuit

<!-- metadata
{
  "id": "eeschematic",
  "title": "EEschematic: Multimodal-LLM Based AI Agent for Schematic Generation of Analog Circuit",
  "name": "EEschematic",
  "direction": "analog-rf",
  "date": "2025-10-19",
  "date_basis": "source",
  "tags": ["analog-rf", "generation", "tool-use"],
  "types": ["paper", "project"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2510.17002", "kind": "paper"},
    {"label": "Schematic-generation agent notebooks", "url": "https://github.com/eelab-dev/EEschematic", "kind": "repository"}
  ],
  "related": ["eesizer"],
  "also_in": [],
  "summary": [
    "Converts SPICE netlists into editable analog schematics and iteratively refines placement and wiring with multimodal feedback.",
    "将 SPICE 网表转换为可编辑的模拟电路原理图，并通过多模态反馈迭代调整布局与连线。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2025-10-19
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Open-source project / 开源项目
- **Direction / 方向：** Analog and RF Design / 模拟与 RF 电路
- **Tags / 标签：** [Analog / RF / 模拟 / RF](../tags/analog-rf.md) · [Code generation / 代码生成](../tags/generation.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2510.17002)
- **Repository / 仓库：** [Schematic-generation agent notebooks](https://github.com/eelab-dev/EEschematic)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [eelab-dev/EEschematic](https://github.com/eelab-dev/EEschematic) | 39 | 2025-10-20T01:07:30Z | 2026-10-31T05:54:35Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [EEsizer](../../resources/analog-rf/eesizer.md)
<!-- resource:end -->

## English

[EEschematic](https://arxiv.org/abs/2510.17002), first submitted on **2025-10-19**, translates existing analog SPICE netlists into editable schematic representations. It combines textual, visual, and symbolic inputs, six reference substructures, and iterative visual reasoning to refine symbol placement and wiring.

The [author repository](https://github.com/eelab-dev/EEschematic) contains agent and conversion notebooks plus inverter, OTA, and telescopic-cascode examples. Its contribution concerns schematic representation and readability; the source netlist supplies the circuit connectivity. This complements the same authors' EEsizer work on device sizing.

## 简体中文

[EEschematic](https://arxiv.org/abs/2510.17002) 首次提交于 **2025-10-19**，将已有模拟电路 SPICE 网表转换为可编辑的原理图表示。它结合文本、视觉与符号输入、六类参考子结构和迭代视觉推理，调整器件符号的位置与连线。

[作者仓库](https://github.com/eelab-dev/EEschematic)包含 Agent 与格式转换 Notebook，以及反相器、OTA 和套筒式共源共栅放大器示例。其贡献在于原理图表达与可读性，电路连接关系来自输入网表；与同一作者团队面向器件尺寸优化的 EEsizer 形成互补。
