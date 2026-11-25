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
function DecimalToBinaryCalc() {
  const [decimal, setDecimal] = useState("");
  
  const calculateBinary = (num) => {
    if (num === "") return "";
    const parsed = parseInt(num, 10);
    if (isNaN(parsed) || parsed < 0) return "Invalid Input";
    return parsed.toString(2);
  };

  const binary = calculateBinary(decimal);

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px", marginTop: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Try it yourself</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Decimal Input</label>
          <input 
            type="number" 
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            placeholder="e.g. 25"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #cbd5e1", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, outline: "none", transition: "border 0.2s" }}
            onFocus={(e) => e.target.style.borderColor = ACCENT}
            onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
          />
        </div>
        <div style={{ paddingTop: 24, color: "#94a3b8" }}>→</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Binary Result</label>
          <div style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: binary === "Invalid Input" ? "#ef4444" : ACCENT, fontWeight: 700 }}>
            {binary || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page Component ─────────────── */
export default function DecToBinPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Decimal to Binary</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>
              Decimal to Binary
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Learn how to convert decimal numbers (base-10) to binary numbers (base-2) using the successive division method.
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
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Decimal System (Base-10)</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Uses ten digits: <Code>0</Code> through <Code>9</Code>. This is the standard system used by humans in daily life.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Binary System (Base-2)</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Uses only two digits: <Code>0</Code> and <Code>1</Code>. It is the fundamental language of computers and digital electronics.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Goal</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Translate human-readable base-10 values into machine-readable base-2 values.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Method: Successive Division */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — The Method" title="Successive Division by 2" subtitle="Divide the decimal number by 2 repeatedly, noting the remainders, until the quotient reaches 0. Then read the remainders in reverse." />
          </Reveal>
          <Card>
            <div style={{ background: "#0f172a", color: "#fff", padding: "20px", borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 15, textAlign: "center", marginBottom: 24 }}>
              Step 1: Divide by 2 → Step 2: Note Remainder → Step 3: Repeat until Quotient = 0 → Step 4: Read Remainders Bottom-Up
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example: Convert 25 to Binary</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400, marginBottom: 24 }}>
              {[
                { q: 25, rem: 1 },
                { q: 12, rem: 0 },
                { q: 6, rem: 0 },
                { q: 3, rem: 1 },
                { q: 1, rem: 1 },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 40px 40px", gap: 12, alignItems: "center", padding: "10px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>Step {i + 1}</div>
                  <div style={{ fontSize: 15, fontFamily: "monospace", color: "#0f172a", textAlign: "right" }}>{row.q} ÷ 2</div>
                  <div style={{ fontSize: 15, fontFamily: "monospace", color: "#94a3b8", textAlign: "center" }}>=</div>
                  <div style={{ fontSize: 18, fontFamily: "monospace", fontWeight: 800, color: ACCENT, textAlign: "right" }}>{row.rem}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", background: "#eff6ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e40af" }}>Read remainders from bottom to top:</div>
              <div style={{ fontSize: 20, fontFamily: "monospace", fontWeight: 800, color: ACCENT, letterSpacing: 4 }}>11001</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#64748b", textAlign: "right" }}>
              So, (25)₁₀ = (11001)₂
            </div>
          </Card>
        </section>

        {/* 3. More Examples */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Worked Examples" title="More Practice" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card delay={100}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Decimal 10</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>10 ÷ 2 = 5, Remainder <Code>0</Code></li>
                <li>5 ÷ 2 = 2, Remainder <Code>1</Code></li>
                <li>2 ÷ 2 = 1, Remainder <Code>0</Code></li>
                <li>1 ÷ 2 = 0, Remainder <Code>1</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: 1010
              </div>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Decimal 278</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>278 ÷ 2 = 139, Remainder <Code>0</Code></li>
                <li>139 ÷ 2 = 69, Remainder <Code>1</Code></li>
                <li>69 ÷ 2 = 34, Remainder <Code>1</Code></li>
                <li>... continue until 0</li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: 100010110
              </div>
            </Card>
          </div>
        </section>

        {/* 4. Interactive Calculator */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Practice" title="Interactive Converter" subtitle="Type any decimal number below to instantly see the binary equivalent." />
          </Reveal>
          <Card>
            <DecimalToBinaryCalc />
          </Card>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems/bin-to-dec" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Binary to Decimal</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>The reverse process</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/bin-to-hex" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Binary to Hexadecimal</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Grouping bits</div>
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