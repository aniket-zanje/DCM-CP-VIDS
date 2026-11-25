import React from 'react';
import {
  ACCENT, SECONDARY, GREEN, LINE, INK,
  PageShell, Card, P, Mono, Bullets, Tiles, CodeBlock,
  Flow, TruthTable, KMap, ConverterCircuit, CircuitLegend, Playground, Practice,
} from '../../../components/ConverterKit';

/* ─────────────── Helpers ─────────────── */
const nib = (n) => n.toString(2).padStart(4, '0');
const bits4 = (n) => nib(n).split('').map(Number);
const xs3 = (d) => nib(d + 3);
const invert = (s) => s.split('').map((c) => (c === '0' ? '1' : '0')).join('');

/* Output bit k (W=3, X=2, Y=1, Z=0); inputs above 9 never occur, so they are don't-cares */
const bit = (k) => (n) => (n > 9 ? 'X' : ((n + 3) >> k) & 1);

const tableRows = Array.from({ length: 16 }, (_, n) => ({
  cells: [...bits4(n), ...(n > 9 ? ['X', 'X', 'X', 'X'] : bits4(n + 3))],
  dim: n > 9,
}));

const selfComp = Array.from({ length: 10 }, (_, d) => ({
  d, code: xs3(d), inv: invert(xs3(d)), nine: xs3(9 - d),
}));

const runConverter = (value) => {
  if (!value) return null;
  const digits = [...value].map(Number);
  return {
    cards: [
      { label: 'Decimal', value: value },
      { label: 'BCD', value: digits.map((d) => nib(d)).join(' ') },
      { label: 'Excess-3', value: digits.map((d) => xs3(d)).join(' '), accent: true },
    ],
    steps: digits.map((d) => `${d} → BCD ${nib(d)} + 0011 = ${xs3(d)}`),
  };
};

const practiceItems = [
  { q: 'Write the Excess-3 code for the decimal digit 6.', a: xs3(6), work: '6 is 0110 in BCD. Adding 0011 gives 1001.' },
  { q: 'Convert decimal 47 to Excess-3 (two groups of four bits).', a: `${xs3(4)} ${xs3(7)}`, work: 'Handle each digit separately: 4 → 0111 and 7 → 1010.' },
  { q: 'Convert decimal 905 to Excess-3 (three groups).', a: `${xs3(9)} ${xs3(0)} ${xs3(5)}`, work: '9 → 1100, 0 → 0011, 5 → 1000.' },
  { q: 'The Excess-3 digit for 2 is 0101. Invert its bits. Which decimal digit do you get the Excess-3 code of?', a: '7', work: 'Inverting 0101 gives 1010, which is the Excess-3 code of 7. That is the 9’s complement of 2 (9 − 2 = 7).' },
];

const verilog = `module bcd_to_xs3 (
  input  a, b, c, d,        // BCD digit, a is the MSB
  output w, x, y, z         // Excess-3 digit
);
  wire cd = c | d;          // shared term
  assign w = a | (b & cd);
  assign x = b ^ cd;
  assign y = ~(c ^ d);
  assign z = ~d;
endmodule`;

const kmapGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 };

