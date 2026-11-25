import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#ec4899'; // Pink accent for the chapter
const SECONDARY = '#8b5cf6'; // Violet secondary

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

export default function FlipFlopsPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Flip-Flops</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#fce7f3", padding: "4px 10px", borderRadius: 999 }}>Sequential Logic</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>
              Flip-Flops
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              The fundamental memory elements of digital circuits. D, T, SR, JK, and Master-Slave configurations.
            </p>
          </header>
        </Reveal>

        {/* 1. D Flip-Flop */}
        <section style={{ marginBottom: 48 }}>
          <Reveal>
            <SectionHeading kicker="01 — Data" title="D Flip-Flop" subtitle="The simplest and most widely used flip-flop — acts as a 1-bit memory cell." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  Also known as the <strong>Data</strong> or <strong>Delay</strong> flip-flop. It captures the value of the D input at the clock edge.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Characteristic Equation:</strong> <Code color={ACCENT}>Q(t+1) = D</Code>
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%" }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 8 }}>
                  <strong>Key characteristics:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    No "invalid" state — unlike the SR flip-flop.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Output Q simply follows D when clocked.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Used heavily in registers, shift registers, and memory.
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. T Flip-Flop */}
        <section style={{ marginBottom: 48 }}>
          <Reveal>
            <SectionHeading kicker="02 — Toggle" title="T Flip-Flop" subtitle="A single-input flip-flop that toggles its output on every clock pulse." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  The <strong>Toggle</strong> flip-flop. When T = 1, the output flips its state. When T = 0, the output holds its previous state.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Characteristic Equation:</strong> <Code color={ACCENT}>Q(t+1) = T ⊕ Q(t)</Code>
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 8 }}>
                  <strong>Key characteristics:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Behaves as a frequency divider (divides clock frequency by 2).
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Used in binary counters and timer circuits.
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* 3. SR Flip-Flop */}
        <section style={{ marginBottom: 48 }}>
          <Reveal>
            <SectionHeading kicker="03 — Set/Reset" title="SR Flip-Flop" subtitle="The basic memory cell that can be Set (1) or Reset (0)." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  Has two inputs: <strong>S</strong> (Set) and <strong>R</strong> (Reset). S = 1 forces Q to 1. R = 1 forces Q to 0.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Characteristic Equation:</strong> <Code color={ACCENT}>Q(t+1) = S + R̄Q(t)</Code>
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 8 }}>
                  <strong>Key characteristics:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    <strong>Invalid State:</strong> When S = 1 and R = 1 simultaneously, the output is unpredictable (race condition).
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%" }} />
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Found in simple debounce circuits and basic latches.
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* 4. JK Flip-Flop */}
        <section style={{ marginBottom: 48 }}>
          <Reveal>
            <SectionHeading kicker="04 — JK" title="JK Flip-Flop" subtitle="The most versatile flip-flop — it solves the SR invalid state." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  Named after Jack Kilby. It functions like an SR flip-flop, but the S=1, R=1 condition is defined as a <strong>Toggle</strong>.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Characteristic Equation:</strong> <Code color={ACCENT}>Q(t+1) = JQ̄(t) + K̄Q(t)</Code>
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 8 }}>
                  <strong>Key characteristics:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    J = 1, K = 0 → Set (Q = 1)
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    J = 0, K = 1 → Reset (Q = 0)
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    J = 1, K = 1 → Toggle (Q flips)
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* 5. Master-Slave Flip-Flop */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="05 — Master-Slave" title="Master-Slave Flip-Flop" subtitle="A two-stage configuration that solves the race-around condition." />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  Consists of two flip-flops in series: a <strong>Master</strong> (first) and a <strong>Slave</strong> (second).
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Clocking:</strong> The Master is active on the positive clock edge; the Slave is active on the negative edge.
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 8 }}>
                  <strong>Key characteristics:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    <strong>Edge-Triggered:</strong> The output changes only on a clock transition.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Eliminates the "race-around" problem found in level-triggered JK flip-flops.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Used in synchronous counters and shift registers.
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* Explore Section */}
        <Reveal>
          <section style={{ marginTop: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Explore</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>Dive into a flip-flop</h2>
            <div style={{ borderTop: "2px solid #0f172a" }}>
              {[
                { id: "d", title: "D Flip-Flop", path: "/topics/flip-flops/d", glyph: "Data", tint: "#3b82f6" },
                { id: "t", title: "T Flip-Flop", path: "/topics/flip-flops/t", glyph: "Toggle", tint: "#10b981" },
                { id: "sr", title: "SR Flip-Flop", path: "/topics/flip-flops/sr", glyph: "Set/Reset", tint: "#f59e0b" },
                { id: "jk", title: "JK Flip-Flop", path: "/topics/flip-flops/jk", glyph: "Universal", tint: "#8b5cf6" },
                { id: "master-slave", title: "Master-Slave Flip-Flop", path: "/topics/flip-flops/master-slave", glyph: "Edge", tint: "#ec4899" },
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