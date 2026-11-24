/** Decorative circuit artwork; resource navigation remains in the page content. */
export function ChipIllustration() {
  const pins = Array.from({ length: 10 }, (_, i) => 112 + i * 16);
  return <div className="circuit" aria-hidden="true">
    <div className="circuit-caption"><span className="circuit-label">CHIP AGENT ATLAS</span><span className="circuit-coordinate">01 / OPEN RESEARCH</span></div>
    <svg className="circuit-board" viewBox="0 0 560 380" fill="none">
      <g className="board-traces">
        <path d="M138 70H160L180 90V128H192M422 70H400L380 90V128H368M138 310H160L180 290V240H192M422 310H400L380 290V240H368" />
        <path d="M58 118V166L90 198H176M502 118V166L470 198H384M58 262V236L82 212H176M502 262V236L478 212H384" />
        <path d="M242 92V60L222 40H178M318 92V60L338 40H382M242 276V320L218 344H112M318 276V320L342 344H448" />
        <path d="M194 60H212L226 74V92M366 60H348L334 74V92M194 320H212L226 306V276M366 320H348L334 306V276" />
        <path d="M24 152H38L62 176H144M536 152H522L498 176H416M24 228H38L62 252H144M536 228H522L498 252H416" />
      </g>
      <g className="board-trace-accent"><path d="M138 70H160L180 90V128H192M422 310H400L380 290V240H368M318 92V60L338 40H382" /></g>
      <g className="board-vias">{[[58,118],[502,118],[58,262],[502,262],[178,40],[382,40],[112,344],[448,344],[144,176],[416,176],[144,252],[416,252]].map(([cx, cy]) => <circle key={cx + '-' + cy} cx={cx} cy={cy} r="3" />)}</g>
      <g className="board-pins">{pins.map(position => <g key={position}>
        <path d={`M176 ${position}H192M368 ${position}H384`} />
        <path d={`M${position + 96} 76V92M${position + 96} 276V292`} />
      </g>)}</g>
      <rect className="board-chip-base" x="188" y="88" width="184" height="192" rx="20" />
      <rect className="board-chip" x="198" y="98" width="164" height="172" rx="14" />
      <path className="board-chip-rule" d="M218 206H342" />
      <text className="board-kicker" x="280" y="136" textAnchor="middle">LLM × CHIP DESIGN</text>
      <text className="board-title" x="280" y="184" textAnchor="middle">AGENT</text>
      <text className="board-detail" x="280" y="235" textAnchor="middle">reason · act · verify</text>
      <g className="board-nodes">{[{x:34,y:38,label:'RTL',sub:'GENERATE'},{x:422,y:38,label:'EDA',sub:'IMPLEMENT'},{x:34,y:278,label:'SPICE',sub:'SIMULATE'},{x:422,y:278,label:'MCP',sub:'CONNECT'}].map(node => <g key={node.label}>
        <rect x={node.x} y={node.y} width="104" height="64" rx="10" />
        <text x={node.x + 52} y={node.y + 27} textAnchor="middle">{node.label}</text>
        <text className="board-node-caption" x={node.x + 52} y={node.y + 46} textAnchor="middle">{node.sub}</text>
      </g>)}</g>
      <g className="board-corners"><path d="M16 32V16H32M528 16H544V32M16 348V364H32M528 364H544V348" /></g>
    </svg>
    <div className="circuit-bottom"><span className="circuit-foot">FROM IDEAS TO IMPLEMENTATION</span><span className="circuit-scale"><i /><i /><i /><i /><i /><i /><i /></span></div>
  </div>;
}
