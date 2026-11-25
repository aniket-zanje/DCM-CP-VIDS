import React from 'react';
import CounterPage, { NAV } from '../../../components/CounterKit';

const GFG = 'https://media.geeksforgeeks.org/wp-content/uploads/';

export default function AsyncUpDownPage() {
  return (
    <CounterPage
      bigTitle
      title="Asynchronous Up-Down Counter"
      lead="One ripple counter, two directions. A mode input M steers each stage's clock from either Q or Q′, so the same flip-flops count up or down on demand."
      prev={NAV.asyncDown}
      next={NAV.syncUp}
      facts={[
        { label: 'Mode input', value: 'M = 0 up, M = 1 down' },
        { label: 'Flip-flops', value: '3 (T or JK)' },
        { label: 'States', value: '8 (MOD-8)' },
        { label: 'Clock rule', value: 'CLK = Q ⊕ M', mono: true },
        { label: 'Trigger', value: 'Falling edge' },
      ]}
      sections={[
        {
          kicker: 'The idea', title: 'What is an asynchronous up-down counter?',
          blocks: [
            { type: 'p', text: 'An up counter clocks each stage from Q, and a down counter clocks each stage from Q′. An up-down counter keeps both options and lets a control input choose between them. The flip-flops still ripple: only the first stage gets the external clock, so the count is asynchronous.' },
            {
              type: 'keypoints', items: [
                { title: 'A mode input M', body: 'M = 0 selects up counting and M = 1 selects down counting. On this page, M = 0 is always up.' },
                { title: 'Clock steering', body: 'Each stage after the first is clocked from Q (up) or Q′ (down) of the stage before it, chosen by M.' },
                { title: 'One XOR per stage', body: 'Q selected when M = 0 and Q′ selected when M = 1 is exactly Q ⊕ M, so one XOR gate does the job.' },
                { title: 'Direction changes need care', body: 'Flipping M changes the XOR output, which can itself create a clock edge and add or lose a count.' },
              ],
            },
          ],
        },
        {
          kicker: 'Mode decision', title: 'How M selects the direction',
          blocks: [
            { type: 'p', text: 'The first step in the design is deciding what M means and what the clock of each later stage must be in each mode.' },
            { type: 'fig', src: `${GFG}20210517144411/Newtable-660x498.jpg`, alt: 'Decision table for the mode input of the asynchronous up-down counter', caption: 'Mode decision table.' },
            {
              type: 'table', heads: ['M', 'Direction', 'Clock of FF1 and FF2', 'Equation'],
              rows: [['0', 'Up', 'Q of the previous stage', 'CLK = Q'], ['1', 'Down', 'Q′ of the previous stage', 'CLK = Q′']],
              caption: 'The convention used on this page. If your reference figure uses M = 1 for up counting, simply swap M and M′ in the equations.',
            },
          ],
        },
        {
          kicker: 'Simplification', title: 'K-map and equations',
          blocks: [
            { type: 'p', text: 'The clock of each later stage depends on only two variables: M and the Q output of the stage before it. Plotting the required value on a K-map shows two 1s on a diagonal. They cannot be merged, and together they form the XOR function.' },
            { type: 'fig', src: `${GFG}20210517144211/NewKMapUpdown-660x313.jpg`, alt: 'K-map for the clock input of the asynchronous up-down counter', caption: 'K-map from the reference design.' },
            {
              type: 'kmap', maps: [{
                title: 'Clock of the next stage', rowVar: 'M', colVars: 'Q', rowLabels: ['0', '1'], colLabels: ['0', '1'],
                fn: (n) => (n >> 1) ^ (n & 1),
                groups: [{ r: 0, c: 1, w: 1, h: 1, color: '#3b82f6' }, { r: 1, c: 0, w: 1, h: 1, color: '#ef4444' }],
                formula: <>CLK = M′Q + MQ′ = M ⊕ Q</>, note: 'M = 0 passes Q through, M = 1 passes Q′ through.',
              }],
            },
            {
              type: 'eq', items: [
                { label: 'CLK0', expr: 'external clock' },
                { label: 'CLK1', expr: 'Q0 ⊕ M' },
                { label: 'CLK2', expr: 'Q1 ⊕ M' },
              ],
            },
          ],
        },
        {
          kicker: 'Circuit', title: 'Logic diagram',
          blocks: [
            { type: 'fig', src: `${GFG}20210517144222/Newupdownsyn-660x330.jpg`, alt: 'Logic diagram of the asynchronous up-down counter', caption: 'Logic diagram: toggle flip-flops with mode gating between the stages.' },
            { type: 'note', tone: 'warn', text: 'Because CLK = Q ⊕ M, changing M while the counter is idle can flip the XOR output and send a spurious clock edge to the next stage. Change M deliberately and expect to re-check the count, or use a synchronous design when direction changes are frequent.' },
          ],
        },
        {
          kicker: 'Timing', title: 'Timing diagram',
          blocks: [
            { type: 'p', text: 'The diagram below counts up for six pulses (M = 0), then M switches to 1 and the counter counts back down to zero.' },
            { type: 'wave', kind: 'updown', n: 3, pulses: 12, edge: 'fall', skew: 6, modeSeq: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], caption: 'Generated timing diagram. The green M trace changes between the pulses. Q outputs show the ripple delay, and the bottom row is the decimal count.' },
          ],
        },
        {
          kicker: 'Try it', title: 'Live up-down counter',
          blocks: [
            { type: 'p', text: 'Toggle M to reverse the direction, then send clock pulses.' },
            { type: 'sim', kind: 'updown', n: 3, isAsync: true, edge: 'fall' },
          ],
        },
      ]}
      remember={[
        'M = 0 gives up counting and M = 1 gives down counting on this page. Check the convention of any other source.',
        'Each later stage is clocked by Q ⊕ M of the stage before it.',
        'The first flip-flop is always clocked directly by the external clock.',
        'A 3-bit version needs two XOR gates. Delay still accumulates, and each XOR adds a little more.',
        'Changing M can create a false clock edge, so do not switch direction in the middle of a count.',
      ]}
      pros={[
        { title: 'Two directions, one circuit', body: 'The same flip-flops count up or down, saving a second counter.' },
        { title: 'Small cost', body: 'One XOR gate per stage on top of the ripple counter.' },
        { title: 'Simple control', body: 'A single input M sets the direction.' },
        { title: 'Keeps ripple-counter economy', body: 'The fast clock still drives only the first stage.' },
      ]}
      cons={[
        { title: 'More delay per stage', body: 'Each XOR adds to the flip-flop delay, so the ripple is slower than in a plain counter.' },
        { title: 'Direction-change hazards', body: 'Switching M can inject a false clock edge and corrupt the count.' },
        { title: 'Glitches in decoded states', body: 'Intermediate states appear briefly while the ripple settles.' },
        { title: 'Poor for high speed', body: 'Synchronous up-down counters handle fast, frequent reversals much better.' },
      ]}
      verdict={{
        use: 'direction changes are rare, speed is modest, and you want to reuse one set of flip-flops.',
        avoid: 'the direction flips often or the count feeds fast synchronous logic. Use a synchronous up-down counter instead.',
      }}
      apps={[
        { name: 'Bidirectional event counting', why: 'Count items entering (up) and leaving (down), such as people in a room.' },
        { name: 'Position tracking', why: 'Follow the position of a slowly moving shaft or slider forwards and backwards.' },
        { name: 'Level or inventory counters', why: 'Add one on each arrival and subtract one on each removal.' },
        { name: 'Slow digital controls', why: 'Raise or lower a setting, such as a volume level, one step per press.' },
      ]}
      practice={[
        { q: 'M = 1 and Q1 = 1. What is the clock value CLK2 = Q1 ⊕ M? (0 or 1)', a: '0', work: '1 ⊕ 1 = 0.' },
        { q: 'The counter is at 000 and M = 1. What is the state after one pulse?', a: '111', work: 'Counting down from 000 wraps to 111.' },
        { q: 'How many XOR gates does a 3-bit asynchronous up-down counter need? (number only)', a: '2', work: 'FF1 and FF2 each need one. FF0 uses the external clock directly.' },
        { q: 'Start at 011 with M = 0. What is the state after 2 pulses?', a: '101', work: '011 → 100 → 101 when counting up.' },
      ]}
      related={[NAV.asyncUp, NAV.asyncDown, NAV.syncUpDown, NAV.mod]}
    />
  );
}