import React from 'react';
import {
  ACCENT, SECONDARY, GREEN, INK, LINE,
  PageShell, Card, P, Mono, Bullets,
} from '../../../components/ConverterKit';

/* ─────────────── Shared look (all local to this file) ─────────────── */
const MUTED = '#64748b';
const W = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
const svgBox = { width: '100%', display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` };

/* D flip-flop box: D pin at (x, y+38), Q pin at (x+60, y+38), clock pin at (x+30, y+76) */
function FF({ x, y = 80, i }) {
  return (
    <g>
      <rect x={x} y={y} width="60" height="76" rx="6" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <text x={x + 30} y={y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>FF{i}</text>
      <text x={x + 8} y={y + 42} fontSize="11" fontWeight="700" fill={MUTED}>D</text>
      <text x={x + 52} y={y + 42} textAnchor="end" fontSize="11" fontWeight="700" fill={MUTED}>Q</text>
      <path d={`M ${x + 22} ${y + 76} L ${x + 30} ${y + 66} L ${x + 38} ${y + 76}`} fill="none" stroke={INK} strokeWidth="1.5" />
    </g>
  );
}

function Dot({ x, y }) {
  return <circle cx={x} cy={y} r="3.5" fill={INK} />;
}

/* Common clock line feeding every flip-flop */
function ClockBus({ xs, x0, y }) {
  return (
    <g>
      <line x1={x0} y1={y} x2={xs[xs.length - 1] + 30} y2={y} {...W} />
      {xs.map((x) => (
        <g key={x}>
          <line x1={x + 30} y1="156" x2={x + 30} y2={y} {...W} />
          <Dot x={x + 30} y={y} />
        </g>
      ))}
      <text x="12" y={y + 4} fontSize="12" fontWeight="700" fill={SECONDARY}>CLK</text>
    </g>
  );
}

/* ─────────────── Timing diagram ───────────────
   Inputs change on the falling edge, so they are steady at the rising edge.
   Outputs change just after each rising edge (dashed lines). */
function Timing({ cycles, signals }) {
  const cw = 64, lx = 100, rowH = 34, amp = 16, top = 30;
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
        pts.push([x0, lo], [x0 + cw / 2, lo], [x0 + cw / 2, hi], [x0 + cw, hi], [x0 + cw, lo]);
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
function DataTable({ head, rows, leftCols = [], minWidth = 480 }) {
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
          {rows.map((r, ri) => {
            const cells = Array.isArray(r) ? r : r.cells;
            const total = !Array.isArray(r) && r.total;
            return (
              <tr key={ri} style={total ? { background: '#f5f3ff' } : undefined}>
                {cells.map((c, ci) => (
                  <td key={ci} style={{ ...cell, fontWeight: total ? 700 : 400, textAlign: leftCols.includes(ci) ? 'left' : 'center', color: total ? ACCENT : INK }}>{c}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── Data: shift 1, 0, 1, 1 in, then keep clocking ─────────────── */
const DIN = [1, 0, 1, 1, 0, 0, 0];
const history = (() => {
  let s = [0, 0, 0, 0];
  const all = [s];
  DIN.forEach((d) => { s = [d, s[0], s[1], s[2]]; all.push(s); });
  return all;
})();

const pulseRows = DIN.map((d, i) => {
  const k = i + 1;
  const s = history[k];
  const op = k < 4
    ? `Load: bit ${k} enters FF0`
    : k === 4
      ? 'Load: bit 4 enters FF0, bit 1 reaches Dout'
      : `Read: bit ${k - 3} is at Dout`;
  return [k, d, s[0], s[1], s[2], s[3], op];
});

const timingSignals = [
  { name: 'Din', kind: 'in', vals: DIN },
  ...[0, 1, 2, 3].map((i) => ({
    name: i === 3 ? 'Q3 (Dout)' : `Q${i}`,
    kind: 'out',
    init: 0,
    vals: history.slice(1).map((s) => s[i]),
  })),
];

/* ─────────────── Diagram ─────────────── */
function Diagram() {
  const xs = [130, 270, 410, 550];
  return (
    <svg viewBox="0 0 720 230" style={{ ...svgBox, maxWidth: 760 }} role="img" aria-label="SISO register made of four D flip-flops in a chain">
      <text x="12" y="122" fontSize="13" fontWeight="700" fill={SECONDARY}>Din</text>
      <line x1="46" y1="118" x2="130" y2="118" {...W} />
      {xs.slice(0, 3).map((x, i) => (
        <g key={x}>
          <line x1={x + 60} y1="118" x2={x + 140} y2="118" {...W} />
          <text x={x + 68} y="111" fontSize="10" fontWeight="700" fill={MUTED}>Q{i}</text>
        </g>
      ))}
      <line x1="610" y1="118" x2="670" y2="118" {...W} />
      <text x="676" y="122" fontSize="13" fontWeight="700" fill={GREEN}>Dout</text>
      <text x="618" y="111" fontSize="10" fontWeight="700" fill={MUTED}>Q3</text>
      {xs.map((x, i) => <FF key={x} x={x} i={i} />)}
      <ClockBus xs={xs} x0={60} y={200} />
    </svg>
  );
}

/* ─────────────── Page ─────────────── */
export default function SISOPage() {
  return (
    <PageShell
      title="SISO – Serial In Serial Out Register"
      lead="Data enters one bit at a time and leaves one bit at a time, shifting one place on every clock pulse."
      prev={{ to: '/topics/registers', title: 'Registers', sub: 'Back to overview' }}
      next={{ to: '/topics/registers', title: 'Registers', sub: 'Back to overview' }}
    >
      <Card kicker="The idea" title="Theory">
        <P>
          A SISO register is a chain of flip-flops. A new bit is pushed in at one end while the oldest bit falls out of the other end.
        </P>
        <Bullets items={[
          <>Full form: <Mono>Serial In, Serial Out</Mono>. One data input (Din) and one data output (Dout).</>,
          <>Built from 4 D flip-flops. Din feeds FF0, each Q feeds the next D, and Dout is taken from Q3.</>,
          <>All flip-flops share one clock. On every rising edge each bit moves one place to the right.</>,
          <>Next-state equations: <Mono>Q0⁺ = Din, Q1⁺ = Q0, Q2⁺ = Q1, Q3⁺ = Q2</Mono></>,
          <>The first bit in travels furthest: it ends up in Q3 after 4 pulses.</>,
          <>Loading 4 bits takes 4 pulses. Reading the rest takes 3 more, so 7 pulses in total.</>,
        ]} />
      </Card>

      <Card kicker="Circuit" title="Diagram with 4 D flip-flops">
        <P>Four D flip-flops in a row, driven by the same clock. Only Din and Dout are connected to the outside world.</P>
        <div style={{ marginBottom: 24 }}><Diagram /></div>
        <Bullets items={[
          <>The wire from each Q to the next D is what makes the bits shift.</>,
          <>The shared clock makes every stage change at the same moment.</>,
          <>Only Q3 is brought out, as Dout. Q0, Q1 and Q2 are internal.</>,
        ]} />
      </Card>

      <Card kicker="Truth table" title="Function table">
        <P>Q⁺ is the state after the clock edge. X means the value does not matter.</P>
        <DataTable
          head={['Clock', 'Din', 'Q0⁺', 'Q1⁺', 'Q2⁺', 'Q3⁺', 'Action']}
          rows={[
            ['No ↑ edge', 'X', 'Q0', 'Q1', 'Q2', 'Q3', 'Hold'],
            ['↑', '0', '0', 'Q0', 'Q1', 'Q2', 'Shift right, 0 enters'],
            ['↑', '1', '1', 'Q0', 'Q1', 'Q2', 'Shift right, 1 enters'],
          ]}
          leftCols={[6]}
        />
      </Card>

      <Card kicker="Timing" title="Timing diagram">
        <P>Din carries the bits 1, 0, 1, 1 (first bit first). After pulse 4 the bits are loaded; pulses 5 to 7 shift them out of Q3.</P>
        <div style={{ marginBottom: 16 }}><Timing cycles={7} signals={timingSignals} /></div>
        <P last>Din after pulse 4 only carries zeros, which are shifted in behind the data. Notice that the first bit appears at Q3 exactly 4 pulses after it entered.</P>
      </Card>

      <Card kicker="Clock pulses" title="Loading and reading, pulse by pulse">
        <P>The register starts at 0000. Din is 1, 0, 1, 1, then 0 while the data is read out.</P>
        <DataTable head={['Pulse', 'Din', 'Q0', 'Q1', 'Q2', 'Q3 (Dout)', 'Operation']} rows={pulseRows} leftCols={[6]} minWidth={560} />
      </Card>

      <Card kicker="Total" title="Total clock pulses">
        <P>To use all 4 bits you must shift them in and then shift them out, one pulse per bit.</P>
        <DataTable
          head={['Step', 'Pulses for 4 bits', 'For n bits']}
          rows={[
            ['Load all bits serially', '4', 'n'],
            ['Read the remaining bits (the first bit is out when loading ends)', '3', 'n − 1'],
            { cells: ['Total', '7', '2n − 1'], total: true },
          ]}
          leftCols={[0]}
        />
      </Card>

      <Card kicker="Advantages" title="Advantages">
        <Bullets items={[
          'Uses only one input pin and one output pin, which saves wiring.',
          'Very simple design: D flip-flops only, no extra gates.',
          'Easy to extend: add one flip-flop for every extra bit.',
          'Can be used as a delay line for a digital signal.',
          'Works well when data has to travel over a single line.',
        ]} />
      </Card>

      <Card kicker="Disadvantages" title="Disadvantages">
        <Bullets items={[
          'Slow: 4 pulses to load and 3 more to read, so 7 pulses for 4 bits.',
          'Data is never available in parallel; it must be shifted out.',
          'Reading destroys the stored data unless Dout is fed back to Din.',
          'Needs a steady clock, and a missed pulse corrupts the data.',
          'Not suitable when all bits are needed at the same time.',
        ]} />
      </Card>

      <Card kicker="Applications" title="Applications">
        <Bullets items={[
          'Digital delay lines for signals.',
          'Temporary storage in serial communication links.',
          'Serial data buffers between slow and fast circuits.',
          'Building block of ring and Johnson counters (with feedback).',
          'Sequence generators such as LFSRs (with XOR feedback).',
        ]} />
      </Card>
    </PageShell>
  );
}
