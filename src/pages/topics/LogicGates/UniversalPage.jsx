import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#14b8a6'; // Teal accent for Universal Gates
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

/* ─────────────── Main Page ─────────────── */
export default function UniversalPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Universal Gates</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#ccfbf1", padding: "4px 10px", borderRadius: 999 }}>Logic Gates</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>Universal Gates</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              The NAND and NOR gates are functionally complete. Any Boolean function can be constructed using only these two gates.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="01 — The Concept" title="What makes a gate Universal?" /></Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Definition</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  A logic gate is <strong>universal</strong> if it can be used to construct all other basic logic gates (AND, OR, NOT). If you can build those three, you can build any digital circuit.
                </div>
              </li>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>The Two Universal Gates</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  Only two gates are universal: <strong>NAND</strong> (NOT-AND) and <strong>NOR</strong> (NOT-OR).
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 4 }}>Why is this important?</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                  It simplifies manufacturing. Instead of fabricating many different gate types on a chip, a factory can mass-produce only NAND or only NOR gates and still build entire processors.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. NAND as Universal */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Proof" title="Building Basic Gates with NAND" subtitle="How to make NOT, AND, and OR using only NAND gates." />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>NOT Gate</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>Tie both NAND inputs together.</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a", fontWeight: 700 }}>Y = (A · A)' = A'</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>AND Gate</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>NAND followed by a NAND-inverter.</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a", fontWeight: 700 }}>Y = ((A · B)')'</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>OR Gate</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>Invert A and B, then NAND them (De Morgan).</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a", fontWeight: 700 }}>Y = (A' · B')'</div>
              </div>
            </div>
          </Card>
        </section>

        {/* 3. NOR as Universal */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Proof" title="Building Basic Gates with NOR" subtitle="How to make NOT, AND, and OR using only NOR gates." />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>NOT Gate</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>Tie both NOR inputs together.</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a", fontWeight: 700 }}>Y = (A + A)' = A'</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>OR Gate</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>NOR followed by a NOR-inverter.</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a", fontWeight: 700 }}>Y = ((A + B)')'</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>AND Gate</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>Invert A and B, then NOR them (De Morgan).</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a", fontWeight: 700 }}>Y = (A' + B')'</div>
              </div>
            </div>
          </Card>
        </section>

        {/* 4. Summary Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Summary" title="Quick Comparison" />
          </Reveal>
          <Card>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#0f172a", color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700 }}>Desired Gate</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700 }}>NAND Implementation</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700 }}>NOR Implementation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["NOT", "A NAND A", "A NOR A"],
                  ["AND", "(A NAND B) NAND (A NAND B)", "(A NOR A) NOR (B NOR B)"],
                  ["OR",  "(A NAND A) NAND (B NAND B)", "(A NOR B) NOR (A NOR B)"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #e2e8f0", background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#0f172a" }}>{row[0]}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#475569", fontSize: 13 }}>{row[1]}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#475569", fontSize: 13 }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* 5. Pros & Cons */}
        <section style={{ marginBottom: 56 }}>
          <Reveal><SectionHeading kicker="05 — Evaluation" title="Advantages & Disadvantages" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card delay={100}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#16a34a", marginBottom: 12 }}>Advantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Manufacturing:</strong> Simplifies IC fabrication (only need one gate type).</li>
                <li><strong>Flexibility:</strong> Can implement any logic function.</li>
                <li><strong>Cost-Effective:</strong> Reduces the variety of components needed.</li>
              </ul>
            </Card>
            <Card delay={200}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", marginBottom: 12 }}>Disadvantages</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                <li><strong>Gate Count:</strong> Sometimes requires more gates than using mixed logic.</li>
                <li><strong>Propagation Delay:</strong> Cascading gates can slow down the circuit.</li>
                <li><strong>Design Complexity:</strong> Converting to universal-gate-only designs can be tedious.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Navigation Row */}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60, borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Previous Concept</div>
              <Link to="/topics/logic-gates/xnor" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a" }}>
                <span style={{ fontSize: 24, color: "#cbd5e1" }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>XNOR Gate</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Equality detector</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Next Concept</div>
              <Link to="/topics/boolean-algebra" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#0f172a", justifyContent: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Boolean Algebra</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Laws & Identities</div>
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