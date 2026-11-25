import React from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#06b6d4';
const SECONDARY = '#8b5cf6';

function GateShape({ x, y, type }) {
  const w = 54, h = 36;
  const isAnd = type === "and" || type === "nand";
  const isOr = type === "or" || type === "nor";
  const bubble = type === "nand" || type === "nor";
  const andPath = `M ${x} ${y} L ${x + w * 0.5} ${y} A ${h / 2} ${h / 2} 0 0 1 ${x + w * 0.5} ${y + h} L ${x} ${y + h} Z`;
  const orPath = `M ${x} ${y} Q ${x + w * 0.55} ${y + h / 2} ${x} ${y + h} Q ${x + w * 0.7} ${y + h} ${x + w} ${y + h / 2} Q ${x + w * 0.7} ${y} ${x} ${y} Z`;
  return (
    <g>
      {isOr ? (
        <path d={orPath} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      ) : (
        <path d={andPath} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      )}
      {bubble && <circle cx={x + w + 5} cy={y + h / 2} r={5} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />}
    </g>
  );
}

function Wire({ d }) {
  return <path d={d} fill="none" stroke="#94a3b8" strokeWidth="1.5" />;
}

function Label({ x, y, text, color = "#475569" }) {
  return (
    <text x={x} y={y} fontSize={11} fill={color} fontWeight={700} fontFamily="'JetBrains Mono', monospace">
      {text}
    </text>
  );
}

function GatePanel({ title, label, inputs, gate, output }) {
  const width = 220, height = 100, gateX = 78, gateY = 26, cy = height / 2;
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "12px 14px", flex: "1 1 0", minWidth: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 2 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{label}</div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <Wire d={`M 12 ${cy - 12} L ${gateX} ${cy - 12}`} />
        <Wire d={`M 12 ${cy + 12} L ${gateX} ${cy + 12}`} />
        <GateShape x={gateX} y={gateY + 6} type={gate} />
        <Wire d={`M ${gateX + 64} ${cy} L ${width - 30} ${cy}`} />
        <circle cx={10} cy={cy - 12} r={2.5} fill="#0f172a" />
        <circle cx={10} cy={cy + 12} r={2.5} fill="#0f172a" />
        <Label x={16} y={cy - 20} text={inputs[0]} color="#3b82f6" />
        <Label x={16} y={cy + 26} text={inputs[1]} color="#3b82f6" />
        <Label x={width - 28} y={cy - 8} text={output} color="#10b981" />
      </svg>
    </div>
  );
}

const theorems = [
  {
    n: "01",
    name: "De Morgan's First Theorem",
    expr: "‾(A · B) = Ā + B̄",
    accent: "#ef4444",
    statement: "The complement of an AND is the OR of the complements. A NAND gate is equivalent to an OR gate fed with inverted inputs.",
    proof: "If A and B are both 1, the LHS is ‾(1) = 0 and the RHS is 0 + 0 = 0. In every other row, exactly one of A or B is 0 — so the LHS is 1 and the RHS contains at least one 1. Both sides agree on all four input rows.",
    table: [
      ["A", "B", "‾(A·B)", "Ā+B̄"],
      ["0", "0", "1", "1"],
      ["0", "1", "1", "1"],
      ["1", "0", "1", "1"],
      ["1", "1", "0", "0"],
    ],
    lhs: { label: "‾(A·B)", inputs: ["A", "B"], gate: "nand", output: "Y" },
    rhs: { label: "Ā + B̄", inputs: ["Ā", "B̄"], gate: "or", output: "Y" },
  },
  {
    n: "02",
    name: "De Morgan's Second Theorem",
    expr: "‾(A + B) = Ā · B̄",
    accent: "#8b5cf6",
    statement: "The complement of an OR is the AND of the complements. A NOR gate is equivalent to an AND gate fed with inverted inputs.",
    proof: "Dual of the first theorem. If A = 0 and B = 0, the LHS is ‾(0) = 1 and the RHS is 1 · 1 = 1. In every other row at least one input is 1 — so the LHS is 0 and the RHS contains a 0. Both sides agree on all four rows.",
    table: [
      ["A", "B", "‾(A+B)", "Ā·B̄"],
      ["0", "0", "1", "1"],
      ["0", "1", "0", "0"],
      ["1", "0", "0", "0"],
      ["1", "1", "0", "0"],
    ],
    lhs: { label: "‾(A+B)", inputs: ["A", "B"], gate: "nor", output: "Y" },
    rhs: { label: "Ā · B̄", inputs: ["Ā", "B̄"], gate: "and", output: "Y" },
  },
];

