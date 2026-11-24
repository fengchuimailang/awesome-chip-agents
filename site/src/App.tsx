import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { ArrowRightIcon, LanguagesIcon, StarIcon, WrenchIcon, FileCodeIcon, ActivityIcon, FlaskConicalIcon, BookOpenIcon, CircuitBoardIcon, RadioIcon, LayersIcon, NetworkIcon, CpuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { GitHubIcon } from '@/components/GitHubIcon';
import { ChipIllustration } from '@/components/ChipIllustration';
import { External, ResourceCard, ResourceTags, resourceProfileScales } from '@/components/resource';
import { Listing } from '@/components/Listing';
import { DetailActions, DetailBack } from '@/components/DetailActions';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { inCollection, type Filters } from '@/lib/catalog-state';
import { catalog, index, label, local, repoLink, route, text, type Locale, type Page, type Resource } from './model';
import { track } from './analytics';

const MarkdownContent = lazy(() => import('./MarkdownContent'));

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <Card className="detail-panel" size="sm">
    <CardHeader><CardTitle asChild><h2>{title}</h2></CardTitle></CardHeader>
    <CardContent>{children}</CardContent>
  </Card>;
}

function DownloadMetrics({ resource, locale }: { resource: Resource; locale: Locale }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  return <Panel title={l('Download metrics', '下载指标')}>
    {!resource.downloads.length ? <p>{l('No verified download source recorded.', '暂未记录经过核实的下载统计来源。')}</p> :
      resource.downloads.map(({ source, snapshot: s }) => <div className="download-row" key={source.id}>
        <strong>{source.provider === 'npm' ? l('npm package downloads', 'npm 包下载量') : source.provider === 'pypistats' ? l('PyPI package downloads · PyPI Stats', 'PyPI 包下载量 · PyPI Stats') : l('GitHub release asset downloads', 'GitHub Release 附件下载量')}</strong>
        <span className="metric-value">{s.value === undefined ? l('Unavailable', '暂无数据') : s.value.toLocaleString(locale)}</span>
        <p>{source.package || source.repository} · {s.start && s.end ? s.start + ' – ' + s.end : source.provider === 'pypistats' ? l('Recent reporting window: ', '最近统计窗口：') + (s.period || 'month') : l('Currently available matching release assets', '当前仍可用的匹配版本附件累计值')}</p>
        {source.tag_prefix && <small>{l('Release tag prefix: ', '版本标签前缀：')}{source.tag_prefix}</small>}
        {source.asset_pattern && <small>{l('Asset pattern: ', '附件匹配：')}{source.asset_pattern}</small>}
        {s.asset_count !== undefined && <small>{s.asset_count} {l('matching assets across ', '个匹配附件，来自 ')}{s.release_count} {l('releases', '个版本')}</small>}
        {s.url && <External href={s.url} locale={locale} resource={resource.id} kind="metric_source">{l('Data source', '数据来源')}</External>}
        <small>{l('Fetched (UTC): ', '采集时间（UTC）：')}{s.fetched_at || '—'}{s.fetch_error ? l(' · Refresh failed; previous snapshot retained', ' · 刷新失败，保留已有快照') : ''}</small>
      </div>)}
    <p className="fine-print">{l('Package or file downloads are not unique people or MCP installations. Website clicks are measured separately.', '包或文件的下载量不等于独立用户或 MCP 安装次数。本站链接点击另行统计。')}</p>
  </Panel>;
}

