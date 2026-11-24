import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { defaults, filterQuery, findResources, inCollection, paginate, primarySources, readFilters, returnPath } from '../src/lib/catalog-state.ts';

const { resources, taxonomy } = JSON.parse(await readFile(new URL('../src/generated/catalog.json', import.meta.url), 'utf8'));

test('shared bilingual links round-trip search, filters, page and view; invalid values fall back', () => {
  const filters = { ...defaults, q: '波形 MCP + RTL', tag: 'waveform', sort: 'citations', collection: 'tools', evidence: 'code', page: 2, view: 'list' };
  assert.deepEqual(readFilters(filterQuery(filters), taxonomy), filters);
  for (const page of ['-1', '1.5', 'Infinity', '9007199254740992', '0']) {
    assert.equal(readFilters('?page=' + page, taxonomy).page, 1);
  }
  assert.deepEqual(readFilters('?direction=missing&type=missing&tag=toString&sort=unknown&view=missing&collection=missing&evidence=missing', taxonomy), defaults);
});

test('citation and star sorts distinguish missing counts from zero and retain old snapshots on error', () => {
  const fixture = (id, count, stars, date = '2026-01') => ({ ...resources[0], id, date,
    paper: { citation_count: count }, repositories: [{ stars }, { stars: 99999 }] });
  const items = [fixture('missing', undefined, undefined, '2026-11'), fixture('zero', 0, 0), fixture('popular', 5, 20),
    { ...fixture('stale', 10, 10), paper: { citation_count: 10, fetch_error: 'offline' } }];
  assert.deepEqual(findResources(items, { ...defaults, sort: 'citations' }, taxonomy).map(r => r.id), ['stale', 'popular', 'zero', 'missing']);
  assert.deepEqual(findResources(items, { ...defaults, sort: 'stars' }, taxonomy).map(r => r.id), ['popular', 'stale', 'zero', 'missing']);
  assert.deepEqual(findResources(items, { ...defaults, evidence: 'citations', sort: 'citations' }, taxonomy).map(r => r.id), ['stale', 'popular', 'zero']);
  const linked = findResources(resources, { ...defaults, evidence: 'code' }, taxonomy);
  assert.ok(linked.length > 0);
  assert.ok(linked.every(r => r.links.some(link => link.kind === 'repository')));
});

test('pages partition the catalog without losing or duplicating resources and clamp stale links', () => {
  const sorted = findResources(resources, defaults, taxonomy);
  const all = [];
  for (let page = 1; page <= Math.ceil(sorted.length / 24); page++) {
    const result = paginate(sorted, page);
    assert.ok(result.items.length <= 24);
    all.push(...result.items.map(r => r.id));
  }
  assert.deepEqual(all, sorted.map(r => r.id));
  assert.equal(new Set(all).size, resources.length);
  assert.equal(paginate(sorted, 999).page, Math.ceil(sorted.length / 24));
  assert.deepEqual(paginate([], 999), { page: 1, pages: 1, items: [] });
});

test('task shortcuts find relevant resources and tool collections exclude announcements', () => {
  const mcp = findResources(resources, { ...defaults, q: 'mcp', collection: 'tools' }, taxonomy);
  assert.ok(mcp.some(r => r.id === 'wavekit-mcp'));
  assert.ok(mcp.every(r => !r.types.some(type => ['news', 'video'].includes(type))));
  const benchmarks = resources.filter(r => inCollection(r, 'benchmarks'));
  assert.ok(benchmarks.length > 0);
  assert.ok(benchmarks.every(r => inCollection(r, 'research')));
  assert.ok(findResources(resources, { ...defaults, tag: 'waveform' }, taxonomy).length > 0);
  assert.ok(findResources(resources, { ...defaults, direction: 'rtl-generation', tag: 'generation' }, taxonomy).length > 0);
});

test('direction searches include cross-references and match all search words', () => {
  const cross = resources.find(r => r.also_in.length > 0);
  assert.ok(cross);
  assert.ok(findResources(resources, defaults, taxonomy, cross.also_in[0]).some(r => r.id === cross.id));
  assert.deepEqual(findResources(resources, { ...defaults, q: 'wavekit MCP' }, taxonomy).map(r => r.id), ['wavekit-mcp']);
  assert.deepEqual(findResources(resources, { ...defaults, q: 'wavekit no-such-keyword-92347' }, taxonomy), []);
});

test('source shortcuts preserve recorded URLs and deduplicate repeated source kinds', () => {
  const links = [
    { kind: 'source', url: 'https://example.org', label: 'Official' },
    { kind: 'source', url: 'https://example.org/release', label: 'Release' },
    { kind: 'repository', url: 'https://github.com/a/b', label: 'Code' },
    { kind: 'paper', url: 'https://example.org', label: 'Same URL' },
  ];
  const selected = primarySources(links);
  assert.equal(selected[0].kind, 'repository');
  assert.equal(new Set(selected.map(link => link.url)).size, selected.length);
  assert.ok(selected.every(link => links.includes(link)));
  assert.deepEqual(primarySources([]), []);
  for (const r of resources) assert.ok(primarySources(r.links).every(link => r.links.includes(link)));
});

test('detail return links stay within catalog routes and translate locale without losing query', () => {
  const base = '/awesome-chip-agents/';
  const url = base + 'zh/catalog/?q=MCP&view=list&page=2';
  const directions = Object.keys(taxonomy.directions);
  assert.equal(returnPath(url, base, directions), url);
  assert.equal(returnPath(url, base, directions, 'en'), url.replace('/zh/', '/en/'));
  assert.equal(returnPath(base + 'zh/directions/rtl-generation/?tag=generation', base, directions), base + 'zh/directions/rtl-generation/?tag=generation');
  for (const invalid of ['https://example.org', '//example.org', base + 'zh/catalog/../../other/', base + 'zh/resources/wavekit-mcp/', base + 'zh/directions/unknown/', base + 'zh/catalog/\\evil', base + 'zh/catalog/#x']) {
    assert.equal(returnPath(invalid, base, directions), undefined);
  }
  assert.equal(returnPath('//evil.test/en/catalog/', '/', directions), undefined);
});
