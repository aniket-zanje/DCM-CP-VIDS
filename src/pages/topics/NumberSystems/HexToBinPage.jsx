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
function HexToBinCalc() {
  const [hex, setHex] = useState("");
  const [result, setResult] = useState("");

  const convert = (h) => {
    if (!h) return "";
    if (!/^[0-9A-Fa-f]+$/.test(h)) return "Invalid Hex";
    
    const map = {
      "0": "0000", "1": "0001", "2": "0010", "3": "0011",
      "4": "0100", "5": "0101", "6": "0110", "7": "0111",
      "8": "1000", "9": "1001", "A": "1010", "B": "1011",
      "C": "1100", "D": "1101", "E": "1110", "F": "1111",
      "a": "1010", "b": "1011", "c": "1100", "d": "1101",
      "e": "1110", "f": "1111"
    };
    
    let bin = "";
    for (let i = 0; i < h.length; i++) {
      bin += map[h[i]] + " ";
    }
    return bin.trim();
  };

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px", marginTop: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Try it yourself</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Hexadecimal Input</label>
          <input 
            type="text" 
            value={hex}
            onChange={(e) => {
              const val = e.target.value.replace(/\s/g, '');
              setHex(val);
              setResult(convert(val));
            }}
            placeholder="e.g. 2F"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #cbd5e1", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, outline: "none" }}
          />
        </div>
        <div style={{ paddingTop: 24, color: "#94a3b8" }}>→</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Binary Result (4-bit groups)</label>
          <div style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: result === "Invalid Hex" ? "#ef4444" : ACCENT, fontWeight: 700, wordBreak: "break-all" }}>
            {result || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function HexToBinPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Hexadecimal to Binary</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>Hexadecimal to Binary</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Convert hexadecimal numbers to binary by expanding each hex digit into its 4-bit binary equivalent.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="Direct Expansion" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Simplest Conversion</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  This is arguably the easiest number system conversion. Because hexadecimal is base-16 (2⁴), every single hex digit maps <strong>exactly</strong> to 4 binary bits.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>No Division Needed</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Unlike decimal conversions, you do not need to divide or multiply. You simply look up the 4-bit code for each hex character and string them together.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Goal</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Take each hex symbol, replace it with its 4-bit binary pattern, and concatenate.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Method */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — The Method" title="Step-by-Step Expansion" subtitle="Replace each hex digit (from left to right) with its 4-bit binary equivalent." />
          </Reveal>
          <Card>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example: Convert (2F)₁₆ to Binary</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 1: Identify each hex digit</div>
                <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 800, color: "#0f172a", display: "flex", gap: 24 }}>
                  <span>2</span>
                  <span>F</span>
                </div>
              </div>
              
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 2: Map to 4-bit binary</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#475569", display: "flex", gap: 24 }}>
                  <span>2 → <strong style={{ color: ACCENT }}>0010</strong></span>
                  <span>F → <strong style={{ color: ACCENT }}>1111</strong></span>
                </div>
              </div>

              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 3: Concatenate</div>
                <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 800, color: ACCENT, letterSpacing: 2 }}>
                  0010 1111
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", background: "#eff6ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e40af" }}>Result:</div>
              <div style={{ fontSize: 22, fontFamily: "monospace", fontWeight: 800, color: ACCENT, letterSpacing: 4 }}>00101111</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#64748b", textAlign: "right" }}>
              So, (2F)₁₆ = (00101111)₂
            </div>
          </Card>
        </section>

        {/* 3. Conversion Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Reference" title="Hexadecimal to Binary Table" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { h: "0", b: "0000" }, { h: "1", b: "0001" }, { h: "2", b: "0010" }, { h: "3", b: "0011" },
                { h: "4", b: "0100" }, { h: "5", b: "0101" }, { h: "6", b: "0110" }, { h: "7", b: "0111" },
                { h: "8", b: "1000" }, { h: "9", b: "1001" }, { h: "A", b: "1010" }, { h: "B", b: "1011" },
                { h: "C", b: "1100" }, { h: "D", b: "1101" }, { h: "E", b: "1110" }, { h: "F", b: "1111" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: i % 2 === 0 ? "#f8fafc" : "#fff", borderRadius: 4, border: "1px solid #f1f5f9", fontFamily: "monospace", fontSize: 14 }}>
                  <span style={{ fontWeight: 800, color: ACCENT }}>{item.h}</span>
                  <span style={{ color: "#64748b" }}>{item.b}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 16, marginBottom: 0 }}>
              Memorizing this table is the single best way to master hex-to-binary conversion.
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
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>(A5)₁₆ → ?₂</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>A → <Code>1010</Code></li>
                <li>5 → <Code>0101</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: 1010 0101
              </div>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>(1C3)₁₆ → ?₂</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>1 → <Code>0001</Code></li>
                <li>C → <Code>1100</Code></li>
                <li>3 → <Code>0011</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: 0001 1100 0011
              </div>
            </Card>
          </div>
        </section>

        {/* 5. Interactive Calculator */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="05 — Practice" title="Interactive Converter" subtitle="Type any hexadecimal number to see the binary equivalent instantly." />
          </Reveal>
          <Card>
            <HexToBinCalc />
          </Card>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems/bin-to-hex" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Binary to Hexadecimal</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>The reverse process</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/bin-to-oct" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Binary to Octal</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Grouping by 3</div>
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