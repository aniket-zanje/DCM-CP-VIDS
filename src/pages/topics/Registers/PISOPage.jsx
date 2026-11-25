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

/* ─────────────── Data: parallel word D3D2D1D0 = 1011, then shift it out ─────────────── */
const DATA = [1, 1, 0, 1]; // D0, D1, D2, D3
const LOAD = [1, 0, 0, 0];
const history = (() => {
  let s = [0, 0, 0, 0];
  const all = [s];
  LOAD.forEach((l) => { s = l ? [...DATA] : [0, s[0], s[1], s[2]]; all.push(s); });
  return all;
})();

const pulseRows = LOAD.map((l, i) => {
  const k = i + 1;
  const s = history[k];
  const op = k === 1
    ? 'Parallel load of D3D2D1D0 = 1011, bit D3 is at Dout'
    : `Shift: D${4 - k} = ${DATA[4 - k]} is at Dout`;
  return [k, l, s[0], s[1], s[2], s[3], op];
});

const timingSignals = [
  { name: 'Load', kind: 'in', vals: LOAD },
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
    <svg viewBox="0 0 720 240" style={{ ...svgBox, maxWidth: 760 }} role="img" aria-label="PISO register: four D flip-flops, each with a 2-to-1 multiplexer in front">
      {/* select line */}
      <text x="12" y="58" fontSize="12" fontWeight="700" fill={SECONDARY}>Load</text>
      <text x="12" y="74" fontSize="9" fill={MUTED}>1 = load, 0 = shift</text>
      <line x1="60" y1="62" x2={xs[3] - 41} y2="62" {...W} />
      {xs.map((x, i) => (
        <g key={x}>
          <line x1={x - 41} y1="62" x2={x - 41} y2="94" {...W} />
          {i < 3 && <Dot x={x - 41} y={62} />}
        </g>
      ))}

      {xs.map((x, i) => {
        const mx = x - 56;
        return (
          <g key={x}>
            {/* multiplexer */}
            <rect x={mx} y="94" width="30" height="48" rx="3" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
            <text x={mx + 4} y="109" fontSize="9" fontWeight="700" fill={MUTED}>0</text>
            <text x={mx + 4} y="133" fontSize="9" fontWeight="700" fill={MUTED}>1</text>
            <text x={mx + 20} y="121" textAnchor="middle" fontSize="8" fontWeight="700" fill={MUTED}>MUX</text>
            <line x1={mx + 30} y1="118" x2={x} y2="118" {...W} />
            {/* shift input (0): previous Q, or 0 for FF0 */}
            {i === 0 ? (
              <g>
                <line x1={mx} y1="106" x2={mx - 16} y2="106" {...W} />
                <text x={mx - 22} y="110" textAnchor="end" fontSize="11" fontWeight="700" fill={MUTED}>0</text>
              </g>
            ) : (
              <polyline points={`${xs[i - 1] + 60},118 ${x - 64},118 ${x - 64},106 ${mx},106`} {...W} />
            )}
            {/* parallel input (1) */}
            <polyline points={`${x - 72},176 ${x - 72},130 ${mx},130`} {...W} />
            <text x={x - 72} y="192" textAnchor="middle" fontSize="12" fontWeight="700" fill={SECONDARY}>D{i}</text>
          </g>
        );
      })}

      {xs.map((x, i) => <FF key={x} x={x} i={i} />)}
      <line x1="610" y1="118" x2="670" y2="118" {...W} />
      <text x="676" y="122" fontSize="13" fontWeight="700" fill={GREEN}>Dout</text>
      <text x="618" y="111" fontSize="10" fontWeight="700" fill={MUTED}>Q3</text>
      <ClockBus xs={xs} x0={60} y={216} />
    </svg>
  );
}