export default function DeMorganPage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fbfbfd", color: "#0f172a", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 100px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#94a3b8", marginBottom: 40 }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <Link to="/topics/boolean-algebra" style={{ color: "#94a3b8", textDecoration: "none" }}>Boolean Algebra</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>De Morgan's Theorems</span>
        </div>

        {/* Masthead */}
        <header style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "end", paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>
              Boolean Algebra · Theorem
            </div>
            <h1 style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.045em", margin: 0 }}>
              De Morgan's
              <br />
              Theorems
              <span style={{ color: ACCENT }}>.</span>
            </h1>
            <div style={{ marginTop: 20, width: 64, height: 4, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, borderRadius: 2 }} />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              Two fundamental rules for simplifying Boolean expressions involving NOT of AND and OR.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              NAND ↔ OR of NOTs · NOR ↔ AND of NOTs
            </p>
          </div>
        </header>

        {/* Theorems */}
        {theorems.map((t) => (
          <section key={t.n} style={{ marginBottom: 56 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: t.accent, marginBottom: 6 }}>
                Theorem {t.n}
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>{t.name}</h2>
              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 800, color: t.accent }}>
                {t.expr}
              </code>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "24px 28px" }}>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#334155", margin: "0 0 14px" }}>{t.statement}</p>

              {/* Proof */}
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>Proof</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#475569", margin: "0 0 14px" }}>{t.proof}</p>

              {/* Truth table */}
              <div style={{ display: "inline-block", border: "1px solid #e8e8f0", borderRadius: 3, overflow: "hidden", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${t.table[0].length}, minmax(48px, auto))`, background: "#f8fafc" }}>
                  {t.table[0].map((h, i) => (
                    <div key={i} style={{ padding: "5px 10px", textAlign: "center", fontSize: 10, fontWeight: 800, letterSpacing: 1, color: "#64748b", borderRight: i < t.table[0].length - 1 ? "1px solid #e8e8f0" : "none" }}>
                      {h}
                    </div>
                  ))}
                </div>
                {t.table.slice(1).map((row, ri) => (
                  <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${row.length}, minmax(48px, auto))`, borderTop: "1px solid #f1f5f9" }}>
                    {row.map((cell, ci) => (
                      <div key={ci} style={{ padding: "5px 10px", textAlign: "center", fontSize: 12, fontWeight: ci === row.length - 1 ? 800 : 500, color: ci === row.length - 1 ? t.accent : "#475569", borderRight: ci < row.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* LHS / RHS */}
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>
                Gate verification — LHS ≡ RHS
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "stretch" }}>
                <GatePanel title="LHS" label={t.lhs.label} inputs={t.lhs.inputs} gate={t.lhs.gate} output={t.lhs.output} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: t.accent }}>≡</div>
                <GatePanel title="RHS" label={t.rhs.label} inputs={t.rhs.inputs} gate={t.rhs.gate} output={t.rhs.output} />
              </div>
            </div>
          </section>
        ))}

        {/* Quick summary */}
        <section>
          <div style={{ background: "#0f172a", borderRadius: 4, padding: "28px 32px", color: "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
              Summary
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 800, color: "#ef4444", marginBottom: 6 }}>
                  ‾(A · B) = Ā + B̄
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }}>
                  Break the bar, change AND to OR.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 800, color: "#8b5cf6", marginBottom: 6 }}>
                  ‾(A + B) = Ā · B̄
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }}>
                  Break the bar, change OR to AND.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #1e293b", fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
              <strong style={{ color: "#fff" }}>Remember:</strong> when you break a complement bar, flip the operator and invert each operand.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}