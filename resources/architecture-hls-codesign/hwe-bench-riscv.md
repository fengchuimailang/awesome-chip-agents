# HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V

<!-- metadata
{
  "id": "hwe-bench-riscv",
  "title": "HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V",
  "name": "HWE Bench · RISC-V design",
  "direction": "architecture-hls-codesign",
  "date": "2026",
  "date_basis": "year-only",
  "tags": [
    "risc-v",
    "formal",
    "fpga",
    "benchmark"
  ],
  "types": [
    "benchmark"
  ],
  "links": [
    {
      "label": "HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V",
      "url": "https://hwebench.com/",
      "kind": "source"
    },
    {
      "label": "HWE Bench V2 results and methodology changes",
      "url": "https://hwebench.com/v2.html",
      "kind": "source"
    },
    {
      "label": "implementation and run data",
      "url": "https://github.com/FeSens/auto-arch-tournament",
      "kind": "repository"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "Evolves RV32IM CPUs with formal and simulation gates; V2 scores vendor-timed FPGA designs on hidden programs.",
    "通过形式验证与仿真检查迭代优化 RV32IM CPU；V2 结合 FPGA 厂商时序分析和隐藏程序评分。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2026
- **Date basis / 日期依据：** Publication / conference year only; first-public month not verified / 仅记录发表 / 会议年份；首次公开月份待核实
- **Type / 类型：** Benchmark / dataset / 基准 / 数据集
- **Direction / 方向：** Architecture, HLS and Hardware/Software Co-design / 架构探索、HLS 与软硬件协同设计
- **Tags / 标签：** [RISC-V / RISC-V](../tags/risc-v.md) · [Formal verification / 形式验证](../tags/formal.md) · [FPGA / FPGA](../tags/fpga.md) · [Benchmark / 基准](../tags/benchmark.md)

## Links / 相关链接

- **Source / 原始来源：** [HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V](https://hwebench.com/)
- **Source / 原始来源：** [HWE Bench V2 results and methodology changes](https://hwebench.com/v2.html)
- **Repository / 仓库：** [implementation and run data](https://github.com/FeSens/auto-arch-tournament)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

## Repository activity / 仓库动态

| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |
| --- | ---: | --- | --- | --- |
| [FeSens/auto-arch-tournament](https://github.com/FeSens/auto-arch-tournament) | 201 | 2026-10-05T17:24:27Z | 2026-10-27T08:48:11Z | Snapshot / 快照 |

Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.

Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。
<!-- resource:end -->

## English

### Benchmarks and Datasets

[HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V](https://hwebench.com/) (2026) — Evaluates agent-driven RV32IM CPU optimization with formal and simulation checks; provides public [implementation and run data](https://github.com/FeSens/auto-arch-tournament). This is a different project from the similarly named [HWE-Bench bug-repair benchmark](../verification-debugging/hwe-bench-bug-repair.md).

[V2](https://hwebench.com/v2.html) (2026-10) starts each run from the same core and scores vendor-tool FPGA timing combined with performance on five hidden programs. It includes memory-stall logic in the timed circuit and reports six runs per agent system. V1's nextpnr timing omitted classes of circuit paths; its scores are not comparable with V2.

The authors disclose gaps in fetch-address checks and arithmetic verification, including an incorrect signed DIV/REM specification. Two final designs also supplied different code to formal verification and synthesis; both pass rechecking when formal verification sees the synthesized version. Rankings depend on the target FPGA, and passing the benchmark does not establish complete CPU correctness. The record retains year-only dating because the original first-public month remains unverified.

## 简体中文

### 基准与数据集

[HWE Bench: An Unbounded Benchmark for LLM Hardware Development on RISC-V](https://hwebench.com/)（2026）— 通过形式验证与仿真检查评测 Agent 驱动的 RV32IM CPU 优化，提供[公开实现和运行数据](https://github.com/FeSens/auto-arch-tournament)。它与名称相近的 [HWE-Bench 硬件 Bug 修复基准](../verification-debugging/hwe-bench-bug-repair.md)并非同一项目。

[V2](https://hwebench.com/v2.html)（2026-10）每次从同一核心出发，结合厂商工具的 FPGA 时序分析与五个隐藏程序的性能评分，将内存停顿逻辑纳入时序分析电路，每个 Agent 系统运行六次。V1 使用的 nextpnr 计时遗漏了部分类型的电路路径，其分数不能与 V2 直接比较。

作者披露取指地址检查和算术验证中的缺口，包括有符号 DIV / REM 形式规格有误。另外两个最终设计向形式验证和综合提供了不同代码；改用综合版本后，两者均通过复核。排名受目标 FPGA 影响，通过基准不能证明完整的 CPU 正确性。由于最初公开月份仍待核实，本条目保留仅年份的归档日期。
