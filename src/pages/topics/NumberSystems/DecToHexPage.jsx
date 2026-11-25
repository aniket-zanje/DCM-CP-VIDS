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

/* ─────────────── Interactive Converter ─────────────── */
function DecToHexCalc() {
  const [decimal, setDecimal] = useState("");
  const [result, setResult] = useState("");

  const convert = (num) => {
    if (num === "") return "";
    const parsed = parseInt(num, 10);
    if (isNaN(parsed) || parsed < 0) return "Invalid Input";
    return parsed.toString(16).toUpperCase();
  };

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px", marginTop: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Try it yourself</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Decimal Input</label>
          <input 
            type="number" 
            value={decimal}
            onChange={(e) => {
              setDecimal(e.target.value);
              setResult(convert(e.target.value));
            }}
            placeholder="e.g. 255"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #cbd5e1", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, outline: "none" }}
          />
        </div>
        <div style={{ paddingTop: 24, color: "#94a3b8" }}>→</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Hexadecimal Result</label>
          <div style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: result === "Invalid Input" ? "#ef4444" : ACCENT, fontWeight: 700 }}>
            {result || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function DecToHexPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Decimal to Hexadecimal</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>Decimal to Hexadecimal</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Convert decimal numbers to hexadecimal using the successive division by 16 method.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="Why Division by 16?" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Base Shift</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Decimal is base-10, hex is base-16. To convert from decimal to <em>any</em> base, you repeatedly divide by that base and collect the remainders.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Remainder Trap</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  When you divide by 16, remainders can be from 0 to 15. Since hex only has digits 0–9 and A–F, remainders 10–15 must be written as <Code>A</Code> through <Code>F</Code>.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Goal</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Divide, record remainders (converting to hex letters where needed), and read the final result bottom-to-top.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Method */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — The Method" title="Successive Division by 16" subtitle="Divide the decimal number by 16 repeatedly, noting the remainders, until the quotient reaches 0." />
          </Reveal>
          <Card>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example: Convert 254 to Hexadecimal</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400, marginBottom: 24 }}>
              {[
                { q: 254, rem: 14, hex: "E" },
                { q: 15, rem: 15, hex: "F" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 40px 40px", gap: 12, alignItems: "center", padding: "10px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>Step {i + 1}</div>
                  <div style={{ fontSize: 15, fontFamily: "monospace", color: "#0f172a", textAlign: "right" }}>{row.q} ÷ 16</div>
                  <div style={{ fontSize: 15, fontFamily: "monospace", color: "#94a3b8", textAlign: "center" }}>=</div>
                  <div style={{ fontSize: 16, fontFamily: "monospace", fontWeight: 800, color: ACCENT, textAlign: "right" }}>{row.rem} ({row.hex})</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", background: "#eff6ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e40af" }}>Read bottom-to-top:</div>
              <div style={{ fontSize: 20, fontFamily: "monospace", fontWeight: 800, color: ACCENT, letterSpacing: 4 }}>FE</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#64748b", textAlign: "right" }}>
              So, (254)₁₀ = (FE)₁₆
            </div>
          </Card>
        </section>

        {/* 3. Conversion Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Reference" title="Remainder to Hex Map" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { d: "0", h: "0" }, { d: "1", h: "1" }, { d: "2", h: "2" }, { d: "3", h: "3" },
                { d: "4", h: "4" }, { d: "5", h: "5" }, { d: "6", h: "6" }, { d: "7", h: "7" },
                { d: "8", h: "8" }, { d: "9", h: "9" }, { d: "10", h: "A" }, { d: "11", h: "B" },
                { d: "12", h: "C" }, { d: "13", h: "D" }, { d: "14", h: "E" }, { d: "15", h: "F" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: i % 2 === 0 ? "#f8fafc" : "#fff", borderRadius: 4, border: "1px solid #f1f5f9", fontFamily: "monospace", fontSize: 14 }}>
                  <span style={{ color: "#64748b" }}>{item.d}</span>
                  <span style={{ fontWeight: 800, color: ACCENT }}>{item.h}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 16, marginBottom: 0 }}>
              Remainders 10 through 15 must be represented by hex letters A through F.
            </p>
          </Card>
        </section>

        {/* 4. More Examples */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Practice" title="Worked Examples" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card delay={100}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Decimal 255</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>255 ÷ 16 = 15, Remainder <Code>15 (F)</Code></li>
                <li>15 ÷ 16 = 0, Remainder <Code>15 (F)</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: FF
              </div>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Decimal 2748</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>2748 ÷ 16 = 171, R = <Code>12 (C)</Code></li>
                <li>171 ÷ 16 = 10, R = <Code>11 (B)</Code></li>
                <li>10 ÷ 16 = 0, R = <Code>10 (A)</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: ABC
              </div>
            </Card>
          </div>
        </section>

        {/* 5. Interactive Calculator */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="05 — Practice" title="Interactive Converter" subtitle="Type any decimal number to see the hexadecimal equivalent instantly." />
          </Reveal>
          <Card>
            <DecToHexCalc />
          </Card>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems/oct-to-bin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Octal to Binary</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Expanding by 3</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/bcd" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>BCD (8421 Code)</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Decimal encoding</div>
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