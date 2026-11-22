import React from 'react';
import { Cpu, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-vids-border mt-20 pt-16 pb-12 text-vids-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-vids-border">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-vids-sage-50 border border-vids-sage-600 flex items-center justify-center p-1.5">
                <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="6" fill="#F4F7F4" stroke="#3F6748" strokeWidth="2.5"/>
                  <path d="M16 18L24 30L32 18" stroke="#1F3325" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="30" r="2.2" fill="#4D7C58"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-vids-charcoal-900">
                VIDS
              </span>
            </div>
            
            <p className="text-sm font-semibold text-vids-sage-700">
              Understand the Logic. Visualize the System.
            </p>
            <p className="text-xs text-vids-charcoal-500 leading-relaxed max-w-sm">
              An interactive visual learning platform built for engineering students to master Digital Electronics, switching theory, combinational & sequential systems, and digital circuit simulation.
            </p>
            
            <div className="pt-2 flex items-center gap-2 text-xs font-medium text-vids-charcoal-500">
              <span className="px-2.5 py-1 rounded-md bg-vids-sage-100 text-vids-sage-800 text-[11px] font-bold">
                B.Tech Curriculum
              </span>
              <span>Digital Techniques & Microprocessors</span>
            </div>
          </div>

          {/* Topics Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-vids-charcoal-900 mb-4">
              Foundations
            </h4>
            <ul className="space-y-2.5 text-xs text-vids-charcoal-600">
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Number Systems & Codes
                </a>
              </li>
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Logic Gates & TTL ICs
                </a>
              </li>
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Boolean Algebra & K-Maps
                </a>
              </li>
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Combinational Logic
                </a>
              </li>
            </ul>
          </div>

          {/* Topics Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-vids-charcoal-900 mb-4">
              Sequential & PLD
            </h4>
            <ul className="space-y-2.5 text-xs text-vids-charcoal-600">
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Sequential & Flip-Flops
                </a>
              </li>
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Asynchronous & Synchronous Counters
                </a>
              </li>
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  Shift Registers & 74194
                </a>
              </li>
              <li>
                <a href="#core-concepts" className="hover:text-vids-sage-700 transition-colors">
                  PLDs, PAL, PLA & FPGAs
                </a>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-vids-charcoal-900 mb-4">
              Tools & Labs
            </h4>
            <ul className="space-y-2.5 text-xs text-vids-charcoal-600">
              <li>
                <a href="#tools" className="hover:text-vids-sage-700 transition-colors">
                  Radix Number Converter
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-vids-sage-700 transition-colors">
                  Karnaugh Map Minimizer
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-vids-sage-700 transition-colors">
                  Truth Table Generator
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-vids-sage-700 transition-colors">
                  Virtual Circuit Laboratory
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-vids-charcoal-500 gap-4">
          <p>© {new Date().getFullYear()} VIDS (Visual Interactive Digital Systems). Designed for classroom instruction & student mastery.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-vids-sage-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Simulations Live (Offline Ready)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
