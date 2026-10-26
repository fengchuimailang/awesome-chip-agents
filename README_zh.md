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
- [Veri-Sure: Multi-Agent RTL Code Generation with Temporal Tracing, Slicing and Formal Verification](https://arxiv.org/abs/2601.19747)（2026-01-27 首发；2026-10-15 更新）— 通过设计契约协调 Agent，结合依赖切片引导的局部修复、时序轨迹分析和形式验证进行 RTL 生成与调试；提供[公开代码和基准扩展](https://github.com/xyjoey/Veri-Sure)。
- [ACE-RTL: When Agentic Context Evolution Meets RTL-Specialized LLMs](https://arxiv.org/abs/2602.10218)（2026，预印本）— 结合 RTL 专用生成模型和推理 Agent，通过验证反馈生成和修复 RTL。
- [Can Agents Design Better Chips with a Higher Level Abstraction?](https://arxiv.org/abs/2609.21157)（2026-09-17；ICCAD 2026 专题会议论文）— 将 Agent 驱动的 HLS 设计与 HLS 后的 RTL 精修结合为 AHRR，在 11 项 FPGA 任务上评测；提供[代码、任务定义和评测材料](https://github.com/ZijD/AHRR)。
- [AgenticSizing: A Large Language Model-based Multi-Agent Framework for Analog Circuit Sizing](https://arxiv.org/abs/2609.25873)（2026-09-22，预印本）— 分析电路拓扑与功能块、复用设计知识，并通过仿真反馈协调专门的尺寸优化 Agent；在八个电路上进行评测，提供[公开实现](https://github.com/aprilaihub/agentic-analog-sizing)。
- [Back to the Future: Rethinking EDA Infrastructure for Agentic Systems in Chip Design Verification](https://arxiv.org/abs/2610.06790)（2026-10-05 首发；2026-10-22 更新）— 将仿真波形转换为关系型 SQLite 数据库，协调 Agent 查询信号行为并将异常关联到 RTL；在 150 个验证查询上评测。
- [RFChipAgent: Multi-Agentic AI Flow for Analog/RF Chip Design](https://arxiv.org/abs/2610.10858)（2026-10-07，预印本）— 在人工监督下协调文档检索、拓扑选择、原理图与测试平台组装，以及仿真引导的电路尺寸优化；以 GF22FDSOI 的 60 GHz 低噪声放大器拓扑进行评测。
- [DuoDiscover: Scaling Autonomous Discovery Beyond the Evaluation Bottleneck](https://arxiv.org/abs/2610.17184)（2026，预印本）— 同时发现硬件优化目标和快速代理评估器；其芯片案例通过模拟器搜索优化 CPU 数据预取器微架构，而不是生成 RTL。
- [Agentic AI for Heterogeneous System Design Across Chip, Scale-Up, and Scale-Out Domains](https://arxiv.org/abs/2610.23724)（2026-10-16，预印本）— 提出分层多 Agent 框架 ArchAgent，通过确定性的分析评估器探索芯片与系统架构；报告的性能来自模型评估，并非实测芯片性能。
- [CorrectRTL: Boost RTL Generation Quality Through Automated Self-Correction with Instruction Decomposition](https://arxiv.org/abs/2610.24977)（2026-10-18；ICCAD 2026）— 将结构规划与模块内逻辑实现分离，结合代码片段检索与 SVA 引导的自我修正；提出包含 200 个设计的 ScaleBench，提供[公开基准数据和评测工具](https://github.com/hkust-zhiyao/CorrectRTL)。

## 开源项目

- [AHRR](https://github.com/ZijD/AHRR) — Agent 驱动的 HLS 设计与 RTL 精修流程，提供 11 项 FPGA 任务定义、评测框架、实验记录和 Agent 轨迹；复现硬件流程需要 Vitis/Vivado。
- [Veri-Sure](https://github.com/xyjoey/Veri-Sure) — 公开的多 Agent RTL 生成与修复实现，使用设计契约、依赖切片、时序追踪和形式验证；同时包含 VerilogEval-v2-EXT 基准扩展。
- [AgenticSizing](https://github.com/aprilaihub/agentic-analog-sizing) — 公开的多 Agent 模拟电路尺寸优化实现，包含拓扑分析、设计知识复用、专门的尺寸优化 Agent 和仿真驱动优化。
- [ACE-RTL](https://github.com/NVlabs/ACE-RTL) — NVIDIA Research 的 RTL 生成、验证与迭代修复 Agent 系统，包含可复用的 Agent 组件和基准集成代码。
- [MAGE](https://github.com/stable-lab/MAGE) — 开源多 Agent RTL 生成系统，包含候选采样、调试和 Verilog 状态检查。
- [VerilogCoder](https://github.com/NVlabs/VerilogCoder) — 使用图式规划和波形追踪进行调试的自主 Verilog 编码 Agent。
- [RTLFixer](https://github.com/NVlabs/RTLFixer) — 使用工具反馈修复 RTL 编译和语法错误的 Agent 框架。
- [AutoChip](https://github.com/shailja-thakur/AutoChip) — 利用编译器和仿真反馈进行 HDL 生成的框架及评测资源。
- [ChatEDA](https://github.com/wuhy68/ChatEDA) — LLM 驱动的自主 EDA Agent 的开源实现及相关资源；支持流程和运行方式请见项目仓库。
- [ai-chip-design-platform](https://github.com/HUNT-001/ai-chip-design-platform) — 面向 RISC-V RTL 的多 Agent 验证平台，覆盖语义分析、测试平台生成、RTL/Spike 对照、覆盖率驱动测试、形式检查和可审计的验证证据。
- [OpenROAD Agent](https://github.com/OpenROAD-Assistant/OpenROAD-Agent) — 开源的 OpenROAD Agent，可生成并执行 Tcl 脚本，根据工具反馈迭代修复失败；重点是物理设计流程自动化，而非 RTL 生成或 PPA 搜索。
- [DRCHealer](https://github.com/burcgokden/DRCHealer) — 面向物理验证的研究原型，将自然语言设计规则转换为 KLayout DRC 脚本，诊断 GDSII 违规，并执行有次数限制且重新验证的几何修复；使用结果前应审查生成的规则和修复内容。
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — 开源 RTL 生成基准与评测代码，包含设计描述、测试平台和评测脚本。
- [OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD) — 开源 RTL-to-GDS 流程及研究平台，供 Agent 芯片设计和优化项目使用。

## 基准与数据集

本栏目并非所有资源都是 LLM Agent 基准；其中也包括可用于构建 Agent 评测的任务集、工作负载或数据集。

- [VerilogEval](https://github.com/NVlabs/verilog-eval) — 基于 HDLBits 的 Verilog 生成评测基准和工具，使用仿真检查功能正确性。
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — 自然语言到 RTL 的基准，覆盖语法、功能和设计质量等评测目标。
- [OpenLLM-RTL](https://arxiv.org/abs/2503.15112) — 汇集 RTLLM 2.0、AssertEval 以及用于 RTL 生成和断言生成的数据集。
- [CVDP](https://github.com/NVlabs/cvdp_benchmark) — NVIDIA 发布的 RTL 编码评测基准，覆盖生成、编辑和调试等任务。
- [RTL-Repo](https://github.com/AUCOHL/RTL-Repo)（2024）— 面向仓库级 Verilog 补全的基准，包含 4,000 多个 GitHub 代码样本及完整仓库上下文；测试集也可从 [Hugging Face](https://huggingface.co/datasets/ahmedallam/RTL-Repo) 获取。
- [ChipBench](https://arxiv.org/abs/2601.21448)（2026）— 面向较真实的层次化硬件模块，评测 Verilog 生成、调试和参考模型生成；提供[开源实现](https://github.com/zhongkaiyu/ChipBench)。
- [ArchXBench](https://github.com/sureshpurini/ArchXBench) — 面向复杂 RTL 任务的基准，包含多周期、流水线和层次化设计，覆盖多个应用领域。
- [RTL-BenchMT](https://github.com/hkust-zhiyao/RTL-BenchMT)（DAC 2026）— 面向 Agent 辅助 RTL 基准维护的公开数据集和评测代码；v2 增加 438 个 RTL 变体，并报告了跨六个源基准修复 47 个提示歧义案例。
- [RTL-BenchLS: A Large-Scale Benchmark for RTL Reasoning and Generation with Large Language Models](https://arxiv.org/abs/2606.08976)（2026）— 提供一万多个经过形式验证的 Verilog 设计，用于往返推理、掩码内容推理和仓库问题修复，并提供[数据和评测代码](https://github.com/hkust-zhiyao/RTL-BenchLS)。
- [HWE-Bench: Benchmarking LLM Agents on Real-World Hardware Bug Repair Tasks](https://arxiv.org/abs/2604.14709)（2026）— 面向仓库级硬件 Bug 修复的基准，包含来自六个开源硬件项目的 417 个 fail-to-pass 任务；[代码和数据下载说明](https://github.com/pku-liang/hwe-bench)覆盖 Verilog、SystemVerilog 和 Chisel。
- [SynthAgentic-Eval](https://huggingface.co/datasets/KSU-HW-SEC/SynthAgentic-Eval)（GLSVLSI 2026）— 面向综合感知评测的公开数据，记录 32 个语言模型在 202 个 Verilog 任务上各尝试五次的结果，并提供每次尝试的结果和黄金综合参考；配套[分析流程](https://github.com/owenfucell/SynthAgentic)。
- [HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V](https://hwebench.com/)（2026）— 让 Agent 从零设计 RV32IM CPU，通过形式证明筛选候选，再用 FPGA 实测性能评分；提供[公开实现和运行数据](https://github.com/FeSens/auto-arch-tournament)，与上面的 HWE-Bench 硬件 Bug 修复基准并非同一项目。
- [SCORE: System-on-Chip Verilog RTL Modules Dataset](https://github.com/SJTU-YONGFU-RESEARCH-GRP/score) — 汇集由 SoC 生成器和硬件构造语言一致生成的 Verilog RTL，可用于可复现的综合、验证和 Agent 评测，但本身不是 Agent 基准。
- [DPC4: Data Prefetching Championship 4](https://sites.google.com/view/dpc4-2026/home)（2026）— CPU 数据预取器设计竞赛，使用 ChampSim 评估；提供基于模拟器的微架构优化任务，但并非专为 LLM Agent 设计的基准。
- [CircuitNet](https://github.com/circuitnet/CircuitNet) — 开源 EDA 数据集，涵盖拥塞、DRC、IR drop 和时序预测等任务，可用于物理设计机器学习评测，但本身不是 Agent 基准。
- [HWE-Bench: Can Language Models Perform Board-level Schematic Designs?](https://arxiv.org/abs/2603.18102)（2026）— 板级设计基准，包含 300 个任务和 2,914 个 IC 数据手册组成的知识库；若扩展到原理图和 PCB 设计 Agent，可作为补充。
- [Long-Horizon Analog Design Bench: Benchmarking Agents on Hours-Long Analog and Mixed-Signal Circuit Design Tasks](https://arxiv.org/abs/2609.33356)（2026-09-27，预印本）— 使用 17 位芯片设计者贡献的 50 项晶体管级设计任务评测 Agent，通过开源仿真器和隔离的验证器，在数小时运行过程中检查电气规格是否满足。
- [Introducing Build-A-Chip-Bench: from workload specification to GDS](https://chipagents.ai/research/build-a-chip-bench)（2026-10）— ChipAgents 开发、NVIDIA 参与贡献的基准，评测 Agent 从工作负载规格到物理实现的能力；设计须通过功能正确性、可布线性、保持时间和 DRC 检查，再按 PPA 评分。结果由开发方报告；截至 2026-10-24，实时排行榜仍标为即将推出。
- [ScaleBench](https://github.com/hkust-zhiyao/CorrectRTL/tree/main/ScaleBench)（2026-10-18；ICCAD 2026）— CorrectRTL 配套的规格到 RTL 基准，包含 200 项任务及其规格、参考实现和形式等价评测材料；其中有 152 个时序设计和 48 个组合设计。

## 工具与平台

- [Chipmind](https://www.chipmind.ai/) — 面向芯片设计和 EDA 自动化的商业 AI Agent 平台；据厂商介绍，它提供 SoC 级上下文、现有 EDA 流程的自主执行、现场或隔离网络部署，以及通过 RTL Canvas 进行可视化审查。具体功能和性能属于厂商报告。
- [Silimate](https://www.silimate.com/) — 以 AI 驱动 RTL 和实现优化，探索设计方案和 PPA。它是可被 Agent 调用的优化引擎，而不是已有公开说明的 LLM Agent；其于 2024 年被 Synopsys 收购，体现了这类产品形态的商业认可。
- [Synopsys AgentEngineer Solutions and Autopilot Platform](https://www.synopsys.com/ai/agentic-ai.html)（2026）— 支持选择语言模型的商业 Agent 平台，提供面向验证、物理实现和模拟/混合信号设计的专用 Agent；据 Synopsys 介绍，Autopilot 提供编排、工程上下文、记忆和 EDA 工具集成。具体功能属于厂商描述。
- [Cadence ChipStack AI Super Agent](https://www.cadence.com/en_US/home/ai/agentic-ai-super-agents.html) — 面向前端设计与验证的商业 Agent 工作流，可协调 RTL、测试平台、回归和调试等专用 Agent。Cadence 将其更广泛的 Agentic AI Super Agents 产品组合描述为“最高 Level 5 自主性”，覆盖芯片到系统的多个设计领域；官网未给出 Level 1–5 的逐级定义，因此这里将其视为厂商定位，而非行业通用分级或独立评测结论。具体功能和可用情况以 Cadence 页面为准。
- [Cadence ViraStack AI Super Agent](https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design/virastack-ai-super-agent.html) — Cadence 所述的定制与模拟设计 Agent 自动化，覆盖原理图创建、测试平台开发、电路优化和版图迁移。
- [Cadence InnoStack AI Super Agent](https://www.cadence.com/en_US/home/tools/system-design-and-verification/innostack-ai-superagent.html) — Cadence 所述的数字实现与签核 Agent 工作流，覆盖从综合到布局布线的流程。
- [Cadence AuraStack AI Super Agent](https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/aurastack-ai-super-agent.html) — Cadence 所述的 PCB 与先进封装设计 Agent 协同，涉及规划、实现、约束管理、可制造性和多物理场分析。
- [Cadence SystemStack AI Super Agent](https://www.cadence.com/en_US/home/ai/agentic-ai-super-agents.html) — Cadence AgentStack 产品组合图中列出的多物理场 Agent；目前未找到独立产品页，具体功能和可用情况尚不明确。

## 综述与教程

- [Large Language Models for EDA: Future or Mirage?](https://doi.org/10.1145/3736167)（2025）— 综述 LLM 在 EDA 中的应用，包括代码生成、验证和 Agent 工作流。
- [Synopsys.ai: Building Products of Tomorrow, Today](https://www.synopsys.com/content/dam/synopsys/resources/ai-solutions/synopsys-ai-brochure.pdf#page=2)（2025）— 官方宣传册，第 2–3 页介绍 AgentEngineer 与 Synopsys 的 L1–L5 AI 能力框架：辅助、执行、编排、规划和决策。分级及能力主张由厂商提出，并非独立评测结论。
- [Introducing Synopsys Long-Horizon AgentEngineer Solutions and Autopilot Platform](https://www.synopsys.com/blogs/chip-design/long-horizon-agentengineer-solutions.html)（2026）— 官方架构介绍，说明 Agent 如何围绕复杂工程目标协调任务 Agent 和 EDA 工具、评估中间结果，并通过记忆和人工审查检查点保持上下文与监督。

## 演讲与视频

- **2026 — NVIDIA GTC Taipei：** [NVIDIA GTC Taipei 2026 Keynote](https://www.youtube.com/watch?v=wSp6AiNIrsY) — 可从 **1:12:10** 左右观看 Cadence Chip Design Super Agent 及用于 RTL 生成和测试平台创建的专家子 Agent 相关讨论；这是主题演讲中的一段，并非详细技术演示。
- **2026-07-22 — Cadence Design Systems：** [See how Cadence InnoStack AI Super Agent automates synthesis-to-post-route digital implementation](https://www.youtube.com/watch?v=my-8jSjaZlQ) — 官方产品演示，介绍 Agent 如何辅助多模块物理设计，从综合推进到布线后流程；功能和效果属于厂商自行展示。
- **2026-02-10 — Cadence Design Systems：** [Cadence ChipStack AI Super Agent Demo Overview](https://www.youtube.com/watch?v=p_U-4-jKgcU) — 官方概览视频，介绍面向芯片前端设计与验证的 Agent 工作流；功能和效果属于厂商自行展示。
- **Synopsys — 点播，页面未列发布日期：** [Agentic AI for Chip Design: The Nuts and Bolts of the AgentEngineer](https://www.synopsys.com/webinars/agentic-ai-nuts-bolts-agentengineer.html) — Synopsys 的 Paras Mal Jain 介绍具备领域知识的 Agent、多 Agent EDA 工作流执行和工程师监督；官方页面提供点播登记表单。
- **Synopsys — 点播，页面未列发布日期：** [Scaling Expertise with AI Agents Across the Formal Workflow](https://www.synopsys.com/webinars/scaling-ai-agents-formal-workflow.html) — NVIDIA 的 Ghaith Bany Hamid 讨论领域适配 LLM、GenFV 与 Synopsys VC Formal 的结合，涉及断言、辅助属性生成和迭代改进；官方页面提供点播登记表单。

## 新闻与动态

- **2026-10-21 — Siemens 与 NVIDIA：** [Siemens expands agentic AI collaboration to tackle 3D IC power and thermal challenges with NVIDIA](https://news.siemens.com/en-us/siemens-nvidia-gtc-3d-ic-thermal-ai/) — 宣布面向 3D IC 电热协同设计的 Fuse EDA AI Agent 工作流，协调七个 EDA 工具中的九个阶段，通过物理求解器诊断未达标原因并迭代设计方案；功能和效率数字属于厂商报告。
- **2026-10-21 — Mistral 与 NVIDIA：** [Mistral Advances AI for Engineering with NVIDIA](https://mistral.ai/news/mistral-nvidia-ai-for-industrial-engineering/) — 宣布计划开发 CAE/EDA Agent 评测，涵盖工程工具使用、多步骤流程完成情况、技术正确性、执行时间和计算成本，同时建设物理模型基准与开放数据集；公告描述的是计划开展的工作，并非已发布的 EDA 基准。
- **2026-10 — Google 及其合作者：** [DuoDiscover](https://duodiscover.github.io/) 报告了一种同时发现优化目标和代理评估器的 Agent 集群，并展示了基于模拟器的 CPU 数据预取器微架构优化任务。
- **2026-09-30 — Synopsys 与 OpenAI：** [宣布建立多年合作，开发 GPT-Synopsys](https://news.synopsys.com/2026-09-30-OpenAI-and-Synopsys-Announce-GPT-Synopsys-Frontier-Intelligence-to-Revolutionize-Chip-Design)，这是面向芯片设计工作流、计划使用 Synopsys EDA 工具的专用模型。公告描述了联合开发、EDA 工具许可和集成计划；目前未提供独立评测结果。
- **2026-09-28 — Synopsys：** [Synopsys Powers Autonomous Engineering with a Broad Portfolio of Long-Horizon Agents and Autopilot Platform](https://news.synopsys.com/2026-09-28-Synopsys-Powers-Autonomous-Engineering-with-a-Broad-Portfolio-of-Long-Horizon-Agents-and-Autopilot-Platform) — 宣布覆盖验证、实现和 AMS 设计等领域的专用 Agent 及编排平台；公告报告了客户合作进展，并将可用时间安排在 2026 年底，效果由 Synopsys 及客户自行报告。
- **2026-09-22 — Cadence：** [Cadence Expands ChipStack AI Super Agent with a New Agent for RTL Generation and Early PPA Optimization](https://login.cadence.com/content/cadence-www/global/en_US/home/company/newsroom/press-releases/pr/2026/cadence-expands-chipstack-ai-super-agent-with-a-new-agent-for.html) — 宣布规格到 RTL 生成、现有 RTL 修改与早期 PPA 优化能力，计划于 2026 年第四季度向部分客户开放早期试用；具体功能和早期评测结果属于厂商报告。
- **2026-07-27 — Synopsys、AMD 与 Microsoft：** [Synopsys Advances Agentic AI Chip Design with AMD and Microsoft](https://news.synopsys.com/2026-07-27-Synopsys-Advances-Agentic-AI-Chip-Design-with-AMD-and-Microsoft) — 宣布调试/根因分析和实现/QoR 收敛工作流可在 Microsoft Discovery 上申请评估，AMD 正在评估其应用；早期效果属于厂商报告。
- **2026-07-26 — Synopsys 与 NVIDIA：** [Synopsys Showcases Comprehensive Autonomous Engineering Workflows from Silicon to Systems, Developed with NVIDIA Technology](https://news.synopsys.com/2026-07-26-Synopsys-Showcases-Comprehensive-Autonomous-Engineering-Workflows-from-Silicon-to-Systems%2C-Developed-with-NVIDIA-Technology) — 介绍使用 NVIDIA Nemotron、Agent Toolkit 和 OpenShell 的 AgentEngineer 验证编排 Agent，协调测试计划、覆盖率收敛和调试；功能和效果属于厂商报告。
- **2026-03 — NVIDIA GTC San Jose：** 在与 Jeff Dean 的讨论中，NVIDIA 首席科学家 Bill Dally 介绍了 Agent 辅助芯片设计，以及用于 RTL 生成和测试平台创建的专家子 Agent。[演讲录像](https://www.nvidia.com/en-us/on-demand/session/gtc26-s82167/)。另可参阅 [NVIDIA Research 的 Spec2RTL-Agent 页面](https://research.nvidia.com/publication/2025-06_spec2rtl-agent-automated-hardware-code-generation-complex-specifications-using) 和 [ACE-RTL 项目](https://github.com/NVlabs/ACE-RTL)；这些是不同日期发布的相关资料，并非在这场演讲中首次发布的项目。
- **2026-03-11 — Synopsys Converge：** [Synopsys Outlines Vision for Engineering the Future](https://news.synopsys.com/2026-03-11-Synopsys-Outlines-Vision-for-Engineering-the-Future) — 展示 AgentEngineer 多 Agent 流程，覆盖规格到 RTL 生成、Lint、单元测试平台创建和迭代 EDA 验证；公告附官方流程演示入口，其“L4”分级和效率数字属于厂商主张。
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
