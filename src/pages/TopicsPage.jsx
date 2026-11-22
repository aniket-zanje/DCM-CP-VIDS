import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Cpu, ArrowLeft, Layers } from 'lucide-react';

// Complete Table of Contents as per user requirement
export const TOPICS_TREE = [
  {
    id: 'number-systems',
    title: 'Number Systems',
    icon: '1010',
    color: 'emerald',
    badge: 'Foundations',
    subtitle: 'All radix conversions',
    desc: 'Binary, decimal, octal and hexadecimal conversions, plus BCD, Gray code and Excess-3.',
    path: '/topics/number-systems',
    sub: [
      { id: 'bin-to-dec', title: 'Binary to Decimal', path: '/topics/number-systems/bin-to-dec' },
      { id: 'dec-to-bin', title: 'Decimal to Binary', path: '/topics/number-systems/dec-to-bin' },
      { id: 'bin-to-hex', title: 'Binary to Hexadecimal', path: '/topics/number-systems/bin-to-hex' },
      { id: 'hex-to-bin', title: 'Hexadecimal to Binary', path: '/topics/number-systems/hex-to-bin' },
      { id: 'bin-to-oct', title: 'Binary to Octal', path: '/topics/number-systems/bin-to-oct' },
      { id: 'oct-to-bin', title: 'Octal to Binary', path: '/topics/number-systems/oct-to-bin' },
      { id: 'dec-to-hex', title: 'Decimal to Hexadecimal', path: '/topics/number-systems/dec-to-hex' },
      { id: 'bcd',        title: 'BCD (8421 Code)', path: '/topics/number-systems/bcd' },
      { id: 'gray-code',  title: 'Gray Code', path: '/topics/number-systems/gray-code' },
      { id: 'excess-3',   title: 'Excess-3 Code', path: '/topics/number-systems/excess-3' },
    ]
  },
  {
    id: 'logic-gates',
    title: 'Logic Gates',
    icon: 'AND',
    color: 'amber',
    badge: 'Digital Logic',
    subtitle: 'AND, OR, NOT, NAND, NOR, XOR, XNOR',
    desc: 'Basic, universal and special gates — AND, OR, NOT, NAND, NOR, XOR, XNOR.',
    path: '/topics/logic-gates',
    sub: [
      { id: 'and-gate',   title: 'AND Gate',   path: '/topics/logic-gates/and' },
      { id: 'or-gate',    title: 'OR Gate',    path: '/topics/logic-gates/or' },
      { id: 'not-gate',   title: 'NOT Gate',   path: '/topics/logic-gates/not' },
      { id: 'nand-gate',  title: 'NAND Gate',  path: '/topics/logic-gates/nand' },
      { id: 'nor-gate',   title: 'NOR Gate',   path: '/topics/logic-gates/nor' },
      { id: 'xor-gate',   title: 'XOR Gate',   path: '/topics/logic-gates/xor' },
      { id: 'xnor-gate',  title: 'XNOR Gate',  path: '/topics/logic-gates/xnor' },
      { id: 'universal',  title: 'Universal Gates (NAND/NOR)', path: '/topics/logic-gates/universal' },
    ]
  },
  {
    id: 'code-converters',
    title: 'Code Converters',
    icon: '⇄',
    color: 'cyan',
    badge: 'Conversions',
    subtitle: 'Binary, Gray, Excess-3, BCD',
    desc: 'Binary to Gray, Gray to Binary, Excess-3 to BCD and BCD to Excess-3.',
    path: '/topics/code-converters',
    sub: [
      { id: 'bin-to-gray',  title: 'Binary to Gray Code',  path: '/topics/code-converters/bin-to-gray' },
      { id: 'gray-to-bin',  title: 'Gray Code to Binary',  path: '/topics/code-converters/gray-to-bin' },
      { id: 'xs3-to-bcd',   title: 'Excess-3 to BCD',      path: '/topics/code-converters/xs3-to-bcd' },
      { id: 'bcd-to-xs3',   title: 'BCD to Excess-3',      path: '/topics/code-converters/bcd-to-xs3' },
    ]
  },
  {
    id: 'boolean-laws',
    title: 'Boolean Laws',
    icon: 'B',
    color: 'violet',
    badge: 'Algebra',
    subtitle: 'Identities and simplification',
    desc: 'Commutative, associative, distributive, absorption and complement laws.',
    path: '/topics/boolean-algebra/laws',
    sub: []
  },
  {
    id: 'kmap',
    title: 'K-Map',
    icon: 'K',
    color: 'violet',
    badge: 'Algebra',
    subtitle: 'Karnaugh map minimization',
    desc: '2, 3 and 4 variable Karnaugh maps for SOP and POS minimization.',
    path: '/topics/boolean-algebra/kmap',
    sub: []
  },
  {
    id: 'adders',
    title: 'Adders',
    icon: 'Σ+',
    color: 'green',
    badge: 'Combinational',
    subtitle: 'Half adder and full adder',
    desc: 'Half Adder and Full Adder combinational circuits.',
    path: '/topics/adders',
    sub: [
      { id: 'half-adder', title: 'Half Adder', path: '/topics/adders/half-adder' },
      { id: 'full-adder', title: 'Full Adder', path: '/topics/adders/full-adder' },
    ]
  },
  {
    id: 'subtractors',
    title: 'Subtractors',
    icon: 'Σ−',
    color: 'rose',
    badge: 'Combinational',
    subtitle: 'Half and full subtractor',
    desc: 'Half Subtractor and Full Subtractor combinational logic circuits.',
    path: '/topics/subtractors',
    sub: [
      { id: 'half-sub', title: 'Half Subtractor', path: '/topics/subtractors/half-sub' },
      { id: 'full-sub', title: 'Full Subtractor', path: '/topics/subtractors/full-sub' },
    ]
  },
  {
    id: 'bcd-adder',
    title: 'BCD Adder',
    icon: 'BCD',
    color: 'green',
    badge: 'Combinational',
    subtitle: '8421 BCD addition',
    desc: 'BCD adder that corrects an invalid sum by adding 0110.',
    path: '/topics/adders/bcd-adder',
    sub: []
  },
  {
    id: 'sop-pos',
    title: 'SOP and POS',
    icon: 'ΣΠ',
    color: 'violet',
    badge: 'Algebra',
    subtitle: 'Sum of products and product of sums',
    desc: 'Canonical and standard SOP and POS forms from a truth table.',
    path: '/topics/boolean-algebra/sop-pos',
    sub: []
  },
  {
    id: 'flip-flops',
    title: 'Flip-Flops',
    icon: 'FF',
    color: 'indigo',
    badge: 'Sequential',
    subtitle: 'D, T, SR, JK, Master-Slave',
    desc: 'D, T, SR, JK and Master-Slave flip-flops.',
    path: '/topics/flip-flops',
    sub: [
      { id: 'd-ff',       title: 'D Flip-Flop',            path: '/topics/flip-flops/d' },
      { id: 't-ff',       title: 'T Flip-Flop',            path: '/topics/flip-flops/t' },
      { id: 'sr-ff',      title: 'SR Flip-Flop',           path: '/topics/flip-flops/sr' },
      { id: 'jk-ff',      title: 'JK Flip-Flop',           path: '/topics/flip-flops/jk' },
      { id: 'ms-ff',      title: 'Master-Slave Flip-Flop', path: '/topics/flip-flops/master-slave' },
    ]
  },
  {
    id: 'registers',
    title: 'Registers',
    icon: 'REG',
    color: 'teal',
    badge: 'Sequential',
    subtitle: 'SISO, PISO, SIPO, PIPO',
    desc: 'Serial and parallel shift registers: SISO, PISO, SIPO and PIPO.',
    path: '/topics/registers',
    sub: [
      { id: 'siso', title: 'SISO (Serial In Serial Out)', path: '/topics/registers/siso' },
      { id: 'piso', title: 'PISO (Parallel In Serial Out)', path: '/topics/registers/piso' },
      { id: 'sipo', title: 'SIPO (Serial In Parallel Out)', path: '/topics/registers/sipo' },
      { id: 'pipo', title: 'PIPO (Parallel In Parallel Out)', path: '/topics/registers/pipo' },
    ]
  },
  {
    id: 'counters',
    title: 'Counters',
    icon: 'CNT',
    color: 'orange',
    badge: 'Sequential',
    subtitle: 'Sync, async, ring, Johnson, mod',
    desc: 'Synchronous and asynchronous up, down and up-down counters, plus ring, Johnson and mod counters.',
    path: '/topics/counters',
    sub: [
      { id: 'sync-up',   title: 'Synchronous Up Counter',    path: '/topics/counters/sync-up' },
      { id: 'sync-down', title: 'Synchronous Down Counter',  path: '/topics/counters/sync-down' },
      { id: 'async-up',  title: 'Asynchronous Up Counter',   path: '/topics/counters/async-up' },
      { id: 'async-down',title: 'Asynchronous Down Counter', path: '/topics/counters/async-down' },
      { id: 'sync-updown',title:'Synchronous Up-Down Counter',path:'/topics/counters/sync-updown'},
      { id: 'async-updown',title:'Asynchronous Up-Down Counter',path:'/topics/counters/async-updown'},
      { id: 'ring',      title: 'Ring Counter',              path: '/topics/counters/ring' },
      { id: 'johnson',   title: 'Johnson Counter',           path: '/topics/counters/johnson' },
      { id: 'mod',       title: 'Mod Counter',               path: '/topics/counters/mod' },
    ]
  },
  {
    id: 'pld',
    title: 'Programmable Logic Devices',
    icon: 'PLD',
    color: 'slate',
    badge: 'PLD',
    subtitle: 'PLA and PAL',
    desc: 'PLA (Programmable Logic Array) and PAL (Programmable Array Logic).',
    path: '/topics/pld',
    sub: [
      { id: 'pla', title: 'PLA – Programmable Logic Array', path: '/topics/pld/pla' },
      { id: 'pal', title: 'PAL – Programmable Array Logic', path: '/topics/pld/pal' },
    ]
  },
];

