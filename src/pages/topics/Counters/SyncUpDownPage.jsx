import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const GFG = 'https://media.geeksforgeeks.org/wp-content/uploads/';
const m = (n) => (n >> 3) & 1, q1 = (n) => (n >> 1) & 1, q0 = (n) => n & 1;
const kBase = { rowVars: 'MQ2', colVars: 'Q1Q0' };

export default function SyncUpDownPage() {
  return (
    <CounterPage
      title="Synchronous Up-Down Counter"
      lead="A fast, shared-clock counter that can count either way. A mode input M decides whether each flip-flop toggles for an up step or for a down step."
      prev={NAV.syncDown}
      next={NAV.mod}
      facts={[
        { label: 'Mode input', value: 'M = 0 up, M = 1 down' },
        { label: 'Flip-flops', value: '3 (T type)' },
        { label: 'States', value: '8 (MOD-8)' },
        { label: 'Clock', value: 'Common to all' },
        { label: 'T1', value: 'M ⊕ Q0', mono: true },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is a synchronous up-down counter?',
          blocks: [
            { type: 'p', text: 'A synchronous up-down counter combines the up and down counters in one circuit. All flip-flops share the clock, and a control input M selects the direction. The toggle logic for each bit has one term for up counting and one for down counting, and M enables whichever applies.' },
            {
              type: 'keypoints', items: [
                { title: 'Mode input M', body: 'M = 0 gives up counting and M = 1 gives down counting.' },
                { title: 'Two toggle conditions', body: 'Up: a bit toggles when all lower bits are 1. Down: it toggles when all lower bits are 0.' },
                { title: 'Common clock', body: 'No ripple, so direction can change cleanly between clock edges.' },
                { title: 'More gates than either single-direction counter', body: 'The extra AND-OR logic is the price of flexibility.' },
              ],
            },
          ],
        },
        {
          kicker: 'Design', title: 'Steps to design a synchronous 3-bit up-down counter',
          blocks: [
            {
              type: 'step', n: 1, title: 'Decide the number and type of flip-flops', blocks: [
                { type: 'p', text: 'Three bits give 2³ = 8 states, so three flip-flops are needed. T flip-flops are used because every change is simply a toggle or a hold.' },
              ],
            },
            {
              type: 'step', n: 2, title: 'Write the excitation table of the flip-flop', blocks: [
                { type: 'fig', src: `${GFG}20210517153828/ExcitationtableT-660x188.jpg`, alt: 'Excitation table of the T flip-flop', caption: 'Excitation table of a T flip-flop: T = 1 when the bit must change.' },
              ],
            },
            {
              type: 'step', n: 3, title: 'Decide the mode control input M', blocks: [
                { type: 'bullets', items: ['When M = 0, the counter performs up counting.', 'When M = 1, the counter performs down counting.'] },
              ],
            },
            {
              type: 'step', n: 4, title: 'Draw the state transition diagram', blocks: [
                { type: 'fig', src: `${GFG}20210519221929/Synstate.jpg`, alt: 'State transition diagram of the synchronous up-down counter', caption: 'State transitions in both directions.' },
              ],
            },
            {
              type: 'step', n: 5, title: 'Build the circuit excitation table', blocks: [
                { type: 'fig', src: `${GFG}20210518113734/StatetableSyn.jpg`, alt: 'Circuit excitation table of the synchronous up-down counter', caption: 'State table from the reference design.' },
                { type: 'p', text: 'The same table, generated for both modes. The first half (M = 0) counts up and the second half (M = 1) counts down.' },
                { type: 'exc', kind: 'updown', n: 3 },
              ],
            },
            {
              type: 'step', n: 6, title: 'Find the simplified equations with K-maps', blocks: [
                { type: 'fig', src: `${GFG}20210518153707/Updownkmap-660x495.jpg`, alt: 'K-maps for the synchronous up-down counter', caption: 'K-maps from the reference design.' },
                {
                  type: 'kmap4', maps: [
                    {
                      ...kBase, title: 'T1', fn: (n) => m(n) ^ q0(n),
                      groups: [
                        { r: 0, c: 1, w: 2, h: 2, color: '#3b82f6' },
                        { r: 2, c: 0, w: 1, h: 2, color: '#ef4444', wrap: true },
                        { r: 2, c: 3, w: 1, h: 2, color: '#ef4444', wrap: true },
                      ],
                      formula: <>T<sub>1</sub> = M′Q<sub>0</sub> + MQ<sub>0</sub>′</>, note: 'Blue: up counting. Red: down counting, split by the map edge.',
                    },
                    {
                      ...kBase, title: 'T2', fn: (n) => (m(n) ? (1 - q1(n)) & (1 - q0(n)) : q1(n) & q0(n)),
                      groups: [
                        { r: 0, c: 2, w: 1, h: 2, color: '#10b981' },
                        { r: 2, c: 0, w: 1, h: 2, color: '#f59e0b' },
                      ],
                      formula: <>T<sub>2</sub> = M′Q<sub>1</sub>Q<sub>0</sub> + MQ<sub>1</sub>′Q<sub>0</sub>′</>, note: 'Green: up condition. Amber: down condition.',
                    },
                  ],
                },
                {
                  type: 'eq', items: [
                    { label: 'T0', expr: '1' },
                    { label: 'T1', expr: 'M′Q0 + MQ0′', note: '= M ⊕ Q0' },
                    { label: 'T2', expr: 'M′Q1Q0 + MQ1′Q0′' },
                  ],
                },
              ],
            },
            {
              type: 'step', n: 7, title: 'Create the circuit diagram', blocks: [
                { type: 'fig', src: `${GFG}20210518140350/SynchronousUpDownCounter-660x356.jpg`, alt: 'Circuit diagram of the synchronous up-down counter', caption: 'Circuit diagram: common clock, with mode-controlled gates on the T inputs.' },
              ],
            },
            {
              type: 'step', n: 8, title: 'Check the timing diagram', blocks: [
                { type: 'fig', src: `${GFG}20210518153326/TimingDiagramcontrol4-660x495.jpg`, alt: 'Timing diagram of the synchronous up-down counter', caption: 'Reference timing diagram with the mode input.' },
                { type: 'wave', kind: 'updown', n: 3, pulses: 12, edge: 'rise', modeSeq: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], caption: 'Generated timing diagram: six counts up, then M goes high and the counter counts down. Every output changes on the same clock edge.' },
              ],
            },
          ],
        },
        {
          kicker: 'Explanation', title: 'What happens in each case',
          blocks: [
            { type: 'fig', src: `${GFG}20210519224530/CHs2-660x200.jpg`, alt: 'Explanation of the up and down cases', caption: 'Summary of the two modes.' },
            {
              type: 'steps', items: [
                { title: 'Case 1: M = 0, state 011', body: 'T2 = Q1Q0 = 1, T1 = Q0 = 1 and T0 = 1, so every bit toggles and the counter moves to 100.' },
                { title: 'Case 2: M = 0, state 010', body: 'T2 = 0, T1 = 0 and T0 = 1, so only Q0 toggles and the counter moves to 011.' },
                { title: 'Case 3: M = 1, state 100', body: 'T2 = Q1′Q0′ = 1, T1 = Q0′ = 1 and T0 = 1, so every bit toggles and the counter moves to 011.' },
                { title: 'Case 4: M = 1, state 010', body: 'T2 = 0, T1 = Q0′ = 1 and T0 = 1, so Q1 and Q0 toggle and the counter moves to 001.' },
              ],
            },
          ],
        },
        {
          kicker: 'Try it', title: 'Live synchronous up-down counter',
          blocks: [{ type: 'p', text: 'Switch M at any time. Because the clock is shared, the direction change is clean.' }, { type: 'sim', kind: 'updown', n: 3, isAsync: false, edge: 'rise' }],
        },
      ]}
      remember={[
        'M = 0 counts up and M = 1 counts down.',
        'T0 = 1, T1 = M′Q0 + MQ0′ and T2 = M′Q1Q0 + MQ1′Q0′ for a 3-bit counter.',
        'Up counting toggles a bit when all lower bits are 1. Down counting toggles it when all lower bits are 0.',
        'All flip-flops share the clock, so reversing direction is glitch-free, unlike the ripple version.',
      ]}
      pros={[
        { title: 'Both directions, one circuit', body: 'A single counter replaces separate up and down counters.' },
        { title: 'Clean direction changes', body: 'The shared clock means M can be changed safely between edges.' },
        { title: 'High speed', body: 'Delay is a flip-flop plus a gate level, not a ripple chain.' },
        { title: 'Glitch-free outputs', body: 'No intermediate states appear on the outputs.' },
      ]}
      cons={[
        { title: 'Most gates of any basic counter', body: 'Each T input needs AND-OR logic that combines the up and down conditions.' },
        { title: 'Gate count grows with width', body: 'Wider counters need wider gates or more levels of logic.' },
        { title: 'More power', body: 'Every flip-flop is clocked on every cycle.' },
        { title: 'Design work', body: 'Needs excitation tables and K-maps, with M as an extra variable.' },
      ]}
      verdict={{
        use: 'you need fast reversible counting, such as tracking position, with clean outputs.',
        avoid: 'direction never changes. A single-direction counter is smaller.',
      }}
      apps={[
        { name: 'Position and motion tracking', why: 'Count encoder pulses forwards and backwards.' },
        { name: 'Digital tuning and volume', why: 'Step a setting up or down with clean, synchronous changes.' },
        { name: 'Bidirectional event counting', why: 'Add and subtract items in a synchronous system.' },
        { name: 'Address sequencing', why: 'Step through memory locations in either order.' },
      ]}
      practice={[
        { q: 'M = 0 and the counter is in state 011. Write T2 T1 T0.', a: '111', work: 'T2 = Q1Q0 = 1, T1 = Q0 = 1 and T0 = 1. The next state is 100.' },
        { q: 'M = 1 and the counter is in state 100. Write T2 T1 T0.', a: '111', work: 'T2 = Q1′Q0′ = 1, T1 = Q0′ = 1 and T0 = 1. The next state is 011.' },
        { q: 'M = 1 and the counter is in state 010. Write T2 T1 T0.', a: '011', work: 'T2 = Q1′Q0′ = 0 because Q1 is 1. T1 = Q0′ = 1 and T0 = 1. The next state is 001.' },
        { q: 'M = 0 and the counter is in state 010. Write T2 T1 T0.', a: '001', work: 'T2 = Q1Q0 = 0, T1 = Q0 = 0 and T0 = 1. The next state is 011.' },
      ]}
      related={[NAV.syncUp, NAV.syncDown, NAV.asyncUpDown, NAV.mod]}
    />
  );
}