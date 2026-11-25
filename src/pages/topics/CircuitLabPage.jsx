import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CircuitBoard, GraduationCap, Maximize2, RotateCw, ArrowLeft, ArrowRight } from 'lucide-react';

/* crop = pixels of the top bar to hide inside the frame.
   Test live without editing: /simulator/editor?crop=48 */
const TABS = {
  editor: {
    label: 'Editor',
    blurb: 'Draw and simulate circuits',
    Icon: CircuitBoard,
    src: 'https://editor.opencircuits.net/editor',
    crop: 56,
    prev: { to: '/topics', title: 'Topics', sub: 'All topics' },
    next: { to: '/simulator/academy', title: 'Learn', sub: 'Guided logic lessons' },
  },
  academy: {
    label: 'Lessons',
    blurb: 'First Learn & Then Biuld',
    Icon: GraduationCap,
    src: 'https://editor.opencircuits.net/academy',
    crop: 56,
    prev: { to: '/simulator/editor', title: 'Editor', sub: 'Draw and simulate circuits' },
    next: { to: '/topics', title: 'Topics', sub: 'Back to all topics' },
  },
};
const BASE_PATH = '/simulator';
const SLOW_AFTER_MS = 12000;

const iconBtn =
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D8CEBF] bg-white hover:bg-[#FAF8F4] text-[#3C2E21] font-extrabold text-xs transition-all';

function NavCard({ item, dir }) {
  const isNext = dir === 'next';
  return (
    <Link
      to={item.to}
      className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#D8CEBF] bg-white hover:bg-[#FAF8F4] shadow-sm hover:shadow transition-all ${isNext ? 'flex-row-reverse text-right' : ''}`}
    >
      <span className="w-10 h-10 shrink-0 rounded-full bg-[#95C798] group-hover:bg-[#84B987] flex items-center justify-center transition-all">
        {isNext
          ? <ArrowRight className="w-5 h-5 text-[#133019]" />
          : <ArrowLeft className="w-5 h-5 text-[#133019]" />}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#386641]">{isNext ? 'Next' : 'Previous'}</span>
        <span className="text-base font-extrabold text-[#3C2E21]">{item.title}</span>
        <span className="text-xs font-semibold text-[#3C2E21] opacity-60">{item.sub}</span>
      </span>
    </Link>
  );
}

export default function CircuitLabPage() {
  const { tab } = useParams();
  const [params] = useSearchParams();
  const key = TABS[tab] ? tab : 'editor';
  const cfg = TABS[key];
  const q = params.get('crop');
  const crop = q !== null && Number.isFinite(Number(q)) ? Number(q) : cfg.crop;

  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [version, setVersion] = useState(0);
  const viewer = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setSlow(false);
    const t = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => clearTimeout(t);
  }, [key, version]);

  const fullscreen = () => {
    const el = viewer.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen();
  };

  return (
    <div className="w-full bg-[#FAF8F4] p-4 lg:p-6">
      <style>{'@keyframes cl-spin { to { transform: rotate(360deg); } }'}</style>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-60 lg:self-start lg:sticky lg:top-6 p-4 rounded-2xl border border-[#D8CEBF] bg-white shadow-sm">
          <h1 className="hidden lg:block px-2 pb-1 text-lg font-extrabold text-[#3C2E21]">VIDS Lab</h1>
          <p className="hidden lg:block px-2 pb-4 text-xs font-semibold text-[#3C2E21] opacity-60">Build and learn digital circuits.</p>
          <nav className="flex lg:flex-col gap-3">
            {Object.entries(TABS).map(([id, t]) => {
              const active = id === key;
              return (
                <Link
                  key={id}
                  to={`${BASE_PATH}/${id}`}
                  className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 rounded-2xl border font-extrabold text-sm transition-all ${
                    active
                      ? 'bg-[#95C798] border-[#95C798] text-[#133019] shadow-sm'
                      : 'bg-[#FAF8F4] border-[#D8CEBF] text-[#3C2E21] hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <t.Icon className={`w-5 h-5 shrink-0 ${active ? 'text-[#133019]' : 'text-[#386641]'}`} />
                  <span className="flex flex-col leading-tight">
                    <span>{t.label}</span>
                    <span className="hidden sm:block text-[11px] font-semibold opacity-70">{t.blurb}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Framed viewer */}
        <section className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="rounded-2xl border border-[#D8CEBF] bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#D8CEBF] bg-[#FAF8F4]">
              <div className="flex items-center gap-2.5 min-w-0">
                <cfg.Icon className="w-5 h-5 shrink-0 text-[#386641]" />
                <span className="truncate text-sm font-extrabold text-[#3C2E21]">VIDS Lab · {cfg.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={() => setVersion((v) => v + 1)} className={iconBtn}>
                  <RotateCw className="w-3.5 h-3.5 text-[#386641]" />
                  <span className="hidden sm:inline">Reload</span>
                </button>
                <button type="button" onClick={fullscreen} className={iconBtn}>
                  <Maximize2 className="w-3.5 h-3.5 text-[#386641]" />
                  <span className="hidden sm:inline">Full screen</span>
                </button>
              </div>
            </div>

            <div
              ref={viewer}
              className="relative w-full overflow-hidden bg-white"
              style={{ height: 'max(520px, calc(100vh - 11rem))' }}
            >
              <iframe
                key={`${key}-${version}`}
                title={`VIDS LAB ${cfg.label}`}
                src={cfg.src}
                onLoad={() => setLoaded(true)}
                allow="clipboard-read; clipboard-write; fullscreen"
                className="absolute left-0 w-full border-0"
                style={{ top: -crop, height: `calc(100% + ${crop}px)` }}
              />
              {!loaded && (
                <div className="absolute inset-0 bg-[#FAF8F4] flex flex-col items-center justify-center gap-4 text-center px-6">
                  <div
                    className="w-10 h-10 rounded-full border-4 border-[#D8CEBF] border-t-[#386641]"
                    style={{ animation: 'cl-spin 0.9s linear infinite' }}
                  />
                  <p className="font-extrabold text-[#3C2E21]">Loading {cfg.label}…</p>
                  {slow && (
                    <button
                      type="button"
                      onClick={() => setVersion((v) => v + 1)}
                      className="px-5 py-2.5 rounded-full bg-[#95C798] hover:bg-[#84B987] text-[#133019] font-extrabold text-xs shadow-sm transition-all"
                    >
                      Still loading? Try again
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Previous / next */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NavCard item={cfg.prev} dir="prev" />
            <NavCard item={cfg.next} dir="next" />
          </div>
        </section>
      </div>
    </div>
  );
}