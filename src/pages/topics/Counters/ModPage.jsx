import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const GFG = 'https://media.geeksforgeeks.org/wp-content/uploads/';
const nextMod = (s) => (s + 1) % 10;
/* T input for bit k of a mod-10 counter; states 10 to 15 never occur, so they are don't-cares */
const T = (k) => (n) => (n > 9 ? 'X' : ((n ^ nextMod(n)) >> k) & 1);
const kBase = { rowVars: 'Q3Q2', colVars: 'Q1Q0' };

export default function ModPage() {
  return (
    <CounterPage
      title="Mod Counter (Modulo Counter)"
      lead="A counter that stops short of its full binary range: it counts N states and then resets. Mod-10, the decade counter, is the classic example."
      prev={NAV.syncUpDown}
      next={NAV.ring}
      facts={[
        { label: 'Modulus', value: 'N (here 10)' },
        { label: 'Flip-flops', value: 'n, with N ≤ 2ⁿ' },
        { label: 'Sequence', value: '0 → N − 1', mono: true },
        { label: 'Unused states', value: '2ⁿ − N' },
        { label: 'Output frequency', value: 'f ÷ N' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is a modulus counter?',
          blocks: [
            { type: 'p', text: 'A plain n-bit binary counter has 2ⁿ states, so its modulus is always a power of two. A MOD-N counter cuts the sequence short: it counts from 0 to N − 1 and then returns to 0. The modulus is the number of distinct states in one cycle, and it is also the factor by which the counter divides the clock frequency.' },
            {
              type: 'keypoints', items: [
                { title: 'N states per cycle', body: 'A MOD-10 counter shows 0000 to 1001 (0 to 9) and then goes back to 0000.' },
                { title: 'Choosing flip-flops', body: 'Use the smallest n with N ≤ 2ⁿ. MOD-10 needs 4 flip-flops, because 3 give only 8 states.' },
                { title: 'Unused states', body: '2ⁿ − N states never occur. They become don\'t-cares in the K-maps and give simpler logic.' },
                { title: 'Divide by N', body: 'The terminal state repeats once every N clocks, so the output frequency is f ÷ N.' },
              ],
            },
            { type: 'note', text: 'A ripple counter can be truncated differently: a gate detects state N and clears all flip-flops straight away. It is cheap, but state N flashes briefly as a glitch before the reset. The synchronous design below avoids that.' },
          ],
        },
        {
          kicker: 'Design', title: 'Designing a synchronous MOD-10 (decade) counter',
          blocks: [
            {
              type: 'step', n: 1, title: 'Decide the number of flip-flops', blocks: [
                { type: 'p', text: 'To design a MOD-N counter with n flip-flops, find n from N ≤ 2ⁿ. Here we design a MOD-10 counter, so N = 10. For n = 3, 10 ≤ 8 is false. For n = 4, 10 ≤ 16 is true. So four flip-flops are needed.' },
                { type: 'modcalc' },
              ],
            },
            {
              type: 'step', n: 2, title: 'Write the excitation table of the flip-flop', blocks: [
                { type: 'p', text: 'T flip-flops are used here.' },
                { type: 'fig', src: `${GFG}20210517153828/ExcitationtableT-660x188.jpg`, alt: 'Excitation table of the T flip-flop', caption: 'Excitation table of a T flip-flop.' },
              ],
            },
            {
              type: 'step', n: 3, title: 'Draw the state diagram and the circuit excitation table', blocks: [
                { type: 'fig', src: `${GFG}20210517153838/ModNcountingsequence.jpg`, alt: 'Counting sequence of the MOD-10 counter', caption: 'Counting sequence of the decade counter.' },
                { type: 'p', text: 'Q3 Q2 Q1 Q0 are the present states of the four flip-flops, and Q3* Q2* Q1* Q0* are the next states. If a bit changes (0 to 1 or 1 to 0), the matching T input is 1. Otherwise it is 0.' },
                { type: 'fig', src: `${GFG}20221009012838/CircuitExcitationTableDecade660x407-300x185.jpg`, alt: 'Circuit excitation table of the decade counter', caption: 'Circuit excitation table from the reference design.' },
                { type: 'exc', kind: 'mod', n: 4, N: 10 },
              ],
            },
            {
              type: 'step', n: 4, title: 'Create a K-map for each flip-flop input', blocks: [
                { type: 'p', text: 'Treat the flip-flop outputs as the input variables. The × cells are the six unused states, and each can be grouped as a 1 whenever that makes a bigger group.' },
                { type: 'fig', src: `${GFG}20210514190038/Decadekmap-660x495.jpg`, alt: 'K-maps for the decade counter', caption: 'Simplified K-maps from the reference design.' },
                {
                  type: 'kmap4', maps: [
                    { ...kBase, title: 'T1', fn: T(1), groups: [{ r: 0, c: 1, w: 2, h: 2, color: '#3b82f6' }], formula: <>T<sub>1</sub> = Q<sub>3</sub>′Q<sub>0</sub></>, note: 'A 2×2 block of valid states.' },
                    { ...kBase, title: 'T2', fn: T(2), groups: [{ r: 0, c: 2, w: 1, h: 4, color: '#10b981' }], formula: <>T<sub>2</sub> = Q<sub>1</sub>Q<sub>0</sub></>, note: 'A full column that borrows two don\'t-cares.' },
                    {
                      ...kBase, title: 'T3', fn: T(3),
                      groups: [{ r: 2, c: 1, w: 2, h: 2, color: '#f59e0b' }, { r: 1, c: 2, w: 1, h: 2, color: '#ec4899' }],
                      formula: <>T<sub>3</sub> = Q<sub>3</sub>Q<sub>0</sub> + Q<sub>2</sub>Q<sub>1</sub>Q<sub>0</sub></>, note: 'Amber: Q3Q0. Pink: Q2Q1Q0.',
                    },
                  ],
                },
                { type: 'eq', items: [{ label: 'T0', expr: '1' }, { label: 'T1', expr: 'Q3′Q0' }, { label: 'T2', expr: 'Q1Q0' }, { label: 'T3', expr: 'Q3Q0 + Q2Q1Q0' }] },
              ],
            },
            {
              type: 'step', n: 5, title: 'Create the circuit diagram', blocks: [
                { type: 'fig', src: `${GFG}20210514190051/DECADECIRCUIT-660x495.jpg`, alt: 'Circuit diagram of the decade counter', caption: 'Circuit diagram of the synchronous decade counter.' },
                { type: 'note', text: 'Check for lock-up: this design is self-correcting. Each of the six unused states leads back into the 0 to 9 sequence within two clock pulses, so a bad power-up state cannot trap the counter.' },
              ],
            },
          ],
        },
        {
          kicker: 'Timing', title: 'Counting sequence and timing diagram',
          blocks: [
            { type: 'fig', src: `${GFG}20210517153916/TimingdiagramdecadeNew-660x345.jpg`, alt: 'Timing diagram of the decade counter', caption: 'Reference timing diagram of the decade counter.' },
            { type: 'wave', kind: 'mod', n: 4, N: 10, pulses: 12, edge: 'rise', caption: 'Generated timing diagram: the count reaches 9, then returns to 0 on the tenth pulse and carries on.' },
            { type: 'seq', kind: 'mod', n: 4, N: 10 },
          ],
        },
        {
          kicker: 'Try it', title: 'Live decade counter',
          blocks: [{ type: 'sim', kind: 'mod', n: 4, N: 10, isAsync: false, edge: 'rise' }],
        },
      ]}
      remember={[
        'MOD-N counts N states, 0 to N − 1, then resets. The number of flip-flops n is the smallest value with N ≤ 2ⁿ.',
        'MOD-10 needs 4 flip-flops, because 3 give only 8 states and 4 give 16.',
        'Unused states (here 6 of them) are treated as don\'t-cares to simplify the logic.',
        'For MOD-10: T0 = 1, T1 = Q3′Q0, T2 = Q1Q0 and T3 = Q3Q0 + Q2Q1Q0.',
        'A MOD-N counter divides the input clock by N.',
      ]}
      pros={[
        { title: 'Any modulus', body: 'You are not limited to powers of two, so MOD-6, MOD-10 or MOD-60 are all possible.' },
        { title: 'Decimal-friendly', body: 'MOD-10 matches the digits of a decimal display.' },
        { title: 'Programmable division', body: 'The same idea divides a clock by any chosen integer.' },
        { title: 'Standard parts', body: 'Built from ordinary flip-flops and gates.' },
      ]}
      cons={[
        { title: 'Wasted states', body: '2ⁿ − N states are never used, so some capacity is lost.' },
        { title: 'More design work', body: 'Each new modulus needs its own tables, K-maps and gates.' },
        { title: 'Lock-up risk', body: 'Unused states must be checked so the counter cannot get stuck in them.' },
        { title: 'Reset glitches in the ripple version', body: 'Clearing on state N makes that state appear briefly.' },
      ]}
      verdict={{
        use: 'you need a cycle length that is not a power of two, such as decimal digits or a divide-by-N ratio.',
        avoid: 'the length is a power of two. A plain binary counter needs no extra logic.',
      }}
      apps={[
        { name: 'Decade counters', why: 'Count 0 to 9 per digit in meters, scoreboards and frequency counters.' },
        { name: 'Digital clocks', why: 'MOD-60 for seconds and minutes, MOD-12 or MOD-24 for hours.' },
        { name: 'Frequency division by N', why: 'Turn a fast clock into a slower one with an exact ratio.' },
        { name: 'N-step sequencers', why: 'Run a control cycle that repeats after exactly N steps.' },
      ]}
      practice={[
        { q: 'How many flip-flops does a MOD-10 counter need? (number only)', a: '4', work: '2³ = 8 is too small and 2⁴ = 16 is enough.' },
        { q: 'How many flip-flops does a MOD-12 counter need? (number only)', a: '4', work: '12 ≤ 16, but 12 > 8, so 4 flip-flops.' },
        { q: 'A 4-bit MOD-10 counter leaves how many unused states? (number only)', a: '6', work: '16 − 10 = 6.' },
        { q: 'A 10 kHz clock drives a MOD-10 counter. What is the output frequency? (kHz, number only)', a: '1', work: '10 kHz ÷ 10 = 1 kHz.' },
      ]}
      related={[NAV.syncUp, NAV.asyncUp, NAV.ring, NAV.johnson]}
    />
  );
}