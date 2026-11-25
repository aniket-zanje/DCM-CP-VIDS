import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#8b5cf6';
const SECONDARY = '#3b82f6';
const GREEN = '#10b981';

/* ─────────────── Scroll Reveal ─────────────── */
function Reveal({ children, delay = 0 }) {
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

/* ─────────────── UI Components ─────────────── */
function SectionHeading({ kicker, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT, marginBottom: 8 }}>{kicker}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: '#0f172a' }}>{title}</h2>
    </div>
  );
}

function Card({ kicker, title, children }) {
  return (
    <Reveal>
      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 32, marginBottom: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <SectionHeading kicker={kicker} title={title} />
        {children}
      </section>
    </Reveal>
  );
}

const P = ({ children, last }) => (
  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: last ? 0 : '0 0 20px', maxWidth: 720 }}>{children}</p>
);

const Mono = ({ children }) => (
  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, background: '#f5f3ff', color: ACCENT, padding: '2px 6px', borderRadius: 4 }}>{children}</code>
);

/* ─────────────── Worked Example ─────────────── */
function BitRow({ label, bits, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 70, fontSize: 12, fontWeight: 700, color: '#64748b' }}>{label}</div>
      {bits.map((b, i) => (
        <div key={i} style={{
          width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 800,
          color, background: '#f8fafc', border: `1px solid ${color}33`, borderRadius: 6,
        }}>{b}</div>
      ))}
    </div>
  );
}

function WorkedExample() {
  const bin = [1, 0, 1, 1];
  const gray = bin.map((b, i) => (i === 0 ? b : b ^ bin[i - 1]));
  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 24, overflowX: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 'max-content' }}>
        <BitRow label="Binary" bits={bin} color={SECONDARY} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 70 }} />
          {['copy', '1 ⊕ 0', '0 ⊕ 1', '1 ⊕ 1'].map((s) => (
            <div key={s} style={{ width: 44, textAlign: 'center', fontSize: 11, color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>{s}</div>
          ))}
        </div>
        <BitRow label="Gray" bits={gray} color={ACCENT} />
      </div>
      <p style={{ margin: '16px 0 0', fontSize: 13, color: '#64748b' }}>
        1011 in binary becomes 1110 in Gray code.
      </p>
    </div>
  );
}

