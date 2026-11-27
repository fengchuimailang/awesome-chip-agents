import { useEffect, useRef, useState } from 'react';
import type { Graph, GraphData, IElementEvent } from '@antv/g6';
import { LocateFixedIcon, Maximize2Icon, Minimize2Icon, RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { entityColors, entityLabels, relationColors, type GraphView } from '@/lib/graph-state';
import { label, text, type Locale } from '@/model';

type Props = { view: GraphView; selected: string; locale: Locale; onSelect: (id: string) => void; frameKey: string; expanded: boolean; onFullscreen: () => void };

export function GraphCanvas({ view, selected, locale, onSelect, frameKey, expanded, onFullscreen }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [revision, setRevision] = useState(0);
  const callback = useRef(onSelect);
  callback.current = onSelect;
  const queue = useRef(Promise.resolve());
  const positions = useRef(new Map<string, { x: number; y: number }>());
  const previousLayout = useRef(-1);
  const previousTopology = useRef('');
  const previousFrame = useRef('');
  const l = (en: string, zh: string) => text(locale, en, zh);

  useEffect(() => {
    let cancelled = false;
    let instance: Graph | undefined;
    let observer: ResizeObserver | undefined;
    void import('@antv/g6').then(({ Graph }) => {
      if (cancelled || !container.current) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      instance = new Graph({
        container: container.current, width: container.current.clientWidth, height: container.current.clientHeight,
        animation: false, padding: 40, zoomRange: [0.15, 4],
        layout: { type: 'd3-force', iterations: 180, alphaDecay: 0.07, link: { distance: 110, strength: 0.35 },
          manyBody: { strength: -200 }, collide: { radius: 36, strength: 0.8 }, animation: !reduceMotion },
        behaviors: ['drag-canvas', 'zoom-canvas', reduceMotion ? 'drag-element' : 'drag-element-force'],
        node: { type: 'circle' }, edge: { type: 'quadratic' },
      });
      instance.on('node:click', event => callback.current(String((event as IElementEvent).target.id)));
      instance.on('edge:click', event => callback.current(String((event as IElementEvent).target.id)));
      instance.on('canvas:click', () => callback.current(''));
      observer = new ResizeObserver(() => {
        if (instance && !instance.destroyed && container.current) {
          instance.resize(container.current.clientWidth, container.current.clientHeight);
          if (previousLayout.current >= 0 && instance.getNodeData().length) void instance.fitView({}, false).catch(() => {});
        }
      });
      observer.observe(container.current);
      setGraph(instance);
    }).catch(() => { if (!cancelled) setState('error'); });
    return () => { cancelled = true; observer?.disconnect(); instance?.destroy(); };
  }, []);

  useEffect(() => {
    if (!graph) return;
    let cancelled = false;
    queue.current = queue.current.catch(() => {}).then(async () => {
      if (cancelled || graph.destroyed) return;
      for (const node of graph.getNodeData()) {
        const x = Number(node.style?.x), y = Number(node.style?.y);
        if (Number.isFinite(x) && Number.isFinite(y)) positions.current.set(node.id, { x, y });
      }
      const adjacent = new Set<string>([selected]);
      for (const edge of view.edges) if (edge.id === selected || edge.source === selected || edge.target === selected) {
        adjacent.add(edge.id); adjacent.add(edge.source); adjacent.add(edge.target);
      }
      const topology = JSON.stringify([view.nodes.map(node => node.id).sort(), view.edges.map(edge => [edge.id, edge.source, edge.target]).sort()]);
      const force = previousLayout.current !== revision || previousTopology.current !== topology;
      const data: GraphData = {
        nodes: view.nodes.map((node, i) => {
          let position = positions.current.get(node.id);
          if (!position) {
            const neighbor = view.edges.find(e => e.source === node.id && positions.current.has(e.target) || e.target === node.id && positions.current.has(e.source));
            const near = neighbor ? positions.current.get(neighbor.source === node.id ? neighbor.target : neighbor.source) : undefined;
            const centerX = (container.current?.clientWidth || 0) / 2;
            const centerY = (container.current?.clientHeight || 0) / 2;
            const radius = near ? 80 : 15 * Math.sqrt(i + 1);
            position = { x: (near?.x ?? centerX) + radius * Math.cos(i * 2.4), y: (near?.y ?? centerY) + radius * Math.sin(i * 2.4) };
          }
          return { id: node.id, data: { kind: node.kind }, style: {
            ...position, size: node.kind === 'resource' ? 24 : 18,
            fill: entityColors[node.kind], stroke: entityColors[node.kind],
            lineWidth: view.status[node.id] === 'added' ? 5 : selected === node.id ? 4 : 1,
            lineDash: view.status[node.id] === 'context' ? [3, 2] : undefined,
            halo: selected === node.id, haloStroke: entityColors[node.kind], haloLineWidth: 8,
            opacity: selected && !adjacent.has(node.id) ? 0.25 : 1,
            labelText: label(node.label, locale), labelPlacement: 'bottom', labelFontSize: 12,
            labelFill: '#19352d', labelMaxWidth: 140, labelWordWrap: true, labelMaxLines: 2,
            labelBackground: true, labelBackgroundFill: '#ffffff', labelBackgroundOpacity: 0.85,
          } };
        }),
        edges: view.edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target, style: {
          stroke: relationColors[edge.kind], lineWidth: edge.id === selected ? 4 : view.status[edge.id] === 'added' ? 3 : 1.4,
          opacity: selected && !adjacent.has(edge.id) ? 0.12 : 0.65,
          lineDash: view.status[edge.id] === 'removed' ? [8, 5] : view.status[edge.id] === 'context' ? [3, 3] : undefined,
          endArrow: edge.kind !== 'RELATED_TO', endArrowSize: 5, curveOffset: 10,
        } })),
      };
      graph.setData(data);
      if (data.nodes?.length && force) {
        await graph.draw();
        if (!cancelled && !graph.destroyed) {
          if (previousFrame.current !== frameKey || previousLayout.current < 0) await graph.fitView({}, false);
          setState('ready');
        }
        await graph.render();
        previousLayout.current = revision;
        previousTopology.current = topology;
      } else await graph.draw();
      if (!cancelled && !graph.destroyed && data.nodes?.length && previousFrame.current !== frameKey) {
        await graph.fitView({}, false);
        previousFrame.current = frameKey;
      }
      if (!cancelled && !graph.destroyed) setState('ready');
    }).catch(() => { if (!cancelled && !graph.destroyed) setState('error'); });
    return () => { cancelled = true; };
  }, [graph, view, selected, locale, revision, frameKey]);

  const act = (action: () => Promise<void>) => { if (graph && !graph.destroyed) void action().catch(() => setState('error')); };
  return <div className="graph-viewport">
    <div ref={container} className="graph-canvas" role="img" aria-label={l('Interactive force-directed knowledge graph. Use the entity and relation lists below for keyboard navigation.', '可交互的力导向知识图谱。键盘浏览请使用下方实体与关系列表。')} data-state={state} />
    {state !== 'ready' && <p className="graph-loading" role="status">{state === 'error' ? l('Graph unavailable. The lists below remain usable.', '图形暂不可用，可继续使用下方列表。') : l('Arranging the graph…', '正在排列图谱…')}</p>}
    {state === 'ready' && !view.nodes.length && <p className="graph-loading" role="status">{l('No matches. Adjust the dates or filters.', '暂无匹配，请调整日期或筛选。')}</p>}
    <div className="graph-canvas-legend" aria-label={l('Visible entity types', '当前实体图例')}>
      {[...new Set(view.nodes.map(node => node.kind))].map(kind => <span key={kind}><i className="graph-dot" style={{ background: entityColors[kind] }} aria-hidden="true" />{label(entityLabels[kind], locale)}</span>)}
    </div>
    <div className="graph-tools" aria-label={l('Graph controls', '图形操作')}>
      <Button variant="outline" size="icon" title={expanded ? l('Exit fullscreen', '退出全屏') : l('Fullscreen', '全屏')} aria-label={expanded ? l('Exit fullscreen', '退出全屏') : l('Fullscreen', '全屏')} onClick={onFullscreen}>{expanded ? <Minimize2Icon /> : <Maximize2Icon />}</Button>
      <Button variant="outline" size="icon" title={l('Zoom in', '放大')} disabled={!graph || !view.nodes.length} aria-label={l('Zoom in', '放大')} onClick={() => act(() => graph!.zoomTo(graph!.getZoom() * 1.3, false))}><ZoomInIcon /></Button>
      <Button variant="outline" size="icon" title={l('Zoom out', '缩小')} disabled={!graph || !view.nodes.length} aria-label={l('Zoom out', '缩小')} onClick={() => act(() => graph!.zoomTo(graph!.getZoom() / 1.3, false))}><ZoomOutIcon /></Button>
      <Button variant="outline" size="icon" title={l('Fit', '适应画布')} aria-label={l('Fit', '适应画布')} disabled={!graph || !view.nodes.length} onClick={() => act(() => graph!.fitView({}, false))}><LocateFixedIcon /></Button>
      <Button variant="outline" size="icon" title={l('Rearrange', '重新排列')} aria-label={l('Rearrange', '重新排列')} disabled={!graph || !view.nodes.length} onClick={() => setRevision(r => r + 1)}><RotateCcwIcon /></Button>
    </div>
  </div>;
}
