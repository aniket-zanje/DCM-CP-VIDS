import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#8b5cf6';
const SECONDARY = '#3b82f6';

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

function PointList({ points }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
      {points.map((p, i) => (
        <li key={i} style={{ marginBottom: 12, paddingLeft: 22, position: "relative" }}>
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

export default function FullAdderPage() {
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
          <Link to="/topics/adders" style={{ color: "#94a3b8", textDecoration: "none" }}>Adders</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Full Adder</span>
        </div>

        {/* Masthead */}
        <Reveal>
          <header style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "end", paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>
                Combinational Logic · Theory
              </div>
              <h1 style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.045em", margin: 0 }}>
                Full
                <br />
                Adder
                <span style={{ color: ACCENT }}>.</span>
              </h1>
              <div style={{ marginTop: 20, width: 64, height: 4, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, borderRadius: 2 }} />
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
                A combinational circuit that adds three single bits — two operands and a carry-in — producing a Sum and a Carry-out. The foundation of every multi-bit adder.
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                Theory · equations · pros &amp; cons · applications
              </p>
            </div>
          </header>
        </Reveal>

        {/* ── THEORY ── */}
        <section style={{ marginBottom: 48 }}>
          <Block title="What it is" accent={ACCENT}>
            <PointList points={[
              { text: <>A <strong>full adder</strong> is a combinational logic circuit that adds <strong>three single bits</strong> and produces a Sum and a Carry-out.</> },
              { text: <>It has <strong>3 inputs</strong> and <strong>2 outputs</strong>.</>, subs: [
                "A = first operand bit",
                "B = second operand bit",
                <>C<sub>in</sub> = carry-in from the previous (less significant) stage</>,
                "S = sum output",
                <>C<sub>out</sub> = carry-out to the next (more significant) stage</>,
              ] },
              { text: <>The extra carry-in terminal is what makes multi-bit addition possible.</>, subs: [
                <>Without C<sub>in</sub>, it would just be a half adder.</>,
                "Chain N full adders to add two N-bit numbers.",
              ] },
              { text: <>Built from <strong>two half adders + one OR gate</strong>.</>, subs: [
                "Total of 5 gates: 2 XOR + 2 AND + 1 OR",
                "First half adder adds A and B",
                <>Second half adder adds that Sum with C<sub>in</sub></>,
                "The two carries are OR'd to produce the final carry-out",
              ] },
              { text: <>Performs the arithmetic operation <Code>A + B + C<sub>in</sub></Code>.</> },
            ]} />
            <FormulaBlock label="Equations">
              S = A ⊕ B ⊕ C<sub>in</sub><br />
              C<sub>out</sub> = A·B + B·C<sub>in</sub> + A·C<sub>in</sub>
            </FormulaBlock>
          </Block>
        </section>

        {/* ── KEY PROPERTIES ── */}
        <section style={{ marginBottom: 48 }}>
          <Block title="Key properties" accent={ACCENT} delay={80}>
            <PointList points={[
              { text: <>Sum is HIGH when an <strong>odd</strong> number of inputs are HIGH.</>, subs: [
                "This is three-way XOR behaviour — odd parity.",
                "S = 1 when the input has 1 or 3 ones.",
              ] },
              { text: <>Carry-out is HIGH when <strong>two or more</strong> inputs are HIGH.</>, subs: [
                "This is a majority function.",
                <>Formula: <Code>AB + BC<sub>in</sub> + AC<sub>in</sub></Code></>,
                "Three product terms — each covers one way to have two inputs HIGH.",
              ] },
              { text: <>Accepts a carry-in — fully chainable.</>, subs: [
                "Chain N stages to add two N-bit numbers",
                "Forms the ripple-carry adder",
              ] },
              { text: <>Universal building block of ALU arithmetic.</>, subs: [
                "Every CPU adder tree is built from full adders",
                "Also used in multipliers, dividers, and accumulators",
              ] },
              { text: <>Can perform subtraction when paired with inversion.</>, subs: [
                <>A − B = A + B̄ + 1 (2's complement)</>,
                "Feed B through NOT gates and set C<sub>in</sub> = 1",
              ] },
            ]} />
          </Block>
        </section>

        {/* ── PROS & CONS ── */}
        <Reveal delay={120}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4, padding: "18px 22px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#16a34a", marginBottom: 10 }}>Advantages</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.9, color: "#334155" }}>
                <li>Accepts carry-in — chainable.</li>
                <li>Enables N-bit addition.</li>
                <li>Foundation of every ALU data path.</li>
                <li>Works with signed numbers via 2's complement.</li>
              </ul>
            </div>
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "18px 22px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#dc2626", marginBottom: 10 }}>Disadvantages</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.9, color: "#334155" }}>
                <li>Larger than a half adder — 5 gates.</li>
                <li>Ripple-carry delay grows linearly with bit-width.</li>
                <li>Each stage waits for the previous carry.</li>
                <li>Lookahead variants needed for speed.</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ── APPLICATIONS ── */}
        <section style={{ marginBottom: 48 }}>
          <Block title="Applications" accent={ACCENT} delay={160}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "N-bit ripple-carry adders",
                "Arithmetic Logic Units",
                "CPU address generation",
                "Multipliers and dividers",
                "Subtractors (adder + NOT)",
                "BCD arithmetic",
                "DSP accumulators",
                "Digital counters",
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
              At a glance
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Full Adder summary
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 12, padding: "12px 22px", background: "#0f172a", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8" }}>
                <div>Property</div>
                <div style={{ color: ACCENT }}>Value</div>
              </div>
              {[
                ["Inputs",            "3 (A, B, Cin)"],
                ["Outputs",           "2 (S, Cout)"],
                ["Carry-in",          "Yes"],
                ["Gates used",        "5 (2 XOR + 2 AND + 1 OR)"],
                ["Chainable",         "Yes"],
                ["Adds",              "3 bits"],
                ["Building block of", "Ripple-carry adders"],
                ["Sum logic",         "3-way XOR (odd parity)"],
                ["Carry logic",       "Majority (2+ inputs HIGH)"],
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 12, padding: "11px 22px", borderBottom: i < 8 ? "1px solid #f1f5f9" : "none", alignItems: "center" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>{row[0]}</div>
                  <div style={{ fontSize: 13, color: "#475569" }}>{row[1]}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── EXPLORE ── */}
        {/* ── EXPLORE ── */}
<section>
  <Reveal>
    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>Explore</div>
    <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px" }}>Related circuits</h2>
  </Reveal>
  <div style={{ borderTop: "2px solid #0f172a" }}>
    {[
      { id: "half-adder", title: "Half Adder", path: "/topics/adders/half-adder", glyph: "2-bit", tint: "#3b82f6" },
      { id: "full-adder", title: "Full Adder", path: "/topics/adders/full-adder", glyph: "3-bit", tint: "#8b5cf6" },
      { id: "half-sub", title: "Half Subtractor", path: "/topics/subtractors/half-sub", glyph: "2-bit", tint: "#ef4444" },
      { id: "full-sub", title: "Full Subtractor", path: "/topics/subtractors/full-sub", glyph: "3-bit", tint: "#ec4899" },
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