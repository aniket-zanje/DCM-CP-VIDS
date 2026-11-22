import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Cpu, Sparkles, Layers, ListOrdered, Grid, HardDrive } from 'lucide-react';

export const InteractiveShowcaseSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Slide 1 State: 4-Bit Counter
  const [counterVal, setCounterVal] = useState(7);
  const [counterRunning, setCounterRunning] = useState(false);
  const [counterDir, setCounterDir] = useState('UP');

  // Slide 2 State: K-Map
  const [kmapMinterms, setKmapMinterms] = useState([0, 2, 8, 10, 5, 7, 13, 15]);

  // Slide 3 State: 7-Segment Display
  const [sevenSegmentDigit, setSevenSegmentDigit] = useState(3);

  // Slide 4 State: 4-Bit Shift Register
  const [registerBits, setRegisterBits] = useState([1, 0, 1, 0]);
  const [shiftSerialIn, setShiftSerialIn] = useState(1);

  // Auto-play interval for main slider
  useEffect(() => {
    let timer = null;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 4);
      }, 7500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // Counter auto clock
  useEffect(() => {
    let timer = null;
    if (counterRunning) {
      timer = setInterval(() => {
        setCounterVal(prev => {
          if (counterDir === 'UP') return (prev + 1) % 16;
          return (prev - 1 + 16) % 16;
        });
      }, 700);
    }
    return () => clearInterval(timer);
  }, [counterRunning, counterDir]);

  // 7-Segment mapping (Common Cathode: 1 = LED Segment ON)
  const segmentMap = {
    0: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 0 },
    1: { a: 0, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0 },
    2: { a: 1, b: 1, c: 0, d: 1, e: 1, f: 0, g: 1 },
    3: { a: 1, b: 1, c: 1, d: 1, e: 0, f: 0, g: 1 },
    4: { a: 0, b: 1, c: 1, d: 0, e: 0, f: 1, g: 1 },
    5: { a: 1, b: 0, c: 1, d: 1, e: 0, f: 1, g: 1 },
    6: { a: 1, b: 0, c: 1, d: 1, e: 1, f: 1, g: 1 },
    7: { a: 1, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0 },
    8: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1 },
    9: { a: 1, b: 1, c: 1, d: 1, e: 0, f: 1, g: 1 },
  };

  const activeSegments = segmentMap[sevenSegmentDigit] || segmentMap[0];

  // Shift right operation
  const handleShiftRight = () => {
    setRegisterBits(prev => [shiftSerialIn, prev[0], prev[1], prev[2]]);
  };

  const slides = [
    {
      id: 'counter',
      tabLabel: '4-Bit Counter',
      icon: ListOrdered,
      badge: 'Interactive Lab 01',
      title: 'Synchronous Binary Ripple Counter',
      subtitle: 'Observe four cascaded flip-flops cycling through sixteen discrete binary states (0000₂ to 1111₂) on clock edge pulses.',
      chipRef: 'IC 7493 / 74163',
      renderDemo: () => {
        const bits = [
          (counterVal >> 3) & 1,
          (counterVal >> 2) & 1,
          (counterVal >> 1) & 1,
          counterVal & 1
        ];
        return (
          <div className="bg-gradient-to-br from-[#FAFBF8] to-[#F3F7F4] rounded-2xl p-6 border border-vids-border shadow-xs space-y-5">
            <div className="flex items-center justify-between text-xs font-bold text-vids-charcoal-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Flip-Flop Output Register (Q₃ Q₂ Q₁ Q₀)
              </span>
              <span className="font-mono text-vids-sage-800 bg-white px-2.5 py-1 rounded-md border border-vids-border text-[11px] font-bold">
                Dec: {counterVal} | Hex: 0x{counterVal.toString(16).toUpperCase()}
              </span>
            </div>

            {/* 4 Register Stage Nodes */}
            <div className="grid grid-cols-4 gap-3">
              {bits.map((bit, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                    bit === 1 
                      ? 'bg-white border-emerald-500 shadow-md scale-102' 
                      : 'bg-white/80 border-vids-border'
                  }`}
                >
                  <span className="text-[10px] font-mono text-vids-charcoal-500 uppercase block font-semibold">
                    Q{3 - idx}
                  </span>
                  <div className={`text-2xl font-mono font-extrabold mt-0.5 ${bit === 1 ? 'text-emerald-600' : 'text-vids-charcoal-400'}`}>
                    {bit}
                  </div>
                  <div className={`w-3 h-3 mx-auto mt-2 rounded-full transition-all ${
                    bit === 1 ? 'bg-emerald-500 shadow-led-green' : 'bg-slate-300'
                  }`} />
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-vids-border/70">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCounterVal(prev => counterDir === 'UP' ? (prev + 1) % 16 : (prev - 1 + 16) % 16)}
                  className="px-4 py-2 rounded-xl bg-vids-sage-600 hover:bg-vids-sage-700 text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all"
                >
                  Pulse Clock ⚡
                </button>
                <button
                  onClick={() => setCounterRunning(!counterRunning)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                    counterRunning 
                      ? 'bg-amber-100 text-amber-900 border-amber-300' 
                      : 'bg-white text-vids-charcoal-700 border-vids-border hover:bg-vids-sage-50'
                  }`}
                >
                  {counterRunning ? 'Pause Auto' : 'Run Auto'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCounterDir(counterDir === 'UP' ? 'DOWN' : 'UP')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-vids-border text-[11px] font-bold text-vids-charcoal-700 hover:bg-vids-sage-50"
                >
                  Dir: {counterDir}
                </button>
                <button
                  onClick={() => setCounterVal(0)}
                  className="p-2 rounded-lg bg-white border border-vids-border text-vids-charcoal-600 hover:bg-vids-sage-50 transition-colors"
                  title="Reset counter to 0000"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      id: 'kmap',
      tabLabel: 'Karnaugh Map',
      icon: Grid,
      badge: 'Interactive Lab 02',
      title: '4-Variable Karnaugh Map (K-Map) Solver',
      subtitle: 'Visual Gray-code coordinate mapping ($00, 01, 11, 10$) with optimal toroidal wraparound grouping.',
      chipRef: 'Minimization Engine',
      renderDemo: () => {
        const grid = [
          [0, 1, 3, 2],
          [4, 5, 7, 6],
          [12, 13, 15, 14],
          [8, 9, 11, 10]
        ];
        return (
          <div className="bg-gradient-to-br from-[#FAFBF8] to-[#F3F7F4] rounded-2xl p-6 border border-vids-border shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-vids-charcoal-700">
              <span>Gray Coordinates: AB \\ CD</span>
              <span className="font-mono text-vids-sage-800 bg-white border border-vids-sage-200 px-3 py-1 rounded-md text-xs font-bold">
                F = B'D' + BD
              </span>
            </div>

            {/* 4x4 K-Map Matrix */}
            <div className="grid grid-cols-4 gap-2 max-w-[260px] mx-auto py-1">
              {grid.flat().map((cellIdx) => {
                const isSelected = kmapMinterms.includes(cellIdx);
                return (
                  <button
                    key={cellIdx}
                    onClick={() => {
                      if (isSelected) {
                        setKmapMinterms(kmapMinterms.filter(x => x !== cellIdx));
                      } else {
                        setKmapMinterms([...kmapMinterms, cellIdx]);
                      }
                    }}
                    className={`h-11 rounded-xl border-2 font-mono font-bold text-xs flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-500 shadow-sm scale-102'
                        : 'bg-white text-vids-charcoal-400 border-vids-border hover:border-vids-sage-300'
                    }`}
                  >
                    <span className="text-[8px] text-vids-charcoal-400 -mb-0.5">m{cellIdx}</span>
                    <span className="text-sm font-extrabold">{isSelected ? '1' : '0'}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-center text-vids-charcoal-600 font-medium pt-2 border-t border-vids-border/70 flex items-center justify-between">
              <span>Click any cell to toggle 0 / 1</span>
              <button 
                onClick={() => setKmapMinterms([0, 2, 8, 10])}
                className="text-vids-sage-700 hover:underline font-bold"
              >
                Reset to 4-Corner Quad
              </button>
            </div>
          </div>
        );
      }
    },
    {
      id: 'display7',
      tabLabel: 'BCD 7-Segment',
      icon: Cpu,
      badge: 'Interactive Lab 03',
      title: 'BCD to 7-Segment LED Decoder',
      subtitle: 'Decode 4-bit Binary Coded Decimal inputs into seven physical LED display segments (a through g).',
      chipRef: 'IC 74LS47 / 7448',
      renderDemo: () => {
        return (
          <div className="bg-gradient-to-br from-vids-charcoal-900 to-vids-charcoal-800 text-white rounded-2xl p-6 border border-vids-charcoal-700 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Digit selector buttons */}
            <div className="space-y-3 flex-1 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-vids-charcoal-300 uppercase tracking-wider block">
                  Select Decimal Digit:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  BCD: {sevenSegmentDigit.toString(2).padStart(4, '0')}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSevenSegmentDigit(num)}
                    className={`py-2 rounded-xl font-mono font-extrabold text-xs border transition-all ${
                      sevenSegmentDigit === num
                        ? 'bg-vids-sage-600 text-white border-vids-sage-400 shadow-sm scale-105'
                        : 'bg-vids-charcoal-800/80 text-vids-charcoal-300 border-vids-charcoal-700 hover:bg-vids-charcoal-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-vids-charcoal-400 leading-relaxed pt-1">
                Common Cathode Driver: active HIGH outputs drive individual segment anodes.
              </p>
            </div>

            {/* 7-Segment Display SVG */}
            <div className="shrink-0 p-3 bg-black rounded-2xl border border-vids-charcoal-700 shadow-inner">
              <svg viewBox="0 0 120 180" className="w-24 h-auto select-none" fill="none">
                {/* a (top) */}
                <polygon points="25,15 95,15 85,25 35,25" fill={activeSegments.a ? '#EF4444' : '#2A2A2A'} filter={activeSegments.a ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
                {/* b (top-right) */}
                <polygon points="98,18 108,28 102,80 92,75" fill={activeSegments.b ? '#EF4444' : '#2A2A2A'} filter={activeSegments.b ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
                {/* c (bottom-right) */}
                <polygon points="92,85 102,80 96,142 86,152" fill={activeSegments.c ? '#EF4444' : '#2A2A2A'} filter={activeSegments.c ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
                {/* d (bottom) */}
                <polygon points="35,142 85,142 95,152 25,152" fill={activeSegments.d ? '#EF4444' : '#2A2A2A'} filter={activeSegments.d ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
                {/* e (bottom-left) */}
                <polygon points="18,85 28,90 22,148 12,142" fill={activeSegments.e ? '#EF4444' : '#2A2A2A'} filter={activeSegments.e ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
                {/* f (top-left) */}
                <polygon points="18,22 28,28 22,80 12,85" fill={activeSegments.f ? '#EF4444' : '#2A2A2A'} filter={activeSegments.f ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
                {/* g (middle) */}
                <polygon points="28,82 92,82 85,88 35,88" fill={activeSegments.g ? '#EF4444' : '#2A2A2A'} filter={activeSegments.g ? 'drop-shadow(0 0 6px #EF4444)' : 'none'} />
              </svg>
            </div>

          </div>
        );
      }
    },
    {
      id: 'registers',
      tabLabel: 'Shift Register',
      icon: HardDrive,
      badge: 'Interactive Lab 04',
      title: '4-Bit Bidirectional Shift Register',
      subtitle: 'Inject serial bits and observe data moving across flip-flop stages QA through QD upon clock pulses.',
      chipRef: 'IC 74194 Universal',
      renderDemo: () => {
        return (
          <div className="bg-gradient-to-br from-[#FAFBF8] to-[#F3F7F4] rounded-2xl p-6 border border-vids-border shadow-xs space-y-5">
            <div className="flex items-center justify-between text-xs font-bold text-vids-charcoal-700">
              <span>Shift Register Array (QA • QB • QC • QD)</span>
              <span className="font-mono text-vids-sage-800 bg-white border border-vids-border px-2.5 py-0.5 rounded text-[11px]">
                SISO / SIPO Mode
              </span>
            </div>

            {/* 4 Register Stages */}
            <div className="grid grid-cols-4 gap-3">
              {registerBits.map((bit, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                    bit === 1 ? 'bg-white border-emerald-500 shadow-md scale-102' : 'bg-white/80 border-vids-border'
                  }`}
                >
                  <span className="text-[10px] font-mono text-vids-charcoal-500 uppercase block font-semibold">
                    Q{String.fromCharCode(65 + idx)}
                  </span>
                  <div className={`text-2xl font-mono font-extrabold mt-0.5 ${bit === 1 ? 'text-emerald-600' : 'text-vids-charcoal-400'}`}>
                    {bit}
                  </div>
                  <div className={`w-3 h-3 mx-auto mt-2 rounded-full ${
                    bit === 1 ? 'bg-emerald-500 shadow-led-green' : 'bg-slate-300'
                  }`} />
                </div>
              ))}
            </div>

            {/* Shift Controls */}
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-vids-border/70">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-vids-charcoal-700">Serial In:</span>
                <button
                  onClick={() => setShiftSerialIn(shiftSerialIn === 1 ? 0 : 1)}
                  className={`px-3 py-1 rounded-lg font-mono font-bold text-xs border ${
                    shiftSerialIn === 1 ? 'bg-vids-sage-600 text-white border-vids-sage-700' : 'bg-white text-vids-charcoal-700 border-vids-border'
                  }`}
                >
                  {shiftSerialIn}
                </button>
                <button
                  onClick={handleShiftRight}
                  className="px-4 py-1.5 rounded-xl bg-vids-sage-600 hover:bg-vids-sage-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                >
                  Shift Right →
                </button>
              </div>

              <button
                onClick={() => setRegisterBits([0, 0, 0, 0])}
                className="p-1.5 rounded-lg bg-white border border-vids-border text-vids-charcoal-600 hover:bg-vids-sage-50 transition-colors"
                title="Clear"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      }
    }
  ];

  const current = slides[currentSlide];

  return (
    <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vids-sage-100 text-vids-sage-800 text-xs font-extrabold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-vids-sage-600" />
            <span>Interactive Virtual Lab Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-vids-charcoal-900 tracking-tight">
            Explore Working Circuit Demonstrations
          </h2>
          <p className="text-xs sm:text-sm text-vids-charcoal-500 mt-1 max-w-xl">
            Slide through four real-time interactive demonstrators designed for classroom teaching and personal mastery.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors ${
              isAutoPlay ? 'bg-vids-sage-100 text-vids-sage-800 border-vids-sage-300' : 'bg-white text-vids-charcoal-600 border-vids-border'
            }`}
            title={isAutoPlay ? 'Pause Auto-slide' : 'Resume Auto-slide'}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            className="p-2.5 rounded-xl bg-white border border-vids-border text-vids-charcoal-700 hover:bg-vids-sage-50 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            className="p-2.5 rounded-xl bg-white border border-vids-border text-vids-charcoal-700 hover:bg-vids-sage-50 transition-colors shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {slides.map((s, idx) => {
          const Icon = s.icon;
          const isCurrent = currentSlide === idx;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                isCurrent
                  ? 'bg-vids-sage-600 text-white shadow-sm'
                  : 'bg-white text-vids-charcoal-700 border border-vids-border hover:bg-vids-sage-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Slide Card */}
      <div className="bg-white rounded-3xl border border-vids-border shadow-clay p-6 sm:p-10 transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-md bg-vids-sage-100 text-vids-sage-800 text-[11px] font-extrabold uppercase tracking-wider">
                {current.badge}
              </span>
              <span className="text-[11px] font-mono font-bold text-vids-charcoal-500 bg-vids-ivory px-2 py-0.5 rounded border border-vids-border">
                {current.chipRef}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-vids-charcoal-900 leading-tight">
              {current.title}
            </h3>

            <p className="text-xs sm:text-sm text-vids-charcoal-600 leading-relaxed font-normal">
              {current.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-vids-sage-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hardware-Accurate JavaScript Simulation Engine</span>
            </div>
          </div>

          {/* Right Live Interactive Demo Column */}
          <div className="lg:col-span-7">
            {current.renderDemo()}
          </div>

        </div>

        {/* Slide Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-8 mt-6 border-t border-vids-border/70">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-vids-sage-600' : 'w-2.5 bg-vids-charcoal-300 hover:bg-vids-charcoal-400'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
