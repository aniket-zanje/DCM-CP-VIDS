import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const E4U = 'https://www.electrical4u.com/images/2017/may/';

export default function JohnsonPage() {
  return (
    <CounterPage
      title="Johnson Counter"
      lead="A twisted ring counter: the complement of the last output feeds the first input, so n flip-flops walk through 2n distinct states."
      prev={NAV.ring}
      next={{ ...NAV.overview, label: 'Wrap up' }}
      facts={[
        { label: 'Flip-flops', value: '4 (D type)' },
        { label: 'States', value: '8 (MOD-2n)' },
        { label: 'Feedback', value: 'Q0′ → D3', mono: true },
        { label: 'Start', value: 'Cleared to 0000' },
        { label: 'Each output', value: 'f ÷ 8, 50% duty' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is a Johnson counter?',
          blocks: [
            { type: 'fig', src: 'https://www.electrical4u.com/wp-content/uploads/What-is-Johnson-Counter.png', alt: 'Johnson counter overview', caption: 'A Johnson counter: a shift register with the inverted last output fed back to the first input.' },
            { type: 'p', text: 'A Johnson counter, also called a twisted ring or switch-tail counter, is a ring counter with one twist: the inverted output of the last flip-flop is fed back to the first. Starting from all zeros, 1s fill the register from one end until it is full, and then 0s push them out again in the same order. That gives twice as many states as a plain ring counter with the same number of flip-flops.' },
            {
              type: 'keypoints', items: [
                { title: 'Twisted feedback', body: 'The complement Q0′ drives D3. Every other D input is its neighbour\'s Q.' },
                { title: '2n states from n flip-flops', body: 'A 4-bit Johnson counter has 8 states, double a 4-bit ring counter.' },
                { title: 'One bit changes per step', body: 'Each transition flips a single bit, so decoded outputs are free from glitches.' },
                { title: 'Two-input decoding', body: 'Any one of the 2n states can be identified with a single 2-input gate.' },
              ],
            },
          ],
        },
        {
          kicker: 'Design', title: 'Circuit diagram',
          blocks: [
            { type: 'fig', src: `${E4U}1494409755.PNG`, alt: 'Johnson counter circuit diagram', caption: 'Circuit diagram of the Johnson counter.' },
            { type: 'eq', items: [{ label: 'D3', expr: 'Q0′', note: 'twisted feedback' }, { label: 'D2', expr: 'Q3' }, { label: 'D1', expr: 'Q2' }, { label: 'D0', expr: 'Q1' }] },
            { type: 'note', text: 'Clear the counter to 0000 before use. A 4-bit Johnson counter has 8 unused states that form their own closed loop, so a bad power-up state would never find its way back into the main sequence.', tone: 'warn' },
          ],
        },
        {
          kicker: 'Truth table', title: 'State sequence',
          blocks: [
            { type: 'fig', src: `${E4U}1494409839.PNG`, alt: 'Truth table of the Johnson counter', caption: 'Reference truth table.' },
            { type: 'p', text: 'Generated for the 4-bit counter. Watch the 1s fill in from the left and then drain out in the same order.' },
            { type: 'seq', kind: 'johnson', n: 4, showDec: false },
          ],
        },
        {
          kicker: 'Timing', title: 'Pulse diagram',
          blocks: [
            { type: 'fig', src: `${E4U}1494409865.PNG`, alt: 'Pulse diagram of the Johnson counter', caption: 'Reference pulse diagram.' },
            { type: 'wave', kind: 'johnson', n: 4, pulses: 12, edge: 'rise', caption: 'Generated timing diagram: each output is a square wave at f ÷ 8 with 50% duty, shifted by one clock period from its neighbour.' },
            { type: 'p', text: 'These phase-shifted square waves are what make Johnson counters useful as multiphase clock generators.' },
          ],
        },
        {
          kicker: 'Decoding', title: 'One 2-input gate per state',
          blocks: [
            { type: 'p', text: 'Because the 1s and 0s form one contiguous block, each state is uniquely marked by one adjacent pair of bits.' },
            {
              type: 'table', heads: ['State', 'Q3 Q2 Q1 Q0', 'Decoding gate'],
              rows: [
                ['0', '0 0 0 0', 'Q3′ · Q0′'], ['1', '1 0 0 0', 'Q3 · Q2′'], ['2', '1 1 0 0', 'Q2 · Q1′'], ['3', '1 1 1 0', 'Q1 · Q0′'],
                ['4', '1 1 1 1', 'Q3 · Q0'], ['5', '0 1 1 1', 'Q3′ · Q2'], ['6', '0 0 1 1', 'Q2′ · Q1'], ['7', '0 0 0 1', 'Q1′ · Q0'],
              ],
              caption: 'Compare with a binary counter, where each state needs a gate with n inputs.',
            },
          ],
        },
        {
          kicker: 'Try it', title: 'Live Johnson counter',
          blocks: [{ type: 'sim', kind: 'johnson', n: 4, isAsync: false, edge: 'rise' }],
        },
      ]}
      remember={[
        'Feedback comes from the complement of the last flip-flop: D3 = Q0′ in a 4-bit counter.',
        'n flip-flops give 2n states, so a 4-bit Johnson counter is MOD-8 and a 5-bit one is MOD-10.',
        'Only one bit changes per clock, so decoded outputs are glitch-free.',
        'Each state is decoded with one 2-input gate.',
        'It must be cleared before use. The 8 unused states of a 4-bit counter form a closed loop.',
      ]}
      pros={[
        { title: 'Twice the states of a ring counter', body: '2n states from n flip-flops.' },
        { title: 'Glitch-free decoding', body: 'Only one bit changes at each step.' },
        { title: 'Simple decoding', body: 'Each state needs just one 2-input gate.' },
        { title: 'Multiphase outputs', body: 'The outputs are 50% duty square waves in successive phases.' },
      ]}
      cons={[
        { title: 'Not self-starting', body: 'Unused states form a loop, so a clear or preset is essential.' },
        { title: 'Wasted states', body: '2ⁿ − 2n states are unused, far fewer than a ring counter wastes but still many.' },
        { title: 'Even moduli only', body: 'The basic circuit gives MOD-2n, so odd moduli need a modified feedback.' },
        { title: 'Needs gates to decode', body: 'A ring counter outputs decoded states directly.' },
      ]}
      verdict={{
        use: 'you want clean multiphase clocks or a glitch-free decoded sequence with few flip-flops.',
        avoid: 'you need an odd modulus or a very long count. A binary counter with a decoder is more compact.',
      }}
      apps={[
        { name: 'Multiphase clock generators', why: 'Produce several equally spaced, phase-shifted square waves.' },
        { name: 'Decade counters', why: 'The popular CD4017 decade counter is built on a 5-stage Johnson counter plus decoding gates.' },
        { name: 'Sequencers and motor drives', why: 'Step through glitch-free control patterns, such as stepper motor phases.' },
        { name: 'Even-ratio frequency dividers', why: 'Divide the clock by 2n with a 50% duty cycle output.' },
      ]}
      practice={[
        { q: 'How many states does a 5-bit Johnson counter have? (number only)', a: '10', work: '2 × 5 = 10, which is why a 5-stage Johnson counter works as a decade counter.' },
        { q: 'A 4-bit Johnson counter starts at 0000. What is the state after 3 pulses?', a: '1110', work: '0000 → 1000 → 1100 → 1110.' },
        { q: 'A 4-bit Johnson counter is at 1111. What is the next state?', a: '0111', work: 'Q0′ = 0 enters at the left, and the 1s start draining out: 0111.' },
        { q: 'A 16 kHz clock drives a 4-bit Johnson counter. What is the frequency of each output? (kHz, number only)', a: '2', work: 'The modulus is 8, so 16 kHz ÷ 8 = 2 kHz.' },
      ]}
      related={[NAV.ring, NAV.mod, NAV.syncUp, NAV.asyncUp]}
    />
  );
}