import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const IMG = 'https://physicsteacher.in/wp-content/uploads/2021/11/';

export default function AsyncUpPage() {
  return (
    <CounterPage
      title="Asynchronous Up Counter"
      lead="A ripple counter in which every flip-flop is clocked by the one before it, so the binary count climbs from 000 to 111 and then wraps around."
      prev={NAV.overview}
      next={NAV.asyncDown}
      facts={[
        { label: 'Flip-flops', value: '3 (T or JK)' },
        { label: 'States', value: '8 (MOD-8)' },
        { label: 'Sequence', value: '000 → 111', mono: true },
        { label: 'Trigger', value: 'Falling edge' },
        { label: 'MSB output', value: 'f ÷ 8' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is an asynchronous up counter?',
          blocks: [
            { type: 'p', text: 'A counter is a sequential circuit that steps through a fixed list of states, one step per clock pulse. In an asynchronous counter, also called a ripple counter, the flip-flops do not share a clock. Only the first flip-flop receives the external clock, and every later flip-flop is clocked by the output of the one before it.' },
            { type: 'p', text: 'In an up counter the binary value rises by one on each pulse: 000, 001, 010, and so on up to 111, then back to 000. The word "ripple" describes how a change travels from the least significant bit towards the most significant bit, one stage after another.' },
            {
              type: 'keypoints', items: [
                { title: 'Toggle flip-flops', body: 'Every stage is a T flip-flop (or a JK flip-flop with J = K = 1), so it flips each time its clock edge arrives.' },
                { title: 'Ripple clocking', body: 'The external clock drives only FF0. The output of each stage clocks the next one.' },
                { title: 'Binary weights', body: 'Q0 toggles on every pulse, Q1 on every second, Q2 on every fourth. Together they count in binary.' },
                { title: 'MOD and division', body: 'n flip-flops give MOD 2ⁿ, and each stage divides the frequency by 2, so Q2 runs at f ÷ 8.' },
              ],
            },
          ],
        },
        {
          kicker: 'Circuit and states', title: '3-bit asynchronous up counter',
          blocks: [
            { type: 'p', text: 'Three toggle flip-flops are chained. We assume falling-edge-triggered devices: the external clock drives FF0, Q0 drives the clock of FF1, and Q1 drives the clock of FF2. Q2 is the most significant bit.' },
            { type: 'fig', src: `${IMG}image-88.png`, alt: '3-bit asynchronous up counter logic diagram', caption: 'Logic diagram: three flip-flops, each clocked by the previous output.' },
            { type: 'p', text: 'Whenever Q0 falls from 1 to 0 it toggles FF1, and whenever Q1 falls it toggles FF2. The result is the binary sequence in this state table.' },
            { type: 'fig', src: `${IMG}image-87.png`, alt: 'State table of the 3-bit asynchronous up counter', caption: 'State table: the count goes from 000 to 111 and then repeats.' },
            { type: 'note', text: 'With rising-edge-triggered flip-flops, clock each stage from Q′ instead of Q to get the same up-counting behaviour.' },
          ],
        },
        {
          kicker: 'How it works', title: 'Step-by-step operation',
          blocks: [
            {
              type: 'steps', items: [
                { title: 'Start at 000', body: 'All flip-flops are cleared, so Q2 Q1 Q0 = 000.' },
                { title: 'Pulse 1 gives 001', body: 'FF0 toggles and Q0 rises from 0 to 1. A rising edge on Q0 is not the falling edge FF1 waits for, so FF1 does not change.' },
                { title: 'Pulse 2 gives 010', body: 'FF0 toggles back to 0. That falling edge on Q0 clocks FF1, which toggles from 0 to 1.' },
                { title: 'Pulse 4 gives 100: the ripple', body: 'From 011, Q0 falls, which clocks FF1 so Q1 falls, which clocks FF2 so Q2 rises. The change passes through all three stages in turn.' },
                { title: 'Pulse 8 gives 000', body: 'From 111 the same ripple clears every bit and the counter wraps around.' },
              ],
            },
          ],
        },
        {
          kicker: 'Timing', title: 'Pulse (timing) diagram',
          blocks: [
            { type: 'fig', src: `${IMG}image-89.png`, alt: 'Pulse diagram of the 3-bit asynchronous up counter', caption: 'Reference pulse diagram for the 3-bit up counter.' },
            { type: 'wave', kind: 'up', n: 3, pulses: 10, edge: 'fall', skew: 6, caption: 'Generated timing diagram. Each output changes on a falling edge of the stage before it, and the small offsets show the ripple delay. The bottom row is the decimal count.' },
            { type: 'p', text: 'Count the transitions: Q0 completes one cycle for every two clock cycles, Q1 for every four, Q2 for every eight. This is why a ripple counter doubles as a divide-by-2, 4, 8 frequency divider.' },
          ],
        },
        {
          kicker: 'Try it', title: 'Live ripple counter',
          blocks: [
            { type: 'p', text: 'Send clock pulses, or let it run on its own. Switch on the ripple delay to see the higher bits lag behind the lower ones.' },
            { type: 'sim', kind: 'up', n: 3, isAsync: true, edge: 'fall' },
          ],
        },
        {
          kicker: 'Speed limit', title: 'Why ripple counters are slower',
          blocks: [
            { type: 'p', text: 'The last flip-flop only changes after every earlier stage has changed, so the full ripple takes about n × t(FF). The clock period must be longer than that. Adjust the sliders to compare with a synchronous counter.' },
            { type: 'fmax' },
          ],
        },
      ]}
      remember={[
        'n flip-flops count from 0 to 2ⁿ − 1: a 3-bit counter is MOD-8 and a 4-bit counter is MOD-16.',
        'Only FF0 sees the external clock. Every other flip-flop is clocked by the stage before it.',
        'Q0, Q1 and Q2 run at f ÷ 2, f ÷ 4 and f ÷ 8: each stage halves the frequency.',
        'The total delay is about n × t(FF), so the maximum clock rate falls as bits are added.',
        'Falling-edge flip-flops clock the next stage from Q for up counting. Rising-edge flip-flops use Q′.',
      ]}
      pros={[
        { title: 'Simple hardware', body: 'Just n flip-flops and wires, with no extra gates.' },
        { title: 'Cheap and low power', body: 'Only the first flip-flop sees the fast clock, so the rest of the circuit switches less often.' },
        { title: 'Built-in frequency divider', body: 'The MSB output is the input clock divided by 2ⁿ.' },
        { title: 'Easy to extend', body: 'One more flip-flop doubles the counting range.' },
      ]}
      cons={[
        { title: 'Delays add up', body: 'The last stage changes about n × t(FF) after the clock edge.' },
        { title: 'Glitchy intermediate states', body: 'Going from 011 to 100 briefly passes through 010 and 000, so decoding gates can produce spikes.' },
        { title: 'Limited speed', body: 'The clock period has to be longer than the whole ripple.' },
        { title: 'Awkward with synchronous logic', body: 'Bits change at different instants, which makes timing analysis harder.' },
      ]}
      verdict={{
        use: 'you need a cheap frequency divider or a slow event counter and only the final count matters.',
        avoid: 'you decode intermediate states, run at high clock rates, or feed the count into synchronous logic.',
      }}
      apps={[
        { name: 'Frequency dividers', why: 'Divide a fast clock by 2, 4, 8 and so on without any extra gates.' },
        { name: 'Digital clocks and watches', why: 'A chain of 15 divide-by-2 stages turns a 32.768 kHz crystal into a 1 Hz tick.' },
        { name: 'Event counting', why: 'Count pulses from a sensor or switch at modest speeds.' },
        { name: 'Simple timers', why: 'Count clock pulses to measure a fixed time interval.' },
      ]}
      practice={[
        { q: 'How many flip-flops does a MOD-16 ripple counter need? (number only)', a: '4', work: '2⁴ = 16, so four flip-flops give 16 states.' },
        { q: 'A 3-bit ripple counter is clocked at 64 kHz. What is the frequency at Q2? (kHz, number only)', a: '8', work: 'Three stages divide by 2³ = 8, so 64 ÷ 8 = 8 kHz.' },
        { q: 'Starting from 000, what does a 3-bit up counter read after 5 pulses?', a: '101', work: 'Five in binary is 101.' },
        { q: 'Each flip-flop has a 20 ns delay. What is the worst-case ripple delay of a 4-bit counter? (ns, number only)', a: '80', work: '4 × 20 ns = 80 ns.' },
      ]}
      related={[NAV.asyncDown, NAV.asyncUpDown, NAV.syncUp, NAV.mod]}
    />
  );
}