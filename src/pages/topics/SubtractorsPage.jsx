import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#ef4444';
const SECONDARY = '#8b5cf6';

/* ─────────────── scroll reveal hook ─────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* wrapper for reveal-on-scroll */
function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...rest.style,
      }}
    >
      {children}
    </Tag>
  );
}

function Code({ children, color = "#0f172a" }) {
  return (
    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, color, background: "#f1f5f9", padding: "1px 6px", borderRadius: 3 }}>
      {children}
    </code>
  );
}

function FormulaBlock({ label, children, color = ACCENT }) {
  return (
    <div style={{ background: "#0f172a", borderRadius: 4, padding: "18px 22px", marginTop: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color, marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14.5, color: "#fff", lineHeight: 1.9 }}>{children}</div>
    </div>
  );
}

/* Nested bullet list — point with subpoints */
function PointList({ points }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
      {points.map((p, i) => (
        <li key={i} style={{ marginBottom: 12, paddingLeft: 22, position: "relative" }}>
          {/* main bullet dot */}
          <span style={{ position: "absolute", left: 0, top: 9, width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
          <div style={{ fontSize: 14.5, fontWeight: 600, color: "#0f172a", lineHeight: 1.65, marginBottom: p.subs ? 6 : 0 }}>
            {p.text}
          </div>
          {p.subs && (
            <ul style={{ margin: "4px 0 0", paddingLeft: 0, listStyle: "none" }}>
              {p.subs.map((s, j) => (
                <li key={j} style={{ marginBottom: 3, paddingLeft: 20, position: "relative", fontSize: 13.5, lineHeight: 1.7, color: "#475569" }}>
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

function Block({ title, accent, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "22px 26px", marginBottom: 20,
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = "0 8px 24px -12px rgba(0,0,0,0.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8f0"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 14px", color: "#0f172a", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: accent }} />
          {title}
        </h3>
        {children}
      </div>
    </Reveal>
  );
}

export default function SubtractorsPage() {
  /* scroll progress bar */
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fbfbfd", color: "#0f172a", minHeight: "100vh" }}>

      {/* top scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "transparent", zIndex: 50 }}>
        <div style={{ height: "100%", width: `${scrollPct}%`, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, transition: "width 0.1s linear" }} />
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 100px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#94a3b8", marginBottom: 40 }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Subtractors</span>
        </div>

        {/* Masthead */}
        <Reveal>
          <header style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "end", paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>
                Combinational Logic · Theory
              </div>
              <h1 style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.045em", margin: 0 }}>
                Subtractors
                <span style={{ color: ACCENT }}>.</span>
              </h1>
              <div style={{ marginTop: 20, width: 64, height: 4, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, borderRadius: 2 }} />
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
                Theory of the two fundamental subtraction circuits — Half Subtractor and Full Subtractor. Equations, trade-offs, and where each is used.
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                Theory · equations · pros &amp; cons · applications
              </p>
            </div>
          </header>
        </Reveal>

        {/* ── HALF SUBTRACTOR ── */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>
              01 — Half Subtractor
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
              The Half Subtractor
            </h2>
            <p style={{ fontSize: 14.5, color: "#64748b", margin: "0 0 24px", maxWidth: 660, lineHeight: 1.65 }}>
              A combinational circuit that subtracts one single bit from another.
            </p>
          </Reveal>

          <Block title="What it is" accent={ACCENT}>
            <PointList points={[
              { text: <>A <strong>half subtractor</strong> is a combinational logic circuit that subtracts one single bit (B) from another (A) and produces a <strong>Difference</strong> and a <strong>Borrow</strong>.</> },
              { text: <>It has <strong>2 inputs</strong> and <strong>2 outputs</strong>.</>, subs: [
                "A = minuend (the number being subtracted from)",
                "B = subtrahend (the number being subtracted)",
                "D = difference output",
                <>B<sub>out</sub> = borrow output</>,
              ] },
              { text: <>Called "half" because it can subtract only two bits.</>, subs: [
                "It cannot accept a borrow from a previous (less significant) stage.",
                "Hence it cannot be chained directly.",
              ] },
              { text: <>Built from exactly <strong>2 gates</strong>.</>, subs: [
                "One XOR gate produces the Difference",
                <>One AND (with inverted A) produces the Borrow (<Code>Ā·B</Code>)</>,
              ] },
              { text: <>Performs the arithmetic operation <Code>A − B</Code>.</> },
            ]} />
            <FormulaBlock label="Equations">
              D = A ⊕ B&nbsp;&nbsp;&nbsp;&nbsp;B<sub>out</sub> = Ā · B
            </FormulaBlock>
          </Block>

          <Block title="Key properties" accent={ACCENT} delay={80}>
            <PointList points={[
              { text: <>Difference is HIGH when exactly one input is HIGH.</>, subs: [
                "This is pure XOR behaviour — identical to the half adder's Sum.",
                "D = 1 when (A,B) = (0,1) or (1,0).",
              ] },
              { text: <>Borrow is HIGH only when A = 0 and B = 1.</>, subs: [
                "That's the case where you must borrow from the next higher bit.",
                <>B<sub>out</sub> formula is <Code>Ā·B</Code> — note the <em>inverted</em> A.</>,
              ] },
              { text: <>No borrow-in terminal — cannot be directly chained.</> },
              { text: <>Same XOR as the half adder, but different borrow gate.</>, subs: [
                <>Half adder uses AND: <Code>A·B</Code></>,
                <>Half subtractor uses NOT-AND: <Code>Ā·B</Code></>,
              ] },
              { text: <>Fastest possible single-bit subtraction.</>, subs: [
                "One gate delay per output.",
                "Smallest area and lowest power of any subtractor.",
              ] },
            ]} />
          </Block>

          <Reveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4, padding: "18px 22px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#16a34a", marginBottom: 10 }}>Advantages</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.9, color: "#334155" }}>
                  <li>Minimal — only 2 gates.</li>
                  <li>Fastest possible single-bit subtraction.</li>
                  <li>Very small silicon area and low power.</li>
                  <li>Foundation for the full subtractor.</li>
                </ul>
              </div>
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "18px 22px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#dc2626", marginBottom: 10 }}>Disadvantages</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.9, color: "#334155" }}>
                  <li>No borrow-in — cannot chain.</li>
                  <li>Cannot handle multi-bit numbers.</li>
                  <li>Unsigned-only — wrong result if A &lt; B.</li>
                  <li>Rarely useful on its own.</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Block title="Applications" accent={ACCENT} delay={160}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "LSB stage of a ripple-borrow subtractor",
                "Comparator lower-bit stages",
                "Magnitude difference circuits",
                "Half of a full subtractor",
                "Small embedded arithmetic units",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 13, padding: "6px 12px", background: "#f8fafc", border: "1px solid #e8e8f0", borderRadius: 999, color: "#475569", fontWeight: 500 }}>{a}</span>
              ))}
            </div>
          </Block>
        </section>

        {/* ── FULL SUBTRACTOR ── */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: SECONDARY, marginBottom: 6 }}>
              02 — Full Subtractor
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
              The Full Subtractor
            </h2>
            <p style={{ fontSize: 14.5, color: "#64748b", margin: "0 0 24px", maxWidth: 660, lineHeight: 1.65 }}>
              A combinational circuit that subtracts B and a borrow-in from A.
            </p>
          </Reveal>

          <Block title="What it is" accent={SECONDARY}>
            <PointList points={[
              { text: <>A <strong>full subtractor</strong> subtracts <strong>three single bits</strong> and produces a Difference and a Borrow-out.</> },
              { text: <>It has <strong>3 inputs</strong> and <strong>2 outputs</strong>.</>, subs: [
                "A = minuend",
                "B = subtrahend",
                <>B<sub>in</sub> = borrow-in from previous stage</>,
                <>D = difference output</>,
                <>B<sub>out</sub> = borrow-out to next stage</>,
              ] },
              { text: <>The borrow-in terminal is what makes multi-bit subtraction possible.</> },
              { text: <>Built from <strong>two half subtractors + one OR gate</strong>.</>, subs: [
                "Total of 7 gates: 2 XOR + 2 AND + 2 NOT + 1 OR",
                "Can also be built as a full adder with inverted B and B<sub>in</sub>",
              ] },
              { text: <>Performs the arithmetic operation <Code>A − B − B<sub>in</sub></Code>.</> },
            ]} />
            <FormulaBlock label="Equations" color={SECONDARY}>
              D = A ⊕ B ⊕ B<sub>in</sub><br />
              B<sub>out</sub> = Ā·B + Ā·B<sub>in</sub> + B·B<sub>in</sub>
            </FormulaBlock>
          </Block>

          <Block title="Key properties" accent={SECONDARY} delay={80}>
            <PointList points={[
              { text: <>Difference is HIGH when an <strong>odd</strong> number of inputs are HIGH.</>, subs: [
                "Same three-way XOR behaviour as the full adder's Sum.",
                "Parity-based — odd count of 1s → D = 1.",
              ] },
              { text: <>Borrow-out is HIGH when the arithmetic result is negative.</>, subs: [
                "Happens when A < B + B<sub>in</sub> in unsigned arithmetic.",
                "Indicates that a borrow from the next stage was necessary.",
              ] },
              { text: <>Accepts a borrow-in — fully chainable.</>, subs: [
                "Chain N stages to subtract two N-bit numbers",
                "Forms the ripple-borrow subtractor",
              ] },
              { text: <>Equivalent to a full adder with inverted subtrahend.</>, subs: [
                <>Replace B with B̄ and B<sub>in</sub> with <Code>B̄<sub>in</sub></Code></>,
                "Very useful for reusing adder hardware in ALUs",
              ] },
              { text: <>B<sub>out</sub> is symmetric in B and B<sub>in</sub>.</>, subs: [
                <>Formula: <Code>ĀB + ĀB<sub>in</sub> + B·B<sub>in</sub></Code></>,
                "Swapping B and B<sub>in</sub> leaves the expression unchanged.",
              ] },
            ]} />
          </Block>

          <Reveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4, padding: "18px 22px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#16a34a", marginBottom: 10 }}>Advantages</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.9, color: "#334155" }}>
                  <li>Accepts borrow-in — chainable.</li>
                  <li>Enables N-bit subtraction.</li>
                  <li>Foundation of ALU subtract paths.</li>
                  <li>Works with signed numbers via 2's complement.</li>
                </ul>
              </div>
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "18px 22px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#dc2626", marginBottom: 10 }}>Disadvantages</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.9, color: "#334155" }}>
                  <li>Larger than a half subtractor — 7 gates.</li>
                  <li>Ripple-borrow delay grows with bit-width.</li>
                  <li>Each stage waits for the previous borrow.</li>
                  <li>Rarely built directly — usually derived from an adder.</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Block title="Applications" accent={SECONDARY} delay={160}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "N-bit ripple-borrow subtractors",
                "Arithmetic Logic Units",
                "Address-comparison circuits",
                "Loop counters and decrementers",
                "Signed magnitude arithmetic",
                "BCD subtraction",
                "Digital control subtract paths",
                "FPGA arithmetic slices",
              ].map((a, i) => (
                <span key={i} style={{ fontSize: 13, padding: "6px 12px", background: "#f8fafc", border: "1px solid #e8e8f0", borderRadius: 999, color: "#475569", fontWeight: 500 }}>{a}</span>
              ))}
            </div>
          </Block>
        </section>

        {/* ── AT A GLANCE ── */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>
              03 — At a glance
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Half vs Full
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 12, padding: "12px 22px", background: "#0f172a", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8" }}>
                <div>Property</div>
                <div style={{ color: ACCENT }}>Half Subtractor</div>
                <div style={{ color: SECONDARY }}>Full Subtractor</div>
              </div>
              {[
                ["Inputs",            "2 (A, B)",          "3 (A, B, Bin)"],
                ["Outputs",           "2 (D, Bout)",       "2 (D, Bout)"],
                ["Borrow-in",         "No",                "Yes"],
                ["Gates used",        "2 (XOR + NOT-AND)", "7 (2 XOR + 2 AND + 2 NOT + OR)"],
                ["Chainable",         "No",                "Yes"],
                ["Subtracts",         "2 bits",            "3 bits"],
                ["Building block of", "Full subtractor",   "Ripple-borrow subtractors"],
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 12, padding: "11px 22px", borderBottom: i < 6 ? "1px solid #f1f5f9" : "none", alignItems: "center" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>{row[0]}</div>
                  <div style={{ fontSize: 13, color: "#475569" }}>{row[1]}</div>
                  <div style={{ fontSize: 13, color: "#475569" }}>{row[2]}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── EXPLORE ── */}
        <section>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Explore</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>Dive into a circuit</h2>
          </Reveal>
          <div style={{ borderTop: "2px solid #0f172a" }}>
            {[
              { id: "half-sub", title: "Half Subtractor", path: "/topics/subtractors/half-sub", glyph: "2-bit", tint: ACCENT },
              { id: "full-sub", title: "Full Subtractor", path: "/topics/subtractors/full-sub", glyph: "3-bit", tint: SECONDARY },
            ].map((t, i) => (
              <Link
                key={t.id}
                to={t.path}
                style={{
                  display: "grid", gridTemplateColumns: "60px 1fr auto 24px", alignItems: "center", gap: 20,
                  padding: "18px 8px", borderBottom: "1px solid #e8e8f0", textDecoration: "none", color: "#0f172a",
                  transition: "background 0.15s, padding-left 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f8f8fc"; e.currentTarget.style.paddingLeft = "16px"; }}
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
      </div>
    </div>
  );
}