import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#0ea5e9'; // Sky blue accent for the chapter
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

export default function CountersPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Counters</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, background: "#e0f2fe", padding: "4px 10px", borderRadius: 999 }}>Sequential Logic</span>
            </div>
            <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 16px", color: "#0f172a" }}>
              Counters
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475569", margin: 0, maxWidth: 700 }}>
              Synchronous and asynchronous up, down, and up-down counters, plus ring, Johnson, and mod counters.
            </p>
          </header>
        </Reveal>

        {/* 1. SYNCHRONOUS vs ASYNCHRONOUS */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="01 — The Core Split" title="Synchronous vs. Asynchronous" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 16, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 6 }}>Synchronous Counters</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    All flip-flops share the <strong>same clock signal</strong>.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Faster operation; no ripple delay.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    More complex combinational logic to handle the next state.
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 6 }}>Asynchronous (Ripple) Counters</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    The clock is applied only to the <strong>first flip-flop</strong>.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Subsequent flip-flops are clocked by the output of the previous stage.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Suffer from <strong>propagation delay</strong> (ripple effect).
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* 2. UP AND DOWN COUNTERS */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="02 — Direction" title="Up, Down, and Up-Down" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Up Counter:</strong> Counts upwards (000 → 001 → 010 ...). 
                </div>
              </li>
              <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Down Counter:</strong> Counts downwards (111 → 110 → 101 ...).
                </div>
              </li>
              <li style={{ marginBottom: 0, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65 }}>
                  <strong>Up-Down Counter:</strong> Has a control input (e.g., M) to switch direction.
                </div>
                <ul style={{ margin: "6px 0 0", paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    When M = 0, it counts Up. When M = 1, it counts Down (or vice-versa).
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </section>

        {/* 3. SPECIALIZED COUNTERS */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <SectionHeading kicker="03 — Specialized" title="Ring, Johnson, and Mod Counters" />
          </Reveal>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              
              {/* Ring */}
              <li style={{ marginBottom: 20, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 6 }}>Ring Counter</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    A shift register where the output of the last flip-flop loops back to the first.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Only one flip-flop is HIGH (1) at a time (e.g., 1000 → 0100 → 0010 → 0001).
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    For N flip-flops, it has N states (Mod-N).
                  </li>
                </ul>
              </li>

              {/* Johnson */}
              <li style={{ marginBottom: 20, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 6 }}>Johnson (Twisted Ring) Counter</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Like a ring counter, but the <strong>inverted</strong> output (Q̄) of the last stage loops back.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%" }} />
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    For N flip-flops, it has 2N states (e.g., 0000 → 1000 → 1100 → 1110 → 1111 → 0111...).
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Provides high-speed decoding due to the overlapping sequence.
                  </li>
                </ul>
              </li>

              {/* Mod */}
              <li style={{ paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: 6 }}>Mod Counter (Modulo-N)</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    A counter that counts from 0 to N-1, then resets to 0 (e.g., Mod-10 counts 0 to 9).
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Often built by cascading standard counters and using reset logic when the final state is reached.
                  </li>
                  <li style={{ marginBottom: 4, paddingLeft: 20, position: "relative", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    <span style={{ position: "absolute", left: 4, top: 10, width: 4, height: 4, borderRadius: "50%", background: "#cbd5e1" }} />
                    Used in digital clocks, timers, and frequency dividers.
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
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>Dive into a counter</h2>
            <div style={{ borderTop: "2px solid #0f172a" }}>
              {[
                { id: "sync-up", title: "Synchronous Up Counter", path: "/topics/counters/sync-up", glyph: "Sync↑", tint: "#3b82f6" },
                { id: "sync-down", title: "Synchronous Down Counter", path: "/topics/counters/sync-down", glyph: "Sync↓", tint: "#3b82f6" },
                { id: "async-up", title: "Asynchronous Up Counter", path: "/topics/counters/async-up", glyph: "Async↑", tint: "#ef4444" },
                { id: "async-down", title: "Asynchronous Down Counter", path: "/topics/counters/async-down", glyph: "Async↓", tint: "#ef4444" },
                { id: "sync-updown", title: "Synchronous Up-Down Counter", path: "/topics/counters/sync-updown", glyph: "Sync↕", tint: "#3b82f6" },
                { id: "async-updown", title: "Asynchronous Up-Down Counter", path: "/topics/counters/async-updown", glyph: "Async↕", tint: "#ef4444" },
                { id: "ring", title: "Ring Counter", path: "/topics/counters/ring", glyph: "Ring", tint: "#10b981" },
                { id: "johnson", title: "Johnson Counter", path: "/topics/counters/johnson", glyph: "Twist", tint: "#8b5cf6" },
                { id: "mod", title: "Mod Counter", path: "/topics/counters/mod", glyph: "Mod-N", tint: "#f59e0b" },
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