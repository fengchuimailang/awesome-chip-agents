export type EntityKind = 'resource' | 'person' | 'organization' | 'repository' | 'topic' | 'method';
export type RelationKind = 'IN_TOPIC' | 'USES_METHOD' | 'AUTHOR_OF' | 'AFFILIATED_WITH' | 'HAS_REPOSITORY' | 'OWNED_BY' | 'EXTENDS' | 'EVALUATED_ON' | 'COMPARES_WITH' | 'RELATED_TO';
export type Evidence = { url: string; locator: string; kind: 'catalog' | 'primary'; retrieved_at: string | null };
export type GraphNode = {
  id: string; kind: EntityKind; label: [string, string]; date: string | null;
  date_precision: 'unknown' | 'year' | 'month' | 'day'; recorded_at: string | null;
  attributes: { resource_id?: string; title?: string; summary?: [string, string]; types?: string[];
    direction?: string; also_in?: string[]; github_owner?: string; url?: string; github?: string;
    identity_scope?: string; organization_kind?: string; [key: string]: unknown };
  evidence: Evidence[];
};
export type GraphEdge = { id: string; kind: RelationKind; source: string; target: string;
  date: string | null; end_date: string | null; date_precision: GraphNode['date_precision'];
  recorded_at: string | null; attributes: Record<string, unknown>; evidence: Evidence[] };
export type KnowledgeGraph = { schema_version: number; entity_types: EntityKind[]; relation_types: RelationKind[]; nodes: GraphNode[]; edges: GraphEdge[] };
export type GraphFilters = { q: string; direction: string; layers: EntityKind[]; relations: RelationKind[];
  mode: 'cumulative' | 'window' | 'compare'; from: string; to: string; uncertain: boolean; selected: string };
export type TemporalState = 'existing' | 'added' | 'removed' | 'context';
export type GraphView = { nodes: GraphNode[]; edges: GraphEdge[]; status: Record<string, TemporalState>; uncertain: number };

export const entityLabels: Record<EntityKind, [string, string]> = {
  resource: ['Resources', '资源'], person: ['People', '人物'], organization: ['Organizations', '机构'],
  repository: ['Repositories', '仓库'], topic: ['Topics', '方向'], method: ['Methods', '方法'],
};
export const relationLabels: Record<RelationKind, [string, string]> = {
  IN_TOPIC: ['In topic', '属于方向'], USES_METHOD: ['Uses method', '采用方法'], AUTHOR_OF: ['Author of', '作者'],
  AFFILIATED_WITH: ['Affiliation in paper', '论文署名机构'], HAS_REPOSITORY: ['Has repository', '关联仓库'],
  OWNED_BY: ['Owned by', '仓库归属'], EXTENDS: ['Extends', '扩展工作'], EVALUATED_ON: ['Evaluated on', '评测于'],
  COMPARES_WITH: ['Compares with', '实验对比'], RELATED_TO: ['Related to', '编辑关联'],
};
export const entityColors: Record<EntityKind, string> = {
  resource: '#17634c', person: '#2871b5', organization: '#13858a', repository: '#7956b5', topic: '#637969', method: '#ab721b',
};
export const relationColors: Record<RelationKind, string> = {
  IN_TOPIC: '#637969', USES_METHOD: '#ab721b', AUTHOR_OF: '#2871b5', AFFILIATED_WITH: '#13858a',
  HAS_REPOSITORY: '#7956b5', OWNED_BY: '#a4458b', EXTENDS: '#be593b', EVALUATED_ON: '#397f38',
  COMPARES_WITH: '#5559ac', RELATED_TO: '#7b6b59',
};

export function graphMonths(graph: KnowledgeGraph): string[] {
  const dates = graph.nodes.filter(n => n.kind === 'resource' && n.date).map(n => n.date!);
  const months = dates.filter(d => d.length >= 7).map(d => d.slice(0, 7)).sort();
  const firstYear = dates.map(d => d.slice(0, 4)).sort()[0];
  const first = firstYear && (!months[0] || firstYear < months[0].slice(0, 4)) ? firstYear + '-01' : months[0] || firstYear + '-01';
  const lastYear = dates.map(d => d.slice(0, 4)).sort().at(-1);
  const last = lastYear && (!months.at(-1) || lastYear > months.at(-1)!.slice(0, 4)) ? lastYear + '-12' : months.at(-1) || (lastYear ? lastYear + '-12' : first);
  if (!/^\d{4}-\d{2}$/.test(first)) return ['2026-01'];
  const result: string[] = [];
  let [year, month] = first.split('-').map(Number);
  for (let i = 0; i < 1200; i++) {
    const value = `${year}-${String(month).padStart(2, '0')}`;
    result.push(value);
    if (value >= last) break;
    if (++month > 12) { month = 1; year++; }
  }
  return result;
}

export function graphDefaults(graph: KnowledgeGraph): GraphFilters {
  const months = graphMonths(graph);
  return { q: '', direction: '', layers: ['resource', 'repository', 'topic'], relations: [...graph.relation_types],
    mode: 'cumulative', from: months[Math.max(0, months.length - 3)], to: months.at(-1)!, uncertain: true, selected: '' };
}

