import React from 'react';
const ACCENT = '#7c3aed';
const SECONDARY = '#8b5cf6';
const GREEN = '#16a34a';
const INK = '#1e293b';
const LINE = '#e2e8f0';

function PageShell({ title, lead, prev, next, children }) {
  const navStyle = { display: 'block', color: ACCENT, textDecoration: 'none', fontWeight: 700 };
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 18px 48px', color: INK, fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.65 }}>
      <header style={{ marginBottom: 24 }}>
        <div style={{ color: ACCENT, fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Digital Electronics · Flip-Flops</div>
        <h1 style={{ margin: '6px 0', fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: 1.2 }}>{title}</h1>
        <p style={{ margin: 0, color: '#64748b', maxWidth: 760 }}>{lead}</p>
      </header>
      <div style={{ display: 'grid', gap: 18 }}>{children}</div>
      <nav aria-label="Related page navigation" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
        {prev ? <a href={prev.to} style={navStyle}>← {prev.title}</a> : <span />}
        {next ? <a href={next.to} style={navStyle}>{next.title} →</a> : null}
      </nav>
    </main>
  );
}
function Card({ kicker, title, children }) {
  return <section style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px clamp(16px, 3vw, 26px)', boxShadow: '0 2px 8px rgba(15,23,42,.035)' }}>
    {kicker ? <div style={{ color: SECONDARY, fontSize: 12, fontWeight: 800, letterSpacing: .8, textTransform: 'uppercase', marginBottom: 3 }}>{kicker}</div> : null}
    <h2 style={{ margin: '0 0 12px', fontSize: 21, lineHeight: 1.3 }}>{title}</h2>{children}
  </section>;
}
function P({ children, last = false }) { return <p style={{ margin: last ? '0' : '0 0 12px' }}>{children}</p>; }
function Mono({ children }) { return <code style={{ background: '#f5f3ff', color: '#6d28d9', borderRadius: 5, padding: '2px 5px', fontSize: '.94em' }}>{children}</code>; }
function Bullets({ items }) { return <ul style={{ margin: '8px 0 0', paddingLeft: 22, display: 'grid', gap: 7 }}>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>; }

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
  { to: '/topics/flip-flops/jk', title: 'JK Flip-Flop', why: "T is a JK flip-flop with J and K joined." },
  { to: '/topics/flip-flops/d', title: 'D Flip-Flop', why: "A D flip-flop with D = T XOR Q behaves as a T flip-flop." },
  { to: '/topics/flip-flops/master-slave', title: 'Master-Slave Flip-Flop', why: "Removes the race-around problem of level-triggered toggling." },
  { to: '/topics/flip-flops/sr', title: 'SR Flip-Flop', why: "The basic flip-flop that all others grow from." },
  { to: '/topics/counters', title: 'Counters', why: "A chain of T flip-flops is a binary counter." },
  { to: '/topics/registers', title: 'Registers', why: "Storage built from flip-flops." },
];

/* ─────────────── Data ─────────────── */
const charRows = [0, 1].flatMap((q) => [0, 1].map((t) => [q, t, t ^ q]));

const SEQ = [1, 1, 0, 1, 0, 1, 1];
const Q = (() => { let q = 0; return SEQ.map((t) => { q = t ^ q; return q; }); })();
const timingSignals = [
  { name: 'T', kind: 'in', vals: SEQ },
  { name: 'Q', kind: 'out', init: 0, vals: Q },
  { name: "Q'", kind: 'out', init: 1, vals: Q.map((q) => 1 - q) },
];

