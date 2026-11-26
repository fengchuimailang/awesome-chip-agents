# HWRE-Bench: Can LLM Agents Understand Hardware They Did Not Design?

<!-- metadata
{
  "id": "hwre-bench",
  "title": "HWRE-Bench: Can LLM Agents Understand Hardware They Did Not Design?",
  "name": "HWRE-Bench",
  "direction": "verification-debugging",
  "date": "2026-11-23",
  "date_basis": "source",
  "tags": ["benchmark", "evaluation", "specification", "physical-design", "tool-use"],
  "types": ["paper", "benchmark"],
  "links": [
    {"label": "Original paper", "url": "https://arxiv.org/abs/2611.30422", "kind": "paper"},
    {"label": "Full text: benchmark protocol and pilot", "url": "https://arxiv.org/html/2611.30422v1", "kind": "source"}
  ],
  "related": ["hwe-bench-bug-repair", "chiprogrambench"],
  "also_in": ["physical-design"],
  "summary": [
    "Proposes an early hardware reverse-engineering agent benchmark with executable deliverables and controls against copying the supplied netlist.",
    "提出面向硬件逆向工程 Agent 的早期基准，要求可执行交付物，并设置防止复制所给网表得分的对照。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md) · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)

- **Date / 日期：** 2026-11-23
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Paper / 论文; Benchmark / dataset / 基准 / 数据集
- **Direction / 方向：** Verification, Debugging and Specifications / 验证、调试与规格推断
- **Tags / 标签：** [Benchmark / 基准](../tags/benchmark.md) · [Evaluation / 评测](../tags/evaluation.md) · [Specifications / 规格推断](../tags/specification.md) · [Physical design / 物理设计](../tags/physical-design.md) · [Tool use / 工具调用](../tags/tool-use.md)

## Links / 相关链接

- **Paper / 论文：** [Original paper](https://arxiv.org/abs/2611.30422)
- **Source / 原始来源：** [Full text: benchmark protocol and pilot](https://arxiv.org/html/2611.30422v1)

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [HWE-Bench · Bug repair](../../resources/verification-debugging/hwe-bench-bug-repair.md)
- [ChiProgramBench](../../resources/verification-debugging/chiprogrambench.md)
<!-- resource:end -->

## English

[HWRE-Bench](https://arxiv.org/abs/2611.30422), first submitted on **2026-11-23** and marked **work in progress**, evaluates agents working backward from layouts, netlists, or protected simulation models. It proposes five tracks: Extract, Abstract, Audit, Interoperate, and Modify. Tasks require executable deliverables, with controls against empty submissions, copying the supplied netlist, and hard-coding public tests. The aim is to distinguish useful recovery of lost design information from transcription.

The [v1 pilot](https://arxiv.org/html/2611.30422v1) reports 148 launched runs, of which 101 were valid, using two agents on four seed tasks from three original designs. It records tool-use stages, cost, refusals, and infrastructure failures separately. Several proposed tracks are not yet instantiated, conditions have few valid runs, and model and harness effects are confounded. The absence of significant effects from the tested keyless obfuscations does not establish that obfuscation is generally ineffective. Treat this as an early benchmark proposal and pilot, rather than a completed evaluation suite.

## 简体中文

[HWRE-Bench](https://arxiv.org/abs/2611.30422) 首次提交于 **2026-11-23**，作者标注为**进行中的工作**，评测 Agent 从布局、网表或受保护的仿真模型逆向理解硬件的能力。论文提出提取、抽象、审计、互操作和修改五个轨道，要求可执行交付物，并针对空提交、复制所给网表、硬编码公开测试设置对照，以区分有用的设计信息恢复与直接转录。

[v1 试点](https://arxiv.org/html/2611.30422v1)使用两个 Agent，在三个原创设计形成的四个种子任务上启动 148 次运行，其中 101 次有效；分别记录工具使用阶段、成本、拒绝执行及基础设施故障。部分拟议轨道尚未实例化，每个条件的有效运行较少，模型与执行框架的影响也未分离。对所测无密钥混淆未观察到显著影响，不能据此认定混淆普遍无效。应将其视为早期基准提案和试点，而非已完成的评测套件。
