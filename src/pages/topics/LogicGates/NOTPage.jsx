import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#f59e0b'; // Amber/Orange accent for NOT
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

/* ─────────────── SVG NOT Gate Symbol ─────────────── */
function NOTGateSVG() {
  return (
    <svg viewBox="0 0 200 120" style={{ width: "100%", maxWidth: 240, display: "block", margin: "0 auto" }}>
      {/* Input wire */}
      <line x1="20" y1="60" x2="60" y2="60" stroke="#0f172a" strokeWidth="2" />
      
      {/* NOT Gate Body (Triangle) */}
      <path d="M 60 20 L 60 100 L 130 60 Z" fill="#fffbeb" stroke="#0f172a" strokeWidth="2" />
      
      {/* Inversion Bubble */}
      <circle cx="137" cy="60" r="7" fill="#fff" stroke="#0f172a" strokeWidth="2" />
      
      {/* Output wire */}
      <line x1="144" y1="60" x2="180" y2="60" stroke="#0f172a" strokeWidth="2" />
      
      {/* Labels */}
      <text x="12" y="64" fontSize="14" fontWeight="700" fill="#3b82f6" fontFamily="monospace">A</text>
      <text x="186" y="64" fontSize="14" fontWeight="700" fill="#f59e0b" fontFamily="monospace">Y</text>
    </svg>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function NOTPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>NOT Gate</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#fef3c7", padding: "4px 10px", borderRadius: 999 }}>Logic Gates</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>NOT Gate</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Also known as the Inverter. It takes a single input and outputs its exact complement. <strong>Y = A'</strong>
            </p>
          </header>
        </Reveal>

        {/* 1. Concept & Symbol */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="How the NOT Gate Works" /></Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Boolean Expression</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      <Code>Y = A'</Code> or <Code>Y = Ā</Code>. The bar over the letter denotes the complement or inversion.
                    </div>
                  </li>
                  <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Golden Rule</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      If the input is 1, the output is 0. If the input is 0, the output is 1. It is the <strong>only single-input gate</strong>.
                    </div>
                  </li>
                  <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Inversion Bubble</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      The small circle at the output of the symbol is called the <strong>inversion bubble</strong>. It indicates that the logic level is inverted.
                    </div>
                  </li>
                </ul>
              </div>
              <div style={{ background: "#f8fafc", padding: "24px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textAlign: "center", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Logic Symbol</div>
                <NOTGateSVG />
              </div>
            </div>
          </Card>
        </section>

        {/* 2. Truth Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Truth Table" title="2-Row Truth Table" subtitle="The simplest truth table of all gates." />
          </Reveal>
          <Card>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table style={{ borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#fff" }}>
                    <th style={{ padding: "12px 48px", borderRight: "1px solid #1e293b" }}>A</th>
                    <th style={{ padding: "12px 48px", color: ACCENT }}>Y = A'</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0", "1"],
                    ["1", "0"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "12px 48px", textAlign: "center", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{row[0]}</td>
                      <td style={{ padding: "12px 48px", textAlign: "center", fontWeight: 800, color: row[1] === "1" ? ACCENT : "#cbd5e1" }}>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 3. Equivalent Gates */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Implementation" title="Building a NOT Gate using Universal Gates" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Using a NAND Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Tie both inputs of a NAND gate together. <Code>Y = (A · A)' = A'</Code>.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Using a NOR Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Tie both inputs of a NOR gate together. <Code>Y = (A + A)' = A'</Code>.
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
                <li><strong>Simplicity:</strong> The simplest logic gate to implement.</li>
                <li><strong>Foundation:</strong> A fundamental building block in all digital ICs.</li>
                <li><strong>Cost-Efficient:</strong> Very low cost to manufacture.</li>
              </ul>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>Disadvantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Limited Functionality:</strong> Can only perform negation.</li>
                <li><strong>Power Consumption:</strong> Consumes power when actively switching.</li>
                <li><strong>Propagation Delay:</strong> Introduces a small delay in signal processing.</li>
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
                { title: "Signal Inversion", desc: "Turns a logic HIGH into a LOW and vice versa." },
                { title: "Flip-Flops", desc: "Used in memory storage elements to control feedback." },
                { title: "Street Lighting", desc: "Turns lights ON when it is dark (0) and OFF when bright (1)." },
                { title: "Robotics", desc: "Used in obstacle avoidance systems to invert sensor signals." },
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
              <Link to="/topics/logic-gates/or" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>OR Gate</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Logical addition</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/logic-gates/nand" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>NAND Gate</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>The universal gate</div>
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