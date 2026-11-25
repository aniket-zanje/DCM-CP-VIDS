import React from 'react';

/* All UI primitives and styles are defined in this file. */
const ACCENT = '#7c3aed';
const SECONDARY = '#64748b';
const GREEN = '#15803d';
const INK = '#172033';
const LINE = '#e2e8f0';

function PageShell({ title, lead, prev, next, children }) {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '28px 18px 56px', color: INK, fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <header style={{ marginBottom: 22 }}>
          <div style={{ display: 'inline-block', padding: '5px 10px', borderRadius: 7, background: '#f5f3ff', color: ACCENT, fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', marginBottom: 12 }}>DIGITAL ELECTRONICS · FLIP-FLOPS</div>
          <h1 style={{ margin: '0 0 9px', fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 850 }}>{title}</h1>
          <p style={{ margin: 0, maxWidth: 760, color: SECONDARY, fontSize: 15, lineHeight: 1.7 }}>{lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 17 }}>
            {prev && <a href={prev.to} style={{ color: ACCENT, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>← Previous: {prev.title}</a>}
            {next && <a href={next.to} style={{ color: ACCENT, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Next: {next.title} →</a>}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

function Card({ kicker, title, children }) {
  return (
    <section style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 13, padding: '21px 23px', marginTop: 16, boxShadow: '0 1px 2px rgba(15,23,42,.035)' }}>
      {kicker && <div style={{ color: ACCENT, fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 7 }}>{kicker}</div>}
      <h2 style={{ color: INK, fontSize: 20, lineHeight: 1.3, fontWeight: 780, margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  );
}

function P({ children, last = false }) {
  return <p style={{ color: '#334155', fontSize: 14, lineHeight: 1.75, margin: last ? '8px 0 0' : '8px 0' }}>{children}</p>;
}

function Mono({ children }) {
  return <code style={{ color: '#6d28d9', background: '#f5f3ff', borderRadius: 4, padding: '1px 5px', fontSize: '.94em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</code>;
}

function Bullets({ items }) {
  return (
    <ul style={{ margin: '10px 0 2px', paddingLeft: 21, display: 'grid', gap: 8 }}>
      {items.map((item, index) => <li key={index} style={{ color: '#334155', fontSize: 14, lineHeight: 1.65, paddingLeft: 2 }}>{item}</li>)}
    </ul>
  );
}

/* ─────────────── Shared look (all local to this file) ─────────────── */
const MUTED = '#64748b';
const W = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
const svgBox = { width: '100%', display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` };

function Dot({ x, y }) {
  return <circle cx={x} cy={y} r="3.5" fill={INK} />;
}

function Lbl({ x, y, t, color = SECONDARY, anchor = 'start', size = 13 }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="700" fill={color}>{t}</text>;
}

/* NAND gate (2 or 3 inputs): inputs on the left edge, output at (x + 44, cy) */
function Nand({ x, cy }) {
  return (
    <g transform={`translate(${x}, ${cy - 18})`}>
      <path d="M 0 0 L 18 0 A 18 18 0 0 1 18 36 L 0 36 Z" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <circle cx="40" cy="18" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <text x="20" y="-6" textAnchor="middle" fontSize="9" fontWeight="700" fill={MUTED}>NAND</text>
    </g>
  );
}

/* Inverter: input at (x, cy), output at (x + 32, cy) */
function Inv({ x, cy }) {
  return (
    <g transform={`translate(${x}, ${cy})`}>
      <path d="M 0 -11 L 24 0 L 0 11 Z" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <circle cx="28" cy="0" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <text x="12" y="-15" textAnchor="middle" fontSize="9" fontWeight="700" fill={MUTED}>NOT</text>
    </g>
  );
}

/* ─────────────── Logic symbol ─────────────── */
function Symbol({ ins, name, bubble = false }) {
  const first = 34, gap = 28;
  const clkY = first + gap * ins.length;
  const bottom = clkY + 18;
  const mid = (14 + bottom) / 2;
  return (
    <svg viewBox={`0 0 260 ${bottom + 16}`} style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto' }} role="img" aria-label={`${name} flip-flop symbol`}>
      <rect x="80" y="14" width="90" height={bottom - 14} rx="6" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <text x="125" y={mid + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{name}</text>
      {ins.map((l, i) => (
        <g key={l}>
          <line x1="40" y1={first + gap * i} x2="80" y2={first + gap * i} {...W} />
          <Lbl x={34} y={first + gap * i + 4} t={l} anchor="end" />
        </g>
      ))}
      <line x1="40" y1={clkY} x2={bubble ? 72 : 80} y2={clkY} {...W} />
      {bubble && <circle cx="76" cy={clkY} r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />}
      <path d={`M 80 ${clkY - 7} L 90 ${clkY} L 80 ${clkY + 7}`} fill="none" stroke={INK} strokeWidth="1.5" />
      <Lbl x={34} y={clkY + 4} t="CLK" anchor="end" size={11} />
      <line x1="170" y1={first} x2="210" y2={first} {...W} />
      <Lbl x={216} y={first + 4} t="Q" color={GREEN} />
      <line x1="170" y1={clkY} x2="210" y2={clkY} {...W} />
      <Lbl x={216} y={clkY + 4} t="Q'" color={GREEN} />
    </svg>
  );
}

/* ─────────────── Timing diagram ───────────────
   trigger = 'rise': clock is low then high, outputs change at the rising edge.
   trigger = 'fall': clock is high then low, outputs change at the falling edge.
   Inputs change at the start of a cycle, so they are steady at the active edge. */
function Timing({ cycles, signals, trigger = 'rise' }) {
  const cw = 64, lx = 70, rowH = 34, amp = 16, top = 30;
  const rows = [{ name: 'CLK', kind: 'clk' }, ...signals];
  const width = lx + cycles * cw + 16;
  const height = top + rows.length * rowH + 10;
  const rowTop = (r) => top + r * rowH + (rowH - amp) / 2;
  const edgeX = (k) => lx + k * cw + cw / 2;
  const colour = { clk: INK, in: SECONDARY, out: GREEN };

  const points = (s, r) => {
    const hi = rowTop(r);
    const lo = hi + amp;
    const y = (v) => (v ? hi : lo);
    const pts = [];
    if (s.kind === 'clk') {
      for (let k = 0; k < cycles; k++) {
        const x0 = lx + k * cw;
        if (trigger === 'rise') {
          pts.push([x0, lo], [x0 + cw / 2, lo], [x0 + cw / 2, hi], [x0 + cw, hi], [x0 + cw, lo]);
        } else {
          pts.push([x0, hi], [x0 + cw / 2, hi], [x0 + cw / 2, lo], [x0 + cw, lo], [x0 + cw, hi]);
        }
      }
    } else if (s.kind === 'in') {
      s.vals.forEach((v, k) => pts.push([lx + k * cw, y(v)], [lx + (k + 1) * cw, y(v)]));
    } else {
      pts.push([lx, y(s.init || 0)], [edgeX(0), y(s.init || 0)]);
      s.vals.forEach((v, k) => pts.push([edgeX(k), y(v)], [Math.min(edgeX(k) + cw, lx + cycles * cw), y(v)]));
    }
    return pts.map((p) => p.join(',')).join(' ');
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ ...svgBox, maxWidth: 780 }} role="img" aria-label="Timing diagram">
      <text x={lx - 12} y="14" textAnchor="end" fontSize="10" fill={MUTED}>pulse</text>
      {Array.from({ length: cycles }, (_, k) => (
        <g key={k}>
          <line x1={edgeX(k)} y1={top - 6} x2={edgeX(k)} y2={height - 6} stroke={LINE} strokeDasharray="4 4" />
          <text x={edgeX(k)} y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>{k + 1}</text>
        </g>
      ))}
      {rows.map((s, r) => (
        <g key={s.name}>
          <text x={lx - 12} y={rowTop(r) + amp / 2 + 4} textAnchor="end" fontSize="12" fontWeight="700" fill={colour[s.kind]}>{s.name}</text>
          <polyline points={points(s, r)} fill="none" stroke={colour[s.kind]} strokeWidth="2" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────── Simple table ─────────────── */
function DataTable({ head, rows, leftCols = [], minWidth = 320 }) {
  const cell = { padding: '9px 10px', borderBottom: `1px solid ${LINE}`, fontSize: 14, textAlign: 'center', color: INK };
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth }}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} style={{ ...cell, background: '#f8fafc', color: MUTED, fontWeight: 700, textAlign: leftCols.includes(i) ? 'left' : 'center' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} style={{ ...cell, textAlign: leftCols.includes(ci) ? 'left' : 'center', fontWeight: ci === r.length - 1 && !leftCols.includes(ci) ? 700 : 400, color: ci === r.length - 1 && !leftCols.includes(ci) ? ACCENT : INK }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── Related topics ─────────────── */
function Related({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
      {items.map((it) => (
        <a key={it.to} href={it.to} style={{ display: 'block', border: `1px solid ${LINE}`, borderRadius: 10, padding: '12px 14px', background: '#fff', textDecoration: 'none' }}>
          <div style={{ color: ACCENT, fontWeight: 700 }}>{it.title}</div>
          <div style={{ color: MUTED, fontSize: 13, marginTop: 2, lineHeight: 1.5 }}>{it.why}</div>
        </a>
      ))}
    </div>
  );
}

const related = [
  { to: '/topics/flip-flops/sr', title: 'SR Flip-Flop', why: "The D flip-flop is an SR flip-flop with S = D and R = D’." },
  { to: '/topics/flip-flops/jk', title: 'JK Flip-Flop', why: "Can act as a D flip-flop with J = D and K = D’." },
  { to: '/topics/flip-flops/t', title: 'T Flip-Flop', why: "A D flip-flop with Q XOR T on its input toggles." },
  { to: '/topics/flip-flops/master-slave', title: 'Master-Slave Flip-Flop', why: "Edge-style D flip-flops use the same two-stage idea." },
  { to: '/topics/registers', title: 'Registers', why: "Every register bit is a D flip-flop." },
  { to: '/topics/registers/pipo', title: 'PIPO Register', why: "Four D flip-flops sharing a clock." },
];

/* ─────────────── Data ─────────────── */
const charRows = [0, 1].flatMap((q) => [0, 1].map((d) => [q, d, d]));

const SEQ = [1, 1, 0, 1, 0, 0, 1];
const timingSignals = [
  { name: 'D', kind: 'in', vals: SEQ },
  { name: 'Q', kind: 'out', init: 0, vals: SEQ },
  { name: "Q'", kind: 'out', init: 1, vals: SEQ.map((d) => 1 - d) },
];

/* ─────────────── Clocked latch: 4 NAND gates (SR) or 4 NAND + inverter (D) ─────────────── */
function ClockedLatch({ variant }) {
  const isD = variant === 'D';
  return (
    <svg viewBox="0 0 650 250" style={{ ...svgBox, maxWidth: 720 }} role="img" aria-label={isD ? 'D flip-flop built from four NAND gates and an inverter' : 'Clocked SR flip-flop built from four NAND gates'}>
      <Lbl x={isD ? 16 : 16} y={66} t={isD ? 'D' : 'S'} />
      <Lbl x={8} y={134} t="CLK" size={11} />
      <line x1="40" y1="61" x2="150" y2="61" {...W} />
      <line x1="40" y1="130" x2="110" y2="130" {...W} />
      <polyline points="110,79 110,181" {...W} />
      <line x1="110" y1="79" x2="150" y2="79" {...W} />
      <line x1="110" y1="181" x2="150" y2="181" {...W} />
      <Dot x={110} y={130} />
      {isD ? (
        <g>
          <polyline points="80,61 80,199 92,199" {...W} />
          <Dot x={80} y={61} />
          <Inv x={92} cy={199} />
          <line x1="124" y1="199" x2="150" y2="199" {...W} />
        </g>
      ) : (
        <g>
          <Lbl x={16} y={204} t="R" />
          <line x1="40" y1="199" x2="150" y2="199" {...W} />
        </g>
      )}
      <Nand x={150} cy={70} />
      <Nand x={150} cy={190} />
      <Nand x={330} cy={90} />
      <Nand x={330} cy={170} />
      {/* input gates to latch */}
      <polyline points="194,70 270,70 270,81 330,81" {...W} />
      <polyline points="194,190 270,190 270,179 330,179" {...W} />
      {/* cross-coupling */}
      <polyline points="400,90 400,140 306,140 306,161 330,161" {...W} />
      <polyline points="420,170 420,115 318,115 318,99 330,99" {...W} />
      <Dot x={400} y={90} />
      <Dot x={420} y={170} />
      {/* outputs */}
      <line x1="374" y1="90" x2="560" y2="90" {...W} />
      <line x1="374" y1="170" x2="560" y2="170" {...W} />
      <Lbl x={572} y={95} t="Q" color={GREEN} />
      <Lbl x={572} y={175} t="Q'" color={GREEN} />
    </svg>
  );
}

/* ─────────────── Page ─────────────── */
export default function DPage() {
  return (
    <PageShell
      title="D Flip-Flop"
      lead="A data flip-flop that copies its D input to Q on every clock pulse, so it stores exactly one bit."
      prev={{ to: '/topics/flip-flops/sr', title: 'SR Flip-Flop', sub: 'The basic latch' }}
      next={{ to: '/topics/flip-flops/jk', title: 'JK Flip-Flop', sub: 'Adds a toggle' }}
    >
      <Card kicker="The idea" title="Theory">
        <P>
          The D (data) flip-flop is the easiest flip-flop to use. Whatever is on D when the clock pulse arrives is stored and shown on Q.
        </P>
        <Bullets items={[
          <>Full form: <Mono>Data</Mono> flip-flop, also called a <Mono>Delay</Mono> flip-flop. Inputs D and CLK, outputs Q and Q'.</>,
          <>On the clock pulse Q takes the value of D: <Mono>Qn+1 = D</Mono>.</>,
          <>Between clock pulses Q does not change, whatever D does.</>,
          <>It is an SR flip-flop with an inverter between S and R, so <Mono>S = D</Mono> and <Mono>R = D'</Mono>.</>,
          <>S and R are never 1 together, so there is no invalid state.</>,
          <>Q is D delayed by one clock pulse, which is why it is also called a delay flip-flop.</>,
        ]} />
      </Card>

      <Card kicker="Symbol" title="Logic symbol">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
          <Symbol ins={['D']} name="D" bubble={false} />
          <Bullets items={[
            <>D is the data bit to store.</>,
            <>The triangle on CLK means D is sampled at the clock edge.</>,
            <>Q holds the stored bit.</>,
            <>Q' is the complement of Q.</>,
          ]} />
        </div>
      </Card>

      <Card kicker="Circuit" title="Circuit using NAND gates">
        <P>The D flip-flop is the clocked SR circuit with one inverter added. The inverter guarantees that R is always the opposite of S.</P>
        <P>Gate-level D flip-flop: four NAND gates and one inverter.</P>
        <div style={{ marginBottom: 24 }}><ClockedLatch variant="D" /></div>

        <Bullets items={[
          <>D goes straight to the upper input gate and, through the inverter, to the lower one.</>,
          <>With CLK = 1: D = 1 sets the latch and D = 0 resets it. With CLK = 0 the latch holds.</>,
          <>This gate-level circuit is a transparent latch: while CLK = 1, Q follows D. Edge-triggered D flip-flops add a second stage, as in the master-slave circuit.</>,
          <>Because D and D' are always opposite, the forbidden S = R = 1 case can never occur.</>,
        ]} />
      </Card>

      <Card kicker="Truth table" title="Truth table of the NAND gated D latch">
        <P>This table belongs to the level-sensitive NAND latch shown above. When CLK (enable) is HIGH, Q follows D; when CLK is LOW, the stored value is held.</P>
        <DataTable head={['CLK', 'D', 'Qn+1', 'State']} rows={[
            [0, "X", "Qn", "Hold (clock off)"],
            [1, 0, 0, "Reset"],
            [1, 1, 1, "Set"],
          ]} leftCols={[3]} minWidth={420} />
      </Card>

      <Card kicker="Tables" title="Flip-flop characteristic and excitation tables">
        <P>
          For an edge-triggered D flip-flop, the characteristic equation is <Mono>Qn+1 = D</Mono>. Qn is the present state and Qn+1 is the next state after the active clock edge.
        </P>
        <div style={{ fontWeight: 700, color: INK, margin: '12px 0 8px' }}>Edge-triggered D flip-flop truth table</div>
        <DataTable head={['Active clock edge', 'D', 'Qn+1']} rows={[
          ['Rising edge (↑)', 0, 0],
          ['Rising edge (↑)', 1, 1],
          ['No active edge', 'X', 'Qn (hold)'],
        ]} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <div>
            <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>Characteristic table</div>
            <DataTable head={['Qn', 'D', 'Qn+1']} rows={charRows} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>Excitation table</div>
            <DataTable head={['Qn', 'Qn+1', 'D']} rows={[
              [0, 0, 0],
              [0, 1, 1],
              [1, 0, 0],
              [1, 1, 1],
            ]} />
          </div>
        </div>
        <div style={{ height: 8 }} />
        <P last>The excitation table is the simplest of all flip-flops: to reach the next state Qn+1, put that same value on D.</P>
      </Card>

      <Card kicker="Timing" title="Timing diagram">
        <P>D changes while the clock is low. Q copies D just after every rising edge and then holds it for a full clock period.</P>
        <div style={{ marginBottom: 16 }}><Timing cycles={7} signals={timingSignals} trigger="rise" /></div>
        <P last>Q is a copy of D, delayed by one clock pulse. Q' is always the opposite of Q.</P>
      </Card>

      <Card kicker="Advantages" title="Advantages">
        <Bullets items={[
          'No invalid state: any value of D is allowed.',
          'Only one data input, so it is the easiest flip-flop to use.',
          'Ideal for storing and moving bits in registers and memories.',
          'Behaviour is easy to predict in synchronous designs.',
        ]} />
      </Card>

      <Card kicker="Disadvantages" title="Disadvantages">
        <Bullets items={[
          'It samples D on every clock pulse, so holding a value needs an enable input or feedback.',
          'No built-in toggle function, so counters need extra gates.',
          'The gate-level version is transparent while CLK = 1.',
          'Needs one more gate (the inverter) than the SR flip-flop.',
        ]} />
      </Card>

      <Card kicker="Applications" title="Applications">
        <Bullets items={[
          'Registers, including the shift registers SISO, SIPO, PISO and PIPO.',
          'Synchronising an asynchronous signal with a chain of two flip-flops.',
          'Pipeline stages and data buffers between logic blocks.',
          "Frequency division by 2: connect Q' back to D.",
        ]} />
      </Card>

      <Card kicker="Conversion" title="Building it from other flip-flops">
        <Bullets items={[
          <><Mono>D from SR</Mono>: connect S = D and R = D'.</>,
          <><Mono>D from JK</Mono>: connect J = D and K = D'.</>,
          <><Mono>T from D</Mono>: connect D = T ⊕ Q, so the flip-flop toggles when T = 1.</>,
          <><Mono>JK from D</Mono>: connect D = J·Q' + K'·Q.</>,
        ]} />
      </Card>

      <Card kicker="Related" title="Related topics">
        <P>Concepts that connect to this flip-flop.</P>
        <Related items={related} />
      </Card>
    </PageShell>
  );
}