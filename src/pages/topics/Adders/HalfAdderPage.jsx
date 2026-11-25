import React from 'react';
import {
  ACCENT, SECONDARY, GREEN, INK, LINE,
  PageShell, Card, P, Mono, Bullets, Tiles, CodeBlock,
  Flow, TruthTable, Playground, Practice,
} from '../../../components/ConverterKit';

/* ─────────────── Helpers (all local to this file) ─────────────── */
const sumBit = (a, b) => a ^ b;
const carryBit = (a, b) => a & b;

const tableRows = Array.from({ length: 4 }, (_, n) => {
  const a = (n >> 1) & 1;
  const b = n & 1;
  return { cells: [a, b, sumBit(a, b), carryBit(a, b)] };
});

const runAdder = (value) => {
  if (!value) return null;
  const bits = value.split('').map(Number);
  if (bits.length !== 2 || bits.some((x) => x !== 0 && x !== 1)) return null;
  const [a, b] = bits;
  const s = sumBit(a, b);
  const c = carryBit(a, b);
  return {
    cards: [
      { label: 'A + B', value: `${a} + ${b}` },
      { label: 'Sum', value: String(s), accent: true },
      { label: 'Carry', value: String(c) },
      { label: 'Result (C S)', value: `${c}${s}` },
    ],
    steps: [
      `Sum = A ⊕ B = ${a} ⊕ ${b} = ${s}`,
      `Carry = A · B = ${a} · ${b} = ${c}`,
      `Binary result = ${c}${s} (decimal ${a + b})`,
    ],
  };
};

const practiceItems = [[0, 1], [1, 0], [1, 1], [0, 0]].map(([a, b]) => ({
  q: `A half adder receives A = ${a} and B = ${b}. Write the outputs as Carry then Sum (two bits).`,
  a: `${carryBit(a, b)}${sumBit(a, b)}`,
  work: `Sum = ${a} ⊕ ${b} = ${sumBit(a, b)}. Carry = ${a} · ${b} = ${carryBit(a, b)}. Written as Carry then Sum: ${carryBit(a, b)}${sumBit(a, b)}, which is ${a} + ${b} = ${a + b} in decimal.`,
}));

const verilog = `module half_adder (
  input  a, b,
  output sum, carry
);
  assign sum   = a ^ b;
  assign carry = a & b;
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

/* ─────────────── Logic circuit ─────────────── */
function HalfCircuit() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  return (
    <svg viewBox="0 0 520 200" style={{ width: '100%', maxWidth: 680, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` }} role="img" aria-label="Half adder logic circuit: one XOR gate and one AND gate">
      <text x="16" y="56" fontSize="14" fontWeight="700" fill={SECONDARY}>A</text>
      <text x="16" y="105" fontSize="14" fontWeight="700" fill={SECONDARY}>B</text>

      {/* A: to XOR top pin, and down to AND top pin */}
      <line x1="50" y1="51" x2="200" y2="51" {...w} />
      <polyline points="110,51 110,131 200,131" {...w} />
      {/* B: to XOR bottom pin and AND bottom pin */}
      <polyline points="50,100 140,100" {...w} />
      <polyline points="200,69 140,69 140,149 200,149" {...w} />
      <circle cx="110" cy="51" r="3.5" fill={INK} />
      <circle cx="140" cy="100" r="3.5" fill={INK} />

      <Gate kind="XOR" x={200} cy={60} />
      <Gate kind="AND" x={200} cy={140} />

      <line x1="236" y1="60" x2="440" y2="60" {...w} />
      <line x1="236" y1="140" x2="440" y2="140" {...w} />

      <text x="452" y="65" fontSize="14" fontWeight="700" fill={GREEN}>Sum</text>
      <text x="452" y="145" fontSize="14" fontWeight="700" fill={GREEN}>Carry</text>
    </svg>
  );
}

/* ─────────────── K-map (local, 1 to 3 variable rows/cols) ─────────────── */
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
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto' }} role="img" aria-label={`K-map for ${title}`}>
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

