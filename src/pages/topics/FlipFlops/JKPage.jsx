import React from 'react';

/* JK Flip-Flop page — self-contained React component. No project-specific imports. */

const C = {
  accent: '#7c3aed',
  accentSoft: '#f5f3ff',
  green: '#15803d',
  greenSoft: '#f0fdf4',
  ink: '#172033',
  text: '#334155',
  muted: '#64748b',
  line: '#e2e8f0',
  page: '#f8fafc',
  amber: '#b45309',
  amberSoft: '#fffbeb',
};

function PageShell({ title, lead, prev, next, children }) {
  return (
    <main style={{ minHeight: '100vh', background: C.page, padding: '28px 18px 56px', color: C.ink, fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <header style={{ marginBottom: 22 }}>
          <div style={{ display: 'inline-block', padding: '5px 10px', borderRadius: 7, background: C.accentSoft, color: C.accent, fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', marginBottom: 12 }}>DIGITAL ELECTRONICS · FLIP-FLOPS</div>
          <h1 style={{ margin: '0 0 9px', fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 850 }}>{title}</h1>
          <p style={{ margin: 0, maxWidth: 760, color: C.muted, fontSize: 15, lineHeight: 1.7 }}>{lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 17 }}>
            {prev && <a href={prev.to} style={{ color: C.accent, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>← Previous: {prev.title}</a>}
            {next && <a href={next.to} style={{ color: C.accent, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Next: {next.title} →</a>}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

function Card({ kicker, title, children }) {
  return (
    <section style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 13, padding: '21px 23px', marginTop: 16, boxShadow: '0 1px 2px rgba(15,23,42,.035)' }}>
      {kicker && <div style={{ color: C.accent, fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 7 }}>{kicker}</div>}
      <h2 style={{ color: C.ink, fontSize: 20, lineHeight: 1.3, fontWeight: 780, margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  );
}

function P({ children, muted = false }) {
  return <p style={{ color: muted ? C.muted : C.text, fontSize: 14, lineHeight: 1.75, margin: '8px 0' }}>{children}</p>;
}

function Mono({ children }) {
  return <code style={{ color: '#6d28d9', background: C.accentSoft, borderRadius: 4, padding: '1px 5px', fontSize: '.94em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</code>;
}

function Bullets({ items, warning = false }) {
  return (
    <ul style={{ margin: '10px 0 2px', paddingLeft: 21, display: 'grid', gap: 8 }}>
      {items.map((item, index) => <li key={index} style={{ color: C.text, fontSize: 14, lineHeight: 1.65, paddingLeft: 2 }}><span style={{ color: warning ? C.amber : C.accent, fontWeight: 900 }}>{warning ? '! ' : '• '}</span>{item}</li>)}
    </ul>
  );
}

function DataTable({ headers, rows, leftColumns = [], minWidth = 360 }) {
  const cell = { padding: '10px 11px', borderBottom: `1px solid ${C.line}`, fontSize: 13, color: C.text };
  return (
    <div style={{ overflowX: 'auto', marginTop: 10 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth }}>
        <thead><tr>{headers.map((header, i) => <th key={i} style={{ ...cell, background: '#f8fafc', color: C.muted, fontWeight: 800, textAlign: leftColumns.includes(i) ? 'left' : 'center' }}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, ri) => <tr key={ri}>{row.map((value, ci) => <td key={ci} style={{ ...cell, textAlign: leftColumns.includes(ci) ? 'left' : 'center', fontWeight: ci === row.length - 1 && !leftColumns.includes(ci) ? 750 : 500, color: ci === row.length - 1 && !leftColumns.includes(ci) ? C.accent : C.text }}>{value}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Nand({ x, y, label }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 H28 A22 22 0 0 1 28 44 H0 Z" fill={C.accentSoft} stroke="#475569" strokeWidth="1.8" />
      <circle cx="54" cy="22" r="5" fill="#fff" stroke="#475569" strokeWidth="1.8" />
      <text x="15" y="27" textAnchor="middle" fontSize="9" fontWeight="800" fill="#475569">AND</text>
      <text x="23" y="-7" textAnchor="middle" fontSize="10" fontWeight="800" fill={C.accent}>{label}</text>
    </g>
  );
}

function JKDiagram() {
  return (
    <svg viewBox="0 0 820 360" role="img" aria-label="Conceptual NAND gate implementation of JK flip-flop with feedback"
      style={{ width: '100%', minWidth: 620, display: 'block', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10 }}>
      <defs><marker id="jk-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#475569" /></marker></defs>

      <text x="22" y="91" fontSize="14" fontWeight="800" fill={C.ink}>J</text>
      <text x="22" y="267" fontSize="14" fontWeight="800" fill={C.ink}>K</text>
      <text x="22" y="180" fontSize="13" fontWeight="800" fill={C.ink}>CLK</text>

      <path d="M45 86 H150 V100 H205" fill="none" stroke="#475569" strokeWidth="2" />
      <path d="M45 262 H150 V250 H205" fill="none" stroke="#475569" strokeWidth="2" />
      <path d="M60 175 H120 V130 H205" fill="none" stroke="#475569" strokeWidth="2" />
      <path d="M120 175 V220 H205" fill="none" stroke="#475569" strokeWidth="2" />
      <circle cx="120" cy="175" r="4" fill="#475569" />

      <Nand x={205} y={82} label="NAND 1" />
      <Nand x={205} y={228} label="NAND 2" />
      <path d="M264 104 H350 V125 H430" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#jk-arrow)" />
      <path d="M264 250 H350 V235 H430" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#jk-arrow)" />
      <text x="370" y="116" fontSize="12" fontWeight="800" fill={C.accent}>S̅</text>
      <text x="370" y="253" fontSize="12" fontWeight="800" fill={C.accent}>R̅</text>

      <rect x="430" y="65" width="350" height="250" rx="12" fill={C.greenSoft} stroke="#86efac" strokeWidth="1.8" />
      <text x="605" y="91" textAnchor="middle" fontSize="14" fontWeight="850" fill="#166534">CROSS-COUPLED NAND SR LATCH</text>
      <Nand x={485} y={115} label="NAND 3" />
      <Nand x={485} y={225} label="NAND 4" />
      <path d="M544 137 H700" stroke={C.green} strokeWidth="2.2" fill="none" />
      <path d="M544 247 H700" stroke={C.green} strokeWidth="2.2" fill="none" />
      <text x="710" y="142" fontSize="15" fontWeight="850" fill={C.green}>Q</text>
      <text x="710" y="252" fontSize="15" fontWeight="850" fill={C.green}>Q̅</text>
      <path d="M700 137 V185 H670 V247 H544" stroke="#64748b" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
      <path d="M700 247 V290 H650 V137 H544" stroke="#64748b" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
      <text x="605" y="300" textAnchor="middle" fontSize="10" fill={C.muted}>Feedback from Q and Q̅ controls the input gates</text>

      <path d="M744 137 H790" stroke={C.green} strokeWidth="2" />
      <path d="M744 247 H790" stroke={C.green} strokeWidth="2" />
      <text x="24" y="334" fontSize="11" fill={C.muted}>Conceptual diagram: input gating uses J, K, CLK and output feedback.</text>
    </svg>
  );
}

const inputSequence = [[1, 0], [0, 0], [1, 1], [1, 1], [0, 1], [0, 0], [1, 1]];
function getNextState(q, j, k) {
  if (j === 0 && k === 0) return q;
  if (j === 0 && k === 1) return 0;
  if (j === 1 && k === 0) return 1;
  return 1 - q;
}
const outputSequence = (() => {
  let q = 0;
  return inputSequence.map(([j, k]) => {
    q = getNextState(q, j, k);
    return q;
  });
})();

function TimingDiagram() {
  const x0 = 100;
  const cycleWidth = 82;
  const rowHeight = 48;
  const top = 28;
  const rows = [
    { name: 'CLK', kind: 'clock' },
    { name: 'J', kind: 'input', values: inputSequence.map(([j]) => j) },
    { name: 'K', kind: 'input', values: inputSequence.map(([, k]) => k) },
    { name: 'Q', kind: 'output', values: outputSequence, initial: 0 },
    { name: 'Q̅', kind: 'output', values: outputSequence.map(v => 1 - v), initial: 1 },
  ];
  const width = x0 + cycleWidth * inputSequence.length + 20;
  const height = top + rowHeight * rows.length + 16;
  const yFor = (row, value) => top + row * rowHeight + (value ? 7 : 29);
  const edge = (i) => x0 + i * cycleWidth + cycleWidth / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="JK flip-flop timing diagram"
      style={{ width: '100%', minWidth: 620, display: 'block', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10 }}>
      {inputSequence.map((_, i) => <g key={i}>
        <line x1={edge(i)} y1="18" x2={edge(i)} y2={height - 10} stroke={C.line} strokeDasharray="4 4" />
        <text x={edge(i)} y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill={C.accent}>{i + 1}</text>
      </g>)}
      {rows.map((row, ri) => {
        let points = [];
        if (row.kind === 'clock') {
          for (let i = 0; i < inputSequence.length; i++) {
            const start = x0 + i * cycleWidth;
            points.push([start, yFor(ri, 0)], [start + cycleWidth / 2, yFor(ri, 0)], [start + cycleWidth / 2, yFor(ri, 1)], [start + cycleWidth, yFor(ri, 1)]);
          }
        } else if (row.kind === 'input') {
          row.values.forEach((v, i) => points.push([x0 + i * cycleWidth, yFor(ri, v)], [x0 + (i + 1) * cycleWidth, yFor(ri, v)]));
        } else {
          points.push([x0, yFor(ri, row.initial)], [edge(0), yFor(ri, row.initial)]);
          row.values.forEach((v, i) => points.push([edge(i), yFor(ri, v)], [Math.min(edge(i) + cycleWidth, x0 + cycleWidth * inputSequence.length), yFor(ri, v)]));
        }
        const stroke = row.kind === 'output' ? C.green : row.kind === 'input' ? C.accent : C.ink;
        return <g key={row.name}>
          <text x="82" y={top + ri * rowHeight + 22} textAnchor="end" fontSize="12" fontWeight="800" fill={stroke}>{row.name}</text>
          <polyline points={points.map(p => p.join(',')).join(' ')} fill="none" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
        </g>;
      })}
      <text x={width / 2} y={height - 2} textAnchor="middle" fontSize="10" fill={C.muted}>Illustrative positive-edge-triggered JK flip-flop timing</text>
    </svg>
  );
}

const characteristicRows = [0, 1].flatMap(q => [0, 1].flatMap(j => [0, 1].map(k => [q, j, k, getNextState(q, j, k)])));
const relatedTopics = [
  { href: '/topics/flip-flops/d', title: 'D Flip-Flop', detail: 'Stores the value present at its data input.' },
  { href: '/topics/flip-flops/t', title: 'T Flip-Flop', detail: 'A JK flip-flop with J and K connected together.' },
  { href: '/topics/flip-flops/master-slave', title: 'Master-Slave Flip-Flop', detail: 'Uses two stages to control race-around.' },
  { href: '/topics/flip-flops/sr', title: 'SR Flip-Flop', detail: 'The basic set-reset storage circuit.' },
  { href: '/topics/counters', title: 'Counters', detail: 'JK flip-flops are commonly used in counter circuits.' },
  { href: '/topics/registers', title: 'Registers', detail: 'Stores and shifts groups of binary bits.' },
];

export default function JKPage() {
  return (
    <PageShell
      title="JK Flip-Flop"
      lead="An improved SR flip-flop with no invalid input state. When J and K are both 1, the output toggles."
      prev={{ to: '/topics/flip-flops/d', title: 'D Flip-Flop' }}
      next={{ to: '/topics/flip-flops/t', title: 'T Flip-Flop' }}
    >
      <Card kicker="01 · The idea" title="Theory">
        <P>The JK flip-flop is a versatile bistable sequential circuit. It performs the set, reset and hold operations of an SR flip-flop, and gives the input combination J = K = 1 a useful toggle operation.</P>
        <Bullets items={[
          <>It has two inputs: <Mono>J</Mono> (set) and <Mono>K</Mono> (reset), one clock input (CLK), and outputs Q and Q̅.</>,
          <><Mono>J = 0, K = 0</Mono>: the output does not change.</>,
          <><Mono>J = 0, K = 1</Mono>: the output resets to 0.</>,
          <><Mono>J = 1, K = 0</Mono>: the output sets to 1.</>,
          <><Mono>J = 1, K = 1</Mono>: the output toggles to its opposite state.</>,
          <>Its characteristic equation is <Mono>Q(next) = JQ̅ + K̅Q</Mono>.</>,
          <>Feedback from Q and Q̅ is used to control the input logic.</>,
        ]} />
      </Card>

      <Card kicker="02 · Logic symbol" title="JK flip-flop symbol">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, alignItems: 'center' }}>
          <svg viewBox="0 0 280 190" role="img" aria-label="JK flip-flop logic symbol" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto' }}>
            <rect x="88" y="25" width="105" height="130" rx="8" fill={C.accentSoft} stroke="#475569" strokeWidth="1.8" />
            <text x="140" y="96" textAnchor="middle" fontSize="18" fontWeight="850" fill={C.ink}>JK</text>
            <path d="M35 58 H88 M35 112 H88 M35 145 H88 M193 58 H240 M193 145 H240" stroke="#475569" strokeWidth="1.8" fill="none" />
            <path d="M88 135 L98 145 L88 155" fill="none" stroke="#475569" strokeWidth="1.8" />
            <text x="27" y="62" textAnchor="end" fontSize="13" fontWeight="800" fill={C.ink}>J</text>
            <text x="27" y="116" textAnchor="end" fontSize="13" fontWeight="800" fill={C.ink}>K</text>
            <text x="27" y="149" textAnchor="end" fontSize="11" fontWeight="800" fill={C.ink}>CLK</text>
            <text x="248" y="62" fontSize="13" fontWeight="800" fill={C.green}>Q</text>
            <text x="248" y="149" fontSize="13" fontWeight="800" fill={C.green}>Q̅</text>
          </svg>
          <Bullets items={[
            <>J is the set input.</>,
            <>K is the reset input.</>,
            <>The triangle at CLK indicates edge-triggered operation.</>,
            <>Q is the normal output and Q̅ is its complement.</>,
          ]} />
        </div>
      </Card>

      <Card kicker="03 · NAND implementation" title="Circuit using NAND gates">
        <P>A NAND-based JK circuit uses input gating with feedback and a cross-coupled NAND latch. The input logic is controlled by J, K, CLK, Q and Q̅.</P>
        <div style={{ overflowX: 'auto', margin: '14px 0' }}><JKDiagram /></div>
        <Bullets items={[
          <>The upper input path uses J and the complemented output Q̅.</>,
          <>The lower input path uses K and the output Q.</>,
          <>The cross-coupled NAND latch stores the current output state.</>,
          <>When J = K = 1, feedback causes the stored state to toggle.</>,
        ]} />
        <div style={{ marginTop: 13, padding: 12, borderRadius: 9, background: C.amberSoft, border: '1px solid #fde68a', color: '#92400e', fontSize: 12, lineHeight: 1.65 }}>
          <b>Note:</b> This is a conceptual NAND feedback diagram. A level-triggered JK implementation can exhibit race-around when J = K = 1 and the clock pulse remains active too long.
        </div>
      </Card>

      <Card kicker="04 · Truth table" title="Truth table of JK Flip-Flop">
        <P>The next state depends on J and K at the active clock edge. When the clock is inactive, the output retains its previous state.</P>
        <DataTable headers={['Clock', 'J', 'K', 'Q(next)', 'Operation']} rows={[
          ['No active edge', 'X', 'X', 'Q(previous)', 'Hold'],
          ['Active edge', 0, 0, 'Q(previous)', 'No change'],
          ['Active edge', 0, 1, 0, 'Reset'],
          ['Active edge', 1, 0, 1, 'Set'],
          ['Active edge', 1, 1, 'Q̅(previous)', 'Toggle'],
        ]} leftColumns={[4]} minWidth={520} />
        <P muted>X means either 0 or 1.</P>
      </Card>

      <Card kicker="05 · Characteristic equation" title="Characteristic and excitation tables">
        <P>The characteristic equation gives the next output state in terms of the present state and the inputs.</P>
        <div style={{ padding: 14, borderRadius: 9, border: '1px solid #ddd6fe', background: C.accentSoft, color: '#5b21b6', textAlign: 'center', fontSize: 17, fontWeight: 850, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          Q(next) = JQ̅ + K̅Q
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginTop: 16 }}>
          <div>
            <div style={{ color: C.ink, fontWeight: 800, marginBottom: 8 }}>Characteristic table</div>
            <DataTable headers={['Q', 'J', 'K', 'Q(next)']} rows={characteristicRows} />
          </div>
          <div>
            <div style={{ color: C.ink, fontWeight: 800, marginBottom: 8 }}>Excitation table</div>
            <DataTable headers={['Q', 'Q(next)', 'J', 'K']} rows={[
              [0, 0, 0, 'X'],
              [0, 1, 1, 'X'],
              [1, 0, 'X', 1],
              [1, 1, 'X', 0],
            ]} />
          </div>
        </div>
        <P muted>The excitation table shows the input values required to move from the present state to the desired next state. X represents a don't-care value.</P>
      </Card>

      <Card kicker="06 · Timing" title="Timing diagram">
        <P>J and K are set before the active rising edge. At each rising edge, Q holds, resets, sets or toggles according to the truth table.</P>
        <div style={{ overflowX: 'auto', margin: '14px 0' }}><TimingDiagram /></div>
        <P muted>Illustrated sequence: set, hold, toggle, toggle, reset, hold and toggle.</P>
      </Card>

      <Card kicker="07 · Race-around" title="The race-around condition">
        <P>In a level-triggered JK circuit, when J = K = 1, the output is expected to toggle. If the clock remains HIGH long enough, the output may toggle repeatedly during the same clock pulse.</P>
        <Bullets warning items={[
          <>The output is fed back to the input gating circuit.</>,
          <>After the output toggles, the changed feedback can trigger another toggle while the clock is still active.</>,
          <>The final output may become unpredictable because it depends on the clock pulse width and propagation delay.</>,
          <>Race-around occurs for J = K = 1 in a level-triggered implementation.</>,
          <>It can be avoided using edge-triggered operation or a master–slave JK flip-flop.</>,
        ]} />
      </Card>

      <Card kicker="08 · Advantages" title="Advantages of JK Flip-Flop">
        <Bullets items={[
          'It has no invalid input combination; all four input combinations have defined operations.',
          'It supports set, reset, hold and toggle operations.',
          'It can be configured to behave like SR, D and T flip-flops.',
          'It is useful in counter and sequential logic design.',
        ]} />
      </Card>

      <Card kicker="09 · Disadvantages" title="Disadvantages of JK Flip-Flop">
        <Bullets warning items={[
          'A level-triggered implementation can suffer from race-around when J = K = 1.',
          'It requires feedback connections, making the circuit more complex than a basic SR flip-flop.',
          'It has two input signals, J and K, to control.',
          'Reliable high-speed operation requires correct clocking and timing constraints.',
        ]} />
      </Card>

      <Card kicker="10 · Applications" title="Applications of JK Flip-Flop">
        <Bullets items={[
          'Binary counters, including ripple and synchronous counters.',
          'Frequency divider circuits; with J = K = 1, the output toggles at each active clock edge.',
          'Shift registers and sequence generators.',
          'Ring counters and Johnson counters.',
          'State machines and digital control circuits.',
        ]} />
      </Card>

      <Card kicker="11 · Conversion" title="Building other flip-flops using JK">
        <Bullets items={[
          <><Mono>T from JK</Mono>: connect J = K = T.</>,
          <><Mono>D from JK</Mono>: connect J = D and K = D̅.</>,
          <><Mono>SR from JK</Mono>: connect J = S and K = R, avoiding the J = K = 1 condition when SR behavior is required.</>,
        ]} />
      </Card>

      <Card kicker="12 · Related topics" title="Continue learning">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 11 }}>
          {relatedTopics.map(item => (
            <a key={item.href} href={item.href} style={{ display: 'block', padding: 14, borderRadius: 10, border: `1px solid ${C.line}`, background: '#fff', textDecoration: 'none' }}>
              <div style={{ color: C.accent, fontSize: 14, fontWeight: 800 }}>{item.title}</div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.55, marginTop: 5 }}>{item.detail}</div>
            </a>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
