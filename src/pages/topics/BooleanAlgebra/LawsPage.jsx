import React from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#06b6d4';
const SECONDARY = '#8b5cf6';

/* ────────────────────────────────────────────────
   Gate diagram primitives (pure SVG, no deps)
   ──────────────────────────────────────────────── */

const GATE_W = 54;
const GATE_H = 36;

/* Draw a 2-input gate: shape `and | or | xor | nand | nor | xnor` */
function GateShape({ x, y, type }) {
  const w = GATE_W, h = GATE_H;
  const isAndLike = type === "and" || type === "nand";
  const isOrLike = type === "or" || type === "nor";
  const isXor = type === "xor" || type === "xnor";
  const bubble = type === "nand" || type === "nor" || type === "xnor" || type === "not";

  // AND-style body: D-shape
  const andPath = `M ${x} ${y} L ${x + w * 0.5} ${y} A ${h / 2} ${h / 2} 0 0 1 ${x + w * 0.5} ${y + h} L ${x} ${y + h} Z`;
  // OR-style body: curved back, pointed front
  const orPath = `M ${x} ${y} Q ${x + w * 0.55} ${y + h / 2} ${x} ${y + h} Q ${x + w * 0.7} ${y + h} ${x + w} ${y + h / 2} Q ${x + w * 0.7} ${y} ${x} ${y} Z`;

  return (
    <g>
      {/* extra XOR arc */}
      {isXor && (
        <path
          d={`M ${x - 6} ${y} Q ${x + w * 0.2} ${y + h / 2} ${x - 6} ${y + h}`}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
      )}
      {isOrLike || isXor ? (
        <path d={orPath} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      ) : (
        <path d={andPath} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      )}
      {/* bubble for inverting gates */}
      {bubble && (
        <circle cx={x + w + 5} cy={y + h / 2} r={5} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      )}
    </g>
  );
}