const colorMap = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', icon: 'bg-emerald-100 text-emerald-800' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',   badge: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500',   icon: 'bg-amber-100 text-amber-800' },
  cyan:    { bg: 'bg-cyan-50',    border: 'border-cyan-200',    text: 'text-cyan-800',    badge: 'bg-cyan-100 text-cyan-700',    dot: 'bg-cyan-500',    icon: 'bg-cyan-100 text-cyan-800' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-800',  badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500', icon: 'bg-violet-100 text-violet-800' },
  green:   { bg: 'bg-green-50',   border: 'border-green-200',   text: 'text-green-800',   badge: 'bg-green-100 text-green-700',  dot: 'bg-green-500',  icon: 'bg-green-100 text-green-800' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-800',    badge: 'bg-rose-100 text-rose-700',    dot: 'bg-rose-500',    icon: 'bg-rose-100 text-rose-800' },
  indigo:  { bg: 'bg-indigo-50',  border: 'border-indigo-200',  text: 'text-indigo-800',  badge: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500', icon: 'bg-indigo-100 text-indigo-800' },
  teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    text: 'text-teal-800',    badge: 'bg-teal-100 text-teal-700',    dot: 'bg-teal-500',    icon: 'bg-teal-100 text-teal-800' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-800',  badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', icon: 'bg-orange-100 text-orange-800' },
  slate:   { bg: 'bg-slate-50',   border: 'border-slate-200',   text: 'text-slate-800',   badge: 'bg-slate-100 text-slate-700',  dot: 'bg-slate-500',  icon: 'bg-slate-100 text-slate-800' },
};

