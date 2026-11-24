# Website / 网站

React + Vite + TypeScript frontend for the shared bilingual catalog, with Tailwind CSS v4 and shadcn/ui components. See the [website guide](../docs/website.md) and [design system](../docs/design-system.md).

使用 React + Vite + TypeScript 展示同一份双语资源，采用 Tailwind CSS v4 与 shadcn/ui 组件，详见[网站指南](../docs/website.md)和[设计规范](../docs/design-system.md)。

## Development / 开发

Requires Node.js 24 and Python 3.10+. From this directory:

需要 Node.js 24 和 Python 3.10+；在本目录运行：

~~~sh
npm ci
npm run dev
~~~

Open http://localhost:5173/zh/ or http://localhost:5173/en/. The data export runs at startup. Run `npm run data` after editing resource Markdown while the development server is running.

打开 http://localhost:5173/zh/ 或 http://localhost:5173/en/。启动时自动导出数据；开发期间修改资源后，运行 `npm run data` 更新网站数据。

## Dependency audit / 依赖审计

Audit snapshot, 2026-11-24: `npm audit --omit=dev` reports no production dependency vulnerabilities. The full audit reports four moderate findings in development dependency chains through `shadcn` → `ts-morph` → `@ts-morph/common` → `minimatch`, including the [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249). `npm audit fix --dry-run` makes no changes; the suggested forced fix downgrades `shadcn` from 4.23.0 to 1.0.0 across major versions and has not been applied. The deployed website consists of static files, without a Vite development server or shadcn CLI.

2026-11-24 审计快照：`npm audit --omit=dev` 未发现生产依赖漏洞。完整审计有 4 个中危问题，位于 `shadcn` → `ts-morph` → `@ts-morph/common` → `minimatch` 开发依赖链，其中包括 [minimatch 告警](https://github.com/advisories/GHSA-g3hv-75wg-m249)。`npm audit fix --dry-run` 不产生改动；建议的强制修复会将 `shadcn` 从 4.23.0 跨主版本降级到 1.0.0，因此暂未采用。线上发布的是静态文件，不运行 Vite 开发服务器或 shadcn CLI。

## Production check / 生产构建检查

~~~sh
npm run build
npm test
npm run preview
~~~

The build exports resources, checks TypeScript, builds browser and rendering entries, and prerenders both languages to `dist/`. Production hosting requires no Node server.

构建导出资源、检查 TypeScript、构建浏览器和渲染入口，并将两种语言预渲染到 `dist/`。线上无需 Node 服务。

To verify repository subpath hosting / 验证仓库子路径：

~~~sh
SITE_BASE=/awesome-chip-agents/ SITE_URL=https://example.org/awesome-chip-agents/ npm run build
SITE_BASE=/awesome-chip-agents/ npm test
~~~

For analytics, copy `.env.example` to `.env.local`. Values prefixed with `VITE_` are public browser configuration; never include private API keys.

配置统计时，将 `.env.example` 复制为 `.env.local`。`VITE_` 变量会进入浏览器，请勿填写私密 API 密钥。
