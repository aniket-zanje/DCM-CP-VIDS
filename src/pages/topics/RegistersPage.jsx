import React from 'react';
import { Link } from 'react-router-dom';
import {
  ACCENT, SECONDARY, GREEN, INK, LINE,
  PageShell, Card, P, Mono, Bullets,
} from '../../components/ConverterKit';

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

/* ─────────────── Simple table ─────────────── */
function DataTable({ head, rows, leftCols = [0], minWidth = 480 }) {
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
                <td key={ci} style={{ ...cell, textAlign: leftCols.includes(ci) ? 'left' : 'center', fontWeight: ci === 0 ? 700 : 400 }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── Diagram 1: a plain 4-bit register ─────────────── */
function BasicRegister() {
  const xs = [70, 220, 370, 520];
  return (
    <svg viewBox="0 0 660 215" style={{ ...svgBox, maxWidth: 720 }} role="img" aria-label="A 4-bit register made of four D flip-flops sharing one clock">
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

/* ─────────────── Black-box symbol for each register type ─────────────── */
function Symbol({ inBus, inLabel, outBus, outLabel, name }) {
  const ys = [34, 47, 60, 73];
  const lines = (bus, x1, x2) => (bus
    ? ys.map((y) => <line key={y} x1={x1} y1={y} x2={x2} y2={y} {...W} />)
    : <line x1={x1} y1="54" x2={x2} y2="54" {...W} />);
  return (
    <svg viewBox="0 0 300 120" style={{ width: '100%', maxWidth: 300, display: 'block', margin: '0 auto' }} role="img" aria-label={`${name} symbol`}>
      <rect x="110" y="18" width="80" height="72" rx="6" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <text x="150" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>{name}</text>
      <path d="M 142 90 L 150 80 L 158 90" fill="none" stroke={INK} strokeWidth="1.5" />
      <line x1="150" y1="90" x2="150" y2="108" {...W} />
      <text x="150" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill={SECONDARY}>CLK</text>
      {lines(inBus, 70, 110)}
      <text x="64" y="58" textAnchor="end" fontSize="10" fontWeight="700" fill={SECONDARY}>{inLabel}</text>
      {lines(outBus, 190, 230)}
      <text x="236" y="58" fontSize="10" fontWeight="700" fill={GREEN}>{outLabel}</text>
    </svg>
  );
}

const TYPES = [
  {
    id: 'siso', name: 'SISO', title: 'Serial In, Serial Out', path: '/topics/registers/siso',
    sym: { inBus: false, inLabel: 'Din', outBus: false, outLabel: 'Dout' },
    points: ['One bit in and one bit out per pulse.', 'Acts as a delay line.', '4 pulses to load, 3 more to read.'],
  },
  {
    id: 'piso', name: 'PISO', title: 'Parallel In, Serial Out', path: '/topics/registers/piso',
    sym: { inBus: true, inLabel: 'D0–D3', outBus: false, outLabel: 'Dout' },
    points: ['Loads a whole word in one pulse.', 'Sends it out one bit per pulse.', 'Needs a Load / Shift control.'],
  },
  {
    id: 'sipo', name: 'SIPO', title: 'Serial In, Parallel Out', path: '/topics/registers/sipo',
    sym: { inBus: false, inLabel: 'Din', outBus: true, outLabel: 'Q0–Q3' },
    points: ['Builds a word from a bit stream.', 'All bits are read together.', '4 pulses in total for 4 bits.'],
  },
  {
    id: 'pipo', name: 'PIPO', title: 'Parallel In, Parallel Out', path: '/topics/registers/pipo',
    sym: { inBus: true, inLabel: 'D0–D3', outBus: true, outLabel: 'Q0–Q3' },
    points: ['Fastest: 1 pulse to load.', 'No shifting at all.', 'Needs the most pins.'],
  },
];

function TypeCard({ t }) {
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Symbol {...t.sym} name={t.name} />
      <div style={{ fontWeight: 700, color: INK }}>{t.name}: {t.title}</div>
      <ul style={{ margin: 0, paddingLeft: 20, color: INK, fontSize: 14, lineHeight: 1.6 }}>
        {t.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <Link to={t.path} style={{ color: ACCENT, fontWeight: 700, fontSize: 14, textDecoration: 'none', marginTop: 'auto' }}>Open {t.name} page</Link>
    </div>
  );
}

/* ─────────────── Diagram 2: universal shift register ───────────────
   Each flip-flop has a 4-to-1 multiplexer in front of it.
   Select S1 S0: 00 hold, 01 shift right, 10 shift left, 11 parallel load.
   Labelled stubs on a multiplexer input are wired to the signal they name. */
function UniversalDiagram() {
  const xs = [150, 320, 490, 660];
  const inY = [92, 108, 128, 144];
  const stub = (i, k) => {
    if (k === 0) return `Q${i}`;
    if (k === 1) return i === 0 ? 'SR' : null;
    if (k === 2) return i === 3 ? 'SL' : `Q${i + 1}`;
    return `D${i}`;
  };
  return (
    <svg viewBox="0 0 800 245" style={{ ...svgBox, maxWidth: 800 }} role="img" aria-label="Universal shift register: four D flip-flops, each with a 4-to-1 multiplexer in front">
      {/* select buses */}
      <text x="12" y="190" fontSize="12" fontWeight="700" fill={SECONDARY}>S1</text>
      <text x="12" y="204" fontSize="12" fontWeight="700" fill={SECONDARY}>S0</text>
      <line x1="40" y1="186" x2={xs[3] - 40} y2="186" {...W} />
      <line x1="40" y1="200" x2={xs[3] - 54} y2="200" {...W} />

      {xs.map((x, i) => {
        const mx = x - 64;
        return (
          <g key={x}>
            {/* multiplexer */}
            <rect x={mx} y="78" width="34" height="80" rx="3" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
            {inY.map((y, k) => (
              <text key={k} x={mx + 4} y={y + 3} fontSize="9" fontWeight="700" fill={MUTED}>{k}</text>
            ))}
            <text x={mx + 22} y="122" textAnchor="middle" fontSize="8" fontWeight="700" fill={MUTED}>4:1</text>
            <line x1={mx + 34} y1="118" x2={x} y2="118" {...W} />

            {/* select lines */}
            <line x1={mx + 10} y1="158" x2={mx + 10} y2="200" {...W} />
            <line x1={mx + 24} y1="158" x2={mx + 24} y2="186" {...W} />
            <Dot x={mx + 10} y={200} />
            <Dot x={mx + 24} y={186} />

            {/* inputs */}
            {inY.map((y, k) => {
              const label = stub(i, k);
              if (!label) return null;
              const col = (k === 3 || label === 'SR' || label === 'SL') ? SECONDARY : MUTED;
              return (
                <g key={k}>
                  <line x1={mx} y1={y} x2={mx - 16} y2={y} {...W} />
                  <text x={mx - 20} y={y + 3} textAnchor="end" fontSize="10" fontWeight="700" fill={col}>{label}</text>
                </g>
              );
            })}
            {/* shift-right wire: previous Q into input 1 */}
            {i > 0 && (
              <polyline points={`${xs[i - 1] + 60},118 ${x - 90},118 ${x - 90},108 ${mx},108`} {...W} />
            )}

            {/* output tap */}
            <line x1={x + 78} y1="118" x2={x + 78} y2="52" {...W} />
            <text x={x + 78} y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREEN}>Q{i}</text>
          </g>
        );
      })}

      {xs.map((x, i) => <FF key={x} x={x} i={i} />)}
      {xs.map((x, i) => (
        <g key={x}>
          <line x1={x + 60} y1="118" x2={i < 3 ? xs[i + 1] - 90 : x + 78} y2="118" {...W} />
          {i < 3 && <Dot x={x + 78} y={118} />}
        </g>
      ))}
      <ClockBus xs={xs} x0={40} y={226} />
    </svg>
  );
}

/* ─────────────── Data ─────────────── */
const classification = [
  ['Serial in', 'SISO', 'SIPO'],
  ['Parallel in', 'PISO', 'PIPO'],
];

const modeRows = [
  ['0', '0', 'Hold', 'Q0', 'Q1', 'Q2', 'Q3'],
  ['0', '1', 'Shift right', 'SR', 'Q0', 'Q1', 'Q2'],
  ['1', '0', 'Shift left', 'Q1', 'Q2', 'Q3', 'SL'],
  ['1', '1', 'Parallel load', 'D0', 'D1', 'D2', 'D3'],
];

const compareRows = [
  ['SISO', 'Serial', 'Serial', '4', '3 more', '7'],
  ['SIPO', 'Serial', 'Parallel', '4', '0', '4'],
  ['PISO', 'Parallel', 'Serial', '1', '3 more', '4'],
  ['PIPO', 'Parallel', 'Parallel', '1', '0', '1'],
  ['Universal', 'Either', 'Either', '1 or 4', '0 or 3 more', '1 to 7'],
];

/* ─────────────── Page ─────────────── */
export default function RegistersPage() {
  return (
    <PageShell
      title="Registers"
      lead="Registers are groups of flip-flops that store a binary word, and shift registers can also move that word along one position per clock pulse."
      prev={{ to: '/topics', title: 'Topics', sub: 'All topics' }}
      next={{ to: '/topics/registers/siso', title: 'SISO', sub: 'Serial in, serial out' }}
    >
      <Card kicker="Overview" title="What is a register?">
        <P>
          A flip-flop stores exactly one bit. To store a number or a code, you put several flip-flops side by side and clock them together. That group is a register.
        </P>
        <Bullets items={[
          <>A register made of <Mono>n</Mono> flip-flops stores an <Mono>n</Mono>-bit word.</>,
          <>All flip-flops share one clock. The data is captured on the clock edge and held until the next edge.</>,
          <>Data can move in <Mono>parallel</Mono> (all bits at once, one wire per bit) or <Mono>serial</Mono> (one bit per pulse on a single wire).</>,
          <>In a <Mono>shift register</Mono> the flip-flops are wired in a chain, so every pulse moves each bit one place along.</>,
          <>Registers are the working memory of every processor: they hold operands, results and addresses.</>,
        ]} />
      </Card>

      <Card kicker="Building block" title="A 4-bit register">
        <P>The simplest register: four D flip-flops with a common clock. Each flip-flop stores one bit.</P>
        <div style={{ marginBottom: 24 }}><BasicRegister /></div>
        <Bullets items={[
          'Di is the data going into flip-flop i, and Qi is the bit stored in it.',
          'On the rising clock edge every flip-flop copies its D input to its Q output.',
          'Between edges the stored bits do not change, whatever happens at the inputs.',
        ]} />
      </Card>

      <Card kicker="Naming" title="How the four types get their names">
        <P>
          The name says how data goes in and how it comes out. The first two letters describe the input, the last two describe the output.
        </P>
        <DataTable head={['', 'Serial out', 'Parallel out']} rows={classification} minWidth={360} />
        <div style={{ height: 16 }} />
        <Bullets items={[
          <><Mono>Serial</Mono> means one bit at a time on one wire. It needs few pins but takes several pulses.</>,
          <><Mono>Parallel</Mono> means all bits together, one wire each. It is fast but needs many pins.</>,
          <>A fifth type, the universal shift register, can do all four jobs. It is covered further down.</>,
        ]} />
      </Card>

      <Card kicker="Types" title="The four basic registers">
        <P>Open a page for the full theory, circuit, truth table, timing diagram and pulse table.</P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {TYPES.map((t) => <TypeCard key={t.id} t={t} />)}
        </div>
      </Card>

      <Card kicker="Universal" title="Universal shift register">
        <P>
          A universal shift register adds a 4-to-1 multiplexer in front of every flip-flop. Two select lines, S1 and S0, decide what each flip-flop loads on the next clock edge, so one chip can act as any of the basic types.
        </P>
        <Bullets items={[
          <>Select <Mono>S1 S0 = 00</Mono>: hold, every flip-flop keeps its own value.</>,
          <>Select <Mono>01</Mono>: shift right, bits move from Q0 towards Q3 and SR enters at FF0.</>,
          <>Select <Mono>10</Mono>: shift left, bits move from Q3 towards Q0 and SL enters at FF3.</>,
          <>Select <Mono>11</Mono>: parallel load, D0 to D3 are copied in together.</>,
          <>All four outputs Q0 to Q3 are available at once, so it can also work as a parallel-out register.</>,
        ]} />
        <div style={{ height: 16 }} />
        <div style={{ marginBottom: 24 }}><UniversalDiagram /></div>
        <P>Labelled stubs on a multiplexer input are wired to the signal they name. The numbers 0 to 3 inside each multiplexer match the select values 00 to 11.</P>
        <DataTable
          head={['S1', 'S0', 'Mode', 'Q0⁺', 'Q1⁺', 'Q2⁺', 'Q3⁺']}
          rows={modeRows}
          leftCols={[2]}
          minWidth={460}
        />
        <div style={{ height: 8 }} />
        <P last>Q⁺ is the state after the clock edge. SR and SL are the serial inputs for right and left shifting.</P>
      </Card>

      <Card kicker="Comparison" title="Registers side by side">
        <P>Pulse counts are for a 4-bit register, from an empty register to the last bit being available.</P>
        <DataTable
          head={['Type', 'Data in', 'Data out', 'Pulses to load', 'Pulses to read', 'Total pulses']}
          rows={compareRows}
          minWidth={560}
        />
      </Card>

      <Card kicker="Choosing" title="Which register should you use?">
        <Bullets items={[
          <>Need a delay, or a slow serial link in and out? Use <Mono>SISO</Mono>.</>,
          <>Receiving a bit stream and need the whole word at once? Use <Mono>SIPO</Mono>.</>,
          <>Sending a word over a single wire? Use <Mono>PISO</Mono>.</>,
          <>Just storing a word for a short time, with plenty of pins? Use <Mono>PIPO</Mono>.</>,
          <>Need to hold, shift both ways and load in the same circuit? Use a <Mono>universal</Mono> shift register.</>,
        ]} />
      </Card>

      <Card kicker="Applications" title="Where registers are used">
        <Bullets items={[
          'Storing operands and results inside a CPU (accumulators, instruction register, program counter).',
          'Serial-to-parallel and parallel-to-serial conversion in UART, SPI and other links.',
          'Delay lines and data buffers between circuits that run at different speeds.',
          'Counters, such as ring and Johnson counters, built from shift registers with feedback.',
          'Multiplying or dividing by 2 (a shift left or right) and bit-wise operations.',
          'Sequence and pseudo-random generators, such as LFSRs.',
        ]} />
      </Card>
    </PageShell>
  );
}
