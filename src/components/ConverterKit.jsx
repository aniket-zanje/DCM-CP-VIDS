import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────── Theme ─────────────── */
export const ACCENT = '#8b5cf6';
export const SECONDARY = '#3b82f6';
export const GREEN = '#10b981';
export const INK = '#0f172a';
export const MUTED = '#475569';
export const LINE = '#e2e8f0';
const MONO = "'JetBrains Mono', monospace";

/* ─────────────── Scroll Reveal ─────────────── */
export function Reveal({ children, delay = 0 }) {
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

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────── Text primitives ─────────────── */
export function Card({ kicker, title, children }) {
  return (
    <Reveal>
      <section style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 32, marginBottom: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT, marginBottom: 8 }}>{kicker}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: INK }}>{title}</h2>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

export const P = ({ children, last }) => (
  <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, margin: last ? 0 : '0 0 20px', maxWidth: 720 }}>{children}</p>
);

export const Mono = ({ children }) => (
  <code style={{ fontFamily: MONO, fontSize: 13, background: '#f5f3ff', color: ACCENT, padding: '2px 6px', borderRadius: 4 }}>{children}</code>
);

export function Bullets({ items }) {
  return (
    <ul style={{ margin: '0 0 24px', paddingLeft: 20, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 720 }}>
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  );
}

/* Tiles: short, scannable points. tone="warn" for pitfalls. */
export function Tiles({ items, tone }) {
  const edge = tone === 'warn' ? '#f59e0b' : ACCENT;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
      {items.map((t) => (
        <div key={t.title} style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderLeft: `3px solid ${edge}`, borderRadius: 8, padding: '16px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>{t.title}</div>
          <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{t.body}</div>
        </div>
      ))}
    </div>
  );
}

/* StepList: genuinely ordered procedure, so numbering is meaningful. */
export function StepList({ items }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
      {items.map((s, i) => (
        <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: '14px 16px' }}>
          <span style={{ flex: '0 0 26px', height: 26, borderRadius: 999, background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, fontFamily: s.mono ? MONO : undefined }}>{s.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CodeBlock({ lang, children }) {
  return (
    <div style={{ background: INK, borderRadius: 8, overflow: 'hidden', border: '1px solid #1e293b' }}>
      <div style={{ padding: '8px 16px', fontSize: 11, color: '#94a3b8', borderBottom: '1px solid #1e293b', fontFamily: MONO }}>{lang}</div>
      <pre style={{ margin: 0, padding: 16, overflowX: 'auto', fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: '#e2e8f0' }}><code>{children}</code></pre>
    </div>
  );
}

/* ─────────────── Bit visuals ─────────────── */
function BitRow({ label, bits, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 70, fontSize: 12, fontWeight: 700, color: '#64748b' }}>{label}</div>
      {bits.map((b, i) => (
        <div key={i} style={{
          width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: MONO, fontSize: 18, fontWeight: 800, color,
          background: '#fff', border: `1px solid ${color}55`, borderRadius: 6,
        }}>{b}</div>
      ))}
    </div>
  );
}

/* Flow: input bits -> (optional per-bit tags or a single mid line) -> output bits */
export function Flow({ top, tags, mid, bottom, caption }) {
  return (
    <div style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 24, overflowX: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 'max-content' }}>
        <BitRow label={top.label} bits={top.bits} color={SECONDARY} />
        {tags && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 70 }} />
            {tags.map((s, i) => (
              <div key={i} style={{ width: 44, textAlign: 'center', fontSize: 11, color: '#94a3b8', fontFamily: MONO }}>{s}</div>
            ))}
          </div>
        )}
        {mid && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 70 }} />
            <div style={{ fontSize: 13, color: '#94a3b8', fontFamily: MONO }}>{mid}</div>
          </div>
        )}
        <BitRow label={bottom.label} bits={bottom.bits} color={ACCENT} />
      </div>
      {caption && <p style={{ margin: '16px 0 0', fontSize: 13, color: '#64748b' }}>{caption}</p>}
    </div>
  );
}

