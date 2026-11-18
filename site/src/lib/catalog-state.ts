import type { Pair, Resource } from '../model';

export type Taxonomy = Record<'directions' | 'tags' | 'types', Record<string, Pair>>;
export type Filters = {
  q: string; direction: string; type: string; tag: string;
  sort: 'date' | 'name'; collection: '' | 'benchmarks' | 'tools' | 'research';
  page: number; view: 'cards' | 'list';
};
export const defaults: Filters = { q: '', direction: '', type: '', tag: '', sort: 'date', collection: '', page: 1, view: 'cards' };
export const pageSize = 24;

export function readFilters(query: string, taxonomy: Taxonomy): Filters {
  const params = new URLSearchParams(query);
  const known = (key: string, vocabulary: keyof Taxonomy) => {
    const value = params.get(key) || '';
    return Object.hasOwn(taxonomy[vocabulary], value) ? value : '';
  };
  const page = params.get('page') || '1';
  const collection = params.get('collection');
  return {
    q: params.get('q') || '', direction: known('direction', 'directions'),
    type: known('type', 'types'), tag: known('tag', 'tags'),
    sort: params.get('sort') === 'name' ? 'name' : 'date',
    collection: collection === 'tools' || collection === 'research' || collection === 'benchmarks' ? collection : '',
    page: /^[1-9]\d*$/.test(page) && Number.isSafeInteger(Number(page)) ? Number(page) : 1,
    view: params.get('view') === 'list' ? 'list' : 'cards',
  };
}

export function filterQuery(filters: Filters) {
  const params = new URLSearchParams();
  for (const key of Object.keys(defaults) as (keyof Filters)[]) {
    if (filters[key] !== defaults[key]) params.set(key, String(filters[key]));
  }
  return params.size ? '?' + params.toString() : '';
}

export const isBenchmark = (resource: Resource) =>
  !resource.types.some(type => ['news', 'video'].includes(type)) &&
  (resource.types.includes('benchmark') || resource.tags.some(tag => ['benchmark', 'dataset'].includes(tag)));

export function inCollection(resource: Resource, collection: Filters['collection']) {
  if (collection === 'benchmarks') return isBenchmark(resource);
  if (collection === 'research') return resource.types.includes('paper') || isBenchmark(resource);
  if (collection === 'tools') return !resource.types.some(type => ['news', 'video'].includes(type)) && resource.types.some(type => ['project', 'platform'].includes(type));
  return true;
}

export function findResources(resources: Resource[], filters: Filters, taxonomy: Taxonomy, fixedDirection?: string) {
  const direction = fixedDirection || filters.direction;
  const words = filters.q.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return resources.filter(r => {
    const searchable = [r.name, r.title, ...r.summary, ...r.description, ...r.tags.flatMap(tag => taxonomy.tags[tag])].join(' ').toLocaleLowerCase();
    return (!direction || r.direction === direction || r.also_in.includes(direction)) &&
      (!filters.type || r.types.includes(filters.type)) && (!filters.tag || r.tags.includes(filters.tag)) &&
      inCollection(r, filters.collection) && words.every(word => searchable.includes(word));
  }).sort((a, b) => filters.sort === 'name' ? a.name.localeCompare(b.name) :
    (b.date || '').localeCompare(a.date || '') || b.id.localeCompare(a.id));
}

export function paginate<T>(items: T[], requestedPage: number) {
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(pages, Math.max(1, requestedPage));
  return { page, pages, items: items.slice((page - 1) * pageSize, page * pageSize) };
}

// One shortcut per recorded source kind; the detail page retains every source.
export function primarySources(links: Resource['links']) {
  const selected: Resource['links'] = [];
  for (const kind of ['repository', 'paper', 'source']) {
    const link = links.find(link => link.kind === kind && !selected.some(existing => existing.url === link.url));
    if (link) selected.push(link);
  }
  return selected;
}

// Return navigation only accepts known catalog routes under this deployment base.
export function returnPath(value: string | null, base: string, directions: string[], locale?: string) {
  if (!value || !value.startsWith(base) || value.startsWith('//') || /[\\#\r\n]/.test(value)) return undefined;
  const [path, query = ''] = value.slice(base.length).split('?');
  const parts = path.split('/');
  if (!['en', 'zh'].includes(parts[0]) || parts.at(-1) !== '') return undefined;
  if (!(parts.length === 3 && parts[1] === 'catalog') &&
      !(parts.length === 4 && parts[1] === 'directions' && directions.includes(parts[2]))) return undefined;
  if (locale) parts[0] = locale;
  return base + parts.join('/') + (query ? '?' + query : '');
}
