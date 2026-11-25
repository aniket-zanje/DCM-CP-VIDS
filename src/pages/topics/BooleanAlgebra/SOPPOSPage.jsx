import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#f59e0b';
const SECONDARY = '#8b5cf6';

/* ─────────────── shared helpers ─────────────── */
function SectionHead({ n, title, sub, color = "#94a3b8" }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color, marginBottom: 6 }}>{n}</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px", color: "#0f172a", whiteSpace: "pre-line" }}>{title}</h2>
      {sub && <p style={{ fontSize: 14, color: "#64748b", margin: 0, maxWidth: 660, lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

function Code({ children, color = "#0f172a" }) {
  return (
    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, color }}>
      {children}
    </code>
  );
}

function FormulaBlock({ label, children, color = ACCENT }) {
  return (
    <div style={{ background: "#0f172a", borderRadius: 4, padding: "22px 26px", marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: "#fff", lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
}

function StepList({ steps, accent }) {
  return (
    <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
      {steps.map((s, i) => (
        <li key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, alignItems: "flex-start" }}>
          <span style={{ width: 26, height: 26, borderRadius: 4, background: accent + "18", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div style={{ paddingTop: 2 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{s.title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "#64748b" }}>{s.detail}</div>
            {s.expr && (
              <div style={{ marginTop: 6, padding: "6px 10px", background: "#f8fafc", border: "1px solid #e8e8f0", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#0f172a", display: "inline-block" }}>
                {s.expr}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* A single conversion example card */
function ConversionExample({ n, title, start, steps, result, accent }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "26px 28px", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: accent }}>
          Example {n}
        </span>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>{title}</span>
      </div>

      <div style={{ marginBottom: 20, padding: "14px 18px", background: "#f8fafc", border: "1px solid #e8e8f0", borderRadius: 3 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>Starting expression</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{start}</div>
      </div>

      <StepList steps={steps} accent={accent} />

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: accent }}>Result</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{result}</span>
      </div>
    </div>
  );
}

/* ─────────────── SOP ─────────────── */
function SOPContent() {
  return (
    <div>
      {/* Theory */}
      <section style={{ marginBottom: 44 }}>
        <SectionHead
          n="SOP · 01 — Theory"
          title="Sum of Products"
          sub="An OR of AND-terms. Each product term (minterm) is 1 for exactly one combination of inputs — so the full expression is 1 wherever any of those combinations is active."
          color={ACCENT}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "20px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>Structure</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#475569", margin: 0 }}>
              A sum (OR) of product terms (AND). Written as <Code color={ACCENT}>F = P₁ + P₂ + P₃ + …</Code> where each <Code>Pᵢ</Code> is a product of literals.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "20px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>When to use</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#475569", margin: 0 }}>
              Prefer SOP when the truth table has <strong>fewer 1s than 0s</strong> — you cover the 1s directly.
            </p>
          </div>
        </div>

        <FormulaBlock label="Canonical SOP (minterm form)">
          F(A,B,C) = Σm(1, 3, 5, 7)
          <br />
          <span style={{ color: "#64748b" }}>Each mᵢ corresponds to one row of the truth table where F = 1</span>
        </FormulaBlock>
      </section>

      {/* Minterm table */}
      <section style={{ marginBottom: 44 }}>
        <SectionHead n="SOP · 02 — Minterms" title="Every minterm for 3 variables" />
        <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 12, padding: "12px 20px", background: "#0f172a", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8" }}>
            <div>mᵢ</div><div>A B C</div><div>Minterm</div>
          </div>
          {[
            ["m₀", "0 0 0", "Ā · B̄ · C̄"],
            ["m₁", "0 0 1", "Ā · B̄ · C"],
            ["m₂", "0 1 0", "Ā · B · C̄"],
            ["m₃", "0 1 1", "Ā · B · C"],
            ["m₄", "1 0 0", "A · B̄ · C̄"],
            ["m₅", "1 0 1", "A · B̄ · C"],
            ["m₆", "1 1 0", "A · B · C̄"],
            ["m₇", "1 1 1", "A · B · C"],
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 12, padding: "9px 20px", borderBottom: i < 7 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: ACCENT }}>{row[0]}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#475569" }}>{row[1]}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{row[2]}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#64748b", marginTop: 12 }}>
          A variable is primed (complemented) when its input is 0, unprimed when it is 1. Each minterm is 1 on exactly one row of the truth table.
        </p>
      </section>

      {/* Conversion — big section with examples */}
      <section style={{ marginBottom: 44 }}>
        <SectionHead
          n="SOP · 03 — Conversion"
          title="Simple expression → canonical SOP"
          sub="Expand each product term by multiplying in (X + X̄) for every missing variable. Then deduplicate and read off the minterm indices."
        />

        <FormulaBlock label="The expansion trick">
          Term missing variable X?  Multiply by (X + X̄) = 1
          <br />
          <span style={{ color: "#64748b" }}>Value is unchanged, but the term now contains every variable</span>
        </FormulaBlock>

        {/* Example 1 */}
        <ConversionExample
          n="1"
          title="Two-term expression, one variable missing"
          start="F(A,B,C) = A + B̄C"
          accent={ACCENT}
          steps={[
            { title: "Spot missing variables", detail: "Term A is missing B and C. Term B̄C is missing A.", expr: "A → missing B, C   ·   B̄C → missing A" },
            { title: "Expand the A term", detail: "Multiply A by (B + B̄) and (C + C̄) — two missing variables means two expansion steps.", expr: "A(B + B̄)(C + C̄)" },
            { title: "Distribute to four minterms", detail: "Expand the ORs step by step until every product contains A, B, and C.", expr: "ABC + ABC̄ + AB̄C + AB̄C̄" },
            { title: "Expand the B̄C term", detail: "Only A is missing — one expansion step.", expr: "B̄C(A + Ā) = AB̄C + ĀB̄C" },
            { title: "Combine and deduplicate", detail: "AB̄C appears in both lists — keep it once.", expr: "ABC + ABC̄ + AB̄C + AB̄C̄ + ĀB̄C" },
            { title: "Read off minterm indices", detail: "Each product term is a minterm. Write its binary value as the index.", expr: "F = Σm(7, 6, 5, 4, 1) = Σm(1, 4, 5, 6, 7)" },
          ]}
          result="F = Σm(1, 4, 5, 6, 7)"
        />

        {/* Example 2 */}
        <ConversionExample
          n="2"
          title="Expression with a single literal"
          start="F(A,B) = A + B"
          accent={ACCENT}
          steps={[
            { title: "Spot missing variables", detail: "Term A is missing B. Term B is missing A.", expr: "A → missing B   ·   B → missing A" },
            { title: "Expand the A term", detail: "Multiply A by (B + B̄).", expr: "A(B + B̄) = AB + AB̄" },
            { title: "Expand the B term", detail: "Multiply B by (A + Ā).", expr: "B(A + Ā) = AB + ĀB" },
            { title: "Combine and deduplicate", detail: "AB appears in both expansions — keep one copy.", expr: "AB + AB̄ + ĀB" },
            { title: "Read off minterm indices", detail: "AB = m₃, AB̄ = m₂, ĀB = m₁.", expr: "F = Σm(1, 2, 3)" },
          ]}
          result="F = Σm(1, 2, 3)"
        />

        {/* Example 3 */}
        <ConversionExample
          n="3"
          title="Expression from a truth table"
          start="F(A,B,C) = 1 at rows 2, 3, 5, 7"
          accent={ACCENT}
          steps={[
            { title: "Identify the 1-rows", detail: "F is 1 on rows 2, 3, 5, 7 of the truth table.", expr: "rows: 2, 3, 5, 7" },
            { title: "Write a minterm for each 1-row", detail: "For each row, prime variables that are 0 and leave 1s unprimed.", expr: "row 2 (010) → ĀBC̄   ·   row 3 (011) → ĀBC" },
            { title: "Write the rest of the minterms", detail: "Row 5 (101) → AB̄C. Row 7 (111) → ABC.", expr: "row 5 → AB̄C   ·   row 7 → ABC" },
            { title: "OR all minterms together", detail: "The canonical SOP is the sum of these minterms.", expr: "F = ĀBC̄ + ĀBC + AB̄C + ABC" },
            { title: "Write as Σm", detail: "Compress into sum-of-minterms notation.", expr: "F = Σm(2, 3, 5, 7)" },
          ]}
          result="F = Σm(2, 3, 5, 7)"
        />

        {/* Example 4 */}
        <ConversionExample
          n="4"
          title="Expression with duplicate minterms"
          start="F(A,B) = AB + AB + A"
          accent={ACCENT}
          steps={[
            { title: "Remove obvious duplicates", detail: "AB appears twice — remove the duplicate immediately.", expr: "AB + A" },
            { title: "Spot missing variables", detail: "AB is complete (both variables). A is missing B.", expr: "A → missing B" },
            { title: "Expand A", detail: "Multiply A by (B + B̄).", expr: "A(B + B̄) = AB + AB̄" },
            { title: "Combine all terms", detail: "Add the earlier AB term back in.", expr: "AB + AB + AB̄" },
            { title: "Deduplicate once more", detail: "AB appears twice — keep one copy.", expr: "AB + AB̄" },
            { title: "Read off minterm indices", detail: "AB = m₃, AB̄ = m₂.", expr: "F = Σm(2, 3)" },
          ]}
          result="F = Σm(2, 3)"
        />

        {/* Common mistakes */}
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #ef4444", borderRadius: 4, padding: "18px 22px", marginTop: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#ef4444", marginBottom: 8 }}>
            Common mistakes to avoid
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.8, color: "#475569" }}>
            <li>Forgetting to expand <em>every</em> term — one unexpanded term means it's not canonical.</li>
            <li>Forgetting that a missing variable might require <em>multiple</em> (X + X̄) factors.</li>
            <li>Not deduplicating overlapping minterms after expansion.</li>
            <li>Reading minterm indices from 0-rows instead of 1-rows.</li>
          </ul>
        </div>
      </section>

      {/* Quick reference */}
      <section>
        <div style={{ background: "#0f172a", borderRadius: 4, padding: "24px 28px", color: "#fff" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>SOP quick reference</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.85, color: "#cbd5e1" }}>
            <li>OR of AND-terms — every term is a product of literals.</li>
            <li>In canonical form, each term is a full <strong style={{ color: "#fff" }}>minterm</strong> (all variables appear once).</li>
            <li>Reads 1s from the truth table — good when 1s are the minority.</li>
            <li>Notation: <span style={{ fontFamily: "'JetBrains Mono', monospace", color: ACCENT }}>F = Σm(…)</span></li>
            <li>Implemented as a two-level AND-OR circuit.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── POS ─────────────── */
function POSContent() {
  return (
    <div>
      {/* Theory */}
      <section style={{ marginBottom: 44 }}>
        <SectionHead
          n="POS · 01 — Theory"
          title="Product of Sums"
          sub="An AND of OR-terms. Each sum term (maxterm) is 0 on exactly one combination of inputs — so the expression is 0 only where all its factors are simultaneously 0."
          color={SECONDARY}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "20px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: SECONDARY, marginBottom: 8 }}>Structure</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#475569", margin: 0 }}>
              A product (AND) of sum terms (OR). Written as <Code color={SECONDARY}>F = S₁ · S₂ · S₃ · …</Code> where each <Code>Sᵢ</Code> is a sum of literals.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "20px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: SECONDARY, marginBottom: 8 }}>When to use</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#475569", margin: 0 }}>
              Prefer POS when the truth table has <strong>fewer 0s than 1s</strong> — you cover the 0s directly.
            </p>
          </div>
        </div>

        <FormulaBlock label="Canonical POS (maxterm form)" color={SECONDARY}>
          F(A,B,C) = ΠM(0, 2, 6)
          <br />
          <span style={{ color: "#64748b" }}>Each Mᵢ corresponds to one row of the truth table where F = 0</span>
        </FormulaBlock>
      </section>

      {/* Maxterm table */}
      <section style={{ marginBottom: 44 }}>
        <SectionHead n="POS · 02 — Maxterms" title="Every maxterm for 3 variables" />
        <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 12, padding: "12px 20px", background: "#0f172a", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8" }}>
            <div>Mᵢ</div><div>A B C</div><div>Maxterm</div>
          </div>
          {[
            ["M₀", "0 0 0", "A + B + C"],
            ["M₁", "0 0 1", "A + B + C̄"],
            ["M₂", "0 1 0", "A + B̄ + C"],
            ["M₃", "0 1 1", "A + B̄ + C̄"],
            ["M₄", "1 0 0", "Ā + B + C"],
            ["M₅", "1 0 1", "Ā + B + C̄"],
            ["M₆", "1 1 0", "Ā + B̄ + C"],
            ["M₇", "1 1 1", "Ā + B̄ + C̄"],
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: 12, padding: "9px 20px", borderBottom: i < 7 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: SECONDARY }}>{row[0]}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#475569" }}>{row[1]}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{row[2]}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#64748b", marginTop: 12 }}>
          A maxterm is the exact opposite of a minterm: a variable is primed when its input is 1, unprimed when it is 0. Each maxterm is 0 on exactly one row of the truth table.
        </p>
      </section>

      {/* Conversion */}
      <section style={{ marginBottom: 44 }}>
        <SectionHead
          n="POS · 03 — Conversion"
          title="Simple expression → canonical POS"
          sub="Expand each factor using the dual distributive rule X + YZ = (X+Y)(X+Z) until every sum term contains all variables."
        />

        <FormulaBlock label="The expansion trick" color={SECONDARY}>
          Factor missing variable X?  Add (X · X̄) = 0, then distribute
          <br />
          <span style={{ color: "#64748b" }}>Value is unchanged, but the factor now contains every variable</span>
        </FormulaBlock>

        {/* Example 1 */}
        <ConversionExample
          n="1"
          title="Two-factor expression, one variable missing each"
          start="F(A,B,C) = (A + B)(Ā + C)"
          accent={SECONDARY}
          steps={[
            { title: "Spot missing variables", detail: "Factor (A + B) is missing C. Factor (Ā + C) is missing B.", expr: "(A+B) → missing C   ·   (Ā+C) → missing B" },
            { title: "Add the missing variable as X·X̄", detail: "Since X·X̄ = 0, we can safely add it inside the OR.", expr: "(A+B) + C·C̄   ·   (Ā+C) + B·B̄" },
            { title: "Apply dual distributivity", detail: "X + YZ = (X+Y)(X+Z) splits each factor into two.", expr: "(A+B+C)(A+B+C̄)   ·   (Ā+C+B)(Ā+C+B̄)" },
            { title: "Tidy each factor", detail: "Order literals alphabetically for readability.", expr: "(A+B+C)(A+B+C̄) · (Ā+B+C)(Ā+B̄+C)" },
            { title: "Read off maxterm indices", detail: "For each factor, invert the constants (0↔1) to get the maxterm index.", expr: "M₀ · M₁ · M₄ · M₆" },
            { title: "Write as ΠM", detail: "Combine all maxterms into product notation.", expr: "F = ΠM(0, 1, 4, 6)" },
          ]}
          result="F = ΠM(0, 1, 4, 6)"
        />

        {/* Example 2 */}
        <ConversionExample
          n="2"
          title="Single factor with three variables"
          start="F(A,B,C) = A + B + C"
          accent={SECONDARY}
          steps={[
            { title: "Check completeness", detail: "All three variables are already present — this factor is already a maxterm.", expr: "A + B + C = M₀" },
            { title: "Read off index", detail: "Convert the constant values (0→unprimed, 1→primed): A=0, B=0, C=0 → index 0.", expr: "000 → M₀" },
            { title: "Write canonical form", detail: "Single maxterm product.", expr: "F = ΠM(0)" },
          ]}
          result="F = ΠM(0)"
        />

        {/* Example 3 */}
        {(() => { return null; })()}
        <ConversionExample
          n="3"
          title="Mixed terms with duplicates"
          start="F(A,B,C) = (A+B+C)(A+B)(A+B+C)"
          accent={SECONDARY}
          steps={[
            { title: "Remove obvious duplicates", detail: "(A+B+C) appears twice — keep one copy.", expr: "(A+B+C)(A+B)" },
            { title: "Spot missing variables", detail: "The (A+B) factor is missing C.", expr: "(A+B) → missing C" },
            { title: "Add the missing variable", detail: "Add C·C̄ to (A+B).", expr: "(A+B) + C·C̄" },
            { title: "Apply dual distributivity", detail: "Split into two factors with C and C̄.", expr: "(A+B+C)(A+B+C̄)" },
            { title: "Combine all factors", detail: "Re-attach the already-complete factor.", expr: "(A+B+C)(A+B+C̄)(A+B+C)" },
            { title: "Deduplicate and read off", detail: "(A+B+C) = M₀ and (A+B+C̄) = M₁.", expr: "F = ΠM(0, 1)" },
          ]}
          result="F = ΠM(0, 1)"
        />

        {/* Example 4 — truth-table based */}
        <ConversionExample
          n="4"
          title="From a truth table"
          start="F(A,B,C) = 0 at rows 1, 4, 6"
          accent={SECONDARY}
          steps={[
            { title: "Identify the 0-rows", detail: "F is 0 on rows 1, 4, 6.", expr: "rows: 1, 4, 6" },
            { title: "Write a maxterm for each 0-row", detail: "For each row, prime variables that are 1 and leave 0s unprimed — the opposite of minterms.", expr: "row 1 (001) → A+B+C̄   ·   row 4 (100) → Ā+B+C" },
            { title: "Complete the remaining maxterm", detail: "Row 6 (110) → Ā+B̄+C.", expr: "row 6 → Ā+B̄+C" },
            { title: "AND all maxterms together", detail: "The canonical POS is the product of these maxterms.", expr: "F = (A+B+C̄)(Ā+B+C)(Ā+B̄+C)" },
            { title: "Write as ΠM", detail: "Compress into product-of-maxterms notation.", expr: "F = ΠM(1, 4, 6)" },
          ]}
          result="F = ΠM(1, 4, 6)"
        />

        {/* Common mistakes */}
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #ef4444", borderRadius: 4, padding: "18px 22px", marginTop: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#ef4444", marginBottom: 8 }}>
            Common mistakes to avoid
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.8, color: "#475569" }}>
            <li>Using the minterm priming rule (prime 0s) instead of the maxterm rule (prime 1s).</li>
            <li>Forgetting that adding a missing variable to a sum requires <Code>X · X̄</Code>, not <Code>X + X̄</Code>.</li>
            <li>Failing to apply the <em>dual</em> distributive rule <Code>X + YZ = (X+Y)(X+Z)</Code> when expanding.</li>
            <li>Reading maxterm indices from 1-rows instead of 0-rows.</li>
          </ul>
        </div>
      </section>

      {/* Quick reference */}
      <section>
        <div style={{ background: "#0f172a", borderRadius: 4, padding: "24px 28px", color: "#fff" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: SECONDARY, marginBottom: 12 }}>POS quick reference</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.85, color: "#cbd5e1" }}>
            <li>AND of OR-terms — every term is a sum of literals.</li>
            <li>In canonical form, each term is a full <strong style={{ color: "#fff" }}>maxterm</strong> (all variables appear once).</li>
            <li>Reads 0s from the truth table — good when 0s are the minority.</li>
            <li>Notation: <span style={{ fontFamily: "'JetBrains Mono', monospace", color: SECONDARY }}>F = ΠM(…)</span></li>
            <li>Implemented as a two-level OR-AND circuit.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── Page ─────────────── */
export default function SOPPOSPage() {
  const [tab, setTab] = useState("SOP");

  const tabs = [
    { key: "SOP", label: "Sum of Products", short: "SOP", color: ACCENT, desc: "OR of AND-terms" },
    { key: "POS", label: "Product of Sums", short: "POS", color: SECONDARY, desc: "AND of OR-terms" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fbfbfd", color: "#0f172a", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 100px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#94a3b8", marginBottom: 40 }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <Link to="/topics/boolean-algebra" style={{ color: "#94a3b8", textDecoration: "none" }}>Boolean Algebra</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>SOP &amp; POS</span>
        </div>

        {/* Masthead */}
        <header style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "end", paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>
              Boolean Algebra · Canonical Forms
            </div>
            <h1 style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.045em", margin: 0 }}>
              SOP &amp;
              <br />
              POS
              <span style={{ color: ACCENT }}>.</span>
            </h1>
            <div style={{ marginTop: 20, width: 64, height: 4, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, borderRadius: 2 }} />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              The two canonical forms of Boolean expressions — minterms, maxterms, and how to convert any expression to its standard SOP or POS with full worked examples.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              Σm notation · ΠM notation · 8 conversion examples
            </p>
          </div>
        </header>

        {/* Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  background: active ? "#0f172a" : "#fff",
                  border: `1px solid ${active ? "#0f172a" : "#e8e8f0"}`,
                  borderRadius: 4,
                  padding: "20px 24px",
                  transition: "all 0.18s",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: active ? t.color : "#94a3b8", marginBottom: 6 }}>
                  {t.short}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: active ? "#fff" : "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 13, color: active ? "#94a3b8" : "#64748b" }}>
                  {t.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {tab === "SOP" ? <SOPContent /> : <POSContent />}
      </div>
    </div>
  );
}