/* ─────────────── Truth table ─────────────── */
/* rows: [{ cells: [...inputs, ...outputs], dim?: boolean }]; 'X' renders as a don't-care */
export function TruthTable({ inHeads, outHeads, inTitle = 'Input', outTitle = 'Output', rows }) {
  const nIn = inHeads.length;
  const hasDim = rows.some((r) => r.dim);
  const th = { padding: '8px 14px' };

  return (
    <div>
      <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        <table style={{ borderCollapse: 'collapse', fontFamily: MONO, fontSize: 13, textAlign: 'center' }}>
          <thead>
            <tr style={{ background: INK, color: '#fff' }}>
              <th colSpan={nIn} style={{ padding: 10, borderRight: '1px solid #1e293b' }}>{inTitle}</th>
              <th colSpan={outHeads.length} style={{ padding: 10, color: ACCENT }}>{outTitle}</th>
            </tr>
            <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
              {inHeads.map((h, i) => (
                <th key={h} style={{ ...th, borderRight: i === nIn - 1 ? '1px solid #1e293b' : undefined }}>{h}</th>
              ))}
              {outHeads.map((h) => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${LINE}`, background: row.dim ? '#f1f5f9' : i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                {row.cells.map((v, j) => (
                  <td key={j} style={{
                    padding: '8px 14px',
                    color: row.dim ? '#94a3b8' : j < nIn ? MUTED : ACCENT,
                    fontWeight: j >= nIn && !row.dim ? 700 : 500,
                    borderRight: j === nIn - 1 ? '2px solid ' + INK : undefined,
                  }}>{v === 'X' ? '×' : v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasDim && (
        <p style={{ margin: '12px 0 0', fontSize: 13, color: '#64748b', textAlign: 'center' }}>
          Shaded rows never occur with valid input, so their outputs are don't-cares (×) the designer is free to use when simplifying.
        </p>
      )}
    </div>
  );
}

/* ─────────────── K-map ─────────────── */
const ORDER = ['00', '01', '11', '10']; // Gray order: neighbours differ in one bit

/* fn(n) -> 0 | 1 | 'X' where n = binary value of (row bits + column bits) */
export function KMap({ title, rowVars, colVars, fn, groups = [], formula, note }) {
  const cell = 40, ox = 52, oy = 36;

  return (
    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, border: `1px solid ${LINE}`, textAlign: 'center' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>{title}</div>

      <svg viewBox="0 0 230 210" style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto' }} role="img" aria-label={title}>
        <line x1={ox - 44} y1={oy - 30} x2={ox} y2={oy} stroke="#cbd5e1" />
        <text x={ox - 6} y={oy - 17} textAnchor="end" fontSize="9" fontWeight="700" fill="#64748b">{colVars}</text>
        <text x={ox - 40} y={oy - 4} fontSize="9" fontWeight="700" fill="#64748b">{rowVars}</text>

        {ORDER.map((c, i) => (
          <text key={c} x={ox + i * cell + cell / 2} y={oy - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">{c}</text>
        ))}
        {ORDER.map((r, i) => (
          <text key={r} x={ox - 22} y={oy + i * cell + cell / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">{r}</text>
        ))}

        {ORDER.map((rb, r) => ORDER.map((cb, c) => {
          const v = fn(parseInt(rb + cb, 2));
          const dc = v === 'X';
          return (
            <g key={`${r}${c}`}>
              <rect x={ox + c * cell} y={oy + r * cell} width={cell} height={cell} fill={dc ? '#f1f5f9' : v ? '#f5f3ff' : '#fff'} stroke="#cbd5e1" />
              <text x={ox + c * cell + cell / 2} y={oy + r * cell + cell / 2 + 5} textAnchor="middle" fontSize="14"
                fontWeight={v === 1 ? 800 : 500} fill={dc ? '#94a3b8' : v ? ACCENT : '#cbd5e1'}>{dc ? '×' : v}</text>
            </g>
          );
        }))}

        {groups.map((g, i) => (
          <rect key={i}
            x={ox + g.c * cell + 3} y={oy + g.r * cell + 3}
            width={g.w * cell - 6} height={g.h * cell - 6}
            fill="none" stroke={g.color} strokeWidth="2.5" rx="6"
            strokeDasharray={g.wrap ? '5 3' : undefined} />
        ))}
      </svg>

      <div style={{ marginTop: 14, fontSize: 15, fontWeight: 700, color: INK, fontFamily: 'monospace' }}>{formula}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{note}</div>
    </div>
  );
}

/* ─────────────── Mixed-gate circuit (IEC rectangular symbols) ─────────────── */
/* One wiring layout shared by BCD→XS-3 and XS-3→BCD.
   gates: 6 entries { sym, bubble } in the order g1..g6
   g1 = shared first gate (feeds g2 and g4), g2 → g3 chain, g4 / g5 / g6 drive outputs 1..3
   outputs: labels for [g3, g4, g5, g6] */
function Gate({ x, cy, sym, bubble }) {
  return (
    <g>
      <rect x={x} y={cy - 20} width={44} height={40} rx="3" fill="#f5f3ff" stroke={INK} strokeWidth="1.5" />
      <text x={x + 22} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>{sym}</text>
      {bubble && <circle cx={x + 48} cy={cy} r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />}
    </g>
  );
}

export function ConverterCircuit({ inputs, outputs, gates, midLabel }) {
  const pos = [
    { x: 230, cy: 120 }, { x: 350, cy: 70 }, { x: 460, cy: 50 },
    { x: 350, cy: 160 }, { x: 350, cy: 230 }, { x: 350, cy: 300 },
  ];
  const w = { stroke: INK, strokeWidth: 1.5, fill: 'none' };
  const out = (i) => pos[i].x + 44 + (gates[i].bubble ? 8 : 0);
  const taps = [[100, 58, 350], [100, 172, 350], [130, 108, 230], [130, 218, 350], [160, 132, 230], [160, 242, 350], [160, 300, 350]];
  const dots = [[100, 58], [100, 172], [130, 108], [130, 218], [160, 132], [160, 242], [160, 300], [310, 120]];
  const outRows = [[2, 50], [3, 160], [4, 230], [5, 300]];

  return (
    <svg viewBox="0 0 610 340" style={{ width: '100%', maxWidth: 700, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${LINE}` }} role="img" aria-label="Logic circuit">
      {[70, 100, 130, 160].map((x, i) => (
        <text key={x} x={x} y="14" textAnchor="middle" fontSize="14" fontWeight="700" fill={SECONDARY}>{inputs[i]}</text>
      ))}

      {/* input rails */}
      <polyline points="70,24 70,38 460,38" {...w} />
      <line x1="100" y1="24" x2="100" y2="172" {...w} />
      <line x1="130" y1="24" x2="130" y2="218" {...w} />
      <line x1="160" y1="24" x2="160" y2="300" {...w} />
      {taps.map(([x, y, x2]) => <line key={`${x}-${y}`} x1={x} y1={y} x2={x2} y2={y} {...w} />)}

      {/* shared net from g1 */}
      <line x1="274" y1="120" x2="310" y2="120" {...w} />
      <line x1="310" y1="82" x2="310" y2="148" {...w} />
      <line x1="310" y1="82" x2="350" y2="82" {...w} />
      <line x1="310" y1="148" x2="350" y2="148" {...w} />
      {midLabel && <text x="316" y="113" fontSize="10" fontWeight="700" fill="#64748b" fontFamily={MONO}>{midLabel}</text>}

      {/* g2 -> g3 */}
      <polyline points={`${out(1)},70 430,70 430,62 460,62`} {...w} />

      {dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill={INK} />)}

      {pos.map((p, i) => <Gate key={i} x={p.x} cy={p.cy} sym={gates[i].sym} bubble={gates[i].bubble} />)}

      {outRows.map(([g, y], k) => (
        <g key={g}>
          <line x1={out(g)} y1={y} x2="560" y2={y} {...w} />
          <text x="572" y={y + 5} fontSize="14" fontWeight="700" fill={GREEN}>{outputs[k]}</text>
        </g>
      ))}
    </svg>
  );
}

