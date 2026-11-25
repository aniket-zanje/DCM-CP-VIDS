import React from 'react';

/* Master-Slave Flip-Flop page — standalone React component.
   No ConverterKit, React Router, or other project-file dependencies. */

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
      <path d="M0 0 H25 A20 20 0 0 1 25 40 H0 Z" fill={C.accentSoft} stroke="#475569" strokeWidth="1.7" />
      <circle cx="49" cy="20" r="5" fill="#fff" stroke="#475569" strokeWidth="1.7" />
      <text x="13" y="25" textAnchor="middle" fontSize="8" fontWeight="800" fill="#475569">AND</text>
      <text x="20" y="-6" textAnchor="middle" fontSize="9" fontWeight="800" fill={C.accent}>{label}</text>
    </g>
  );
}

function Inverter({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -11 L23 0 L0 11 Z" fill={C.accentSoft} stroke="#475569" strokeWidth="1.7" />
      <circle cx="29" cy="0" r="5" fill="#fff" stroke="#475569" strokeWidth="1.7" />
      <text x="11" y="-16" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.muted}>NOT</text>
    </g>
  );
}

function MasterSlaveCircuit() {
  return (
    <svg viewBox="0 0 900 390" role="img" aria-label="Conceptual master-slave JK flip-flop with master and slave NAND latch stages"
      style={{ width: '100%', minWidth: 650, display: 'block', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10 }}>
      <defs><marker id="ms-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#475569" /></marker></defs>

      <rect x="150" y="45" width="290" height="250" rx="12" fill="#faf8ff" stroke="#c4b5fd" strokeWidth="1.6" />
      <rect x="520" y="45" width="280" height="250" rx="12" fill={C.greenSoft} stroke="#86efac" strokeWidth="1.6" />
      <text x="295" y="70" textAnchor="middle" fontSize="14" fontWeight="850" fill={C.accent}>MASTER LATCH</text>
      <text x="660" y="70" textAnchor="middle" fontSize="14" fontWeight="850" fill={C.green}>SLAVE LATCH</text>

      <text x="22" y="125" fontSize="14" fontWeight="800" fill={C.ink}>J</text>
      <text x="22" y="245" fontSize="14" fontWeight="800" fill={C.ink}>K</text>
      <text x="15" y="188" fontSize="12" fontWeight="800" fill={C.ink}>CLK</text>
      <path d="M43 120 H180" stroke="#475569" strokeWidth="2" fill="none" />
      <path d="M43 240 H180" stroke="#475569" strokeWidth="2" fill="none" />
      <path d="M53 182 H110 V105 H180 M110 182 V255 H180" stroke="#475569" strokeWidth="2" fill="none" />
      <circle cx="110" cy="182" r="4" fill="#475569" />

      <Nand x={180} y={100} label="NAND 1" />
      <Nand x={180} y={220} label="NAND 2" />
      <Nand x={330} y={125} label="NAND 3" />
      <Nand x={330} y={205} label="NAND 4" />
      <path d="M234 120 H305 V145 H330 M234 240 H305 V225 H330" stroke="#475569" strokeWidth="2" fill="none" />
      <path d="M384 145 H410 V185 H384 M384 225 H420 V165 H384" stroke="#64748b" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
      <text x="295" y="280" textAnchor="middle" fontSize="10" fill={C.muted}>Feedback-controlled storage</text>

      <path d="M384 145 H475 V130 H550 M384 225 H475 V240 H550" stroke="#475569" strokeWidth="2" fill="none" markerEnd="url(#ms-arrow)" />
      <text x="465" y="118" fontSize="11" fontWeight="800" fill={C.accent}>Master outputs</text>

      <Nand x={550} y={100} label="NAND 5" />
      <Nand x={550} y={220} label="NAND 6" />
      <Nand x={700} y={125} label="NAND 7" />
      <Nand x={700} y={205} label="NAND 8" />
      <path d="M604 120 H675 V145 H700 M604 240 H675 V225 H700" stroke="#475569" strokeWidth="2" fill="none" />
      <path d="M754 145 H780 V185 H754 M754 225 H790 V165 H754" stroke="#64748b" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
      <path d="M754 145 H835 M754 225 H835" stroke={C.green} strokeWidth="2.2" fill="none" />
      <text x="844" y="150" fontSize="15" fontWeight="850" fill={C.green}>Q</text>
      <text x="844" y="230" fontSize="15" fontWeight="850" fill={C.green}>Q̅</text>

      <path d="M80 182 V335 H480 V182 H500" stroke="#475569" strokeWidth="1.8" fill="none" />
      <Inverter x={500} y={182} />
      <path d="M534 182 H545 V90 H565 M545 182 V270 H565" stroke="#475569" strokeWidth="1.8" fill="none" />
      <text x="300" y="358" textAnchor="middle" fontSize="11" fill={C.muted}>CLK drives master; inverted CLK drives slave</text>
      <text x="660" y="280" textAnchor="middle" fontSize="10" fill={C.muted}>Final output is taken from slave</text>
    </svg>
  );
}

