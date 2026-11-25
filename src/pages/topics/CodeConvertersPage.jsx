import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
  { id: "bin-to-gray", title: "Binary to Gray Code", path: "/topics/code-converters/bin-to-gray", glyph: "2→G", tint: "#3b82f6" },
  { id: "gray-to-bin", title: "Gray Code to Binary", path: "/topics/code-converters/gray-to-bin", glyph: "G→2", tint: "#8b5cf6" },
  { id: "xs3-to-bcd", title: "Excess-3 to BCD", path: "/topics/code-converters/xs3-to-bcd", glyph: "XS3→8421", tint: "#10b981" },
  { id: "bcd-to-xs3", title: "BCD to Excess-3", path: "/topics/code-converters/bcd-to-xs3", glyph: "8421→XS3", tint: "#f59e0b" },
];

const converters = [
  {
    key: "bin-to-gray",
    name: "Binary → Gray",
    tag: "B → G",
    accent: "#3b82f6",
    what: "Each Gray bit is the XOR of the current binary bit and the one to its left. The MSB is copied directly — no change there.",
    facts: [
      "Gray code guarantees only one bit flips between adjacent values.",
      "Eliminates glitches in encoders and position sensors.",
      "Formula: gᵢ = bᵢ ⊕ bᵢ₊₁ (with g_msb = b_msb).",
    ],
    example: {
      from: "1 0 1 1",
      to:   "1 1 1 0",
      note: "MSB copied; each next bit = XOR of adjacent binary pair.",
    },
  },
  {
    key: "gray-to-bin",
    name: "Gray → Binary",
    tag: "G → B",
    accent: "#8b5cf6",
    what: "The inverse operation. The MSB is copied, then each subsequent binary bit is the XOR of the previous binary bit and the current Gray bit.",
    facts: [
      "Recover the original binary value from its Gray encoding.",
      "Formula: bᵢ = bᵢ₋₁ ⊕ gᵢ.",
      "Used when reading sensors that output Gray-coded data.",
    ],
    example: {
      from: "1 1 1 0",
      to:   "1 0 1 1",
      note: "MSB copied; each next bit = XOR of previous output with current Gray bit.",
    },
  },
  {
    key: "xs3-to-bcd",
    name: "Excess-3 → BCD",
    tag: "XS-3 → 8421",
    accent: "#10b981",
    what: "Excess-3 is BCD offset by +3 (0011). To convert back, subtract 0011 from each 4-bit group — or equivalently, add 1101 (2's complement of 0011).",
    facts: [
      "Excess-3 is self-complementing: 9's complement = bitwise NOT.",
      "Each digit is processed independently as a 4-bit nibble.",
      "Example: XS-3 0111 (decimal 4) → 0100 (BCD 4).",
    ],
    example: {
      from: "0111 1000",
      to:   "0100 0101",
      note: "Subtract 0011 from each nibble → 0100 (4) and 0101 (5).",
    },
  },
  {
    key: "bcd-to-xs3",
    name: "BCD → Excess-3",
    tag: "8421 → XS-3",
    accent: "#f59e0b",
    what: "Add 0011 (decimal 3) to each 4-bit BCD nibble. The resulting code is biased by +3, giving Excess-3 its name.",
    facts: [
      "Each decimal digit 0–9 maps to one 4-bit XS-3 code.",
      "The resulting code is self-complementing.",
      "Example: BCD 0101 (5) + 0011 = 1000 (XS-3 for 5).",
    ],
    example: {
      from: "0100 0101",
      to:   "0111 1000",
      note: "Add 0011 to each nibble → 0111 (XS-3 for 4) and 1000 (XS-3 for 5).",
    },
  },
];