export function CircuitLegend() {
  return (
    <p style={{ margin: '12px 0 0', fontSize: 12, color: '#64748b', textAlign: 'center' }}>
      IEC symbols: ≥1 is OR, &amp; is AND, =1 is XOR, and a small circle on the output means the result is inverted. A dot marks a connection; crossing lines without a dot are not connected.
    </p>
  );
}

/* ─────────────── Interactive: try it ─────────────── */
/* run(value) -> null | { error?, cards: [{label, value}], steps: [string] } */
export function Playground({ label, allowed, maxLen, placeholder, samples = [], initial = '', run }) {
  const [value, setValue] = useState(initial);
  const out = run(value);

  return (
    <div style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 24 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.replace(allowed, '').slice(0, maxLen))}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        style={{ width: '100%', boxSizing: 'border-box', fontFamily: MONO, fontSize: 20, letterSpacing: 2, padding: '12px 14px', border: `1px solid #cbd5e1`, borderRadius: 8, background: '#fff', color: INK, outline: 'none' }}
        onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
        onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; }}
      />
      {samples.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          <span style={{ fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>Try:</span>
          {samples.map((s) => (
            <button key={s} type="button" onClick={() => setValue(s)}
              style={{ fontFamily: MONO, fontSize: 12, padding: '4px 10px', borderRadius: 999, border: `1px solid ${LINE}`, background: '#fff', color: MUTED, cursor: 'pointer' }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {!out && <div style={{ fontSize: 14, color: '#94a3b8' }}>Enter a value above to see the conversion.</div>}
        {out && out.error && <div style={{ fontSize: 14, color: '#b45309', fontWeight: 600 }}>{out.error}</div>}
        {out && out.cards && (
          <>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              {out.cards.map((c) => (
                <div key={c.label} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: '10px 16px', minWidth: 120 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: c.accent ? ACCENT : INK, wordBreak: 'break-all' }}>{c.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 13, color: MUTED, lineHeight: 1.9 }}>
              {out.steps.map((s, i) => <div key={i}>{s}</div>)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Interactive: practice ─────────────── */
/* items: [{ q, a, work }]; answers are compared ignoring spaces and case */
export function Practice({ items }) {
  const [vals, setVals] = useState({});
  const [res, setRes] = useState({});
  const norm = (s) => s.toLowerCase().replace(/[\s,]+/g, '');
  const check = (i) => setRes((r) => ({ ...r, [i]: norm(vals[i] || '') === norm(items[i].a) ? 'ok' : 'bad' }));
  const btn = { fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 8, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: 'pointer' };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {items.map((it, i) => (
        <div key={i} style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 15, color: INK, fontWeight: 600, marginBottom: 12 }}>{it.q}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              value={vals[i] || ''}
              onChange={(e) => { setVals((v) => ({ ...v, [i]: e.target.value })); setRes((r) => ({ ...r, [i]: undefined })); }}
              onKeyDown={(e) => { if (e.key === 'Enter') check(i); }}
              placeholder="Your answer"
              aria-label={`Answer for question ${i + 1}`}
              spellCheck={false}
              style={{ flex: '1 1 180px', fontFamily: MONO, fontSize: 15, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff', color: INK, outline: 'none' }}
            />
            <button type="button" onClick={() => check(i)} style={{ ...btn, background: ACCENT, color: '#fff', border: `1px solid ${ACCENT}` }}>Check</button>
            <button type="button" onClick={() => setRes((r) => ({ ...r, [i]: 'shown' }))} style={btn}>Show answer</button>
          </div>
          {res[i] === 'ok' && <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: GREEN }}>Correct.</div>}
          {res[i] === 'bad' && <div style={{ marginTop: 10, fontSize: 14, color: '#b45309', fontWeight: 600 }}>Not quite. Check the bit order and try again, or show the answer.</div>}
          {(res[i] === 'shown' || res[i] === 'ok') && (
            <div style={{ marginTop: 10, fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
              <span style={{ fontFamily: MONO, fontWeight: 800, color: ACCENT }}>{it.a}</span>
              <div>{it.work}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


/* ─────────────── Small stats and toggle controls ─────────────── */
export function Stat({ label, value, accent = false }) {
  return (
    <div style={{
      minWidth: 120,
      background: '#fff',
      border: `1px solid ${LINE}`,
      borderRadius: 8,
      padding: '12px 16px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 5 }}>
        {label}
      </div>
      <div style={{
        fontSize: 21,
        fontWeight: 800,
        color: accent ? ACCENT : INK,
        fontFamily: MONO,
        overflowWrap: 'anywhere',
      }}>
        {value}
      </div>
    </div>
  );
}

export function ToggleBit({ label = 'Input', value = 0, onChange }) {
  const active = Number(value) === 1;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onChange?.(active ? 0 : 1)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '8px 12px',
        border: `1px solid ${active ? ACCENT : LINE}`,
        borderRadius: 8,
        background: active ? '#f5f3ff' : '#fff',
        color: INK,
        cursor: 'pointer',
        fontWeight: 700,
      }}
    >
      <span>{label}</span>
      <span style={{
        minWidth: 25,
        padding: '3px 6px',
        borderRadius: 5,
        background: active ? ACCENT : '#e2e8f0',
        color: active ? '#fff' : INK,
        fontFamily: MONO,
        textAlign: 'center',
      }}>
        {active ? 1 : 0}
      </span>
    </button>
  );
}

/* ─────────────── Page shell ─────────────── */
export function PageShell({ title, lead, prev, next, parent, bigTitle, children }) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLabel = { fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 };
  const crumb = { color: '#94a3b8', textDecoration: 'none' };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#f8fafc', color: INK, minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 50 }}>
        <div style={{ height: '100%', width: `${scrollPct}%`, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, transition: 'width 0.1s linear' }} />
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px 100px' }}>
        <div style={{ fontSize: 13, marginBottom: 40, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/topics" style={crumb}>Topics</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <Link to={parent?.to || '/topics/code-converters'} style={crumb}>{parent?.title || 'Code Converters'}</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <span style={{ color: INK, fontWeight: 600 }}>{title}</span>
        </div>

        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, background: '#f5f3ff', padding: '4px 10px', borderRadius: 999, marginBottom: 16 }}>Code Converters</span>
            <h1 style={{ fontSize: 'clamp(36px, 7vw, 56px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 16px' }}>{title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: 700 }}>{lead}</p>
          </header>
        </Reveal>

        {children}

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 60, borderTop: `2px solid ${LINE}`, paddingTop: 32 }}>
            <div>
              {prev && prev.to ? <>
                <div style={navLabel}>Previous Concept</div>
                <Link to={prev.to} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: INK }}>
                  <span style={{ fontSize: 24, color: '#cbd5e1' }}>←</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{prev.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{prev.sub}</div>
                  </div>
                </Link>
              </> : null}
            </div>
            <div style={{ textAlign: 'right' }}>
              {next && next.to ? <>
                <div style={navLabel}>{next.label || 'Next Concept'}</div>
                <Link to={next.to} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: INK, justifyContent: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{next.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{next.sub}</div>
                  </div>
                  <span style={{ fontSize: 24, color: ACCENT }}>→</span>
                </Link>
              </> : null}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
