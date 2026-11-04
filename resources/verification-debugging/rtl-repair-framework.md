# Open-Source LLM-Driven Formal Verification: A Multi-Agent Pipeline for RTL Repair

<!-- metadata
{
  "id": "rtl-repair-framework",
  "title": "Open-Source LLM-Driven Formal Verification: A Multi-Agent Pipeline for RTL Repair",
  "name": "RTL Repair Framework",
  "direction": "verification-debugging",
  "date": "2026-07-30",
  "date_basis": "source",
  "tags": ["rtl", "formal", "debugging", "multi-agent", "tool-use"],
  "types": ["paper", "project"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2607.28877", "kind": "paper"},
    {"label": "Formal repair pipeline and experiment logs", "url": "https://github.com/trunghafromvietnam/rtl-repair-framework", "kind": "repository"}
  ],
  "related": ["rtlfixer", "veri-sure"],
  "also_in": ["rtl-generation"],
  "summary": [
    "Studies counterexample-guided multi-agent RTL repair with Yosys, SymbiYosys, and Z3, including explicit failure analysis.",
    "研究结合 Yosys、SymbiYosys、Z3 的反例引导多 Agent RTL 修复，并分析失败模式。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-07-30
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Open-source project / 开源项目
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Formal verification / 形式验证](../tags/formal.md) · [Debugging / 调试](../tags/debugging.md) · [Multi-agent / 多 Agent](../tags/multi-agent.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2607.28877)
- **Repository / 仓库：** [Formal repair pipeline and experiment logs](https://github.com/trunghafromvietnam/rtl-repair-framework)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [trunghafromvietnam/rtl-repair-framework](https://github.com/trunghafromvietnam/rtl-repair-framework) | 1 | 2026-08-03T09:02:08Z | 2026-10-31T05:54:35Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [RTLFixer](../../resources/verification-debugging/rtlfixer.md)
- [Veri-Sure](../../resources/rtl-generation/veri-sure.md)
<!-- resource:end -->

## English

[Open-Source LLM-Driven Formal Verification](https://arxiv.org/abs/2607.28877), first submitted on **2026-07-30**, couples specification-derived properties, formal checking, counterexample analysis, RTL repair, and semantic review in a LangGraph pipeline. Its [implementation](https://github.com/trunghafromvietnam/rtl-repair-framework) uses Yosys, SymbiYosys, and Z3 and includes six small buggy designs, evaluation scripts, and logs.

This is a feasibility study: the authors report reliable repair only for the ALU case, with failures on the other five designs. Their analysis covers vacuity, specification ambiguity, temporal logic, and multiple-property handling. Formal proofs are relative to the generated properties; the experiments use a single LLM.

## 简体中文

[Open-Source LLM-Driven Formal Verification](https://arxiv.org/abs/2607.28877) 首次提交于 **2026-07-30**，在 LangGraph 流程中串联从规格生成性质、形式检查、反例分析、RTL 修复和语义审查。[实现仓库](https://github.com/trunghafromvietnam/rtl-repair-framework)使用 Yosys、SymbiYosys 和 Z3，包含六个带缺陷的小型设计、评测脚本及日志。

该工作属于可行性研究：作者仅在 ALU 案例中报告了稳定修复，其余五个设计均出现失败。分析涉及空泛成立、规格歧义、时序逻辑及多性质处理。形式证明针对所生成的性质，实验仅使用一种 LLM。
