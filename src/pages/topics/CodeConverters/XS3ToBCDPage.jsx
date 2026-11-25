import React from 'react';
import {
  ACCENT, SECONDARY, GREEN,
  PageShell, Card, P, Mono, Bullets, Tiles, StepList, CodeBlock,
  Flow, TruthTable, KMap, ConverterCircuit, CircuitLegend, Playground, Practice,
} from '../../../components/ConverterKit';

/* ─────────────── Helpers ─────────────── */
const nib = (n) => n.toString(2).padStart(4, '0');
const bits4 = (n) => nib(n).split('').map(Number);
const valid = (n) => n >= 3 && n <= 12;
const xs3 = (d) => nib(d + 3);

/* Output bit k (A=3, B=2, C=1, D=0); codes outside 0011–1100 never occur, so they are don't-cares */
const bit = (k) => (n) => (valid(n) ? ((n - 3) >> k) & 1 : 'X');

const tableRows = Array.from({ length: 16 }, (_, n) => ({
  cells: [...bits4(n), ...(valid(n) ? bits4(n - 3) : ['X', 'X', 'X', 'X'])],
  dim: !valid(n),
}));

const runConverter = (value) => {
  const raw = value.replace(/ /g, '');
  if (!raw) return null;
  if (raw.length < 4) return { error: 'Enter at least 4 bits: one Excess-3 digit.' };

  const groups = [];
  for (let i = 0; i + 4 <= raw.length; i += 4) groups.push(raw.slice(i, i + 4));
  const leftover = raw.length % 4;

  const steps = groups.map((g) => {
    const n = parseInt(g, 2);
    return valid(n)
      ? `${g} (${n}) − 0011 (3) = ${nib(n - 3)} → digit ${n - 3}`
      : `${g} is not a valid Excess-3 code (valid range is 0011 to 1100)`;
  });
  if (leftover) steps.push(`${leftover} extra bit${leftover > 1 ? 's' : ''} ignored: digits need groups of four`);

  return {
    cards: [
      { label: 'Excess-3', value: groups.join(' ') },
      { label: 'BCD', value: groups.map((g) => (valid(parseInt(g, 2)) ? nib(parseInt(g, 2) - 3) : '----')).join(' '), accent: true },
      { label: 'Decimal', value: groups.map((g) => (valid(parseInt(g, 2)) ? parseInt(g, 2) - 3 : '?')).join('') },
    ],
    steps,
  };
};

const practiceItems = [
  { q: 'Convert the Excess-3 digit 1000 to BCD.', a: nib(5), work: '1000 is 8. Subtract 3 to get 5, which is 0101.' },
  { q: 'Convert 0110 0100 from Excess-3 to BCD (two groups).', a: `${nib(3)} ${nib(1)}`, work: '0110 (6) → 3 → 0011 and 0100 (4) → 1 → 0001, so the number is 31.' },
  { q: 'Convert 1011 0011 0111 from Excess-3 to BCD (three groups).', a: `${nib(8)} ${nib(0)} ${nib(4)}`, work: '1011 (11) → 8, 0011 (3) → 0, 0111 (7) → 4, so the number is 804.' },
  { q: 'Is 1110 a valid Excess-3 digit? Answer yes or no.', a: 'no', work: 'Valid codes only run from 0011 to 1100. 1110 would decode to 11, which is not a decimal digit.' },
];

const verilog = `module xs3_to_bcd (
  input  w, x, y, z,        // Excess-3 digit, w is the MSB
  output a, b, c, d         // BCD digit
);
  wire p = y & z;           // shared term
  assign a = w & (x | p);
  assign b = ~(x ^ p);
  assign c = y ^ z;
  assign d = ~z;
endmodule`;

const kmapGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 };