function PaperMetrics({ resource, locale }: { resource: Resource; locale: Locale }) {
  const p = resource.paper;
  const l = (en: string, zh: string) => text(locale, en, zh);
  if (!resource.links.some(link => link.kind === 'paper')) return null;
  return <Panel title={l('Paper citations', '论文引用')}>
    <div className="download-row">
      <strong>OpenAlex</strong><span className="metric-value">{p.citation_count === undefined ? l('Unavailable', '暂无数据') : p.citation_count.toLocaleString(locale) + l(' citations', ' 次引用')}</span>
      {p.url && <External href={p.url} locale={locale} resource={resource.id} kind="metric_source">{l('View citation record', '查看引用记录')}</External>}
      {p.doi && <small>DOI: <External href={'https://doi.org/' + p.doi} locale={locale} resource={resource.id} kind="paper">{p.doi}</External></small>}
      {p.citation_count === undefined && <p>{p.status === 'not-found' ? l('No exact DOI match in OpenAlex at collection time.', '采集时 OpenAlex 未收录该 DOI。') : !p.doi ? l('No supported DOI or arXiv identifier recorded.', '暂未记录支持采集的 DOI 或 arXiv 编号。') : l('No successful citation snapshot yet.', '暂未获得有效的引用快照。')}</p>}
      {p.indexed_in && <small>{l('Indexed in: ', '收录来源：')}{p.indexed_in}</small>}
      <small>{l('Fetched (UTC): ', '采集时间（UTC）：')}{p.fetched_at || '—'}</small>
      {p.fetch_error && <small>{l('Refresh failed; previous snapshot retained.', '刷新失败，保留已有快照。')}</small>}
    </div>
    <p className="fine-print">{l('Exact DOI match, including preprints. Counts depend on coverage and paper age; they are not quality scores or evidence of peer review.', '按 DOI 精确匹配，包含预印本。引用量受收录范围和发表时间影响，不代表质量评分或已通过同行评审。')}</p>
  </Panel>;
}

function Detail({ page }: { page: Page }) {
  const r = index[page.id!];
  const { locale } = page;
  const l = (en: string, zh: string) => text(locale, en, zh);
  function markdownHref(href: string) {
    if (/^https?:/.test(href) || href.startsWith('#')) return href;
    const resolved = new URL(href, 'https://source.invalid/' + r.path);
    const match = catalog.resources.find(record => '/' + record.path === resolved.pathname);
    return match ? route({ locale, kind: 'resource', id: match.id }) : repoLink('/blob/HEAD' + resolved.pathname + resolved.hash);
  }
  const notes: Record<string, string> = {
    source: l('Date recorded in the original source.', '日期沿用原始来源记录。'),
    'arxiv-month': l('arXiv identifier month; exact first-public day not verified.', '按 arXiv 编号月份归档；首次公开的具体日期尚未核实。'),
    'year-only': l('Publication year only; month not verified.', '仅记录发表年份，月份待核实。'),
    unknown: l('Publication date not recorded.', '尚未记录发布日期。'),
  };
  return <>
    <DetailBack locale={locale} /><nav className="breadcrumb" aria-label={l('Breadcrumb', '当前位置')}><a href={route({ locale, kind: 'catalog' })}>{l('Resources', '资源库')}</a><span>/</span><a href={route({ locale, kind: 'direction', id: r.direction })}>{label(catalog.taxonomy.directions[r.direction], locale)}</a></nav>
    <div className="detail-heading"><p className="eyebrow">{r.types.map(type => label(catalog.taxonomy.types[type], locale)).join(' / ')}</p><h1>{r.name}</h1>
      {r.title !== r.name && <p className="original-title">{r.title}</p>}<p className="lead">{label(r.summary, locale)}</p>
      <ResourceTags tags={r.tags} locale={locale} /><DetailActions resource={r} locale={locale} />
    </div>
    <Separator />
    <div className="detail-layout"><article className="prose">
      <Suspense fallback={<p>{label(r.summary, locale)}</p>}><MarkdownContent link={(href, children) => {
        const url = markdownHref(href);
        return /^https?:/.test(url) ? <External href={url} locale={locale} resource={r.id} kind="description">{children}</External> : <a href={url}>{children}</a>;
      }}>{label(r.description, locale)}</MarkdownContent></Suspense>
      {r.related.length > 0 && <section><h2>{l('Related resources', '相关资源')}</h2><div className="related">{r.related.map(id => <a key={id} href={route({ locale, kind: 'resource', id })}>{index[id].name} →</a>)}</div></section>}
    </article><aside className="detail-sidebar">
      <Panel title={l('Original sources', '原始来源')}><div className="source-links">{r.links.map(link => <External key={link.url + link.label} href={link.url} locale={locale} resource={r.id} kind={link.kind}>{link.label}</External>)}</div>
        <p className="fine-print">{l('Published: ', '发布：')}{r.date || l('Unknown', '日期待核实')}<br />{notes[r.date_basis]}</p>
      </Panel>
      <PaperMetrics resource={r} locale={locale} />
      <Panel title={l('Repository activity', '仓库动态')}>
        {r.repositories.length ? r.repositories.map(repo => <div className="repo-stat" key={repo.name}>
          <External href={'https://github.com/' + repo.name} locale={locale} resource={r.id} kind="repository">{repo.name}</External>
          <strong className="star-count"><StarIcon aria-hidden="true" /><span className="sr-only">GitHub Stars: </span>{repo.stars === undefined ? l('Unavailable', '暂无数据') : repo.stars.toLocaleString(locale)}</strong>
          <small>{l('Last push (UTC): ', '最近推送（UTC）：')}{repo.pushed_at || '—'}</small>
          <small>{l('Fetched (UTC): ', '采集（UTC）：')}{repo.fetched_at || '—'}</small>
          {repo.fetch_error && <small className="status">{l('Refresh failed; previous snapshot retained', '刷新失败，保留已有快照')}</small>}
          {repo.archived && <small>{l('Archived', '已归档')}</small>}
        </div>) : <p>{l('No related public repository recorded.', '暂未记录相关公开仓库。')}</p>}
      </Panel>
      <DownloadMetrics resource={r} locale={locale} />
      {catalog.repository && <Panel title={l('Help improve this entry', '一起完善这条资源')}>
        <External href={repoLink('/edit/HEAD/' + r.path)} locale={locale} resource={r.id} kind="edit">{l('Edit on GitHub', '在 GitHub 上编辑')}</External>
        <External href={repoLink('/issues/new?template=resource-suggestion.yml&title=' + encodeURIComponent('Resource correction: ' + r.name))} locale={locale} resource={r.id} kind="contribute">{l('Report a correction', '反馈错误或补充')}</External>
      </Panel>}
    </aside></div>
  </>;
}

