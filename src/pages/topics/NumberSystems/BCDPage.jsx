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
export default function BCDPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>BCD (8421)</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>BCD (8421 Code)</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Binary Coded Decimal: representing each decimal digit individually using a 4-bit binary code.
            </p>
          </header>
        </Reveal>

        {/* 1. Core Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="What is BCD?" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Core Idea</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  BCD is not a true number system like binary or hex. It is an <strong>encoding scheme</strong>. Instead of converting an entire decimal number into one long binary string, BCD encodes <strong>each decimal digit (0–9) individually</strong> using exactly 4 bits.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Why "8421"?</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  It is a <strong>weighted code</strong>. From left to right, the four bits carry weights of <strong>8, 4, 2, and 1</strong>. For example, the code <Code>0101</Code> represents 5 because (0×8) + (1×4) + (0×2) + (1×1) = 5.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Invalid Codes</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Since 4 bits can represent 16 values, BCD only uses the first 10 (0000 through 1001). The six codes from <Code>1010</Code> to <Code>1111</Code> are <strong>invalid</strong> in BCD.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Arithmetic & Correction Cases (In Detail) */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Arithmetic Rules" title="The 3 Cases of BCD Summation" subtitle="When you add two BCD digits, the result falls into one of these exact scenarios. The correction is applied only when necessary." />
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Case 1 */}
            <Reveal delay={100}>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ background: "#f0fdf4", padding: "16px 24px", borderBottom: "1px solid #bbf7d0" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#16a34a" }}>Case 1</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#15803d" }}>Sum ≤ 9 (and No Carry)</div>
                </div>
                <div style={{ padding: "24px" }}>
                  <p style={{ fontSize: 15, color: "#475569", marginBottom: 16, lineHeight: 1.6 }}>
                    The binary sum is between <Code>0000</Code> and <Code>1001</Code> (0 to 9). The result is already a valid BCD digit.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginRight: 12 }}>Action:</span>
                    <span style={{ fontSize: 15, color: "#16a34a", fontWeight: 700 }}>No correction needed.</span>
                    <span style={{ fontSize: 14, color: "#64748b", marginLeft: 12 }}>Final result is the binary sum.</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Case 2 */}
            <Reveal delay={200}>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ background: "#fffbeb", padding: "16px 24px", borderBottom: "1px solid #fde68a" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#d97706" }}>Case 2</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#b45309" }}>Sum > 9 (Invalid BCD) with No Carry</div>
                </div>
                <div style={{ padding: "24px" }}>
                  <p style={{ fontSize: 15, color: "#475569", marginBottom: 16, lineHeight: 1.6 }}>
                    The binary sum is between <Code>1010</Code> and <Code>1111</Code> (10 to 15). This is an invalid BCD code.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginRight: 12 }}>Action:</span>
                    <span style={{ fontSize: 15, color: "#d97706", fontWeight: 700 }}>Add 0110 (+6) to the sum.</span>
                    <span style={{ fontSize: 14, color: "#64748b", marginLeft: 12 }}>This skips the invalid states and generates a carry.</span>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 14, color: "#475569" }}>
                    <strong>Example:</strong> 8 (<Code>1000</Code>) + 5 (<Code>0101</Code>) = <Code>1101</Code> (13). Add <Code>0110</Code> → <Code>10011</Code>. The carry is 1, and the digit is <Code>0011</Code> (3).
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Case 3 */}
            <Reveal delay={300}>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ background: "#fef2f2", padding: "16px 24px", borderBottom: "1px solid #fecaca" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#dc2626" }}>Case 3</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#b91c1c" }}>Carry Generated (Sum ≥ 16)</div>
                </div>
                <div style={{ padding: "24px" }}>
                  <p style={{ fontSize: 15, color: "#475569", marginBottom: 16, lineHeight: 1.6 }}>
                    The binary sum produces a carry-out (K = 1). Even if the remaining 4 bits are a valid BCD digit (e.g., <Code>0000</Code> to <Code>1001</Code>), the true sum is 16 or greater.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginRight: 12 }}>Action:</span>
                    <span style={{ fontSize: 15, color: "#dc2626", fontWeight: 700 }}>Add 0110 (+6) to the sum.</span>
                    <span style={{ fontSize: 14, color: "#64748b", marginLeft: 12 }}>The carry is recorded as the tens digit.</span>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 14, color: "#475569" }}>
                    <strong>Example:</strong> 9 (<Code>1001</Code>) + 9 (<Code>1001</Code>) = <Code>10010</Code> (18). Add <Code>0110</Code> → <Code>11000</Code>. Carry = 1, Digit = <Code>1000</Code> (8). Result = 18.
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* 3. Reference Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Reference" title="Decimal to BCD Table" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {[0,1,2,3,4,5,6,7,8,9].map((d) => (
                <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{d}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 14, color: ACCENT, fontWeight: 700 }}>{d.toString(2).padStart(4, '0')}</span>
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
              <Link to="/topics/number-systems/dec-to-hex" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Decimal to Hexadecimal</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Division by 16</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/gray-code" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Gray Code</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Single-bit transitions</div>
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