const sequence = [[1, 0], [0, 0], [1, 1], [1, 1], [0, 1], [0, 0], [1, 1]];
function nextState(q, j, k) {
  if (j === 0 && k === 0) return q;
  if (j === 0 && k === 1) return 0;
  if (j === 1 && k === 0) return 1;
  return 1 - q;
}
const qValues = (() => {
  let q = 0;
  return sequence.map(([j, k]) => { q = nextState(q, j, k); return q; });
})();
const characteristicRows = [0, 1].flatMap(q => [0, 1].flatMap(j => [0, 1].map(k => [q, j, k, nextState(q, j, k)])));

function TimingDiagram() {
  const x0 = 90, cw = 82, top = 30, rowH = 48;
  const rows = [
    { name: 'CLK', type: 'clock' },
    { name: 'J', type: 'input', values: sequence.map(v => v[0]) },
    { name: 'K', type: 'input', values: sequence.map(v => v[1]) },
    { name: 'Q', type: 'output', values: qValues, initial: 0 },
    { name: 'Q̅', type: 'output', values: qValues.map(v => 1 - v), initial: 1 },
  ];
  const width = x0 + cw * sequence.length + 20;
  const height = top + rowH * rows.length + 20;
  const y = (r, value) => top + r * rowH + (value ? 7 : 29);
  const fallingEdge = i => x0 + i * cw + cw / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Master-slave JK flip-flop timing diagram with output changing at falling clock edges"
      style={{ width: '100%', minWidth: 620, display: 'block', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10 }}>
      {sequence.map((_, i) => <g key={i}>
        <line x1={fallingEdge(i)} y1="18" x2={fallingEdge(i)} y2={height - 15} stroke={C.line} strokeDasharray="4 4" />
        <text x={fallingEdge(i)} y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill={C.accent}>{i + 1}</text>
      </g>)}
      {rows.map((row, ri) => {
        let pts = [];
        if (row.type === 'clock') {
          for (let i = 0; i < sequence.length; i++) {
            const start = x0 + i * cw;
            pts.push([start, y(ri, 1)], [start + cw / 2, y(ri, 1)], [start + cw / 2, y(ri, 0)], [start + cw, y(ri, 0)]);
          }
        } else if (row.type === 'input') {
          row.values.forEach((v, i) => pts.push([x0 + i * cw, y(ri, v)], [x0 + (i + 1) * cw, y(ri, v)]));
        } else {
          pts.push([x0, y(ri, row.initial)], [fallingEdge(0), y(ri, row.initial)]);
          row.values.forEach((v, i) => pts.push([fallingEdge(i), y(ri, v)], [Math.min(fallingEdge(i) + cw, x0 + cw * sequence.length), y(ri, v)]));
        }
        const stroke = row.type === 'output' ? C.green : row.type === 'input' ? C.accent : C.ink;
        return <g key={row.name}>
          <text x="72" y={top + ri * rowH + 22} textAnchor="end" fontSize="12" fontWeight="800" fill={stroke}>{row.name}</text>
          <polyline points={pts.map(p => p.join(',')).join(' ')} fill="none" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
        </g>;
      })}
      <text x={width / 2} y={height - 2} textAnchor="middle" fontSize="10" fill={C.muted}>Output Q updates at each falling edge (↓)</text>
    </svg>
  );
}