function Home({ locale }: { locale: Locale }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  const [recent, setRecent] = useState<Filters['collection']>('');
  const recentResources = catalog.resources.filter(resource => inCollection(resource, recent)).slice(0, 6);
  const firstIssues = repoLink('/issues?q=' + encodeURIComponent('is:issue is:open label:"good first issue"'));
  const tasks = [
    { icon: WrenchIcon, query: '?q=mcp&collection=tools', title: l('Find MCP tools', '找 MCP 工具'), description: l('Connect agents to your tools.', '连接 Agent 与设计工具。') },
    { icon: FileCodeIcon, query: '?direction=rtl-generation&tag=generation', title: l('Generate RTL', '生成 RTL'), description: l('From specifications to HDL.', '从设计规格走向 HDL。') },
    { icon: ActivityIcon, query: '?tag=waveform', title: l('Debug waveforms', '调试波形'), description: l('Understand what went wrong.', '从波形中定位问题。') },
    { icon: FlaskConicalIcon, query: '?collection=benchmarks', title: l('Find benchmarks', '找评测基准'), description: l('Put your approach to the test.', '为你的方法找到试金石。') },
  ];
  const directionIcons = [FileCodeIcon, ActivityIcon, CircuitBoardIcon, RadioIcon, LayersIcon, NetworkIcon, CpuIcon];
  return <>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">{l('AN OPEN MAP OF CHIP DESIGN × AI', '芯片设计 × AI 的开放资源地图')}</p>
      <h1>{l('Discover the agents.', '发现芯片 Agent。')}<br /><em>{l('Build the next chip.', '探索设计新可能。')}</em></h1>
      <p>{l('Papers, tools, benchmarks, and infrastructure for LLM-assisted chip design. Curated in the open, connected by purpose.', '汇集芯片设计 LLM Agent 的论文、工具、评测基准与基础设施。公开维护，按用途连接，让探索更有方向。')}</p>
      <div className="hero-actions"><Button asChild size="lg"><a href="#getting-started">{l('Start with five reads', '从五步阅读开始')}<ArrowRightIcon data-icon="inline-end" aria-hidden="true" /></a></Button>
        <Button asChild variant="outline" size="lg"><a href={route({ locale, kind: 'catalog' })}>{l('Explore resources', '探索资源库')}</a></Button></div>
    </div><ChipIllustration />
      <div className="hero-stats"><span><strong>{catalog.resources.length}</strong><span>{l('Curated resources', '精选领域资源')}</span></span><span><strong>{Object.keys(catalog.taxonomy.directions).length.toString().padStart(2, '0')}</strong><span>{l('Research directions', '研究方向')}</span></span><span><strong>EN / 中</strong><span>{l('One shared catalog', '双语同步维护')}</span></span></div>
    </section>
    {catalog.reading_paths.map(path => <section id={path.id} key={path.id} className="reading-path" aria-labelledby={path.id + '-heading'}>
      <div className="section-heading"><div><p className="eyebrow">{l('01 / A GUIDED START', '01 / 不知道从哪看？')}</p><h2 id={path.id + '-heading'}>{label(path.title, locale)}</h2></div><BookOpenIcon className="section-icon" aria-hidden="true" /></div>
      <p className="reading-summary">{label(path.summary, locale)}</p>
      <ol className="reading-steps">{path.steps.map((step, i) => {
        const resource = index[step.resource];
        return <li key={step.resource}><div className="reading-marker"><span>{(i + 1).toString().padStart(2, '0')}</span><span>{l('STEP ', '第 ')}{i + 1}{l('', ' 步')}</span></div><Card className="reading-step" size="sm"><CardHeader>
          <CardTitle asChild><h3><a href={route({ locale, kind: 'resource', id: resource.id })}>{resource.name}<ArrowRightIcon className="reading-arrow" aria-hidden="true" /></a></h3></CardTitle>
          <CardDescription>{label(step.why, locale)}</CardDescription>
        </CardHeader><CardContent><p className="reading-focus"><strong>{l('Focus on', '重点看什么')}</strong>{label(step.focus, locale)}</p></CardContent></Card></li>;
      })}</ol>
      <div className="reading-path-footer"><p className="fine-print">{l('Before you start: ', '开始前：')}{label(path.prerequisites, locale)}</p><Button asChild variant="link"><a href={route({ locale, kind: 'catalog' }) + '?sort=citations&evidence=code'}>{l('Continue exploring with code', '继续探索有代码的资源')}<ArrowRightIcon data-icon="inline-end" aria-hidden="true" /></a></Button></div>
    </section>)}
    <section className="task-section" aria-labelledby="task-heading"><div className="section-heading"><div><p className="eyebrow">{l('START WITH A TASK', '从手头的任务开始')}</p><h2 id="task-heading">{l('What are you working on?', '你想完成什么？')}</h2></div></div>
      <div className="task-shortcuts">{tasks.map(({ icon: Icon, query, title, description }) => <a href={route({ locale, kind: 'catalog' }) + query} key={query}><Card className="task-card" size="sm"><CardHeader><div className="task-card-top"><Icon aria-hidden="true" /><ArrowRightIcon aria-hidden="true" /></div><CardTitle asChild><h3>{title}</h3></CardTitle><CardDescription>{description}</CardDescription></CardHeader></Card></a>)}</div>
    </section>
    <section><div className="section-heading"><div><p className="eyebrow">{l('CHOOSE YOUR PATH', '从你的方向出发')}</p><h2>{l('Explore by direction', '按研究方向探索')}</h2></div><Button asChild variant="link"><a href={route({ locale, kind: 'catalog' })}>{l('View everything', '查看全部')}<ArrowRightIcon data-icon="inline-end" aria-hidden="true" /></a></Button></div>
      <div className="direction-grid">{Object.entries(catalog.taxonomy.directions).map(([id, pair], i) => {
        const count = catalog.resources.filter(r => r.direction === id && !r.types.some(type => ['news', 'video'].includes(type))).length;
        const Icon = directionIcons[i % directionIcons.length];
        return <a href={route({ locale, kind: 'direction', id })} key={id}><div className="direction-top"><span className="direction-number">0{i + 1}</span><Icon aria-hidden="true" /></div><h3>{label(pair, locale)}</h3><span className="direction-bottom"><span>{count} {l('primary resources', '项主要资源')}</span><ArrowRightIcon aria-hidden="true" /></span></a>;
      })}<a className="benchmark-tile" href={route({ locale, kind: 'catalog' }) + '?collection=benchmarks'}><div className="direction-top"><span className="direction-number">08</span><FlaskConicalIcon aria-hidden="true" /></div><h3>{l('Benchmarks & datasets', '基准与数据集')}</h3><span className="direction-bottom"><span>{l('Your evaluation starting point', '找到评测的起点')}</span><ArrowRightIcon aria-hidden="true" /></span></a></div>
    </section>
    <section><div className="section-heading"><div><p className="eyebrow">{l('RECENT PUBLICATIONS', '近期发布')}</p><h2>{l('Across the ecosystem', '看看领域新进展')}</h2></div><Button asChild variant="link"><a href={route({ locale, kind: 'catalog' }) + (recent ? '?collection=' + recent : '')}>{l('Browse the library', '浏览资源库')}<ArrowRightIcon data-icon="inline-end" aria-hidden="true" /></a></Button></div>
      <ToggleGroup className="recent-views" type="single" variant="outline" value={recent || 'all'} onValueChange={value => { if (value) setRecent(value === 'all' ? '' : value as Filters['collection']); }} aria-label={l('Recent publication category', '近期发布分类')}>
        <ToggleGroupItem value="all">{l('All', '全部')}</ToggleGroupItem><ToggleGroupItem value="tools">{l('Tools', '工具')}</ToggleGroupItem><ToggleGroupItem value="research">{l('Papers & benchmarks', '论文与基准')}</ToggleGroupItem>
      </ToggleGroup>
      <div className="resource-grid">{recentResources.map(resource => <ResourceCard key={resource.id} resource={resource} locale={locale} />)}</div>
    </section>
    <section className="contribute-banner"><div><p className="eyebrow">{l('BUILT TOGETHER', '一起维护，一起探索')}</p><h2>{l('Know a resource we should include?', '有值得收录的资源？')}</h2><p>{l('Share a link, correct a detail, or help translate.', '推荐一个链接、纠正一处信息，或补充一段翻译。')}</p></div>
      {catalog.repository && <div className="contribution-actions"><Button asChild size="lg"><External href={repoLink('/issues/new?template=resource-suggestion.yml')} locale={locale} kind="contribute" onClick={() => track('contribute', { language: locale })}>{l('Suggest a resource', '推荐资源')}</External></Button>
        <Button asChild variant="outline"><External href={firstIssues} locale={locale} kind="first_contribution"><GitHubIcon data-icon="inline-start" />{l('Make your first contribution', '完成第一次贡献')}</External></Button></div>}
    </section>
  </>;
}

