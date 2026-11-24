# Introducing Frostbite: A new CPU architecture discovered, designed, and verified end-to-end by AI

<!-- metadata
{
  "id": "frostbite",
  "title": "Introducing Frostbite: A new CPU architecture discovered, designed, and verified end-to-end by AI",
  "name": "Architect Labs / Frostbite",
  "direction": "architecture-hls-codesign",
  "date": "2026-11-18",
  "date_basis": "source",
  "tags": ["architecture", "codesign", "multi-agent", "formal", "vendor-report"],
  "types": ["news"],
  "links": [
    {"label": "Architect Labs: Introducing Frostbite", "url": "https://architectlabs.com/blog/frostbite", "kind": "source"}
  ],
  "related": ["redwood"],
  "also_in": ["rtl-generation", "verification-debugging"],
  "summary": [
    "Reports agent-driven CPU and software co-design through final GDS; efficiency comparisons are developer-reported pre-silicon estimates.",
    "报告 Agent 驱动 CPU 与软件协同设计直至最终 GDS；能效比较为开发方报告的硅前估计。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-11-18
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** News / announcement / 新闻 / 公告
- **Direction / 方向：** Architecture, HLS and Hardware/Software Co-design / 架构探索、HLS 与软硬件协同设计
- **Tags / 标签：** [Architecture exploration / 架构探索](../tags/architecture.md) · [HW/SW co-design / 软硬件协同](../tags/codesign.md) · [Multi-agent / 多 Agent](../tags/multi-agent.md) · [Formal verification / 形式验证](../tags/formal.md) · [Vendor-reported / 厂商报告](../tags/vendor-report.md)

## Links / 相关链接

- **Source / 原始来源：** [Architect Labs: Introducing Frostbite](https://architectlabs.com/blog/frostbite)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。

## Related resources / 相关资源

- [Architect Labs / Redwood](../../resources/architecture-hls-codesign/redwood.md)
<!-- resource:end -->

## English

[Frostbite](https://architectlabs.com/blog/frostbite) is Architect Labs' reported interaction-net CPU design, developed by agent swarms across the compiler, ISA, RTL, verification, and physical implementation. The company describes a machine-checkable specification and a system model used to guide design iterations.

The company reports 4.59× geometric-mean performance per watt versus an unnamed dual-issue, in-order core over 25 workloads, including 15 held out for final evaluation. These are developer-reported pre-silicon estimates; the design has not been demonstrated in fabricated silicon.

## 简体中文

[Frostbite](https://architectlabs.com/blog/frostbite) 是 Architect Labs 报告的基于交互网的 CPU 设计，由多个 Agent 协同完成编译器、指令集、RTL、验证及物理实现。公司介绍了用于指导设计迭代的机器可检查规格和系统模型。

公司报告，在 25 个工作负载上，相对于未公开名称的双发射顺序执行核心，能效几何平均值达到 4.59 倍，其中 15 个负载留作最终评测。这些是开发方报告的硅前估计，设计尚未通过制造出的芯片验证。
