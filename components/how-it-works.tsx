"use client"

import { useState, useEffect, useRef, type MouseEvent } from "react"

/**
 * Epping Car Buyer - How It Works section (v8)
 *  - Cohesive illustration system, no overlapping elements
 *  - Animated transforms are always nested inside a positioned <g>
 *    so they never clobber SVG positioning (no "stuck in corner" bug)
 *  - Only the active scene is mounted for smooth performance
 */

type Step = {
  num: string
  title: string
  desc: string
  scene: () => JSX.Element
}

const INK = "#1f1147"

const CarIcon = ({ accent = "#5b21b6", scale = 1 }: { accent?: string; scale?: number }) => (
  <g transform={`scale(${scale})`}>
    <path
      d="M -34 6 L -30 -4 Q -27 -10 -19 -11 L 8 -11 Q 16 -11 22 -5 L 31 1 Q 36 3 36 8 L 36 10 Q 36 13 33 13 L -32 13 Q -35 13 -35 10 L -35 8 Q -35 7 -34 6 Z"
      fill="#ffffff"
      stroke={INK}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M -25 -6 Q -23 -9 -18 -9 L -7 -9 L -7 -1 L -28 -1 Q -27 -4 -25 -6 Z" fill={accent} fillOpacity="0.25" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M -3 -9 L 7 -9 Q 14 -9 19 -3 L 20 -1 L -3 -1 Z" fill={accent} fillOpacity="0.25" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="-5" y1="-1" x2="-5" y2="11" stroke={INK} strokeWidth="1" />
    <circle cx="34" cy="6" r="1.5" fill="#fbbf24" />
    <circle cx="-18" cy="13" r="7" fill={INK} />
    <circle cx="-18" cy="13" r="2.8" fill="#ffffff" />
    <circle cx="20" cy="13" r="7" fill={INK} />
    <circle cx="20" cy="13" r="2.8" fill="#ffffff" />
  </g>
)

const CardShadow = ({ id }: { id: string }) => (
  <defs>
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={INK} floodOpacity="0.18" />
    </filter>
  </defs>
)

/* ---------------- Scene 1 — Choose your path ---------------- */
const Scene1 = () => (
  <svg viewBox="0 0 320 180" className="w-[92%] h-[86%]" xmlns="http://www.w3.org/2000/svg">
    <CardShadow id="s1shadow" />

    {/* Cash Offer card */}
    <g className="animate-[floatUp_5s_ease-in-out_infinite]" filter="url(#s1shadow)">
      <rect x="14" y="22" width="124" height="138" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 14 34 Q 14 22 26 22 L 126 22 Q 138 22 138 34 L 138 44 L 14 44 Z" fill="#10b981" />
      <text x="76" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Cash Offer</text>
      <g transform="translate(76 82)"><CarIcon accent="#10b981" scale={1.05} /></g>
      <line x1="28" y1="114" x2="124" y2="114" stroke="#eef2f7" strokeWidth="1" />
      <g transform="translate(34 130)">
        <circle r="8" fill="#d1fae5" />
        <path d="M 1 -4 L -3 1 L 0 1 L -1 4 L 3 -1 L 0 -1 Z" fill="#10b981" />
      </g>
      <text x="48" y="128" fontSize="7" fontWeight="700" fill={INK}>Paid instantly</text>
      <text x="48" y="137" fontSize="5.5" fill="#6b7280">Same-day transfer</text>
    </g>

    {/* OR divider */}
    <circle cx="160" cy="90" r="15" fill="#5b21b6" stroke="#ffffff" strokeWidth="2.5" />
    <text x="160" y="94.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">OR</text>

    {/* Market & Sell card */}
    <g className="animate-[floatUp_5s_ease-in-out_infinite]" style={{ animationDelay: "-2.5s" }} filter="url(#s1shadow)">
      <rect x="182" y="22" width="124" height="138" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 182 34 Q 182 22 194 22 L 294 22 Q 306 22 306 34 L 306 44 L 182 44 Z" fill="#FFCC00" />
      <text x="244" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill={INK}>Market &amp; Sell</text>
      <g transform="translate(244 82)"><CarIcon accent="#ca8a04" scale={1.05} /></g>
      <line x1="196" y1="114" x2="292" y2="114" stroke="#eef2f7" strokeWidth="1" />
      <g transform="translate(204 130)">
        <circle r="8" fill="#fef9c3" />
        <rect x="-4" y="-2.5" width="8" height="6" rx="1.4" fill="none" stroke={INK} strokeWidth="1.2" />
        <circle cx="0" cy="0.5" r="1.8" fill="none" stroke={INK} strokeWidth="1.2" />
        <rect x="-2.5" y="-4.2" width="5" height="2.2" rx="0.6" fill={INK} />
      </g>
      <text x="218" y="128" fontSize="7" fontWeight="700" fill={INK}>We advertise it</text>
      <text x="218" y="137" fontSize="5.5" fill="#6b7280">Sell for more</text>
    </g>
  </svg>
)

