import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const GFG = 'https://media.geeksforgeeks.org/wp-content/uploads/';

export default function AsyncDownPage() {
  return (
    <CounterPage
      title="Asynchronous Down Counter"
      lead="A ripple counter that counts backwards: each stage is clocked from the complement output of the one before it, so the value falls from 111 to 000 and then wraps."
      prev={NAV.asyncUp}
      next={NAV.asyncUpDown}
      facts={[
        { label: 'Flip-flops', value: '3 (T or JK)' },
        { label: 'States', value: '8 (MOD-8)' },
        { label: 'Sequence', value: '111 → 000', mono: true },
        { label: 'Next clock from', value: 'Q′ of previous' },
        { label: 'Trigger', value: 'Falling edge' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is an asynchronous down counter?',
          blocks: [
            { type: 'p', text: 'An asynchronous down counter is a ripple counter whose value decreases by one on every clock pulse: 111, 110, 101, and so on down to 000, after which it jumps back to 111. As in every ripple counter, only the first flip-flop receives the external clock and the others are clocked by earlier stages.' },
            {
              type: 'keypoints', items: [
                { title: 'Toggle flip-flops', body: 'Each stage is a T flip-flop (or JK with J = K = 1) and flips on every active clock edge.' },
                { title: 'Complement clocking', body: 'With falling-edge flip-flops the next stage is clocked from Q′ of the previous one. In an up counter it would be Q.' },
                { title: 'Down sequence', body: 'The count runs 7, 6, 5 … 0 and then wraps to 7. A borrow ripples upward when it wraps.' },
                { title: 'Same limits as any ripple counter', body: 'Delay adds up to about n × t(FF), the count is MOD 2ⁿ and the MSB runs at f ÷ 2ⁿ.' },
              ],
            },
          ],
        },
        {
          kicker: 'Circuit and states', title: '3-bit asynchronous down counter',
          blocks: [
            { type: 'p', text: 'Three toggle flip-flops are chained. The external clock drives FF0, Q0′ drives the clock of FF1, and Q1′ drives the clock of FF2. Each time a complement output falls, which means the true output rises, the next stage toggles.' },
            { type: 'fig', src: `${GFG}20210614073010/DowncounterAsynchronous-660x328.png`, alt: '3-bit asynchronous down counter logic diagram', caption: 'Logic diagram of the 3-bit asynchronous down counter.' },
            { type: 'p', text: 'The state table shows each present state and the state it moves to on the next clock pulse.' },
            { type: 'fig', src: `${GFG}20210612122446/Untitleddrawing15-660x347.png`, alt: 'State table of the 3-bit asynchronous down counter', caption: 'State table: the count falls by one on each pulse.' },
            { type: 'note', text: 'With rising-edge-triggered flip-flops the rule flips: clock each stage from Q (not Q′) to count down, and from Q′ to count up.' },
          ],
        },
        {
          kicker: 'How it works', title: 'Following the borrow',
          blocks: [
            {
              type: 'steps', items: [
                { title: 'Start at 111', body: 'All three outputs are 1.' },
                { title: '111 to 110', body: 'FF0 toggles and Q0 falls. That makes Q0′ rise, which is not a falling edge, so FF1 holds. The count is 110.' },
                { title: '110 to 101', body: 'Q0 rises, so Q0′ falls and FF1 toggles from 1 to 0. Q1′ rises, so FF2 holds. The count is 101.' },
                { title: '000 to 111: the borrow', body: 'Q0 rises, so Q0′ falls, so FF1 toggles up, so Q1′ falls, so FF2 toggles up. All bits flip and the counter wraps to 111.' },
              ],
            },
          ],
        },
        {
          kicker: 'Timing', title: 'Timing diagram',
          blocks: [
            { type: 'fig', src: `${GFG}20210614201748/CopyofTimingDiagramcontrolled5-768x581.png`, alt: 'Timing diagram of the 3-bit asynchronous down counter', caption: 'Reference timing diagram of the down counter.' },
            { type: 'wave', kind: 'down', n: 3, pulses: 10, edge: 'fall', skew: 6, caption: 'Generated timing diagram, starting from 7. The outputs step down on each clock pulse, with the ripple delay exaggerated.' },
          ],
        },
        {
          kicker: 'Try it', title: 'Live down counter',
          blocks: [
            { type: 'sim', kind: 'down', n: 3, isAsync: true, edge: 'fall' },
          ],
        },
        {
          kicker: 'Speed limit', title: 'How fast can it run?',
          blocks: [
            { type: 'p', text: 'The borrow can ripple through every stage, for example on the 000 to 111 step, so the clock period must exceed about n × t(FF).' },
            { type: 'fmax' },
          ],
        },
      ]}
      remember={[
        'A down counter has the same hardware as an up counter. Only the clock connection changes: Q′ instead of Q for falling-edge flip-flops.',
        'The sequence is 111, 110, 101, 100, 011, 010, 001, 000 and then back to 111.',
        'The step from 000 to 111 is the slowest: every stage toggles, one after another.',
        'A MOD-2ⁿ counter needs n flip-flops, and the MSB frequency is f ÷ 2ⁿ.',
      ]}
      pros={[
        { title: 'Counts backwards with no extra logic', body: 'Just reroute each clock from Q′ rather than Q.' },
        { title: 'Minimal hardware', body: 'n flip-flops and nothing else.' },
        { title: 'Low clock load', body: 'The fast clock drives only the first flip-flop.' },
        { title: 'Natural divider', body: 'Each stage still halves the frequency.' },
      ]}
      cons={[
        { title: 'Accumulated delay', body: 'The last stage lags the clock by about n × t(FF).' },
        { title: 'Transient wrong counts', body: 'On the borrow from 000 the output briefly shows 001, 011 and so on before settling at 111.' },
        { title: 'Speed ceiling', body: 'The clock period must cover the whole ripple.' },
        { title: 'Fixed direction', body: 'It can only count down. A mode input needs extra gates (see the up-down counter).' },
      ]}
      verdict={{
        use: 'you need a simple countdown or a low-speed down counter and only the final value matters.',
        avoid: 'you need glitch-free decoded outputs, high clock rates, or tight alignment with synchronous logic.',
      }}
      apps={[
        { name: 'Countdown timers', why: 'Load a value, count down, and act when the count reaches zero.' },
        { name: 'Programmable dividers', why: 'Preset a count, count down to zero, then reload to divide by a chosen number.' },
        { name: 'Delay generation', why: 'Wait a set number of clock pulses before triggering an event.' },
        { name: 'Resource counters', why: 'Track items remaining, such as a quantity that is used up one at a time.' },
      ]}
      practice={[
        { q: 'A 3-bit down counter starts at 111. What does it read after 3 pulses?', a: '100', work: '111 → 110 → 101 → 100.' },
        { q: 'What does a 3-bit down counter read one pulse after 000?', a: '111', work: 'The counter wraps around from 000 to 111.' },
        { q: 'Starting at 010, what is the state after 3 down pulses?', a: '111', work: '010 → 001 → 000 → 111.' },
        { q: 'How many states does a 5-bit down counter have? (number only)', a: '32', work: '2⁵ = 32.' },
      ]}
      related={[NAV.asyncUp, NAV.asyncUpDown, NAV.syncDown, NAV.mod]}
    />
  );
}