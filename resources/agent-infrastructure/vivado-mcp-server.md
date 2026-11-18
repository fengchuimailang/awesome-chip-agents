# Configuring the Vivado MCP Server

<!-- metadata
{
  "id": "vivado-mcp-server",
  "title": "Configuring the Vivado MCP Server",
  "name": "Vivado MCP Server",
  "direction": "agent-infrastructure",
  "date": "2026-09-25",
  "date_basis": "source",
  "tags": [
    "infrastructure",
    "tool-use",
    "eda-flow",
    "fpga",
    "commercial",
    "vendor-report"
  ],
  "types": [
    "platform"
  ],
  "links": [
    {
      "label": "AMD UG1400: Configuring the Vivado MCP Server",
      "url": "https://docs.amd.com/r/2026.1-English/ug1400-vitis-embedded/Configuring-the-Vivado-MCP-Server",
      "kind": "source"
    },
    {
      "label": "AMD UG1400: Extending AI with Vivado MCP",
      "url": "https://docs.amd.com/r/2026.1-English/ug1400-vitis-embedded/Extending-AI-with-Vivado-MCP",
      "kind": "source"
    }
  ],
  "related": [],
  "also_in": [],
  "summary": [
    "AMD's early-access Vivado MCP server connects the Vitis Unified IDE AI assistant to a local Vivado toolchain through MCP configuration.",
    "AMD 的 Vivado MCP 服务器目前处于抢先体验阶段，可通过 MCP 配置将 Vitis Unified IDE 的 AI 助手连接到本地 Vivado 工具链。"
  ]
}
-->

<!-- resource:start -->
[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)

- **Date / 日期：** 2026-09-25
- **Date basis / 日期依据：** Date recorded in the linked source / 日期沿用所链接来源的记录
- **Type / 类型：** Tool / platform / 工具 / 平台
- **Direction / 方向：** Agent Infrastructure and Overviews / Agent 基础设施与综述
- **Tags / 标签：** [Infrastructure / 基础设施](../tags/infrastructure.md) · [Tool use / 工具调用](../tags/tool-use.md) · [EDA workflows / EDA 流程](../tags/eda-flow.md) · [FPGA / FPGA](../tags/fpga.md) · [Commercial platform / 商业平台](../tags/commercial.md) · [Vendor-reported / 厂商报告](../tags/vendor-report.md)

## Links / 相关链接

- **Source / 原始来源：** [AMD UG1400: Configuring the Vivado MCP Server](https://docs.amd.com/r/2026.1-English/ug1400-vitis-embedded/Configuring-the-Vivado-MCP-Server)
- **Source / 原始来源：** [AMD UG1400: Extending AI with Vivado MCP](https://docs.amd.com/r/2026.1-English/ug1400-vitis-embedded/Extending-AI-with-Vivado-MCP)
- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。

**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。
<!-- resource:end -->

## English

[Vivado MCP Server](https://docs.amd.com/r/2026.1-English/ug1400-vitis-embedded/Configuring-the-Vivado-MCP-Server) is AMD's documented MCP integration for connecting the Vitis Unified IDE AI assistant to Vivado. The configuration uses a local command server, the `--stdio-bridge` argument, and `VIVADO_PATH` (with `DISPLAY` where needed) so the IDE can communicate with the local Vivado toolchain.

AMD describes Vivado MCP as an early-access feature. Access to the executable, version, package, and configuration guidance requires contacting an AMD field application engineer, so this record does not represent an open-source server or a generally downloadable implementation. The documented capabilities and availability are vendor-reported.

## 简体中文

[Vivado MCP Server](https://docs.amd.com/r/2026.1-English/ug1400-vitis-embedded/Configuring-the-Vivado-MCP-Server) 是 AMD 文档介绍的 MCP 集成，用于将 Vitis Unified IDE 的 AI 助手连接到 Vivado。配置使用本地命令服务器、`--stdio-bridge` 参数和 `VIVADO_PATH`（需要时还包括 `DISPLAY`），让 IDE 与本地 Vivado 工具链通信。

AMD 将 Vivado MCP 描述为抢先体验功能。可执行文件、版本、安装包和配置指导需要联系 AMD 现场应用工程师获取，因此本条不代表开源服务器或普遍可下载的实现。文档所述能力与可用性均为厂商报告。
