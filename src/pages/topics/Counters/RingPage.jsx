import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

export default function RingPage() {
  return (
    <CounterPage
      title="Ring Counter"
      lead="A shift register whose last output feeds back to its first input, so a single 1 circulates around the flip-flops, one position per clock pulse."
      prev={NAV.mod}
      next={NAV.johnson}
      facts={[
        { label: 'Flip-flops', value: '4 (D type)' },
        { label: 'States', value: '4 (MOD-4)' },
        { label: 'Sequence', value: '1000 → 0100 → 0010 → 0001', mono: true },
        { label: 'Start', value: 'Preset to 1000' },
        { label: 'Each output', value: 'f ÷ 4, 25% duty' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is a ring counter?',
          blocks: [
            { type: 'p', text: 'A ring counter is a circular shift register. Load a single 1 into one flip-flop and 0 into the rest, then clock the register. The 1 moves one place on every pulse, and when it reaches the end the feedback connection sends it back to the start. At any moment exactly one output is high, so the outputs act as a set of ready-made decoded states.' },
            {
              type: 'keypoints', items: [
                { title: 'One-hot sequence', body: 'Only one flip-flop holds a 1 at any time. The 1 passes along the ring.' },
                { title: 'Shift register with feedback', body: 'D flip-flops in a chain, with the last output connected to the first input.' },
                { title: 'n flip-flops give n states', body: 'It is a MOD-n counter, and every output is a pulse train at f ÷ n with 1/n duty cycle.' },
                { title: 'Must be initialised', body: 'It needs a preset or clear to start with a single 1. It does not correct itself by default.' },
              ],
            },
          ],
        },
        {
          kicker: 'Design', title: 'Logic diagram and connections',
          blocks: [
            { type: 'fig', src: 'https://media.geeksforgeeks.org/wp-content/uploads/ringc.png', alt: '4-bit ring counter logic diagram', caption: 'Logic diagram of the 4-bit ring counter.' },
            { type: 'p', text: 'All flip-flops share the clock. Each D input is simply the output of its neighbour, and the last output wraps round to the first input:' },
            { type: 'eq', items: [{ label: 'D3', expr: 'Q0', note: 'feedback' }, { label: 'D2', expr: 'Q3' }, { label: 'D1', expr: 'Q2' }, { label: 'D0', expr: 'Q1' }] },
            { type: 'note', text: 'The preset input sets one flip-flop (here Q3) to 1 and clears the others before counting starts.' },
          ],
        },
        {
          kicker: 'Truth table', title: 'State sequence',
          blocks: [
            { type: 'fig', src: 'https://media.geeksforgeeks.org/wp-content/uploads/TAB.png', alt: 'Truth table of the 4-bit ring counter', caption: 'Reference truth table.' },
            { type: 'p', text: 'The same sequence, generated for the circuit above. Read each row to see where the single 1 sits after that many clock pulses.' },
            { type: 'seq', kind: 'ring', n: 4, showDec: false },
          ],
        },
        {
          kicker: 'Timing', title: 'Timing diagram',
          blocks: [
            { type: 'wave', kind: 'ring', n: 4, pulses: 9, edge: 'rise', caption: 'Generated timing diagram: a single high pulse walks from Q3 down to Q0 and back, one clock period at a time. The bottom row is the decimal value of the four bits, which is not meaningful for a ring counter.' },
          ],
        },
        {
          kicker: 'Reliability', title: 'Making it self-starting',
          blocks: [
            { type: 'p', text: 'If noise or a bad power-up creates the wrong pattern, such as 0000 or 1100, a plain ring counter keeps circulating it forever. A self-correcting version feeds a 1 into the first stage only when the other upper outputs are all 0:' },
            { type: 'eq', items: [{ label: 'D3', expr: '(Q3 + Q2 + Q1)′', note: 'NOR of the upper three outputs' }] },
            { type: 'p', text: 'With this feedback, 0000 turns into 1000 on the next clock, and stray extra 1s are shifted out of the register within a few pulses.' },
          ],
        },
        {
          kicker: 'Try it', title: 'Live ring counter',
          blocks: [{ type: 'sim', kind: 'ring', n: 4, isAsync: false, edge: 'rise' }],
        },
      ]}
      remember={[
        'A ring counter has n flip-flops and n states, and exactly one output is 1 at any time.',
        'The last flip-flop feeds the first: D3 = Q0 in a 4-bit counter. The other D inputs are the neighbouring Q outputs.',
        'It must be preset (for example to 1000) before use, or fitted with self-correcting feedback.',
        'Each output is a pulse train at f ÷ n with a 1/n duty cycle.',
        'Only n of the 2ⁿ possible states are used.',
      ]}
      pros={[
        { title: 'No decoding needed', body: 'Every flip-flop output is already a decoded state.' },
        { title: 'Fast and glitch-free', body: 'It is a synchronous design with no gates in the loop.' },
        { title: 'Very simple', body: 'Just D flip-flops wired in a circle.' },
        { title: 'Easy to extend', body: 'Add a flip-flop to add one more state.' },
      ]}
      cons={[
        { title: 'Flip-flop hungry', body: 'n flip-flops give only n states, where a binary counter would give 2ⁿ.' },
        { title: 'Not self-starting', body: 'It needs a preset or clear to start with a single 1.' },
        { title: 'Errors persist', body: 'A wrong pattern, such as two 1s, circulates indefinitely.' },
        { title: 'Poor for long cycles', body: 'A 60-step cycle would need 60 flip-flops.' },
      ]}
      verdict={{
        use: 'you need a handful of clean, one-at-a-time timing or enable signals.',
        avoid: 'you need many states. A binary counter with a decoder uses far fewer flip-flops.',
      }}
      apps={[
        { name: 'Sequencers and timing signals', why: 'Generate non-overlapping enable pulses one after another.' },
        { name: 'Display scanning', why: 'Select one digit at a time in a multiplexed display.' },
        { name: 'Stepper motor drive', why: 'Energise one winding at a time in order.' },
        { name: 'One-hot state machines', why: 'Hold a control state where each state has its own flip-flop.' },
      ]}
      practice={[
        { q: 'A 4-bit ring counter starts at 1000. What is the state after 2 pulses?', a: '0010', work: '1000 → 0100 → 0010.' },
        { q: 'How many states does an 8-bit ring counter have? (number only)', a: '8', work: 'A ring counter has as many states as flip-flops.' },
        { q: 'An 8 kHz clock drives a 4-bit ring counter. What is the frequency at each output? (kHz, number only)', a: '2', work: '8 kHz ÷ 4 = 2 kHz.' },
        { q: 'A plain ring counter powers up at 0000. After how many pulses does it show a single 1? (number or "never")', a: 'never', work: 'Shifting all zeros produces all zeros, so it stays at 0000 without a preset or self-correcting feedback.' },
      ]}
      related={[NAV.johnson, NAV.mod, NAV.syncUp, NAV.asyncUp]}
    />
  );
}