/* ─────────────── JK / T gate-level circuit: two 3-input and two 2-input NAND gates ─────────────── */
function JKCircuit({ tied }) {
  return (
    <svg viewBox="0 0 670 270" style={{ ...svgBox, maxWidth: 740 }} role="img" aria-label={tied ? 'T flip-flop: JK circuit with J and K tied together' : 'JK flip-flop built from four NAND gates with feedback'}>
      {/* inputs */}
      {tied ? (
        <g>
          <Lbl x={16} y={68} t="T" />
          <line x1="40" y1="63" x2="170" y2="63" {...W} />
          <polyline points="95,63 95,207 170,207" {...W} />
          <Dot x={95} y={63} />
        </g>
      ) : (
        <g>
          <Lbl x={16} y={68} t="J" />
          <Lbl x={16} y={212} t="K" />
          <line x1="40" y1="63" x2="170" y2="63" {...W} />
          <line x1="40" y1="207" x2="170" y2="207" {...W} />
        </g>
      )}
      <Lbl x={8} y={140} t="CLK" size={11} />
      <line x1="40" y1="135" x2="120" y2="135" {...W} />
      <polyline points="120,75 120,195" {...W} />
      <line x1="120" y1="75" x2="170" y2="75" {...W} />
      <line x1="120" y1="195" x2="170" y2="195" {...W} />
      <Dot x={120} y={135} />

      <Nand x={170} cy={75} />
      <Nand x={170} cy={195} />
      <Nand x={360} cy={95} />
      <Nand x={360} cy={175} />

      <polyline points="214,75 300,75 300,86 360,86" {...W} />
      <polyline points="214,195 300,195 300,184 360,184" {...W} />
      {/* cross-coupling */}
      <polyline points="415,95 415,140 346,140 346,166 360,166" {...W} />
      <polyline points="425,175 425,120 352,120 352,104 360,104" {...W} />
      <Dot x={415} y={95} />
      <Dot x={425} y={175} />
      {/* feedback: Q to lower input gate, Q' to upper input gate */}
      <polyline points="435,95 435,14 138,14 138,183 170,183" {...W} />
      <polyline points="445,175 445,240 156,240 156,87 170,87" {...W} />
      <Dot x={435} y={95} />
      <Dot x={445} y={175} />
      {/* outputs */}
      <line x1="404" y1="95" x2="600" y2="95" {...W} />
      <line x1="404" y1="175" x2="600" y2="175" {...W} />
      <Lbl x={612} y={100} t="Q" color={GREEN} />
      <Lbl x={612} y={180} t="Q'" color={GREEN} />
      <text x="300" y="10" textAnchor="middle" fontSize="10" fontWeight="600" fill={MUTED}>Q feeds back to the lower input gate</text>
      <text x="300" y="256" textAnchor="middle" fontSize="10" fontWeight="600" fill={MUTED}>Q' feeds back to the upper input gate</text>
    </svg>
  );
}

