import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
  { id: "and", title: "AND Gate", path: "/topics/logic-gates/and", glyph: "A·B", tint: "#3b82f6" },
  { id: "or", title: "OR Gate", path: "/topics/logic-gates/or", glyph: "A+B", tint: "#10b981" },
  { id: "not", title: "NOT Gate", path: "/topics/logic-gates/not", glyph: "Ā", tint: "#f59e0b" },
  { id: "nand", title: "NAND Gate", path: "/topics/logic-gates/nand", glyph: "¬(A·B)", tint: "#ef4444" },
  { id: "nor", title: "NOR Gate", path: "/topics/logic-gates/nor", glyph: "¬(A+B)", tint: "#ec4899" },
  { id: "xor", title: "XOR Gate", path: "/topics/logic-gates/xor", glyph: "A⊕B", tint: "#8b5cf6" },
  { id: "xnor", title: "XNOR Gate", path: "/topics/logic-gates/xnor", glyph: "A⊙B", tint: "#06b6d4" },
  { id: "universal", title: "Universal Gates", path: "/topics/logic-gates/universal", glyph: "{NAND,NOR}", tint: "#14b8a6" },
];

const gates = [
  {
    key: "and",
    name: "AND",
    symbol: "Y = A · B",
    accent: "#3b82f6",
    what: "Output is HIGH only when every input is HIGH. The gate that asks for unanimous consent — one LOW input and the result is LOW.",
    facts: [
      "Also written as AB, or A ∧ B.",
      "Behaves like series switches — all must be closed.",
      "Foundation of masking and enable logic.",
    ],
    truth: [["0","0","0"],["0","1","0"],["1","0","0"],["1","1","1"]],
  },
  {
    key: "or",
    name: "OR",
    symbol: "Y = A + B",
    accent: "#10b981",
    what: "Output is HIGH when at least one input is HIGH. The gate that accepts any vote — only all-LOW inputs yield LOW.",
    facts: [
      "Also written as A ∨ B.",
      "Behaves like parallel switches — any one closes the path.",
      "Used in alarm and detection circuits.",
    ],
    truth: [["0","0","0"],["0","1","1"],["1","0","1"],["1","1","1"]],
  },
  {
    key: "not",
    name: "NOT",
    symbol: "Y = Ā",
    accent: "#f59e0b",
    what: "The inverter — a single input whose output is always the opposite. HIGH becomes LOW, LOW becomes HIGH.",
    facts: [
      "The only single-input gate.",
      "Also called a buffer when applied twice.",
      "Backbone of complement arithmetic.",
    ],
    truth: [["0","1"],["1","0"]],
  },
  {
    key: "nand",
    name: "NAND",
    symbol: "Y = ¬(A · B)",
    accent: "#ef4444",
    what: "An AND gate with an inverted output. HIGH for every input combination except when all inputs are HIGH.",
    facts: [
      "A universal gate — can build any other gate.",
      "Cheapest and fastest gate to fabricate in CMOS.",
      "The default building block of digital ICs.",
    ],
    truth: [["0","0","1"],["0","1","1"],["1","0","1"],["1","1","0"]],
  },
  {
    key: "nor",
    name: "NOR",
    symbol: "Y = ¬(A + B)",
    accent: "#ec4899",
    what: "An OR gate with an inverted output. HIGH only when every input is LOW — the inverse of OR.",
    facts: [
      "The second universal gate.",
      "Symmetric with NAND under De Morgan's laws.",
      "Common in low-power and memory circuits.",
    ],
    truth: [["0","0","1"],["0","1","0"],["1","0","0"],["1","1","0"]],
  },
  {
    key: "xor",
    name: "XOR",
    symbol: "Y = A ⊕ B",
    accent: "#8b5cf6",
    what: "Exclusive-OR — HIGH when the inputs differ, LOW when they match. The \"odd-one-out\" gate.",
    facts: [
      "Detects inequality between two bits.",
      "Core of half-adders and parity generators.",
      "Chains XOR to build checksums.",
    ],
    truth: [["0","0","0"],["0","1","1"],["1","0","1"],["1","1","0"]],
  },
  {
    key: "xnor",
    name: "XNOR",
    symbol: "Y = A ⊙ B",
    accent: "#06b6d4",
    what: "Exclusive-NOR — the exact inverse of XOR. HIGH when inputs match, LOW when they differ. An equality detector.",
    facts: [
      "Also called the equivalence gate.",
      "Used in comparators and bit-equality checks.",
      "XOR followed by NOT = XNOR.",
    ],
    truth: [["0","0","1"],["0","1","0"],["1","0","0"],["1","1","1"]],
  },
];