/* ─────────────── Page ─────────────── */
export default function PISOPage() {
  return (
    <PageShell
      title="PISO – Parallel In Serial Out Register"
      lead="All bits are loaded together in one pulse, and then shifted out one bit at a time."
      prev={{ to: '/topics/registers', title: 'Registers', sub: 'Back to overview' }}
      next={{ to: '/topics/registers', title: 'Registers', sub: 'Back to overview' }}
    >
      <Card kicker="The idea" title="Theory">
        <P>
          A PISO register is the opposite of a SIPO register. It takes a whole word at once and sends it down a single wire, one bit per pulse.
        </P>
        <Bullets items={[
          <>Full form: <Mono>Parallel In, Serial Out</Mono>. Four data inputs D0 to D3, one serial output Dout.</>,
          <>Built from 4 D flip-flops. A 2-to-1 multiplexer in front of each D chooses between loading and shifting.</>,
          <>Control input <Mono>Load</Mono>: with 1 the parallel data is loaded, with 0 the bits shift right.</>,
          <>Next state: each Qi⁺ is Di when Load = 1, and the previous Q when Load = 0. Q0⁺ is D0 or 0.</>,
          <>Dout is taken from Q3, so D3 is the first bit out, then D2, D1 and D0.</>,
          <>Loading takes 1 pulse. Reading the remaining bits takes 3 more, so 4 pulses in total.</>,
        ]} />
      </Card>

      <Card kicker="Circuit" title="Diagram with 4 D flip-flops">
        <P>Four D flip-flops, each preceded by a 2-to-1 multiplexer. The multiplexers are all driven by the same Load line.</P>
        <div style={{ marginBottom: 24 }}><Diagram /></div>
        <Bullets items={[
          <>Multiplexer input 1 takes the parallel data Di. Input 0 takes the output of the previous flip-flop.</>,
          <>FF0 has a 0 on its shift input, so zeros fill in from the left while shifting.</>,
          <>The single serial output Dout comes from Q3.</>,
        ]} />
      </Card>

      <Card kicker="Truth table" title="Function table">
        <P>Q⁺ is the state after the clock edge. X means the value does not matter.</P>
        <DataTable
          head={['Clock', 'Load', 'Q0⁺', 'Q1⁺', 'Q2⁺', 'Q3⁺', 'Action']}
          rows={[
            ['No ↑ edge', 'X', 'Q0', 'Q1', 'Q2', 'Q3', 'Hold'],
            ['↑', '1', 'D0', 'D1', 'D2', 'D3', 'Parallel load'],
            ['↑', '0', '0', 'Q0', 'Q1', 'Q2', 'Shift right, 0 enters'],
          ]}
          leftCols={[6]}
        />
      </Card>

      <Card kicker="Timing" title="Timing diagram">
        <P>Load is 1 during pulse 1 (the parallel word D3D2D1D0 = 1011 is applied then), and 0 for the shift pulses. Dout follows Q3.</P>
        <div style={{ marginBottom: 16 }}><Timing cycles={4} signals={timingSignals} /></div>
        <P last>Dout shows 1, 0, 1, 1: the bits of the loaded word from D3 down to D0. The first bit is already at Dout right after loading.</P>
      </Card>

      <Card kicker="Clock pulses" title="Loading and reading, pulse by pulse">
        <P>The word D3D2D1D0 = 1011 is loaded on pulse 1 and shifted out on pulses 2 to 4.</P>
        <DataTable head={['Pulse', 'Load', 'Q0', 'Q1', 'Q2', 'Q3 (Dout)', 'Operation']} rows={pulseRows} leftCols={[6]} minWidth={560} />
      </Card>

      <Card kicker="Total" title="Total clock pulses">
        <P>Loading is parallel and takes one pulse, and the rest of the word is shifted out serially.</P>
        <DataTable
          head={['Step', 'Pulses for 4 bits', 'For n bits']}
          rows={[
            ['Parallel load of all bits', '1', '1'],
            ['Shift out the remaining bits (the first bit is out right after load)', '3', 'n − 1'],
            { cells: ['Total', '4', 'n'], total: true },
          ]}
          leftCols={[0]}
        />
      </Card>

      <Card kicker="Advantages" title="Advantages">
        <Bullets items={[
          'Converts a parallel word into a serial stream.',
          'Needs only one output pin, even for a wide word.',
          'Loading takes a single clock pulse.',
          'Fewer wires are needed to send the data.',
          'Easy to extend by adding one flip-flop and one multiplexer per bit.',
        ]} />
      </Card>

      <Card kicker="Disadvantages" title="Disadvantages">
        <Bullets items={[
          'Needs a multiplexer for each flip-flop, so it has more logic than SISO.',
          'A Load/shift control signal is needed, and it must change at the right time.',
          'Sending the whole word out takes n pulses, which is slow for wide data.',
          'Data is lost as it shifts out unless it is recirculated.',
          'The stored bits cannot be read in parallel.',
        ]} />
      </Card>

      <Card kicker="Applications" title="Applications">
        <Bullets items={[
          'Parallel-to-serial conversion in UART transmitters.',
          'Sending data over serial links such as SPI.',
          'Reading many switches or keys through a single input pin.',
          'Input port expansion for microcontrollers.',
          'Feeding serial converters and displays from parallel data.',
        ]} />
      </Card>
    </PageShell>
  );
}
