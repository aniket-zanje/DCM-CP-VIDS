import React from 'react';
import {
  ACCENT, SECONDARY, GREEN, INK, LINE,
  PageShell, Card, P, Mono, Bullets, Tiles, CodeBlock,
  TruthTable, Playground, Practice,
} from '../../../components/ConverterKit';

/* ─────────────── Helpers (all local to this file) ─────────────── */
const sumBit = (a, b, cin) => a ^ b ^ cin;
const carryBit = (a, b, cin) => (a & b) | (cin & (a ^ b));

const tableRows = Array.from({ length: 8 }, (_, n) => {
  const a = (n >> 2) & 1;
  const b = (n >> 1) & 1;
  const cin = n & 1;
  return { cells: [a, b, cin, sumBit(a, b, cin), carryBit(a, b, cin)] };
});

const runAdder = (value) => {
  if (!value) return null;
  const bits = value.split('').map(Number);
  if (bits.length !== 3 || bits.some((x) => x !== 0 && x !== 1)) return null;
  const [a, b, cin] = bits;
  const s = sumBit(a, b, cin);
  const c = carryBit(a, b, cin);
  return {
    cards: [
      { label: 'A + B + Cin', value: `${a} + ${b} + ${cin}` },
      { label: 'Sum', value: String(s), accent: true },
      { label: 'Carry-out', value: String(c) },
      { label: 'Result (Cout S)', value: `${c}${s}` },
    ],
    steps: [
      `P = A ⊕ B = ${a} ⊕ ${b} = ${a ^ b}`,
      `Sum = P ⊕ Cin = ${a ^ b} ⊕ ${cin} = ${s}`,
      `Carry = AB + Cin·P = ${a & b} + ${cin & (a ^ b)} = ${c}`,
      `Binary result = ${c}${s} (decimal ${a + b + cin})`,
    ],
  };
};

const practiceItems = ['101', '111', '011', '110'].map((v) => {
  const [a, b, cin] = v.split('').map(Number);
  const s = sumBit(a, b, cin);
  const c = carryBit(a, b, cin);
  return {
    q: `A full adder receives A = ${a}, B = ${b}, Cin = ${cin}. Write the outputs as Cout then Sum.`,
    a: `${c}${s}`,
    work: `Count the 1s: ${a + b + cin}. Sum is 1 when that count is odd, so Sum = ${s}. Carry-out is 1 when the count is 2 or more, so Cout = ${c}. Written as Cout then Sum: ${c}${s}.`,
  };
});

const verilogFlat = `module full_adder (
  input  a, b, cin,
  output sum, cout
);
  assign sum  = a ^ b ^ cin;
  assign cout = (a & b) | (cin & (a ^ b));
endmodule`;

