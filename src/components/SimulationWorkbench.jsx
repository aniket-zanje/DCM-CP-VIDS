import React, { useState, useRef } from 'react';
import { 
  Cpu, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  Sliders, 
  Layers, 
  Zap,
  Info,
  CheckCircle2
} from 'lucide-react';

export const SimulationWorkbench = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleReset = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <section id="simulation-workbench" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      
      {/* Studio Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DED2] shadow-xs text-xs font-bold text-[#4A3A2A]">
          <Cpu className="w-3.5 h-3.5 text-[#386641]" />
          <span>VIDS Digital Systems Simulation Studio</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141E18] tracking-tight">
          Interactive Digital Circuit CAD Workbench
        </h2>

        <p className="text-xs sm:text-sm text-[#4B5B51] leading-relaxed">
          Design, wire, test, and analyze standard combinational and sequential digital circuits.
          Add gates, flip-flops, multiplexers, and clock generators on a live interactive breadboard.
        </p>
      </div>

      {/* Main Studio Frame Container */}
      <div 
        ref={containerRef}
        className={`bg-white rounded-3xl border border-[#E2EBE5] shadow-[0_16px_40px_-8px_rgba(20,30,24,0.08)] overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 rounded-none border-none h-screen w-screen' 
            : 'relative'
        }`}
      >
        {/* VIDS Studio Custom Top Bar (Gives it a 100% proprietary native feel) */}
        <div className="bg-[#FAF9F5] border-b border-[#E2EBE5] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
          
          {/* Left: Workbench Info & Status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E4F0E7] text-[#2C5234] flex items-center justify-center font-bold text-xs shadow-xs">
              <Zap className="w-4 h-4 text-[#386641]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm text-[#141E18]">
                  VIDS Digital Simulator v2.4
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Engine Active
                </span>
              </div>
              <p className="text-[10px] text-[#6D7E73] font-medium hidden sm:block">
                Combinational & Sequential Logic Circuit Design Sandbox
              </p>
            </div>
          </div>

          {/* Right: Studio Controls */}
          <div className="flex items-center gap-2">
            
            {/* Quick Tips Toggle */}
            <button
              onClick={() => setShowTips(!showTips)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                showTips
                  ? 'bg-[#E4F0E7] text-[#2C5234] border-[#C9E2CE]'
                  : 'bg-white text-[#4B5B51] border-[#E2EBE5] hover:bg-[#FAF9F5]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lab Tips</span>
            </button>

            {/* Reset Canvas Button */}
            <button
              onClick={handleReset}
              title="Reload Simulator Canvas"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#4B5B51] hover:text-[#141E18] text-xs font-bold border border-[#E2EBE5] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workbench"}
              className="px-3.5 py-1.5 rounded-xl bg-[#386641] hover:bg-[#2C5234] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Collapsible Lab Tips Banner */}
        {showTips && (
          <div className="bg-[#FAF6F0] border-b border-[#E8DED2] p-4 text-xs text-[#4A3A2A] animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#386641] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#141E18] font-bold">1. Add Gates & Inputs</strong>
                  <span className="text-[11px] text-[#6D7E73]">
                    Use the left drawer to drag AND, OR, XOR gates, inputs, and clock generators onto the canvas.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#386641] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#141E18] font-bold">2. Wire Connections</strong>
                  <span className="text-[11px] text-[#6D7E73]">
                    Click and drag between any component terminal pins to lay dynamic conductive wires.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#386641] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#141E18] font-bold">3. Test & Save</strong>
                  <span className="text-[11px] text-[#6D7E73]">
                    Click inputs to toggle between logic 0 and 1, test clock pulses, and export circuit diagrams.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Embedded Simulator Canvas Iframe */}
        <div className={`w-full bg-[#FFFFFF] relative ${isFullscreen ? 'h-[calc(100vh-53px)]' : 'h-[720px] sm:h-[780px]'}`}>
          <iframe
            key={iframeKey}
            src="/circuitverse-simulator"
            title="VIDS Interactive Digital Circuit Simulator"
            className="w-full h-full border-none"
            allow="fullscreen; clipboard-read; clipboard-write"
          />
        </div>

      </div>

      {/* Quick Lab Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 rounded-2xl bg-white border border-[#E8EDE8] shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] text-[#4A3A2A] border border-[#E8DED2] flex items-center justify-center font-bold text-xs shrink-0">
            1010
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#141E18]">Combinational Adders & MUX</h4>
            <p className="text-[11px] text-[#6D7E73] mt-0.5">
              Construct Half Adders, Full Adders, 4-bit Parallel Adders, and Multiplexers with instant output.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8EDE8] shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] text-[#4A3A2A] border border-[#E8DED2] flex items-center justify-center font-bold text-xs shrink-0">
            D Q
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#141E18]">Sequential Bistables & Latches</h4>
            <p className="text-[11px] text-[#6D7E73] mt-0.5">
              Wire SR, JK, D, and T flip-flops with clock inputs to observe state storage and propagation delays.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8EDE8] shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] text-[#4A3A2A] border border-[#E8DED2] flex items-center justify-center font-bold text-xs shrink-0">
            74LS
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#141E18]">Standard TTL 7400 Compatibility</h4>
            <p className="text-[11px] text-[#6D7E73] mt-0.5">
              Matches lab IC pinouts (7408, 7432, 7404, 7486, 7474) used in university laboratory experiments.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
