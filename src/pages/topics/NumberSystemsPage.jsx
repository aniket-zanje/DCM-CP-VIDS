import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
  { id: "bin-to-dec", title: "Binary to Decimal", path: "/topics/number-systems/bin-to-dec", glyph: "2→10", tint: "#3b82f6" },
  { id: "dec-to-bin", title: "Decimal to Binary", path: "/topics/number-systems/dec-to-bin", glyph: "10→2", tint: "#3b82f6" },
  { id: "bin-to-hex", title: "Binary to Hexadecimal", path: "/topics/number-systems/bin-to-hex", glyph: "2→16", tint: "#8b5cf6" },
  { id: "hex-to-bin", title: "Hexadecimal to Binary", path: "/topics/number-systems/hex-to-bin", glyph: "16→2", tint: "#8b5cf6" },
  { id: "bin-to-oct", title: "Binary to Octal", path: "/topics/number-systems/bin-to-oct", glyph: "2→8", tint: "#10b981" },
  { id: "oct-to-bin", title: "Octal to Binary", path: "/topics/number-systems/oct-to-bin", glyph: "8→2", tint: "#10b981" },
  { id: "dec-to-hex", title: "Decimal to Hexadecimal", path: "/topics/number-systems/dec-to-hex", glyph: "10→16", tint: "#f59e0b" },
  { id: "bcd", title: "BCD (8421 Code)", path: "/topics/number-systems/bcd", glyph: "8421", tint: "#6366f1" },
  { id: "gray-code", title: "Gray Code", path: "/topics/number-systems/gray-code", glyph: "⊕", tint: "#14b8a6" },
  { id: "excess-3", title: "Excess-3 Code", path: "/topics/number-systems/excess-3", glyph: "+3", tint: "#ec4899" },
];

const systems = [
  {
    key: "binary",
    name: "Binary",
    base: "02",
    radix: "Base 2",
    digits: "0 · 1",
    accent: "#3b82f6",
    what: "The native tongue of every transistor. Two symbols — on and off — express every value a machine will ever compute.",
    facts: [
      "One bit = one binary digit; 8 bits = 1 byte.",
      "Each position doubles in weight: 1, 2, 4, 8, 16…",
      "(1101)₂ = 8 + 4 + 0 + 1 = 13.",
    ],
  },
  {
    key: "octal",
    name: "Octal",
    base: "08",
    radix: "Base 8",
    digits: "0 – 7",
    accent: "#10b981",
    what: "Binary compressed three-to-one. Since 8 = 2³, every octal digit stands in for exactly three bits.",
    facts: [
      "Common in Unix permissions — 755, 644.",
      "Each position is a power of 8.",
      "(17)₈ = 8 + 7 = 15.",
    ],
  },
  {
    key: "decimal",
    name: "Decimal",
    base: "10",
    radix: "Base 10",
    digits: "0 – 9",
    accent: "#f59e0b",
    what: "The human default — ten fingers, ten symbols. Familiar to read, awkward to wire into silicon.",
    facts: [
      "Each position is a power of 10.",
      "The bridge between user and machine.",
      "259 = 200 + 50 + 9.",
    ],
  },
  {
    key: "hexadecimal",
    name: "Hexadecimal",
    base: "16",
    radix: "Base 16",
    digits: "0 – 9 · A – F",
    accent: "#8b5cf6",
    what: "Binary compressed four-to-one. Sixteen symbols make memory addresses, colours and byte dumps human-readable.",
    facts: [
      "A–F represent values 10 through 15.",
      "Colours (#FF5733), pointers, machine code.",
      "(2A)₁₆ = 32 + 10 = 42.",
    ],
  },
];

export default function NumberSystemsPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Number Systems</span>
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
                color: "#8b5cf6",
                marginBottom: 18,
              }}
            >
              Digital Fundamentals · Chapter 01
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
              Number
              <br />
              Systems
              <span style={{ color: "#8b5cf6" }}>.</span>
            </h1>
            <div
              style={{
                marginTop: 20,
                width: 64,
                height: 4,
                background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                borderRadius: 2,
              }}
            />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              How machines count — from two symbols to sixteen — and the coding schemes that
              translate between them.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              Radix systems · BCD · Gray code · Excess-3 · Complement arithmetic
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
              What is a<br />number system?
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#334155", margin: "0 0 24px" }}>
              A <strong style={{ color: "#8b5cf6" }}>number system</strong> is a defined set of
              rules for representing values using a limited collection of symbols called{" "}
              <strong>digits</strong>. In a <em>positional</em> system, a digit's value depends on{" "}
              <strong>where it sits</strong> — each place carries a weight equal to the radix raised
              to a power.
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
                  color: "#8b5cf6",
                  marginBottom: 14,
                }}
              >
                The Formula
              </div>
              <code
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
                  fontSize: 19,
                  color: "#fff",
                  lineHeight: 1.6,
                  display: "block",
                  letterSpacing: "-0.01em",
                }}
              >
                Value&nbsp;=&nbsp;Σ ( digit × radix<sup style={{ color: "#8b5cf6", fontSize: 13 }}>position</sup> )
              </code>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: "20px 0 0" }}>
              The <strong style={{ color: "#0f172a" }}>radix</strong> fixes how many distinct
              digits exist. Every system below is merely a different radix.
            </p>
          </div>
        </section>

        {/* ── BENTO GRID: four systems ── */}
        <section style={{ marginBottom: 72 }}>
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
                02 — The Four Systems
              </div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Choose your radix
              </h2>
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
              Base 2 · 8 · 10 · 16
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 16,
            }}
          >
            {systems.map((s, i) => {
              // Bento layout: alternate card spans for asymmetric rhythm
              const span = i === 0 || i === 3 ? 7 : 5;
              const tall = i === 0;
              return (
                <article
                  key={s.key}
                  style={{
                    gridColumn: `span ${span}`,
                    background: "#fff",
                    border: "1px solid #e8e8f0",
                    borderRadius: 4,
                    padding: tall ? "32px 32px 28px" : "26px 28px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: tall ? 320 : 280,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e8f0")}
                >
                  {/* Oversized ghost numeral */}
                  <div
                    style={{
                      position: "absolute",
                      top: -22,
                      right: -8,
                      fontSize: 130,
                      fontWeight: 800,
                      lineHeight: 1,
                      color: s.accent,
                      opacity: 0.08,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                    }}
                  >
                    {s.base}
                  </div>

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: s.accent,
                        marginBottom: 10,
                      }}
                    >
                      {s.radix} · {s.digits}
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
                      {s.name}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "#475569", margin: "0 0 16px" }}>
                      {s.what}
                    </p>
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
                      {s.facts.map((f, j) => (
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
                              background: s.accent,
                              borderRadius: 1,
                            }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
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
            03 — Conversions & Codes
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 6px",
            }}
          >
            Dive into a topic
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 28px", maxWidth: 520 }}>
            Each guide walks through the method from scratch — worked examples included.
          </p>

          <div
            style={{
              borderTop: "2px solid #0f172a",
            }}
          >
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