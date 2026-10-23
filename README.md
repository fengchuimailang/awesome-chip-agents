# Awesome Chip Agents

[简体中文](README_zh.md)

A curated list of papers, open-source projects, benchmarks, tools, and other resources on **LLM agents for chip design**.

The goal is to make this area easier to explore: find relevant work, understand what each resource does, and follow progress across research and practice.

## Scope

This list focuses on LLM-based agents that contribute to chip design or its workflows, including:

- RTL and hardware description language generation, editing, and verification
- EDA workflow automation and tool use
- Chip architecture exploration, optimization, and design-space exploration
- Agent frameworks, benchmarks, and datasets built for these tasks

Architecture optimization may operate on software models or simulators while targeting hardware behavior, such as cache policies, prefetchers, microarchitecture parameters, or PPA. These workflows complement RTL-generation agents but do not necessarily produce synthesizable RTL.

General-purpose LLMs, conventional EDA tools, and chip-related AI work are in scope only when they have a clear connection to agentic chip design workflows.

## Contents

- [Papers](#papers)
- [Open-source Projects](#open-source-projects)
- [Benchmarks and Datasets](#benchmarks-and-datasets)
- [Tools and Platforms](#tools-and-platforms)
- [Surveys and Tutorials](#surveys-and-tutorials)
- [Talks and Videos](#talks-and-videos)
- [News and Updates](#news-and-updates)
- [Contributing](#contributing)

## Papers

- [ChatEDA: A Large Language Model Powered Autonomous Agent for EDA](https://doi.org/10.1109/TCAD.2024.3383347) (2024) — An LLM-based agent that decomposes EDA tasks, generates scripts, and executes a flow from RTL toward GDSII.
- [Spec2RTL-Agent: Automated Hardware Code Generation from Complex Specifications Using LLM Agent Systems](https://research.nvidia.com/publication/2025-06_spec2rtl-agent-automated-hardware-code-generation-complex-specifications-using) (ICLAD 2025) — A multi-agent system that converts complex specifications into synthesizable designs through planning, progressive coding, and reflection.
- [ORFS-agent: Tool-Using Agents for Chip Design Optimization](https://arxiv.org/abs/2506.08332) (MLCAD 2025) — Uses an LLM agent to iteratively tune OpenROAD Flow Scripts parameters against physical design metrics.
- [OpenROAD Agent: An Intelligent Self-Correcting Script Generator for OpenROAD](https://github.com/OpenROAD-Assistant/OpenROAD-Agent) (ICLAD 2025) — Generates OpenROAD scripts and uses tool feedback to correct them; the linked repository includes the paper and reproduction code.
- [VerilogCoder: Autonomous Verilog Coding Agents with Graph-based Planning and AST-based Waveform Tracing Tool](https://arxiv.org/abs/2408.08927) (AAAI 2025) — Coordinates planning, simulation, and waveform tracing agents to generate and debug Verilog.
- [MAGE: A Multi-Agent Engine for Automated RTL Code Generation](https://arxiv.org/abs/2412.07822) (2024 preprint) — Uses multi-agent candidate exploration and checkpoint-based feedback to improve RTL correctness.
- [RTLFixer: Automatically Fixing RTL Syntax Errors with Large Language Models](https://arxiv.org/abs/2311.16543) (2023) — Applies retrieval and ReAct-style tool feedback to repair Verilog compilation errors.
- [AutoChip: Automating HDL Generation Using LLM Feedback](https://arxiv.org/abs/2311.04887) (2023) — Early feedback-driven HDL generation work that uses compiler and simulation output to iteratively improve Verilog.
- [AutoBench: Automatic Testbench Generation and Evaluation Using LLMs for HDL Design](https://arxiv.org/abs/2407.03891) (MLCAD 2024) — Generates self-checking HDL testbenches from design descriptions and evaluates their quality; see the [open-source implementation](https://github.com/AutoBench/AutoBench).
- [ACE-RTL: When Agentic Context Evolution Meets RTL-Specialized LLMs](https://arxiv.org/abs/2602.10218) (2026, preprint) — Combines an RTL-specialized generator with reasoning agents for verification-guided RTL generation and repair.
- [DuoDiscover: Scaling Autonomous Discovery Beyond the Evaluation Bottleneck](https://arxiv.org/abs/2610.17184) (2026, preprint) — Co-discovers hardware optimization targets and fast proxy evaluators; its chip case optimizes a CPU data-prefetcher microarchitecture through simulator-based search rather than generating RTL.

## Open-source Projects

- [ACE-RTL](https://github.com/NVlabs/ACE-RTL) — NVIDIA Research's agentic system for RTL generation, verification, and iterative repair; includes reusable agent components and benchmark integrations.
- [MAGE](https://github.com/stable-lab/MAGE) — Open-source multi-agent RTL generation system with candidate sampling, debugging, and Verilog-state checks.
- [VerilogCoder](https://github.com/NVlabs/VerilogCoder) — Autonomous Verilog coding agent using graph-based planning and waveform tracing for debugging.
- [RTLFixer](https://github.com/NVlabs/RTLFixer) — Agentic framework for repairing RTL compilation and syntax errors using tool feedback.
- [AutoChip](https://github.com/shailja-thakur/AutoChip) — Feedback-driven HDL generation framework and evaluation resources using compiler and simulation feedback.
- [ChatEDA](https://github.com/wuhy68/ChatEDA) — Open-source implementation and related resources for an LLM-powered autonomous EDA agent. See the repository for supported flows and setup details.
- [ai-chip-design-platform](https://github.com/HUNT-001/ai-chip-design-platform) — Multi-agent RISC-V RTL verification platform covering semantic analysis, testbench generation, RTL/Spike comparison, coverage-directed testing, formal checks, and auditable verification evidence.
- [OpenROAD Agent](https://github.com/OpenROAD-Assistant/OpenROAD-Agent) — Open-source agent that generates Tcl scripts for OpenROAD, executes them, and iteratively repairs failures using tool feedback; focused on physical-design flow automation rather than RTL generation or PPA search.
- [DRCHealer](https://github.com/burcgokden/DRCHealer) — Research prototype for physical verification that turns natural-language design rules into KLayout DRC scripts, diagnoses GDSII violations, and applies bounded, re-verified geometric repairs; review generated rules and fixes before trusting results.
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — Open-source RTL generation benchmark and evaluation code; includes design descriptions, testbenches, and evaluation scripts.
- [OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD) — Open-source RTL-to-GDS flow and research platform used by agentic design and optimization projects.

## Benchmarks and Datasets

Not every resource here is an LLM-agent benchmark: some provide task suites, workloads, or datasets that can support agent evaluation.

- [VerilogEval](https://github.com/NVlabs/verilog-eval) — HDLBits-based benchmark and harness for evaluating Verilog generation with simulation-based functional checks.
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — Natural-language-to-RTL benchmark with syntax, functionality, and design-quality evaluation goals.
- [OpenLLM-RTL](https://arxiv.org/abs/2503.15112) — Collection covering RTLLM 2.0, AssertEval, and RTL code datasets for RTL generation and assertion generation.
- [CVDP](https://github.com/NVlabs/cvdp_benchmark) — NVIDIA benchmark for evaluating RTL coding tasks, including generation, editing, and debugging.
- [ChipBench](https://arxiv.org/abs/2601.21448) (2026) — Benchmark covering Verilog generation, debugging, and reference-model generation on realistic, hierarchical hardware modules; includes an [open-source implementation](https://github.com/zhongkaiyu/ChipBench).
- [ArchXBench](https://github.com/sureshpurini/ArchXBench) — Benchmark suite for more complex, multi-cycle, pipelined, and hierarchical RTL tasks across several application domains.
- [DPC4: Data Prefetching Championship 4](https://sites.google.com/view/dpc4-2026/home) (2026) — CPU data-prefetcher design competition evaluated with ChampSim; provides a simulator-based microarchitecture optimization task, rather than an LLM-agent-specific benchmark.
- [CircuitNet](https://github.com/circuitnet/CircuitNet) — Open EDA dataset for tasks such as congestion, DRC, IR-drop, and timing prediction; useful for physical-design ML evaluation, but not an agent benchmark by itself.

## Tools and Platforms

- [Chipmind](https://www.chipmind.ai/) — Commercial AI-agent platform for chip design and EDA automation; the vendor describes SoC-wide context, autonomous execution of existing EDA flows, on-premises or air-gapped deployment, and RTL Canvas visual review. Capabilities and performance claims are vendor-reported.
- [Silimate](https://www.silimate.com/) — AI-driven RTL and implementation optimization product for exploring design choices and PPA. It is an optimization engine that agents could call, rather than a publicly documented LLM agent; its acquisition by Synopsys in 2024 shows commercial uptake of this category.
- [Cadence ChipStack AI Super Agent](https://www.cadence.com/en_US/home/ai/agentic-ai-super-agents.html) — Commercial agentic workflow for front-end design and verification, coordinating specialized agents for RTL, testbenches, regressions, and debug. Availability and capabilities are described by Cadence.

## Surveys and Tutorials

- [Large Language Models for EDA: Future or Mirage?](https://doi.org/10.1145/3736167) (2025) — Survey of LLM applications across EDA, including code generation, verification, and agentic workflows.

## Talks and Videos

- **2026 — NVIDIA GTC Taipei:** [NVIDIA GTC Taipei 2026 Keynote](https://www.youtube.com/watch?v=wSp6AiNIrsY) — See around **1:12:10** for discussion of Cadence Chip Design Super Agent and expert sub-agents for RTL generation and testbench creation; this is a keynote segment, not a detailed technical demo.
- **2026-07-22 — Cadence Design Systems:** [See how Cadence InnoStack AI Super Agent automates synthesis-to-post-route digital implementation](https://www.youtube.com/watch?v=my-8jSjaZlQ) — Official product demonstration covering agent-assisted multi-block physical-design work from synthesis through post-route; capabilities and results are vendor-reported.
- **2026-02-10 — Cadence Design Systems:** [Cadence ChipStack AI Super Agent Demo Overview](https://www.youtube.com/watch?v=p_U-4-jKgcU) — Official overview of its agentic workflow for front-end silicon design and verification; capabilities and results are vendor-reported.

## News and Updates

- **2026-10 — Google and collaborators:** [DuoDiscover](https://duodiscover.github.io/) reported an agent fleet that jointly discovers optimization targets and proxy evaluators, including a CPU data-prefetcher microarchitecture task with simulator evaluations.
- **2026-03 — NVIDIA GTC San Jose:** In a GTC discussion with Jeff Dean, NVIDIA Chief Scientist Bill Dally described agent-assisted chip-design work and expert sub-agents for RTL generation and testbench creation. [Session recording](https://www.nvidia.com/en-us/on-demand/session/gtc26-s82167/). See also the [NVIDIA research page for Spec2RTL-Agent](https://research.nvidia.com/publication/2025-06_spec2rtl-agent-automated-hardware-code-generation-complex-specifications-using) and [ACE-RTL project](https://github.com/NVlabs/ACE-RTL); these are separately dated resources, not projects first announced at this session.
- **2026-02 — Cadence:** Announced early access to the [ChipStack AI Super Agent](https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2026/cadence-unleashes-chipstack-ai-super-agent-pioneering-a-new.html) for front-end design and verification workflows.
- **2025-05-14 — Google DeepMind:** [AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) proposed a Verilog rewrite for a matrix-multiplication circuit that Google says passed verification and was integrated into a forthcoming TPU; this is a vendor-reported chip-design case, not a claim of end-to-end chip design.

## Contributing

Contributions are welcome. Please open a pull request to add a resource, correct an entry, or report a broken link.

For additions:

- Keep the resource directly relevant to LLM agents for chip design.
- Provide a stable link to the paper, project, benchmark, or original announcement.
- Add a concise, factual description that explains its relevance.
- Include the publication year or announcement date when available.
- Put each item in the most relevant section and keep entries roughly chronological within that section.
- Prefer the original title and source. Avoid promotional claims and duplicate entries.
- For company announcements, distinguish vendor-reported claims from independently evaluated research results.
- Include videos when they are official technical talks, demonstrations, or recorded presentations directly relevant to chip-design agents; provide the publication date, channel or organizer, and a short factual description.

This list is maintained in English and Simplified Chinese. See [README_zh.md](README_zh.md) for the Chinese version; please keep the two versions' sections and entries aligned. Resource titles may remain in their original language. When practical, provide a short description in both languages.

## License

The original content in this repository is released under the [MIT License](LICENSE). Linked resources remain subject to their respective licenses and terms.
