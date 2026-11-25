import React from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#f59e0b';
const SECONDARY = '#8b5cf6';

/* ─────────────── K-Map renderer ─────────────── */
function KMap({ rowLabels, colLabels, cells, groups = [], accent = ACCENT, size = 54, wrong }) {
  const header = 40;
  const totalW = header + colLabels.length * size;
  const totalH = header + rowLabels.length * size;
  const cellX = (ci) => header + ci * size;
  const cellY = (ri) => header + ri * size;

  return (
    <svg viewBox={`0 0 ${totalW + 8} ${totalH + 8}`} style={{ width: "100%", maxWidth: totalW + 8, height: "auto", display: "block" }}>
      {colLabels.map((c, ci) => (
        <text key={`c${ci}`} x={cellX(ci) + size / 2} y={header / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={800} fill="#64748b" fontFamily="'JetBrains Mono', monospace">{c}</text>
      ))}
      {rowLabels.map((r, ri) => (
        <text key={`r${ri}`} x={header / 2} y={cellY(ri) + size / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={800} fill="#64748b" fontFamily="'JetBrains Mono', monospace">{r}</text>
      ))}
      <line x1={4} y1={header - 6} x2={header - 6} y2={4} stroke="#cbd5e1" strokeWidth="1" />

      {rowLabels.map((r, ri) =>
        colLabels.map((c, ci) => {
          const key = `${r}${c}`;
          const val = cells[key] ?? "";
          const isOne = val === "1";
          const isX = val === "X";
          return (
            <g key={key}>
              <rect x={cellX(ci)} y={cellY(ri)} width={size} height={size} fill={isOne ? "#fffbeb" : isX ? "#f8fafc" : "#fff"} stroke="#e2e8f0" strokeWidth="1" />
              <text x={cellX(ci) + size / 2} y={cellY(ri) + size / 2 + 5} textAnchor="middle" fontSize={16} fontWeight={isOne ? 800 : 600} fill={isOne ? accent : isX ? "#94a3b8" : "#cbd5e1"} fontFamily="'JetBrains Mono', monospace">
                {val || "·"}
              </text>
            </g>
          );
        })
      )}

      {groups.map((g, gi) => {
        const rows = g.cells.map(([r]) => rowLabels.indexOf(r));
        const cols = g.cells.map(([, c]) => colLabels.indexOf(c));
        const minR = Math.min(...rows), maxR = Math.max(...rows);
        const minC = Math.min(...cols), maxC = Math.max(...cols);
        const x = cellX(minC) + 2;
        const y = cellY(minR) + 2;
        const w = (maxC - minC + 1) * size - 4;
        const h = (maxR - minR + 1) * size - 4;
        return (
          <g key={gi}>
            <rect x={x} y={y} width={w} height={h} rx={8} ry={8} fill="none" stroke={g.color} strokeWidth="2.5" strokeDasharray={wrong ? "6 4" : undefined} />
            {g.label && <text x={x + w / 2} y={y - 4} textAnchor="middle" fontSize={10} fontWeight={800} fill={g.color} fontFamily="'JetBrains Mono', monospace">{g.label}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function SectionHead({ n, title, sub, color = "#94a3b8" }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color, marginBottom: 6 }}>{n}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px", color: "#0f172a", whiteSpace: "pre-line" }}>{title}</h2>
      {sub && <p style={{ fontSize: 14, color: "#64748b", margin: 0, maxWidth: 640, lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

/* ─────────────── Rules ─────────────── */
const rules = [
  { n: "R1", name: "Power-of-two groups", desc: "Groups must contain 1, 2, 4, 8, or 16 cells — never 3, 5, 6, or 7." },
  { n: "R2", name: "Largest first",        desc: "Always favour the biggest possible group; a 4-cell group beats two 2-cell groups." },
  { n: "R3", name: "Rectangles only",      desc: "Groups must be squares or rectangles — no L-shapes, no diagonals." },
  { n: "R4", name: "Edges wrap",           desc: "Top and bottom edges are adjacent; left and right edges are adjacent." },
  { n: "R5", name: "Corners connect",      desc: "In 4-variable maps, all four corners form a valid 4-cell group." },
  { n: "R6", name: "Overlap allowed",      desc: "Groups may share cells — as long as every 1 is covered by at least one group." },
  { n: "R7", name: "Every 1 covered",      desc: "Each 1 must belong to at least one group. A lone 1 becomes a 1-cell group." },
  { n: "R8", name: "Read off products",    desc: "A variable that changes inside a group is dropped; only constants survive." },
];

/* ─────────────── Right examples (detailed) ─────────────── */
const goodExamples = [
  {
    id: "pair",
    title: "Example 1 · Simple pair (2-variable)",
    expr: "F(A,B) = Σm(1, 3)",
    rows: ["0", "1"],
    cols: ["0", "1"],
    cells: { "00": "0", "01": "0", "10": "1", "11": "1" },
    groups: [{ cells: [["1", "0"], ["1", "1"]], color: "#3b82f6", label: "A" }],
    result: "F = A",
    walkthrough: [
      "Plot: row A = 1 has two adjacent 1s (B = 0 and B = 1).",
      "Group those two cells — a 2-cell group drops exactly one variable.",
      "B changes across the pair (0 → 1), so B drops out.",
      "A stays constant at 1 in both cells, so A survives.",
    ],
    why: "Both cells where A = 1 are covered by a single group. One group, one term, minimum literals.",
  },
  {
    id: "quad-corner",
    title: "Example 2 · Corner quad (3-variable)",
    expr: "F(A,B,C) = Σm(0, 1, 4, 5)",
    rows: ["0", "1"],
    cols: ["00", "01", "11", "10"],
    cells: { "000": "1", "001": "1", "011": "0", "010": "0", "100": "1", "101": "1", "111": "0", "110": "0" },
    groups: [{ cells: [["0", "00"], ["0", "01"], ["1", "00"], ["1", "01"]], color: "#10b981", label: "B̄" }],
    result: "F = B̄",
    walkthrough: [
      "The four 1s sit in columns 00 and 01 — the leftmost two columns.",
      "Together they form a 2×2 block (4 cells) — a quad.",
      "Across the quad: A varies (both 0 and 1), C varies (only 0 present, so it also varies), B stays 0.",
      "Only B is constant, and it's 0 → the term is B̄.",
    ],
    why: "A quad removes two variables. Here both A and C disappear, leaving a single literal.",
  },
  {
    id: "wrap",
    title: "Example 3 · Wrap-around quad (4-variable)",
    expr: "F(A,B,C,D) = Σm(0, 2, 8, 10)",
    rows: ["00", "01", "11", "10"],
    cols: ["00", "01", "11", "10"],
    cells: {
      "0000": "1", "0001": "0", "0011": "0", "0010": "1",
      "0100": "0", "0101": "0", "0111": "0", "0110": "0",
      "1100": "0", "1101": "0", "1111": "0", "1110": "0",
      "1000": "1", "1001": "0", "1011": "0", "1010": "1",
    },
    groups: [{ cells: [["00", "00"], ["00", "10"], ["10", "00"], ["10", "10"]], color: "#8b5cf6", label: "B̄D̄" }],
    result: "F = B̄D̄",
    walkthrough: [
      "The four 1s are at all four corners of the map.",
      "Corners wrap: top-left connects to top-right, top connects to bottom.",
      "Together they form one 4-cell group — a wrapped quad.",
      "Across the corners: A varies (00 ↔ 10), C varies (00 ↔ 10), B stays 0, D stays 0.",
      "Only B and D are constant → the term is B̄D̄.",
    ],
    why: "Don't miss the corner trick — without it, you'd wrongly write four separate minterms.",
  },
  {
    id: "row",
    title: "Example 4 · Full row block (4-variable)",
    expr: "F(A,B,C,D) = Σm(4,5,6,7,12,13,14,15)",
    rows: ["00", "01", "11", "10"],
    cols: ["00", "01", "11", "10"],
    cells: {
      "0000": "0", "0001": "0", "0011": "0", "0010": "0",
      "0100": "1", "0101": "1", "0111": "1", "0110": "1",
      "1100": "1", "1101": "1", "1111": "1", "1110": "1",
      "1000": "0", "1001": "0", "1011": "0", "1010": "0",
    },
    groups: [{ cells: [["01", "00"], ["01", "01"], ["01", "11"], ["01", "10"], ["11", "00"], ["11", "01"], ["11", "11"], ["11", "10"]], color: "#ef4444", label: "A" }],
    result: "F = A",
    walkthrough: [
      "Rows 01 and 11 are entirely filled with 1s — that's a 2×4 block.",
      "A is 1 in both rows. B varies (0 ↔ 1), C varies, D varies.",
      "An 8-cell group drops three variables.",
      "The only surviving constant is A = 1 → F = A.",
    ],
    why: "Two full rows is a single 8-cell group — far fewer terms than any smaller grouping.",
  },
  {
    id: "dontcare",
    title: "Example 5 · Don't-care (3-variable)",
    expr: "F(A,B,C) = Σm(0,1,5) + d(4)",
    rows: ["0", "1"],
    cols: ["00", "01", "11", "10"],
    cells: { "000": "1", "001": "1", "011": "0", "010": "0", "100": "X", "101": "1", "111": "0", "110": "0" },
    groups: [{ cells: [["0", "00"], ["0", "01"], ["1", "00"], ["1", "01"]], color: "#06b6d4", label: "B̄" }],
    result: "F = B̄",
    walkthrough: [
      "Without X: you'd need one group for cells (0,0), another for (1,5) — two terms.",
      "Treat X at cell 4 as 1 — now the four leftmost cells form a single quad.",
      "Across the quad: A varies, C varies, B stays 0 → term is B̄.",
      "One term instead of two.",
    ],
    why: "Don't-care Xs are free helpers — use them when they enlarge a group, ignore them otherwise.",
  },
];

/* ─────────────── Wrong groupings ─────────────── */
const wrongExamples = [
  {
    id: "w1",
    title: "Wrong #1 · Diagonal group",
    subtitle: "Diagonals don't count",
    expr: "F(A,B) with 1s at (0,0) and (1,1)",
    rows: ["0", "1"],
    cols: ["0", "1"],
    cells: { "00": "1", "01": "0", "10": "0", "11": "1" },
    groups: [{ cells: [["0", "0"], ["1", "1"]], color: "#ef4444", label: "✗" }],
    wrong: true,
    why: "Diagonal cells differ in TWO variables — they cannot be combined. Adjacent means sharing an edge, never a corner-touch.",
    fix: "Each 1 stands alone → F = ĀB̄ + AB.",
  },
  {
    id: "w2",
    title: "Wrong #2 · Group of 3",
    subtitle: "Only powers of two",
    expr: "F(A,B) with three adjacent 1s",
    rows: ["0", "1"],
    cols: ["0", "1"],
    cells: { "00": "1", "01": "1", "10": "0", "11": "1" },
    groups: [{ cells: [["0", "0"], ["0", "1"], ["1", "1"]], color: "#ef4444", label: "✗" }],
    wrong: true,
    why: "A group of 3 cannot be simplified to a clean product term — one variable would remain half-dropped. Illegal.",
    fix: "Use a 2-cell group instead: pair (0,0)+(0,1) gives Ā; cell (1,1) stays alone as AB.",
  },
  {
    id: "w3",
    title: "Wrong #3 · L-shaped group",
    subtitle: "Rectangles only",
    expr: "F(A,B) with an L-shaped set of 1s",
    rows: ["0", "1"],
    cols: ["0", "1"],
    cells: { "00": "1", "01": "1", "10": "1", "11": "0" },
    groups: [{ cells: [["0", "0"], ["0", "1"], ["1", "0"]], color: "#ef4444", label: "✗" }],
    wrong: true,
    why: "An L-shape is not a rectangle. Groups must be a clean rectangular block of cells — never a bent shape.",
    fix: "Two legal 2-cell groups: pair (0,0)+(0,1) → Ā; pair (0,0)+(1,0) → B̄. F = Ā + B̄.",
  },
  {
    id: "w4",
    title: "Wrong #4 · Missing a 1",
    subtitle: "Every 1 must be covered",
    expr: "F(A,B) with an uncovered 1",
    rows: ["0", "1"],
    cols: ["0", "1"],
    cells: { "00": "1", "01": "0", "10": "1", "11": "1" },
    groups: [{ cells: [["1", "0"], ["1", "1"]], color: "#10b981", label: "A" }],
    wrong: true,
    why: "The 1 at (0,0) is left uncovered. The result F = A misses this minterm entirely.",
    fix: "Add a second group around (0,0) — a lone 1. Final result: F = A + ĀB̄.",
  },
];

export default function KMapPage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fbfbfd", color: "#0f172a", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 28px 100px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#94a3b8", marginBottom: 40 }}>
          <Link to="/topics" style={{ color: "#94a3b8", textDecoration: "none" }}>Topics</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <Link to="/topics/boolean-algebra" style={{ color: "#94a3b8", textDecoration: "none" }}>Boolean Algebra</Link>
          <span style={{ margin: "0 10px" }}>—</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Karnaugh Maps</span>
        </div>

        {/* Masthead */}
        <header style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "end", paddingBottom: 40, borderBottom: "1px solid #e2e8f0", marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>
              Boolean Algebra · Minimization
            </div>
            <h1 style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.045em", margin: 0 }}>
              Karnaugh
              <br />
              Maps
              <span style={{ color: ACCENT }}>.</span>
            </h1>
            <div style={{ marginTop: 20, width: 64, height: 4, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, borderRadius: 2 }} />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>
              A visual method for simplifying Boolean expressions — group-size rules, worked examples, and every common mistake.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              Gray-coded grid · power-of-two groups · wrap-around edges · don't-cares
            </p>
          </div>
        </header>

        {/* Definition */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 48, marginBottom: 56, alignItems: "start" }}>
          <SectionHead n="01 — Definition" title={"What is a\nK-Map?"} />
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#334155", margin: "0 0 20px" }}>
              A <strong style={{ color: ACCENT }}>Karnaugh map</strong> is a grid where each cell corresponds to one row of a truth table. Cells are ordered in <em>Gray code</em> so that any two adjacent cells differ in exactly one variable — meaning they can be combined. Grouping 1s in powers of two eliminates variables and yields the simplified expression.
            </p>
            <div style={{ background: "#0f172a", borderRadius: 4, padding: "24px 28px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>
                The Core Idea
              </div>
              <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: "#fff", lineHeight: 1.75, display: "block" }}>
                Adjacent cells → one variable drops
                <br />
                <span style={{ color: "#64748b" }}>Group of 2ⁿ cells → n variables drop</span>
              </code>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section style={{ marginBottom: 56 }}>
          <SectionHead n="02 — Rules" title="The eight rules of grouping" sub="Every legal K-map simplification follows these constraints. Break any one and the result is wrong." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {rules.map((r) => (
              <div key={r.n} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 800, color: ACCENT }}>{r.n}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{r.name}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#64748b", margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Group-size cheat sheet */}
        <section style={{ marginBottom: 56 }}>
          <SectionHead n="03 — Group sizes" title="How many variables drop" />
          <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16, padding: "12px 20px", background: "#0f172a", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8" }}>
              <div>Group size</div>
              <div>Variables dropped</div>
              <div>Term shape</div>
            </div>
            {[
              ["1 cell",  "0", "Full minterm (all variables)"],
              ["2 cells", "1", "Product of n−1 literals"],
              ["4 cells", "2", "Product of n−2 literals"],
              ["8 cells", "3", "Product of n−3 literals"],
              ["16 cells", "4", "F = 1 (always true)"],
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16, padding: "12px 20px", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none", alignItems: "center" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: ACCENT }}>{row[0]}</div>
                <div style={{ fontSize: 13, color: "#475569" }}>{row[1]}</div>
                <div style={{ fontSize: 13, color: "#475569" }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Right examples */}
        <section style={{ marginBottom: 56 }}>
          <SectionHead n="04 — Worked examples" title="Five maps, five situations" sub="Each example shows the map, the correct grouping, a step-by-step walkthrough, and why the result is what it is." />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {goodExamples.map((ex) => (
              <article key={ex.id} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 4, padding: "24px 26px", display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start" }}>
                <div style={{ minWidth: 220 }}>
                  <KMap rowLabels={ex.rows} colLabels={ex.cols} cells={ex.cells} groups={ex.groups} accent={ACCENT} size={46} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>
                    {ex.title}
                  </div>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: ACCENT, marginBottom: 14, display: "block" }}>
                    {ex.expr}
                  </code>

                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>
                    Step by step
                  </div>
                  <ol style={{ margin: "0 0 14px", paddingLeft: 20, fontSize: 13, lineHeight: 1.7, color: "#475569" }}>
                    {ex.walkthrough.map((step, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>{step}</li>
                    ))}
                  </ol>

                  <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{ex.result}</div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#64748b", margin: 0 }}>{ex.why}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Wrong groupings */}
        <section style={{ marginBottom: 56 }}>
          <SectionHead
            n="05 — Wrong groupings"
            title="Four mistakes to avoid"
            sub="These are the traps that most often produce wrong answers — each shown with a dashed red group so the error is obvious."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
            {wrongExamples.map((wx) => (
              <article key={wx.id} style={{ background: "#fff", border: "1px solid #fee2e2", borderTop: "3px solid #ef4444", borderRadius: 4, padding: "20px 22px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#ef4444", marginBottom: 4 }}>
                  {wx.title}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{wx.subtitle}</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#94a3b8", margin: "0 0 14px" }}>{wx.expr}</p>

                <div style={{ marginBottom: 14 }}>
                  <KMap rowLabels={wx.rows} colLabels={wx.cols} cells={wx.cells} groups={wx.groups} accent={ACCENT} size={46} wrong />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#ef4444", marginBottom: 4 }}>
                    Why it's wrong
                  </div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#475569", margin: 0 }}>{wx.why}</p>
                </div>

                <div style={{ paddingTop: 10, borderTop: "1px solid #fee2e2" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#10b981", marginBottom: 4 }}>
                    Correct fix
                  </div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#475569", margin: 0 }}>{wx.fix}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Don't-cares */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 48, alignItems: "start" }}>
            <SectionHead n="06 — Don't-cares" title="X marks the spot" />
            <div style={{ background: "#0f172a", borderRadius: 4, padding: "28px 32px", color: "#fff" }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#cbd5e1", margin: "0 0 14px" }}>
                A <strong style={{ color: ACCENT }}>don't-care</strong> (X) is an input combination whose output doesn't matter — usually because it can never occur. Treat X as either 0 or 1, whichever produces a larger group.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8, color: "#94a3b8" }}>
                <li>Use X only when it helps form a bigger group.</li>
                <li>Ignore X when it doesn't improve any group.</li>
                <li>Never force an X into a group that doesn't already neighbour a 1.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section>
          <div style={{ background: "#0f172a", borderRadius: 4, padding: "28px 32px", color: "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
              Summary
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Grid</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>Gray-coded rows and columns — adjacent cells differ by one variable.</p>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Groups</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>Rectangles of 1, 2, 4, 8 cells — wrap edges freely, overlap allowed.</p>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Result</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>Variables that change within a group are dropped; constants remain.</p>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Coverage</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>Every 1 must appear in at least one group — miss one and the answer is wrong.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}