function Metrics({ locale }: { locale: Locale }) {
  const l = (en: string, zh: string) => text(locale, en, zh);
  const configured = catalog.resources.filter(r => r.downloads.length);
  const papers = catalog.resources.filter(r => r.links.some(link => link.kind === 'paper'));
  const cited = papers.filter(r => r.paper.citation_count !== undefined);
  return <section className="metrics-page"><p className="eyebrow">{l('SOURCES & MEASUREMENT', '来源与统计口径')}</p><h1>{l('Understand the numbers.', '让每个数字都有依据。')}</h1>
    <p className="lead">{l('Activity and usage signals help discovery. They do not establish research quality.', '关注度和使用指标帮助了解资源，不代表研究质量。')}</p>
    <Card className="profile-explainer" id="resource-profiles"><CardHeader><CardTitle asChild><h2>{l('Reading the resource profiles', '如何看资源速览')}</h2></CardTitle><CardDescription>{l('A quick view of recorded evidence, with the original counts and sources.', '用已有数据快速了解资源，保留原始数字与来源。')}</CardDescription></CardHeader><CardContent>
      <ul>
        <li>{l('GitHub Stars reflects repository attention; citations reflect accumulated references in OpenAlex. Tools show repository signals, papers show citation signals, and entries with both show both.', 'GitHub Stars 反映仓库关注度，论文引用反映 OpenAlex 收录的引用积累。工具显示仓库指标，论文显示引用指标，两者都有时同时展示。')}</li>
        <li>{l('Each bar uses its own fixed reference across the whole catalog. Large counts are compressed so smaller projects stay visible. Filtering, sorting and pagination do not change the scale. A full bar is the current catalog maximum, not a perfect score.', '两种横条分别使用全站固定参照，并压缩大数值差距，让小项目也能被看见。筛选、排序和翻页不会改变尺度；满条代表当前收录资源中的最大值。')}</li>
        <li>{l('Current references: ', '当前参照：')}GitHub Stars {resourceProfileScales.stars.toLocaleString(locale)} · {l('Citations ', '论文引用 ')}{resourceProfileScales.citations.toLocaleString(locale)}{l('. Stars use the first linked repository, as does sorting.', '。Stars 与排序一致，使用首个展示仓库的数据。')}</li>
        <li>{l('Zero is a measured count with an empty solid track. A dashed track marked “Unavailable” means no count was collected. Failed refreshes retain and label saved values; snapshot dates use UTC.', '数字 0 和空实线条代表实际计数为零；虚线条与“暂无数据”代表尚无计数。刷新失败会标注保留的旧值，快照日期使用 UTC。')}</li>
        <li>{l('A code link records availability of a repository link; it does not confirm reproducibility. Last push is the repository push date in the saved snapshot. Paper age, field size and index coverage affect counts: compare similar resources and read the work before judging it.', '“有代码链接”只说明已记录仓库链接；最近推送是快照记录的仓库推送日期。发表时间、领域规模和收录覆盖都会影响计数，建议结合相近资源与原文判断。')}</li>
      </ul>
    </CardContent></Card>
    <div className="metrics-explainer">
      <Card><CardHeader><CardTitle asChild><h2>{l('Paper citations · OpenAlex', '论文引用 · OpenAlex')}</h2></CardTitle><CardDescription>{l('Exact DOI matches, including arXiv identifiers represented as DOIs. Snapshots refresh after 30 days; missing data stays unavailable. Coverage and paper age affect counts, which do not establish peer review or quality.', '按 DOI 精确匹配，arXiv 编号转换为对应 DOI。快照满 30 天后刷新，缺失数据保留为暂无。收录范围和发表时间会影响引用数，不能据此判断同行评审或研究质量。')}</CardDescription></CardHeader><CardContent><p>{cited.length} / {papers.length} {l('resources with paper links have citation data.', '项含论文链接的资源已有引用数据。')}</p><a href={route({ locale, kind: 'catalog' }) + '?sort=citations'}>{l('Browse by citations', '按引用数浏览')} →</a></CardContent></Card>
      <Card><CardHeader><CardTitle asChild><h2>GitHub Stars</h2></CardTitle><CardDescription>{l('Repository snapshots with collection timestamps. Failed refreshes retain the last successful value.', '展示带采集时间的仓库快照；刷新失败保留上次成功值。')}</CardDescription></CardHeader></Card>
      <Card><CardHeader><CardTitle asChild><h2>{l('Downloads', '外部下载量')}</h2></CardTitle><CardDescription>{l('npm and PyPI Stats report package downloads within reporting windows. GitHub counts matching release asset downloads. Providers and scopes are displayed separately.', 'npm 和 PyPI Stats 提供统计窗口内的包下载量；GitHub 统计匹配的 Release 附件下载。不同来源和口径分别展示。')}</CardDescription></CardHeader></Card>
      <Card><CardHeader><CardTitle asChild><h2>{l('Website link clicks', '本站链接点击')}</h2></CardTitle><CardDescription>{l('When configured, Umami records pageviews and outbound-link events. Maintainers can view counts in their analytics dashboard. Clicks are not downloads.', '配置后，Umami 接收页面访问和外链事件，维护者可在统计后台查看。链接点击不等于实际下载。')}</CardDescription></CardHeader></Card>
    </div>
    <h2>{l('Resources with download sources', '已配置下载来源的资源')}</h2>
    {configured.length ? configured.map(resource => <div className="metric-resource" key={resource.id}><h3><a href={route({ locale, kind: 'resource', id: resource.id })}>{resource.name} →</a></h3><DownloadMetrics resource={resource} locale={locale} /></div>) : <p>{l('Verified download sources will appear here once recorded.', '核实并配置下载来源后，将在这里展示。')}</p>}
    <p className="fine-print">{l('Analytics respects Do Not Track and Global Privacy Control. Search text and referrer URLs are excluded.', '访问统计遵循 Do Not Track 与 Global Privacy Control；不发送搜索原文和来源网址。')}</p>
  </section>;
}

