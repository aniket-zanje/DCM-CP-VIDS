import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ACCENT, SECONDARY, GREEN, INK, MUTED, LINE,
  PageShell, Card, P, Bullets, StepList, CodeBlock, TruthTable, KMap, ToggleBit, Stat, Practice,
} from './ConverterKit';

const MONO = "'JetBrains Mono', monospace";

/* ─────────────── Navigation (adjust slugs to match your router) ─────────────── */
export const NAV = {
  overview: { to: '/topics/counters', title: 'Counters Overview', sub: 'Back to the full list' },
  asyncUp: { to: '/topics/counters/async-up', title: 'Asynchronous Up Counter', sub: 'Ripple counting upward' },
  asyncDown: { to: '/topics/counters/async-down', title: 'Asynchronous Down Counter', sub: 'Ripple counting downward' },
  asyncUpDown: { to: '/topics/counters/async-up-down', title: 'Asynchronous Up-Down Counter', sub: 'Mode-controlled ripple counter' },
  syncUp: { to: '/topics/counters/sync-up', title: 'Synchronous Up Counter', sub: 'One shared clock, counting up' },
  syncDown: { to: '/topics/counters/sync-down', title: 'Synchronous Down Counter', sub: 'One shared clock, counting down' },
  syncUpDown: { to: '/topics/counters/sync-up-down', title: 'Synchronous Up-Down Counter', sub: 'Shared clock with a direction input' },
  mod: { to: '/topics/counters/mod', title: 'Mod Counter', sub: 'Count to any modulus' },
  ring: { to: '/topics/counters/ring', title: 'Ring Counter', sub: 'One hot bit circulates' },
  johnson: { to: '/topics/counters/johnson', title: 'Johnson Counter', sub: 'Twisted ring with 2n states' },
};

/* ─────────────── Counter logic (drives tables, waveforms and the simulator) ─────────────── */
export const initState = (kind, n) => (kind === 'down' ? (1 << n) - 1 : kind === 'ring' ? 1 << (n - 1) : 0);

export const stepState = (kind, s, m, n, N) => {
  const size = 1 << n;
  switch (kind) {
    case 'up': return (s + 1) % size;
    case 'down': return (s - 1 + size) % size;
    case 'updown': return m ? (s - 1 + size) % size : (s + 1) % size;
    case 'mod': return (s + 1) % N;
    case 'ring': return (s >> 1) | ((s & 1) << (n - 1));
    case 'johnson': return (s >> 1) | (((~s) & 1) << (n - 1));
    default: return s;
  }
};

const bitsOf = (s, n) => Array.from({ length: n }, (_, i) => (s >> (n - 1 - i)) & 1);
const qHeads = (n) => Array.from({ length: n }, (_, i) => `Q${n - 1 - i}`);
const tHeads = (n) => Array.from({ length: n }, (_, i) => `T${n - 1 - i}`);
const nextHeads = (n) => Array.from({ length: n }, (_, i) => `Q${n - 1 - i}*`);
const cycleLen = (kind, n, N) => (kind === 'mod' ? N : kind === 'ring' ? n : kind === 'johnson' ? 2 * n : 1 << n);

export function buildStates(kind, n, N, pulses, modeSeq = []) {
  const out = [initState(kind, n)];
  for (let k = 0; k < pulses; k++) out.push(stepState(kind, out[k], modeSeq[k] || 0, n, N));
  return out;
}

/* ─────────────── Small presentational pieces ─────────────── */
export function Figure({ src, alt, caption }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure style={{ margin: '0 0 28px' }}>
      <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 12, textAlign: 'center' }}>
        {failed ? (
          <div style={{ padding: '36px 12px', fontSize: 13, color: '#94a3b8' }}>This figure could not be loaded.</div>
        ) : (
          <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)}
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
        )}
      </div>
      {caption && <figcaption style={{ fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>{caption}</figcaption>}
    </figure>
  );
}

export function Facts({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
      {items.map((f) => (
        <div key={f.label} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6 }}>{f.label}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: INK, fontFamily: f.mono ? MONO : undefined }}>{f.value}</div>
        </div>
      ))}
    </div>
  );
}

