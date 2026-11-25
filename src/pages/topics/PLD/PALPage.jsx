import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#8b5cf6'; // Violet
const SECONDARY = '#3b82f6'; // Blue
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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─────────────── UI Components ─────────────── */
function Card({ kicker, title, children }) {
  return (
    <Reveal>
      <section style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 32, marginBottom: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT, marginBottom: 8 }}>{kicker}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: INK }}>{title}</h2>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

const P = ({ children, last }) => (
  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: last ? 0 : '0 0 20px', maxWidth: 720 }}>{children}</p>
);

const Mono = ({ children }) => (
  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, background: '#f5f3ff', color: ACCENT, padding: '2px 6px', borderRadius: 4 }}>{children}</code>
);

/* ─────────────── Main Page ─────────────── */
export default function PALPage() {
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
          <Link to="/topics/pld" style={crumb}>PLD</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <span style={{ color: INK, fontWeight: 600 }}>PAL</span>
        </div>

        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, background: '#f5f3ff', padding: '4px 10px', borderRadius: 999, marginBottom: 16 }}>Programmable Logic</span>
            <h1 style={{ fontSize: 'clamp(36px, 7vw, 56px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 16px' }}>PAL</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#475569', margin: 0, maxWidth: 700 }}>
              Programmable Array Logic. Only the AND plane is programmable; the OR plane is fixed.
            </p>
          </header>
        </Reveal>

        <Card kicker="The Concept" title="What is a PAL?">
          <P>
            Programmable Array Logic (PAL) is a programmable logic device with a <strong>programmable AND array</strong> followed by a <strong>fixed OR array</strong> [citation:2].
          </P>
          <P>
            Because only the AND array is programmable, PALs are easier to use and faster than PLAs. The trade-off is less flexibility: the fixed OR connections limit how product terms can be shared between outputs. PALs are commonly used to implement sum-of-products (SOP) logic functions efficiently with fewer components [citation:6].
          </P>
        </Card>

        <Card kicker="Visual Reference" title="PAL Architecture">
          <P>
            The diagram below shows the internal structure of a PAL. The AND array is programmable, but the OR gate connections are hard-wired.
          </P>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <img 
              src="https://www.fpgakey.com/uploads/images/editor/20200706/191336PAL%20Architecture.png" 
              alt="PAL Architecture" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, border: `1px solid ${LINE}` }} 
            />
          </div>
        </Card>

        <Card kicker="Key Points" title="Advantages & Disadvantages">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div style={{ padding: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#16a34a' }}>Advantages</h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                <li>Faster than PLA (no programmable OR delay) [citation:4].</li>
                <li>Lower production cost [citation:2].</li>
                <li>High security (harder to reverse-engineer once programmed) [citation:2].</li>
                <li>Highly reliable and low power [citation:2].</li>
              </ul>
            </div>
            <div style={{ padding: 20, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#dc2626' }}>Disadvantages</h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                <li>Limited flexibility (fixed OR array) [citation:2].</li>
                <li>Size constraints on logic complexity [citation:2].</li>
                <li>Propagation delay from fixed OR structure [citation:2].</li>
              </ul>
            </div>
          </div>
        </Card>

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 60, borderTop: `2px solid ${LINE}`, paddingTop: 32 }}>
            <div>
              <div style={navLabel}>Previous Concept</div>
              <Link to="/topics/pld/pla" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: INK }}>
                <span style={{ fontSize: 24, color: '#cbd5e1' }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>PLA</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Both arrays programmable</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={navLabel}>Next Concept</div>
              <Link to="/topics/pld" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: INK, justifyContent: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>PLD Overview</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Back to topics</div>
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