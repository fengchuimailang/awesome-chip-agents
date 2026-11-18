import raw from './generated/catalog.json';

export type Pair = [string, string];
export type Locale = 'en' | 'zh';
export type Page = { locale: Locale; kind: 'home' | 'catalog' | 'resource' | 'direction' | 'metrics' | 'missing'; id?: string };
export type Snapshot = {
  stars?: number; pushed_at?: string | null; fetched_at?: string;
  fetch_error?: string | null; archived?: boolean;
};
export type Download = {
  source: { id: string; provider: string; package?: string; repository?: string; period?: string; tag_prefix?: string; asset_pattern?: string };
  snapshot: { value?: number; fetched_at?: string; fetch_error?: string | null; period?: string; start?: string; end?: string; url?: string; asset_count?: number; release_count?: number };
};
export type Resource = {
  id: string; name: string; title: string; date: string | null; date_basis: string;
  direction: string; also_in: string[]; related: string[]; tags: string[]; types: string[];
  summary: Pair; description: Pair; path: string;
  links: { label: string; kind: string; url: string }[];
  repositories: (Snapshot & { name: string })[];
  downloads: Download[];
};
export const catalog = raw as unknown as {
  schema_version: number; repository: string; revision: string; working_tree: boolean;
  taxonomy: Record<'directions' | 'tags' | 'types', Record<string, Pair>>;
  resources: Resource[];
};
export const index = Object.fromEntries(catalog.resources.map(resource => [resource.id, resource]));
export const base = import.meta.env.BASE_URL;
export const local = (path = '') => base + path.replace(/^[/]+/, '');
export const route = (page: Page) => local(page.locale + '/' + (
  page.kind === 'home' ? '' :
  page.kind === 'resource' ? 'resources/' + page.id + '/' :
  page.kind === 'direction' ? 'directions/' + page.id + '/' :
  page.kind + '/'
));
export const text = (locale: Locale, en: string, zh: string) => locale === 'zh' ? zh : en;
export const label = (pair: Pair, locale: Locale) => pair[locale === 'zh' ? 1 : 0];
export const repoLink = (suffix = '') => catalog.repository ? catalog.repository + suffix : '';
export { isBenchmark } from './lib/catalog-state';

export function parsePage(path: string): Page {
  const parts = path.slice(base.length).split('/').filter(Boolean);
  const locale = parts[0] === 'zh' ? 'zh' : 'en';
  if (!parts.length || parts.length === 1 && ['en', 'zh'].includes(parts[0])) return { locale, kind: 'home' };
  if (!['en', 'zh'].includes(parts[0])) return { locale, kind: 'missing' };
  if (parts.length === 2 && ['catalog', 'metrics'].includes(parts[1])) return { locale, kind: parts[1] as 'catalog' | 'metrics' };
  if (parts.length === 3 && parts[1] === 'resources' && index[parts[2]]) return { locale, kind: 'resource', id: parts[2] };
  if (parts.length === 3 && parts[1] === 'directions' && catalog.taxonomy.directions[parts[2]]) return { locale, kind: 'direction', id: parts[2] };
  return { locale, kind: 'missing' };
}
