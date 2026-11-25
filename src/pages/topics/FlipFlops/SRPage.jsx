import React from 'react';

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
          <div style={{ display: 'inline-block', padding: '5px 10px', borderRadius: 7, background: '#f5f3ff', color: ACCENT, fontSize: 11, fontWeight: 800, letterSpacing: '.07em', marginBottom: 12 }}>DIGITAL ELECTRONICS · FLIP-FLOPS</div>
          <h1 style={{ margin: '0 0 9px', fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: 1.15, letterSpacing: '-.03em', fontWeight: 850 }}>{title}</h1>
          <p style={{ margin: 0, maxWidth: 760, color: SECONDARY, fontSize: 15, lineHeight: 1.7 }}>{lead}</p>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 17 }}>
            {prev && <a href={prev.to} style={{ color: ACCENT, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>← Previous: {prev.title}</a>}
            {next && <a href={next.to} style={{ color: ACCENT, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Next: {next.title} →</a>}
          </nav>
        </header>
        {children}
      </div>
    </main>
  );
}
function Card({ kicker, title, children }) {
  return <section style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 13, padding: '21px 23px', marginTop: 16, boxShadow: '0 1px 2px rgba(15,23,42,.035)' }}>
    {kicker && <div style={{ color: ACCENT, fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 7 }}>{kicker}</div>}
    <h2 style={{ color: INK, fontSize: 20, lineHeight: 1.3, fontWeight: 780, margin: '0 0 12px' }}>{title}</h2>
    {children}
  </section>;
}
function P({ children, muted = false, last = false }) {
  return <p style={{ color: muted ? SECONDARY : '#334155', fontSize: 14, lineHeight: 1.75, margin: last ? '8px 0 0' : '8px 0' }}>{children}</p>;
}
function Mono({ children }) {
  return <code style={{ color: '#6d28d9', background: '#f5f3ff', borderRadius: 4, padding: '1px 5px', fontSize: '.94em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</code>;
}
function Bullets({ items, warning = false }) {
  return <ul style={{ margin: '10px 0 2px', paddingLeft: 21, display: 'grid', gap: 8 }}>
    {items.map((item, i) => <li key={i} style={{ color: '#334155', fontSize: 14, lineHeight: 1.65 }}><span style={{ color: warning ? '#b45309' : ACCENT, fontWeight: 900 }}>{warning ? '! ' : '• '}</span>{item}</li>)}
  </ul>;
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
  { to: '/topics/flip-flops/d', title: 'D Flip-Flop', why: "Adds an inverter so S and R can never both be 1." },
  { to: '/topics/flip-flops/jk', title: 'JK Flip-Flop', why: "Turns the forbidden S = R = 1 case into a toggle." },
  { to: '/topics/flip-flops/t', title: 'T Flip-Flop', why: "A JK flip-flop that only toggles or holds." },
  { to: '/topics/flip-flops/master-slave', title: 'Master-Slave Flip-Flop', why: "Two clocked latches in series for clean timing." },
  { to: '/topics/flip-flops', title: 'Flip-Flops overview', why: "All flip-flop types side by side." },
  { to: '/topics/registers', title: 'Registers', why: "Groups of flip-flops that store words." },
];

/* ─────────────── Data ─────────────── */
const next = (q, s, r) => (s && r ? 'X' : s ? 1 : r ? 0 : q);
const charRows = [0, 1].flatMap((q) => [0, 1].flatMap((s) => [0, 1].map((r) => [q, s, r, next(q, s, r)])));

const SEQ = [[1, 0], [0, 0], [0, 1], [0, 0], [1, 0], [0, 1]];
const Q = (() => { let q = 0; return SEQ.map(([s, r]) => { q = next(q, s, r); return q; }); })();
const timingSignals = [
  { name: 'S', kind: 'in', vals: SEQ.map((x) => x[0]) },
  { name: 'R', kind: 'in', vals: SEQ.map((x) => x[1]) },
  { name: 'Q', kind: 'out', init: 0, vals: Q },
  { name: "Q'", kind: 'out', init: 1, vals: Q.map((q) => 1 - q) },
];

/* ─────────────── Basic NAND latch (active-low inputs) ─────────────── */
function BasicLatch() {
  return (
    <svg viewBox="0 0 420 200" style={{ ...svgBox, maxWidth: 520 }} role="img" aria-label="Basic SR latch made of two cross-coupled NAND gates">
      <Lbl x={12} y={66} t="S̅" />
      <Lbl x={12} y={164} t="R̅" />
      <line x1="40" y1="61" x2="150" y2="61" {...W} />
      <line x1="40" y1="159" x2="150" y2="159" {...W} />
      <Nand x={150} cy={70} />
      <Nand x={150} cy={150} />
      {/* outputs */}
      <line x1="194" y1="70" x2="330" y2="70" {...W} />
      <line x1="194" y1="150" x2="330" y2="150" {...W} />
      <Lbl x={342} y={75} t="Q" color={GREEN} />
      <Lbl x={342} y={155} t="Q'" color={GREEN} />
      {/* cross-coupling */}
      <polyline points="230,70 230,110 130,110 130,141 150,141" {...W} />
      <polyline points="255,150 255,100 120,100 120,79 150,79" {...W} />
      <Dot x={230} y={70} />
      <Dot x={255} y={150} />
    </svg>
  );
}

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
export default function SRPage() {
  return (
    <PageShell
      title="SR Flip-Flop"
      lead="A set-reset flip-flop that stores one bit: S sets Q to 1, R resets Q to 0, and the clock decides when the inputs count."
      prev={{ to: '/topics/flip-flops', title: 'Flip-Flops', sub: 'Back to overview' }}
      next={{ to: '/topics/flip-flops/d', title: 'D Flip-Flop', sub: 'Removes the invalid state' }}
    >
      <Card kicker="The idea" title="Theory">
        <P>
          The SR flip-flop is the most basic clocked memory element. It remembers a bit until it is told to set or reset, and it is the starting point for every other flip-flop.
        </P>
        <Bullets items={[
          <>Full form: <Mono>Set–Reset</Mono>. Inputs S, R and CLK, outputs Q and Q'.</>,
          <><Mono>S = 1, R = 0</Mono> sets the flip-flop: Q becomes 1.</>,
          <><Mono>S = 0, R = 1</Mono> resets the flip-flop: Q becomes 0.</>,
          <><Mono>S = 0, R = 0</Mono> keeps the stored bit, so the flip-flop remembers.</>,
          <><Mono>S = 1, R = 1</Mono> is forbidden. Both outputs try to become 1 and the next state is unpredictable.</>,
          <>Characteristic equation: <Mono>Qn+1 = S + R'·Qn</Mono>, valid only when <Mono>S·R = 0</Mono>.</>,
        ]} />
      </Card>

      <Card kicker="Symbol" title="Logic symbol">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
          <Symbol ins={['S', 'R']} name="SR" bubble={false} />
          <Bullets items={[
            <>S sets Q to 1.</>,
            <>R resets Q to 0.</>,
            <>The triangle on CLK means the inputs are used at the clock edge.</>,
            <>Q' is the complement of Q.</>,
          ]} />
        </div>
      </Card>

      <Card kicker="Circuit" title="Circuit using NAND gates">
        <P>The core is two cross-coupled NAND gates. Two more NAND gates in front of it make the inputs depend on the clock.</P>
        <P>Basic latch: two cross-coupled NAND gates with active-low inputs S̅ and R̅.</P>
        <div style={{ marginBottom: 24 }}><BasicLatch /></div>
        <P>Clocked SR flip-flop: four NAND gates.</P>
        <div style={{ marginBottom: 24 }}><ClockedLatch variant="SR" /></div>

        <Bullets items={[
          <>The first two NAND gates pass S and R only while CLK = 1. When CLK = 0 both outputs are 1, so the latch holds.</>,
          <>The last two NAND gates are the cross-coupled latch: each output feeds the other gate's input.</>,
          <>This gate-level circuit is level-sensitive. Real edge-triggered chips add extra gates, or use a master-slave pair.</>,
          <>If S = R = 1 while CLK = 1, both input gates output 0 and both Q and Q' go to 1, which breaks the rule that Q' is the complement of Q.</>,
        ]} />
      </Card>

      <Card kicker="Truth table" title="Truth table">
        <P>With CLK = 1 the outputs follow the table. With CLK = 0 nothing changes.</P>
        <DataTable head={['CLK', 'S', 'R', 'Qn+1', 'State']} rows={[
            [0, "X", "X", "Qn", "Hold (clock off)"],
            [1, 0, 0, "Qn", "Hold (no change)"],
            [1, 0, 1, 0, "Reset"],
            [1, 1, 0, 1, "Set"],
            [1, 1, 1, "?", "Invalid"],
          ]} leftCols={[4]} minWidth={420} />
      </Card>

      <Card kicker="Tables" title="Characteristic and excitation tables">
        <P>
          The characteristic equation is <Mono>Qn+1 = S + R'·Qn  (S·R = 0)</Mono>. Qn is the present state and Qn+1 is the next state after the clock pulse.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <div>
            <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>Characteristic table</div>
            <DataTable head={['Qn', 'S', 'R', 'Qn+1']} rows={charRows} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>Excitation table</div>
            <DataTable head={['Qn', 'Qn+1', 'S', 'R']} rows={[
              [0, 0, 0, "X"],
              [0, 1, 1, 0],
              [1, 0, 0, 1],
              [1, 1, "X", 0],
            ]} />
          </div>
        </div>
        <div style={{ height: 8 }} />
        <P last>X in the characteristic table means the input combination S = R = 1 is not allowed. X in the excitation table means the input can be 0 or 1.</P>
      </Card>

      <Card kicker="Timing" title="Timing diagram">
        <P>S and R change while the clock is low, so they are steady at the rising edge. Q changes just after each rising edge.</P>
        <div style={{ marginBottom: 16 }}><Timing cycles={6} signals={timingSignals} trigger="rise" /></div>
        <P last>Pulse 1 sets Q, pulse 2 holds it, pulse 3 resets it, pulse 4 holds 0, and pulses 5 and 6 set and reset again. The forbidden S = R = 1 is never applied.</P>
      </Card>

      <Card kicker="Advantages" title="Advantages">
        <Bullets items={[
          "Simplest flip-flop: only four NAND gates.",
          "Direct control: S sets and R resets.",
          "Foundation for the D, JK and T flip-flops.",
          "Fast, because the signal passes through only two gate levels.",
        ]} />
      </Card>

      <Card kicker="Disadvantages" title="Disadvantages">
        <Bullets items={[
          "S = R = 1 is forbidden and gives an unpredictable result.",
          "The gate-level version is level-sensitive, so input changes while CLK = 1 can change Q.",
          "No toggle function.",
          "The designer must make sure S and R are never 1 together.",
        ]} />
      </Card>

      <Card kicker="Applications" title="Applications">
        <Bullets items={[
          "Switch debouncing with a basic NAND latch.",
          "Latching a sensor alarm until someone resets it.",
          "Control and status flags in digital systems.",
          "Memory cells, since cross-coupled gates are how SRAM cells store a bit.",
        ]} />
      </Card>

      <Card kicker="Conversion" title="Building it from other flip-flops">
        <Bullets items={[
          <><Mono>SR from JK</Mono>: connect J = S and K = R. The JK flip-flop also accepts S = R = 1.</>,
          <><Mono>SR from D</Mono>: use D = S + R'·Qn with extra gates, valid when S·R = 0.</>,
          <><Mono>D from SR</Mono>: connect S = D and R = D'.</>,
          <><Mono>JK from SR</Mono>: connect S = J·Q' and R = K·Q.</>,
        ]} />
      </Card>

      <Card kicker="Related" title="Related topics">
        <P>Concepts that connect to this flip-flop.</P>
        <Related items={related} />
      </Card>
    </PageShell>
  );
}