const verilogStruct = `module half_adder (
  input  a, b,
  output sum, carry
);
  assign sum   = a ^ b;
  assign carry = a & b;
endmodule

module full_adder_struct (
  input  a, b, cin,
  output sum, cout
);
  wire s1, c1, c2;
  half_adder ha1 (.a(a),  .b(b),   .sum(s1),  .carry(c1));
  half_adder ha2 (.a(s1), .b(cin), .sum(sum), .carry(c2));
  assign cout = c1 | c2;
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

/* ─────────────── Logic circuit: two half adders + OR ─────────────── */
function FullCircuit() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  const note = { fontSize: 10, fontWeight: 600, fill: '#64748b' };
  return (
    <svg viewBox="0 0 760 260" style={{ width: '100%', maxWidth: 760, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` }} role="img" aria-label="Full adder logic circuit built from two half adders and an OR gate">
      {/* half adder outlines */}
      <rect x="155" y="30" width="80" height="145" rx="8" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 4" />
      <rect x="405" y="30" width="80" height="175" rx="8" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="195" y="24" textAnchor="middle" {...note}>Half adder 1</text>
      <text x="445" y="24" textAnchor="middle" {...note}>Half adder 2</text>

      {/* input labels */}
      <text x="16" y="45" fontSize="14" fontWeight="700" fill={SECONDARY}>A</text>
      <text x="16" y="95" fontSize="14" fontWeight="700" fill={SECONDARY}>B</text>
      <text x="12" y="235" fontSize="14" fontWeight="700" fill={SECONDARY}>Cin</text>

      {/* A */}
      <polyline points="50,40 110,40 110,121 170,121" {...w} />
      <line x1="110" y1="51" x2="170" y2="51" {...w} />
      {/* B */}
      <polyline points="50,90 140,90" {...w} />
      <polyline points="170,69 140,69 140,139 170,139" {...w} />
      <circle cx="110" cy="51" r="3.5" fill={INK} />
      <circle cx="140" cy="90" r="3.5" fill={INK} />

      <Gate kind="XOR" x={170} cy={60} />
      <Gate kind="AND" x={170} cy={130} />

      {/* P = A xor B, into half adder 2 */}
      <line x1="206" y1="60" x2="420" y2="60" {...w} />
      <polyline points="330,60 330,161 420,161" {...w} />
      <circle cx="330" cy="60" r="3.5" fill={INK} />
      <text x="262" y="53" {...note}>P = A ⊕ B</text>

      {/* G = A and B, goes to OR */}
      <polyline points="206,130 520,130 520,141 580,141" {...w} />
      <text x="262" y="123" {...note}>G = A·B</text>

      {/* Cin */}
      <polyline points="50,230 380,230 380,78 420,78" {...w} />
      <line x1="380" y1="179" x2="420" y2="179" {...w} />
      <circle cx="380" cy="179" r="3.5" fill={INK} />

      <Gate kind="XOR" x={420} cy={69} />
      <Gate kind="AND" x={420} cy={170} />

      {/* Sum out */}
      <line x1="456" y1="69" x2="690" y2="69" {...w} />
      <text x="702" y="74" fontSize="14" fontWeight="700" fill={GREEN}>Sum</text>

      {/* AND2 to OR */}
      <polyline points="456,170 545,170 545,159 580,159" {...w} />
      <text x="470" y="164" {...note}>P·Cin</text>

      <Gate kind="OR" x={580} cy={150} />
      <line x1="616" y1="150" x2="690" y2="150" {...w} />
      <text x="702" y="155" fontSize="14" fontWeight="700" fill={GREEN}>Cout</text>
    </svg>
  );
}