export default function TopicsPage() {
  const [expanded, setExpanded] = React.useState({});
  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2EBE5] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#6D7E73] hover:text-[#141E18] transition-colors text-xs font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#386641]" />
            <span className="font-extrabold text-sm text-[#141E18]">All Topics</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Page Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DED2] text-xs font-bold text-[#4A3A2A]">
            <Cpu className="w-3.5 h-3.5 text-[#386641]" />
            Digital Techniques & Microprocessors — B.Tech Curriculum
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141E18] tracking-tight">Explore All Topics</h1>
          <p className="text-sm text-[#6D7E73] max-w-xl mx-auto leading-relaxed">
            Complete table of contents for VIDS. Click any topic to open its learning page, or expand it to view subtopics.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-[#6D7E73]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>{TOPICS_TREE.length} Main Topics</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#95C798]"></span>{TOPICS_TREE.reduce((a, t) => a + t.sub.length, 0)} Subtopics</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span>All Interactive Simulations</span>
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {TOPICS_TREE.map((topic, idx) => {
            const c = colorMap[topic.color];
            const isOpen = expanded[topic.id];
            return (
              <div key={topic.id} className={`rounded-2xl border ${c.border} bg-white shadow-xs overflow-hidden transition-all duration-200`}>
                
                {/* Main Topic Row */}
                <div className="flex items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Number */}
                    <span className="text-xs font-mono font-extrabold text-[#C2CEC6] w-6 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                    
                    {/* Icon badge */}
                    <div className={`w-10 h-10 rounded-xl ${c.icon} border ${c.border} flex items-center justify-center text-xs font-extrabold font-mono shrink-0`}>
                      {topic.icon}
                    </div>

                    {/* Title & desc */}
                    <Link to={topic.path} className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-extrabold text-sm sm:text-base text-[#141E18] truncate">{topic.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge} hidden sm:inline-block shrink-0`}>{topic.badge}</span>
                      </div>
                      <p className="text-xs text-[#6D7E73] hidden sm:block line-clamp-1">{topic.desc}</p>
                    </Link>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={topic.path}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#386641] hover:bg-[#2C5234] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Open
                    </Link>
                    {topic.sub.length > 0 && (
                      <button
                        onClick={() => toggle(topic.id)}
                        aria-label={isOpen ? 'Hide subtopics' : 'Show subtopics'}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${isOpen ? `${c.bg} ${c.border} ${c.text}` : 'bg-[#FAF9F5] border-[#E2EBE5] text-[#6D7E73] hover:bg-white'}`}
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Subtopics (expandable) */}
                {isOpen && (
                  <div className={`${c.bg} border-t ${c.border} px-5 py-4`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topic.sub.map((sub) => (
                        <Link
                          key={sub.id}
                          to={sub.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-[#E2EBE5] hover:border-[#C9E2CE] hover:shadow-xs transition-all group"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`}></span>
                          <span className="text-xs font-semibold text-[#2F3E34] group-hover:text-[#386641] transition-colors flex-1">{sub.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#C2CEC6] group-hover:text-[#386641] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Link
                        to={topic.path}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${c.text} hover:underline`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Open full module →
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center mt-10 p-5 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2]">
          <p className="text-xs text-[#6D7E73] font-medium leading-relaxed">
            <span className="text-[#4A3A2A] font-bold">VIDS – Visual Interactive Digital Systems</span><br/>
            All topics follow the B.Tech (Digital Techniques & Microprocessors) university syllabus.
          </p>
        </div>

      </div>
    </div>
  );
}