/* ---------------- Scene 2 — Book an appointment ---------------- */
const Scene2 = () => (
  <svg viewBox="0 0 320 180" className="w-[92%] h-[86%]" xmlns="http://www.w3.org/2000/svg">
    <CardShadow id="s2shadow" />

    <g className="animate-[floatUp_5s_ease-in-out_infinite]" filter="url(#s2shadow)">
      <rect x="76" y="26" width="168" height="128" rx="14" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 76 40 Q 76 26 90 26 L 230 26 Q 244 26 244 40 L 244 50 L 76 50 Z" fill="#5b21b6" />
      <text x="160" y="43" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Appointment booked</text>

      {/* calendar tear-off */}
      <g transform="translate(96 68)">
        <rect x="0" y="0" width="44" height="48" rx="7" fill="#ffffff" stroke={INK} strokeWidth="2" />
        <path d="M 0 9 Q 0 0 9 0 L 35 0 Q 44 0 44 9 L 44 13 L 0 13 Z" fill="#5b21b6" />
        <rect x="10" y="-3" width="3" height="8" rx="1.5" fill={INK} />
        <rect x="31" y="-3" width="3" height="8" rx="1.5" fill={INK} />
        <text x="22" y="10" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#ffffff">MAY</text>
        <text x="22" y="38" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK}>21</text>
      </g>

      {/* details */}
      <text x="152" y="74" fontSize="8" fontWeight="700" fill={INK}>Wednesday 21 May</text>
      <g transform="translate(152 83)">
        <circle cx="4" cy="4" r="4.5" fill="none" stroke="#7c3aed" strokeWidth="1.6" />
        <path d="M 4 1.5 L 4 4 L 6 5.6" stroke="#7c3aed" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <text x="14" y="7" fontSize="7" fill="#374151">2:30 PM</text>
      </g>
      <g transform="translate(152 97)">
        <path d="M 4 0 Q 9 0 9 5 Q 9 9 4 13 Q -1 9 -1 5 Q -1 0 4 0 Z" fill="#10b981" />
        <circle cx="4" cy="5" r="2" fill="#ffffff" />
        <text x="14" y="9" fontSize="7" fill="#374151">We come to you</text>
      </g>

      {/* confirmed pill */}
      <rect x="92" y="126" width="136" height="20" rx="10" fill="#d1fae5" />
      <g transform="translate(110 136)">
        <circle r="6" fill="#10b981" />
        <path d="M -2.6 0 L -0.6 2 L 2.6 -2.2" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="122" y="139" fontSize="7" fontWeight="700" fill="#047857">Confirmed</text>
    </g>

    {/* floating tick badge (translate on outer, animation on inner) */}
    <g transform="translate(234 54)">
      <g className="animate-[popIn_3.5s_ease-in-out_infinite] origin-center">
        <circle r="12" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M -4.5 0 L -1.5 3 L 4.5 -4" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  </svg>
)

/* ---------------- Scene 3 — We inspect your car ---------------- */
const Scene3 = () => (
  <svg viewBox="0 0 320 180" className="w-[92%] h-[86%]" xmlns="http://www.w3.org/2000/svg">
    <CardShadow id="s3shadow" />

    {/* ground shadow */}
    <ellipse cx="108" cy="134" rx="70" ry="9" fill={INK} opacity="0.15" />

    {/* car (translate on outer, float on inner) */}
    <g transform="translate(108 102)">
      <g className="animate-[floatUp_5s_ease-in-out_infinite]">
        <CarIcon accent="#5b21b6" scale={1.7} />
      </g>
    </g>

    {/* magnifying glass scanning across the car */}
    <g className="animate-[scan_4s_ease-in-out_infinite]">
      <g transform="translate(108 98)">
        <circle r="16" fill="#7c3aed" fillOpacity="0.12" stroke="#5b21b6" strokeWidth="2.5" />
        <line x1="11" y1="11" x2="22" y2="22" stroke="#5b21b6" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="11" y1="11" x2="22" y2="22" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M -7 -7 Q -2 -10 4 -8" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>

    {/* checklist chips */}
    {[
      { y: 34, label: "Tyres & brakes" },
      { y: 76, label: "Service history" },
      { y: 118, label: "OBD health scan" },
    ].map((c) => (
      <g key={c.label} filter="url(#s3shadow)">
        <rect x="208" y={c.y} width="96" height="28" rx="14" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <g transform={`translate(223 ${c.y + 14})`}>
          <circle r="8" fill="#10b981" />
          <path d="M -3 0 L -0.6 2.4 L 3.4 -2.6" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="236" y={c.y + 17} fontSize="7" fontWeight="600" fill={INK}>{c.label}</text>
      </g>
    ))}
  </svg>
)

