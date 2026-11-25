import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#10b981'; // Emerald green accent for the chapter
const SECONDARY = '#3b82f6'; // Blue secondary

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

/* ─────────────── Main Page Component ─────────────── */
export default function PLDPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Programmable Logic Devices</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#d1fae5", padding: "4px 10px", borderRadius: 999 }}>Programmable Logic</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>
              Programmable Logic Devices
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Integrated circuits that can be programmed to implement custom digital logic functions. Focusing on PLA and PAL architectures.
            </p>
          </header>
        </Reveal>

        {/* 1. PLA */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="01 — Architecture" title="PLA (Programmable Logic Array)" subtitle="The most flexible PLD, where both the AND plane and the OR plane are programmable." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Fully Programmable:</strong> Both the AND array (which forms the product terms) and the OR array (which sums them) can be programmed by the user.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Implementation:</strong> Directly implements Sum-of-Products (SOP) Boolean expressions.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Flexibility:</strong> Highly flexible — ideal for implementing custom logic functions with many arbitrary product terms.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Speed:</strong> Slightly slower than PAL due to the extra programmable connections in the OR plane.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Cost:</strong> More expensive to manufacture than PAL due to higher complexity.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. PAL */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Architecture" title="PAL (Programmable Array Logic)" subtitle="A more cost-effective PLD where only the AND plane is programmable." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: SECONDARY }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Half-Programmable:</strong> Only the AND array is programmable. The OR array has fixed connections.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: SECONDARY }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Implementation:</strong> Each OR gate is hardwired to a fixed number of product terms (e.g., 4 or 8).
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: SECONDARY }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Limitations:</strong> Not every SOP expression can be implemented if it requires more product terms than the fixed OR gate allows.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: SECONDARY }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Speed:</strong> Faster than PLA because the fixed OR plane has lower capacitance and less routing delay.
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: SECONDARY }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Cost:</strong> Cheaper and easier to manufacture, making it the most common PLD architecture for simple logic.
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 3. Comparison */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Comparison" title="PLA vs. PAL" />
          </Reveal>
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#fff" }}>
                    <th style={{ padding: "16px", fontWeight: 700 }}>Feature</th>
                    <th style={{ padding: "16px", fontWeight: 700, color: ACCENT }}>PLA (Programmable Logic Array)</th>
                    <th style={{ padding: "16px", fontWeight: 700, color: SECONDARY }}>PAL (Programmable Array Logic)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Programmability", "Both AND and OR planes programmable", "Only AND plane programmable"],
                    ["Flexibility", "High — handles arbitrary SOP expressions", "Moderate — limited by fixed OR gates"],
                    ["Speed", "Slower", "Faster"],
                    ["Cost", "Higher", "Lower"],
                    ["Complexity", "Higher (more programmable points)", "Lower (fixed connections)"],
                    ["Common Use", "Complex custom logic, legacy designs", "Simple, high-volume logic replacement"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #e2e8f0", background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      <td style={{ padding: "16px", fontWeight: 600, color: "#0f172a" }}>{row[0]}</td>
                      <td style={{ padding: "16px", color: "#475569" }}>{row[1]}</td>
                      <td style={{ padding: "16px", color: "#475569" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Explore Section */}
        <Reveal>
          <section style={{ marginTop: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Explore</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>Dive into a PLD</h2>
            <div style={{ borderTop: "2px solid #0f172a" }}>
              {[
                { id: "pla", title: "PLA – Programmable Logic Array", path: "/topics/pld/pla", glyph: "Both", tint: ACCENT },
                { id: "pal", title: "PAL – Programmable Array Logic", path: "/topics/pld/pal", glyph: "AND Only", tint: SECONDARY },
              ].map((t, i) => (
                <Link
                  key={t.id}
                  to={t.path}
                  style={{
                    display: "grid", gridTemplateColumns: "60px 1fr auto 24px", alignItems: "center", gap: 20,
                    padding: "18px 8px", borderBottom: "1px solid #e8e8f0", textDecoration: "none", color: "#0f172a",
                    transition: "background 0.15s, padding-left 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.paddingLeft = "16px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "8px"; }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: t.tint }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{t.title}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#94a3b8", padding: "3px 10px", border: "1px solid #e2e8f0", borderRadius: 3 }}>{t.glyph}</span>
                  <span style={{ fontSize: 16, color: "#cbd5e1", textAlign: "right" }}>→</span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

      </div>
    </div>
  );
}