/* ── Truth-table mini component (inline) ── */
function TruthTable({ rows, accent, inputs }) {
  const headers = inputs || ["A", "B"];
  const isTwoInput = headers.length === 2;
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 12,
      }}
    >
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              style={{
                textAlign: "center",
                padding: "6px 4px",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.5,
                color: "#94a3b8",
                borderBottom: "1px solid #e8e8f0",
              }}
            >
              {h}
            </th>
          ))}
          <th
            style={{
              textAlign: "center",
              padding: "6px 4px",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.5,
              color: accent,
              borderBottom: "1px solid #e8e8f0",
            }}
          >
            Y
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => {
              const isOut = j === r.length - 1;
              return (
                <td
                  key={j}
                  style={{
                    textAlign: "center",
                    padding: "5px 4px",
                    fontSize: 12,
                    fontWeight: isOut ? 800 : 600,
                    color: isOut ? (cell === "1" ? accent : "#cbd5e1") : "#475569",
                    borderBottom: i === rows.length - 1 ? "none" : "1px solid #f1f5f9",
                  }}
                >
                  {cell}
                </td>
              );
            })}
            {isTwoInput && r.length === 2 && <td />}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LogicGatesPage() {
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

        {/* ── Breadcrumb ── */}
        <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#94a3b8", marginBottom: 40 }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Logic Gates</span>
        </div>

        {/* ── EDITORIAL MASTHEAD ── */}
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
                color: "#10b981",
                marginBottom: 18,
              }}
            >
              Digital Fundamentals · Chapter 02
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
              Logic
              <br />
              Gates
              <span style={{ color: "#10b981" }}>.</span>
            </h1>
            <div
              style={{
                marginTop: 20,
                width: 64,
                height: 4,
                background: "linear-gradient(90deg, #10b981, #3b82f6)",
                borderRadius: 2,
              }}
            />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              The primitive decision-makers of every digital circuit — from a single AND to the
              universal NAND that builds entire processors.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              AND · OR · NOT · NAND · NOR · XOR · XNOR · Universal Gates
            </p>
          </div>
        </header>

        {/* ── DEFINITION: split layout ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 48,
            marginBottom: 72,
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
              01 — Definition
            </div>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              What is a<br />logic gate?
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#334155", margin: "0 0 24px" }}>
              A <strong style={{ color: "#10b981" }}>logic gate</strong> is a physical circuit that
              performs a Boolean operation on one or more binary inputs and produces a single binary
              output. Every digital device — from a calculator to a CPU — is ultimately a
              carefully arranged network of these gates.
            </p>

            {/* Formula — big and editorial */}
            <div
              style={{
                background: "#0f172a",
                borderRadius: 4,
                padding: "28px 32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#10b981",
                  marginBottom: 14,
                }}
              >
                The Truth Table
              </div>
              <code
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
                  fontSize: 16,
                  color: "#fff",
                  lineHeight: 1.7,
                  display: "block",
                  letterSpacing: "-0.01em",
                }}
              >
                Inputs → Gate → Output
                <br />
                <span style={{ color: "#64748b" }}>0 / 1</span>
                <span style={{ color: "#10b981", margin: "0 12px" }}>→</span>
                <span style={{ color: "#64748b" }}>Boolean fn</span>
                <span style={{ color: "#10b981", margin: "0 12px" }}>→</span>
                <span style={{ color: "#64748b" }}>0 / 1</span>
              </code>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: "20px 0 0" }}>
              Each gate's behaviour is captured completely by its{" "}
              <strong style={{ color: "#0f172a" }}>truth table</strong> — every input combination
              mapped to its output.
            </p>
          </div>
        </section>

        {/* ── BENTO GRID: seven primary gates ── */}
        <section style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 28,
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
                  marginBottom: 8,
                }}
              >
                02 — The Seven Gates
              </div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Meet the primitives
              </h2>
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
              2-input · 1-output
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 16,
            }}
          >
            {gates.map((g, i) => {
              // Bento rhythm: alternate 7/5 spans; every 3rd card full-width-ish
              const span = i === 2 ? 12 : i % 3 === 0 ? 7 : 5;
              const isWide = span === 12 || span === 7;
              return (
                <article
                  key={g.key}
                  style={{
                    gridColumn: `span ${span}`,
                    background: "#fff",
                    border: "1px solid #e8e8f0",
                    borderRadius: 4,
                    padding: isWide ? "28px 30px" : "24px 26px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: span === 12 ? "row" : "column",
                    gap: span === 12 ? 40 : 0,
                    minHeight: 260,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = g.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e8f0")}
                >
                  {/* Ghost symbol */}
                  <div
                    style={{
                      position: "absolute",
                      top: -18,
                      right: -8,
                      fontSize: 110,
                      fontWeight: 800,
                      lineHeight: 1,
                      color: g.accent,
                      opacity: 0.07,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                      fontFamily: "'JetBrains Mono', monospace",
                      pointerEvents: "none",
                    }}
                  >
                    {g.name}
                  </div>

                  {/* Left column: name + text */}
                  <div style={{ position: "relative", flex: 1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: g.accent,
                        marginBottom: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {g.symbol}
                    </div>
                    <h3
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        margin: "0 0 14px",
                        color: "#0f172a",
                      }}
                    >
                      {g.name}
                      <span style={{ color: g.accent }}> Gate</span>
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "#475569", margin: "0 0 16px" }}>
                      {g.what}
                    </p>
                    {span !== 12 && (
                      <ul
                        style={{
                          margin: 0,
                          padding: 0,
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {g.facts.map((f, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: 13,
                              lineHeight: 1.55,
                              color: "#64748b",
                              paddingLeft: 18,
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 7,
                                width: 8,
                                height: 2,
                                background: g.accent,
                                borderRadius: 1,
                              }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right column (wide cards) or bottom (tall cards): truth table */}
                  <div
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      width: span === 12 ? 240 : "100%",
                      marginTop: span === 12 ? 0 : 18,
                      paddingTop: span === 12 ? 0 : 16,
                      borderTop: span === 12 ? "none" : "1px solid #f1f5f9",
                    }}
                  >
                    {span === 12 && (
                      <ul
                        style={{
                          margin: "0 0 20px",
                          padding: 0,
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {g.facts.map((f, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: 13,
                              lineHeight: 1.55,
                              color: "#64748b",
                              paddingLeft: 18,
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 7,
                                width: 8,
                                height: 2,
                                background: g.accent,
                                borderRadius: 1,
                              }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
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
                      Truth Table
                    </div>
                    <TruthTable
                      rows={g.truth}
                      accent={g.accent}
                      inputs={g.key === "not" ? ["A"] : ["A", "B"]}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── UNIVERSAL GATES CALLOUT ── */}
        <section style={{ marginBottom: 72 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: 48,
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
                03 — Universal Gates
              </div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  margin: "0 0 16px",
                }}
              >
                NAND &amp; NOR<br />build everything
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#475569", margin: 0 }}>
                A gate is <strong style={{ color: "#0f172a" }}>universal</strong> if any Boolean
                function can be constructed from copies of it alone. Only two qualify —{" "}
                <strong style={{ color: "#ef4444" }}>NAND</strong> and{" "}
                <strong style={{ color: "#ec4899" }}>NOR</strong>.
              </p>
            </div>
            <div
              style={{
                background: "#0f172a",
                borderRadius: 4,
                padding: "32px",
                color: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#14b8a6",
                  marginBottom: 20,
                }}
              >
                Why it matters
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#ef4444",
                      marginBottom: 6,
                    }}
                  >
                    NAND
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }}>
                    Cheapest to fabricate in CMOS. The default building block of nearly all ICs.
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#ec4899",
                      marginBottom: 6,
                    }}
                  >
                    NOR
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }}>
                    Symmetric to NAND via De Morgan. Frequently used in low-power memory cells.
                  </p>
                </div>
              </div>
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: "1px solid #1e293b",
                  fontSize: 12,
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "#94a3b8" }}>De Morgan's Laws:</strong>{" "}
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ¬(A·B) = Ā + B̄&nbsp;&nbsp;·&nbsp;&nbsp;¬(A+B) = Ā · B̄
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOPICS: editorial list ── */}
        <section>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: 8,
            }}
          >
            04 — Explore Gates
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 6px",
            }}
          >
            Dive into a gate
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 28px", maxWidth: 520 }}>
            Each guide walks through the gate from scratch — symbols, truth tables, and worked
            examples.
          </p>

          <div style={{ borderTop: "2px solid #0f172a" }}>
            {topics.map((t, i) => (
              <Link
                key={t.id}
                to={t.path}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto 24px",
                  alignItems: "center",
                  gap: 20,
                  padding: "18px 8px",
                  borderBottom: "1px solid #e8e8f0",
                  textDecoration: "none",
                  color: "#0f172a",
                  transition: "background 0.15s, padding-left 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8f8fc";
                  e.currentTarget.style.paddingLeft = "16px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "8px";
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.tint,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {t.title}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#94a3b8",
                    padding: "3px 10px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                  }}
                >
                  {t.glyph}
                </span>
                <span style={{ fontSize: 16, color: "#cbd5e1", textAlign: "right" }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}