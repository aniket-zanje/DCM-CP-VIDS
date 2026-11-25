import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const GFG = 'https://media.geeksforgeeks.org/wp-content/uploads/';
const COLS = ['00', '01', '11', '10'];
const mapBase = { rowVar: 'Q2', colVars: 'Q1Q0', rowLabels: ['0', '1'], colLabels: COLS };
const q1 = (n) => (n >> 1) & 1, q0 = (n) => n & 1;

export default function SyncDownPage() {
  return (
    <CounterPage
      title="Synchronous Down Counter"
      lead="All flip-flops share one clock, and the toggle logic makes the count fall by one on every pulse, from 111 down to 000 and back to 111."
      prev={NAV.syncUp}
      next={NAV.syncUpDown}
      facts={[
        { label: 'Flip-flops', value: '3 (T type)' },
        { label: 'States', value: '8 (MOD-8)' },
        { label: 'Sequence', value: '111 → 000', mono: true },
        { label: 'Clock', value: 'Common to all' },
        { label: 'Rule', value: 'Toggle when lower bits are 0' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is a synchronous down counter?',
          blocks: [
            { type: 'p', text: 'A synchronous down counter decreases its value by one on each clock pulse. Every flip-flop receives the same clock edge, so all changes happen together. The toggle logic decides which bits flip: for a down counter a bit toggles when every bit below it is 0.' },
            {
              type: 'keypoints', items: [
                { title: 'Common clock', body: 'No ripple: every output changes right after the same clock edge.' },
                { title: 'Borrow logic', body: 'Counting down borrows from the next bit. A bit flips when all lower bits are 0.' },
                { title: 'Equations', body: 'T0 = 1, T1 = Q0′, T2 = Q1′·Q0′. These mirror the up counter with complemented inputs.' },
                { title: 'Fast and glitch-free', body: 'Delay is one flip-flop plus one gate, and decoded outputs stay clean.' },
              ],
            },
          ],
        },
        {
          kicker: 'Design', title: 'Steps to design a 3-bit synchronous down counter',
          blocks: [
            {
              type: 'step', n: 1, title: 'Decide the number of flip-flops', blocks: [
                { type: 'p', text: 'A counter with N states needs n flip-flops where N ≤ 2ⁿ. Example: a 3-bit down counter has 8 states. For n = 2, 8 ≤ 4 is false. For n = 3, 8 ≤ 8 is true. So three flip-flops are needed.' },
              ],
            },
            {
              type: 'step', n: 2, title: 'Write the excitation table of the flip-flop', blocks: [
                { type: 'fig', src: `${GFG}20210517152258/1.PNG`, alt: 'Excitation table of the flip-flop', caption: 'Excitation table of the flip-flop used in the design.' },
                { type: 'p', text: 'For T flip-flops the rule is T = Q ⊕ Q*: use 1 when the bit changes and 0 when it holds.' },
              ],
            },
            {
              type: 'step', n: 3, title: 'Draw the state diagram and the circuit excitation table', blocks: [
                { type: 'p', text: 'Number of states = 2ⁿ, where n is the number of bits. For three bits that is eight states, visited in descending order.' },
                { type: 'fig', src: `${GFG}20210517152328/2.PNG`, alt: 'State diagram of the 3-bit down counter', caption: 'State diagram: the counter steps down through all eight states.' },
                { type: 'fig', src: `${GFG}20210517152448/3.PNG`, alt: 'Truth table of the 3-bit synchronous down counter', caption: 'Truth table with the T input for each flip-flop.' },
                { type: 'exc', kind: 'down', n: 3 },
              ],
            },
            {
              type: 'step', n: 4, title: 'Simplify each T input with a K-map', blocks: [
                { type: 'fig', src: `${GFG}20210508131620/Untitleddrawing32-660x495.jpg`, alt: 'K-maps for the 3-bit synchronous down counter', caption: 'K-maps from the reference design.' },
                {
                  type: 'kmap', maps: [
                    { ...mapBase, title: 'T0', fn: () => 1, groups: [{ r: 0, c: 0, w: 4, h: 2, color: '#06b6d4' }], formula: <>T<sub>0</sub> = 1</>, note: 'The LSB toggles on every clock.' },
                    {
                      ...mapBase, title: 'T1', fn: (n) => 1 - q0(n),
                      groups: [{ r: 0, c: 0, w: 1, h: 2, color: '#3b82f6' }, { r: 0, c: 3, w: 1, h: 2, color: '#3b82f6', wrap: true }],
                      formula: <>T<sub>1</sub> = Q<sub>0</sub>′</>, note: 'The two outer columns join across the edge into one group of four.',
                    },
                    { ...mapBase, title: 'T2', fn: (n) => (1 - q1(n)) & (1 - q0(n)), groups: [{ r: 0, c: 0, w: 1, h: 2, color: '#10b981' }], formula: <>T<sub>2</sub> = Q<sub>1</sub>′Q<sub>0</sub>′</>, note: 'One group of two.' },
                  ],
                },
              ],
            },
            {
              type: 'step', n: 5, title: 'Write the equations', blocks: [
                { type: 'eq', items: [{ label: 'T0', expr: '1' }, { label: 'T1', expr: 'Q0′' }, { label: 'T2', expr: 'Q1′ · Q0′' }] },
              ],
            },
            {
              type: 'step', n: 6, title: 'Draw the circuit', blocks: [
                { type: 'fig', src: `${GFG}20210517152534/4.PNG`, alt: 'Circuit diagram of the 3-bit synchronous down counter', caption: 'Circuit diagram: common clock, with gates feeding the T inputs.' },
              ],
            },
            {
              type: 'step', n: 7, title: 'Check the timing diagram', blocks: [
                { type: 'fig', src: `${GFG}20210513160825/Bestupdowncounter2-660x495.jpg`, alt: 'Timing diagram of the synchronous down counter', caption: 'Reference timing diagram.' },
                { type: 'wave', kind: 'down', n: 3, pulses: 10, edge: 'rise', caption: 'Generated timing diagram starting from 7. All outputs change on the same rising edge.' },
              ],
            },
          ],
        },
        {
          kicker: 'Try it', title: 'Live synchronous down counter',
          blocks: [{ type: 'sim', kind: 'down', n: 3, isAsync: false, edge: 'rise' }],
        },
      ]}
      remember={[
        'A bit toggles when all lower bits are 0: T0 = 1, T1 = Q0′, T2 = Q1′Q0′, T3 = Q2′Q1′Q0′.',
        'The sequence is 111, 110, 101, 100, 011, 010, 001, 000, then 111 again.',
        'Compare with the up counter: the same structure with Q replaced by Q′ in the T equations.',
        'A common clock means all outputs change together, with no ripple and no glitches.',
      ]}
      pros={[
        { title: 'No ripple', body: 'Every output changes on the same clock edge.' },
        { title: 'Fast', body: 'The delay is one flip-flop plus one gate, independent of word length.' },
        { title: 'Clean outputs', body: 'No intermediate states, so decoding needs no glitch protection.' },
        { title: 'Easy to integrate', body: 'Behaves like any other synchronous block.' },
      ]}
      cons={[
        { title: 'Extra logic', body: 'Needs complemented AND gates for the toggle conditions.' },
        { title: 'Higher power', body: 'All flip-flops see every clock edge.' },
        { title: 'Design effort', body: 'Requires excitation tables and K-maps.' },
        { title: 'One direction only', body: 'For both directions, use an up-down counter.' },
      ]}
      verdict={{
        use: 'you need a fast, clean countdown inside a synchronous system.',
        avoid: 'you only need a slow countdown and want the fewest gates. A ripple down counter is simpler.',
      }}
      apps={[
        { name: 'Countdown timers', why: 'Count down to zero and raise a flag with clean, synchronized outputs.' },
        { name: 'Programmable delays', why: 'Load a count and wait exactly that many clock cycles.' },
        { name: 'Down-count address generators', why: 'Step through memory in reverse order.' },
        { name: 'Pulse-width control', why: 'Time pulse lengths by counting clock cycles down.' },
      ]}
      practice={[
        { q: 'A 3-bit synchronous down counter is in state 100. Write T2 T1 T0.', a: '111', work: 'Q1′Q0′ = 1, so T2 = 1. T1 = Q0′ = 1 and T0 = 1. The counter moves to 011.' },
        { q: 'State 110. Write T2 T1 T0.', a: '011', work: 'T2 = Q1′Q0′ = 0 because Q1 is 1. T1 = Q0′ = 1 and T0 = 1. The counter moves to 101.' },
        { q: 'A 3-bit down counter is at 000. What is the next state?', a: '111', work: 'It wraps around from 000 to 111.' },
        { q: 'Which flip-flop has T = 1 on every clock pulse? (T0, T1 or T2)', a: 'T0', work: 'The LSB always toggles in a counter.' },
      ]}
      related={[NAV.syncUp, NAV.syncUpDown, NAV.asyncDown, NAV.mod]}
    />
  );
}