/* ─────────────── Page ─────────────── */
export default function BCDToXS3Page() {
  return (
    <PageShell
      title="BCD to Excess-3"
      lead="Shift every decimal digit up by three. The result, Excess-3 code, is a decimal code that can be inverted to get the 9’s complement."
      prev={{ to: '/topics/code-converters/gray-to-bin', title: 'Gray to Binary', sub: 'Running XOR decoding' }}
      next={{ to: '/topics/code-converters/xs3-to-bcd', title: 'Excess-3 to BCD', sub: 'Subtract 3 back out' }}
    >
      <Card kicker="The idea" title="How the conversion works">
        <P>
          BCD stores each decimal digit in its own 4-bit group using the plain binary value, 0000 to 1001. Excess-3 uses the same layout but stores the digit plus three, so the codes run from 0011 (for 0) to 1100 (for 9).
        </P>
        <Bullets items={[
          <>Convert one decimal digit at a time, never the whole number: <Mono>XS-3 = BCD + 0011</Mono></>,
          <>The largest digit 9 becomes 1100, so the addition never carries out of its group.</>,
          <>Codes 1010 to 1111 are not valid BCD, so they never reach this converter.</>,
        ]} />
        <Flow
          top={{ label: 'BCD', bits: [0, 1, 1, 0] }}
          mid="+ 0 0 1 1"
          bottom={{ label: 'Excess-3', bits: [1, 0, 0, 1] }}
          caption="The digit 6 is 0110 in BCD. Adding three gives 1001 in Excess-3."
        />
      </Card>

      <Card kicker="Try it" title="Live converter">
        <P>Enter a decimal number of up to six digits. Each digit is converted on its own.</P>
        <Playground
          label="Decimal number"
          allowed={/[^0-9]/g}
          maxLen={6}
          placeholder="e.g. 259"
          initial="259"
          samples={['6', '47', '905', '1999']}
          run={runConverter}
        />
      </Card>

      <Card kicker="Why it exists" title="The self-complementing property">
        <P>
          Flip every bit of an Excess-3 digit and you get the Excess-3 code of its 9’s complement. Subtractors built on 9’s complement arithmetic can therefore use a plain row of inverters, with no adder needed to form the complement.
        </P>
        <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <table style={{ borderCollapse: 'collapse', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, textAlign: 'center' }}>
            <thead>
              <tr style={{ background: INK, color: '#fff' }}>
                {['Digit', 'Excess-3', 'Inverted', 'Digit 9 − d', 'Match'].map((h) => <th key={h} style={{ padding: '10px 16px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {selfComp.map((r, i) => (
                <tr key={r.d} style={{ borderBottom: `1px solid ${LINE}`, background: i % 2 ? '#f8fafc' : '#fff' }}>
                  <td style={{ padding: '8px 16px', color: SECONDARY, fontWeight: 700 }}>{r.d}</td>
                  <td style={{ padding: '8px 16px' }}>{r.code}</td>
                  <td style={{ padding: '8px 16px' }}>{r.inv}</td>
                  <td style={{ padding: '8px 16px' }}>{9 - r.d} = {r.nine}</td>
                  <td style={{ padding: '8px 16px', color: GREEN, fontWeight: 800 }}>{r.inv === r.nine ? '✓' : '✗'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card kicker="Truth table" title="BCD to Excess-3 table">
        <P>Ten valid digits, plus the six unused 4-bit patterns marked as don't-cares.</P>
        <TruthTable inHeads={['A', 'B', 'C', 'D']} outHeads={['W', 'X', 'Y', 'Z']} inTitle="BCD" outTitle="Excess-3" rows={tableRows} />
      </Card>

      <Card kicker="Simplification" title="Expressions from K-maps">
        <P>
          Each output bit gets its own K-map. The shaded × cells are the six invalid inputs, and they can be treated as 1 or 0 whichever gives a bigger group. Dashed outlines wrap around the edge of the map.
        </P>
        <div style={kmapGrid}>
          <KMap
            title="Excess-3 bit W" rowVars="AB" colVars="CD" fn={bit(3)}
            groups={[
              { r: 2, c: 0, w: 4, h: 2, color: ACCENT },
              { r: 1, c: 1, w: 2, h: 2, color: SECONDARY },
              { r: 1, c: 2, w: 2, h: 2, color: GREEN },
            ]}
            formula={<>W = A + BC + BD</>}
            note="A uses the don't-care rows; BC and BD are 2×2 blocks."
          />
          <KMap
            title="Excess-3 bit X" rowVars="AB" colVars="CD" fn={bit(2)}
            groups={[
              { r: 0, c: 2, w: 2, h: 1, color: '#f59e0b', wrap: true },
              { r: 3, c: 2, w: 2, h: 1, color: '#f59e0b', wrap: true },
              { r: 0, c: 1, w: 2, h: 1, color: '#ec4899', wrap: true },
              { r: 3, c: 1, w: 2, h: 1, color: '#ec4899', wrap: true },
              { r: 1, c: 0, w: 1, h: 2, color: '#06b6d4' },
            ]}
            formula={<>X = B'C + B'D + BC'D'</>}
            note="Two groups wrap from the top row to the bottom row."
          />
          <KMap
            title="Excess-3 bit Y" rowVars="AB" colVars="CD" fn={bit(1)}
            groups={[
              { r: 0, c: 0, w: 1, h: 4, color: ACCENT },
              { r: 0, c: 2, w: 1, h: 4, color: SECONDARY },
            ]}
            formula={<>Y = CD + C'D' = (C ⊕ D)'</>}
            note="Two vertical groups of four: Y is an XNOR of C and D."
          />
          <KMap
            title="Excess-3 bit Z" rowVars="AB" colVars="CD" fn={bit(0)}
            groups={[
              { r: 0, c: 0, w: 1, h: 4, color: GREEN, wrap: true },
              { r: 0, c: 3, w: 1, h: 4, color: GREEN, wrap: true },
            ]}
            formula={<>Z = D'</>}
            note="The two outer columns join across the edge into one group of eight."
          />
        </div>
      </Card>

      <Card kicker="Implementation" title="Logic circuit">
        <P>
          Factoring lets the gates share work. The sum C + D appears in two outputs, so it is built once:
        </P>
        <Bullets items={[
          <><Mono>X = B ⊕ (C + D)</Mono> because B'(C + D) + B(C + D)' expands to the X expression above.</>,
          <><Mono>W = A + B(C + D)</Mono> reuses the same OR gate.</>,
          <><Mono>Y</Mono> is one XNOR gate and <Mono>Z</Mono> is one inverter.</>,
        ]} />
        <div style={{ marginBottom: 12 }}>
          <ConverterCircuit
            inputs={['A', 'B', 'C', 'D']}
            outputs={['W', 'X', 'Y', 'Z']}
            midLabel="C+D"
            gates={[
              { sym: '≥1' },
              { sym: '&' },
              { sym: '≥1' },
              { sym: '=1' },
              { sym: '=1', bubble: true },
              { sym: '1', bubble: true },
            ]}
          />
          <CircuitLegend />
        </div>
      </Card>

      <Card kicker="In HDL" title="Verilog version">
        <P>
          The shortest description is <Mono>xs3 = bcd + 4'd3</Mono> and the synthesis tool picks the gates. Writing the gates yourself, as below, gives the same truth table for valid digits and makes the shared term explicit.
        </P>
        <CodeBlock lang="verilog">{verilog}</CodeBlock>
      </Card>

      <Card kicker="In practice" title="Things to watch for">
        <Tiles tone="warn" items={[
          { title: 'Convert digit by digit', body: 'Decimal 10 is 0001 0000 in BCD and 0100 0011 in Excess-3. Adding 3 to the whole binary value 1010 is a different operation and gives the wrong answer.' },
          { title: 'Invalid BCD inputs', body: 'Inputs 1010 to 1111 are don’t-cares, so this circuit produces arbitrary output for them. If the source could send them, add a separate validity check.' },
          { title: 'Mind the bit order', body: 'A and W are the most significant bits. Swapping the order silently scrambles every digit.' },
        ]} />
      </Card>

      <Card kicker="Practice" title="Test yourself">
        <P>Type the answer, then press Check. Spaces between groups are optional.</P>
        <Practice items={practiceItems} />
      </Card>
    </PageShell>
  );
}
