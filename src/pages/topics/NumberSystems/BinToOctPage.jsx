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
function BinaryToOctCalc() {
  const [binary, setBinary] = useState("");
  const [result, setResult] = useState("");

  const convert = (bin) => {
    if (!bin) return "";
    if (!/^[01]+$/.test(bin)) return "Invalid Binary";
    
    // Pad left to multiple of 3
    let padded = bin;
    while (padded.length % 3 !== 0) {
      padded = "0" + padded;
    }
    
    const map = {
      "000": "0", "001": "1", "010": "2", "011": "3",
      "100": "4", "101": "5", "110": "6", "111": "7"
    };
    
    let oct = "";
    for (let i = 0; i < padded.length; i += 3) {
      oct += map[padded.substring(i, i + 3)];
    }
    return oct;
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
            placeholder="e.g. 101101"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #cbd5e1", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, outline: "none" }}
          />
        </div>
        <div style={{ paddingTop: 24, color: "#94a3b8" }}>→</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Octal Result</label>
          <div style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: result === "Invalid Binary" ? "#ef4444" : ACCENT, fontWeight: 700 }}>
            {result || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function BinToOctPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Binary to Octal</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#eff6ff", padding: "4px 10px", borderRadius: 999 }}>Number Systems</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>Binary to Octal</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Convert binary numbers to octal by grouping bits into sets of three and mapping each to its octal digit.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="Why Group by 3?" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Relationship</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Octal is base-8, and binary is base-2. Since 8 = 2³, <strong>exactly three binary digits represent one octal digit</strong>.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Advantage</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Octal is a compact shorthand for binary, used widely in Unix file permissions (e.g., <Code>755</Code>) and older computing systems. It is shorter than binary but simpler than hex.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Goal</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Break the binary string into chunks of 3, then map each chunk to an octal digit (0–7).
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
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Example: Convert (101101)₂ to Octal</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 1: Group into 3-bit chunks (from right)</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#0f172a" }}>
                  <span style={{ color: "#94a3b8" }}>0</span><span style={{ color: ACCENT }}>101</span> <span style={{ color: ACCENT }}>101</span>
                </div>
              </div>
              
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Step 2: Map each chunk to octal</div>
                <div style={{ display: "flex", gap: 24, fontFamily: "monospace", fontSize: 16, color: "#475569" }}>
                  <span>101 → <strong style={{ color: ACCENT }}>5</strong></span>
                  <span>101 → <strong style={{ color: ACCENT }}>5</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", background: "#eff6ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e40af" }}>Result:</div>
              <div style={{ fontSize: 22, fontFamily: "monospace", fontWeight: 800, color: ACCENT, letterSpacing: 2 }}>55</div>
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#64748b", textAlign: "right" }}>
              So, (101101)₂ = (55)₈
            </div>
          </Card>
        </section>

        {/* 3. Conversion Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Reference" title="Binary to Octal Table" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { b: "000", o: "0" }, { b: "001", o: "1" }, { b: "010", o: "2" }, { b: "011", o: "3" },
                { b: "100", o: "4" }, { b: "101", o: "5" }, { b: "110", o: "6" }, { b: "111", o: "7" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: i % 2 === 0 ? "#f8fafc" : "#fff", borderRadius: 4, border: "1px solid #f1f5f9", fontFamily: "monospace", fontSize: 14 }}>
                  <span style={{ color: "#64748b" }}>{item.b}</span>
                  <span style={{ fontWeight: 800, color: ACCENT }}>{item.o}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 16, marginBottom: 0 }}>
              Notice that octal uses only digits <Code>0</Code> through <Code>7</Code>. There are no letters like in hexadecimal.
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
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>(110101)₂ → ?₈</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>Group right: <Code>110</Code> <Code>101</Code></li>
                <li>110 → <Code>6</Code></li>
                <li>101 → <Code>5</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: 65₈
              </div>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>(1001101)₂ → ?₈</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li>Group right: <Code>1</Code> <Code>001</Code> <Code>101</Code></li>
                <li>Pad left: <Code>001</Code> <Code>001</Code> <Code>101</Code></li>
                <li>001 → <Code>1</Code>, 001 → <Code>1</Code>, 101 → <Code>5</Code></li>
              </ul>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: ACCENT }}>
                Result: 115₈
              </div>
            </Card>
          </div>
        </section>

        {/* 5. Interactive Calculator */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="05 — Practice" title="Interactive Converter" subtitle="Type any binary number to see the octal equivalent instantly." />
          </Reveal>
          <Card>
            <BinaryToOctCalc />
          </Card>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/number-systems/hex-to-bin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Hexadecimal to Binary</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Expanding by 4</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/number-systems/oct-to-bin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Octal to Binary</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>The reverse process</div>
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