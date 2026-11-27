import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
import { catalog, label, route, text, type Page } from './model';

export const pages: Page[] = (['en', 'zh'] as const).flatMap(locale => [
  { locale, kind: 'home' as const }, { locale, kind: 'catalog' as const }, { locale, kind: 'metrics' as const },
  { locale, kind: 'graph' as const },
  ...Object.keys(catalog.taxonomy.directions).map(id => ({ locale, kind: 'direction' as const, id })),
  ...catalog.resources.map(resource => ({ locale, kind: 'resource' as const, id: resource.id })),
]);
export { route };

export async function render(page: Page) {
  const resource = page.kind === 'resource' ? catalog.resources.find(resource => resource.id === page.id) : undefined;
  const title = resource?.name || (page.kind === 'direction' ? label(catalog.taxonomy.directions[page.id!], page.locale) :
    text(page.locale, page.kind === 'graph' ? 'Progress graph' : page.kind === 'metrics' ? 'Metrics' : 'Resources for chip design agents', page.kind === 'graph' ? '进展图谱' : page.kind === 'metrics' ? '数据与统计' : '芯片设计 Agent 资源库'));
  const html = await new Promise<string>((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on('data', chunk => chunks.push(Buffer.from(chunk)));
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    output.on('error', reject);
    const stream = renderToPipeableStream(<App page={page} />, {
      onAllReady() { stream.pipe(output); },
      onShellError: reject,
      onError: reject,
    });
  });
  return {
    html, path: route(page),
    title: title + ' · Awesome Chip Agents',
    description: resource ? label(resource.summary, page.locale) : text(page.locale,
      'Explore papers, tools, benchmarks, and infrastructure for LLM agents in chip design.',
      '探索芯片设计 LLM Agent 的论文、工具、评测基准与基础设施。'),
  };
}