export function readGraphFilters(query: string, graph: KnowledgeGraph, directions: string[]): GraphFilters {
  const defaults = graphDefaults(graph), params = new URLSearchParams(query), months = graphMonths(graph);
  const valid = (key: string) => { const value = params.get(key) || ''; return months.includes(value) ? value : defaults[key as 'from' | 'to']; };
  const layers = params.has('layers') ? (params.get('layers') || '').split(',').filter(k => graph.entity_types.includes(k as EntityKind)) as EntityKind[] : defaults.layers;
  const relations = params.has('relations') ? (params.get('relations') || '').split(',').filter(k => graph.relation_types.includes(k as RelationKind)) as RelationKind[] : defaults.relations;
  const from = valid('from'), to = valid('to');
  return { ...defaults, q: (params.get('q') || '').slice(0, 200), direction: directions.includes(params.get('direction') || '') ? params.get('direction')! : '',
    layers: [...new Set<EntityKind>(['resource', ...layers])], relations: [...new Set(relations)],
    mode: ['window', 'compare'].includes(params.get('mode') || '') ? params.get('mode') as 'window' | 'compare' : 'cumulative',
    from: from > to ? to : from, to, uncertain: params.get('uncertain') !== '0',
    selected: [...graph.nodes, ...graph.edges].some(n => n.id === params.get('selected')) ? params.get('selected')! : '' };
}

export function graphQuery(filters: GraphFilters): string {
  const params = new URLSearchParams();
  for (const key of ['q', 'direction', 'mode', 'from', 'to', 'selected'] as const) if (filters[key]) params.set(key, filters[key]);
  params.set('layers', filters.layers.join(','));
  params.set('relations', filters.relations.join(','));
  params.set('uncertain', filters.uncertain ? '1' : '0');
  return '?' + params;
}

function bounds(date: string): [string, string] {
  return date.length === 4 ? [date + '-01', date + '-12'] : [date.slice(0, 7), date.slice(0, 7)];
}

function temporal(date: string | null, filters: GraphFilters): TemporalState | null {
  if (!date) return filters.uncertain ? 'context' : null;
  const [lo, hi] = bounds(date);
  if (lo > filters.to || filters.mode === 'window' && hi < filters.from) return null;
  if (hi > filters.to || filters.mode === 'window' && lo < filters.from) return filters.uncertain ? 'context' : null;
  if (filters.mode === 'compare' && lo <= filters.from && hi > filters.from) return filters.uncertain ? 'context' : null;
  return filters.mode === 'compare' && lo > filters.from ? 'added' : 'existing';
}

export function selectGraph(graph: KnowledgeGraph, filters: GraphFilters): GraphView {
  const all = new Map(graph.nodes.map(n => [n.id, n]));
  const status: Record<string, TemporalState> = {};
  const nodes = new Map<string, GraphNode>();
  const words = filters.q.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const names = new Map(graph.nodes.map(n => [n.id, n.id + ' ' + n.label.join(' ') + ' ' + (n.attributes.github_owner || '')]));
  const context = new Map<string, string[]>();
  for (const edge of graph.edges) {
    for (const [id, other] of [[edge.source, edge.target], [edge.target, edge.source]]) {
      const items = context.get(id) || [];
      if (all.get(other)?.kind !== 'resource') items.push(names.get(other) || '');
      context.set(id, items);
    }
  }
  for (const node of graph.nodes) {
    if (node.kind !== 'resource') continue;
    const when = temporal(node.date, filters);
    if (!when || filters.direction && node.attributes.direction !== filters.direction && !node.attributes.also_in?.includes(filters.direction)) continue;
    const searchable = [names.get(node.id), node.attributes.title, node.attributes.summary?.join(' '), ...context.get(node.id) || []].join(' ').toLocaleLowerCase();
    if (!words.every(word => searchable.includes(word))) continue;
    nodes.set(node.id, node); status[node.id] = when;
  }
  const eligible = graph.edges.filter(edge => {
    if (!filters.relations.includes(edge.kind)) return false;
    if (edge.attributes.resource && !nodes.has(String(edge.attributes.resource))) return false;
    // Never pull an excluded resource back in through a context node.
    if ([edge.source, edge.target].some(id => all.get(id)?.kind === 'resource' && !nodes.has(id))) return false;
    if ([edge.source, edge.target].some(id => !filters.layers.includes(all.get(id)!.kind))) return false;
    if (!edge.date) { status[edge.id] = 'context'; return true; }
    const when = temporal(edge.date, { ...filters, mode: filters.mode === 'window' ? 'cumulative' : filters.mode });
    if (!when) return false;
    if (edge.end_date && edge.end_date.slice(0, 7) <= filters.to) {
      if (filters.mode !== 'compare' || edge.end_date.slice(0, 7) <= filters.from) return false;
      status[edge.id] = 'removed'; return true;
    }
    status[edge.id] = when; return true;
  });
  // Two hops add authors -> affiliation and repositories -> owner, without unrelated islands.
  for (let hop = 0; hop < 2; hop++) {
    const additions = new Set<string>();
    for (const edge of eligible) if (nodes.has(edge.source) || nodes.has(edge.target)) {
      additions.add(edge.source); additions.add(edge.target);
    }
    for (const id of additions) if (!nodes.has(id)) { nodes.set(id, all.get(id)!); status[id] = 'context'; }
  }
  const edges = eligible.filter(e => nodes.has(e.source) && nodes.has(e.target));
  return { nodes: [...nodes.values()], edges, status,
    uncertain: [...nodes.values()].filter(n => n.kind === 'resource' && status[n.id] === 'context').length };
}
