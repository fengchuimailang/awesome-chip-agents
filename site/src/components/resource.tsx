import type { ComponentProps } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon, BookOpenIcon, CodeIcon, FileTextIcon, GlobeIcon, InfoIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { GitHubIcon } from './GitHubIcon';
import { primarySources } from '@/lib/catalog-state';
import { profileScales, resourceProfile } from '@/lib/resource-profile';
import { catalog, label, route, text, type Locale, type Resource } from '@/model';
import { track } from '@/analytics';

export const resourceProfileScales = profileScales(catalog.resources);
const readingSteps = new Map(catalog.reading_paths.flatMap(path => path.steps.map((step, i) => [step.resource, { path, number: i + 1 }] as const)));

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

function ResourceProfile({ resource, locale }: { resource: Resource; locale: Locale }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  const profile = resourceProfile(resource, resourceProfileScales);
  if (!profile) return null;
  return <div className="resource-profile" data-resource={resource.id}>
    <div className="profile-heading"><span>{l('Resource at a glance', '资源速览')}</span>
      <a href={route({ locale, kind: 'metrics' }) + '#resource-profiles'}><InfoIcon aria-hidden="true" />{l('How to read', '指标说明')}</a>
    </div>
    <dl className="profile-metrics">{profile.metrics.map(metric => <div className="profile-metric" key={metric.kind}>
      <dt>{metric.kind === 'stars' ? 'GitHub Stars' : l('Citations', '论文引用')}</dt>
      <dd>
        <span className="profile-track" data-unavailable={metric.value === undefined || undefined} aria-hidden="true">
          {metric.width !== undefined && <span style={{ width: metric.width + '%' }} />}
        </span>
        <span className="profile-metric-value">{metric.value === undefined ? <span>{l('Unavailable', '暂无数据')}</span> : metric.url ?
          <External href={metric.url} resource={resource.id} locale={locale} kind="metric_source" aria-label={(metric.kind === 'stars' ? 'GitHub Stars: ' : l('Citations: ', '论文引用：')) + metric.value.toLocaleString(locale)}>{metric.value.toLocaleString(locale)}</External> : metric.value.toLocaleString(locale)}
        </span>
      </dd>
    </div>)}</dl>
    <div className="profile-status">
      <span><CodeIcon aria-hidden="true" />{profile.code ? l('Code linked', '有代码链接') : l('No code link recorded', '未记录代码链接')}</span>
      {profile.code && <span>{profile.archived ? l('Archived', '仓库已归档') : l('Last push', '最近推送')}
        {!profile.archived && <> <time dateTime={profile.pushedAt || undefined}>{profile.pushedAt?.slice(0, 10) || l('Unknown', '暂无数据')}</time></>}
      </span>}
    </div>
    {!!profile.metrics.length && <div className="profile-sources"><span>{l('Snapshots (UTC):', '快照（UTC）：')}</span>{profile.metrics.map(metric => <span key={metric.kind}>
      {metric.kind === 'stars' ? 'GitHub' : 'OpenAlex'} · {metric.fetchedAt ? <time dateTime={metric.fetchedAt}>{metric.fetchedAt.slice(0, 10)}</time> : l('not collected', '未采集')}
      {metric.refreshFailed && <span className="profile-refresh">{metric.value === undefined ? l(' · refresh failed', ' · 刷新失败') : l(' · refresh failed; saved value', ' · 刷新失败，保留旧值')}</span>}
    </span>)}</div>}
  </div>;
}

export function ResourceCard({ resource: r, locale, from, compact = false }: { resource: Resource; locale: Locale; from?: string; compact?: boolean }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  const reading = readingSteps.get(r.id);
  const href = route({ locale, kind: 'resource', id: r.id }) + (from ? '?from=' + encodeURIComponent(from) : '');
  return <Card className="resource-card" role="article" size={compact ? 'sm' : 'default'}>
    <CardHeader className="flex flex-1 flex-col gap-4">
      <div className="card-meta"><span>{label(catalog.taxonomy.directions[r.direction], locale)}</span><time>{r.date || l('Undated', '日期待核实')}</time></div>
      <CardTitle asChild><h3><a className="card-title-link" href={href} onClick={from ? rememberListing : undefined}>{r.name}<ArrowRightIcon aria-hidden="true" /></a></h3></CardTitle>
      <CardDescription>{label(r.summary, locale)}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-3">{reading && <Badge asChild variant="outline" className="reading-badge"><a href={route({ locale, kind: 'home' }) + '#' + reading.path.id}><BookOpenIcon aria-hidden="true" />{l('Reading path · Step ', '阅读路线 · 第 ') + reading.number + l('', ' 步')}</a></Badge>}<ResourceTags tags={r.tags.slice(0, 3)} locale={locale} /></CardContent>
    <CardFooter className="flex-col items-stretch gap-4"><ResourceSources resource={r} locale={locale} /><Separator />
      <ResourceProfile resource={r} locale={locale} />
      <div className="card-bottom"><span>{r.types.map(type => label(catalog.taxonomy.types[type], locale)).join(' · ')}</span></div>
    </CardFooter>
  </Card>;
}
