import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import image from './image.png'

const ACCENT = '#8b5cf6'; // Violet
const SECONDARY = '#3b82f6'; // Blue

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
function Code({ children }) {
  return <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4, color: "#0f172a" }}>{children}</code>;
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

function PointList({ points }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
      {points.map((p, i) => (
        <li key={i} style={{ marginBottom: 14, paddingLeft: 24, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: p.subs ? 8 : 0 }}>{p.text}</div>
          {p.subs && (
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              {p.subs.map((s, j) => (
                <li key={j} style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                  <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function Card({ children, delay = 0, noPadding = false }) {
  return (
    <Reveal delay={delay}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: noPadding ? 0 : "28px 32px", marginBottom: 24, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
        {children}
      </div>
    </Reveal>
  );
}

/* ─────────────── Main Page Component ─────────────── */
export default function BCDAdderPage() {
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
          <Link to="/topics/adders" style={{ color: "#94a3b8", textDecoration: "none" }}>Adders</Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>BCD Adder</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#f3e8ff", padding: "4px 10px", borderRadius: 999 }}>Combinational Logic</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>
              BCD Adder
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Adds two BCD digits and corrects invalid sums by adding 6 (0110). Built from two 4-bit binary adders.
            </p>
          </header>
        </Reveal>

        {/* 1. Theory */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="01 — Theory" title="How the BCD Adder Works" />
          </Reveal>
          <Card>
           <PointList points={[
  { text: <>A <strong>BCD adder</strong> adds two 4-bit BCD digits and produces a valid BCD result (0–9 plus a carry).</> },
  { text: <>BCD uses only 10 of the 16 possible 4-bit combinations (0000–1001). The remaining six (1010–1111) are invalid.</>, subs: ["Each decimal digit 0–9 is encoded as a 4-bit nibble.", "Two digits plus a carry-in can sum to between 0 and 19."] },
  { text: <>The first binary adder produces a 5-bit result: Carry (K) + 4-bit Sum (S₃ S₂ S₁ S₀).</> },
  { text: <>When is Correction Required? (Err = 1)</>, subs: [
    "Case 1 — Sum ≤ 9 and K = 0: The result is a valid BCD digit. No correction needed.",
    "Case 2 — Sum > 9 (Sum is 10 to 15): The 4-bit sum is an invalid BCD code (1010–1111). Correction is required.",
    "Case 3 — K = 1: A carry-out occurred, meaning the true sum is 16 or more. Correction is required."
  ] },
  { text: <>The Correction Condition (When to add 6):</>, subs: [
    "Err = K + S₃S₂ + S₃S₁",
    "If K = 1 (carry occurred), add 6.",
    "If S₃ = 1 and S₂ = 1 (sum is 12, 13, 14, or 15), add 6.",
    "If S₃ = 1 and S₁ = 1 (sum is 10, 11, 14, or 15), add 6.",
    "Adding 6 skips the six invalid states and generates the correct BCD digit plus the final carry."
  ] },
  { text: <>Hardware Implementation:</>, subs: [
    "First 4-bit adder: Computes A + B + Cin.",
    "Correction logic: Generates the +6 control signal (Err).",
    "Second 4-bit adder: Adds the first sum + 0000 (no correction) or 0110 (+6)."
  ] },
]} />
          </Card>
        </section>

        {/* 2. Correction Table */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Truth Table" title="When is Correction Required?" />
          </Reveal>
          <Card noPadding>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#fff" }}>
                    <th style={{ padding: "16px", fontWeight: 700, borderRight: "1px solid #1e293b" }}>Decimal</th>
                    <th style={{ padding: "16px", fontWeight: 700, borderRight: "1px solid #1e293b" }}>K (Cout)</th>
                    <th style={{ padding: "16px", fontWeight: 700, borderRight: "1px solid #1e293b" }}>S₃</th>
                    <th style={{ padding: "16px", fontWeight: 700, borderRight: "1px solid #1e293b" }}>S₂</th>
                    <th style={{ padding: "16px", fontWeight: 700, borderRight: "1px solid #1e293b" }}>S₁</th>
                    <th style={{ padding: "16px", fontWeight: 700, borderRight: "1px solid #1e293b" }}>S₀</th>
                    <th style={{ padding: "16px", fontWeight: 700, color: ACCENT }}>Err (Correct?)</th>
                  </tr>
                </thead>
                <tbody>
                  {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((n, i) => {
                    const k = n >= 16 ? 1 : 0;
                    const b = (n % 16).toString(2).padStart(4, "0");
                    const s3 = b[0], s2 = b[1], s1 = b[2], s0 = b[3];
                    const err = (n > 9) ? 1 : 0;
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0", background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                        <td style={{ padding: "12px", fontWeight: 600, color: "#475569", borderRight: "1px solid #e2e8f0" }}>{n}</td>
                        <td style={{ padding: "12px", color: k ? ACCENT : "#64748b", fontWeight: k ? 700 : 400, borderRight: "1px solid #e2e8f0" }}>{k}</td>
                        <td style={{ padding: "12px", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{s3}</td>
                        <td style={{ padding: "12px", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{s2}</td>
                        <td style={{ padding: "12px", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{s1}</td>
                        <td style={{ padding: "12px", color: "#475569", borderRight: "1px solid #e2e8f0" }}>{s0}</td>
                        <td style={{ padding: "12px", fontWeight: 800, color: err === 1 ? ACCENT : "#cbd5e1" }}>{err}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 3. K-Map */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — K-Map" title="Simplifying the Correction Signal" />
          </Reveal>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg viewBox="0 0 300 260" style={{ width: "100%", maxWidth: 300 }}>
                  {/* Headers */}
                  <text x={45} y={25} fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">S₃S₂ \ S₁S₀</text>
                  <text x={100} y={25} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">00</text>
                  <text x={150} y={25} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">01</text>
                  <text x={200} y={25} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">11</text>
                  <text x={250} y={25} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">10</text>
                  
                  <text x={40} y={70} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">00</text>
                  <text x={40} y={120} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">01</text>
                  <text x={40} y={170} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">11</text>
                  <text x={40} y={220} textAnchor="middle" fontSize={11} fontWeight={700} fill="#64748b" fontFamily="monospace">10</text>

                  {/* Row 00 */}
                  <rect x={80} y={50} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={100} y={75} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={120} y={50} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={140} y={75} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={160} y={50} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={180} y={75} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={200} y={50} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={220} y={75} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>

                  {/* Row 01 */}
                  <rect x={80} y={90} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={100} y={115} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={120} y={90} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={140} y={115} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={160} y={90} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={180} y={115} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={200} y={90} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={220} y={115} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>

                  {/* Row 11 */}
                  <rect x={80} y={130} width={40} height={40} fill="#f3e8ff" stroke="#cbd5e1" />
                  <text x={100} y={155} textAnchor="middle" fontSize={14} fontWeight={800} fill={ACCENT} fontFamily="monospace">1</text>
                  <rect x={120} y={130} width={40} height={40} fill="#f3e8ff" stroke="#cbd5e1" />
                  <text x={140} y={155} textAnchor="middle" fontSize={14} fontWeight={800} fill={ACCENT} fontFamily="monospace">1</text>
                  <rect x={160} y={130} width={40} height={40} fill="#f3e8ff" stroke="#cbd5e1" />
                  <text x={180} y={155} textAnchor="middle" fontSize={14} fontWeight={800} fill={ACCENT} fontFamily="monospace">1</text>
                  <rect x={200} y={130} width={40} height={40} fill="#f3e8ff" stroke="#cbd5e1" />
                  <text x={220} y={155} textAnchor="middle" fontSize={14} fontWeight={800} fill={ACCENT} fontFamily="monospace">1</text>

                  {/* Row 10 */}
                  <rect x={80} y={170} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={100} y={195} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={120} y={170} width={40} height={40} fill="#fff" stroke="#cbd5e1" />
                  <text x={140} y={195} textAnchor="middle" fontSize={14} fill="#cbd5e1" fontFamily="monospace">0</text>
                  <rect x={160} y={170} width={40} height={40} fill="#f3e8ff" stroke="#cbd5e1" />
                  <text x={180} y={195} textAnchor="middle" fontSize={14} fontWeight={800} fill={ACCENT} fontFamily="monospace">1</text>
                  <rect x={200} y={170} width={40} height={40} fill="#f3e8ff" stroke="#cbd5e1" />
                  <text x={220} y={195} textAnchor="middle" fontSize={14} fontWeight={800} fill={ACCENT} fontFamily="monospace">1</text>

                  {/* Groups */}
                  <rect x={78} y={128} width={164} height={44} fill="none" stroke="#ef4444" strokeWidth={3} rx={4} />
                  <rect x={158} y={128} width={84} height={84} fill="none" stroke="#3b82f6" strokeWidth={3} rx={4} />
                </svg>
              </div>
              <div>
                <div style={{ background: "#0f172a", borderRadius: 8, padding: "24px", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>Simplified Expression</div>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: "#fff", fontWeight: 700 }}>Err = K + S₃S₂ + S₃S₁</code>
                </div>
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 8px", fontSize: 15, color: "#ef4444" }}>Group 1 (Red): S₃S₂</h4>
                  <p style={{ margin: "0 0 16px", fontSize: 14, color: "#475569", lineHeight: 1.6 }}>Row S₃S₂ = 11 (decimal 12-15). All are invalid, giving the term <strong>S₃S₂</strong>.</p>
                  <h4 style={{ margin: "0 0 8px", fontSize: 15, color: "#3b82f6" }}>Group 2 (Blue): S₃S₁</h4>
                  <p style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>Columns S₁S₀ = 11 and 10, where S₃=1. This covers 10, 11, 14, 15. The term is <strong>S₃S₁</strong>.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 4. Hardware Diagram (IMAGE) */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="04 — Hardware" title="The Block Diagram" subtitle="Bit-level wiring of the two 4-bit adders and the correction logic." />
          </Reveal>
          <Card>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
              {/* Assuming the image is in the same folder as this component */}
              <img 
                src={image} 
                alt="BCD Adder Block Diagram" 
                style={{ maxWidth: "100%", height: "auto", display: "block", border: "1px solid #e2e8f0", borderRadius: 4 }} 
              />
            </div>
          </Card>
        </section>

        {/* 5. Pros & Cons */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="05 — Evaluation" title="Advantages & Disadvantages" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Reveal delay={100}>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "28px" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#16a34a", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
                  Advantages
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: "#334155" }}>
                  <li>Produces decimal-correct results directly.</li>
                  <li>No software conversion needed for displays.</li>
                  <li>Chainable for multi-digit BCD numbers.</li>
                  <li>Simple +6 correction is easy to implement.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "28px" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#dc2626", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626" }} />
                  Disadvantages
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: "#334155" }}>
                  <li>Two adders — more gates and area.</li>
                  <li>Slower than plain binary addition.</li>
                  <li>Wastes 6 of 16 codes per digit.</li>
                  <li>Not used in high-speed CPU cores.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. Summary */}
        <section>
          <Reveal>
            <SectionHeading kicker="06 — Summary" title="BCD Adder at a glance" />
          </Reveal>
          <Card noPadding>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Inputs", "Two 4-bit BCD digits + Cin"],
                  ["Outputs", "4-bit BCD digit + Cout"],
                  ["Adders used", "Two 4-bit binary adders"],
                  ["Correction", "+6 (0110) when Err = 1"],
                  ["Correction equation", "Err = K + S₃S₂ + S₃S₁"],
                  ["Chainable", "Yes — cascade for multi-digit"],
                  ["Speed", "Slower than binary adder"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < 6 ? "1px solid #e2e8f0" : "none", background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                    <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 700, color: "#0f172a", width: "40%", borderRight: "1px solid #e2e8f0" }}>{row[0]}</td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#475569" }}>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

      </div>
    </div>
  );
}