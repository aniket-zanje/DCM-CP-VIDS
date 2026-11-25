import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#06b6d4'; // Cyan accent for XNOR
const SECONDARY = '#3b82f6';

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

/* ─────────────── SVG XNOR Gate Symbol ─────────────── */
function XNORGateSVG() {
  return (
    <svg viewBox="0 0 200 120" style={{ width: "100%", maxWidth: 240, display: "block", margin: "0 auto" }}>
      {/* Input wires */}
      <line x1="20" y1="40" x2="55" y2="40" stroke="#0f172a" strokeWidth="2" />
      <line x1="20" y1="80" x2="55" y2="80" stroke="#0f172a" strokeWidth="2" />
      
      {/* Extra XOR curve on input side */}
      <path d="M 48 20 Q 65 60 48 100" fill="none" stroke="#0f172a" strokeWidth="2" />
      
      {/* XNOR Gate Body (Curved Shield) */}
      <path d="M 55 20 Q 90 60 55 100 Q 110 100 140 60 Q 110 20 55 20 Z" fill="#ecfeff" stroke="#0f172a" strokeWidth="2" />
      
      {/* Inversion Bubble */}
      <circle cx="147" cy="60" r="7" fill="#fff" stroke="#0f172a" strokeWidth="2" />
      
      {/* Output wire */}
      <line x1="154" y1="60" x2="180" y2="60" stroke="#0f172a" strokeWidth="2" />
      
      {/* Labels */}
      <text x="12" y="44" fontSize="14" fontWeight="700" fill="#3b82f6" fontFamily="monospace">A</text>
      <text x="12" y="84" fontSize="14" fontWeight="700" fill="#3b82f6" fontFamily="monospace">B</text>
      <text x="186" y="64" fontSize="14" fontWeight="700" fill="#06b6d4" fontFamily="monospace">Y</text>
      
      {/* Reference text inside */}
      <text x="75" y="65" fontSize="12" fill="#64748b" fontFamily="monospace">=</text>
    </svg>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function XNORPage() {
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
          <Link to="/topics/logic-gates" style={{ color: "#94a3b8", textDecoration: "none" }}>Logic Gates</Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>XNOR Gate</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#cffafe", padding: "4px 10px", borderRadius: 999 }}>Logic Gates</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>XNOR Gate</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              The Exclusive-NOR gate. It acts as an <strong>Equality Detector</strong>. <strong>Y = (A ⊕ B)'</strong>
            </p>
          </header>
        </Reveal>

        {/* 1. Concept & Symbol */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="How the XNOR Gate Works" /></Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Boolean Expression</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      <Code>Y = (A ⊕ B)'</Code> or <Code>Y = A ⊙ B</Code>. It is the exact complement (NOT) of the XOR operation.
                    </div>
                  </li>
                  <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Golden Rule</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      The output is <strong>1 when the inputs are the SAME</strong> (both 0 or both 1). The output is 0 when the inputs are different.
                    </div>
                  </li>
                  <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Equality Detector</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      Because it outputs 1 only when inputs match, it is heavily used in magnitude comparators to check if two binary numbers are strictly equal.
                    </div>
                  </li>
                </ul>
              </div>
              <div style={{ background: "#f8fafc", padding: "24px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textAlign: "center", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Logic Symbol</div>
                <XNORGateSVG />
              </div>
            </div>
          </Card>
        </section>

        {/* 2. Truth Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Truth Table" title="2-Input XNOR Gate" subtitle="The output is 1 in the first and last rows where A and B match." />
          </Reveal>
          <Card>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table style={{ borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#fff" }}>
                    <th style={{ padding: "12px 32px", borderRight: "1px solid #1e293b" }}>A</th>
                    <th style={{ padding: "12px 32px", borderRight: "1px solid #1e293b" }}>B</th>
                    <th style={{ padding: "12px 32px", color: ACCENT }}>Y = (A ⊕ B)'</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0", "0", "1"],
                    ["0", "1", "0"],
                    ["1", "0", "0"],
                    ["1", "1", "1"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "12px 32px", textAlign: "center", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{row[0]}</td>
                      <td style={{ padding: "12px 32px", textAlign: "center", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{row[1]}</td>
                      <td style={{ padding: "12px 32px", textAlign: "center", fontWeight: 800, color: row[2] === "1" ? ACCENT : "#cbd5e1" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 3. Types */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Types" title="Variations by Input Count" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>2-Input XNOR Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  The standard form. <Code>Y = (A ⊕ B)'</Code>. Highly used in basic equality comparators.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>3-Input XNOR Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Takes three inputs. Output is 1 if an <em>even number</em> of inputs are 1 (e.g., 0, 2, or all 3). It acts as an even parity generator.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Multi-Input XNOR Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  For an n-input XNOR, the output is HIGH (1) when the number of HIGH inputs is even.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 4. Pros & Cons */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="04 — Evaluation" title="Advantages & Disadvantages" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card delay={100}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#16a34a", marginBottom: 12 }}>Advantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Equality Detection:</strong> The most direct way to compare two bits.</li>
                <li><strong>Parity Generation:</strong> Excellent for error-checking circuits.</li>
                <li><strong>Simple Design:</strong> Can be built with just two XOR/XNOR gates for multi-bit operations.</li>
              </ul>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>Disadvantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Limited Arithmetic Use:</strong> Not commonly used in fundamental adders (unlike XOR).</li>
                <li><strong>Higher Gate Cost:</strong> Requires more transistors to implement than an XOR or AND gate.</li>
                <li><strong>Propagation Delay:</strong> Slightly slower than basic gates.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 5. Applications */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="05 — Applications" title="Where is it Used?" /></Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              {[
                { title: "Equality Comparators", desc: "Checks if two digital words are identical." },
                { title: "Parity Checkers", desc: "Generates even parity bits for error detection in data transmission." },
                { title: "Phase Detectors", desc: "Compares the phase of two signals in communication systems." },
                { title: "Encryption", desc: "Used in certain cryptography algorithms due to its complementing nature." },
              ].map((item, i) => (
                <div key={i} style={{ background: "#f8fafc", padding: "20px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.6 }}>{item.desc}</div>
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
              <Link to="/topics/logic-gates/xor" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>XOR Gate</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Exclusive OR</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/logic-gates/universal" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Universal Gates</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>NAND & NOR</div>
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