/* ─────────────── Page ─────────────── */
export default function XS3ToBCDPage() {
  return (
    <PageShell
      title="Excess-3 to BCD"
      lead="Undo the +3 offset of Excess-3 code and recover the plain BCD digit, one 4-bit group at a time."
      prev={{ to: '/topics/code-converters/bcd-to-xs3', title: 'BCD to Excess-3', sub: 'Add 3 to each digit' }}
      next={{ to: '/topics/code-converters', title: 'Code Converters Overview', sub: 'Back to the full list', label: 'Wrap up' }}
    >
      <Card kicker="The idea" title="How the conversion works">
        <P>
          Excess-3 stores every decimal digit plus three. To get a displayable BCD digit back, take each 4-bit group and subtract 0011. This is the last step after XS-3 arithmetic, before the result goes to a display driver.
        </P>
        <Bullets items={[
          <>Work on one group at a time: <Mono>BCD = XS-3 − 0011</Mono></>,
          <>Only 0011 to 1100 are valid Excess-3 digits (decimal 0 to 9).</>,
          <>The other six patterns, 0000 to 0010 and 1101 to 1111, signal an error upstream.</>,
        ]} />
        <Flow
          top={{ label: 'Excess-3', bits: [1, 0, 0, 0] }}
          mid="− 0 0 1 1"
          bottom={{ label: 'BCD', bits: [0, 1, 0, 1] }}
          caption="1000 is 8. Subtracting three leaves 5, written 0101 in BCD."
        />
      </Card>

      <Card kicker="Try it" title="Live converter">
        <P>Enter Excess-3 bits in groups of four. Spaces are optional, and invalid groups are flagged.</P>
        <Playground
          label="Excess-3 code"
          allowed={/[^01 ]/g}
          maxLen={19}
          placeholder="e.g. 0101 1000 1100"
          initial="0101 1000 1100"
          samples={['0011', '0110 0100', '1110']}
          run={runConverter}
        />
      </Card>

      <Card kicker="Truth table" title="Excess-3 to BCD table">
        <P>Ten valid codes, plus six patterns that should never appear and are marked as don't-cares.</P>
        <TruthTable inHeads={['W', 'X', 'Y', 'Z']} outHeads={['A', 'B', 'C', 'D']} inTitle="Excess-3" outTitle="BCD" rows={tableRows} />
      </Card>

      <Card kicker="Simplification" title="Expressions from K-maps">
        <P>
          The invalid codes show as × cells. Including them in groups is free, and it is what makes the expressions short. Dashed outlines wrap around the edge of the map.
        </P>
        <div style={kmapGrid}>
          <KMap
            title="BCD bit A" rowVars="WX" colVars="YZ" fn={bit(3)}
            groups={[
              { r: 2, c: 0, w: 4, h: 1, color: ACCENT },
              { r: 2, c: 2, w: 1, h: 2, color: SECONDARY },
            ]}
            formula={<>A = WX + WYZ</>}
            note="A full row plus a vertical pair that borrows a don't-care."
          />
          <KMap
            title="BCD bit B" rowVars="WX" colVars="YZ" fn={bit(2)}
            groups={[
              { r: 0, c: 0, w: 2, h: 1, color: '#f59e0b', wrap: true },
              { r: 3, c: 0, w: 2, h: 1, color: '#f59e0b', wrap: true },
              { r: 0, c: 0, w: 1, h: 1, color: '#ec4899', wrap: true },
              { r: 0, c: 3, w: 1, h: 1, color: '#ec4899', wrap: true },
              { r: 3, c: 0, w: 1, h: 1, color: '#ec4899', wrap: true },
              { r: 3, c: 3, w: 1, h: 1, color: '#ec4899', wrap: true },
              { r: 1, c: 2, w: 1, h: 2, color: '#06b6d4' },
            ]}
            formula={<>B = X'Y' + X'Z' + XYZ</>}
            note="Amber: X'Y'. Pink corners: X'Z'. Cyan: XYZ."
          />
          <KMap
            title="BCD bit C" rowVars="WX" colVars="YZ" fn={bit(1)}
            groups={[
              { r: 0, c: 1, w: 1, h: 4, color: GREEN },
              { r: 0, c: 3, w: 1, h: 4, color: '#ef4444' },
            ]}
            formula={<>C = Y'Z + YZ' = Y ⊕ Z</>}
            note="Two vertical groups of four."
          />
          <KMap
            title="BCD bit D" rowVars="WX" colVars="YZ" fn={bit(0)}
            groups={[
              { r: 0, c: 0, w: 1, h: 4, color: ACCENT, wrap: true },
              { r: 0, c: 3, w: 1, h: 4, color: ACCENT, wrap: true },
            ]}
            formula={<>D = Z'</>}
            note="The two outer columns join into one group of eight."
          />
        </div>
      </Card>

      <Card kicker="Implementation" title="Logic circuit">
        <P>Rewriting the expressions around the product YZ saves gates:</P>
        <Bullets items={[
          <><Mono>A = W(X + YZ)</Mono> because WX + WYZ factors on W.</>,
          <><Mono>B = X ⊙ (YZ)</Mono>, an XNOR, because X'(YZ)' + X(YZ) is exactly an equality test.</>,
          <><Mono>C</Mono> is one XOR gate and <Mono>D</Mono> is one inverter.</>,
        ]} />
        <div style={{ marginBottom: 12 }}>
          <ConverterCircuit
            inputs={['W', 'X', 'Y', 'Z']}
            outputs={['A', 'B', 'C', 'D']}
            midLabel="Y·Z"
            gates={[
              { sym: '&' },
              { sym: '≥1' },
              { sym: '&' },
              { sym: '=1', bubble: true },
              { sym: '=1' },
              { sym: '1', bubble: true },
            ]}
          />
          <CircuitLegend />
        </div>
      </Card>

      <Card kicker="Worked example" title="Adding in Excess-3, then decoding">
        <P>
          Excess-3 addition works digit by digit with one correction rule, and the decoder above turns the result back into BCD. Here is 7 + 8:
        </P>
        <StepList items={[
          { title: 'Encode both digits', body: '7 → 1010 and 8 → 1011 in Excess-3.', mono: true },
          { title: 'Add them as plain binary', body: '1010 + 1011 = 1 0101, so the digit sum is 0101 with a carry out.', mono: true },
          { title: 'Apply the correction', body: 'A carry means add 3 to the sum group (0101 + 0011 = 1000). With no carry, you would subtract 3 instead.', mono: true },
          { title: 'Decode with this converter', body: 'Sum digit 1000 → 0101 (5). Carry digit 0100 → 0001 (1). The answer is 15.', mono: true },
        ]} />
      </Card>

      <Card kicker="In HDL" title="Verilog version">
        <P>
          Using <Mono>bcd = xs3 − 4'd3</Mono> is the compact form. The gate-level version below has the same behaviour for valid codes and shows the shared Y·Z term.
        </P>
        <CodeBlock lang="verilog">{verilog}</CodeBlock>
      </Card>

      <Card kicker="In practice" title="Things to watch for">
        <Tiles tone="warn" items={[
          { title: 'Invalid codes', body: 'Patterns 0000 to 0010 and 1101 to 1111 are don’t-cares, so this circuit gives meaningless output for them. Add an error flag if the source is not guaranteed clean.' },
          { title: 'Forgetting the correction', body: 'Raw Excess-3 sums are off by 3 or 6 until the carry-based correction is applied. Decode only after correcting.' },
          { title: 'Whole number vs digit', body: 'Subtracting 3 from a multi-digit value as one binary number is wrong. Each 4-bit group is decoded on its own.' },
        ]} />
      </Card>

      <Card kicker="Practice" title="Test yourself">
        <P>Type the answer, then press Check. Spaces between groups are optional.</P>
        <Practice items={practiceItems} />
      </Card>
    </PageShell>
  );
}
