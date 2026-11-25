import React from 'react';
import {
  ACCENT, SECONDARY, GREEN, INK, LINE,
  PageShell, Card, P, Mono, Bullets, Tiles, CodeBlock,
  Flow, TruthTable, KMap, Playground, Practice,
} from '../../../components/ConverterKit';

/* ─────────────── Helpers ─────────────── */
const grayToBin = (g) => {
  let out = g[0];
  for (let i = 1; i < g.length; i++) out += String(Number(out[i - 1]) ^ Number(g[i]));
  return out;
};
const prefixXor = (n) => { let b = 0; for (let s = n; s; s >>= 1) b ^= s; return b; };
const bits4 = (n) => [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];

/* ─────────────── Chain circuit: each XOR feeds the next ─────────────── */
function XorGate({ x, cy }) {
  return (
    <g transform={`translate(${x}, ${cy - 18})`}>
      <path d="M 0 0 Q 10 18 0 36 Q 24 36 36 18 Q 24 0 0 0 Z" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <path d="M -5 0 Q 5 18 -5 36" fill="none" stroke={INK} strokeWidth="1.5" />
      <text x="16" y="-6" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">XOR</text>
    </g>
  );
}

function ChainCircuit() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  const ins = [['G3', 40], ['G2', 100], ['G1', 160], ['G0', 220]];
  const outs = [['B3', 40], ['B2', 70], ['B1', 130], ['B0', 190]];

  return (
    <svg viewBox="0 0 560 250" style={{ width: '100%', maxWidth: 680, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` }} role="img" aria-label="Gray to binary logic circuit">
      {ins.map(([k, y]) => <text key={k} x="16" y={y + 5} fontSize="14" fontWeight="700" fill={SECONDARY}>{k}</text>)}

      {/* G3 passes straight through as B3 */}
      <line x1="50" y1="40" x2="500" y2="40" {...w} />
      <polyline points="100,40 100,61 150,61" {...w} />
      {/* G2 */}
      <polyline points="50,100 120,100 120,79 150,79" {...w} />
      {/* gate 1 -> B2, and on to gate 2 */}
      <line x1="186" y1="70" x2="500" y2="70" {...w} />
      <polyline points="230,70 230,121 270,121" {...w} />
      {/* G1 */}
      <polyline points="50,160 240,160 240,139 270,139" {...w} />
      {/* gate 2 -> B1, and on to gate 3 */}
      <line x1="306" y1="130" x2="500" y2="130" {...w} />
      <polyline points="350,130 350,181 390,181" {...w} />
      {/* G0 */}
      <polyline points="50,220 360,220 360,199 390,199" {...w} />
      {/* gate 3 -> B0 */}
      <line x1="426" y1="190" x2="500" y2="190" {...w} />

      {[[100, 40], [230, 70], [350, 130]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="3.5" fill={INK} />)}

      <XorGate x={150} cy={70} />
      <XorGate x={270} cy={130} />
      <XorGate x={390} cy={190} />

      {outs.map(([k, y]) => <text key={k} x="512" y={y + 5} fontSize="14" fontWeight="700" fill={GREEN}>{k}</text>)}
    </svg>
  );
}

/* ─────────────── Data ─────────────── */
const tableRows = Array.from({ length: 16 }, (_, g) => ({ cells: [...bits4(g), ...bits4(prefixXor(g))] }));

const practiceItems = ['1101', '0110', '1010', '10110'].map((g, i) => {
  const b = grayToBin(g);
  const qs = [
    'Convert the Gray code 1101 to binary.',
    'Convert the Gray code 0110 to binary.',
    'Convert the Gray code 1010 to binary.',
    'A 5-bit shaft encoder reads 10110. What is the binary position?',
  ];
  const steps = [g[0], ...[...g].slice(1).map((_, k) => `${b[k]} ⊕ ${g[k + 1]} = ${b[k + 1]}`)];
  return {
    q: qs[i],
    a: b,
    work: `Copy the first bit (${steps[0]}), then XOR each Gray bit with the binary bit before it: ${steps.slice(1).join(', ')}. Decimal value: ${parseInt(b, 2)}.`,
  };
});

const runConverter = (value) => {
  if (!value) return null;
  const n = value.length;
  const b = grayToBin(value);
  const steps = [`B${n - 1} = G${n - 1} = ${value[0]}`];
  for (let i = 1; i < n; i++) {
    steps.push(`B${n - 1 - i} = B${n - i} ⊕ G${n - 1 - i} = ${b[i - 1]} ⊕ ${value[i]} = ${b[i]}`);
  }
  return {
    cards: [
      { label: 'Gray', value: value },
      { label: 'Binary', value: b, accent: true },
      { label: 'Decimal', value: parseInt(b, 2) },
    ],
    steps,
  };
};

const verilog = `module gray_to_bin (
  input  [3:0] g,
  output [3:0] b
);
  assign b[3] = g[3];
  assign b[2] = b[3] ^ g[2];
  assign b[1] = b[2] ^ g[1];
  assign b[0] = b[1] ^ g[0];
endmodule`;

/* ─────────────── Page ─────────────── */
export default function GrayToBinPage() {
  return (
    <PageShell
      title="Gray to Binary"
      lead="Decode Gray code back into ordinary binary by carrying a running XOR from the most significant bit down."
      prev={{ to: '/topics/code-converters/bin-to-gray', title: 'Binary to Gray', sub: 'The forward conversion' }}
      next={{ to: '/topics/code-converters/bcd-to-xs3', title: 'BCD to Excess-3', sub: 'Add 3 to each digit' }}
    >
      <Card kicker="The idea" title="How the decoding works">
        <P>
          Gray code is handy for hardware that has to read a changing value, because only one bit flips per step. But arithmetic and comparisons need plain binary, so a Gray-to-binary converter sits between the sensor and the rest of the logic.
        </P>
        <Bullets items={[
          <>The most significant bit is copied unchanged: <Mono>B3 = G3</Mono></>,
          <>Every lower bit is the Gray bit XORed with the binary bit just above it: <Mono>Bi = B(i+1) ⊕ Gi</Mono></>,
        ]} />
        <Flow
          top={{ label: 'Gray', bits: [1, 1, 0, 1] }}
          tags={['copy', '1⊕1', '0⊕0', '0⊕1']}
          bottom={{ label: 'Binary', bits: [1, 0, 0, 1] }}
          caption="Gray 1101 decodes to binary 1001 (decimal 9). Each XOR uses the binary bit already produced to its left."
        />
      </Card>

      <Card kicker="Try it" title="Live converter">
        <P>Type up to 8 Gray bits and watch each step of the chain.</P>
        <Playground
          label="Gray code"
          allowed={/[^01]/g}
          maxLen={8}
          placeholder="e.g. 1101"
          initial="1101"
          samples={['0110', '1010', '1111', '10110']}
          run={runConverter}
        />
      </Card>

      <Card kicker="Truth table" title="4-bit conversion table">
        <P>The same sixteen pairs as the Binary to Gray table, read in the opposite direction: now the Gray value is the input.</P>
        <TruthTable inHeads={['G3', 'G2', 'G1', 'G0']} outHeads={['B3', 'B2', 'B1', 'B0']} inTitle="Gray" outTitle="Binary" rows={tableRows} />
      </Card>

      <Card kicker="Simplification" title="Expressions from K-maps">
        <P>
          The first two bits reduce to the same shapes as before. The lower two do not: their K-maps are striped or checkerboard patterns where no 1s can be merged, which is the signature of an XOR chain.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          <KMap
            title="Binary bit B3" rowVars="G3G2" colVars="G1G0"
            fn={(n) => (prefixXor(n) >> 3) & 1}
            groups={[{ r: 2, c: 0, w: 4, h: 2, color: '#06b6d4' }]}
            formula={<>B<sub>3</sub> = G<sub>3</sub></>}
            note="One group of eight: a plain wire."
          />
          <KMap
            title="Binary bit B2" rowVars="G3G2" colVars="G1G0"
            fn={(n) => (prefixXor(n) >> 2) & 1}
            groups={[
              { r: 1, c: 0, w: 4, h: 1, color: ACCENT },
              { r: 3, c: 0, w: 4, h: 1, color: '#ec4899' },
            ]}
            formula={<>B<sub>2</sub> = G<sub>3</sub>'G<sub>2</sub> + G<sub>3</sub>G<sub>2</sub>' = G<sub>3</sub> ⊕ G<sub>2</sub></>}
            note="Two full-row groups of four."
          />
          <KMap
            title="Binary bit B1" rowVars="G3G2" colVars="G1G0"
            fn={(n) => (prefixXor(n) >> 1) & 1}
            groups={[
              { r: 0, c: 2, w: 2, h: 1, color: SECONDARY },
              { r: 1, c: 0, w: 2, h: 1, color: GREEN },
              { r: 2, c: 2, w: 2, h: 1, color: '#f59e0b' },
              { r: 3, c: 0, w: 2, h: 1, color: '#ef4444' },
            ]}
            formula={<>B<sub>1</sub> = G<sub>3</sub> ⊕ G<sub>2</sub> ⊕ G<sub>1</sub></>}
            note="Only pairs fit: four product terms, which collapse into a three-input XOR."
          />
          <KMap
            title="Binary bit B0" rowVars="G3G2" colVars="G1G0"
            fn={(n) => prefixXor(n) & 1}
            groups={[]}
            formula={<>B<sub>0</sub> = G<sub>3</sub> ⊕ G<sub>2</sub> ⊕ G<sub>1</sub> ⊕ G<sub>0</sub></>}
            note="A checkerboard: no two 1s touch, so nothing can be grouped."
          />
        </div>
      </Card>

      <Card kicker="Implementation" title="Logic circuit">
        <P>
          Because every output depends on the one above it, the three XOR gates are chained: B2 feeds the gate for B1, and B1 feeds the gate for B0.
        </P>
        <div style={{ marginBottom: 24 }}><ChainCircuit /></div>
        <P last>
          The trade-off is speed. In the Binary to Gray circuit every gate works in parallel, but here the signal ripples through up to n − 1 gates. For wide words, designers rewrite the chain as a balanced XOR tree to cut the depth.
        </P>
      </Card>

      <Card kicker="In HDL" title="Verilog version">
        <P>The chain maps one-to-one onto continuous assignments, so it synthesises to exactly the circuit above.</P>
        <CodeBlock lang="verilog">{verilog}</CodeBlock>
      </Card>

      <Card kicker="In practice" title="Where you will use it">
        <Tiles items={[
          { title: 'Rotary and linear encoders', body: 'Optical shaft encoders output Gray code so that a misread at a boundary is off by at most one step. The controller decodes it to binary to get the angle or position.' },
          { title: 'Async FIFO pointers', body: 'Read and write pointers cross clock domains in Gray form to avoid glitches. Decoding them back to binary lets you compute how full the FIFO is.' },
          { title: 'Testbench round trips', body: 'A quick self-check is to convert any binary value to Gray and back. If the result differs from the original, one of the two converters is wrong.' },
        ]} />
        <div style={{ height: 24 }} />
        <Tiles tone="warn" items={[
          { title: 'XORing with the wrong neighbour', body: 'Binary to Gray uses the previous binary bit. Gray to Binary must use the previous decoded binary bit, not the Gray bit above.' },
          { title: 'Reading the bits in reverse', body: 'The chain starts at the MSB. Starting from the LSB gives a different, wrong answer.' },
        ]} />
      </Card>

      <Card kicker="Practice" title="Test yourself">
        <P>Type the binary result, then press Check. Spaces are ignored.</P>
        <Practice items={practiceItems} />
      </Card>
    </PageShell>
  );
}