/* ─────────────── Truth Table ─────────────── */
function TruthTable() {
  const rows = Array.from({ length: 16 }, (_, n) => {
    const g = n ^ (n >> 1);
    return [n >> 3, (n >> 2) & 1, (n >> 1) & 1, n & 1, g >> 3, (g >> 2) & 1, (g >> 1) & 1, g & 1];
  });
  const th = { padding: '8px 14px' };

  return (
    <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
      <table style={{ borderCollapse: 'collapse', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, textAlign: 'center' }}>
        <thead>
          <tr style={{ background: '#0f172a', color: '#fff' }}>
            <th colSpan={4} style={{ padding: 10, borderRight: '1px solid #1e293b' }}>Binary</th>
            <th colSpan={4} style={{ padding: 10, color: ACCENT }}>Gray</th>
          </tr>
          <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
            {['B3', 'B2', 'B1', 'B0'].map((h, i) => (
              <th key={h} style={{ ...th, borderRight: i === 3 ? '1px solid #1e293b' : undefined }}>{h}</th>
            ))}
            {['G3', 'G2', 'G1', 'G0'].map((h) => <th key={h} style={th}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
              {row.map((v, j) => (
                <td key={j} style={{
                  padding: '8px 14px',
                  color: j < 4 ? '#475569' : ACCENT,
                  fontWeight: j >= 4 ? 700 : 500,
                  borderRight: j === 3 ? '2px solid #0f172a' : undefined,
                }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── K-Map ─────────────── */
const KMAP_ORDER = ['00', '01', '11', '10']; // Gray-ordered, so neighbours differ by one bit

function KMap({ title, bit, groups, formula, note }) {
  const cell = 40, ox = 52, oy = 36;

  const isOne = (r, c) => {
    const n = parseInt(KMAP_ORDER[r] + KMAP_ORDER[c], 2);
    return ((n ^ (n >> 1)) >> bit) & 1;
  };

  return (
    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0', textAlign: 'center' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{title}</div>

      <svg viewBox="0 0 230 210" style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto' }}>
        {/* Corner label */}
        <line x1={ox - 44} y1={oy - 30} x2={ox} y2={oy} stroke="#cbd5e1" />
        <text x={ox - 6} y={oy - 17} textAnchor="end" fontSize="9" fontWeight="700" fill="#64748b">B1B0</text>
        <text x={ox - 40} y={oy - 4} fontSize="9" fontWeight="700" fill="#64748b">B3B2</text>

        {KMAP_ORDER.map((c, i) => (
          <text key={c} x={ox + i * cell + cell / 2} y={oy - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">{c}</text>
        ))}
        {KMAP_ORDER.map((r, i) => (
          <text key={r} x={ox - 22} y={oy + i * cell + cell / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">{r}</text>
        ))}

        {KMAP_ORDER.map((_, r) => KMAP_ORDER.map((__, c) => {
          const one = isOne(r, c);
          return (
            <g key={`${r}${c}`}>
              <rect x={ox + c * cell} y={oy + r * cell} width={cell} height={cell} fill={one ? '#f5f3ff' : '#fff'} stroke="#cbd5e1" />
              <text x={ox + c * cell + cell / 2} y={oy + r * cell + cell / 2 + 5} textAnchor="middle" fontSize="14" fontWeight={one ? 800 : 500} fill={one ? ACCENT : '#cbd5e1'}>{one}</text>
            </g>
          );
        }))}

        {groups.map((g, i) => (
          <rect
            key={i}
            x={ox + g.c * cell + 3} y={oy + g.r * cell + 3}
            width={g.w * cell - 6} height={g.h * cell - 6}
            fill="none" stroke={g.color} strokeWidth="2.5" rx="6"
            strokeDasharray={g.wrap ? '5 3' : undefined}
          />
        ))}
      </svg>

      <div style={{ marginTop: 14, fontSize: 15, fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{formula}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{note}</div>
    </div>
  );
}

/* ─────────────── Logic Diagram ─────────────── */
function XorGate({ x, cy }) {
  return (
    <g transform={`translate(${x}, ${cy - 18})`}>
      <path d="M 0 0 Q 10 18 0 36 Q 24 36 36 18 Q 24 0 0 0 Z" fill="#f5f3ff" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M -5 0 Q 5 18 -5 36" fill="none" stroke="#0f172a" strokeWidth="1.5" />
      <text x="16" y="-6" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">XOR</text>
    </g>
  );
}

function LogicCircuit() {
  const w = { stroke: '#0f172a', strokeWidth: 1.5 };
  const gx = 240;
  const ys = { B3: 40, B2: 110, B1: 180, B0: 250 };
  const gates = [{ cy: 75, out: 'G2' }, { cy: 145, out: 'G1' }, { cy: 215, out: 'G0' }];

  return (
    <svg viewBox="0 0 540 280" style={{ width: '100%', maxWidth: 640, display: 'block', margin: '0 auto', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }}>
      {/* Input labels and rails */}
      {Object.entries(ys).map(([k, y]) => (
        <text key={k} x="16" y={y + 5} fontSize="14" fontWeight="700" fill={SECONDARY}>{k}</text>
      ))}
      <line x1="50" y1={ys.B3} x2="480" y2={ys.B3} {...w} />      {/* B3 passes straight through as G3 */}
      <line x1="50" y1={ys.B2} x2="120" y2={ys.B2} {...w} />
      <line x1="50" y1={ys.B1} x2="140" y2={ys.B1} {...w} />
      <line x1="50" y1={ys.B0} x2="160" y2={ys.B0} {...w} />

      {/* Branches into gate inputs: each bit feeds the gate above and the gate below it */}
      <polyline points={`100,${ys.B3} 100,66 ${gx},66`} fill="none" {...w} />
      <polyline points={`120,84 120,136 ${gx},136`} fill="none" {...w} />
      <line x1="120" y1="84" x2={gx} y2="84" {...w} />
      <polyline points={`140,154 140,206 ${gx},206`} fill="none" {...w} />
      <line x1="140" y1="154" x2={gx} y2="154" {...w} />
      <polyline points={`160,${ys.B0} 160,224 ${gx},224`} fill="none" {...w} />

      {/* Junction dots */}
      {[[100, ys.B3], [120, ys.B2], [140, ys.B1]].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="3.5" fill="#0f172a" />
      ))}

      {/* Gates and outputs */}
      {gates.map(({ cy, out }) => (
        <g key={out}>
          <XorGate x={gx} cy={cy} />
          <line x1={gx + 36} y1={cy} x2="480" y2={cy} {...w} />
          <text x="492" y={cy + 5} fontSize="14" fontWeight="700" fill={GREEN}>{out}</text>
        </g>
      ))}
      <text x="492" y={ys.B3 + 5} fontSize="14" fontWeight="700" fill={GREEN}>G3</text>
    </svg>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function BinToGrayPage() {
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
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#f8fafc', color: '#0f172a', minHeight: '100vh' }}>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 50 }}>
        <div style={{ height: '100%', width: `${scrollPct}%`, background: `linear-gradient(90deg, ${ACCENT}, ${SECONDARY})`, transition: 'width 0.1s linear' }} />
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px 100px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, marginBottom: 40, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/topics" style={crumb}>Topics</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <Link to="/topics/code-converters" style={crumb}>Code Converters</Link>
          <span style={{ color: '#94a3b8' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Binary to Gray</span>
        </div>

        {/* Header */}
        <Reveal>
          <header style={{ paddingBottom: 40, borderBottom: '1px solid #e2e8f0', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, background: '#f5f3ff', padding: '4px 10px', borderRadius: 999, marginBottom: 16 }}>Code Converters</span>
            <h1 style={{ fontSize: 'clamp(36px, 7vw, 56px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 16px' }}>Binary to Gray</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#475569', margin: 0, maxWidth: 700 }}>
              Turn any binary number into Gray code, where neighbouring values differ by exactly one bit, using nothing more than a few XOR gates.
            </p>
          </header>
        </Reveal>

        {/* 1. Concept */}
        <Card kicker="The idea" title="How the conversion works">
          <P>
            Gray code is an ordering of binary values in which moving from one number to the next flips a single bit. A binary-to-Gray converter is a combinational circuit: feed it a binary word and it outputs the matching Gray word immediately.
          </P>
          <P>The rule for an n-bit word is short:</P>
          <ul style={{ margin: '0 0 24px', paddingLeft: 20, fontSize: 15, color: '#475569', lineHeight: 1.9 }}>
            <li>The most significant bit is copied as is: <Mono>G3 = B3</Mono></li>
            <li>Every other Gray bit is the XOR of the matching binary bit and the binary bit above it.</li>
          </ul>
          <WorkedExample />
        </Card>

        {/* 2. Truth table */}
        <Card kicker="Truth table" title="4-bit conversion table">
          <P>All sixteen 4-bit inputs and the Gray code each one produces. Scan down the Gray columns and you will see that only one bit changes from row to row.</P>
          <TruthTable />
        </Card>

        {/* 3. K-maps */}
        <Card kicker="Simplification" title="Expressions from K-maps">
          <P>
            Plotting each Gray output bit on a 4-variable K-map and grouping the 1s gives its simplest Boolean expression. Solid outlines are normal groups; dashed outlines are halves of a group that wraps around the edge of the map.
          </P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            <KMap
              title="Gray bit G0" bit={0}
              groups={[
                { r: 0, c: 1, w: 1, h: 4, color: SECONDARY },
                { r: 0, c: 3, w: 1, h: 4, color: '#ef4444' },
              ]}
              formula={<>G<sub>0</sub> = B<sub>1</sub>'B<sub>0</sub> + B<sub>1</sub>B<sub>0</sub>' = B<sub>1</sub> ⊕ B<sub>0</sub></>}
              note="Two vertical groups of four."
            />
            <KMap
              title="Gray bit G1" bit={1}
              groups={[
                { r: 1, c: 0, w: 2, h: 2, color: GREEN },
                { r: 0, c: 2, w: 2, h: 1, color: '#f59e0b', wrap: true },
                { r: 3, c: 2, w: 2, h: 1, color: '#f59e0b', wrap: true },
              ]}
              formula={<>G<sub>1</sub> = B<sub>2</sub>'B<sub>1</sub> + B<sub>2</sub>B<sub>1</sub>' = B<sub>2</sub> ⊕ B<sub>1</sub></>}
              note="One 2×2 block and one group that wraps top to bottom."
            />
            <KMap
              title="Gray bit G2" bit={2}
              groups={[
                { r: 1, c: 0, w: 4, h: 1, color: ACCENT },
                { r: 3, c: 0, w: 4, h: 1, color: '#ec4899' },
              ]}
              formula={<>G<sub>2</sub> = B<sub>3</sub>'B<sub>2</sub> + B<sub>3</sub>B<sub>2</sub>' = B<sub>3</sub> ⊕ B<sub>2</sub></>}
              note="Two full-row groups of four."
            />
            <KMap
              title="Gray bit G3" bit={3}
              groups={[{ r: 2, c: 0, w: 4, h: 2, color: '#06b6d4' }]}
              formula={<>G<sub>3</sub> = B<sub>3</sub></>}
              note="A single group of eight, so no gate is needed."
            />
          </div>
        </Card>

        {/* 4. Circuit */}
        <Card kicker="Implementation" title="Logic circuit">
          <P>
            The four expressions translate directly into hardware: B3 goes straight through to G3, and three XOR gates produce G2, G1 and G0 from neighbouring input pairs.
          </P>
          <div style={{ marginBottom: 24 }}><LogicCircuit /></div>
          <P last>
            The same pattern scales to any word length. An n-bit converter passes the top bit through and uses n − 1 XOR gates, one for each pair of adjacent input bits.
          </P>
        </Card>

        {/* Navigation */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 60, borderTop: '2px solid #e2e8f0', paddingTop: 32 }}>
            <div>
              <div style={navLabel}>Previous Concept</div>
              <Link to="/topics/code-converters" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: '#0f172a' }}>
                <span style={{ fontSize: 24, color: '#cbd5e1' }}>←</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Code Converters Overview</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Back to basics</div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={navLabel}>Next Concept</div>
              <Link to="/topics/code-converters/gray-to-bin" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: '#0f172a', justifyContent: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Gray to Binary</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>The reverse process</div>
                </div>
                <span style={{ fontSize: 24, color: ACCENT }}>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