function BitRow({ bits, accent, dim }) {
  return (
    <div style={{ display: "flex", gap: 6, fontFamily: "'JetBrains Mono', monospace" }}>
      {bits.split(" ").map((b, i) => (
        <span
          key={i}
          style={{
            width: 26,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 800,
            borderRadius: 3,
            background: dim ? "#f8fafc" : "#fff",
            border: `1px solid ${dim ? "#e8e8f0" : accent + "55"}`,
            color: dim ? "#64748b" : accent,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}

export default function CodeConvertersPage() {
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
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Code Converters</span>
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
                color: "#f59e0b",
                marginBottom: 18,
              }}
            >
              Digital Fundamentals · Chapter 03
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
              Code
              <br />
              Converters
              <span style={{ color: "#f59e0b" }}>.</span>
            </h1>
            <div
              style={{
                marginTop: 20,
                width: 64,
                height: 4,
                background: "linear-gradient(90deg, #f59e0b, #8b5cf6)",
                borderRadius: 2,
              }}
            />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              Translating between the binary, Gray, and Excess-3 encodings that digital systems rely
              on for reliable sensor reads and error-resistant arithmetic.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              Binary ↔ Gray · BCD ↔ Excess-3
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
              What is a<br />code converter?
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#334155", margin: "0 0 24px" }}>
              A <strong style={{ color: "#f59e0b" }}>code converter</strong> is a digital circuit
              that translates data from one binary encoding to another — say from plain binary to
              Gray, or from BCD to Excess-3. The information is preserved; only its representation
              changes.
            </p>

            {/* Formula block */}
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
                  color: "#f59e0b",
                  marginBottom: 14,
                }}
              >
                The Core Idea
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
                Encoding A
                <span style={{ color: "#f59e0b", margin: "0 12px" }}>→</span>
                <span style={{ color: "#64748b" }}>[converter]</span>
                <span style={{ color: "#f59e0b", margin: "0 12px" }}>→</span>
                Encoding B
              </code>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: "20px 0 0" }}>
              Each conversion reduces to a small set of{" "}
              <strong style={{ color: "#0f172a" }}>XOR gates</strong> or{" "}
              <strong style={{ color: "#0f172a" }}>adders</strong> — elegant hardware for a vital
              task.
            </p>
          </div>
        </section>

        {/* ── BENTO GRID: four conversions ── */}
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
                02 — The Four Conversions
              </div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Encoding ↔ Encoding
              </h2>
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
              XOR · Adder logic
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 16,
            }}
          >
            {converters.map((c, i) => {
              const span = i % 2 === 0 ? 7 : 5;
              const isWide = span === 7;
              return (
                <article
                  key={c.key}
                  style={{
                    gridColumn: `span ${span}`,
                    background: "#fff",
                    border: "1px solid #e8e8f0",
                    borderRadius: 4,
                    padding: "28px 30px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 300,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e8f0")}
                >
                  {/* Ghost glyph */}
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      right: -6,
                      fontSize: 96,
                      fontWeight: 800,
                      lineHeight: 1,
                      color: c.accent,
                      opacity: 0.06,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                      fontFamily: "'JetBrains Mono', monospace",
                      pointerEvents: "none",
                    }}
                  >
                    {c.tag.split(" ")[0]}
                  </div>

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: c.accent,
                        marginBottom: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {c.tag}
                    </div>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        margin: "0 0 14px",
                        color: "#0f172a",
                      }}
                    >
                      {c.name}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "#475569", margin: "0 0 16px" }}>
                      {c.what}
                    </p>
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
                      {c.facts.map((f, j) => (
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
                              background: c.accent,
                              borderRadius: 1,
                            }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Worked example */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 16,
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "#94a3b8",
                        marginBottom: 10,
                      }}
                    >
                      Example
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", minWidth: 28 }}>
                          IN
                        </span>
                        <BitRow bits={c.example.from} accent={c.accent} dim />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", minWidth: 28 }}>
                          OUT
                        </span>
                        <BitRow bits={c.example.to} accent={c.accent} />
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "10px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>
                      {c.example.note}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── CONCEPT CALLOUT ── */}
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
                03 — Why Convert?
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
                Reliable bits,<br />safe arithmetic
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#475569", margin: 0 }}>
                Different encodings exist for a reason — each solves a specific problem that plain
                binary cannot.
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
                  color: "#f59e0b",
                  marginBottom: 20,
                }}
              >
                Purpose of each code
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { name: "Gray Code", color: "#3b82f6", desc: "Only one bit changes per step — no glitches in sensors and encoders." },
                  { name: "Excess-3", color: "#10b981", desc: "Self-complementing: subtraction becomes addition of the bitwise NOT." },
                  { name: "BCD", color: "#f59e0b", desc: "Direct decimal display; used in 7-segment drivers and calculators." },
                ].map((item) => (
                  <div key={item.name} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span
                      style={{
                        marginTop: 6,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3, fontFamily: "'JetBrains Mono', monospace" }}>
                        {item.name}
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.55, color: "#94a3b8", margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
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
            04 — Explore Converters
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 6px",
            }}
          >
            Dive into a converter
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 28px", maxWidth: 520 }}>
            Each guide walks through the method from scratch — worked examples included.
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