/* ---------------- Scene 4 — Get paid ---------------- */
const Scene4 = () => (
  <svg viewBox="0 0 320 180" className="w-[92%] h-[86%]" xmlns="http://www.w3.org/2000/svg">
    <CardShadow id="s4shadow" />

    {/* Cash offer result */}
    <g className="animate-[floatUp_5s_ease-in-out_infinite]" filter="url(#s4shadow)">
      <rect x="14" y="24" width="124" height="134" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 14 36 Q 14 24 26 24 L 126 24 Q 138 24 138 36 L 138 46 L 14 46 Z" fill="#10b981" />
      <text x="76" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">CASH OFFER</text>
      <text x="76" y="92" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK}>£8,450</text>
      <text x="76" y="108" textAnchor="middle" fontSize="6.5" fill="#6b7280">Paid same day</text>
      <rect x="26" y="126" width="100" height="22" rx="11" fill="#d1fae5" />
      <g transform="translate(42 137)">
        <circle r="6.5" fill="#10b981" />
        <path d="M -2.8 0 L -0.7 2.2 L 2.8 -2.4" stroke="#ffffff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="56" y="140" fontSize="7" fontWeight="700" fill="#047857">Done in minutes</text>
    </g>

    {/* OR divider */}
    <circle cx="160" cy="90" r="15" fill="#5b21b6" stroke="#ffffff" strokeWidth="2.5" />
    <text x="160" y="94.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">OR</text>

    {/* Market & Sell result */}
    <g className="animate-[floatUp_5s_ease-in-out_infinite]" style={{ animationDelay: "-2.5s" }} filter="url(#s4shadow)">
      <rect x="182" y="24" width="124" height="134" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 182 36 Q 182 24 194 24 L 294 24 Q 306 24 306 36 L 306 46 L 182 46 Z" fill="#FFCC00" />
      <text x="244" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill={INK}>MARKET &amp; SELL</text>
      <text x="244" y="92" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK}>£11,200</text>
      {/* SOLD stamp */}
      <g transform="translate(244 104) rotate(-7)">
        <rect x="-26" y="-9" width="52" height="18" rx="4" fill="none" stroke="#10b981" strokeWidth="2.4" />
        <text x="0" y="5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981" letterSpacing="1.5">SOLD</text>
      </g>
      <rect x="200" y="130" width="88" height="6" rx="3" fill="#f3f4f6" />
      <rect x="200" y="130" width="88" height="6" rx="3" fill="#10b981" style={{ transformOrigin: "200px 133px", animation: "barGrow 4s ease-in-out infinite" }} />
      <text x="244" y="150" textAnchor="middle" fontSize="6" fontWeight="600" fill="#6b7280">Sold within 7 days</text>
    </g>
  </svg>
)

const EppingSkyline = () => (
  <svg className="absolute bottom-0 left-0 right-0 h-[38%] opacity-[0.16] pointer-events-none" viewBox="0 0 600 100" preserveAspectRatio="xMidYEnd meet" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 100 L 0 70 L 30 70 L 30 60 L 50 60 L 50 70 L 80 70 L 80 50 L 95 50 L 95 30 L 100 18 L 105 30 L 105 50 L 130 50 L 130 65 L 165 65 L 165 55 L 180 55 L 180 65 L 220 65 L 220 45 L 235 45 L 235 28 L 245 12 L 255 28 L 255 45 L 290 45 L 290 60 L 320 60 L 320 50 L 360 50 L 360 38 L 372 38 L 372 22 L 380 8 L 388 22 L 388 38 L 410 38 L 410 55 L 450 55 L 450 65 L 490 65 L 490 50 L 505 50 L 505 30 L 515 14 L 525 30 L 525 50 L 555 50 L 555 70 L 600 70 L 600 100 Z" fill="#ffffff" />
  </svg>
)