export default function App({ page }: { page: Page }) {
  const { locale } = page;
  const l = (en: string, zh: string) => text(locale, en, zh);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const update = () => setQuery(location.search);
    update();
    window.addEventListener('catalog-url-change', update);
    window.addEventListener('popstate', update);
    return () => { window.removeEventListener('catalog-url-change', update); window.removeEventListener('popstate', update); };
  }, []);
  return <>
    <a className="skip-link" href="#main">{l('Skip to content', '跳转到正文')}</a>
    <header className="site-header"><a className="brand" href={route({ locale, kind: 'home' })}><img className="brand-mark" src={local('favicon.svg')} width="44" height="44" alt="" /><span>Awesome<br /><strong>Chip Agents</strong></span></a>
      <nav aria-label={l('Main navigation', '主导航')}><a href={route({ locale, kind: 'catalog' })} aria-current={['catalog', 'direction'].includes(page.kind) ? 'page' : undefined}>{l('Resources', '资源库')}</a><a href={route({ locale, kind: 'metrics' })} aria-current={page.kind === 'metrics' ? 'page' : undefined}>{l('Metrics', '数据与统计')}</a></nav>
      <div className="header-actions"><a className="language-switch" href={route({ ...page, kind: page.kind === 'missing' ? 'home' : page.kind, locale: locale === 'en' ? 'zh' : 'en' }) + query} lang={locale === 'en' ? 'zh-CN' : 'en'}><LanguagesIcon aria-hidden="true" />{locale === 'en' ? '简体中文' : 'English'}</a>
        {catalog.repository && <Button asChild variant="outline"><External href={catalog.repository} locale={locale} kind="site_repository" aria-label={l('Star on GitHub', '在 GitHub 上 Star')}><GitHubIcon data-icon="inline-start" />GitHub</External></Button>}</div>
    </header>
    <main id="main" className="page-shell">{page.kind === 'home' ? <Home locale={locale} /> :
      page.kind === 'catalog' || page.kind === 'direction' ? <Listing page={page} /> :
      page.kind === 'resource' ? <Detail page={page} /> : page.kind === 'metrics' ? <Metrics locale={locale} /> :
      <Empty><EmptyHeader><EmptyTitle role="heading" aria-level={1}>404</EmptyTitle><EmptyDescription>{l('This page could not be found.', '找不到这个页面。')}</EmptyDescription></EmptyHeader><EmptyContent><Button asChild><a href={local(locale + '/catalog/')}>{l('Back to the catalog', '返回资源库')}</a></Button></EmptyContent></Empty>}</main>
    <footer className="site-footer"><div><strong>Awesome Chip Agents</strong><p>{l('An open catalog for the chip agent community.', '为芯片 Agent 社区共同维护的开放资源库。')}</p></div>
      <div><span>{l('Original content: MIT · Linked resources retain their own terms.', '原创内容采用 MIT；所链接资源保留各自条款。')}</span>
        <small>{l('Content revision: ', '内容版本：')}{catalog.revision.slice(0, 7) || 'local'}{catalog.working_tree ? l(' · local changes', ' · 含本地修改') : ''}</small>
        {catalog.repository && <External href={repoLink('/blob/HEAD/CONTRIBUTING.md')} locale={locale} kind="contribute">{l('Contributing guide', '贡献指南')}</External>}</div>
    </footer>
  </>;
}
