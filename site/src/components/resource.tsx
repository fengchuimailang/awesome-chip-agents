import type { ComponentProps } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon, CodeIcon, FileTextIcon, GlobeIcon, StarIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { GitHubIcon } from './GitHubIcon';
import { primarySources } from '@/lib/catalog-state';
import { catalog, label, route, text, type Locale, type Resource } from '@/model';
import { track } from '@/analytics';

export function External({ href, children, resource, kind = 'source', locale, onClick, ...props }: Omit<ComponentProps<'a'>, 'href'> & {
  href: string; resource?: string; kind?: string; locale: Locale;
}) {
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" onClick={event => {
    const url = new URL(href);
    track('outbound_link', { resource_id: resource || 'site', link_kind: kind, language: locale, destination: url.origin + url.pathname });
    onClick?.(event);
  }}>{children}<ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" className="external-icon" /></a>;
}

export function ResourceTags({ tags, locale }: { tags: string[]; locale: Locale }) {
  return <div className="tags">{tags.map(tag => <Badge key={tag} asChild variant="secondary">
    <a href={route({ locale, kind: 'catalog' }) + '?tag=' + tag}>{label(catalog.taxonomy.tags[tag], locale)}</a>
  </Badge>)}</div>;
}

export function ResourceSources({ resource, locale, prominent = false }: { resource: Resource; locale: Locale; prominent?: boolean }) {
  return <div className="source-actions">{primarySources(resource.links).map((link, i) => {
    const github = link.kind === 'repository' && new URL(link.url).hostname === 'github.com';
    const Icon = github ? GitHubIcon : link.kind === 'repository' ? CodeIcon : link.kind === 'paper' ? FileTextIcon : GlobeIcon;
    const title = github ? 'GitHub' : text(locale, link.kind === 'repository' ? 'Code' : link.kind === 'paper' ? 'Paper' : 'Source', link.kind === 'repository' ? '代码' : link.kind === 'paper' ? '论文' : '原始来源');
    return <Button key={link.url} asChild variant={prominent && i === 0 ? 'default' : 'outline'}>
      <External href={link.url} locale={locale} resource={resource.id} kind={link.kind} aria-label={title + ': ' + resource.name} title={link.label}>
        <Icon data-icon="inline-start" />{title}
      </External>
    </Button>;
  })}</div>;
}

export function rememberListing() {
  try { sessionStorage.setItem('catalog-position', JSON.stringify({ url: location.pathname + location.search, y: window.scrollY })); } catch { /* Storage is optional. */ }
}

export function ResourceCard({ resource: r, locale, from, compact = false }: { resource: Resource; locale: Locale; from?: string; compact?: boolean }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  const repository = r.repositories[0];
  const href = route({ locale, kind: 'resource', id: r.id }) + (from ? '?from=' + encodeURIComponent(from) : '');
  return <Card className="resource-card" role="article" size={compact ? 'sm' : 'default'}>
    <CardHeader className="flex flex-1 flex-col gap-4">
      <div className="card-meta"><span>{label(catalog.taxonomy.directions[r.direction], locale)}</span><time>{r.date || l('Undated', '日期待核实')}</time></div>
      <CardTitle asChild><h3><a className="card-title-link" href={href} onClick={from ? rememberListing : undefined}>{r.name}<ArrowRightIcon aria-hidden="true" /></a></h3></CardTitle>
      <CardDescription>{label(r.summary, locale)}</CardDescription>
    </CardHeader>
    <CardContent><ResourceTags tags={r.tags.slice(0, 3)} locale={locale} /></CardContent>
    <CardFooter className="flex-col items-stretch gap-4"><ResourceSources resource={r} locale={locale} /><Separator />
      <div className="card-bottom"><span>{r.types.map(type => label(catalog.taxonomy.types[type], locale)).join(' · ')}</span>
        {repository && <span className="star-count" title={l('GitHub snapshot; collection date in detail', 'GitHub 快照；采集时间见详情')}><StarIcon aria-hidden="true" /><span className="sr-only">GitHub Stars: </span>{repository.stars === undefined ? '—' : repository.stars.toLocaleString(locale)}{repository.fetch_error ? ' *' : ''}</span>}
      </div>
    </CardFooter>
  </Card>;
}