const STEPS: Step[] = [
  { num: "01", title: "Choose your path", desc: "Get a cash valuation or let us sell your car for you.", scene: Scene1 },
  { num: "02", title: "Book an appointment", desc: "We come to you for viewing and inspection.", scene: Scene2 },
  { num: "03", title: "We inspect your car", desc: "Full appraisal, OBD scan and live market data.", scene: Scene3 },
  { num: "04", title: "Get paid", desc: "Instant cash transfer or sold within 7 days for more.", scene: Scene4 },
]

const AUTO_DELAY_MS = 4500

export function HowItWorks() {
  const [current, setCurrent] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setCurrent(c => (c === STEPS.length ? 1 : c + 1))
    }, AUTO_DELAY_MS)
    return () => clearInterval(id)
  }, [isPlaying])

  const goTo = (n: number) => {
    setIsPlaying(false)
    setCurrent(n)
  }

  const handleTilt = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
    const el = cardRefs.current[idx]
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-2px)`
  }

  const resetTilt = (idx: number) => {
    const el = cardRefs.current[idx]
    if (el) el.style.transform = ""
  }

  const ActiveScene = STEPS[current - 1].scene

  return (
    <section className="w-full max-w-5xl mx-auto p-6">
      <style>{`
        @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes popIn { 0%, 20% { opacity: 0; transform: scale(0.4); } 35%, 100% { opacity: 1; transform: scale(1); } }
        @keyframes scan { 0%, 100% { transform: translateX(-30px); } 50% { transform: translateX(30px); } }
        @keyframes barGrow { 0% { transform: scaleX(0); } 55%, 100% { transform: scaleX(1); } }
        @keyframes barFill { from { width: 0; } to { width: 100%; } }
        @keyframes fadeScene { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-xs font-medium text-violet-600 uppercase tracking-widest mb-1">The process</p>
          <h2 className="text-2xl font-medium text-slate-900">From valuation to bank transfer</h2>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => goTo(current === 1 ? STEPS.length : current - 1)} className="px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition" aria-label="Previous step">‹</button>
          <button onClick={() => setIsPlaying(p => !p)} className="px-3.5 py-1.5 text-sm bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition">{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={() => goTo(current === STEPS.length ? 1 : current + 1)} className="px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition" aria-label="Next step">›</button>
        </div>
      </div>

      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_40px_-20px_rgba(91,33,182,0.4)]" style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)" }}>
        <div className="absolute -top-20 -left-16 w-60 h-60 rounded-full bg-violet-300 opacity-[0.35] blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-amber-400 opacity-[0.25] blur-3xl pointer-events-none" />

        <EppingSkyline />

        <div className="absolute top-4 left-5 text-[11px] font-medium text-white/75 tracking-widest z-10">STEP {String(current).padStart(2, "0")} OF 04</div>
        <div className="absolute top-4 right-5 text-sm font-medium text-amber-400 z-10">{String(current).padStart(2, "0")} / 04</div>

        <div key={current} className="absolute inset-0 flex items-center justify-center pt-6" style={{ animation: "fadeScene 0.45s ease-out" }}>
          <ActiveScene />
        </div>
      </div>

      <div className="flex gap-1 mt-4 mb-3">
        {STEPS.map((_, i) => (
          <div key={i} className="flex-1 h-[3px] rounded bg-slate-200 overflow-hidden">
            {i + 1 < current && <div className="h-full bg-violet-700" />}
            {i + 1 === current && isPlaying && (
              <div className="h-full bg-violet-700" style={{ animation: `barFill ${AUTO_DELAY_MS}ms linear forwards` }} />
            )}
            {i + 1 === current && !isPlaying && <div className="h-full bg-violet-700 w-full" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {STEPS.map((s, i) => {
          const isActive = current === i + 1
          return (
            <button
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              onClick={() => goTo(i + 1)}
              onMouseMove={e => handleTilt(e, i)}
              onMouseLeave={() => resetTilt(i)}
              className={`relative text-left p-3.5 rounded-xl border transition-all overflow-hidden ${isActive ? "border-violet-700 bg-gradient-to-b from-violet-50 to-white" : "border-slate-200 bg-white hover:border-violet-400 hover:shadow-[0_8px_24px_-12px_rgba(124,58,237,0.3)]"}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {isActive && <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #5b21b6, #7c3aed)" }} />}
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-medium mb-2 transition ${isActive ? "bg-violet-700 text-white" : "bg-violet-100 text-violet-700"}`}>{s.num}</span>
              <p className="text-[13px] font-medium text-slate-900 leading-tight mb-1">{s.title}</p>
              <p className="text-[11px] text-slate-500 leading-snug">{s.desc}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