export function KeyPoints({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
      {items.map((k, i) => (
        <div key={k.title} style={{ display: 'flex', gap: 14, background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 18 }}>
          <div style={{ flex: '0 0 32px', height: 32, borderRadius: 8, background: ACCENT, color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{k.title}</div>
            <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>{k.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Remember({ items }) {
  return (
    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderLeft: `4px solid ${ACCENT}`, borderRadius: 8, padding: '20px 24px' }}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
        {items.map((t, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: '#3b3566', lineHeight: 1.65 }}>
            <span style={{ color: ACCENT, fontWeight: 800 }}>▸</span><span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ mark, color, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
      <span style={{ flex: '0 0 22px', height: 22, borderRadius: 999, background: color, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{mark}</span>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{title}</div>
        <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

export function ProsCons({ pros, cons }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#15803d', marginBottom: 16 }}>Advantages</div>
        {pros.map((x) => <Row key={x.title} mark="✓" color={GREEN} title={x.title} body={x.body} />)}
      </div>
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#b45309', marginBottom: 16 }}>Disadvantages</div>
        {cons.map((x) => <Row key={x.title} mark="!" color="#f59e0b" title={x.title} body={x.body} />)}
      </div>
    </div>
  );
}

export function Verdict({ use, avoid }) {
  const box = { borderRadius: 8, padding: '14px 18px', fontSize: 14, lineHeight: 1.6, color: INK };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 20 }}>
      <div style={{ ...box, background: '#f8fafc', border: `1px solid ${LINE}`, borderLeft: `4px solid ${GREEN}` }}><strong>Choose it when </strong>{use}</div>
      <div style={{ ...box, background: '#f8fafc', border: `1px solid ${LINE}`, borderLeft: '4px solid #f59e0b' }}><strong>Skip it when </strong>{avoid}</div>
    </div>
  );
}

export function AppTiles({ items }) {
  const hues = [ACCENT, SECONDARY, GREEN, '#f59e0b', '#ec4899', '#06b6d4'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
      {items.map((a, i) => (
        <div key={a.name} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 18, display: 'flex', gap: 14 }}>
          <div style={{ flex: '0 0 40px', height: 40, borderRadius: 10, background: `${hues[i % hues.length]}1f`, color: hues[i % hues.length], fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.name[0]}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{a.name}</div>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.55, marginTop: 2 }}>{a.why}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Equations({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
      {items.map((e) => (
        <div key={e.label} style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: '12px 16px', fontFamily: MONO, fontSize: 15 }}>
          <span style={{ color: SECONDARY, fontWeight: 800 }}>{e.label}</span>
          <span style={{ color: '#94a3b8' }}> = </span>
          <span style={{ color: INK, fontWeight: 700 }}>{e.expr}</span>
          {e.note && <div style={{ fontFamily: 'inherit', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{e.note}</div>}
        </div>
      ))}
    </div>
  );
}

export function Callout({ children, tone }) {
  const warn = tone === 'warn';
  return (
    <div style={{ background: warn ? '#fffbeb' : '#f8fafc', border: `1px solid ${warn ? '#fde68a' : LINE}`, borderLeft: `4px solid ${warn ? '#f59e0b' : SECONDARY}`, borderRadius: 8, padding: '14px 18px', fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{children}</div>
  );
}

export function SimpleTable({ heads, rows, caption }) {
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 420 }}>
          <thead>
            <tr style={{ background: INK, color: '#fff', fontSize: 13 }}>
              {heads.map((h) => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 ? '#f8fafc' : '#fff' }}>
                {r.map((c, j) => (
                  <td key={j} style={{ padding: '10px 14px', fontSize: 14, color: j === 0 ? INK : MUTED, fontWeight: j === 0 ? 700 : 400, borderBottom: `1px solid ${LINE}` }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p style={{ margin: '10px 0 0', fontSize: 13, color: '#64748b' }}>{caption}</p>}
    </div>
  );
}

/* ─────────────── Generated tables ─────────────── */
export function SeqTable({ kind, n, N, showDec = true }) {
  const len = cycleLen(kind, n, N);
  const rows = [];
  let s = initState(kind, n);
  for (let k = 0; k <= len; k++) {
    rows.push({ cells: [k, ...bitsOf(s, n), ...(showDec ? [s] : [])] });
    s = stepState(kind, s, 0, n, N);
  }
  return (
    <div>
      <TruthTable inHeads={['Pulse']} outHeads={[...qHeads(n), ...(showDec ? ['Dec'] : [])]} inTitle="Clock" outTitle="Flip-flop outputs" rows={rows} />
      <p style={{ margin: '12px 0 0', fontSize: 13, color: '#64748b', textAlign: 'center' }}>The last row repeats the first: the sequence has come full circle.</p>
    </div>
  );
}

/* T flip-flop excitation: T = Q xor Q*  */
export function ExcTable({ kind, n, N }) {
  const size = 1 << n;
  const rows = [];
  const modes = kind === 'updown' ? [0, 1] : [0];
  modes.forEach((m) => {
    for (let s = 0; s < size; s++) {
      const invalid = kind === 'mod' && s >= N;
      const nx = invalid ? null : stepState(kind, s, m, n, N);
      const X = Array(n).fill('X');
      rows.push({
        cells: [...(kind === 'updown' ? [m] : []), ...bitsOf(s, n),
          ...(invalid ? [...X, ...X] : [...bitsOf(nx, n), ...bitsOf(s ^ nx, n)])],
        dim: invalid,
      });
    }
  });
  return (
    <TruthTable
      inHeads={[...(kind === 'updown' ? ['M'] : []), ...qHeads(n)]}
      outHeads={[...nextHeads(n), ...tHeads(n)]}
      inTitle="Present state" outTitle="Next state and T inputs" rows={rows}
    />
  );
}

/* ─────────────── Timing diagram ─────────────── */
export function Waveform({ states, n, edge = 'fall', skew = 0, modes }) {
  const P = 44, left = 52, rowH = 36, hiO = 9, loO = 27, top = 8;
  const pulses = states.length - 1;
  const end = left + P / 2 + Math.max(pulses, 1) * P + P / 2 + 8;
  const rise = (k) => left + P / 2 + (k - 1) * P;
  const fall = (k) => rise(k) + P / 2;
  const edgeX = (k) => (edge === 'rise' ? rise(k) : fall(k));

  const rows = [{ key: 'clk', label: 'CLK' }];
  if (modes) rows.push({ key: 'm', label: 'M' });
  for (let i = n - 1; i >= 0; i--) rows.push({ key: `q${i}`, label: `Q${i}`, bit: i });
  rows.push({ key: 'cnt', label: 'Count' });
  const H = top + rows.length * rowH + 6;
  const rowTop = (ri) => top + ri * rowH;
  const yv = (ri, v) => rowTop(ri) + (v ? hiO : loO);

  const clk = [[left, yv(0, 0)]];
  for (let k = 1; k <= pulses; k++) clk.push([rise(k), yv(0, 0)], [rise(k), yv(0, 1)], [fall(k), yv(0, 1)], [fall(k), yv(0, 0)]);
  clk.push([end, yv(0, 0)]);
  const pts = (a) => a.map((p) => p.join(',')).join(' ');

  const trace = (ri, getV, shift) => {
    let prev = getV(0);
    const a = [[left, yv(ri, prev)]];
    for (let k = 1; k <= pulses; k++) {
      const v = getV(k);
      if (v !== prev) { const x = edgeX(k) + shift; a.push([x, yv(ri, prev)], [x, yv(ri, v)]); prev = v; }
    }
    a.push([end, yv(ri, prev)]);
    return a;
  };

  let mRow = null;
  if (modes) {
    const a = [[left, yv(1, modes[0] || 0)]];
    let prev = modes[0] || 0;
    for (let k = 2; k <= pulses; k++) {
      const v = modes[k - 1] || 0;
      if (v !== prev) { const x = edgeX(k) - P / 2; a.push([x, yv(1, prev)], [x, yv(1, v)]); prev = v; }
    }
    a.push([end, yv(1, prev)]);
    mRow = a;
  }

  const cntRow = rows.length - 1;
  return (
    <svg viewBox={`0 0 ${end} ${H}`} style={{ width: '100%', maxWidth: end * 1.6, display: 'block', margin: '0 auto' }} role="img" aria-label="Timing diagram">
      {Array.from({ length: pulses }, (_, k) => (
        <line key={k} x1={edgeX(k + 1)} y1={top} x2={edgeX(k + 1)} y2={H - 6} stroke={LINE} strokeDasharray="3 3" />
      ))}
      {rows.map((r, ri) => (
        <text key={r.key} x="4" y={rowTop(ri) + 22} fontSize="11" fontWeight="700" fill="#64748b">{r.label}</text>
      ))}
      <polyline points={pts(clk)} fill="none" stroke="#64748b" strokeWidth="1.75" />
      {mRow && <polyline points={pts(mRow)} fill="none" stroke={GREEN} strokeWidth="2" />}
      {rows.filter((r) => r.bit !== undefined).map((r) => {
        const ri = rows.indexOf(r);
        return <polyline key={r.key} points={pts(trace(ri, (k) => (states[k] >> r.bit) & 1, r.bit * skew))} fill="none" stroke={ACCENT} strokeWidth="2.25" strokeLinejoin="round" />;
      })}
      {states.map((s, k) => {
        const x1 = k === 0 ? left : edgeX(k);
        const x2 = k === pulses ? end : edgeX(k + 1);
        return <text key={k} x={(x1 + x2) / 2} y={rowTop(cntRow) + 22} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} fontFamily={MONO}>{s}</text>;
      })}
    </svg>
  );
}

function StaticWave({ kind, n, N, pulses = 12, modeSeq, edge, skew = 0, caption }) {
  const states = buildStates(kind, n, N, pulses, modeSeq);
  return (
    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 16 }}>
      <div style={{ overflowX: 'auto' }}><Waveform states={states} n={n} edge={edge} skew={skew} modes={modeSeq} /></div>
      {caption && <p style={{ margin: '12px 0 0', fontSize: 13, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>{caption}</p>}
    </div>
  );
}

/* ─────────────── Interactive simulator ─────────────── */
export function CounterSim({ kind, n, N, isAsync, edge }) {
  const init = initState(kind, n);
  const [sim, setSim] = useState({ s: init, hist: [{ s: init, m: 0 }], pulses: 0 });
  const [m, setM] = useState(0);
  const [auto, setAuto] = useState(false);
  const [skewOn, setSkewOn] = useState(!!isAsync);
  const mRef = useRef(0);
  mRef.current = m;

  const pulse = () => setSim((p) => {
    const mm = mRef.current;
    const s2 = stepState(kind, p.s, mm, n, N);
    return { s: s2, hist: [...p.hist, { s: s2, m: mm }].slice(-13), pulses: p.pulses + 1 };
  });
  const reset = () => { setAuto(false); setSim({ s: init, hist: [{ s: init, m: 0 }], pulses: 0 }); };

  useEffect(() => {
    if (!auto) return undefined;
    const id = setInterval(pulse, 800);
    return () => clearInterval(id);
  }, [auto]); // eslint-disable-line react-hooks/exhaustive-deps

  const btn = { fontSize: 14, fontWeight: 700, padding: '10px 18px', borderRadius: 8, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: 'pointer' };
  const bits = bitsOf(sim.s, n);
  const modes = kind === 'updown' ? sim.hist.slice(1).map((h) => h.m) : undefined;

  return (
    <div style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 24 }}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {bits.map((b, i) => (
            <div key={i} style={{ width: 58, padding: '8px 0 10px', textAlign: 'center', borderRadius: 10, border: `2px solid ${b ? ACCENT : '#cbd5e1'}`, background: b ? '#f5f3ff' : '#fff', transition: 'all 0.15s' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Q{n - 1 - i}</div>
              <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 800, color: b ? ACCENT : '#94a3b8' }}>{b}</div>
            </div>
          ))}
        </div>
        <Stat label="Count (decimal)" value={sim.s} accent />
        <Stat label="Clock pulses" value={sim.pulses} />
        {kind === 'updown' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ToggleBit label="M" value={m} onChange={setM} />
            <span style={{ fontSize: 12, color: '#64748b', maxWidth: 90 }}>{m ? 'Counting down' : 'Counting up'}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
        <button type="button" onClick={pulse} style={{ ...btn, background: ACCENT, color: '#fff', border: `1px solid ${ACCENT}` }}>Clock pulse</button>
        <button type="button" onClick={() => setAuto((a) => !a)} style={btn}>{auto ? 'Stop auto-run' : 'Auto-run'}</button>
        <button type="button" onClick={reset} style={btn}>Reset</button>
        {isAsync && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: MUTED, marginLeft: 'auto', cursor: 'pointer' }}>
            <input type="checkbox" checked={skewOn} onChange={(e) => setSkewOn(e.target.checked)} /> Show ripple delay
          </label>
        )}
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 8, padding: 14, overflowX: 'auto' }}>
        <Waveform states={sim.hist.map((h) => h.s)} n={n} edge={edge} skew={skewOn ? 7 : 0} modes={modes} />
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 12, color: '#94a3b8' }}>
        The timing diagram is drawn live from the pulses you send (last 12 shown).{isAsync ? ' With ripple delay on, higher bits change slightly later than lower bits, exaggerated for clarity.' : ''}
      </p>
    </div>
  );
}

/* ─────────────── Calculators ─────────────── */
export function FmaxCalc() {
  const [n, setN] = useState(4);
  const [tpd, setTpd] = useState(15);
  const [tg, setTg] = useState(8);
  const fa = 1000 / (n * tpd);
  const fs = 1000 / (tpd + tg);
  const row = { display: 'grid', gridTemplateColumns: '170px 1fr 70px', gap: 12, alignItems: 'center', marginBottom: 10, fontSize: 14, color: MUTED };
  return (
    <div style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 24 }}>
      <label style={row}>Number of bits <input type="range" min="2" max="12" value={n} onChange={(e) => setN(+e.target.value)} /><b style={{ color: INK }}>{n}</b></label>
      <label style={row}>Flip-flop delay (ns) <input type="range" min="5" max="40" value={tpd} onChange={(e) => setTpd(+e.target.value)} /><b style={{ color: INK }}>{tpd} ns</b></label>
      <label style={row}>AND gate delay (ns) <input type="range" min="2" max="20" value={tg} onChange={(e) => setTg(+e.target.value)} /><b style={{ color: INK }}>{tg} ns</b></label>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <Stat label="Ripple counter, max clock" value={`${fa.toFixed(1)} MHz`} accent />
        <Stat label="Synchronous, max clock" value={`${fs.toFixed(1)} MHz`} />
        <Stat label="Sync is faster by" value={`${(fs / fa).toFixed(1)}×`} />
      </div>
      <p style={{ margin: '14px 0 0', fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
        Simplified model: a ripple counter must wait for all n stages, so the period is about n × t(FF). A synchronous counter waits for one flip-flop plus the steering gate.
      </p>
    </div>
  );
}

export function ModCalc() {
  const [N, setN] = useState(10);
  let n = 1;
  while ((1 << n) < N) n += 1;
  const checks = Array.from({ length: n }, (_, i) => ({ k: i + 1, ok: (1 << (i + 1)) >= N }));
  return (
    <div style={{ background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: 24 }}>
      <label style={{ display: 'grid', gridTemplateColumns: '170px 1fr 70px', gap: 12, alignItems: 'center', fontSize: 14, color: MUTED, marginBottom: 16 }}>
        Modulus N <input type="range" min="2" max="32" value={N} onChange={(e) => setN(+e.target.value)} /><b style={{ color: INK }}>{N}</b>
      </label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {checks.map((c) => (
          <span key={c.k} style={{ fontFamily: MONO, fontSize: 13, padding: '6px 12px', borderRadius: 999, background: c.ok ? '#f0fdf4' : '#fff', border: `1px solid ${c.ok ? '#bbf7d0' : LINE}`, color: c.ok ? '#15803d' : '#94a3b8', fontWeight: 700 }}>
            n = {c.k}: {N} ≤ {1 << c.k} → {c.ok ? 'true' : 'false'}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Stat label="Flip-flops needed" value={n} accent />
        <Stat label="Unused states" value={(1 << n) - N} />
        <Stat label="Counts from" value={`0 to ${N - 1}`} />
        <Stat label="Output frequency" value={`f ÷ ${N}`} />
      </div>
    </div>
  );
}

/* ─────────────── Related links ─────────────── */
export function Related({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
      {items.map((r) => (
        <Link key={r.to} to={r.to} style={{ textDecoration: 'none', background: '#f8fafc', border: `1px solid ${LINE}`, borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{r.title}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>{r.sub}</div>
          </div>
          <span style={{ color: ACCENT, fontSize: 20 }}>→</span>
        </Link>
      ))}
    </div>
  );
}

/* ─────────────── Block renderer ─────────────── */
function StepBox({ n, title, blocks }) {
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 8, marginBottom: 24, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f8fafc', padding: '14px 18px', borderBottom: `1px solid ${LINE}` }}>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: ACCENT, color: '#fff', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>{title}</span>
      </div>
      <div style={{ padding: 20 }}><Blocks blocks={blocks} /></div>
    </div>
  );
}

const SELF_SPACED = ['p', 'bullets', 'fig'];

function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    let el = null;
    switch (b.type) {
      case 'p': el = <P>{b.text}</P>; break;
      case 'bullets': el = <Bullets items={b.items} />; break;
      case 'fig': el = <Figure {...b} />; break;
      case 'steps': el = <StepList items={b.items} />; break;
      case 'eq': el = <Equations items={b.items} />; break;
      case 'note': el = <Callout tone={b.tone}>{b.text}</Callout>; break;
      case 'table': el = <SimpleTable heads={b.heads} rows={b.rows} caption={b.caption} />; break;
      case 'keypoints': el = <KeyPoints items={b.items} />; break;
      case 'seq': el = <SeqTable {...b} />; break;
      case 'exc': el = <ExcTable {...b} />; break;
      case 'wave': el = <StaticWave {...b} />; break;
      case 'sim': el = <CounterSim {...b} />; break;
      case 'fmax': el = <FmaxCalc />; break;
      case 'modcalc': el = <ModCalc />; break;
      case 'code': el = <CodeBlock lang={b.lang}>{b.code}</CodeBlock>; break;
      case 'step': el = <StepBox n={b.n} title={b.title} blocks={b.blocks} />; break;
      case 'kmap':
        el = <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>{b.maps.map((m) => <KMap key={m.title} {...m} />)}</div>;
        break;
      case 'kmap4':
        el = <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>{b.maps.map((m) => <KMap key={m.title} {...m} />)}</div>;
        break;
      case 'node': el = b.node; break;
      default: el = null;
    }
    return <div key={i} style={{ marginBottom: SELF_SPACED.includes(b.type) || b.type === 'step' ? 0 : 24 }}>{el}</div>;
  });
}

/* ─────────────── Page template ─────────────── */
export default function CounterPage({
  title, lead, bigTitle, prev, next, facts, sections, remember, pros, cons, verdict, apps, practice, related,
}) {
  return (
    <PageShell parent={{ to: '/topics/counters', title: 'Counters' }} title={title} lead={lead} bigTitle={bigTitle} prev={prev} next={next}>
      {facts && <Facts items={facts} />}

      {sections.map((sec) => (
        <Card key={sec.title} kicker={sec.kicker} title={sec.title}><Blocks blocks={sec.blocks} /></Card>
      ))}

      {remember && <Card kicker="Cheat sheet" title="Important points"><Remember items={remember} /></Card>}

      {pros && (
        <Card kicker="Strengths and limits" title="Advantages and disadvantages">
          <ProsCons pros={pros} cons={cons} />
          {verdict && <Verdict use={verdict.use} avoid={verdict.avoid} />}
        </Card>
      )}

      {apps && <Card kicker="In the real world" title="Applications"><AppTiles items={apps} /></Card>}

      {practice && (
        <Card kicker="Practice" title="Test yourself">
          <P>Type the answer, then press Check.</P>
          <Practice items={practice} />
        </Card>
      )}

      {related && <Card kicker="Keep going" title="Related concepts"><Related items={related} /></Card>}
    </PageShell>
  );
}