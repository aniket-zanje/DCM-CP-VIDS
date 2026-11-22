// Shared stub template generator for all topic pages
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Construction, ChevronRight } from 'lucide-react';

export default function StubTopicPage({ title, breadcrumb, parentPath, parentTitle, description, subtopics = [] }) {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2EBE5] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 text-xs font-bold text-[#6D7E73]">
          <Link to="/" className="hover:text-[#141E18] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C2CEC6]" />
          <Link to="/topics" className="hover:text-[#141E18] transition-colors">Topics</Link>
          {parentTitle && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#C2CEC6]" />
              <Link to={parentPath} className="hover:text-[#141E18] transition-colors">{parentTitle}</Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[#C2CEC6]" />
          <span className="text-[#141E18]">{title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-8">

        {/* Back button */}
        <Link to={parentPath || '/topics'} className="inline-flex items-center gap-2 text-xs font-bold text-[#6D7E73] hover:text-[#141E18] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {parentTitle ? `Back to ${parentTitle}` : 'All Topics'}
        </Link>

        {/* Title block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E4F0E7] border border-[#C9E2CE] text-xs font-bold text-[#2C5234]">
            <Cpu className="w-3.5 h-3.5" />
            Digital Electronics — VIDS Learning Module
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141E18] tracking-tight leading-tight">{title}</h1>
          {description && (
            <p className="text-sm sm:text-base text-[#4B5B51] leading-relaxed max-w-2xl">{description}</p>
          )}
        </div>

        {/* Coming Soon card */}
        <div className="bg-white rounded-2xl border border-[#E2EBE5] p-10 text-center shadow-xs space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FAF6F0] border border-[#E8DED2]">
            <Construction className="w-7 h-7 text-[#4A3A2A]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#141E18]">Content Coming Soon</h2>
            <p className="text-xs text-[#6D7E73] max-w-sm mx-auto leading-relaxed">
              This learning module is under development. It will include theory, circuit diagrams, truth tables, Boolean expressions, and interactive simulations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {['Theory', 'Circuit Diagram', 'Truth Table', 'Boolean Expression', 'Interactive Simulation'].map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-[#F3F8F4] border border-[#C9E2CE] text-[11px] font-bold text-[#386641]">{tag}</span>
            ))}
          </div>
        </div>

        {/* Subtopics (if any) */}
        {subtopics.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#141E18]">Subtopics in this Module</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subtopics.map(sub => (
                <Link
                  key={sub.id}
                  to={sub.path}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E2EBE5] hover:border-[#C9E2CE] hover:shadow-xs transition-all group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#95C798] shrink-0"></span>
                  <span className="text-xs font-semibold text-[#2F3E34] group-hover:text-[#386641] transition-colors flex-1">{sub.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C2CEC6] group-hover:text-[#386641] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
