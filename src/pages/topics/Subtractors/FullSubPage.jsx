import React from 'react';
import {
  ACCENT, SECONDARY, GREEN, INK, LINE,
  PageShell, Card, P, Mono, Bullets, Tiles, CodeBlock,
  TruthTable, Playground, Practice,
} from '../../../components/ConverterKit';

/* ─────────────── Helpers (all local to this file) ─────────────── */
const not = (x) => x ^ 1;
const diffFull = (a, b, bin) => a ^ b ^ bin;
const borrowFull = (a, b, bin) => (not(a) & b) | (not(a ^ b) & bin);
const diffHalf = (a, b) => a ^ b;
const borrowHalf = (a, b) => not(a) & b;

const fullRows = Array.from({ length: 8 }, (_, n) => {
  const a = (n >> 2) & 1, b = (n >> 1) & 1, bin = n & 1;
  return { cells: [a, b, bin, diffFull(a, b, bin), borrowFull(a, b, bin)] };
});

const halfRows = Array.from({ length: 4 }, (_, n) => {
  const a = (n >> 1) & 1, b = n & 1;
  return { cells: [a, b, diffHalf(a, b), borrowHalf(a, b)] };
});

const runSubtractor = (value) => {
  if (!value) return null;
  const bits = value.split('').map(Number);
  if (bits.length !== 3 || bits.some((x) => x !== 0 && x !== 1)) return null;
  const [a, b, bin] = bits;
  const p = a ^ b;
  const d = diffFull(a, b, bin);
  const bo = borrowFull(a, b, bin);
  return {
    cards: [
      { label: 'A − B − Bin', value: `${a} − ${b} − ${bin}` },
      { label: 'Difference', value: String(d), accent: true },
      { label: 'Borrow-out', value: String(bo) },
      { label: 'Result (Bout D)', value: `${bo}${d}` },
    ],
    steps: [
      `P = A ⊕ B = ${a} ⊕ ${b} = ${p}`,
      `Difference = P ⊕ Bin = ${p} ⊕ ${bin} = ${d}`,
      `Borrow = A'B + P'·Bin = ${not(a) & b} + ${not(p) & bin} = ${bo}`,
      `Check: ${a} − ${b} − ${bin} = ${a - b - bin}, and D − 2·Bout = ${d} − ${2 * bo} = ${d - 2 * bo}`,
    ],
  };
};

const practiceItems = ['010', '100', '001', '011'].map((v) => {
  const [a, b, bin] = v.split('').map(Number);
  const d = diffFull(a, b, bin);
  const bo = borrowFull(a, b, bin);
  return {
    q: `A full subtractor receives A = ${a}, B = ${b}, Bin = ${bin}. Write the outputs as Borrow-out then Difference.`,
    a: `${bo}${d}`,
    work: `Difference = ${a} ⊕ ${b} ⊕ ${bin} = ${d}. Borrow-out is 1 when A is smaller than B + Bin: ${a} < ${b + bin} is ${a < b + bin ? 'true' : 'false'}, so Bout = ${bo}. Written as Bout then D: ${bo}${d}.`,
  };
});

const verilogFlat = `module full_subtractor (
  input  a, b, bin,
  output diff, bout
);
  assign diff = a ^ b ^ bin;
  assign bout = (~a & b) | (~(a ^ b) & bin);
endmodule`;

const verilogStruct = `module half_subtractor (
  input  a, b,
  output diff, borrow
);
  assign diff   = a ^ b;
  assign borrow = ~a & b;
endmodule

module full_subtractor_struct (
  input  a, b, bin,
  output diff, bout
);
  wire d1, b1, b2;
  half_subtractor hs1 (.a(a),  .b(b),   .diff(d1),   .borrow(b1));
  half_subtractor hs2 (.a(d1), .b(bin), .diff(diff), .borrow(b2));
  assign bout = b1 | b2;
endmodule`;

/* ─────────────── Gate shapes ─────────────── */
function Gate({ kind, x, cy }) {
  const shapes = {
    AND: 'M 0 0 L 18 0 A 18 18 0 0 1 18 36 L 0 36 Z',
    OR: 'M 0 0 Q 24 0 36 18 Q 24 36 0 36 Q 10 18 0 0 Z',
    XOR: 'M 0 0 Q 10 18 0 36 Q 24 36 36 18 Q 24 0 0 0 Z',
  };
  return (
    <g transform={`translate(${x}, ${cy - 18})`}>
      <path d={shapes[kind]} fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      {kind === 'XOR' && <path d="M -5 0 Q 5 18 -5 36" fill="none" stroke={INK} strokeWidth="1.5" />}
      <text x="16" y="-6" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">{kind}</text>
    </g>
  );
}

