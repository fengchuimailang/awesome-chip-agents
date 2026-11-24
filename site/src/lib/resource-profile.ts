import type { Resource } from '../model';

export type ProfileMetric = {
  kind: 'stars' | 'citations';
  value: number | undefined;
  width: number | undefined;
  url?: string;
  fetchedAt?: string;
  refreshFailed: boolean;
};
export type ProfileScales = { stars: number; citations: number };

const count = (value: number | undefined) => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : undefined;

// One reference per axis for the entire catalog, never the current results/page.
export function profileScales(resources: Resource[]): ProfileScales {
  return resources.reduce((scale, resource) => ({
    stars: Math.max(scale.stars, count(resource.repositories[0]?.stars) ?? 0),
    citations: Math.max(scale.citations, count(resource.paper.citation_count) ?? 0),
  }), { stars: 0, citations: 0 });
}

export function metricWidth(value: number | undefined, maximum: number): number | undefined {
  const measured = count(value);
  if (measured === undefined) return undefined;
  return Math.min(100, Math.log1p(measured) / Math.log1p(Math.max(1, maximum)) * 100);
}

export function resourceProfile(resource: Resource, scales: ProfileScales) {
  const code = resource.links.find(link => link.kind === 'repository');
  const paper = resource.links.find(link => link.kind === 'paper');
  if (!code && !paper) return null;
  const repository = resource.repositories[0];
  const github = code && new URL(code.url).hostname === 'github.com';
  const metrics: ProfileMetric[] = [];
  if (github) {
    const value = count(repository?.stars);
    metrics.push({ kind: 'stars', value, width: metricWidth(value, scales.stars), url: code.url,
      fetchedAt: repository?.fetched_at, refreshFailed: !!repository?.fetch_error });
  }
  if (paper) {
    const value = count(resource.paper.citation_count);
    metrics.push({ kind: 'citations', value, width: metricWidth(value, scales.citations), url: resource.paper.url,
      fetchedAt: resource.paper.fetched_at, refreshFailed: !!resource.paper.fetch_error });
  }
  return { metrics, code: !!code, pushedAt: repository?.pushed_at, archived: !!repository?.archived };
}
