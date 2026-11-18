import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, LayoutGridIcon, ListIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from './ui/empty';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { NativeSelect, NativeSelectOption } from './ui/native-select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { ResourceCard, rememberListing } from './resource';
import { defaults, filterQuery, findResources, paginate, pageSize, readFilters, type Filters } from '@/lib/catalog-state';
import { cn } from '@/lib/utils';
import { catalog, label, text, type Page } from '@/model';
import { track } from '@/analytics';

function writeFilters(filters: Filters, push = false) {
  history[push ? 'pushState' : 'replaceState'](null, '', location.pathname + filterQuery(filters));
  window.dispatchEvent(new Event('catalog-url-change'));
}

export function Listing({ page }: { page: Page }) {
  const { locale } = page;
  const l = (en: string, zh: string) => text(locale, en, zh);
  const [filters, setFilters] = useState<Filters>(defaults);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const restored = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const load = () => {
      const next = readFilters(location.search, catalog.taxonomy);
      if (page.kind === 'direction') next.direction = '';
      setFilters(next);
      setReady(true);
    };
    load();
    window.addEventListener('popstate', load);
    window.addEventListener('pagehide', rememberListing);
    return () => { window.removeEventListener('popstate', load); window.removeEventListener('pagehide', rememberListing); };
  }, [page.kind]);

  const resources = findResources(catalog.resources, filters, catalog.taxonomy, page.kind === 'direction' ? page.id : undefined);
  const pagination = paginate(resources, filters.page);
  const visiblePages = Array.from({ length: pagination.pages }, (_, i) => i + 1).filter(n => n === 1 || n === pagination.pages || Math.abs(n - pagination.page) <= 1);
  useEffect(() => {
    if (!ready) return;
    if (pagination.page !== filters.page) {
      const next = { ...filters, page: pagination.page };
      setFilters(next);
      writeFilters(next);
    }
    if (restored.current) return;
    restored.current = true;
    let cancelled = false;
    try {
      const saved = JSON.parse(sessionStorage.getItem('catalog-position') || 'null');
      if (saved?.url === location.pathname + location.search && Number.isFinite(saved.y)) {
        void document.fonts.ready.then(() => requestAnimationFrame(() => {
          if (!cancelled) window.scrollTo(0, saved.y);
        }));
      }
    } catch { /* Storage is optional. */ }
    return () => { cancelled = true; };
  }, [ready, filters, pagination.page]);

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    const next = { ...filters, [key]: value, page: key === 'view' ? filters.page : key === 'page' ? value as number : 1 };
    setFilters(next);
    writeFilters(next, key === 'page');
    if (key === 'page') requestAnimationFrame(() => { resultsRef.current?.scrollIntoView({ block: 'start' }); resultsRef.current?.focus({ preventScroll: true }); });
    if (key !== 'q') track('catalog_filter', { filter: key, value: String(value), language: locale });
  }
  const reset = () => { const next = { ...defaults, view: filters.view }; setFilters(next); writeFilters(next); };
  const collections = { benchmarks: l('Benchmarks & datasets', '基准与数据集'), tools: l('Tools & platforms', '工具与平台'), research: l('Papers & benchmarks', '论文与基准') };
  const active = (['direction', 'type', 'tag', 'collection'] as const).filter(key => filters[key]);
  const select = (key: 'direction' | 'type' | 'tag', vocabulary: 'directions' | 'types' | 'tags', title: string) =>
    <Field className="min-w-0 gap-2"><FieldLabel htmlFor={'filter-' + key}>{title}</FieldLabel>
      <NativeSelect id={'filter-' + key} value={filters[key]} onChange={event => update(key, event.target.value)}>
        <NativeSelectOption value="">{l('All', '全部')}</NativeSelectOption>
        {Object.entries(catalog.taxonomy[vocabulary]).map(([id, pair]) => <NativeSelectOption key={id} value={id}>{label(pair, locale)}</NativeSelectOption>)}
      </NativeSelect>
    </Field>;

  return <section className="catalog-section">
    <div className="section-heading"><div><p className="eyebrow">{l('THE RESOURCE LIBRARY', '资源库')}</p><h1>{page.kind === 'direction' ? label(catalog.taxonomy.directions[page.id!], locale) : l('Find your next building block.', '找到你的下一块积木。')}</h1></div>
      <span className="count">{resources.length} {l('resources', '项资源')}</span></div>
    <form className="catalog-form" role="search" aria-label={l('Search resources', '搜索资源')} onSubmit={event => { event.preventDefault(); track('catalog_search', { query_length: filters.q.length, results: resources.length, language: locale }); }}>
      <FieldGroup><Field className="gap-0"><FieldLabel className="sr-only" htmlFor="resource-search">{l('Search resources', '搜索资源')}</FieldLabel>
        <InputGroup><InputGroupInput id="resource-search" type="search" placeholder={l('Search papers, tools, benchmarks…', '搜索论文、工具、基准…')} value={filters.q} onChange={event => update('q', event.target.value)} />
          <InputGroupAddon><SearchIcon aria-hidden="true" /></InputGroupAddon><InputGroupAddon align="inline-end"><Button type="submit">{l('Search', '搜索')}</Button></InputGroupAddon>
        </InputGroup>
      </Field></FieldGroup>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="filter-toolbar">
          <CollapsibleTrigger asChild><Button type="button" variant="outline" className="mobile-filter-trigger"><SlidersHorizontalIcon data-icon="inline-start" aria-hidden="true" />{l('Filters', '筛选')}{active.length ? ' (' + active.length + ')' : ''}<ChevronDownIcon data-icon="inline-end" aria-hidden="true" /></Button></CollapsibleTrigger>
          <FieldGroup className="sort-field"><Field orientation="horizontal"><FieldLabel htmlFor="filter-sort">{l('Sort', '排序')}</FieldLabel>
            <NativeSelect id="filter-sort" value={filters.sort} onChange={event => update('sort', event.target.value as Filters['sort'])}><NativeSelectOption value="date">{l('Newest first', '最新发布')}</NativeSelectOption><NativeSelectOption value="name">{l('Name', '名称')}</NativeSelectOption></NativeSelect>
          </Field></FieldGroup>
        </div>
        <CollapsibleContent forceMount className="filter-content">
          <FieldGroup className={cn('filters', page.kind === 'direction' && 'direction-filters')}>
            {page.kind !== 'direction' && select('direction', 'directions', l('Direction', '方向'))}
            {select('type', 'types', l('Resource type', '资源类型'))}{select('tag', 'tags', l('Tag', '标签'))}
            <Field className="min-w-0 gap-2"><FieldLabel htmlFor="filter-collection">{l('Collection', '资源集合')}</FieldLabel><NativeSelect id="filter-collection" value={filters.collection} onChange={event => update('collection', event.target.value as Filters['collection'])}>
              <NativeSelectOption value="">{l('All', '全部')}</NativeSelectOption>{Object.entries(collections).map(([id, title]) => <NativeSelectOption key={id} value={id}>{title}</NativeSelectOption>)}
            </NativeSelect></Field>
          </FieldGroup>
        </CollapsibleContent>
      </Collapsible>
      {(active.length > 0 || filters.q) && <div className="selected-filters" aria-label={l('Selected filters', '已选条件')}>
        {active.map(key => {
          const title = key === 'collection' ? collections[filters.collection as keyof typeof collections] : label(catalog.taxonomy[key === 'direction' ? 'directions' : key === 'type' ? 'types' : 'tags'][filters[key]], locale);
          return <Button key={key} type="button" variant="outline" onClick={() => update(key, '')} aria-label={l('Remove filter: ', '移除筛选：') + title}>{title}<XIcon data-icon="inline-end" aria-hidden="true" /></Button>;
        })}
        <Button type="button" variant="ghost" onClick={reset}>{l('Clear all', '清除全部')}</Button>
      </div>}
    </form>
    <div className="results-toolbar" ref={resultsRef} tabIndex={-1}>
      <p className="count" aria-live="polite">{ready && resources.length ? `${(pagination.page - 1) * pageSize + 1}–${Math.min(pagination.page * pageSize, resources.length)} / ` : ''}{resources.length} {l('resources', '项资源')}</p>
      <ToggleGroup type="single" variant="outline" value={filters.view} onValueChange={value => { if (value) update('view', value as Filters['view']); }} aria-label={l('Display mode', '显示方式')}>
        <ToggleGroupItem value="cards" aria-label={l('Card view', '卡片视图')} title={l('Card view', '卡片视图')}><LayoutGridIcon aria-hidden="true" /></ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label={l('Compact list', '紧凑列表')} title={l('Compact list', '紧凑列表')}><ListIcon aria-hidden="true" /></ToggleGroupItem>
      </ToggleGroup>
    </div>
    <div className={cn('resource-grid', filters.view === 'list' && 'resource-list')}>
      {(ready ? pagination.items : resources).map(resource => <ResourceCard key={resource.id} resource={resource} locale={locale} compact={filters.view === 'list'} from={ready ? location.pathname + filterQuery({ ...filters, page: pagination.page }) : undefined} />)}
    </div>
    {!resources.length && <Empty><EmptyHeader><EmptyTitle role="heading" aria-level={2}>{l('No matching resources', '没有找到匹配的资源')}</EmptyTitle><EmptyDescription>{l('Try a broader keyword or reset the filters.', '试试更宽泛的关键词，或重置筛选条件。')}</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline" onClick={reset}>{l('Reset filters', '重置筛选')}</Button></EmptyContent></Empty>}
    {ready && pagination.pages > 1 && <Pagination className="catalog-pagination" aria-label={l('Resource pages', '资源分页')}><PaginationContent>
      <PaginationItem><PaginationPrevious href={filterQuery({ ...filters, page: Math.max(1, pagination.page - 1) }) || '?'} text={l('Previous', '上一页')} aria-label={l('Previous page', '上一页')} aria-disabled={pagination.page === 1} tabIndex={pagination.page === 1 ? -1 : undefined} onClick={event => { event.preventDefault(); if (pagination.page > 1) update('page', pagination.page - 1); }} /></PaginationItem>
      {visiblePages.map((n, i) => <Fragment key={n}>{i > 0 && n > visiblePages[i - 1] + 1 && <PaginationItem className="desktop-page"><PaginationEllipsis /></PaginationItem>}<PaginationItem className="desktop-page"><PaginationLink href={filterQuery({ ...filters, page: n }) || '?'} isActive={n === pagination.page} aria-label={l('Page ', '第 ') + n + (locale === 'zh' ? ' 页' : '')} onClick={event => { event.preventDefault(); update('page', n); }}>{n}</PaginationLink></PaginationItem></Fragment>)}
      <PaginationItem className="mobile-page-count"><span>{pagination.page} / {pagination.pages}</span></PaginationItem>
      <PaginationItem><PaginationNext href={filterQuery({ ...filters, page: pagination.page + 1 })} text={l('Next', '下一页')} aria-label={l('Next page', '下一页')} aria-disabled={pagination.page === pagination.pages} tabIndex={pagination.page === pagination.pages ? -1 : undefined} onClick={event => { event.preventDefault(); if (pagination.page < pagination.pages) update('page', pagination.page + 1); }} /></PaginationItem>
    </PaginationContent></Pagination>}
    <noscript><p className="fine-print">{l('All resources are shown. Enable JavaScript to search, filter, or paginate.', '当前展示全部资源；启用 JavaScript 后可搜索、筛选和分页。')}</p></noscript>
    <p className="fine-print">{l('Dates reflect publication, not repository activity. Stars are snapshots, not quality scores.', '日期采用资源发布时间，不采用仓库推送时间。Stars 为快照，不代表质量评分。')}</p>
  </section>;
}