/* NOT gate: input at x, output at x + 32 */
function NotGate({ x, cy }) {
  return (
    <g transform={`translate(${x}, ${cy})`}>
      <path d="M 0 -11 L 24 0 L 0 11 Z" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <circle cx="28" cy="0" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <text x="12" y="-15" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">NOT</text>
    </g>
  );
}

const svgBox = { width: '100%', display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` };

/* ─────────────── Half subtractor circuit ─────────────── */
function HalfCircuit() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  return (
    <svg viewBox="0 0 520 200" style={{ ...svgBox, maxWidth: 680 }} role="img" aria-label="Half subtractor circuit: XOR for difference, NOT and AND for borrow">
      <text x="16" y="56" fontSize="14" fontWeight="700" fill={SECONDARY}>A</text>
      <text x="16" y="105" fontSize="14" fontWeight="700" fill={SECONDARY}>B</text>

      {/* A to XOR, and down through NOT to AND */}
      <line x1="50" y1="51" x2="200" y2="51" {...w} />
      <polyline points="90,51 90,121 110,121" {...w} />
      <line x1="142" y1="121" x2="200" y2="121" {...w} />
      {/* B to XOR bottom and AND bottom */}
      <polyline points="50,100 160,100" {...w} />
      <polyline points="200,69 160,69 160,139 200,139" {...w} />
      <circle cx="90" cy="51" r="3.5" fill={INK} />
      <circle cx="160" cy="100" r="3.5" fill={INK} />

      <NotGate x={110} cy={121} />
      <Gate kind="XOR" x={200} cy={60} />
      <Gate kind="AND" x={200} cy={130} />

      <line x1="236" y1="60" x2="440" y2="60" {...w} />
      <line x1="236" y1="130" x2="440" y2="130" {...w} />
      <text x="452" y="65" fontSize="14" fontWeight="700" fill={GREEN}>Diff</text>
      <text x="452" y="135" fontSize="14" fontWeight="700" fill={GREEN}>Borrow</text>
    </svg>
  );
}

/* ─────────────── Full subtractor circuit: two half subtractors + OR ─────────────── */
function FullCircuit() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  const note = { fontSize: 10, fontWeight: 600, fill: '#64748b' };
  return (
    <svg viewBox="0 0 800 270" style={{ ...svgBox, maxWidth: 800 }} role="img" aria-label="Full subtractor circuit built from two half subtractors and an OR gate">
      <rect x="105" y="30" width="140" height="145" rx="8" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 4" />
      <rect x="350" y="30" width="140" height="185" rx="8" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="175" y="24" textAnchor="middle" {...note}>Half subtractor 1</text>
      <text x="420" y="24" textAnchor="middle" {...note}>Half subtractor 2</text>

      <text x="16" y="45" fontSize="14" fontWeight="700" fill={SECONDARY}>A</text>
      <text x="16" y="95" fontSize="14" fontWeight="700" fill={SECONDARY}>B</text>
      <text x="10" y="255" fontSize="14" fontWeight="700" fill={SECONDARY}>Bin</text>

      {/* A: to XOR1, and through NOT to AND1 */}
      <polyline points="50,40 90,40 90,121 110,121" {...w} />
      <line x1="90" y1="51" x2="190" y2="51" {...w} />
      <line x1="142" y1="121" x2="190" y2="121" {...w} />
      <circle cx="90" cy="51" r="3.5" fill={INK} />
      {/* B: to XOR1 bottom and AND1 bottom */}
      <polyline points="50,90 160,90" {...w} />
      <polyline points="190,69 160,69 160,139 190,139" {...w} />
      <circle cx="160" cy="90" r="3.5" fill={INK} />

      <NotGate x={110} cy={121} />
      <Gate kind="XOR" x={190} cy={60} />
      <Gate kind="AND" x={190} cy={130} />

      {/* P = A xor B into half subtractor 2 */}
      <line x1="226" y1="60" x2="440" y2="60" {...w} />
      <polyline points="330,60 330,161 360,161" {...w} />
      <line x1="392" y1="161" x2="440" y2="161" {...w} />
      <circle cx="330" cy="60" r="3.5" fill={INK} />
      <text x="262" y="53" {...note}>P = A ⊕ B</text>

      {/* G = A'B goes to OR */}
      <polyline points="226,130 540,130 540,141 600,141" {...w} />
      <text x="262" y="123" {...note}>G = A'B</text>

      {/* Bin */}
      <polyline points="50,250 415,250 415,78 440,78" {...w} />
      <line x1="415" y1="179" x2="440" y2="179" {...w} />
      <circle cx="415" cy="179" r="3.5" fill={INK} />

      <NotGate x={360} cy={161} />
      <Gate kind="XOR" x={440} cy={69} />
      <Gate kind="AND" x={440} cy={170} />

      {/* Difference out */}
      <line x1="476" y1="69" x2="730" y2="69" {...w} />
      <text x="742" y="74" fontSize="14" fontWeight="700" fill={GREEN}>Diff</text>

      {/* AND2 to OR */}
      <polyline points="476,170 565,170 565,159 600,159" {...w} />
      <text x="490" y="164" {...note}>P'·Bin</text>

      <Gate kind="OR" x={600} cy={150} />
      <line x1="636" y1="150" x2="730" y2="150" {...w} />
      <text x="742" y="155" fontSize="14" fontWeight="700" fill={GREEN}>Bout</text>
    </svg>
  );
}

/* ─────────────── Chain of four full subtractors ─────────────── */
function RippleChain() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  const xs = [70, 210, 350, 490];
  return (
    <svg viewBox="0 0 680 190" style={{ ...svgBox, maxWidth: 720 }} role="img" aria-label="Four full subtractors chained so each borrow-out feeds the next borrow-in">
      {xs.map((x, k) => {
        const i = 3 - k;
        return (
          <g key={x}>
            <rect x={x} y="55" width="90" height="70" rx="8" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
            <text x={x + 45} y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>FS{i}</text>
            <text x={x + 45} y="104" textAnchor="middle" fontSize="10" fill="#64748b">full subtractor</text>
            <line x1={x + 28} y1="22" x2={x + 28} y2="55" {...w} />
            <line x1={x + 62} y1="22" x2={x + 62} y2="55" {...w} />
            <text x={x + 28} y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill={SECONDARY}>A{i}</text>
            <text x={x + 62} y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill={SECONDARY}>B{i}</text>
            <line x1={x + 45} y1="125" x2={x + 45} y2="158" {...w} />
            <text x={x + 45} y="175" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREEN}>D{i}</text>
            <line x1={x} y1="90" x2={x - 50} y2="90" {...w} />
          </g>
        );
      })}
      <text x="8" y="82" fontSize="12" fontWeight="700" fill={GREEN}>Bout</text>
      {[1, 2, 3].map((k) => (
        <text key={k} x={xs[k] - 25} y="82" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">Bo{3 - k}</text>
      ))}
      <line x1="580" y1="90" x2="630" y2="90" {...w} />
      <text x="636" y="94" fontSize="12" fontWeight="700" fill={SECONDARY}>Bin</text>
    </svg>
  );
}

/* ─────────────── K-map (local, 1 to 2 variable rows and cols) ─────────────── */
function KMap({ title, rowVars, colVars, fn, groups = [], formula, note }) {
  const order = (k) => (k === 1 ? [0, 1] : [0, 1, 3, 2]);
  const rows = order(rowVars.length);
  const cols = order(colVars.length);
  const lab = (v, k) => v.toString(2).padStart(k, '0');
  const cs = 52, ox = 74, oy = 52;
  const width = ox + cols.length * cs + 12;
  const height = oy + rows.length * cs + 12;

  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: 16, background: '#fff' }}>
      <div style={{ fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }} role="img" aria-label={`K-map for ${title}`}>
        <text x={ox - 8} y={oy - 30} textAnchor="end" fontSize="11" fontWeight="700" fill={SECONDARY}>{rowVars.join('')} \ {colVars.join('')}</text>
        {cols.map((cv, c) => (
          <text key={c} x={ox + c * cs + cs / 2} y={oy - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">{lab(cv, colVars.length)}</text>
        ))}
        {rows.map((rv, r) => (
          <text key={r} x={ox - 10} y={oy + r * cs + cs / 2 + 4} textAnchor="end" fontSize="12" fontWeight="700" fill="#64748b">{lab(rv, rowVars.length)}</text>
        ))}
        {rows.map((rv, r) => cols.map((cv, c) => {
          const v = fn((rv << colVars.length) | cv);
          return (
            <g key={`${r}-${c}`}>
              <rect x={ox + c * cs} y={oy + r * cs} width={cs} height={cs} fill="#fff" stroke={LINE} strokeWidth="1.5" />
              <text x={ox + c * cs + cs / 2} y={oy + r * cs + cs / 2 + 6} textAnchor="middle" fontSize="18" fontWeight={v ? 800 : 500} fill={v ? INK : '#cbd5e1'}>{v}</text>
            </g>
          );
        }))}
        {groups.map((g, i) => (
          <rect key={i} x={ox + g.c * cs + 5} y={oy + g.r * cs + 5} width={g.w * cs - 10} height={g.h * cs - 10} rx="12" fill={g.color} fillOpacity="0.14" stroke={g.color} strokeWidth="2.5" />
        ))}
      </svg>
      <div style={{ marginTop: 10, fontWeight: 700, color: INK }}>{formula}</div>
      {note && <div style={{ marginTop: 4, fontSize: 13, color: '#64748b' }}>{note}</div>}
    </div>
  );
}

/* ─────────────── Comparison tables ─────────────── */
function CompareTable({ head, rows }) {
  const cell = { padding: '10px 12px', borderBottom: `1px solid ${LINE}`, fontSize: 14, textAlign: 'left' };
  const colors = ['#64748b', SECONDARY, ACCENT];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
        <thead>
          <tr>{head.map((h, i) => <th key={h} style={{ ...cell, color: colors[i] }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => <td key={i} style={{ ...cell, color: INK, fontWeight: i === 0 ? 600 : 400 }}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const halfVsFull = [
  ['Inputs', 'A, B (2 bits)', 'A, B, Bin (3 bits)'],
  ['Outputs', 'Difference, Borrow', 'Difference, Borrow-out'],
  ['Difference equation', 'A ⊕ B', 'A ⊕ B ⊕ Bin'],
  ['Borrow equation', "A'B", "A'B + (A ⊕ B)'·Bin"],
  ['Truth table rows', '4', '8'],
  ['Gates', '1 XOR, 1 NOT, 1 AND', '2 XOR, 2 NOT, 2 AND, 1 OR'],
  ['Accepts a borrow from the right', 'No', 'Yes'],
  ['Best used for', 'Lowest bit only', 'Every bit of a multi-bit subtractor'],
];

const adderVsSub = [
  ['Sum / Difference', 'A ⊕ B ⊕ Cin', 'A ⊕ B ⊕ Bin'],
  ['Carry / Borrow', 'AB + Cin(A ⊕ B)', "A'B + Bin(A ⊕ B)'"],
  ['What differs', 'Uses A and (A ⊕ B)', 'Uses A\u2032 and (A ⊕ B)\u2032'],
  ['Extra gates', 'None', 'NOT gates on A and P'],
];

/* ─────────────── Page ─────────────── */
export default function FullSubPage() {
  return (
    <PageShell
      title="Full Subtractor"
      lead="A full subtractor subtracts three single bits, A − B − Bin, and produces a Difference bit and a Borrow-out bit."
      prev={{ to: '/topics/subtractors', title: 'Subtractors', sub: 'Back to overview' }}
      next={{ to: '/topics/subtractors', title: 'Subtractors', sub: 'Back to overview' }}
    >
      <Card kicker="The idea" title="What it does">
        <P>
          A full subtractor handles one column of binary subtraction. It takes the bit of A, the bit of B, and any borrow requested by the column to its right, and outputs the difference for this column plus a borrow for the next column to the left.
        </P>
        <Bullets items={[
          <>Difference is 1 when an odd number of inputs are 1: <Mono>D = A ⊕ B ⊕ Bin</Mono></>,
          <>Borrow-out is 1 when A is too small to pay for B and Bin: <Mono>Bout = A'B + (A ⊕ B)'·Bin</Mono></>,
          <>When a borrow happens, the column works with A + 2, so read the result as <Mono>D − 2·Bout = A − B − Bin</Mono>.</>,
          <>Chaining full subtractors, with each Bout feeding the next Bin, builds multi-bit subtractors.</>,
        ]} />
      </Card>

      <Card kicker="Try it" title="Live subtractor">
        <P>Enter three bits as A, B, Bin, for example 011.</P>
        <Playground
          label="A B Bin"
          allowed={/[^01]/g}
          maxLen={3}
          placeholder="e.g. 011"
          initial="011"
          samples={['000', '010', '100', '111']}
          run={runSubtractor}
        />
      </Card>

      <Card kicker="Truth table" title="Full subtractor truth table">
        <P>All eight input combinations. Difference follows the parity of the inputs, and Bout is 1 whenever A is smaller than B + Bin.</P>
        <TruthTable
          inHeads={['A', 'B', 'Bin']}
          outHeads={['D', 'Bout']}
          inTitle="Inputs"
          outTitle="Outputs"
          rows={fullRows}
        />
      </Card>

      <Card kicker="Simplification" title="Expressions from K-maps">
        <P>
          Each output has a three-variable map with A on the rows and B, Bin on the columns. Difference is a checkerboard, so nothing groups and it stays a three-input XOR. Borrow-out groups into three pairs.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <KMap
            title="Difference (D)" rowVars={['A']} colVars={['B', 'Bin']}
            fn={(n) => diffFull((n >> 2) & 1, (n >> 1) & 1, n & 1)}
            groups={[]}
            formula={<>D = A ⊕ B ⊕ Bin</>}
            note="A checkerboard: no two 1s touch, so nothing can be grouped."
          />
          <KMap
            title="Borrow-out (Bout)" rowVars={['A']} colVars={['B', 'Bin']}
            fn={(n) => borrowFull((n >> 2) & 1, (n >> 1) & 1, n & 1)}
            groups={[
              { r: 0, c: 2, w: 2, h: 1, color: ACCENT },
              { r: 0, c: 1, w: 2, h: 1, color: GREEN },
              { r: 0, c: 2, w: 1, h: 2, color: '#f59e0b' },
            ]}
            formula={<>Bout = A'B + A'·Bin + B·Bin</>}
            note="Three overlapping pairs, one of which includes the lone 1 in the A = 1 row."
          />
        </div>
        <div style={{ height: 16 }} />
        <P last>
          The circuit below uses an equivalent form, <Mono>Bout = A'B + (A ⊕ B)'·Bin</Mono>. It reuses the A ⊕ B term that Difference already needs.
        </P>
      </Card>

      <Card kicker="Implementation" title="Logic circuit">
        <P>
          Two half subtractors and one OR gate. The first subtracts B from A. The second subtracts Bin from that partial difference P, and gives the final Difference. If either half subtractor needs to borrow, Bout is 1.
        </P>
        <div style={{ marginBottom: 24 }}><FullCircuit /></div>
        <P last>
          The two borrows G = A'B and P'·Bin can never both be 1 at once, so a plain OR is enough to combine them. Total cost: two XOR, two NOT, two AND and one OR gate.
        </P>
      </Card>

      <Card kicker="Building block" title="Recap: the half subtractor">
        <P>
          A half subtractor subtracts one bit from another, B from A, with no borrow-in. It has two inputs (A and B) and two outputs (Difference and Borrow), and it is the first half of the full subtractor above.
        </P>
        <TruthTable
          inHeads={['A', 'B']}
          outHeads={['Diff', 'Borrow']}
          inTitle="Inputs"
          outTitle="Outputs"
          rows={halfRows}
        />
        <div style={{ height: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          <KMap
            title="Difference" rowVars={['A']} colVars={['B']}
            fn={(n) => diffHalf((n >> 1) & 1, n & 1)}
            groups={[]}
            formula={<>Diff = A'B + AB' = A ⊕ B</>}
            note="Diagonal 1s cannot be grouped, which is an XOR."
          />
          <KMap
            title="Borrow" rowVars={['A']} colVars={['B']}
            fn={(n) => borrowHalf((n >> 1) & 1, n & 1)}
            groups={[{ r: 0, c: 1, w: 1, h: 1, color: ACCENT }]}
            formula={<>Borrow = A'B</>}
            note="A single 1: borrow only when A = 0 and B = 1."
          />
        </div>
        <div style={{ height: 24 }} />
        <HalfCircuit />
        <div style={{ height: 24 }} />
        <Tiles items={[
          { title: 'Simple design', body: 'Only an XOR, a NOT and an AND, so it is cheap and quick to build.' },
          { title: 'Foundation for bigger circuits', body: 'Two half subtractors plus an OR make a full subtractor, which is the cell used in multi-bit subtraction.' },
          { title: 'Used in arithmetic units', body: 'Subtraction in ALUs, calculators and other digital devices builds on this cell.' },
        ]} />
        <div style={{ height: 24 }} />
        <Tiles tone="warn" items={[
          { title: 'Single-bit only', body: 'It subtracts just two bits and has no borrow-in, so it cannot take part in the middle of a multi-bit subtraction.' },
          { title: 'Delay builds up', body: 'Cascading many subtractor stages makes the borrow ripple through every stage and slows the circuit down.' },
        ]} />
      </Card>

      <Card kicker="Comparison" title="Half subtractor vs full subtractor">
        <P>The only real difference is the borrow-in. That one extra input is what makes the full subtractor usable in any column.</P>
        <CompareTable head={['Feature', 'Half subtractor', 'Full subtractor']} rows={halfVsFull} />
      </Card>

      <Card kicker="Comparison" title="Full subtractor vs full adder">
        <P>The two circuits are close relatives. The difference output is identical, and only the borrow equation swaps in complemented terms.</P>
        <CompareTable head={['Output', 'Full adder', 'Full subtractor']} rows={adderVsSub} />
      </Card>

      <Card kicker="Chaining" title="Building a multi-bit subtractor">
        <P>
          To compute A − B for two 4-bit numbers, line up four full subtractors. Each stage's Bout feeds the Bin of the stage to its left, and the first Bin is tied to 0.
        </P>
        <div style={{ marginBottom: 24 }}><RippleChain /></div>
        <P last>
          Like the ripple-carry adder, the borrow has to travel through every stage, so wide subtractors are slow. In practice, processors usually subtract by adding the two's complement instead.
        </P>
      </Card>

      <Card kicker="In HDL" title="Verilog version">
        <P>First, a direct description of the two output equations.</P>
        <CodeBlock lang="verilog">{verilogFlat}</CodeBlock>
        <div style={{ height: 24 }} />
        <P>Second, a structural version that mirrors the circuit diagram: two half subtractors and an OR.</P>
        <CodeBlock lang="verilog">{verilogStruct}</CodeBlock>
      </Card>

      <Card kicker="In practice" title="Where you will use it">
        <Tiles items={[
          { title: 'ALU subtraction', body: 'Subtraction hardware in arithmetic logic units is built from cells that work like this one.' },
          { title: 'Comparators', body: 'The final borrow of A − B tells you whether A < B, so subtractor chains can double as magnitude comparators.' },
          { title: 'Counters and difference logic', body: 'Down-counters and logic that finds the difference between two values use the same borrow chain.' },
        ]} />
        <div style={{ height: 24 }} />
        <Tiles tone="warn" items={[
          { title: 'Forgetting the borrow-in', body: 'Leaving Bin out gives a half subtractor. Any column except the lowest will then ignore a borrow from its right.' },
          { title: 'Swapping A and B', body: "Subtraction is not commutative. Borrow uses A', not B': A'B is 1 for 0 − 1, but 1 − 0 needs no borrow." },
          { title: 'Reading the outputs the wrong way round', body: 'Bout is the more significant bit. 0 − 1 − 1 gives Bout = 1 and D = 0, which stands for −2.' },
        ]} />
      </Card>

      <Card kicker="Practice" title="Test yourself">
        <P>Type the two-bit result as Borrow-out then Difference, then press Check.</P>
        <Practice items={practiceItems} />
      </Card>

      <Card kicker="Reference" title="Half subtractor on GeeksforGeeks">
  <iframe
    src="https://www.geeksforgeeks.org/digital-logic/half-subtractor-in-digital-logic/"
    title="Half Subtractor in Digital Logic"
    style={{ width: '100%', height: 600, border: `1px solid ${LINE}`, borderRadius: 8 }}
    loading="lazy"
    referrerPolicy="no-referrer"
  />
  <P last>
    If the page above is blank, the site does not allow embedding.{' '}
    <a href="https://www.geeksforgeeks.org/digital-logic/half-subtractor-in-digital-logic/" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>
      Open it in a new tab
    </a>.
  </P>
</Card>

      <Card kicker="Further reading" title="More on half subtractors">
        <P last>
          For another explanation of the half subtractor with its truth table and K-maps, see the GeeksforGeeks article at{' '}
          <a href="https://www.geeksforgeeks.org/digital-logic/half-subtractor-in-digital-logic/" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>
            Half Subtractor in Digital Logic
          </a>.
        </P>
      </Card>
    </PageShell>
  );
}
