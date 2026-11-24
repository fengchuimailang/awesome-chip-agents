import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const data = JSON.parse(await readFile('src/generated/catalog.json', 'utf8'));
const base = process.env.SITE_BASE || '/';
const socialImage = 'social-preview.png';
await access(join('dist', socialImage));
let count = 0;
for (const locale of ['en', 'zh']) {
  const catalogHtml = await readFile(join('dist', locale, 'catalog', 'index.html'), 'utf8');
  assert.equal([...catalogHtml.matchAll(/role="article"/g)].length, data.resources.length, locale + ': no-JavaScript catalog must include every resource');
  const homeHtml = await readFile(join('dist', locale, 'index.html'), 'utf8');
  assert.ok(homeHtml.includes('?q=mcp&amp;collection=tools'), locale + ': MCP shortcut missing');
  assert.ok(homeHtml.includes('good%20first%20issue'), locale + ': first contribution link missing');
  for (const path of data.reading_paths) {
    assert.ok(homeHtml.includes('id="' + path.id + '"'), locale + ': reading path missing');
    for (const step of path.steps) assert.ok(homeHtml.includes(base + locale + '/resources/' + step.resource + '/'), locale + ': reading step missing');
  }
  for (const resource of data.resources) {
    const path = join('dist', locale, 'resources', resource.id, 'index.html');
    const html = await readFile(path, 'utf8');
    assert.ok(html.includes('id="page-data"'), path + ': hydration data missing');
    assert.ok(html.includes('property="og:image"') && html.includes('name="twitter:card" content="summary_large_image"'), path + ': social preview metadata missing');
    assert.ok(html.includes(resource.name.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;')), path + ': resource not rendered');
    assert.ok(!html.includes('<!--app-html-->'), path + ': unrendered page');
    assert.ok(!html.includes('<!-- metadata'), path + ': editorial metadata leaked');
    assert.ok(html.includes('class="detail-actions"'), path + ': primary source and share actions missing');
    if (resource.paper.citation_count !== undefined) {
      assert.ok(html.includes(resource.paper.url) && html.includes(resource.paper.fetched_at), path + ': citation provenance missing');
    }
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1].split(/[?#]/)[0];
      if (href.startsWith(base) && !href.startsWith('//')) {
        await access(join('dist', href.slice(base.length), href.endsWith('/') ? 'index.html' : ''));
      }
    }
    count++;
  }
}
await access('dist/404.html');
await access('dist/octicons-license.txt');
console.log('Verified ' + count + ' resource pages, hydration data, and internal links.');
