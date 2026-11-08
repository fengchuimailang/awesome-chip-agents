# CorrectHDL: Agentic HDL Design with LLMs Leveraging High-Level Synthesis as Reference

<!-- metadata
{
  "id": "correcthdl",
  "title": "CorrectHDL: Agentic HDL Design with LLMs Leveraging High-Level Synthesis as Reference",
  "name": "CorrectHDL",
  "direction": "rtl-generation",
  "date": "2025-11-20",
  "date_basis": "source",
  "tags": ["rtl", "generation", "hls", "verification", "debugging"],
  "types": ["paper"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2511.16395", "kind": "paper"},
    {"label": "HDL generation and differential-verification scripts", "url": "https://github.com/AgenticHDL/CorrectHDL", "kind": "repository"}
  ],
  "related": ["ahrr"],
  "also_in": ["architecture-hls-codesign", "verification-debugging"],
  "summary": [
    "Generates modular HDL from C/C++ and iteratively repairs it using RAG and simulation against an HLS reference.",
    "从 C/C++ 生成模块化 HDL，借助 RAG 及与 HLS 参考设计的仿真对比迭代修复。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2025-11-20
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文
- **Direction / 方向：** RTL Generation and Editing / RTL 生成与编辑
- **Tags / 标签：** [RTL / RTL](../tags/rtl.md) · [Code generation / 代码生成](../tags/generation.md) · [HLS / HLS](../tags/hls.md) · [Verification / 验证](../tags/verification.md) · [Debugging / 调试](../tags/debugging.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2511.16395)
- **Repository / 仓库：** [HDL generation and differential-verification scripts](https://github.com/AgenticHDL/CorrectHDL)

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [AgenticHDL/CorrectHDL](https://github.com/AgenticHDL/CorrectHDL) | 17 | 2026-04-27T15:29:03Z | 2026-11-08T20:18:36Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。

## Related resources / 相关资源

- [AHRR](../../resources/architecture-hls-codesign/ahrr.md)
<!-- resource:end -->

## English

[CorrectHDL](https://arxiv.org/abs/2511.16395), first submitted on **2025-11-20**, uses conventional HLS output as a behavioral reference for LLM-generated HDL. Its workflow decomposes C/C++ programs, generates per-module HDL, repairs syntax using retrieval-augmented guidance, and uses differential simulation to locate functional discrepancies before reintegration.

The [repository](https://github.com/AgenticHDL/CorrectHDL) provides generation, simulation, repair, and synthesis scripts. Reproduction requires an appropriately configured HLS tool, RTL simulator, synthesis tool, and project-specific helper scripts; the documented setup uses commercial EDA tools. Correctness evidence is based on the differential tests and reference behavior exercised.

## 简体中文

[CorrectHDL](https://arxiv.org/abs/2511.16395) 首次提交于 **2025-11-20**，以传统 HLS 工具输出作为 LLM 生成 HDL 的行为参考。流程先分解 C/C++ 程序，再生成各模块 HDL，通过检索增强指导修复语法错误，并在重新集成前利用差分仿真定位功能差异。

[仓库](https://github.com/AgenticHDL/CorrectHDL)提供生成、仿真、修复与综合脚本。复现需要配置 HLS 工具、RTL 仿真器、综合工具及项目专用辅助脚本，文档中的配置使用商业 EDA 工具。正确性证据取决于差分测试覆盖的参考行为。
