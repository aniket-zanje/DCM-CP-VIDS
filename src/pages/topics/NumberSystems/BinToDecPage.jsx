import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#3b82f6'; // Blue for Number Systems
const SECONDARY = '#8b5cf6'; // Violet

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
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
        {kicker}
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px", color: "#0f172a" }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 15, color: "#64748b", margin: 0, maxWidth: 700, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

function Card({ children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "32px", marginBottom: 24, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
        {children}
      </div>
    </Reveal>
  );
}

/* ─────────────── Interactive Inline Calculator ─────────────── */
function BinaryToDecimalCalc() {
  const [binary, setBinary] = useState("");
  
  const calculateDecimal = (bin) => {
    if (!bin) return "";
    if (!/^[01]+$/.test(bin)) return "Invalid Binary";
    return parseInt(bin, 2);
  };

  const decimal = calculateDecimal(binary);

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px", marginTop: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Try it yourself</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Binary Input</label>
          <input 
            type="text" 
            value={binary}
            onChange={(e) => setBinary(e.target.value.replace(/\s/g, ''))}
            placeholder="e.g. 10101"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #cbd5e1", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, outline: "none", transition: "border 0.2s" }}
            onFocus={(e) => e.target.style.borderColor = ACCENT}
            onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
          />
        </div>
        <div style={{ paddingTop: 24, color: "#94a3b8" }}>→</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Decimal Result</label>
          <div style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: decimal === "Invalid Binary" ? "#ef4444" : ACCENT, fontWeight: 700 }}>
            {decimal || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page Component ─────────────── */
export default function BinToDecPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Binary to Decimal</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>
              Binary to Decimal
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Learn how to convert binary values (base-2) to decimal values (base-10) using the positional notation and doubling methods.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="01 — The Concept" title="Understanding the Systems" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Binary System (Base-2)</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Uses only two digits: <Code>0</Code> and <Code>1</Code>. It is the fundamental language of computers and digital electronics.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Decimal System (Base-10)</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Uses ten digits: <Code>0</Code> through <Code>9</Code>. This is the standard system used by humans in daily life.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Goal</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  We need to translate the machine-readable base-2 values into human-readable base-10 values.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Method 1: Positional Notation */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Method 1" title="Positional Notation Method" subtitle="Multiply each digit by 2 raised to the power of its position (starting from 0 on the right)." />
          </Reveal>
          <Card>
            <div style={{ background: "#0f172a", color: "#fff", padding: "20px", borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, textAlign: "center", marginBottom: 24 }}>
              Decimal = (b<sub>n</sub> × 2<sup>n</sup>) + ... + (b<sub>2</sub> × 2<sup>2</sup>) + (b<sub>1</sub> × 2<sup>1</sup>) + (b<sub>0</sub> × 2<sup>0</sup>)
            </div>
            
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example 1: Convert (11100)₂ to Decimal</h4>
            <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, marginBottom: 16 }}>
              Write down the binary number and assign powers of 2 from right to left, starting at 0.
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={{ padding: "12px", border: "1px solid #e2e8f0", color: "#64748b" }}>Binary Digit</th>
                    <th style={{ padding: "12px", border: "1px solid #e2e8f0" }}>1</th>
                    <th style={{ padding: "12px", border: "1px solid #e2e8f0" }}>1</th>
                    <th style={{ padding: "12px", border: "1px solid #e2e8f0" }}>1</th>
                    <th style={{ padding: "12px", border: "1px solid #e2e8f0" }}>0</th>
                    <th style={{ padding: "12px", border: "1px solid #e2e8f0" }}>0</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 700, background: "#f8fafc" }}>Power of 2</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>2⁴</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>2³</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>2²</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>2¹</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>2⁰</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 700, background: "#f8fafc" }}>Calculation</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0", color: ACCENT }}>1 × 16</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0", color: ACCENT }}>1 × 8</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0", color: ACCENT }}>1 × 4</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>0 × 2</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>0 × 1</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 700, background: "#f8fafc" }}>Result</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>16</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>8</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>4</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>0</td>
                    <td style={{ padding: "12px", border: "1px solid #e2e8f0" }}>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: "#0f172a", textAlign: "right" }}>
              Sum: 16 + 8 + 4 + 0 + 0 = <span style={{ color: ACCENT }}>28</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 14, color: "#64748b", textAlign: "right" }}>
              So, (11100)₂ = (28)₁₀
            </div>
          </Card>
        </section>

        {/* 3. Method 2: Doubling Method */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Method 2" title="The Doubling Method" subtitle="Read the binary number from left to right. Multiply the previous total by 2 and add the current digit." />
          </Reveal>
          <Card>
            <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, marginBottom: 24 }}>
              This method is highly efficient for programming and mental math. Start with a total of 0.
              <br />
              <Code>Total = (Total × 2) + Current Digit</Code>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example 2: Convert (10001)₂ to Decimal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { step: 1, digit: 1, prev: 0, calc: "(0 × 2) + 1", result: 1 },
                { step: 2, digit: 0, prev: 1, calc: "(1 × 2) + 0", result: 2 },
                { step: 3, digit: 0, prev: 2, calc: "(2 × 2) + 0", result: 4 },
                { step: 4, digit: 0, prev: 4, calc: "(4 × 2) + 0", result: 8 },
                { step: 5, digit: 1, prev: 8, calc: "(8 × 2) + 1", result: 17 },
              ].map((row) => (
                <div key={row.step} style={{ display: "grid", gridTemplateColumns: "60px 60px 1fr 60px", gap: 16, alignItems: "center", padding: "12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8" }}>Step {row.step}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "monospace", color: ACCENT }}>{row.digit}</div>
                  <div style={{ fontSize: 14, fontFamily: "monospace", color: "#475569" }}>{row.calc}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "monospace", color: "#0f172a", textAlign: "right" }}>= {row.result}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: "#0f172a", textAlign: "right" }}>
              Final Result: <span style={{ color: ACCENT }}>(10001)₂ = (17)₁₀</span>
            </div>
          </Card>
        </section>

        {/* 4. Interactive Calculator */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Practice" title="Interactive Converter" subtitle="Type any binary number below to instantly see the decimal equivalent." />
          </Reveal>
          <Card>
            <BinaryToDecimalCalc />
          </Card>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Number Systems Overview</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Back to basics</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/dec-to-bin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Decimal to Binary</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Reverse the process</div>
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