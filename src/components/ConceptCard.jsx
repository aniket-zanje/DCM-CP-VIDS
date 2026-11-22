import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ConceptCard = ({ id, title, subtitle, path, onClick }) => {
  // Render exact warm sepia / bronze icons corresponding to reference design
  const renderIcon = () => {
    switch (id) {
      case 'number-systems':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex flex-col items-center justify-center font-mono font-bold text-[11px] leading-[1.1] text-[#4A3A2A] shadow-xs">
            <span>1010</span>
            <span className="opacity-80">0101</span>
          </div>
        );
      case 'logic-gates':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center p-2.5 shadow-xs">
            <svg viewBox="0 0 36 26" className="w-full h-full" fill="none">
              <path d="M4 4 L14 4 A9 9 0 0 1 14 22 L4 22 Z" stroke="#4A3A2A" strokeWidth="2.2" fill="none" />
              <path d="M0 8 L4 8 M0 18 L4 18 M23 13 L34 13" stroke="#4A3A2A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'boolean-algebra':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center p-3 shadow-xs">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6 border-2 border-[#4A3A2A] rounded-xs p-0.5">
              <div className="border border-[#8C7662] bg-[#FAF6F0]"></div>
              <div className="border border-[#8C7662] bg-[#E8DED2]"></div>
              <div className="border border-[#8C7662] bg-[#E8DED2]"></div>
              <div className="border border-[#8C7662] bg-[#FAF6F0]"></div>
            </div>
          </div>
        );
      case 'combinational-circuits':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-serif font-bold text-2xl text-[#4A3A2A] shadow-xs">
            Σ
          </div>
        );
      case 'flip-flops':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center p-2 shadow-xs">
            <div className="w-7 h-7 rounded border-2 border-[#4A3A2A] bg-white flex flex-col justify-between p-0.5 text-[7.5px] font-mono font-bold leading-none text-[#4A3A2A]">
              <div className="flex justify-between"><span>D</span><span>Q</span></div>
              <div className="flex justify-between opacity-50"><span>CLK</span><span>Q'</span></div>
            </div>
          </div>
        );
      case 'counters-registers':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center gap-0.5 p-1 text-[#4A3A2A] shadow-xs font-mono text-[8.5px] font-bold">
            <div className="w-3.5 h-6 rounded-xs border border-[#4A3A2A] bg-white flex items-center justify-center">D</div>
            <div className="w-3.5 h-6 rounded-xs border border-[#4A3A2A] bg-white flex items-center justify-center">D</div>
            <div className="w-3.5 h-6 rounded-xs border border-[#4A3A2A] bg-white flex items-center justify-center">D</div>
          </div>
        );
      case 'code-converters':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-mono font-bold text-lg text-[#4A3A2A] shadow-xs">
            ⇄
          </div>
        );
      case 'boolean-laws':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-serif font-bold text-xl text-[#4A3A2A] shadow-xs">
            B
          </div>
        );
      case 'kmap':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center p-3 shadow-xs">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6 border-2 border-[#4A3A2A] rounded-xs p-0.5">
              <div className="border border-[#8C7662] bg-[#E8DED2]"></div>
              <div className="border border-[#8C7662] bg-[#FAF6F0]"></div>
              <div className="border border-[#8C7662] bg-[#FAF6F0]"></div>
              <div className="border border-[#8C7662] bg-[#E8DED2]"></div>
            </div>
          </div>
        );
      case 'adders':
      case 'bcd-adder':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-serif font-bold text-2xl text-[#4A3A2A] shadow-xs">
            Σ
          </div>
        );
      case 'subtractors':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-serif font-bold text-2xl text-[#4A3A2A] shadow-xs">
            −
          </div>
        );
      case 'sop-pos':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-serif font-bold text-lg text-[#4A3A2A] shadow-xs">
            ΣΠ
          </div>
        );
      case 'registers':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center gap-0.5 p-1 text-[#4A3A2A] shadow-xs font-mono text-[8.5px] font-bold">
            <div className="w-3.5 h-6 rounded-xs border border-[#4A3A2A] bg-white flex items-center justify-center">D</div>
            <div className="w-3.5 h-6 rounded-xs border border-[#4A3A2A] bg-white flex items-center justify-center">D</div>
            <div className="w-3.5 h-6 rounded-xs border border-[#4A3A2A] bg-white flex items-center justify-center">D</div>
          </div>
        );
      case 'counters':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-mono font-bold text-[11px] text-[#4A3A2A] shadow-xs">
            0→7
          </div>
        );
      case 'pld':
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-mono font-bold text-xs text-[#4A3A2A] shadow-xs">
            PLD
          </div>
        );
      default:
        return (
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center font-mono font-bold text-xs text-[#4A3A2A] shadow-xs">
            V
          </div>
        );
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-[1.25rem] border border-[#EBE5DC] p-5 hover:border-[#D8CEBF] hover:shadow-[0_12px_32px_rgba(30,40,32,0.07)] transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 hover:-translate-y-1 relative"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
          {renderIcon()}
        </div>
        <div>
          <h3 className="font-extrabold text-[15px] sm:text-base text-[#141E18] group-hover:text-[#2C5234] transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-xs text-[#6D7E73] font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {path ? (
        <Link to={path} onClick={e => e.stopPropagation()} className="w-8 h-8 rounded-full flex items-center justify-center text-[#96A59C] group-hover:text-[#2C5234] group-hover:bg-[#F3F8F4] group-hover:translate-x-1 transition-all shrink-0">
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#96A59C] group-hover:text-[#2C5234] group-hover:bg-[#F3F8F4] group-hover:translate-x-1 transition-all shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