/* Single-input NOT gate */
function NotGate({ x, y }) {
  const w = 42, h = 30;
  return (
    <g>
      <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h / 2} Z`} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx={x + w + 5} cy={y + h / 2} r={5} fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
    </g>
  );
}

/* Wire helpers */
function Wire({ d, dashed }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#94a3b8"
      strokeWidth="1.5"
      strokeDasharray={dashed ? "4 3" : undefined}
    />
  );
}

function Label({ x, y, text, size = 11, color = "#475569", weight = 700 }) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} fontWeight={weight} fontFamily="'JetBrains Mono', monospace">
      {text}
    </text>
  );
}

/* ────────────────────────────────────────────────
   One diagram panel (SVG)
   Layout: INPUTS on left → GATE → OUTPUT on right
   Supported shapes:
     - "buf":    A ─── Y
     - "not":    A ─[NOT]─ Y
     - "and" | "or" | "xor" | "nand" | "nor" | "xnor":  A,B → gate → Y
     - custom composition via `custom` render fn
   ──────────────────────────────────────────────── */
function GatePanel({ title, label, inputs, gate, output, note }) {
  // base geometry
  const width = 220;
  const height = 110;
  const inX = 12;
  const gateX = 78;
  const gateY = 30;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e8e8f0",
        borderRadius: 4,
        padding: "14px 14px 12px",
        flex: "1 1 0",
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#94a3b8",
          marginBottom: 2,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
        {label}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {gate === "buf" && (
          <g>
            <Wire d={`M ${inX} ${height / 2} L ${width - 40} ${height / 2}`} />
            <circle cx={inX - 2} cy={height / 2} r={2.5} fill="#0f172a" />
            <Label x={inX + 4} y={height / 2 - 8} text={inputs[0]} color="#3b82f6" />
            <Label x={width - 32} y={height / 2 - 8} text={output} color="#10b981" />
          </g>
        )}

        {gate === "not" && (
          <g>
            <Wire d={`M ${inX} ${height / 2} L ${gateX} ${height / 2}`} />
            <NotGate x={gateX} y={height / 2 - 15} />
            <Wire d={`M ${gateX + 52} ${height / 2} L ${width - 40} ${height / 2}`} />
            <circle cx={inX - 2} cy={height / 2} r={2.5} fill="#0f172a" />
            <Label x={inX + 4} y={height / 2 - 8} text={inputs[0]} color="#3b82f6" />
            <Label x={width - 32} y={height / 2 - 8} text={output} color="#10b981" />
          </g>
        )}

        {gate !== "buf" && gate !== "not" && (
          <g>
            {/* input wires */}
            <Wire d={`M ${inX} ${height / 2 - 12} L ${gateX} ${height / 2 - 12}`} />
            <Wire d={`M ${inX} ${height / 2 + 12} L ${gateX} ${height / 2 + 12}`} />
            {/* gate */}
            <g transform={`translate(0, ${height / 2 - gateY - GATE_H / 2})`}>
              <GateShape x={gateX} y={gateY} type={gate} />
            </g>
            {/* output wire */}
            <Wire d={`M ${gateX + GATE_W + 10} ${height / 2} L ${width - 40} ${height / 2}`} />
            <circle cx={inX - 2} cy={height / 2 - 12} r={2.5} fill="#0f172a" />
            <circle cx={inX - 2} cy={height / 2 + 12} r={2.5} fill="#0f172a" />
            <Label x={inX + 4} y={height / 2 - 20} text={inputs[0]} color="#3b82f6" />
            <Label x={inX + 4} y={height / 2 + 26} text={inputs[1]} color="#3b82f6" />
            <Label x={width - 34} y={height / 2 - 8} text={output} color="#10b981" />
          </g>
        )}
      </svg>
      {note && (
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
          {note}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   A single law block: identity + proof + LHS/RHS diagrams
   ──────────────────────────────────────────────── */
function LawBlock({ law, accent }) {
  return (
    <div
      style={{
        padding: "22px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {/* Header row: name + expression */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.01em",
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: 2,
              background: accent,
            }}
          />
          {law.name}
        </div>
        <code
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: accent,
            display: "block",
            lineHeight: 1.6,
          }}
        >
          {law.expr}
        </code>
      </div>

      {/* Proof */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#94a3b8",
            marginBottom: 6,
          }}
        >
          Proof
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#475569", margin: 0 }}>
          {law.proof}
        </p>
        {law.truthTable && (
          <div
            style={{
              marginTop: 10,
              display: "inline-block",
              border: "1px solid #e8e8f0",
              borderRadius: 3,
              overflow: "hidden",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${law.truthTable[0].length}, minmax(32px, auto))`,
                background: "#f8fafc",
              }}
            >
              {law.truthTable[0].map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: "5px 10px",
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1,
                    color: "#64748b",
                    borderRight: i < law.truthTable[0].length - 1 ? "1px solid #e8e8f0" : "none",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {law.truthTable.slice(1).map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${row.length}, minmax(32px, auto))`,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    style={{
                      padding: "5px 10px",
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: ci === row.length - 1 ? 800 : 500,
                      color: ci === row.length - 1 ? accent : "#475569",
                      borderRight: ci < row.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LHS / RHS diagrams */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#94a3b8",
            marginBottom: 8,
          }}
        >
          Gate verification — LHS ≡ RHS
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <GatePanel
            title="LHS"
            label={law.lhs.label}
            inputs={law.lhs.inputs}
            gate={law.lhs.gate}
            output={law.lhs.output}
            note={law.lhs.note}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
              fontSize: 20,
              fontWeight: 800,
              color: accent,
            }}
          >
            ≡
          </div>
          <GatePanel
            title="RHS"
            label={law.rhs.label}
            inputs={law.rhs.inputs}
            gate={law.rhs.gate}
            output={law.rhs.output}
            note={law.rhs.note}
          />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   LAW DATA — proof + LHS/RHS gate specs for each
   ──────────────────────────────────────────────── */
const lawGroups = [
  {
    key: "basic",
    group: "Basic Laws",
    eyebrow: "Laws 01 – 05",
    accent: "#3b82f6",
    items: [
      {
        name: "Identity Law",
        expr: "A + 0 = A   ·   A · 1 = A",
        proof:
          "By Huntington's identity postulate: 0 is the identity for OR, and 1 is the identity for AND. Adding the identity element never changes the operand.",
        truthTable: [
          ["A", "A+0", "A·1"],
          ["0", "0", "0"],
          ["1", "1", "1"],
        ],
        lhs: { label: "A + 0", inputs: ["A", "0"], gate: "or",  output: "A", note: "OR with constant 0" },
        rhs: { label: "A · 1", inputs: ["A", "1"], gate: "and", output: "A", note: "AND with constant 1" },
      },
      {
        name: "Null Law",
        expr: "A + 1 = 1   ·   A · 0 = 0",
        proof:
          "If A is 0, 0+1 = 1; if A is 1, 1+1 = 1. Similarly, A·0 is always 0 because the AND operation requires both inputs to be 1 — and 0 is never 1.",
        truthTable: [
          ["A", "A+1", "A·0"],
          ["0", "1", "0"],
          ["1", "1", "0"],
        ],
        lhs: { label: "A + 1", inputs: ["A", "1"], gate: "or",  output: "1", note: "OR with constant 1 → 1" },
        rhs: { label: "A · 0", inputs: ["A", "0"], gate: "and", output: "0", note: "AND with constant 0 → 0" },
      },
      {
        name: "Idempotent Law",
        expr: "A + A = A   ·   A · A = A",
        proof:
          "If A = 0, both 0+0 and 0·0 are 0. If A = 1, both 1+1 and 1·1 are 1. Repeating a variable with itself collapses to that variable.",
        truthTable: [
          ["A", "A+A", "A·A"],
          ["0", "0", "0"],
          ["1", "1", "1"],
        ],
        lhs: { label: "A + A", inputs: ["A", "A"], gate: "or",  output: "A", note: "Both inputs tied to A" },
        rhs: { label: "A · A", inputs: ["A", "A"], gate: "and", output: "A", note: "Both inputs tied to A" },
      },
      {
        name: "Complement Law",
        expr: "A + Ā = 1   ·   A · Ā = 0",
        proof:
          "A and its complement Ā always have opposite values. Their OR must therefore be 1 (one of them is 1), and their AND must be 0 (they cannot both be 1).",
        truthTable: [
          ["A", "Ā", "A+Ā", "A·Ā"],
          ["0", "1", "1", "0"],
          ["1", "0", "1", "0"],
        ],
        lhs: { label: "A + Ā", inputs: ["A", "Ā"], gate: "or",  output: "1", note: "Exactly one input is HIGH" },
        rhs: { label: "A · Ā", inputs: ["A", "Ā"], gate: "and", output: "0", note: "One input is always LOW" },
      },
      {
        name: "Involution Law",
        expr: "‾(Ā) = A",
        proof:
          "The complement of the complement of A is A itself. Applying NOT twice restores the original value — verified immediately from the truth table of NOT.",
        truthTable: [
          ["A", "Ā", "‾(Ā)"],
          ["0", "1", "0"],
          ["1", "0", "1"],
        ],
        lhs: { label: "‾(Ā)", inputs: ["A"], gate: "not", output: "A", note: "NOT of Ā" },
        rhs: { label: "A",    inputs: ["A"], gate: "buf", output: "A", note: "Direct wire" },
      },
    ],
  },
  {
    key: "structural",
    group: "Structural Laws",
    eyebrow: "Laws 06 – 08",
    accent: "#10b981",
    items: [
      {
        name: "Commutative",
        expr: "A + B = B + A   ·   A · B = B · A",
        proof:
          "OR and AND are symmetric in their inputs. Swapping the inputs to either gate produces identical output — confirmed by comparing the truth tables row by row.",
        truthTable: [
          ["A", "B", "A+B", "B+A", "A·B", "B·A"],
          ["0", "0", "0", "0", "0", "0"],
          ["0", "1", "1", "1", "0", "0"],
          ["1", "0", "1", "1", "0", "0"],
          ["1", "1", "1", "1", "1", "1"],
        ],
        lhs: { label: "A + B", inputs: ["A", "B"], gate: "or",  output: "Y", note: "Inputs as given" },
        rhs: { label: "B + A", inputs: ["B", "A"], gate: "or",  output: "Y", note: "Inputs swapped" },
      },
      {
        name: "Associative",
        expr: "(A+B)+C = A+(B+C)",
        proof:
          "Grouping of operands in an OR-chain (or AND-chain) does not affect the result. Check all 8 input combinations — both groupings produce the same output for every row.",
        truthTable: [
          ["A", "B", "C", "(A+B)+C", "A+(B+C)"],
          ["0", "0", "0", "0", "0"],
          ["0", "0", "1", "1", "1"],
          ["0", "1", "0", "1", "1"],
          ["0", "1", "1", "1", "1"],
          ["1", "0", "0", "1", "1"],
          ["1", "0", "1", "1", "1"],
          ["1", "1", "0", "1", "1"],
          ["1", "1", "1", "1", "1"],
        ],
        lhs: { label: "(A+B)+C", inputs: ["(A+B)", "C"], gate: "or", output: "Y", note: "A+B first, then OR C" },
        rhs: { label: "A+(B+C)", inputs: ["A", "(B+C)"], gate: "or", output: "Y", note: "B+C first, then OR A" },
      },
      {
        name: "Distributive",
        expr: "A·(B+C) = A·B + A·C",
        proof:
          "If A = 0, both sides are 0. If A = 1, the left side equals B+C and the right side equals B+C (since 1·B = B and 1·C = C). All 8 combinations agree.",
        truthTable: [
          ["A", "B", "C", "A·(B+C)", "A·B+A·C"],
          ["0", "0", "0", "0", "0"],
          ["0", "0", "1", "0", "0"],
          ["0", "1", "0", "0", "0"],
          ["0", "1", "1", "0", "0"],
          ["1", "0", "0", "0", "0"],
          ["1", "0", "1", "1", "1"],
          ["1", "1", "0", "1", "1"],
          ["1", "1", "1", "1", "1"],
        ],
        lhs: { label: "A·(B+C)", inputs: ["A", "(B+C)"], gate: "and", output: "Y", note: "OR first, then AND" },
        rhs: { label: "A·B+A·C", inputs: ["(A·B)", "(A·C)"], gate: "or", output: "Y", note: "Two ANDs, then OR" },
      },
    ],
  },
  {
    key: "advanced",
    group: "Advanced Identities",
    eyebrow: "Laws 09 – 12",
    accent: "#f59e0b",
    items: [
      {
        name: "Absorption #1",
        expr: "A + A·B = A",
        proof:
          "Factor A out: A(1 + B). By Null Law, 1 + B = 1, so A·1 = A (Identity). The B-term is completely absorbed.",
        truthTable: [
          ["A", "B", "A·B", "A+A·B"],
          ["0", "0", "0", "0"],
          ["0", "1", "0", "0"],
          ["1", "0", "0", "1"],
          ["1", "1", "1", "1"],
        ],
        lhs: { label: "A + A·B", inputs: ["A", "(A·B)"], gate: "or", output: "A", note: "A absorbs the AND term" },
        rhs: { label: "A",       inputs: ["A"],        gate: "buf", output: "A", note: "Direct wire" },
      },
      {
        name: "Absorption #2",
        expr: "A · (A + B) = A",
        proof:
          "Expand: A·A + A·B = A + A·B (Idempotent) = A (Absorption #1). By duality the second absorption law follows from the first.",
        truthTable: [
          ["A", "B", "A+B", "A·(A+B)"],
          ["0", "0", "0", "0"],
          ["0", "1", "1", "0"],
          ["1", "0", "1", "1"],
          ["1", "1", "1", "1"],
        ],
        lhs: { label: "A·(A+B)", inputs: ["A", "(A+B)"], gate: "and", output: "A", note: "A absorbs the OR term" },
        rhs: { label: "A",       inputs: ["A"],          gate: "buf", output: "A", note: "Direct wire" },
      },
      {
        name: "Redundancy",
        expr: "A + Ā·B = A + B   ·   A·(Ā+B) = A·B",
        proof:
          "Split A + Ā·B = (A + Ā)·(A + B) via distribution. Since A + Ā = 1 (Complement Law), the left factor becomes 1, leaving A + B. The dual form follows by applying De Morgan.",
        truthTable: [
          ["A", "B", "Ā·B", "A+Ā·B", "A+B"],
          ["0", "0", "0", "0", "0"],
          ["0", "1", "1", "1", "1"],
          ["1", "0", "0", "1", "1"],
          ["1", "1", "0", "1", "1"],
        ],
        lhs: { label: "A + Ā·B", inputs: ["A", "(Ā·B)"], gate: "or", output: "A+B", note: "The Ā·B term is redundant" },
        rhs: { label: "A + B",   inputs: ["A", "B"],      gate: "or", output: "A+B", note: "Simplified form" },
      },
      {
        name: "De Morgan's #1",
        expr: "‾(A · B) = Ā + B̄",
        proof:
          "For every combination of A and B, NAND(A,B) equals OR(NOT A, NOT B). Verified by direct comparison of the two truth tables — both produce 1 in exactly the same three rows.",
        truthTable: [
          ["A", "B", "A·B", "‾(A·B)", "Ā", "B̄", "Ā+B̄"],
          ["0", "0", "0", "1", "1", "1", "1"],
          ["0", "1", "0", "1", "1", "0", "1"],
          ["1", "0", "0", "1", "0", "1", "1"],
          ["1", "1", "1", "0", "0", "0", "0"],
        ],
        lhs: { label: "‾(A·B)", inputs: ["A", "B"], gate: "nand", output: "Y", note: "NAND of A, B" },
        rhs: { label: "Ā + B̄",  inputs: ["Ā", "B̄"], gate: "or",   output: "Y", note: "OR of inverted inputs" },
      },
      {
        name: "De Morgan's #2",
        expr: "‾(A + B) = Ā · B̄",
        proof:
          "Dual of the first theorem. NOR(A,B) matches AND(NOT A, NOT B) on every row. Both are 1 only when both A and B are 0.",
        truthTable: [
          ["A", "B", "A+B", "‾(A+B)", "Ā", "B̄", "Ā·B̄"],
          ["0", "0", "0", "1", "1", "1", "1"],
          ["0", "1", "1", "0", "1", "0", "0"],
          ["1", "0", "1", "0", "0", "1", "0"],
          ["1", "1", "1", "0", "0", "0", "0"],
        ],
        lhs: { label: "‾(A+B)", inputs: ["A", "B"], gate: "nor", output: "Y", note: "NOR of A, B" },
        rhs: { label: "Ā · B̄", inputs: ["Ā", "B̄"], gate: "and", output: "Y", note: "AND of inverted inputs" },
      },
    ],
  },
];

/* ────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────── */
export default function LawsPage() {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "#fbfbfd",
        color: "#0f172a",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 100px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#94a3b8", marginBottom: 40 }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <Link to="/topics/boolean-algebra" style={{ color: "#94a3b8", textDecoration: "none" }}>
            Boolean Algebra
          </Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Laws &amp; Identities</span>
        </div>

        {/* Masthead */}
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 48,
            alignItems: "end",
            paddingBottom: 40,
            borderBottom: "1px solid #e2e8f0",
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 18,
              }}
            >
              Boolean Algebra · Chapter 04
            </div>
            <h1
              style={{
                fontSize: 58,
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                margin: 0,
                color: "#0f172a",
              }}
            >
              Laws &amp;
              <br />
              Identities
              <span style={{ color: ACCENT }}>.</span>
            </h1>
            <div
              style={{
                marginTop: 20,
                width: 64,
                height: 4,
                background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`,
                borderRadius: 2,
              }}
            />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              Every law — proved, then verified visually with side-by-side LHS and RHS gate
              diagrams. If the two circuits are equivalent, their outputs match on every input row.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              12 laws · algebraic proofs · truth tables · LHS ≡ RHS gate verification
            </p>
          </div>
        </header>

        {/* Intro / foundation */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 48,
            marginBottom: 56,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: 12,
              }}
            >
              00 — How to read this page
            </div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Proof, then picture
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155", margin: "0 0 16px" }}>
              Each law is presented in the same three-part structure. First the identity itself.
              Then a concise <strong style={{ color: "#0f172a" }}>algebraic proof</strong> plus a
              truth table where it clarifies the result. Finally, a{" "}
              <strong style={{ color: "#0f172a" }}>gate-diagram verification</strong>: the LHS
              expression is drawn as a circuit, the RHS expression is drawn as a circuit, and you
              can see at a glance that they compute the same function.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: 0 }}>
              Inputs are shown in <span style={{ color: "#3b82f6", fontWeight: 700 }}>blue</span>,
              outputs in <span style={{ color: "#10b981", fontWeight: 700 }}>green</span>. The
              small bubble on a gate means the output is inverted (NAND, NOR, XNOR, NOT).
            </p>
          </div>
        </section>

        {/* Law groups */}
        {lawGroups.map((group, gi) => (
          <section key={group.key} style={{ marginBottom: 56 }}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: group.accent,
                  marginBottom: 6,
                }}
              >
                {group.eyebrow}
              </div>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                {group.group}
              </h2>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8f0",
                borderRadius: 4,
                padding: "8px 28px",
              }}
            >
              {group.items.map((law, li) => (
                <LawBlock
                  key={law.name}
                  law={law}
                  accent={group.accent}
                />
              ))}
            </div>
            {/* ── SUMMARY OF ALL LAWS ── */}
