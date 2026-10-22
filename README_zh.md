# Awesome Chip Agents

[English](README.md)

这里整理与**芯片设计中的 LLM Agent**相关的论文、开源项目、基准、工具及其他资料，帮助读者发现相关工作、了解各项资源的用途，并跟进研究与实践进展。

## 收录范围

本列表关注能够参与芯片设计或相关工作流的 LLM Agent，包括：

- RTL 和硬件描述语言的生成、编辑与验证
- EDA 工作流自动化与工具调用
- 芯片架构探索、优化与设计空间探索
- 面向上述任务的 Agent 框架、基准和数据集

架构优化可以在软件模型或模拟器上进行，但目标仍是硬件行为，例如缓存策略、预取器、微架构参数或 PPA。这类工作与 RTL 生成 Agent 互补，但不一定直接产出可综合 RTL。

通用大模型、传统 EDA 工具，以及芯片领域的其他 AI 工作，只有在与 Agent 式芯片设计工作流有明确联系时才收录。

## 目录

- [论文](#论文)
- [开源项目](#开源项目)
- [基准与数据集](#基准与数据集)
- [工具与平台](#工具与平台)
- [综述与教程](#综述与教程)
- [演讲与视频](#演讲与视频)
- [新闻与动态](#新闻与动态)
- [如何贡献](#如何贡献)

## 论文

- [ChatEDA: A Large Language Model Powered Autonomous Agent for EDA](https://doi.org/10.1109/TCAD.2024.3383347)（2024）— 使用 LLM Agent 分解 EDA 任务、生成脚本并执行从 RTL 到 GDSII 的设计流程。
- [Spec2RTL-Agent: Automated Hardware Code Generation from Complex Specifications Using LLM Agent Systems](https://research.nvidia.com/publication/2025-06_spec2rtl-agent-automated-hardware-code-generation-complex-specifications-using)（ICLAD 2025）— 多 Agent 系统通过规划、逐步编码和反思，将复杂规格文档转化为可综合设计。
- [ORFS-agent: Tool-Using Agents for Chip Design Optimization](https://arxiv.org/abs/2506.08332)（MLCAD 2025）— 使用 LLM Agent 迭代调整 OpenROAD Flow Scripts 参数，以改善物理设计指标。
- [OpenROAD Agent: An Intelligent Self-Correcting Script Generator for OpenROAD](https://github.com/OpenROAD-Assistant/OpenROAD-Agent)（ICLAD 2025）— 生成 OpenROAD 脚本，并根据工具反馈自动修正；链接仓库提供论文和复现代码。
- [VerilogCoder: Autonomous Verilog Coding Agents with Graph-based Planning and AST-based Waveform Tracing Tool](https://arxiv.org/abs/2408.08927)（AAAI 2025）— 协同规划、仿真和波形追踪 Agent，生成并调试 Verilog。
- [MAGE: A Multi-Agent Engine for Automated RTL Code Generation](https://arxiv.org/abs/2412.07822)（2024 年预印本）— 通过多 Agent 候选探索和检查点反馈提升 RTL 正确性。
- [RTLFixer: Automatically Fixing RTL Syntax Errors with Large Language Models](https://arxiv.org/abs/2311.16543)（2023）— 使用检索和 ReAct 式工具反馈修复 Verilog 编译错误。
- [AutoChip: Automating HDL Generation Using LLM Feedback](https://arxiv.org/abs/2311.04887)（2023）— 早期反馈驱动 HDL 生成工作，利用编译器和仿真结果迭代改进 Verilog。
- [AutoBench: Automatic Testbench Generation and Evaluation Using LLMs for HDL Design](https://arxiv.org/abs/2407.03891)（MLCAD 2024）— 根据设计描述生成自检 HDL 测试平台并评估其质量；另见[开源实现](https://github.com/AutoBench/AutoBench)。
- [ACE-RTL: When Agentic Context Evolution Meets RTL-Specialized LLMs](https://arxiv.org/abs/2602.10218)（2026，预印本）— 结合 RTL 专用生成模型和推理 Agent，通过验证反馈生成和修复 RTL。
- [DuoDiscover: Scaling Autonomous Discovery Beyond the Evaluation Bottleneck](https://arxiv.org/abs/2610.17184)（2026，预印本）— 同时发现硬件优化目标和快速代理评估器；其芯片案例通过模拟器搜索优化 CPU 数据预取器微架构，而不是生成 RTL。

## 开源项目

- [ACE-RTL](https://github.com/NVlabs/ACE-RTL) — NVIDIA Research 的 RTL 生成、验证与迭代修复 Agent 系统，包含可复用的 Agent 组件和基准集成代码。
- [MAGE](https://github.com/stable-lab/MAGE) — 开源多 Agent RTL 生成系统，包含候选采样、调试和 Verilog 状态检查。
- [VerilogCoder](https://github.com/NVlabs/VerilogCoder) — 使用图式规划和波形追踪进行调试的自主 Verilog 编码 Agent。
- [RTLFixer](https://github.com/NVlabs/RTLFixer) — 使用工具反馈修复 RTL 编译和语法错误的 Agent 框架。
- [AutoChip](https://github.com/shailja-thakur/AutoChip) — 利用编译器和仿真反馈进行 HDL 生成的框架及评测资源。
- [ChatEDA](https://github.com/wuhy68/ChatEDA) — LLM 驱动的自主 EDA Agent 的开源实现及相关资源；支持流程和运行方式请见项目仓库。
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — 开源 RTL 生成基准与评测代码，包含设计描述、测试平台和评测脚本。
- [OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD) — 开源 RTL-to-GDS 流程及研究平台，供 Agent 芯片设计和优化项目使用。

## 基准与数据集

- [VerilogEval](https://github.com/NVlabs/verilog-eval) — 基于 HDLBits 的 Verilog 生成评测基准和工具，使用仿真检查功能正确性。
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — 自然语言到 RTL 的基准，覆盖语法、功能和设计质量等评测目标。
- [OpenLLM-RTL](https://arxiv.org/abs/2503.15112) — 汇集 RTLLM 2.0、AssertEval 以及用于 RTL 生成和断言生成的数据集。
- [CVDP](https://github.com/NVlabs/cvdp_benchmark) — NVIDIA 发布的 RTL 编码评测基准，覆盖生成、编辑和调试等任务。
- [ChipBench](https://arxiv.org/abs/2601.21448)（2026）— 面向较真实的层次化硬件模块，评测 Verilog 生成、调试和参考模型生成；提供[开源实现](https://github.com/zhongkaiyu/ChipBench)。
- [ArchXBench](https://github.com/sureshpurini/ArchXBench) — 面向复杂 RTL 任务的基准，包含多周期、流水线和层次化设计，覆盖多个应用领域。

## 工具与平台

- [Cadence ChipStack AI Super Agent](https://www.cadence.com/en_US/home/ai/agentic-ai-super-agents.html) — 面向前端设计与验证的商业 Agent 工作流，可协调 RTL、测试平台、回归和调试等专用 Agent。具体功能和可用情况以 Cadence 页面为准。
- [OpenROAD Agent](https://github.com/OpenROAD-Assistant/OpenROAD-Agent) — 面向 OpenROAD 的脚本生成 Agent，支持工具执行反馈和自动修正。

## 综述与教程

- [Large Language Models for EDA: Future or Mirage?](https://doi.org/10.1145/3736167)（2025）— 综述 LLM 在 EDA 中的应用，包括代码生成、验证和 Agent 工作流。

## 演讲与视频

- **2026 — NVIDIA GTC Taipei：** [NVIDIA GTC Taipei 2026 Keynote](https://www.youtube.com/watch?v=wSp6AiNIrsY) — 可从 **1:12:10** 左右观看 Cadence Chip Design Super Agent 及用于 RTL 生成和测试平台创建的专家子 Agent 相关讨论；这是主题演讲中的一段，并非详细技术演示。
- **2026-07-22 — Cadence Design Systems：** [See how Cadence InnoStack AI Super Agent automates synthesis-to-post-route digital implementation](https://www.youtube.com/watch?v=my-8jSjaZlQ) — 官方产品演示，介绍 Agent 如何辅助多模块物理设计，从综合推进到布线后流程；功能和效果属于厂商自行展示。
- **2026-02-10 — Cadence Design Systems：** [Cadence ChipStack AI Super Agent Demo Overview](https://www.youtube.com/watch?v=p_U-4-jKgcU) — 官方概览视频，介绍面向芯片前端设计与验证的 Agent 工作流；功能和效果属于厂商自行展示。

## 新闻与动态

- **2026-10 — Google 及其合作者：** [DuoDiscover](https://duodiscover.github.io/) 报告了一种同时发现优化目标和代理评估器的 Agent 集群，并展示了基于模拟器的 CPU 数据预取器微架构优化任务。
- **2026-03 — NVIDIA GTC San Jose：** 在与 Jeff Dean 的讨论中，NVIDIA 首席科学家 Bill Dally 介绍了 Agent 辅助芯片设计，以及用于 RTL 生成和测试平台创建的专家子 Agent。[演讲录像](https://www.nvidia.com/en-us/on-demand/session/gtc26-s82167/)。另可参阅 [NVIDIA Research 的 Spec2RTL-Agent 页面](https://research.nvidia.com/publication/2025-06_spec2rtl-agent-automated-hardware-code-generation-complex-specifications-using) 和 [ACE-RTL 项目](https://github.com/NVlabs/ACE-RTL)；这些是不同日期发布的相关资料，并非在这场演讲中首次发布的项目。
- **2026-02 — Cadence：** 宣布 [ChipStack AI Super Agent](https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2026/cadence-unleashes-chipstack-ai-super-agent-pioneering-a-new.html) 开始早期试用，面向芯片前端设计与验证工作流。
- **2025-05-14 — Google DeepMind：** [AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) 为矩阵乘法电路提出 Verilog 改写；Google 称其通过验证并集成到后续 TPU。此处属于厂商报告的芯片设计案例，并非端到端芯片设计的主张。

## 如何贡献

欢迎贡献。你可以提交 PR 来新增资料、修正条目或报告失效链接。

新增资料时请注意：

- 确保资料与芯片设计中的 LLM Agent 直接相关。
- 提供论文、项目、基准或原始公告的稳定链接。
- 用简洁、客观的描述说明它为何相关。
- 尽可能注明发表年份或公告日期。
- 将条目放入最合适的栏目；同一栏目内尽量按时间排序。
- 优先使用原始标题和来源，避免宣传性描述及重复条目。
- 对企业公告，请区分厂商自行报告的效果和独立研究评测结果。
- 如果视频是与芯片设计 Agent 直接相关的官方技术演讲、产品演示或会议录像，也可以收录；请注明发布日期、频道或主办方，并提供简洁客观的说明。

本列表同时维护英文和简体中文版。英文版见 [README.md](README.md)；请保持两份文档的栏目和条目对应。资源标题可以保留原文；条件允许时，请为简介同时提供中英文版本。

## 许可

本仓库原创内容采用 [MIT License](LICENSE)。被收录资源仍遵循其各自的许可和使用条款。
