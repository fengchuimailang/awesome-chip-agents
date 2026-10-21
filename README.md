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

General-purpose LLMs, conventional EDA tools, and chip-related AI work are in scope only when they have a clear connection to agentic chip design workflows.

## Contents

- [Papers](#papers)
- [Open-source Projects](#open-source-projects)
- [Benchmarks and Datasets](#benchmarks-and-datasets)
- [Tools and Platforms](#tools-and-platforms)
- [Surveys and Tutorials](#surveys-and-tutorials)
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
- [ACE-RTL: When Agentic Context Evolution Meets RTL-Specialized LLMs](https://arxiv.org/abs/2602.10218) (2026, preprint) — Combines an RTL-specialized generator with reasoning agents for verification-guided RTL generation and repair.

## Open-source Projects

- [ACE-RTL](https://github.com/NVlabs/ACE-RTL) — NVIDIA Research's agentic system for RTL generation, verification, and iterative repair; includes reusable agent components and benchmark integrations.
- [MAGE](https://github.com/stable-lab/MAGE) — Open-source multi-agent RTL generation system with candidate sampling, debugging, and Verilog-state checks.
- [VerilogCoder](https://github.com/NVlabs/VerilogCoder) — Autonomous Verilog coding agent using graph-based planning and waveform tracing for debugging.
- [RTLFixer](https://github.com/NVlabs/RTLFixer) — Agentic framework for repairing RTL compilation and syntax errors using tool feedback.
- [AutoChip](https://github.com/shailja-thakur/AutoChip) — Feedback-driven HDL generation framework and evaluation resources using compiler and simulation feedback.
- [ChatEDA](https://github.com/wuhy68/ChatEDA) — Open-source implementation and related resources for an LLM-powered autonomous EDA agent. See the repository for supported flows and setup details.
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — Open-source RTL generation benchmark and evaluation code; includes design descriptions, testbenches, and evaluation scripts.
- [OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD) — Open-source RTL-to-GDS flow and research platform used by agentic design and optimization projects.

## Benchmarks and Datasets

- [VerilogEval](https://github.com/NVlabs/verilog-eval) — HDLBits-based benchmark and harness for evaluating Verilog generation with simulation-based functional checks.
- [RTLLM](https://github.com/hkust-zhiyao/RTLLM) — Natural-language-to-RTL benchmark with syntax, functionality, and design-quality evaluation goals.
- [OpenLLM-RTL](https://arxiv.org/abs/2503.15112) — Collection covering RTLLM 2.0, AssertEval, and RTL code datasets for RTL generation and assertion generation.
- [CVDP](https://github.com/NVlabs/cvdp_benchmark) — NVIDIA benchmark for evaluating RTL coding tasks, including generation, editing, and debugging.
- [ArchXBench](https://github.com/sureshpurini/ArchXBench) — Benchmark suite for more complex, multi-cycle, pipelined, and hierarchical RTL tasks across several application domains.

## Tools and Platforms

- [Cadence ChipStack AI Super Agent](https://www.cadence.com/en_US/home/ai/agentic-ai-super-agents.html) — Commercial agentic workflow for front-end design and verification, coordinating specialized agents for RTL, testbenches, regressions, and debug. Availability and capabilities are described by Cadence.
- [OpenROAD Agent](https://github.com/OpenROAD-Assistant/OpenROAD-Agent) — Agent for OpenROAD script generation with execution feedback and self-correction.

## Surveys and Tutorials

- [Large Language Models for EDA: Future or Mirage?](https://doi.org/10.1145/3736167) (2025) — Survey of LLM applications across EDA, including code generation, verification, and agentic workflows.

## News and Updates

- **2026-03 — NVIDIA GTC San Jose:** In a GTC discussion with Jeff Dean, NVIDIA Chief Scientist Bill Dally described agent-assisted chip-design work and expert sub-agents for RTL generation and testbench creation. [Session recording](https://www.nvidia.com/en-us/on-demand/session/gtc26-s82167/). See also the [NVIDIA research page for Spec2RTL-Agent](https://research.nvidia.com/publication/2025-06_spec2rtl-agent-automated-hardware-code-generation-complex-specifications-using) and [ACE-RTL project](https://github.com/NVlabs/ACE-RTL); these are separately dated resources, not projects first announced at this session.
- **2026-02 — Cadence:** Announced early access to the [ChipStack AI Super Agent](https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2026/cadence-unleashes-chipstack-ai-super-agent-pioneering-a-new.html) for front-end design and verification workflows.

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

This list is maintained in English and Simplified Chinese. See [README_zh.md](README_zh.md) for the Chinese version; please keep the two versions' sections and entries aligned. Resource titles may remain in their original language. When practical, provide a short description in both languages.

## License

The original content in this repository is released under the [MIT License](LICENSE). Linked resources remain subject to their respective licenses and terms.
