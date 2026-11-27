import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowRightIcon, PauseIcon, PlayIcon, Share2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { GraphCanvas } from '@/components/GraphCanvas';
import { External } from '@/components/resource';
import { catalog, label, route, text, type Locale } from '@/model';
import rawGraph from '@/generated/graph.json';
import { entityColors, entityLabels, graphDefaults, graphMonths, graphQuery, readGraphFilters, relationColors,
  relationLabels, selectGraph, type EntityKind, type GraphFilters, type GraphNode, type KnowledgeGraph, type TemporalState } from '@/lib/graph-state';

const graph = rawGraph as KnowledgeGraph;
const byId = new Map(graph.nodes.map(node => [node.id, node]));
const months = graphMonths(graph);
const presets: Record<string, EntityKind[]> = {
  resources: ['resource', 'repository', 'topic'], people: ['resource', 'person', 'organization', 'repository'],
  methods: ['resource', 'method', 'topic'], all: [...graph.entity_types],
};
const swatch = (color: string) => ({ '--graph-color': color } as CSSProperties);

export default function GraphPage({ locale }: { locale: Locale }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  const [filters, setFilters] = useState(() => graphDefaults(graph));
  const filterRef = useRef(filters);
  const [playing, setPlaying] = useState(false);
  const [share, setShare] = useState('');
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);
  const view = useMemo(() => selectGraph(graph, filters), [filters]);
  const node = byId.get(filters.selected);
  const edge = graph.edges.find(edge => edge.id === filters.selected);
  const selected = node || edge;
  const visibleSelection = view.nodes.some(n => n.id === filters.selected) || view.edges.some(e => e.id === filters.selected);
  const relations = view.edges.filter(e => e.source === filters.selected || e.target === filters.selected);
  const latest = [...view.nodes].filter(n => n.kind === 'resource').sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.id.localeCompare(b.id));
  const others = view.nodes.filter(n => n.kind !== 'resource');
  const preset = Object.keys(presets).find(key => presets[key].length === filters.layers.length && presets[key].every(kind => filters.layers.includes(kind))) || '';
  const statusLabel = (state: TemporalState) => ({ existing: l('Existing', '已有'), added: l('Added', '新增'), removed: l('Ended', '已结束'), context: l('Context / uncertain date', '背景／日期不确定') })[state];
  const datePrecision = (value: GraphNode['date_precision']) => ({ day: l('Day precision', '精确到日'), month: l('Month precision', '精确到月'), year: l('Year only', '仅年份'), unknown: l('Unknown precision', '精度未知') })[value];

  useEffect(() => {
    const load = () => { const next = readGraphFilters(location.search, graph, Object.keys(catalog.taxonomy.directions)); filterRef.current = next; setFilters(next); setPlaying(false); };
    load(); window.addEventListener('popstate', load);
    return () => window.removeEventListener('popstate', load);
  }, []);

  function update(patch: Partial<GraphFilters>) {
    setShare('');
    const next = { ...filterRef.current, ...patch };
    if (next.from > next.to) {
      if (patch.from) next.to = next.from; else next.from = next.to;
    }
    filterRef.current = next;
    setFilters(next);
    history.replaceState(null, '', location.pathname + graphQuery(next));
    window.dispatchEvent(new Event('catalog-url-change'));
  }
  useEffect(() => {
    if (!playing) return;
    if (months.indexOf(filters.to) >= months.length - 1) { setPlaying(false); return; }
    const timer = window.setTimeout(() => update({ to: months[months.indexOf(filters.to) + 1] }), 1400);
    return () => window.clearTimeout(timer);
  }, [playing, filters.to]);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === workspaceRef.current);
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setFallbackFullscreen(false);
      if (document.fullscreenElement === workspaceRef.current) void document.exitFullscreen().catch(() => {});
    };
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('fullscreenchange', sync); document.removeEventListener('keydown', escape); };
  }, []);
  async function toggleFullscreen() {
    if (fallbackFullscreen) { setFallbackFullscreen(false); return; }
    if (document.fullscreenElement === workspaceRef.current) { await document.exitFullscreen(); return; }
    try {
      if (!workspaceRef.current?.requestFullscreen) throw new Error('Fullscreen unavailable');
      await workspaceRef.current.requestFullscreen();
    } catch { setFallbackFullscreen(true); }
  }
  const expanded = fullscreen || fallbackFullscreen;
  const togglePlayback = () => {
    if (!playing && filters.to === months.at(-1)) update({ to: filters.mode === 'cumulative' ? months[0] : filters.from });
    setPlaying(value => !value);
  };
  const select = (id: string) => update({ selected: id });
  const resourceLink = (n: GraphNode) => n.attributes.resource_id ? route({ locale, kind: 'resource', id: n.attributes.resource_id }) : undefined;
  const entityButton = (n: GraphNode) => <Button variant="ghost" className="graph-list-button" aria-pressed={filters.selected === n.id} onClick={() => select(n.id)}>
    <i className="graph-dot" style={swatch(entityColors[n.kind])} aria-hidden="true" /><span>{label(n.label, locale)}</span><small>{n.kind === 'resource' ? n.date || l('Undated', '日期未知') : label(entityLabels[n.kind], locale)}</small>
    {view.status[n.id] === 'added' && <span className="graph-change">+ {l('New', '新增')}</span>}
  </Button>;

  return <section className="graph-section">
    <div className="section-heading"><div><p className="eyebrow">{l('CONNECTED PROGRESS', '连接进展与线索')}</p><h1>{l('Progress graph', '进展图谱')}</h1></div>
      <Button variant="outline" onClick={async () => {
        const url = location.origin + location.pathname + graphQuery(filters);
        try { await navigator.clipboard.writeText(url); setShare(l('Link copied.', '链接已复制。')); }
        catch { setShare(url); }
      }}><Share2Icon data-icon="inline-start" />{l('Share this view', '分享当前视图')}</Button>
    </div>
    <p className="graph-intro">{l('Follow research over time and inspect the evidence connecting works, code, people, and methods.', '沿时间追踪研究，查看工作、代码、人物和方法之间的关联依据。')}</p>
    {share && <p className="graph-share" role="status">{share}</p>}
    <div ref={workspaceRef} className={"graph-explorer" + (expanded ? " graph-explorer-fullscreen" : "")}><Card className="graph-filters" size="sm"><CardContent>
      <FieldGroup className="graph-search-fields"><Field><FieldLabel htmlFor="graph-search">{l('Search works, authors, methods or owners', '搜索工作、作者、方法或 owner')}</FieldLabel><Input id="graph-search" type="search" value={filters.q} placeholder={l('e.g. RTLFixer, NVlabs, RAG', '例如 RTLFixer、NVlabs、RAG')} onChange={e => update({ q: e.target.value })} /></Field>
        <Field><FieldLabel htmlFor="graph-direction">{l('Direction', '方向')}</FieldLabel><NativeSelect id="graph-direction" value={filters.direction} onChange={e => update({ direction: e.target.value })}><NativeSelectOption value="">{l('All directions', '全部方向')}</NativeSelectOption>{Object.entries(catalog.taxonomy.directions).map(([id, pair]) => <NativeSelectOption key={id} value={id}>{label(pair, locale)}</NativeSelectOption>)}</NativeSelect></Field>
      </FieldGroup>
      <div className="graph-basic-time"><label htmlFor="graph-range">{l('Through', '截至')} <strong>{filters.to}</strong></label>
        <Button variant="outline" size="icon" title={playing ? l('Pause', '暂停') : l('Play months', '按月播放')} aria-label={playing ? l('Pause', '暂停') : l('Play months', '按月播放')} onClick={togglePlayback}>{playing ? <PauseIcon /> : <PlayIcon />}</Button>
        <input id="graph-range" type="range" min="0" max={months.length - 1} value={months.indexOf(filters.to)} aria-valuetext={filters.to} onChange={e => { setPlaying(false); update({ to: months[Number(e.target.value)] }); }} />
      </div>
      <details className="graph-advanced"><summary>{l('Advanced filters & legend', '高级筛选与图例')}</summary>
      <div className="graph-advanced-content"><div className="graph-preset-row"><span>{l('Quick views', '快捷视图')}</span><ToggleGroup type="single" variant="outline" value={preset} onValueChange={key => { if (key) update({ layers: presets[key] }); }} aria-label={l('Quick views', '快捷视图')}>
        {Object.entries({ resources: l('Resources & code', '资源与代码'), people: l('People & owners', '人物与归属'), methods: l('Methods & topics', '方法与方向'), all: l('All layers', '全部图层') }).map(([key, name]) => <ToggleGroupItem key={key} value={key}>{name}</ToggleGroupItem>)}
      </ToggleGroup></div>
      <div className="graph-layer-row"><span>{l('Entity legend / layers', '实体图例／图层')}</span><ToggleGroup type="multiple" variant="outline" value={filters.layers} onValueChange={values => update({ layers: [...new Set<EntityKind>(['resource', ...values as EntityKind[]])] })} aria-label={l('Entity layers', '实体图层')}>
        {graph.entity_types.map(kind => <ToggleGroupItem key={kind} value={kind} disabled={kind === 'resource'}><i className="graph-dot" style={swatch(entityColors[kind])} aria-hidden="true" />{label(entityLabels[kind], locale)} <small>{graph.nodes.filter(n => n.kind === kind).length}</small></ToggleGroupItem>)}
      </ToggleGroup></div>
      <details className="graph-relation-legend"><summary>{l('Relation legend and filters', '关系图例与筛选')} · {filters.relations.length}/{graph.relation_types.length}</summary><div className="graph-relation-options">
        {graph.relation_types.map(kind => <label key={kind}><input type="checkbox" checked={filters.relations.includes(kind)} onChange={e => update({ relations: e.target.checked ? [...filters.relations, kind] : filters.relations.filter(k => k !== kind) })} /><i className="graph-line" style={swatch(relationColors[kind])} aria-hidden="true" />{label(relationLabels[kind], locale)} <small>{graph.edges.filter(e => e.kind === kind).length}</small></label>)}
      </div></details>
      <div className="graph-advanced-time"><strong>{l('Time mode', '时间模式')}</strong>
      <div className="graph-time-modes"><ToggleGroup type="single" variant="outline" value={filters.mode} onValueChange={value => { if (value) { setPlaying(false); update({ mode: value as GraphFilters['mode'] }); } }} aria-label={l('Time mode', '时间模式')}>
        <ToggleGroupItem value="cumulative">{l('Cumulative', '累计')}</ToggleGroupItem><ToggleGroupItem value="window">{l('Window', '时间窗口')}</ToggleGroupItem><ToggleGroupItem value="compare">{l('Compare', '快照对比')}</ToggleGroupItem>
      </ToggleGroup></div>
      <FieldGroup className="graph-date-fields">{filters.mode !== 'cumulative' && <Field><FieldLabel htmlFor="graph-from">{filters.mode === 'compare' ? l('Baseline month', '基准月份') : l('From month', '起始月份')}</FieldLabel><NativeSelect id="graph-from" value={filters.from} onChange={e => { setPlaying(false); update({ from: e.target.value }); }}>{months.map(month => <NativeSelectOption key={month} value={month}>{month}</NativeSelectOption>)}</NativeSelect></Field>}
        <Field><FieldLabel htmlFor="graph-to">{l('Through month', '截至月份')}</FieldLabel><NativeSelect id="graph-to" value={filters.to} onChange={e => { setPlaying(false); update({ to: e.target.value }); }}>{months.map(month => <NativeSelectOption key={month} value={month}>{month}</NativeSelectOption>)}</NativeSelect></Field>
      </FieldGroup>
      <label className="graph-uncertain"><input type="checkbox" checked={filters.uncertain} onChange={e => update({ uncertain: e.target.checked })} />{l('Include resources with unknown or overlapping year-only dates as context', '将日期未知或仅年份且跨越边界的资源作为背景显示')}</label>
      <p className="fine-print">{l('Undated links are shown as dotted context, including current repository ownership; they do not establish historical relationships. Only explicitly dated facts count as changes. This is an evidence timeline, not a reconstruction of everything known at the time.', '无日期的连线以点线作为背景，包括当前仓库归属，不证明历史关系。只有明确日期的事实计入变化。这是依据已收录资料形成的时间线，不代表当时的完整知识快照。')}</p>
      {filters.mode === 'compare' && <p className="graph-time-key"><span className="graph-added-key">+ {l('Added: thick outline / line', '新增：加粗轮廓／连线')}</span><span className="graph-ended-key">− {l('Ended: long dashed line', '结束：长虚线')}</span></p>}
      </div></div></details>
    </CardContent></Card>

    <div className="graph-summary" role="status" aria-live="polite"><strong>{view.nodes.length} {l('entities', '个实体')} · {view.edges.length} {l('relations', '条关系')}</strong><span>{filters.mode === 'compare' && `${view.nodes.filter(n => view.status[n.id] === 'added' && n.kind === 'resource').length} ${l('new resources', '项新增资源')} · `}{view.uncertain} {l('resources with uncertain dates', '项资源日期不确定')}</span></div>
    <div className={"graph-workspace" + (selected ? " has-selection" : "")}><GraphCanvas expanded={expanded} onFullscreen={toggleFullscreen} view={view} selected={visibleSelection ? filters.selected : ''} locale={locale} onSelect={select} frameKey={[filters.q, filters.direction, filters.layers.join(','), filters.relations.join(',')].join('|')} />
      <Card className="graph-inspector" size="sm" style={{ display: selected ? undefined : "none" }}><CardHeader><CardTitle asChild><h2>{selected ? node ? label(node.label, locale) : label(relationLabels[edge!.kind], locale) : l('Inspect a connection', '查看一条线索')}</h2></CardTitle><CardDescription>{selected ? l('Source and date details', '来源与日期详情') : l('Select a node, edge, or an item in the lists below.', '点击节点、连线，或下方列表中的条目。')}</CardDescription></CardHeader><CardContent aria-live="polite">
        {selected ? <>
          {!visibleSelection && <p>{l('This item is outside the current filters.', '此条目不在当前筛选范围内。')}</p>}
          {node && <p><i className="graph-dot" style={swatch(entityColors[node.kind])} aria-hidden="true" /> {label(entityLabels[node.kind], locale)}</p>}
          {edge && <p className="graph-edge-endpoints">{label(byId.get(edge.source)!.label, locale)} → {label(byId.get(edge.target)!.label, locale)}</p>}
          {node?.attributes.summary && <p>{label(node.attributes.summary, locale)}</p>}
          {node?.attributes.github_owner && <p>GitHub owner: <External locale={locale} href={'https://github.com/' + node.attributes.github_owner} kind="graph_source">{node.attributes.github_owner}</External></p>}
          {node?.attributes.identity_scope && <p className="fine-print">{l('Identity scoped to this paper; same-name authors have not been merged. The collector shows up to the first three listed authors, not a complete author list.', '身份限定在此论文内，未合并同名作者。采集最多展示原文前三位署名作者，并非完整作者列表。')}</p>}
          {node?.attributes.organization_kind === 'github-organization' && <p className="fine-print">{l('Verified GitHub organization account; no company or university identity inferred.', '已核实的 GitHub 组织账号；未据此推断公司或学校身份。')}</p>}
          <dl className="graph-facts"><dt>{node?.kind === 'resource' ? l('Publication', '发布时间') : l('Relation / entity date', '关系／实体日期')}</dt><dd>{selected.date || l('Unknown', '未知')} · {datePrecision(selected.date_precision)}</dd>
            {'end_date' in selected && selected.end_date && <><dt>{l('Ended', '结束时间')}</dt><dd>{selected.end_date}</dd></>}
            <dt>{l('Collected (UTC)', '采集时间（UTC）')}</dt><dd>{selected.recorded_at || l('Not recorded in catalog metadata', '原目录未记录')}</dd>
            {view.status[selected.id] && <><dt>{l('In this view', '在当前视图中')}</dt><dd>{statusLabel(view.status[selected.id])}</dd></>}
          </dl>
          {Array.isArray(selected.attributes.conditions) && <p>{label(selected.attributes.conditions as [string, string], locale)}</p>}
          {edge?.attributes.resource && <p>{l('Paper scope: ', '论文范围：')}{label(byId.get(String(edge.attributes.resource))!.label, locale)}</p>}
          <div className="graph-evidence"><strong>{l('Evidence', '依据')}</strong>{selected.evidence.map((source, i) => <div key={source.url + source.locator + i}><External href={source.url} locale={locale} kind="graph_source">{source.kind === 'primary' ? l('Primary source', '原始来源') : l('Catalog metadata', '目录记录')}</External><small>{source.locator}</small>{source.retrieved_at && <small>{source.retrieved_at}</small>}</div>)}</div>
          {node && resourceLink(node) && <Button asChild variant="outline"><a href={resourceLink(node)}>{l('Read resource', '阅读资源')}<ArrowRightIcon data-icon="inline-end" /></a></Button>}
          {node?.attributes.url && <External href={node.attributes.url} locale={locale} kind="graph_source">{l('Open source page', '打开来源页面')}</External>}
          {!!relations.length && <details open><summary>{l('Connected relations', '相邻关系')} ({relations.length})</summary><ul className="graph-connections">{relations.map(e => <li key={e.id}><Button variant="ghost" className="graph-connection-button" onClick={() => select(e.id)}><i className="graph-line" style={swatch(relationColors[e.kind])} aria-hidden="true" />{label(relationLabels[e.kind], locale)} · {label(byId.get(e.source === filters.selected ? e.target : e.source)!.label, locale)}</Button></li>)}</ul></details>}
          <Button variant="ghost" onClick={() => select('')}>{l('Clear selection', '清除选择')}</Button>
        </> : <><p>{l('Colors identify entity and relation types. Dotted links have no verified occurrence date.', '颜色区分实体和关系类型；点线表示缺少已核实的发生日期。')}</p><p className="fine-print">{l('Authors, institutions and semantic relations are being enriched gradually. Missing links do not mean no relationship exists. “Related” is an editorial connection and does not imply inheritance or superiority.', '作者、机构与语义关系逐步补充。缺少连线不代表不存在关系。“编辑关联”不表示继承或优于另一项工作。')}</p></>}
      </CardContent></Card>
    </div>
    </div>
    <div className="graph-lists"><Card size="sm"><CardHeader><CardTitle asChild><h2>{l('Resources in this view', '当前视图的资源')}</h2></CardTitle><CardDescription>{l('Newest recorded publication first. Select an item to inspect it.', '按记录的发布时间倒序，选择条目查看详情。')}</CardDescription></CardHeader><CardContent><ul className="graph-entity-list">{latest.map(n => <li key={n.id}>{entityButton(n)}<a className="graph-read-link" href={resourceLink(n)} aria-label={l('Read ', '阅读 ') + label(n.label, locale)}><ArrowRightIcon aria-hidden="true" /></a></li>)}</ul>{!latest.length && <p>{l('No resources match these filters.', '没有符合条件的资源。')}</p>}</CardContent></Card>
      <Card size="sm"><CardHeader><CardTitle asChild><h2>{l('Entities & relations', '实体与关系')}</h2></CardTitle><CardDescription>{l('Keyboard-accessible alternatives to the graph.', '可通过键盘浏览图谱内容。')}</CardDescription></CardHeader><CardContent>
        <details><summary>{l('Context entities', '背景实体')} ({others.length})</summary><ul className="graph-entity-list">{others.map(n => <li key={n.id}>{entityButton(n)}</li>)}</ul></details>
        <details><summary>{l('All visible relations', '当前全部关系')} ({view.edges.length})</summary><ul className="graph-connections graph-relation-list">{view.edges.map(e => <li key={e.id}><Button variant="ghost" className="graph-connection-button" aria-pressed={filters.selected === e.id} onClick={() => select(e.id)}><i className="graph-line" style={swatch(relationColors[e.kind])} aria-hidden="true" /><span>{label(byId.get(e.source)!.label, locale)} → {label(byId.get(e.target)!.label, locale)}<small>{label(relationLabels[e.kind], locale)} · {e.date || l('Undated context', '日期未知的背景关系')}</small></span></Button></li>)}</ul></details>
      </CardContent></Card></div>
    <noscript><p>{l('Enable JavaScript for graph interaction and time filters. Resource and relation lists above remain available.', '启用 JavaScript 后可交互浏览和筛选时间；以上资源与关系列表仍可使用。')}</p></noscript>
  </section>;
}
