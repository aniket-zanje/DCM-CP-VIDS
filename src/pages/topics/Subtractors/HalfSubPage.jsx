import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#3b82f6'; // Blue
const SECONDARY = '#8b5cf6'; // Violet
const GREEN = '#10b981'; 
const INK = '#0f172a';
const LINE = '#e2e8f0';

/* ─────────────── Scroll Reveal ─────────────── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────── UI Components ─────────────── */
function SectionHeading({ kicker, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT, marginBottom: 8 }}>{kicker}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: INK }}>{title}</h2>
    </div>
  );
}

function Card({ kicker, title, children }) {
  return (
    <Reveal>
      <section style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 32, marginBottom: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <SectionHeading kicker={kicker} title={title} />
        {children}
      </section>
    </Reveal>
  );
}

const P = ({ children, last }) => (
  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: last ? 0 : '0 0 20px', maxWidth: 720 }}>{children}</p>
);

const Mono = ({ children }) => (
  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, background: '#eff6ff', color: ACCENT, padding: '2px 6px', borderRadius: 4 }}>{children}</code>
);

/* ─────────────── Logic Circuit Diagram ─────────────── */
function HalfCircuit() {
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  return (
    <svg viewBox="0 0 520 200" style={{ width: '100%', maxWidth: 680, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` }} role="img" aria-label="Half subtractor circuit">
      <defs>
        <g id="xor">
          <path d="M 0 0 Q 10 18 0 36 Q 24 36 36 18 Q 24 0 0 0 Z" fill="#eff6ff" stroke={INK} strokeWidth="1.5" />
          <path d="M -5 0 Q 5 18 -5 36" fill="none" stroke={INK} strokeWidth="1.5" />
          <text x="18" y="22" textAnchor="middle" fontSize="10" fill="#64748b">XOR</text>
        </g>
        <g id="and">
          <path d="M 0 0 L 15 0 A 18 18 0 0 1 15 36 L 0 36 Z" fill="#eff6ff" stroke={INK} strokeWidth="1.5" />
          <text x="14" y="22" textAnchor="middle" fontSize="10" fill="#64748b">AND</text>
        </g>
        <g id="not">
          <path d="M 0 -11 L 24 0 L 0 11 Z" fill="#eff6ff" stroke={INK} strokeWidth="1.5" />
          <circle cx="28" cy="0" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <text x="12" y="-15" textAnchor="middle" fontSize="10" fill="#64748b">NOT</text>
        </g>
        <circle id="dot" r="3.5" fill={INK} />
      </defs>

      <text x="16" y="56" fontSize="14" fontWeight="700" fill={SECONDARY}>A</text>
      <text x="16" y="105" fontSize="14" fontWeight="700" fill={SECONDARY}>B</text>

      {/* A to XOR, and down to NOT */}
      <line x1="50" y1="51" x2="200" y2="51" {...w} />
      <polyline points="90,51 90,121 110,121" {...w} />
      <line x1="142" y1="121" x2="200" y2="121" {...w} />
      
      {/* B to XOR bottom and AND bottom */}
      <polyline points="50,100 160,100" {...w} />
      <polyline points="200,69 160,69 160,139 200,139" {...w} />
      
      <use href="#dot" x="90" y="51" />
      <use href="#dot" x="160" y="100" />

      <use href="#not" x="110" y="121" />
      <use href="#xor" x="200" y="60" />
      <use href="#and" x="200" y="130" />

      <line x1="236" y1="60" x2="440" y2="60" {...w} />
      <line x1="236" y1="130" x2="440" y2="130" {...w} />
      
      <text x="452" y="65" fontSize="14" fontWeight="700" fill={GREEN}>Diff</text>
      <text x="452" y="135" fontSize="14" fontWeight="700" fill={GREEN}>Borrow</text>
    </svg>
  );
}

/* ─────────────── K-Map Component ─────────────── */
function KMap({ title, isDiff }) {
  const cell = 52, ox = 54, oy = 54;
  const map = isDiff ? [[0, 1], [1, 0]] : [[0, 0], [0, 1]];
  
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: 16, background: '#fff', textAlign: 'center' }}>
      <div style={{ fontWeight: 700, color: INK, marginBottom: 12 }}>{title}</div>
      <svg viewBox="0 0 180 170" style={{ width: '100%', maxWidth: 200, display: 'block', margin: '0 auto' }}>
        <text x={ox - 10} y={oy - 20} textAnchor="end" fontSize="11" fontWeight="700" fill={SECONDARY}>A \ B</text>
        <text x={ox + cell/2} y={oy - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">0</text>
        <text x={ox + cell*1.5} y={oy - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">1</text>
        
        <text x={ox - 10} y={oy + cell/2 + 4} textAnchor="end" fontSize="12" fontWeight="700" fill="#64748b">0</text>
        <text x={ox - 10} y={oy + cell*1.5 + 4} textAnchor="end" fontSize="12" fontWeight="700" fill="#64748b">1</text>

        {map.map((row, r) => row.map((val, c) => (
          <g key={`${r}${c}`}>
            <rect x={ox + c*cell} y={oy + r*cell} width={cell} height={cell} fill={val ? '#f0fdf4' : '#fff'} stroke={LINE} strokeWidth="1.5" />
            <text x={ox + c*cell + cell/2} y={oy + r*cell + cell/2 + 6} textAnchor="middle" fontSize="16" fontWeight={val ? 800 : 500} fill={val ? GREEN : '#cbd5e1'}>{val}</text>
          </g>
        )))}
        
        {isDiff ? (
          <>
            <rect x={ox + cell + 4} y={oy + 4} width={cell - 8} height={cell - 8} fill="none" stroke={ACCENT} strokeWidth="2.5" rx="6" />
            <rect x={ox + 4} y={oy + cell + 4} width={cell - 8} height={cell - 8} fill="none" stroke={ACCENT} strokeWidth="2.5" rx="6" />
          </>
        ) : (
          <rect x={ox + cell + 4} y={oy + cell + 4} width={cell - 8} height={cell - 8} fill="none" stroke={GREEN} strokeWidth="2.5" rx="6" />
        )}
      </svg>
      <div style={{ marginTop: 12, fontWeight: 700, fontFamily: "monospace", color: INK }}>
        {isDiff ? <>Diff = A'B + AB' = A ⊕ B</> : <>Borrow = A'B</>}
      </div>
    </div>
  );
}

/* ─────────────── Truth Table ─────────────── */
function TruthTable() {
  const rows = [[0,0,0,0], [0,1,1,1], [1,0,1,0], [1,1,0,0]];
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ borderCollapse: 'collapse', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, textAlign: 'center' }}>
        <thead>
          <tr style={{ background: INK, color: '#fff' }}>
            <th colSpan={2} style={{ padding: 10, borderRight: '1px solid #1e293b' }}>Inputs</th>
            <th colSpan={2} style={{ padding: 10, color: GREEN }}>Outputs</th>
          </tr>
          <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
            <th style={{ padding: 8 }}>A</th>
            <th style={{ padding: 8, borderRight: '1px solid #1e293b' }}>B</th>
            <th style={{ padding: 8 }}>Diff</th>
            <th style={{ padding: 8 }}>Borrow</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${LINE}`, background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
              <td style={{ padding: '8px 24px', color: '#475569' }}>{row[0]}</td>
              <td style={{ padding: '8px 24px', color: '#475569', borderRight: `1px solid ${LINE}` }}>{row[1]}</td>
              <td style={{ padding: '8px 24px', color: GREEN, fontWeight: 700 }}>{row[2]}</td>
              <td style={{ padding: '8px 24px', color: GREEN, fontWeight: 700 }}>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function HalfSubtractorPage() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLabel = { fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 };
  const crumb = { color: '#94a3b8', textDecoration: 'none' };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#f8fafc', color: INK, minHeight: '100vh' }}>
      
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 50 }}>
        <div style={{ height: '100%', width: `${scrollPct}%`, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, transition: 'width 0.1s linear' }} />
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px 100px' }}>
        
        <div style={{ fontSize: 13, marginBottom: 40, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/topics" style={crumb}>Topics</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <Link to="/topics/subtractors" style={crumb}>Subtractors</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <span style={{ color: INK, fontWeight: 600 }}>Half Subtractor</span>
        </div>

        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, background: '#eff6ff', padding: '4px 10px', borderRadius: 999, marginBottom: 16 }}>Subtractors</span>
            <h1 style={{ fontSize: 'clamp(36px, 7vw, 56px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 16px' }}>Half Subtractor</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#475569', margin: 0, maxWidth: 700 }}>
              A combinational circuit that subtracts one single bit from another to produce a Difference and a Borrow.
            </p>
          </header>
        </Reveal>

        <Card kicker="The idea" title="How subtraction works at the bit level">
          <P>
            The half subtractor is the simplest arithmetic circuit for subtraction. It accepts two bits, A (minuend) and B (subtrahend), and computes their difference. If A is smaller than B (i.e., 0 − 1), it must borrow 1 from the next higher bit, which sets the Borrow output high.
          </P>
          <P>
            The Difference output is HIGH only when the inputs are different (one 0, one 1). This is the exact behaviour of an XOR gate. The Borrow output is HIGH only when A=0 and B=1. This is the behaviour of a NOT gate on A, followed by an AND gate with B (<Mono>A' · B</Mono>).
          </P>
        </Card>

        <Card kicker="Truth table & K-Maps" title="Deriving the boolean expressions">
          <P>
            Plotting the truth table into K-maps gives the simplest Boolean expressions. The Difference map produces a checkerboard pattern (an XOR), while the Borrow map produces a single group (an AND with an inverted input).
          </P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', marginBottom: 24 }}>
            <TruthTable />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, width: '100%' }}>
              <KMap title="K-Map for Difference" isDiff={true} />
              <KMap title="K-Map for Borrow" isDiff={false} />
            </div>
          </div>
        </Card>

        <Card kicker="Implementation" title="Logic circuit">
          <P>
            The expressions translate directly into hardware: one XOR gate for the Difference, and one NOT gate feeding an AND gate for the Borrow. Both gates share the same A and B inputs.
          </P>
          <div style={{ marginBottom: 24 }}>
            <HalfCircuit />
          </div>
        </Card>

        <Card kicker="In practice" title="Limitations & Usage">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div style={{ padding: 20, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#dc2626' }}>No Borrow-In</h4>
              <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>The half subtractor cannot accept a borrow from a lower bit. This means it cannot be chained directly to subtract multi-bit numbers.</p>
            </div>
            <div style={{ padding: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#16a34a' }}>Foundation for Full Subtractor</h4>
              <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>It is used for the Least Significant Bit (LSB) in a multi-bit subtractor, and two half subtractors can be combined to build a Full Subtractor.</p>
            </div>
          </div>
        </Card>

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 60, borderTop: `2px solid ${LINE}`, paddingTop: 32 }}>
            <div>
              <div style={navLabel}>Previous Concept</div>
              <Link to="/topics/subtractors" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: INK }}>
                <span style={{ fontSize: 24, color: '#cbd5e1' }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Subtractors Overview</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Back to basics</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={navLabel}>Next Concept</div>
              <Link to="/topics/subtractors/full-sub" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: INK, justifyContent: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Full Subtractor</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Subtracting three bits</div>
                </div>
                <span style={{ fontSize: 24, color: ACCENT }}>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}