import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#3b82f6';
const SECONDARY = '#8b5cf6';

/* ─────────────── Scroll Reveal Hook ─────────────── */
function useReveal() {
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
  return { ref, visible };
}

function Reveal({ children, delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────── UI Components ─────────────── */
function Code({ children, color = "#0f172a" }) {
  return <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4, color }}>{children}</code>;
}

function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>{kicker}</div>
      <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px", color: "#0f172a" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 15, color: "#64748b", margin: 0, maxWidth: 700, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

function Card({ children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "32px", marginBottom: 24, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>{children}</div>
    </Reveal>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function Excess3Page() {
  const [scrollPct, setScrollPct] = useState(0);
  
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setScrollPct((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", color: "#0f172a", minHeight: "100vh" }}>
      
      {/* Top Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 50 }}>
        <div style={{ height: "100%", width: `${scrollPct}%`, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, transition: "width 0.1s linear" }} />
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 24px 100px" }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 40, display: "flex", gap: 10, alignItems: "center" }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span>/</span>
          <Link to="/topics/number-systems" style={{ color: "#94a3b8", textDecoration: "none" }}>Number Systems</Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Excess-3 (XS-3) Code</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>Excess-3 (XS-3) Code</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              A self-complementing BCD code formed by adding 3 to each BCD digit. Also known as the Biased Code or XS-3.
            </p>
          </header>
        </Reveal>

        {/* 1. Core Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="What is Excess-3 Code?" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Core Idea</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Excess-3 is a <strong>biased</strong> decimal code. To encode any decimal digit (0–9), you take its standard 4-bit BCD value and simply <strong>add 3</strong> (binary <Code>0011</Code>) to it.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Example</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  For decimal <Code>5</Code>: BCD is <Code>0101</Code>. Add <Code>0011</Code> → <Code>1000</Code>. So, 5 in Excess-3 is <Code>1000</Code>.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Valid Range</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  The valid XS-3 codes range from <Code>0011</Code> (0) to <Code>1100</Code> (9). The codes <Code>0000</Code>, <Code>0001</Code>, <Code>0010</Code>, <Code>1101</Code>, <Code>1110</Code>, and <Code>1111</Code> are invalid.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Self-Complementing Property */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — The Magic Property" title="Why is it Self-Complementing?" subtitle="This is the single biggest reason Excess-3 is used in hardware." />
          </Reveal>
          <Card>
            <div style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginBottom: 20 }}>
              Because Excess-3 is biased by 3, it possesses a unique property: <strong>The 1's complement (bitwise NOT) of an XS-3 code is equal to the 9's complement of the original decimal digit.</strong>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>Decimal 4 in XS-3</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#0f172a" }}>0100 + 0011 = <strong style={{ color: ACCENT }}>0111</strong></div>
              </div>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Bitwise NOT (Invert)</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#0f172a" }}>NOT(0111) = <strong style={{ color: "#ef4444" }}>1000</strong></div>
              </div>
            </div>

            <div style={{ marginTop: 16, background: "#eff6ff", padding: "16px", borderRadius: 6, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, color: "#1e40af", fontWeight: 600 }}>
                And <Code>1000</Code> is exactly the Excess-3 code for decimal 5. Since 4 + 5 = 9, we just proved that inverting the XS-3 code gives the 9's complement!
              </div>
            </div>
          </Card>
        </section>

        {/* 3. Advantages & Disadvantages */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="03 — Evaluation" title="Advantages & Disadvantages" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card delay={100}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#16a34a", marginBottom: 12 }}>Advantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Self-complementing:</strong> Subtraction becomes addition of the bitwise NOT.</li>
                <li>No separate adder is needed for subtraction, saving hardware.</li>
                <li>Allows for simple, fast 9's complement arithmetic.</li>
              </ul>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>Disadvantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Not a weighted code:</strong> You cannot assign positional weights (like 8, 4, 2, 1) to the bits.</li>
                <li>Requires an extra adder (to add the bias of 3) during basic encoding.</li>
                <li>Not natively supported by standard CPUs.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 4. Reference Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Reference" title="Decimal to Excess-3 Table" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { d: "0", bcd: "0000", xs3: "0011" }, { d: "1", bcd: "0001", xs3: "0100" }, { d: "2", bcd: "0010", xs3: "0101" }, { d: "3", bcd: "0011", xs3: "0110" },
                { d: "4", bcd: "0100", xs3: "0111" }, { d: "5", bcd: "0101", xs3: "1000" }, { d: "6", bcd: "0110", xs3: "1001" }, { d: "7", bcd: "0111", xs3: "1010" },
                { d: "8", bcd: "1000", xs3: "1011" }, { d: "9", bcd: "1001", xs3: "1100" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{item.d}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>BCD: {item.bcd}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: ACCENT, marginTop: 2 }}>XS-3: {item.xs3}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems/gray-code" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Gray Code</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Unit distance code</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/bin-to-dec" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Number Systems Overview</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Return to the start</div>
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