const related = [
  { to: '/topics/flip-flops/jk', title: 'JK Flip-Flop', detail: 'The basic JK operation and race-around condition.' },
  { to: '/topics/flip-flops/d', title: 'D Flip-Flop', detail: 'Stores the data input at the active clock edge.' },
  { to: '/topics/flip-flops/t', title: 'T Flip-Flop', detail: 'A toggle flip-flop used in counters.' },
  { to: '/topics/flip-flops/sr', title: 'SR Flip-Flop', detail: 'The basic set-reset storage element.' },
];

export default function MasterSlavePage() {
  return (
    <PageShell
      title="Master-Slave Flip-Flop"
      lead="A two-stage flip-flop in which the master and slave operate on opposite clock phases, allowing the output to update only once per clock cycle."
      prev={{ to: '/topics/flip-flops/t', title: 'T Flip-Flop' }}
      next={{ to: '/topics/flip-flops', title: 'Flip-Flops overview' }}
    >
      <Card kicker="01 · Introduction" title="What is a Master-Slave Flip-Flop?">
        <P>A master-slave flip-flop is made by connecting two level-sensitive latches in series. The first latch is called the master and the second is called the slave. They are enabled during opposite clock phases.</P>
        <Bullets items={[
          <>The master accepts input data while <Mono>CLK = 1</Mono>.</>,
          <>The slave is controlled by the inverted clock and accepts the master's stored value while <Mono>CLK = 0</Mono>.</>,
          <>The output is taken from the slave stage.</>,
          <>Because the two stages are not transparent at the same time, changes at the input do not pass directly to the output.</>,
          <>In a master-slave JK flip-flop, this arrangement prevents repeated toggling during one clock pulse.</>,
        ]} />
      </Card>

      <Card kicker="02 · Construction" title="Block diagram and logic circuit">
        <P>The master latch receives the external inputs. Its output is connected to the slave latch. An inverter supplies the complementary clock phase to the slave.</P>
        <div style={{ overflowX: 'auto', margin: '14px 0' }}><MasterSlaveCircuit /></div>
        <Bullets items={[
          <>The master stage stores the input information during its enabled clock phase.</>,
          <>The inverter produces the complementary clock signal for the slave stage.</>,
          <>When the master closes, the slave opens and transfers the stored state to the output.</>,
          <>The final outputs Q and Q̅ are taken from the slave latch.</>,
        ]} />
        <div style={{ marginTop: 13, padding: 12, borderRadius: 9, background: C.amberSoft, border: '1px solid #fde68a', color: '#92400e', fontSize: 12, lineHeight: 1.65 }}>
          <b>Diagram note:</b> This is a conceptual NAND-based master-slave structure showing the two latch stages and clock inversion. Gate-level implementations may vary.
        </div>
      </Card>

      <Card kicker="03 · Working" title="Working principle">
        <P>The master and slave are never enabled at the same time. In the positive-clock master / inverted-clock slave arrangement shown here, the external output changes when the clock goes from HIGH to LOW.</P>
        <DataTable headers={['Clock condition', 'Master latch', 'Slave latch', 'Output Q']} rows={[
          ['CLK = 1', 'Enabled; accepts inputs', 'Disabled; holds state', 'Unchanged'],
          ['Falling edge (↓)', 'Closes and stores state', 'Opens and copies master', 'Updates'],
          ['CLK = 0', 'Disabled; holds state', 'Enabled; follows master', 'Stable at stored state'],
        ]} leftColumns={[0, 1, 2, 3]} minWidth={600} />
        <Bullets items={[
          <>When CLK is HIGH, the master responds to the input while the slave isolates the output.</>,
          <>At the falling edge, the master stops accepting new input and the slave transfers the master's state.</>,
          <>While CLK is LOW, the master holds its state and the slave maintains the output.</>,
          <>The output therefore updates once per clock cycle, at the falling edge.</>,
        ]} />
      </Card>

      <Card kicker="04 · Truth table" title="Truth table of Master-Slave JK Flip-Flop">
        <P>The JK master-slave flip-flop has the same input operations as a JK flip-flop. The output state is updated at the falling edge of the clock.</P>
        <DataTable headers={['Clock event', 'J', 'K', 'Q(next)', 'Operation']} rows={[
          ['No falling edge', 'X', 'X', 'Q(previous)', 'Hold'],
          ['Falling edge (↓)', 0, 0, 'Q(previous)', 'No change'],
          ['Falling edge (↓)', 0, 1, 0, 'Reset'],
          ['Falling edge (↓)', 1, 0, 1, 'Set'],
          ['Falling edge (↓)', 1, 1, 'Q̅(previous)', 'Toggle'],
        ]} leftColumns={[4]} minWidth={540} />
        <P muted>X means either 0 or 1.</P>
      </Card>

      <Card kicker="05 · Tables" title="Characteristic and excitation tables">
        <P>The characteristic equation describes the next state of a JK master-slave flip-flop. The equation is evaluated at the active falling edge.</P>
        <div style={{ padding: 14, borderRadius: 9, border: '1px solid #ddd6fe', background: C.accentSoft, color: '#5b21b6', textAlign: 'center', fontSize: 17, fontWeight: 850, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          Q(next) = JQ̅ + K̅Q
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18, marginTop: 16 }}>
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
        <P muted>The excitation table gives the required J and K inputs for a desired state transition. X represents a don't-care value.</P>
      </Card>

      <Card kicker="06 · Timing" title="Timing diagram">
        <P>The waveform shows the master-slave JK operation. J and K are stable around the active falling edge, and Q updates at that edge.</P>
        <div style={{ overflowX: 'auto', margin: '14px 0' }}><TimingDiagram /></div>
        <P muted>Illustrative input sequence: set, hold, toggle, toggle, reset, hold and toggle. The output changes on falling clock edges.</P>
      </Card>

      <Card kicker="07 · Race-around" title="How does it eliminate race-around?">
        <P>In a level-triggered JK flip-flop, J = K = 1 can cause repeated toggling while the clock remains active. The master-slave arrangement prevents this by isolating the input stage from the output stage.</P>
        <Bullets items={[
          <>While the clock is HIGH, the master is enabled but the slave is disabled. The external output cannot feed through and cause repeated output changes.</>,
          <>At the falling edge, the master closes before the slave transfers the stored state.</>,
          <>The slave transfers the master's value once, so the external output changes only once per clock cycle.</>,
          <>This prevents the race-around condition in the intended master-slave operation.</>,
        ]} />
      </Card>

      <Card kicker="08 · Advantages" title="Advantages">
        <Bullets items={[
          'Prevents the race-around condition in the JK master-slave arrangement.',
          'The output changes only once per clock cycle.',
          'The master and slave operate on opposite clock phases.',
          'Useful for understanding and constructing sequential circuits.',
        ]} />
      </Card>

      <Card kicker="09 · Disadvantages" title="Disadvantages">
        <Bullets warning items={[
          'It requires two latch stages, increasing circuit complexity.',
          'It uses more gates and may consume more power than a single latch.',
          'The signal passes through two stages, adding propagation delay.',
          'The input must satisfy the setup and hold requirements of the master stage.',
        ]} />
      </Card>

      <Card kicker="10 · Applications" title="Applications">
        <Bullets items={[
          'Counters and registers in sequential digital systems.',
          'Frequency-divider circuits using the toggle mode.',
          'Control circuits that require one state update per clock cycle.',
          'Digital systems and educational demonstrations of race-around prevention.',
        ]} />
      </Card>

      <Card kicker="11 · Related topics" title="Continue learning">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 11 }}>
          {related.map(item => (
            <a key={item.to} href={item.to} style={{ display: 'block', padding: 14, borderRadius: 10, border: `1px solid ${C.line}`, background: '#fff', textDecoration: 'none' }}>
              <div style={{ color: C.accent, fontSize: 14, fontWeight: 800 }}>{item.title}</div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.55, marginTop: 5 }}>{item.detail}</div>
            </a>
          ))}
        </div>
      </Card>

      <footer style={{ textAlign: 'center', color: C.muted, fontSize: 11, paddingTop: 24 }}>
        Digital Electronics · Flip-Flops · Master-Slave Flip-Flop
      </footer>
    </PageShell>
  );
}
