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
function BinaryToHexCalc() {
  const [binary, setBinary] = useState("");
  const [result, setResult] = useState("");

  const convert = (bin) => {
    if (!bin) return "";
    if (!/^[01]+$/.test(bin)) return "Invalid Binary";
    
    // Pad left to multiple of 4
    let padded = bin;
    while (padded.length % 4 !== 0) {
      padded = "0" + padded;
    }
    
    // Map chunks to hex
    const map = {
      "0000": "0", "0001": "1", "0010": "2", "0011": "3",
      "0100": "4", "0101": "5", "0110": "6", "0111": "7",
      "1000": "8", "1001": "9", "1010": "A", "1011": "B",
      "1100": "C", "1101": "D", "1110": "E", "1111": "F"
    };
    
    let hex = "";
    for (let i = 0; i < padded.length; i += 4) {
      hex += map[padded.substring(i, i + 4)];
    }
    return hex;
  };

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px", marginTop: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Try it yourself</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Binary Input</label>
          <input 
            type="text" 
            value={binary}
            onChange={(e) => {
              const val = e.target.value.replace(/\s/g, '');
              setBinary(val);
              setResult(convert(val));
            }}
            placeholder="e.g. 1011011"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #cbd5e1", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, outline: "none" }}
          />
        </div>
        <div style={{ paddingTop: 24, color: "#94a3b8" }}>→</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Hexadecimal Result</label>
          <div style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: result === "Invalid Binary" ? "#ef4444" : ACCENT, fontWeight: 700 }}>
            {result || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function BinToHexPage() {
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
      
      {/* Progress Bar */}
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Binary to Hexadecimal</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>Binary to Hexadecimal</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Convert binary numbers to hexadecimal by grouping bits into sets of four (quads) and mapping each to its hex digit.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="Why Group by 4?" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Relationship</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Hexadecimal is base-16, and binary is base-2. Since 16 = 2⁴, <strong>exactly four binary digits represent one hexadecimal digit</strong>[citation:1][citation:3].
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Advantage</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Hexadecimal is a compact shorthand for binary. Instead of reading 8 bits (e.g., <Code>10110110</Code>), you read 2 hex digits (<Code>B6</Code>). It is widely used in programming, debugging, and memory management[citation:3].
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Goal</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Break the binary string into chunks of 4, then look up each chunk in a conversion table.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. Method */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — The Method" title="Direct Conversion (Grouping)" subtitle="Group from the right (LSB) for integers. Pad with leading zeros if the leftmost group is incomplete." />
          </Reveal>
          <Card>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example: Convert (1011011)₂ to Hexadecimal</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 1: Pad with leading zeros</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#0f172a" }}>
                  <span style={{ color: "#94a3b8" }}>0</span>1011011 → <span style={{ color: ACCENT }}>0101</span> <span style={{ color: ACCENT }}>1011</span>
                </div>
              </div>
              
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 2: Group into 4-bit quads</div>
                <div style={{ display: "flex", gap: 24, fontFamily: "monospace", fontSize: 18, fontWeight: 800, color: ACCENT }}>
                  <span>0101</span>
                  <span>1011</span>
                </div>
              </div>

              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 3: Map each quad to its hex digit</div>
                <div style={{ display: "flex", gap: 24, fontFamily: "monospace", fontSize: 16, color: "#0f172a" }}>
                  <span>0101 → <strong style={{ color: ACCENT }}>5</strong></span>
                  <span>1011 → <strong style={{ color: ACCENT }}>B</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", background: "#eff6ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e40af" }}>Result:</div>
              <div style={{ fontSize: 22, fontFamily: "monospace", fontWeight: 800, color: ACCENT, letterSpacing: 2 }}>5B</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#64748b", textAlign: "right" }}>
              So, (1011011)₂ = (5B)₁₆
            </div>
          </Card>
        </section>

        {/* 3. Conversion Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Reference" title="Binary to Hexadecimal Table" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { b: "0000", h: "0" }, { b: "0001", h: "1" }, { b: "0010", h: "2" }, { b: "0011", h: "3" },
                { b: "0100", h: "4" }, { b: "0101", h: "5" }, { b: "0110", h: "6" }, { b: "0111", h: "7" },
                { b: "1000", h: "8" }, { b: "1001", h: "9" }, { b: "1010", h: "A" }, { b: "1011", h: "B" },
                { b: "1100", h: "C" }, { b: "1101", h: "D" }, { b: "1110", h: "E" }, { b: "1111", h: "F" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: i % 2 === 0 ? "#f8fafc" : "#fff", borderRadius: 4, border: "1px solid #f1f5f9", fontFamily: "monospace", fontSize: 14 }}>
                  <span style={{ color: "#64748b" }}>{item.b}</span>
                  <span style={{ fontWeight: 800, color: ACCENT }}>{item.h}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 16, marginBottom: 0 }}>
              Notice that hex digits <Code>A</Code> through <Code>F</Code> represent decimal values 10 through 15[citation:3].
            </p>
          </Card>
        </section>

        {/* 4. Fractional Note */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Advanced" title="What About Fractions?" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Integers</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Group from the <strong>right (LSB)</strong> and pad with <strong>leading zeros</strong> on the left.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Fractions</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Group from <strong>left to right</strong> (starting after the radix point) and pad with <strong>trailing zeros</strong> on the right[citation:3][citation:4].
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Example</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  <Code>0.11001</Code> → <Code>0.1100 1</Code> → pad right → <Code>0.1100 1000</Code> → <Code>0.C8</Code>[citation:3].
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 5. Interactive Calculator */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="05 — Practice" title="Interactive Converter" subtitle="Type any binary number to see the hexadecimal equivalent instantly." />
          </Reveal>
          <Card>
            <BinaryToHexCalc />
          </Card>
        </section>

        {/* Navigation */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems/dec-to-bin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Decimal to Binary</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Successive division</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/hex-to-bin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Hexadecimal to Binary</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>The reverse mapping</div>
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