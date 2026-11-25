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

/* ─────────────── Data: three input words, written D3D2D1D0 ─────────────── */
const WORDS = ['1011', '0110', '1101'];
const bit = (w, i) => Number(w[3 - i]); // bit i of the word D3D2D1D0

const pulseRows = WORDS.map((w, i) => [
  i + 1,
  w,
  w,
  `Parallel load: all 4 bits copied at the same edge`,
]);

const timingSignals = [
  ...[0, 1, 2, 3].map((i) => ({ name: `D${i}`, kind: 'in', vals: WORDS.map((w) => bit(w, i)) })),
  ...[0, 1, 2, 3].map((i) => ({ name: `Q${i}`, kind: 'out', init: 0, vals: WORDS.map((w) => bit(w, i)) })),
];

/* ─────────────── Diagram ─────────────── */
function Diagram() {
  const xs = [70, 220, 370, 520];
  return (
    <svg viewBox="0 0 660 215" style={{ ...svgBox, maxWidth: 720 }} role="img" aria-label="PIPO register made of four independent D flip-flops">
      {xs.map((x, i) => (
        <g key={x}>
          <line x1={x - 36} y1="118" x2={x} y2="118" {...W} />
          <text x={x - 34} y="111" fontSize="13" fontWeight="700" fill={SECONDARY}>D{i}</text>
          <line x1={x + 60} y1="118" x2={x + 96} y2="118" {...W} />
          <text x={x + 64} y="111" fontSize="13" fontWeight="700" fill={GREEN}>Q{i}</text>
        </g>
      ))}
      {xs.map((x, i) => <FF key={x} x={x} i={i} />)}
      <ClockBus xs={xs} x0={40} y={190} />
    </svg>
  );
}

/* ─────────────── Page ─────────────── */
export default function PIPOPage() {
  return (
    <PageShell
      title="PIPO – Parallel In Parallel Out Register"
      lead="All bits are loaded together and all bits can be read together, in a single clock pulse."
      prev={{ to: '/topics/registers', title: 'Registers', sub: 'Back to overview' }}
      next={{ to: '/topics/registers', title: 'Registers', sub: 'Back to overview' }}
    >
      <Card kicker="The idea" title="Theory">
        <P>
          A PIPO register is the simplest register. It is a row of flip-flops that all copy their inputs at the same clock edge, and hold the word until the next load.
        </P>
        <Bullets items={[
          <>Full form: <Mono>Parallel In, Parallel Out</Mono>. Four data inputs D0 to D3 and four outputs Q0 to Q3.</>,
          <>Built from 4 D flip-flops that share one clock. They are not connected to each other.</>,
          <>On every rising edge each flip-flop copies its own input: <Mono>Q0⁺ = D0, Q1⁺ = D1, Q2⁺ = D2, Q3⁺ = D3</Mono></>,
          <>Nothing shifts, so there is no serial path. The stored word stays until the next edge.</>,
          <>Loading takes 1 pulse and reading takes none, so 1 pulse in total.</>,
          <>It is the fastest of the four register types.</>,
        ]} />
      </Card>

      <Card kicker="Circuit" title="Diagram with 4 D flip-flops">
        <P>Four independent D flip-flops with a common clock. Each has its own data input and its own output.</P>
        <div style={{ marginBottom: 24 }}><Diagram /></div>
        <Bullets items={[
          <>There are no wires between the flip-flops.</>,
          <>Di goes to the D pin of FFi, and the Q pin gives Qi.</>,
          <>The shared clock makes all four bits load at the same instant.</>,
        ]} />
      </Card>

      <Card kicker="Truth table" title="Function table">
        <P>Q⁺ is the state after the clock edge. X means the value does not matter.</P>
        <DataTable
          head={['Clock', 'D0', 'D1', 'D2', 'D3', 'Q0⁺', 'Q1⁺', 'Q2⁺', 'Q3⁺', 'Action']}
          rows={[
            ['No ↑ edge', 'X', 'X', 'X', 'X', 'Q0', 'Q1', 'Q2', 'Q3', 'Hold'],
            ['↑', 'D0', 'D1', 'D2', 'D3', 'D0', 'D1', 'D2', 'D3', 'Parallel load'],
          ]}
          leftCols={[9]}
        />
      </Card>

      <Card kicker="Timing" title="Timing diagram">
        <P>Three different words are loaded on pulses 1, 2 and 3. Each output copies its input just after the rising edge.</P>
        <div style={{ marginBottom: 16 }}><Timing cycles={3} signals={timingSignals} /></div>
        <P last>The outputs follow the inputs one pulse at a time. Between edges the outputs ignore any change on the inputs.</P>
      </Card>

      <Card kicker="Clock pulses" title="Loading and reading, pulse by pulse">
        <P>Words are written D3D2D1D0 for the inputs and Q3Q2Q1Q0 for the outputs.</P>
        <DataTable head={['Pulse', 'Input word D3D2D1D0', 'Output word Q3Q2Q1Q0', 'Operation']} rows={pulseRows} leftCols={[3]} minWidth={560} />
      </Card>

      <Card kicker="Total" title="Total clock pulses">
        <P>Every pulse loads a new word, and the outputs can be read straight away.</P>
        <DataTable
          head={['Step', 'Pulses for 4 bits', 'For n bits']}
          rows={[
            ['Load all bits at once', '1', '1'],
            ['Read all bits at once', '0', '0'],
            { cells: ['Total', '1', '1'], total: true },
          ]}
          leftCols={[0]}
        />
      </Card>

      <Card kicker="Advantages" title="Advantages">
        <Bullets items={[
          'Fastest register: a whole word is loaded in one pulse.',
          'All bits are available together, with no extra pulses to read.',
          'Very simple: no multiplexers and no shift wiring.',
          'Holds the data until the next clock edge.',
          'The stages do not affect each other.',
        ]} />
      </Card>

      <Card kicker="Disadvantages" title="Disadvantages">
        <Bullets items={[
          'Needs many pins: n inputs and n outputs for an n-bit word.',
          'Cannot send or receive data serially.',
          'Cannot shift, so it does not help with serial conversion or multiplication by 2.',
          'Wide words need wide buses and more wiring.',
          'A clock edge or enable is needed to hold the stored word.',
        ]} />
      </Card>

      <Card kicker="Applications" title="Applications">
        <Bullets items={[
          'Temporary storage of data inside CPUs, such as general-purpose registers.',
          'Instruction registers and data buffers.',
          'Latching data between two stages of a pipeline.',
          'Output port latches for I/O devices.',
          'Holding the result of an arithmetic circuit until it is used.',
        ]} />
      </Card>
    </PageShell>
  );
}
