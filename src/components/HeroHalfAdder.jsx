import React, { useState } from 'react';

export const HeroHalfAdder = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);

  // Exact Boolean logic computation
  const sum = a ^ b;
  const carry = a & b;

  return (
    <div className="relative w-full max-w-[530px] mx-auto select-none">
      
      {/* 3D Elevated Base Platform (Matches the mint/teal beveled pedestal in the reference image) */}
      <div className="relative p-1.5 pb-3.5 rounded-[2.5rem] bg-gradient-to-b from-[#6EE7B7] via-[#34D399] to-[#059669] shadow-[0_20px_40px_-10px_rgba(5,150,105,0.3),0_8px_16px_rgba(20,30,24,0.06)]">
        
        {/* Top White Circuit Deck */}
        <div className="relative bg-white rounded-[2.25rem] p-6 sm:p-7 border border-[#E2EBE5] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Subtle blueprint dot-grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#141E18 1.5px, transparent 1.5px)',
              backgroundSize: '18px 18px'
            }}
          />

          {/* Interactive Circuit Schematic */}
          <div className="relative w-full">
            <svg viewBox="0 0 460 210" className="w-full h-auto" fill="none">
              
              {/* Definitions for LED Glow & Gradients */}
              <defs>
                <filter id="led-green-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="led-amber-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="led-green-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="60%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#15803D" />
                </linearGradient>

                <linearGradient id="led-amber-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="60%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>

                <linearGradient id="led-off-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
              </defs>

              {/* WIRE CONNECTIONS */}
              {/* Wire A: Main top horizontal trunk to XOR */}
              <path
                d="M 60 55 L 180 55"
                stroke={a === 1 ? '#16A34A' : '#CBD5E1'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className={a === 1 ? 'wire-active' : ''}
              />

              {/* Wire A branch: Down to AND gate input 1 */}
              <path
                d="M 105 55 L 105 145 L 180 145"
                stroke={a === 1 ? '#16A34A' : '#CBD5E1'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className={a === 1 ? 'wire-active' : ''}
              />
              {/* Branch Node A */}
              <circle cx="105" cy="55" r="4.5" fill={a === 1 ? '#166534' : '#94A3B8'} />

              {/* Wire B: Main trunk to XOR */}
              <path
                d="M 60 100 L 135 100 L 135 75 L 180 75"
                stroke={b === 1 ? '#16A34A' : '#CBD5E1'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className={b === 1 ? 'wire-active' : ''}
              />

              {/* Wire B branch: Down to AND gate input 2 */}
              <path
                d="M 135 100 L 135 165 L 180 165"
                stroke={b === 1 ? '#16A34A' : '#CBD5E1'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className={b === 1 ? 'wire-active' : ''}
              />
              {/* Branch Node B */}
              <circle cx="135" cy="100" r="4.5" fill={b === 1 ? '#166534' : '#94A3B8'} />

              {/* Output Wire 1: XOR -> Sum (S) */}
              <path
                d="M 268 65 L 365 65"
                stroke={sum === 1 ? '#16A34A' : '#CBD5E1'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className={sum === 1 ? 'wire-active' : ''}
              />

              {/* Output Wire 2: AND -> Carry (C) */}
              <path
                d="M 265 155 L 365 155"
                stroke={carry === 1 ? '#D97706' : '#CBD5E1'}
                strokeWidth="3.5"
                strokeLinecap="round"
                className={carry === 1 ? 'wire-amber' : ''}
              />

              {/* XOR Gate Symbol (Styled to match reference design) */}
              <g transform="translate(180, 38)">
                {/* XOR curved back bracket */}
                <path
                  d="M 0 8 Q 14 27 0 46"
                  stroke="#141E18"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* XOR Body */}
                <path
                  d="M 8 8 Q 22 27 8 46 Q 52 46 80 27 Q 52 8 8 8 Z"
                  fill="#FFFFFF"
                  stroke="#141E18"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <text 
                  x="44" 
                  y="32" 
                  textAnchor="middle" 
                  fontSize="13" 
                  fontWeight="800" 
                  fill="#141E18" 
                  fontFamily="system-ui, sans-serif"
                >
                  XOR
                </text>
              </g>

              {/* AND Gate Symbol (Styled to match reference design) */}
              <g transform="translate(180, 127)">
                <path
                  d="M 10 8 L 46 8 A 28 28 0 0 1 46 56 L 10 56 Z"
                  fill="#FFFFFF"
                  stroke="#141E18"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <text 
                  x="45" 
                  y="37" 
                  textAnchor="middle" 
                  fontSize="13" 
                  fontWeight="800" 
                  fill="#141E18" 
                  fontFamily="system-ui, sans-serif"
                >
                  AND
                </text>
              </g>

              {/* OUTPUT LABELS */}
              {/* Sum (S) Text */}
              <text 
                x="355" 
                y="55" 
                textAnchor="end" 
                fontSize="12.5" 
                fontWeight="700" 
                fill="#141E18"
                fontFamily="system-ui, sans-serif"
              >
                Sum (S)
              </text>

              {/* Carry (C) Text */}
              <text 
                x="355" 
                y="145" 
                textAnchor="end" 
                fontSize="12.5" 
                fontWeight="700" 
                fill="#141E18"
                fontFamily="system-ui, sans-serif"
              >
                Carry (C)
              </text>

              {/* 3D LED COMPONENT: SUM (Green) */}
              <g transform="translate(372, 42)">
                {/* Metallic Pin Legs */}
                <rect x="5" y="27" width="2.5" height="10" fill="#94A3B8" />
                <rect x="11.5" y="27" width="2.5" height="10" fill="#94A3B8" />
                
                {/* LED Rim Base Collar */}
                <rect x="2" y="23" width="15" height="5" rx="1.5" fill="#64748B" />
                
                {/* Glowing Aura Behind (Only when ON) */}
                {sum === 1 && (
                  <circle cx="9.5" cy="13" r="14" fill="#22C55E" opacity="0.35" filter="url(#led-green-glow)" />
                )}

                {/* 3D Glass Dome Bulb */}
                <path
                  d="M 3 23 C 3 10 16 10 16 23 Z"
                  fill={sum === 1 ? 'url(#led-green-grad)' : 'url(#led-off-grad)'}
                  stroke={sum === 1 ? '#15803D' : '#94A3B8'}
                  strokeWidth="1.5"
                />

                {/* Glass Highlight Reflection */}
                <path
                  d="M 6 17 C 6 12 11 12 11 14"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity={sum === 1 ? 0.85 : 0.4}
                />
              </g>

              {/* 3D LED COMPONENT: CARRY (Amber/Yellow) */}
              <g transform="translate(372, 132)">
                {/* Metallic Pin Legs */}
                <rect x="5" y="27" width="2.5" height="10" fill="#94A3B8" />
                <rect x="11.5" y="27" width="2.5" height="10" fill="#94A3B8" />
                
                {/* LED Rim Base Collar */}
                <rect x="2" y="23" width="15" height="5" rx="1.5" fill="#64748B" />
                
                {/* Glowing Aura Behind (Only when ON) */}
                {carry === 1 && (
                  <circle cx="9.5" cy="13" r="14" fill="#F59E0B" opacity="0.35" filter="url(#led-amber-glow)" />
                )}

                {/* 3D Glass Dome Bulb */}
                <path
                  d="M 3 23 C 3 10 16 10 16 23 Z"
                  fill={carry === 1 ? 'url(#led-amber-grad)' : 'url(#led-off-grad)'}
                  stroke={carry === 1 ? '#B45309' : '#94A3B8'}
                  strokeWidth="1.5"
                />

                {/* Glass Highlight Reflection */}
                <path
                  d="M 6 17 C 6 12 11 12 11 14"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity={carry === 1 ? 0.85 : 0.4}
                />
              </g>

            </svg>

            {/* Clickable Tactile Input Switches: A & B (Overlayed exactly at wire origin) */}
            <div className="absolute top-[38px] left-[18px]">
              <button
                type="button"
                onClick={() => setA(a === 1 ? 0 : 1)}
                title="Toggle Input A (0 or 1)"
                className={`w-11 h-8 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                  a === 1
                    ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                    : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] hover:bg-[#E2E8F0]'
                }`}
              >
                A
              </button>
            </div>

            <div className="absolute top-[84px] left-[18px]">
              <button
                type="button"
                onClick={() => setB(b === 1 ? 0 : 1)}
                title="Toggle Input B (0 or 1)"
                className={`w-11 h-8 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                  b === 1
                    ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                    : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] hover:bg-[#E2E8F0]'
                }`}
              >
                B
              </button>
            </div>

          </div>

          {/* Bottom Live Boolean Formula Banner */}
          <div className="mt-2 pt-3 border-t border-[#E8EDE8] flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold text-[#4B5B51]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[#141E18]">Sum = A ⊕ B =</span>
              <span className={sum === 1 ? 'text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded' : 'text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded'}>
                {sum}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${carry === 1 ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`}></span>
              <span className="text-[#141E18]">Carry = A · B =</span>
              <span className={carry === 1 ? 'text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded' : 'text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded'}>
                {carry}
              </span>
            </div>
            
            <span className="text-[10px] text-[#96A59C] font-sans font-medium">
              Click A or B to switch logic
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