/* ─────────────── Ripple-carry chain of four full adders ─────────────── */
function RippleChain() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  const xs = [70, 210, 350, 490];
  return (
    <svg viewBox="0 0 680 190" style={{ width: '100%', maxWidth: 720, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` }} role="img" aria-label="Four full adders chained so each carry-out feeds the next carry-in">
      {xs.map((x, k) => {
        const i = 3 - k;
        return (
          <g key={x}>
            <rect x={x} y="55" width="90" height="70" rx="8" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
            <text x={x + 45} y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>FA{i}</text>
            <text x={x + 45} y="104" textAnchor="middle" fontSize="10" fill="#64748b">full adder</text>
            {/* inputs */}
            <line x1={x + 28} y1="22" x2={x + 28} y2="55" {...w} />
            <line x1={x + 62} y1="22" x2={x + 62} y2="55" {...w} />
            <text x={x + 28} y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill={SECONDARY}>A{i}</text>
            <text x={x + 62} y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill={SECONDARY}>B{i}</text>
            {/* sum */}
            <line x1={x + 45} y1="125" x2={x + 45} y2="158" {...w} />
            <text x={x + 45} y="175" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREEN}>S{i}</text>
            {/* carry to the next (left) stage */}
            <line x1={x} y1="90" x2={x - 50} y2="90" {...w} />
          </g>
        );
      })}
      <text x="12" y="82" fontSize="12" fontWeight="700" fill={GREEN}>Cout</text>
      {[1, 2, 3].map((k) => (
        <text key={k} x={xs[k] - 25} y="82" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">C{4 - k}</text>
      ))}
      <line x1="580" y1="90" x2="630" y2="90" {...w} />
      <text x="636" y="94" fontSize="12" fontWeight="700" fill={SECONDARY}>Cin</text>
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

/* ─────────────── Half vs full comparison ─────────────── */
const compareRows = [
  ['Inputs', 'A, B (2 bits)', 'A, B, Cin (3 bits)'],
  ['Outputs', 'Sum, Carry', 'Sum, Carry-out'],
  ['Sum equation', 'A ⊕ B', 'A ⊕ B ⊕ Cin'],
  ['Carry equation', 'A · B', 'AB + Cin(A ⊕ B)'],
  ['Truth table rows', '4', '8'],
  ['Gates', '1 XOR, 1 AND', '2 XOR, 2 AND, 1 OR'],
  ['Accepts a carry from the right', 'No', 'Yes'],
  ['Best used for', 'Lowest bit only', 'Every bit of a multi-bit adder'],
];

function CompareTable() {
  const cell = { padding: '10px 12px', borderBottom: `1px solid ${LINE}`, fontSize: 14, textAlign: 'left' };
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
        <thead>
          <tr>
            <th style={{ ...cell, color: '#64748b' }}>Feature</th>
            <th style={{ ...cell, color: SECONDARY }}>Half adder</th>
            <th style={{ ...cell, color: ACCENT }}>Full adder</th>
          </tr>
        </thead>
        <tbody>
          {compareRows.map(([f, h, u]) => (
            <tr key={f}>
              <td style={{ ...cell, fontWeight: 600, color: INK }}>{f}</td>
              <td style={{ ...cell, color: INK }}>{h}</td>
              <td style={{ ...cell, color: INK }}>{u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── Page ─────────────── */
export default function FullAdderPage() {
  return (
    <PageShell
      title="Full Adder"
      lead="A full adder adds three single bits, A, B, and a carry-in, and produces a Sum bit and a Carry-out bit."
      prev={{ to: '/topics/adders/half-adder', title: 'Half Adder', sub: 'Two inputs, no carry-in' }}
      next={{ to: '/topics/adders', title: 'Adders', sub: 'Back to overview' }}
    >
      <Card kicker="The idea" title="What it does">
        <P>
          A full adder handles one column of binary addition. It takes the two bits in that column plus any carry from the column to its right, and outputs the sum bit for the column and the carry into the next column.
        </P>
        <Bullets items={[
          <>Sum is 1 when an odd number of inputs are 1: <Mono>S = A ⊕ B ⊕ Cin</Mono></>,
          <>Carry-out is 1 when at least two inputs are 1: <Mono>Cout = AB + Cin(A ⊕ B)</Mono></>,
          <>The three inputs add up to 0 to 3, which fits in two bits: read Cout then Sum as a two-bit number.</>,
          <>Chaining full adders, with each Cout feeding the next Cin, builds multi-bit adders.</>,
        ]} />
      </Card>

      <Card kicker="Try it" title="Live adder">
        <P>Enter three bits as A, B, Cin, for example 101.</P>
        <Playground
          label="A B Cin"
          allowed={/[^01]/g}
          maxLen={3}
          placeholder="e.g. 110"
          initial="110"
          samples={['000', '011', '101', '111']}
          run={runAdder}
        />
      </Card>

      <Card kicker="Truth table" title="Full adder truth table">
        <P>All eight input combinations and their outputs. Notice that Sum follows the parity of the inputs, and Cout is 1 whenever two or more inputs are 1.</P>
        <TruthTable
          inHeads={['A', 'B', 'Cin']}
          outHeads={['S', 'Cout']}
          inTitle="Inputs"
          outTitle="Outputs"
          rows={tableRows}
        />
      </Card>

      <Card kicker="Simplification" title="Expressions from K-maps">
        <P>
          Each output has a three-variable map with A on the rows and B, Cin on the columns. Sum is a checkerboard, so nothing groups and it stays a three-input XOR. Cout groups into three pairs.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <KMap
            title="Sum (S)" rowVars={['A']} colVars={['B', 'Cin']}
            fn={(n) => sumBit((n >> 2) & 1, (n >> 1) & 1, n & 1)}
            groups={[]}
            formula={<>S = A ⊕ B ⊕ Cin</>}
            note="A checkerboard: no two 1s touch, so nothing can be grouped."
          />
          <KMap
            title="Carry-out (Cout)" rowVars={['A']} colVars={['B', 'Cin']}
            fn={(n) => carryBit((n >> 2) & 1, (n >> 1) & 1, n & 1)}
            groups={[
              { r: 1, c: 2, w: 2, h: 1, color: ACCENT },
              { r: 1, c: 1, w: 2, h: 1, color: GREEN },
              { r: 0, c: 2, w: 1, h: 2, color: '#f59e0b' },
            ]}
            formula={<>Cout = AB + A·Cin + B·Cin</>}
            note="Three overlapping pairs: this is the majority function."
          />
        </div>
        <div style={{ height: 16 }} />
        <P last>
          The circuit below uses an equivalent form, <Mono>Cout = AB + Cin(A ⊕ B)</Mono>. It reuses the A ⊕ B term that Sum already needs, so no extra XOR is required.
        </P>
      </Card>

      <Card kicker="Implementation" title="Logic circuit">
        <P>
          Two half adders and one OR gate. The first half adder adds A and B. The second adds that partial sum P to Cin, and gives the final Sum. If either half adder produces a carry, Cout is 1.
        </P>
        <div style={{ marginBottom: 24 }}><FullCircuit /></div>
        <P last>
          The two carries G = A·B and P·Cin can never both be 1 at once, which is why a plain OR is enough to combine them. Total cost: two XOR, two AND and one OR gate.
        </P>
      </Card>

      <Card kicker="Comparison" title="Half adder vs full adder">
        <P>The only real difference is the carry-in. That one extra input is what makes a full adder usable in any column.</P>
        <CompareTable />
      </Card>

      <Card kicker="Chaining" title="Building a multi-bit adder">
        <P>
          To add two 4-bit numbers, line up four full adders. Each stage's Cout feeds the Cin of the stage to its left, and the first Cin is tied to 0 (or used as an extra carry input).
        </P>
        <div style={{ marginBottom: 24 }}><RippleChain /></div>
        <P last>
          This is a ripple-carry adder. It is small and simple, but the carry has to travel through every stage, so wide adders are slow. Faster designs such as carry-lookahead compute the carries in parallel.
        </P>
      </Card>

      <Card kicker="In HDL" title="Verilog version">
        <P>First, a direct description of the two output equations.</P>
        <CodeBlock lang="verilog">{verilogFlat}</CodeBlock>
        <div style={{ height: 24 }} />
        <P>Second, a structural version that mirrors the circuit diagram: two half adders and an OR.</P>
        <CodeBlock lang="verilog">{verilogStruct}</CodeBlock>
      </Card>

      <Card kicker="In practice" title="Where you will use it">
        <Tiles items={[
          { title: 'ALU adders', body: 'Every processor ALU contains a row of full adders, one per bit, to add and subtract integers.' },
          { title: 'Subtractors', body: 'Subtraction is addition of the two\'s complement, so the same full adders do both jobs with a few XOR gates in front.' },
          { title: 'Counters and accumulators', body: 'Adding a running total to a new value, bit by bit, is a full adder chain with a register at the output.' },
        ]} />
        <div style={{ height: 24 }} />
        <Tiles tone="warn" items={[
          { title: 'Forgetting the carry-in', body: 'Leaving Cin out gives a half adder. Any column except the lowest will then lose the carry from its right.' },
          { title: 'Reading the outputs the wrong way round', body: 'Cout is the more significant bit. 1 + 1 + 1 = 11, so Cout = 1 and Sum = 1, not the other way round in general.' },
          { title: 'Using OR instead of XOR for Sum', body: 'With all three inputs at 1, an OR gives 1 for Sum, which happens to match, but 1 + 1 + 0 would wrongly give 1 instead of 0.' },
        ]} />
      </Card>

      <Card kicker="Practice" title="Test yourself">
        <P>Type the two-bit result as Cout then Sum, then press Check.</P>
        <Practice items={practiceItems} />
      </Card>
    </PageShell>
  );
}