/* ─────────────── Page ─────────────── */
export default function HalfAdderPage() {
  return (
    <PageShell
      title="Half Adder"
      lead="A half adder adds two single bits and produces a Sum bit and a Carry bit. It is the smallest building block of binary arithmetic."
      prev={{ to: '/topics/adders', title: 'Adders', sub: 'Back to overview' }}
      next={{ to: '/topics/adders/full-adder', title: 'Full Adder', sub: 'Adds a carry-in too' }}
    >
      <Card kicker="The idea" title="How it works">
        <P>
          Adding two bits gives a result between 0 and 2. Zero and one fit in a single bit, but two is written 10 in binary, so the answer needs two output bits: a Sum for this column and a Carry that belongs to the next column.
        </P>
        <Bullets items={[
          <>Sum is 1 when exactly one input is 1, which is XOR: <Mono>S = A ⊕ B</Mono></>,
          <>Carry is 1 only when both inputs are 1, which is AND: <Mono>C = A · B</Mono></>,
          <>It is called "half" because it has no carry-in, so it cannot accept a carry from a lower column.</>,
        ]} />
        <Flow
          top={{ label: 'Inputs A B', bits: [1, 1] }}
          tags={['A · B', 'A ⊕ B']}
          bottom={{ label: 'Carry Sum', bits: [1, 0] }}
          caption="1 + 1 = 10 in binary: the Sum bit is 0 and the Carry bit is 1."
        />
      </Card>

      <Card kicker="Try it" title="Live adder">
        <P>Enter two bits as A then B, for example 11.</P>
        <Playground
          label="A B"
          allowed={/[^01]/g}
          maxLen={2}
          placeholder="e.g. 11"
          initial="11"
          samples={['00', '01', '10', '11']}
          run={runAdder}
        />
      </Card>

      <Card kicker="Truth table" title="Half adder truth table">
        <P>All four input combinations and their outputs. Read Carry then Sum as a two-bit number to get A + B.</P>
        <TruthTable
          inHeads={['A', 'B']}
          outHeads={['S', 'C']}
          inTitle="Inputs"
          outTitle="Outputs"
          rows={tableRows}
        />
      </Card>

      <Card kicker="Simplification" title="Expressions from K-maps">
        <P>
          Each output has its own two-variable map. Carry has a single 1, so it is one product term. Sum has two 1s on the diagonal, which cannot be grouped, and that diagonal pattern is the mark of an XOR.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          <KMap
            title="Sum (S)" rowVars={['A']} colVars={['B']}
            fn={(n) => sumBit((n >> 1) & 1, n & 1)}
            groups={[]}
            formula={<>S = A'B + AB' = A ⊕ B</>}
            note="Diagonal 1s: no two touch, so each stays its own term."
          />
          <KMap
            title="Carry (C)" rowVars={['A']} colVars={['B']}
            fn={(n) => carryBit((n >> 1) & 1, n & 1)}
            groups={[{ r: 1, c: 1, w: 1, h: 1, color: ACCENT }]}
            formula={<>C = A · B</>}
            note="A single 1: one AND term."
          />
        </div>
      </Card>

      <Card kicker="Implementation" title="Logic circuit">
        <P>
          Both outputs read the same two inputs, so the circuit is just two gates side by side: an XOR for Sum and an AND for Carry. They work in parallel, so the delay is one gate.
        </P>
        <div style={{ marginBottom: 24 }}><HalfCircuit /></div>
        <P last>
          Gate cost: one XOR and one AND. That is the cheapest possible adder, but it only suits the least significant column, where there is never a carry coming in.
        </P>
      </Card>

      <Card kicker="In HDL" title="Verilog version">
        <P>Each output equation becomes one continuous assignment.</P>
        <CodeBlock lang="verilog">{verilog}</CodeBlock>
      </Card>

      <Card kicker="In practice" title="Where you will use it">
        <Tiles items={[
          { title: 'Least significant bit of an adder', body: 'The lowest column has no carry-in, so a half adder is enough there. Every higher column needs a full adder.' },
          { title: 'Building a full adder', body: 'Two half adders plus an OR gate make a full adder. Understanding this block first makes the next topic simple.' },
          { title: 'Incrementers and counters', body: 'Adding 1 to a number is a chain of half adders, where each carry feeds the next stage.' },
        ]} />
        <div style={{ height: 24 }} />
        <Tiles tone="warn" items={[
          { title: 'Using it in the middle of a word', body: 'A half adder has no carry-in input, so a carry from the column on the right is lost. Use a full adder there.' },
          { title: 'Mixing up Sum and Carry', body: 'Sum is XOR and Carry is AND. A quick check is 1 + 1: Sum must be 0 and Carry must be 1.' },
        ]} />
      </Card>

      <Card kicker="Practice" title="Test yourself">
        <P>Type the two-bit result as Carry then Sum, then press Check.</P>
        <Practice items={practiceItems} />
      </Card>
    </PageShell>
  );
}
