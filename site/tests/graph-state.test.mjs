import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { graphDefaults, graphMonths, graphQuery, readGraphFilters, selectGraph } from '../src/lib/graph-state.ts';

const graph = JSON.parse(await readFile(new URL('../src/generated/graph.json', import.meta.url), 'utf8'));
const defaults = graphDefaults(graph);
const nodes = (id, date, kind = 'resource') => ({ id, kind, date, label: [id, id], attributes: {}, evidence: [] });
const links = (id, source, target, date = null, end_date = null) => ({ id, source, target, kind: 'RELATED_TO', date, end_date, attributes: {}, evidence: [] });
const fixture = { ...graph, nodes: [nodes('old', '2025-11'), nodes('new', '2026-11-23'), nodes('year', '2026'), nodes('unknown', null), nodes('repo', null, 'repository')],
  edges: [links('dated', 'old', 'new', '2026-11-23'), links('context', 'new', 'repo'), links('ended', 'old', 'repo', '2025-11-01', '2026-11-03')] };

test('timeline includes a later year-only publication without inventing its month', () => {
  const months = graphMonths({ ...fixture, nodes: [nodes('old', '2025-11'), nodes('year', '2027')] });
  assert.equal(months[0], '2025-11');
  assert.equal(months.at(-1), '2027-12');
  const view = selectGraph({ ...fixture, nodes: [nodes('old', '2025-11'), nodes('year', '2027')], edges: [] },
    { ...defaults, mode: 'compare', from: '2026-12', to: '2027-01', uncertain: true });
  assert.equal(view.status.year, 'context');
});

test('graph views round-trip through bilingual share URLs and reject invalid selections and dates', () => {
  const filters = { ...defaults, q: 'RAG + 波形', layers: [...graph.entity_types], relations: [], mode: 'compare', selected: graph.nodes[0].id, uncertain: false };
  assert.deepEqual(readGraphFilters(graphQuery(filters), graph, []), filters);
  const invalid = readGraphFilters('?from=bad&to=2099-01&layers=unknown&relations=made-up&mode=unknown&selected=missing', graph, []);
  assert.equal(invalid.from, defaults.from);
  assert.equal(invalid.to, defaults.to);
  assert.equal(invalid.selected, '');
  assert.deepEqual(invalid.layers, ['resource']);
  assert.deepEqual(invalid.relations, []);
});

test('comparison distinguishes additions, ended relations and undated context without inventing year precision', () => {
  const view = selectGraph(fixture, { ...defaults, mode: 'compare', from: '2026-10', to: '2026-11', uncertain: true });
  assert.equal(view.status.old, 'existing');
  assert.equal(view.status.new, 'added');
  assert.equal(view.status.year, 'context');
  assert.equal(view.status.unknown, 'context');
  assert.equal(view.status.dated, 'added');
  assert.equal(view.status.context, 'context');
  assert.equal(view.status.ended, 'removed');
  const strict = selectGraph(fixture, { ...defaults, mode: 'window', from: '2026-11', to: '2026-11', uncertain: false });
  assert.deepEqual(strict.nodes.filter(n => n.kind === 'resource').map(n => n.id), ['new']);
  assert.ok(strict.edges.every(e => e.id !== 'dated')); // No dangling endpoint outside the time window.
  assert.ok(!selectGraph(fixture, { ...defaults, to: '2026-11' }).edges.some(e => e.id === 'ended'));
});

test('direction and layer filters keep every edge endpoint and never restore excluded resources via context', () => {
  const direction = graph.nodes.find(n => n.kind === 'resource').attributes.direction;
  const view = selectGraph(graph, { ...defaults, direction, layers: [...graph.entity_types] });
  const ids = new Set(view.nodes.map(n => n.id));
  assert.ok(view.nodes.filter(n => n.kind === 'resource').every(n => n.attributes.direction === direction || n.attributes.also_in.includes(direction)));
  assert.ok(view.edges.every(e => ids.has(e.source) && ids.has(e.target)));
  const resources = selectGraph(graph, { ...defaults, layers: ['resource'] });
  assert.ok(resources.nodes.every(n => n.kind === 'resource'));
  assert.ok(resources.edges.every(e => e.kind === 'RELATED_TO' || e.kind === 'EVALUATED_ON'));
});

test('search finds recorded authors, methods and owners; a related work is not a search hit', () => {
  const search = q => selectGraph(graph, { ...defaults, q, layers: [...graph.entity_types] }).nodes.filter(n => n.kind === 'resource');
  assert.ok(search('RAG').some(n => n.id === 'resource:rtlfixer'));
  assert.deepEqual(search('RTLFixer').map(n => n.id), ['resource:rtlfixer']);
  assert.ok(search('NVlabs').some(n => n.id === 'resource:verilogcoder'));
  const author = graph.nodes.find(n => n.kind === 'person');
  assert.ok(search(author.label[0]).some(n => n.id === author.attributes.identity_scope));
});