<section style={{ marginBottom: 56 }}>
  <div
    style={{
      background: "#0f172a",
      borderRadius: 4,
      padding: "32px 36px",
      color: "#fff",
    }}
  >
    <div
      style={{
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: ACCENT,
        marginBottom: 6,
      }}
    >
      Summary · All Twelve Laws
    </div>
    <h2
      style={{
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        margin: "0 0 20px",
        color: "#fff",
      }}
    >
      Boolean Laws at a glance
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "18px 40px",
      }}
    >
      {[
        { n: "01", name: "Identity",     expr: "A + 0 = A   ·   A · 1 = A",           c: "#3b82f6" },
        { n: "02", name: "Null",         expr: "A + 1 = 1   ·   A · 0 = 0",           c: "#3b82f6" },
        { n: "03", name: "Idempotent",   expr: "A + A = A   ·   A · A = A",           c: "#3b82f6" },
        { n: "04", name: "Complement",   expr: "A + Ā = 1   ·   A · Ā = 0",           c: "#3b82f6" },
        { n: "05", name: "Involution",   expr: "‾(Ā) = A",                            c: "#3b82f6" },
        { n: "06", name: "Commutative",  expr: "A + B = B + A   ·   A · B = B · A",   c: "#10b981" },
        { n: "07", name: "Associative",  expr: "(A+B)+C = A+(B+C)",                   c: "#10b981" },
        { n: "08", name: "Distributive", expr: "A·(B+C) = A·B + A·C",                 c: "#10b981" },
        { n: "09", name: "Absorption",   expr: "A + A·B = A   ·   A·(A+B) = A",       c: "#f59e0b" },
        { n: "10", name: "Redundancy",   expr: "A + Ā·B = A + B",                     c: "#f59e0b" },
        { n: "11", name: "De Morgan #1", expr: "‾(A·B) = Ā + B̄",                      c: "#f59e0b" },
        { n: "12", name: "De Morgan #2", expr: "‾(A+B) = Ā · B̄",                      c: "#f59e0b" },
      ].map((law) => (
        <div
          key={law.n}
          style={{
            display: "grid",
            gridTemplateColumns: "34px 1fr",
            gap: 10,
            paddingBottom: 14,
            borderBottom: "1px solid #1e293b",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
              color: law.c,
            }}
          >
            {law.n}
          </span>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 3,
              }}
            >
              {law.name}
            </div>
            <code
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12.5,
                color: "#94a3b8",
                lineHeight: 1.5,
              }}
            >
              {law.expr}
            </code>
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 22,
        paddingTop: 18,
        borderTop: "1px solid #1e293b",
        fontSize: 12,
        color: "#64748b",
        lineHeight: 1.7,
      }}
    >
      <strong style={{ color: "#94a3b8" }}>Color key:</strong>{" "}
      <span style={{ color: "#3b82f6", fontWeight: 700 }}>Basic</span> ·{" "}
      <span style={{ color: "#10b981", fontWeight: 700 }}>Structural</span> ·{" "}
      <span style={{ color: "#f59e0b", fontWeight: 700 }}>Advanced</span>
    </div>
  </div>
</section>
          </section>
          
        ))}
      </div>
    </div>
  );
}