import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#ef4444'; // Red accent for NAND (NOT-AND)
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

/* ─────────────── SVG NAND Gate Symbol ─────────────── */
function NANDGateSVG() {
  return (
    <svg viewBox="0 0 200 120" style={{ width: "100%", maxWidth: 240, display: "block", margin: "0 auto" }}>
      {/* Input wires */}
      <line x1="20" y1="40" x2="60" y2="40" stroke="#0f172a" strokeWidth="2" />
      <line x1="20" y1="80" x2="60" y2="80" stroke="#0f172a" strokeWidth="2" />
      
      {/* NAND Gate Body (D-shape) */}
      <path d="M 60 20 L 100 20 A 40 40 0 0 1 100 100 L 60 100 Z" fill="#fef2f2" stroke="#0f172a" strokeWidth="2" />
      
      {/* Inversion Bubble */}
      <circle cx="142" cy="60" r="7" fill="#fff" stroke="#0f172a" strokeWidth="2" />
      
      {/* Output wire */}
      <line x1="149" y1="60" x2="180" y2="60" stroke="#0f172a" strokeWidth="2" />
      
      {/* Labels */}
      <text x="12" y="44" fontSize="14" fontWeight="700" fill="#3b82f6" fontFamily="monospace">A</text>
      <text x="12" y="84" fontSize="14" fontWeight="700" fill="#3b82f6" fontFamily="monospace">B</text>
      <text x="186" y="64" fontSize="14" fontWeight="700" fill="#ef4444" fontFamily="monospace">Y</text>
      
      {/* Reference text inside */}
      <text x="75" y="65" fontSize="12" fill="#64748b" fontFamily="monospace">&amp;</text>
    </svg>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function NANDPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>NAND Gate</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#fef2f2", padding: "4px 10px", borderRadius: 999 }}>Logic Gates</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>NAND Gate</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              The Universal Gate. It is a combination of an AND gate followed by a NOT gate. <strong>Y = (A · B)'</strong>
            </p>
          </header>
        </Reveal>

        {/* 1. Concept & Symbol */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="How the NAND Gate Works" /></Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Boolean Expression</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      <Code>Y = (A · B)'</Code> or <Code>Y = A ↑ B</Code>. The apostrophe or overline denotes the complement (NOT).
                    </div>
                  </li>
                  <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Golden Rule</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      It is the exact opposite of the AND gate. Output is <strong>0 only when ALL inputs are 1</strong>. For any other combination, the output is 1.
                    </div>
                  </li>
                  <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Universal Gate</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      Because you can build AND, OR, and NOT using only NAND gates, it is known as a "Universal Gate" or "Building Block."
                    </div>
                  </li>
                </ul>
              </div>
              <div style={{ background: "#f8fafc", padding: "24px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textAlign: "center", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Logic Symbol</div>
                <NANDGateSVG />
              </div>
            </div>
          </Card>
        </section>

        {/* 2. Truth Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Truth Table" title="2-Input NAND Gate" subtitle="The output is 0 only when both inputs are 1." />
          </Reveal>
          <Card>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table style={{ borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#fff" }}>
                    <th style={{ padding: "12px 32px", borderRight: "1px solid #1e293b" }}>A</th>
                    <th style={{ padding: "12px 32px", borderRight: "1px solid #1e293b" }}>B</th>
                    <th style={{ padding: "12px 32px", color: ACCENT }}>Y = (A · B)'</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0", "0", "1"],
                    ["0", "1", "1"],
                    ["1", "0", "1"],
                    ["1", "1", "0"],
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
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>2-Input NAND Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  The standard form. <Code>Y = (A · B)'</Code>. It is equivalent to an AND gate followed by a NOT gate.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>3-Input NAND Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Takes three inputs. Output is 0 <em>only</em> if A, B, and C are all 1. <Code>Y = (A · B · C)'</Code>.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Multi-Input NAND Gate</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  For an n-input NAND gate, the output is LOW (0) only when all n inputs are HIGH (1). Unused inputs should be tied to logic HIGH to prevent floating states.
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
                <li><strong>Universal Gate:</strong> Can construct any other logic gate.</li>
                <li><strong>Simplifies Circuits:</strong> Complex expressions can be implemented using only NANDs.</li>
                <li><strong>Low Component Count:</strong> Often reduces the number of gates needed.</li>
                <li><strong>Low Power:</strong> Consumes less power than equivalent arrangements.</li>
              </ul>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>Disadvantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Lack of Flexibility:</strong> NAND-only implementations may not be the most optimized.</li>
                <li><strong>Propagation Delay:</strong> In some complex cascaded designs, delay can increase.</li>
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
                { title: "Universal Gate", desc: "The foundation of any logic circuit, from simple gates to complex ICs." },
                { title: "Arithmetic Logic Units", desc: "Used extensively in ALUs for addition, subtraction, and bitwise operations." },
                { title: "Decoders & Encoders", desc: "Converts binary codes into digital signals and vice-versa." },
                { title: "Multiplexers", desc: "Used to route signals to a single output based on control lines." },
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
              <Link to="/topics/logic-gates/not" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>NOT Gate</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>The inverter</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/logic-gates/nor" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>NOR Gate</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Inverted OR</div>
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