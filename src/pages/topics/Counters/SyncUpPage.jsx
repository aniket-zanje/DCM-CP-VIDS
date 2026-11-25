import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const EEV = 'https://eevibes.com/wp-content/uploads/2025/02/';
const COLS = ['00', '01', '11', '10'];
const mapBase = { rowVar: 'Q2', colVars: 'Q1Q0', rowLabels: ['0', '1'], colLabels: COLS };
const q2 = (n) => n >> 2, q1 = (n) => (n >> 1) & 1, q0 = (n) => n & 1;

export default function SyncUpPage() {
  return (
    <CounterPage
      title="Synchronous Up Counter"
      lead="Every flip-flop shares the same clock, and small AND gates decide which ones toggle. The result is a counter that changes cleanly, all at once, with no ripple."
      prev={NAV.asyncUpDown}
      next={NAV.syncDown}
      facts={[
        { label: 'Flip-flops', value: '3 (T type)' },
        { label: 'States', value: '8 (MOD-8)' },
        { label: 'Sequence', value: '000 → 111', mono: true },
        { label: 'Clock', value: 'Common to all' },
        { label: 'Delay', value: 't(FF) + t(AND)' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is a synchronous up counter?',
          blocks: [
            { type: 'p', text: 'In a synchronous counter the clock goes to every flip-flop at the same time. Instead of passing the clock down a chain, extra logic looks at the current count and works out which flip-flops must toggle on the next edge. All changes then happen together, right after the clock edge.' },
            { type: 'p', text: 'For an up counter the rule is simple: a bit toggles when every bit below it is 1. The least significant bit toggles every time.' },
            {
              type: 'keypoints', items: [
                { title: 'Common clock', body: 'All flip-flops see the same clock edge, so there is no ripple and the outputs change together.' },
                { title: 'Toggle control', body: 'Each T input is driven by logic that decides whether that bit should flip on this clock edge.' },
                { title: 'Carry-lookahead style AND gates', body: 'T0 = 1, T1 = Q0, T2 = Q1·Q0. A bit toggles when all lower bits are 1.' },
                { title: 'Constant, short delay', body: 'The limit is one flip-flop plus one AND gate, however many bits you add (apart from gate fan-in).' },
              ],
            },
          ],
        },
        {
          kicker: 'Design', title: 'Designing a 3-bit synchronous up counter',
          blocks: [
            {
              type: 'step', n: 1, title: 'Decide the number of flip-flops', blocks: [
                { type: 'p', text: 'N states need n flip-flops, where N ≤ 2ⁿ. A 3-bit up counter has 8 states: with n = 2 we get 4 states, which is too few, and with n = 3 we get 8, which is enough. So we use three flip-flops. T flip-flops suit this job, because a counter only ever needs to toggle or hold a bit.' },
              ],
            },
            {
              type: 'step', n: 2, title: 'Write the excitation table of a T flip-flop', blocks: [
                { type: 'table', heads: ['Q (now)', 'Q* (next)', 'T needed'], rows: [['0', '0', '0'], ['0', '1', '1'], ['1', '0', '1'], ['1', '1', '0']], caption: 'T = Q ⊕ Q*: toggle when the bit must change, hold when it must stay.' },
              ],
            },
            {
              type: 'step', n: 3, title: 'Draw the state transitions and the circuit excitation table', blocks: [
                { type: 'fig', src: `${EEV}State-Transitions-of-3-bit-Up-Counter.png`, alt: 'State transitions and excitation of the 3-bit up counter', caption: 'State transitions of the 3-bit up counter.' },
                { type: 'p', text: 'For each present state, write the next state and then the T value each flip-flop needs (1 where its bit changes).' },
                { type: 'exc', kind: 'up', n: 3 },
              ],
            },
            {
              type: 'step', n: 4, title: 'Simplify each T input with a K-map', blocks: [
                { type: 'fig', src: `${EEV}WhatsApp-Image-2025-02-22-at-10.47.29-PM-1-768x683.jpeg`, alt: 'Truth table for the 3-bit synchronous up counter', caption: 'Truth table for the T inputs.' },
                { type: 'fig', src: `${EEV}WhatsApp-Image-2025-02-22-at-10.47.29-PM-768x565.jpeg`, alt: 'K-maps for the 3-bit synchronous up counter', caption: 'K-maps from the reference design.' },
                {
                  type: 'kmap', maps: [
                    { ...mapBase, title: 'T0', fn: () => 1, groups: [{ r: 0, c: 0, w: 4, h: 2, color: '#06b6d4' }], formula: <>T<sub>0</sub> = 1</>, note: 'Always 1: the LSB toggles every clock.' },
                    { ...mapBase, title: 'T1', fn: (n) => q0(n), groups: [{ r: 0, c: 1, w: 2, h: 2, color: '#3b82f6' }], formula: <>T<sub>1</sub> = Q<sub>0</sub></>, note: 'One group of four.' },
                    { ...mapBase, title: 'T2', fn: (n) => q1(n) & q0(n), groups: [{ r: 0, c: 2, w: 1, h: 2, color: '#10b981' }], formula: <>T<sub>2</sub> = Q<sub>1</sub>Q<sub>0</sub></>, note: 'One group of two.' },
                  ],
                },
              ],
            },
            {
              type: 'step', n: 5, title: 'Write the equations', blocks: [
                { type: 'eq', items: [{ label: 'T0', expr: '1' }, { label: 'T1', expr: 'Q0' }, { label: 'T2', expr: 'Q1 · Q0' }] },
              ],
            },
            {
              type: 'step', n: 6, title: 'Draw the circuit', blocks: [
                { type: 'fig', src: 'https://image1.slideserve.com/3269056/3-bit-binary-up-down-synchronous-counter-l.jpg', alt: 'Circuit diagram of a 3-bit synchronous counter', caption: 'Circuit diagram: all clocks tied together, with AND gates feeding the T inputs.' },
              ],
            },
            {
              type: 'step', n: 7, title: 'Check the timing diagram', blocks: [
                { type: 'wave', kind: 'up', n: 3, pulses: 10, edge: 'rise', caption: 'Generated timing diagram. Every output changes on the same rising clock edge, with no ripple delay.' },
              ],
            },
          ],
        },
        {
          kicker: 'Try it', title: 'Live synchronous counter',
          blocks: [
            { type: 'p', text: 'Compare this with the ripple counter: all bits change together on the clock edge.' },
            { type: 'sim', kind: 'up', n: 3, isAsync: false, edge: 'rise' },
          ],
        },
        {
          kicker: 'Compare', title: 'Synchronous vs asynchronous',
          blocks: [
            {
              type: 'table', heads: ['', 'Asynchronous (ripple)', 'Synchronous'],
              rows: [
                ['Clock', 'Only the first stage', 'Every stage'],
                ['Delay', 'n × t(FF)', 't(FF) + t(AND)'],
                ['Speed', 'Lower', 'Higher'],
                ['Hardware', 'Flip-flops only', 'Flip-flops plus gates'],
                ['Output glitches', 'Intermediate states appear', 'Clean transitions'],
              ],
            },
            { type: 'fmax' },
          ],
        },
      ]}
      remember={[
        'All flip-flops share one clock, so every output changes together.',
        'For an up counter, a bit toggles when all lower bits are 1: T0 = 1, T1 = Q0, T2 = Q1·Q0, T3 = Q2·Q1·Q0.',
        'T = Q ⊕ Q*: the T input is 1 exactly when the bit must change.',
        'Maximum speed barely depends on the number of bits, apart from the AND gate fan-in.',
        'A 3-bit counter has 8 states and divides the clock by 8 at its MSB.',
      ]}
      pros={[
        { title: 'No ripple delay', body: 'All outputs change on the same clock edge.' },
        { title: 'Higher clock speed', body: 'The period depends on one flip-flop plus one gate, not on the number of bits.' },
        { title: 'Clean decoding', body: 'Decoded outputs do not glitch because no intermediate states appear.' },
        { title: 'Predictable timing', body: 'It fits straight into larger synchronous designs.' },
      ]}
      cons={[
        { title: 'More hardware', body: 'Extra AND gates are needed, with more inputs as the width grows.' },
        { title: 'More power', body: 'The clock drives every flip-flop on every cycle.' },
        { title: 'Harder to design', body: 'You need excitation tables and K-maps, not just a chain of flip-flops.' },
        { title: 'Clock distribution', body: 'The clock must reach all flip-flops at the same moment, so skew matters at high speed.' },
      ]}
      verdict={{
        use: 'you need speed, clean outputs, or a counter inside a larger synchronous system.',
        avoid: 'you only need a slow, cheap divider and every gate counts. A ripple counter is smaller.',
      }}
      apps={[
        { name: 'Program counters', why: 'Step through instruction addresses cleanly on each clock.' },
        { name: 'Frequency counters and timers', why: 'Count pulses accurately at high rates.' },
        { name: 'Address generators', why: 'Produce sequential memory addresses for RAM or ROM.' },
        { name: 'State machines', why: 'Drive control sequences in digital systems.' },
      ]}
      practice={[
        { q: 'A 3-bit synchronous up counter is in state 011. Write T2 T1 T0.', a: '111', work: 'T2 = Q1·Q0 = 1, T1 = Q0 = 1 and T0 = 1. The counter moves to 100.' },
        { q: 'State 101. Write T2 T1 T0.', a: '011', work: 'T2 = Q1·Q0 = 0·1 = 0, T1 = Q0 = 1 and T0 = 1. The counter moves to 110.' },
        { q: 'How many T inputs of a counter are permanently 1? (number only)', a: '1', work: 'Only T0, the LSB, which toggles on every clock.' },
        { q: 'A 4-bit synchronous up counter is at 0111. Write T3 T2 T1 T0.', a: '1111', work: 'All lower bits are 1, so every stage toggles, and the counter moves to 1000.' },
      ]}
      related={[NAV.syncDown, NAV.syncUpDown, NAV.asyncUp, NAV.mod]}
    />
  );
}