/* ─────────────── Page ─────────────── */
export default function TPage() {
  return (
    <PageShell
      title="T Flip-Flop"
      lead="A toggle flip-flop that flips its output on every clock pulse when T = 1 and holds it when T = 0."
      prev={{ to: '/topics/flip-flops/jk', title: 'JK Flip-Flop', sub: 'The parent circuit' }}
      next={{ to: '/topics/flip-flops/master-slave', title: 'Master-Slave', sub: 'Clean toggling' }}
    >
      <Card kicker="The idea" title="Theory">
        <P>
          The T (toggle) flip-flop has just one data input. When T is 1 the output flips at every clock pulse; when T is 0 it stays as it is.
        </P>
        <Bullets items={[
          <>Inputs <Mono>T</Mono> and CLK, outputs Q and Q'.</>,
          <><Mono>T = 0</Mono>: no change, Q holds its value.</>,
          <><Mono>T = 1</Mono>: toggle, Q becomes the opposite of its old value.</>,
          <>Characteristic equation: <Mono>Qn+1 = T ⊕ Qn</Mono>.</>,
          <>It is a JK flip-flop with J and K connected together and called T.</>,
          <>With <Mono>T = 1</Mono> permanently, Q changes at half the clock rate, so it divides the frequency by 2.</>,
        ]} />
      </Card>

      <Card kicker="Symbol" title="Logic symbol">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
          <Symbol ins={['T']} name="T" bubble={false} />
          <Bullets items={[
            <>T = 1 makes Q toggle at each pulse.</>,
            <>T = 0 makes Q hold.</>,
            <>The triangle on CLK means T is used at the clock edge.</>,
            <>Q' is the complement of Q.</>,
          ]} />
        </div>
      </Card>

      <Card kicker="Circuit" title="Circuit using NAND gates">
        <P>The T flip-flop uses the JK circuit with J and K tied to one input, T.</P>
        <P>T flip-flop: the JK circuit with J and K connected together.</P>
        <div style={{ marginBottom: 24 }}><JKCircuit tied /></div>

        <Bullets items={[
          <>With J = K = T, the upper gate can set Q only when T = 1 and Q = 0, and the lower gate can reset Q only when T = 1 and Q = 1.</>,
          <>So T = 1 always flips Q, and T = 0 disables both gates so Q is held.</>,
          <>This gate-level version is level-triggered. With T = 1 and a long clock pulse it races around, so real T flip-flops use edge triggering or a master-slave structure.</>,
        ]} />
      </Card>

      <Card kicker="Truth table" title="Truth table">
        <P>At each clock pulse the output either holds or toggles.</P>
        <DataTable head={['CLK', 'T', 'Qn+1', 'State']} rows={[
            [0, "X", "Qn", "Hold (clock off)"],
            [1, 0, "Qn", "No change"],
            [1, 1, "Qn'", "Toggle"],
          ]} leftCols={[3]} minWidth={420} />
      </Card>

      <Card kicker="Tables" title="Characteristic and excitation tables">
        <P>
          The characteristic equation is <Mono>Qn+1 = T ⊕ Qn</Mono>. Qn is the present state and Qn+1 is the next state after the clock pulse.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <div>
            <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>Characteristic table</div>
            <DataTable head={['Qn', 'T', 'Qn+1']} rows={charRows} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>Excitation table</div>
            <DataTable head={['Qn', 'Qn+1', 'T']} rows={[
              [0, 0, 0],
              [0, 1, 1],
              [1, 0, 1],
              [1, 1, 0],
            ]} />
          </div>
        </div>
        <div style={{ height: 8 }} />
        <P last>T is 1 exactly when the state has to change, and 0 when it has to stay. That makes the T flip-flop easy to use when designing counters.</P>
      </Card>

      <Card kicker="Timing" title="Timing diagram">
        <P>T changes while the clock is low. At each rising edge Q flips if T = 1 and stays if T = 0.</P>
        <div style={{ marginBottom: 16 }}><Timing cycles={7} signals={timingSignals} trigger="rise" /></div>
        <P last>T = 1 at pulses 1, 2, 4, 6 and 7, so Q flips at those pulses. At pulses 3 and 5 T = 0 and Q holds.</P>
      </Card>

      <Card kicker="Advantages" title="Advantages">
        <Bullets items={[
          "Very simple: one data input.",
          "Ideal for counters, since each stage just toggles.",
          "Divides the clock frequency by 2 when T = 1.",
          "Easy to design with, because T = 1 exactly when the state has to change.",
        ]} />
      </Card>

      <Card kicker="Disadvantages" title="Disadvantages">
        <Bullets items={[
          "No direct set, reset or data-load function without extra logic.",
          "The level-triggered version races around when T = 1.",
          "Cannot store arbitrary data bits as a D flip-flop does.",
          "Usually not sold as a separate chip; it is made from JK or D flip-flops.",
        ]} />
      </Card>

      <Card kicker="Applications" title="Applications">
        <Bullets items={[
          "Binary ripple counters: each T stage halves the frequency.",
          "Clock dividers, where n flip-flops divide by 2ⁿ.",
          "Toggle switches, such as a single push-button for on and off.",
          "Parity and checksum circuits that flip a bit on every 1.",
        ]} />
      </Card>

      <Card kicker="Conversion" title="Building it from other flip-flops">
        <Bullets items={[
          <><Mono>T from JK</Mono>: connect J = K = T.</>,
          <><Mono>T from D</Mono>: connect D = T ⊕ Q with an XOR gate.</>,
          <><Mono>D from T</Mono>: connect T = D ⊕ Q.</>,
          <><Mono>Divide-by-2</Mono>: tie T to 1, and the output frequency is half the clock frequency.</>,
        ]} />
      </Card>

      <Card kicker="Related" title="Related topics">
        <P>Concepts that connect to this flip-flop.</P>
        <Related items={related} />
      </Card>
    </PageShell>
  );
}
