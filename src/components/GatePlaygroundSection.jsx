import React, { useState } from 'react';
import { Cpu, Zap } from 'lucide-react';

export const GatePlaygroundSection = () => {
  const [selectedGate, setSelectedGate] = useState('AND');
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  const gates = {
    AND: {
      ic: 'IC 7408',
      calc: (x, y) => (x && y ? 1 : 0),
      expr: 'Y = A · B',
      desc: 'Output is HIGH only when all inputs are HIGH.'
    },
    OR: {
      ic: 'IC 7432',
      calc: (x, y) => (x || y ? 1 : 0),
      expr: 'Y = A + B',
      desc: 'Output is HIGH if at least one input is HIGH.'
    },
    NOT: {
      ic: 'IC 7404',
      calc: (x) => (x ? 0 : 1),
      expr: 'Y = A\'',
      desc: 'Inverts the incoming digital logic level.'
    },
    NAND: {
      ic: 'IC 7400 (Universal)',
      calc: (x, y) => (!(x && y) ? 1 : 0),
      expr: 'Y = (A · B)\'',
      desc: 'Universal Gate. Produces LOW only when both inputs are HIGH.'
    },
    NOR: {
      ic: 'IC 7402 (Universal)',
      calc: (x, y) => (!(x || y) ? 1 : 0),
      expr: 'Y = (A + B)\'',
      desc: 'Universal Gate. Produces HIGH only when all inputs are LOW.'
    },
    XOR: {
      ic: 'IC 7486',
      calc: (x, y) => (x !== y ? 1 : 0),
      expr: 'Y = A ⊕ B',
      desc: 'Odd-parity detector. HIGH when inputs are unequal.'
    },
    XNOR: {
      ic: 'IC 74266',
      calc: (x, y) => (x === y ? 1 : 0),
      expr: 'Y = (A ⊕ B)\'',
      desc: 'Equivalence detector. HIGH when inputs are equal.'
    }
  };

  const isUnary = selectedGate === 'NOT';
  const gateInfo = gates[selectedGate];
  const output = isUnary ? gateInfo.calc(a) : gateInfo.calc(a, b);

  return (
    <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-vids-border p-6 sm:p-10 shadow-clay space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-vids-border">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vids-sage-100 text-vids-sage-800 text-xs font-bold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Logic Tools Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-vids-charcoal-900 tracking-tight">
              Instant Logic Gate Playground
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-vids-sage-700 bg-vids-sage-50 px-3 py-1.5 rounded-xl border border-vids-border">
            {gateInfo.ic}
          </span>
        </div>

        {/* Gate Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(gates).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGate(g)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedGate === g
                  ? 'bg-vids-sage-600 text-white shadow-xs'
                  : 'bg-vids-sage-50 text-vids-charcoal-700 hover:bg-vids-sage-100 border border-vids-border'
              }`}
            >
              {g} Gate
            </button>
          ))}
        </div>

        {/* Playground Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-vids-ivory rounded-2xl p-6 sm:p-8 border border-vids-border">
          
          {/* Controls */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-bold text-vids-charcoal-700 block">
              Toggle Digital Inputs:
            </span>
            <div className="flex gap-4">
              <button
                onClick={() => setA(a === 1 ? 0 : 1)}
                className={`flex-1 py-3 px-4 rounded-xl font-mono font-bold text-sm border-2 transition-all shadow-xs ${
                  a === 1 ? 'bg-vids-sage-600 text-white border-vids-sage-700' : 'bg-white text-vids-charcoal-700 border-vids-border'
                }`}
              >
                Input A: {a}
              </button>

              {!isUnary && (
                <button
                  onClick={() => setB(b === 1 ? 0 : 1)}
                  className={`flex-1 py-3 px-4 rounded-xl font-mono font-bold text-sm border-2 transition-all shadow-xs ${
                    b === 1 ? 'bg-vids-sage-600 text-white border-vids-sage-700' : 'bg-white text-vids-charcoal-700 border-vids-border'
                  }`}
                >
                  Input B: {b}
                </button>
              )}
            </div>

            <div className="p-3 bg-white rounded-xl border border-vids-border text-xs text-vids-charcoal-600">
              <strong className="text-vids-charcoal-900 block mb-0.5 font-mono">{gateInfo.expr}</strong>
              {gateInfo.desc}
            </div>
          </div>

          {/* Output Display */}
          <div className="md:col-span-7 flex flex-col sm:flex-row items-center justify-around gap-6 p-6 bg-white rounded-2xl border border-vids-border shadow-xs">
            <div className="text-center">
              <span className="text-[11px] font-bold text-vids-charcoal-400 uppercase tracking-wider block">
                Calculated Output Y
              </span>
              <div className={`text-5xl font-mono font-extrabold mt-1 ${output === 1 ? 'text-emerald-600' : 'text-vids-charcoal-400'}`}>
                {output}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all ${
                  output === 1
                    ? 'bg-emerald-500 border-emerald-600 shadow-led-green text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xs font-bold text-vids-charcoal-700">
                LED: {output === 1 ? 'ACTIVE HIGH' : 'LOW (OFF)'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
