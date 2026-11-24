import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { metricWidth, profileScales, resourceProfile } from '../src/lib/resource-profile.ts';

const { resources } = JSON.parse(await readFile(new URL('../src/generated/catalog.json', import.meta.url), 'utf8'));
const fixture = changes => ({ ...resources[0], links: [], repositories: [], paper: { doi: null }, ...changes });
const code = { kind: 'repository', url: 'https://github.com/example/tool', label: 'Code' };
const paper = { kind: 'paper', url: 'https://arxiv.org/abs/2311.04887', label: 'Paper' };

test('bar scales preserve measured zero, reject unavailable counts, and compress large differences', () => {
  assert.equal(metricWidth(0, 1000), 0);
  for (const missing of [undefined, null, -1, NaN, Infinity, 0.5]) assert.equal(metricWidth(missing, 1000), undefined);
  assert.equal(metricWidth(1000, 1000), 100);
  assert.equal(metricWidth(2000, 1000), 100);
  assert.equal(metricWidth(0, 0), 0);
  assert.ok(metricWidth(10, 1000) > 10);
  assert.ok(metricWidth(10, 1000) < metricWidth(100, 1000));
});

test('catalog references use the same primary repository as sorting and stay fixed across filtered results', () => {
  const items = [fixture({ repositories: [{ stars: 10 }, { stars: 999999 }], paper: { citation_count: 5 } }),
    fixture({ repositories: [{ stars: 1000 }], paper: { citation_count: 50 } })];
  const scales = profileScales(items);
  assert.deepEqual(scales, { stars: 1000, citations: 50 });
  const item = { ...items[0], links: [code, paper] };
  const before = resourceProfile(item, scales);
  const filtered = [item].map(resource => resourceProfile(resource, scales));
  assert.deepEqual(filtered[0], before);
  assert.deepEqual(profileScales([]), { stars: 0, citations: 0 });
});

test('profiles select applicable evidence and retain failed snapshots without claiming maintenance or code verification', () => {
  const scales = { stars: 100, citations: 10 };
  assert.equal(resourceProfile(fixture({}), scales), null);
  const tool = resourceProfile(fixture({ links: [code], repositories: [{ stars: 0, archived: true, fetch_error: 'offline', fetched_at: '2026-11-20T00:00:00Z' }] }), scales);
  assert.deepEqual(tool.metrics.map(m => m.kind), ['stars']);
  assert.equal(tool.metrics[0].value, 0);
  assert.equal(tool.metrics[0].width, 0);
  assert.equal(tool.metrics[0].refreshFailed, true);
  assert.equal(tool.metrics[0].fetchedAt, '2026-11-20T00:00:00Z');
  assert.equal(tool.archived, true);
  assert.equal(tool.pushedAt, undefined);
  const missing = resourceProfile(fixture({ links: [code, paper] }), scales);
  assert.deepEqual(missing.metrics.map(m => m.value), [undefined, undefined]);
  const paperOnly = resourceProfile(fixture({ links: [paper], paper: { citation_count: 0 } }), scales);
  assert.deepEqual(paperOnly.metrics.map(m => m.kind), ['citations']);
  assert.equal(paperOnly.code, false);
  const otherHost = resourceProfile(fixture({ links: [{ ...code, url: 'https://gitlab.com/example/tool' }] }), scales);
  assert.equal(otherHost.code, true);
  assert.deepEqual(otherHost.metrics, []);
});

test('real catalog profiles provide finite widths and retain recorded counts and provenance', () => {
  const scales = profileScales(resources);
  for (const resource of resources) {
    const profile = resourceProfile(resource, scales);
    if (!profile) continue;
    for (const metric of profile.metrics) {
      const snapshot = metric.kind === 'stars' ? resource.repositories[0] : resource.paper;
      if (metric.value !== undefined) {
        assert.ok(Number.isFinite(metric.width) && metric.width >= 0 && metric.width <= 100, resource.id);
        assert.equal(metric.value, metric.kind === 'stars' ? snapshot.stars : snapshot.citation_count);
        assert.equal(metric.fetchedAt, snapshot.fetched_at);
      } else assert.equal(metric.width, undefined);
    }
  }
});
