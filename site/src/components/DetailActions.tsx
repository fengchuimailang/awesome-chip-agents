import { useEffect, useState } from 'react';
import { ArrowLeftIcon, CheckIcon, LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { ResourceSources } from './resource';
import { base, catalog, route, text, type Locale, type Resource } from '@/model';
import { returnPath } from '@/lib/catalog-state';
import { track } from '@/analytics';

export function DetailBack({ locale }: { locale: Locale }) {
  const [back, setBack] = useState<string>();
  useEffect(() => { setBack(returnPath(new URLSearchParams(location.search).get('from'), base, Object.keys(catalog.taxonomy.directions), locale)); }, [locale]);
  return back ? <Button asChild variant="link"><a href={back}><ArrowLeftIcon data-icon="inline-start" aria-hidden="true" />{text(locale, 'Back to results', '返回搜索结果')}</a></Button> : null;
}

export function DetailActions({ resource, locale }: { resource: Resource; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState('');
  const l = (en: string, zh: string) => text(locale, en, zh);
  async function copy() {
    const url = location.origin + route({ locale, kind: 'resource', id: resource.id });
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setFallback('');
      track('share_link', { resource_id: resource.id, language: locale });
    } catch { setCopied(false); setFallback(url); }
  }
  return <div className="detail-actions">
    <div className="detail-action-row"><ResourceSources resource={resource} locale={locale} prominent />
      <Button variant="outline" onClick={() => void copy()}>{copied ? <CheckIcon data-icon="inline-start" aria-hidden="true" /> : <LinkIcon data-icon="inline-start" aria-hidden="true" />}{l('Copy link', '复制链接')}</Button>
      <span role="status" className="copy-status">{copied ? l('Link copied', '链接已复制') : fallback ? l('Select and copy the link below.', '请选择下方链接并复制。') : ''}</span>
    </div>
    {fallback && <FieldGroup><Field><FieldLabel htmlFor="share-link">{l('Share this resource', '分享这条资源')}</FieldLabel><Input id="share-link" readOnly value={fallback} onFocus={event => event.target.select()} /></Field></FieldGroup>}
  </div>;
}
