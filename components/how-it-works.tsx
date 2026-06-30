"use client"

import { useState, useEffect, useRef, type MouseEvent } from "react"

/**
 * Epping Car Buyer - How It Works section (v7)
 *  - Static wheels (no spinning)
 *  - SCB1 reg plate
 *  - Phone car icon matches scene 3 simple car style
 *
 * Drop into v0 / Next.js. Tailwind required.
 */

type Step = {
  num: string
  title: string
  desc: string
  scene: () => JSX.Element
}

/* ---------------------------------------------------------------
   Unified illustration system
   - One car icon used across every slide
   - White cards, coloured headers, 2px #1f1147 outlines
   - Shared soft drop shadow
   - Brand palette: purple #5b21b6, green #10b981, yellow #FFCC00
---------------------------------------------------------------- */

const INK = "#1f1147"

const CarIcon = ({ accent = "#5b21b6", scale = 1 }: { accent?: string; scale?: number }) => (
  <g transform={`scale(${scale})`}>
    {/* body */}
    <path
      d="M -34 6 L -30 -4 Q -27 -10 -19 -11 L 8 -11 Q 16 -11 22 -5 L 31 1 Q 36 3 36 8 L 36 10 Q 36 13 33 13 L -32 13 Q -35 13 -35 10 L -35 8 Q -35 7 -34 6 Z"
      fill="#ffffff"
      stroke={INK}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* windows */}
    <path d="M -25 -6 Q -23 -9 -18 -9 L -7 -9 L -7 -1 L -28 -1 Q -27 -4 -25 -6 Z" fill={accent} fillOpacity="0.25" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M -3 -9 L 7 -9 Q 14 -9 19 -3 L 20 -1 L -3 -1 Z" fill={accent} fillOpacity="0.25" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="-5" y1="-1" x2="-5" y2="11" stroke={INK} strokeWidth="1" />
    {/* headlight */}
    <circle cx="34" cy="6" r="1.5" fill="#fbbf24" />
    {/* wheels */}
    <circle cx="-18" cy="13" r="7" fill={INK} />
    <circle cx="-18" cy="13" r="2.8" fill="#ffffff" />
    <circle cx="20" cy="13" r="7" fill={INK} />
    <circle cx="20" cy="13" r="2.8" fill="#ffffff" />
  </g>
)

const Scene1 = () => (
  <svg viewBox="0 0 320 180" className="w-[94%] h-[92%]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="s1shadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={INK} floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Cash Offer card */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" filter="url(#s1shadow)">
      <rect x="12" y="22" width="134" height="138" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 12 34 Q 12 22 24 22 L 134 22 Q 146 22 146 34 L 146 44 L 12 44 Z" fill="#10b981" />
      <text x="79" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Cash Offer</text>
      <g transform="translate(79 78)"><CarIcon accent="#10b981" scale={1.05} /></g>
      <g transform="translate(0 106)">
        <g transform="translate(38 0)" className="animate-[lightning_1.5s_ease-in-out_infinite] origin-center">
          <circle r="8" fill="#d1fae5" />
          <path d="M 1 -4 L -3 1 L 0 1 L -1 4 L 3 -1 L 0 -1 Z" fill="#10b981" />
        </g>
        <text x="52" y="-1" fontSize="7" fontWeight="700" fill={INK}>Paid instantly</text>
        <text x="52" y="8" fontSize="5.5" fill="#6b7280">Bank transfer, same day</text>
      </g>
      <rect x="30" y="130" width="98" height="22" rx="11" fill="#10b981" />
      <text x="79" y="144.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#ffffff">Get cash offer</text>
    </g>

    {/* OR divider */}
    <g className="animate-[popIn_2.5s_ease-in-out_infinite] origin-center">
      <circle cx="160" cy="90" r="15" fill="#5b21b6" stroke="#ffffff" strokeWidth="2.5" />
      <text x="160" y="94.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">OR</text>
    </g>

    {/* Market & Sell card */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" style={{ animationDelay: "-0.6s" }} filter="url(#s1shadow)">
      <rect x="174" y="22" width="134" height="138" rx="12" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 174 34 Q 174 22 186 22 L 296 22 Q 308 22 308 34 L 308 44 L 174 44 Z" fill="#FFCC00" />
      <text x="241" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill={INK}>Market &amp; Sell</text>
      <g transform="translate(241 78)"><CarIcon accent="#ca8a04" scale={1.05} /></g>
      <g transform="translate(186 106)">
        {/* camera glyph */}
        <g transform="translate(0 0)">
          <circle r="8" fill="#fef9c3" />
          <rect x="-4" y="-2.5" width="8" height="6" rx="1.4" fill="none" stroke={INK} strokeWidth="1.2" />
          <circle cx="0" cy="0.5" r="1.8" fill="none" stroke={INK} strokeWidth="1.2" />
          <rect x="-2.5" y="-4.2" width="5" height="2.2" rx="0.6" fill={INK} />
        </g>
        <text x="14" y="-1" fontSize="7" fontWeight="700" fill={INK}>We advertise it</text>
        <text x="14" y="8" fontSize="5.5" fill="#6b7280">Photos, video &amp; listings</text>
      </g>
      <rect x="192" y="130" width="98" height="22" rx="11" fill="#FFCC00" />
      <text x="241" y="144.5" textAnchor="middle" fontSize="7" fontWeight="700" fill={INK}>Sell for more</text>
    </g>
  </svg>
)

const Scene2 = () => (
  <svg viewBox="0 0 320 180" className="w-[94%] h-[92%]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="s2shadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={INK} floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Appointment confirmation card */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" filter="url(#s2shadow)">
      <rect x="78" y="26" width="164" height="128" rx="14" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 78 40 Q 78 26 92 26 L 228 26 Q 242 26 242 40 L 242 50 L 78 50 Z" fill="#5b21b6" />
      <text x="160" y="43" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Appointment booked</text>

      {/* calendar tear-off */}
      <g transform="translate(96 66)">
        <rect x="0" y="0" width="44" height="48" rx="7" fill="#ffffff" stroke={INK} strokeWidth="2" />
        <path d="M 0 9 Q 0 0 9 0 L 35 0 Q 44 0 44 9 L 44 13 L 0 13 Z" fill="#5b21b6" />
        <rect x="10" y="-3" width="3" height="8" rx="1.5" fill={INK} />
        <rect x="31" y="-3" width="3" height="8" rx="1.5" fill={INK} />
        <text x="22" y="10" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#ffffff">MAY</text>
        <text x="22" y="38" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK}>21</text>
      </g>

      {/* details */}
      <text x="152" y="73" fontSize="8" fontWeight="700" fill={INK}>Wednesday 21 May</text>
      <g transform="translate(152 82)">
        <circle cx="4" cy="4" r="4.5" fill="none" stroke="#7c3aed" strokeWidth="1.6" />
        <path d="M 4 1.5 L 4 4 L 6 5.6" stroke="#7c3aed" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <text x="14" y="7" fontSize="7" fill="#374151">2:30 PM</text>
      </g>
      <g transform="translate(152 96)">
        <path d="M 4 0 Q 9 0 9 5 Q 9 9 4 13 Q -1 9 -1 5 Q -1 0 4 0 Z" fill="#10b981" />
        <circle cx="4" cy="5" r="2" fill="#ffffff" />
        <text x="14" y="9" fontSize="7" fill="#374151">We come to you</text>
      </g>

      {/* confirmed pill */}
      <rect x="90" y="126" width="140" height="20" rx="10" fill="#d1fae5" />
      <g transform="translate(108 136)">
        <circle r="6" fill="#10b981" />
        <path d="M -2.6 0 L -0.6 2 L 2.6 -2.2" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="120" y="139" fontSize="7" fontWeight="700" fill="#047857">Confirmed</text>
    </g>

    {/* floating tick badge */}
    <g className="animate-[popIn_2.5s_ease-in-out_infinite] origin-center" transform="translate(234 58)">
      <circle r="13" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M -5 0 L -1.5 3.5 L 5 -4.5" stroke="#ffffff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)

const Scene3 = () => (
  <svg viewBox="0 0 320 180" className="w-[94%] h-[92%]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="s3shadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={INK} floodOpacity="0.18" />
      </filter>
    </defs>

    {/* ground shadow */}
    <ellipse cx="138" cy="148" rx="92" ry="10" fill={INK} opacity="0.15" />

    {/* car under inspection */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" transform="translate(138 110)">
      <CarIcon accent="#5b21b6" scale={2} />
    </g>

    {/* magnifying glass scanning over the car */}
    <g className="animate-[scan_3.5s_ease-in-out_infinite]">
      <g transform="translate(138 92)">
        <circle r="16" fill="#7c3aed" fillOpacity="0.14" stroke="#5b21b6" strokeWidth="2.5" />
        <circle r="16" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
        <line x1="11" y1="11" x2="23" y2="23" stroke="#5b21b6" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="11" y1="11" x2="23" y2="23" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M -7 -7 Q -2 -10 4 -8" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>

    {/* checklist chips */}
    {[
      { y: 30, label: "Tyres & brakes" },
      { y: 70, label: "Service history" },
      { y: 110, label: "OBD health scan" },
    ].map((c, i) => (
      <g
        key={c.label}
        className="animate-[floatUp_3s_ease-in-out_infinite]"
        style={{ animationDelay: `${-0.4 * i}s` }}
        filter="url(#s3shadow)"
      >
        <rect x="226" y={c.y} width="90" height="28" rx="14" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <g transform={`translate(241 ${c.y + 14})`}>
          <circle r="8" fill="#10b981" />
          <path d="M -3 0 L -0.6 2.4 L 3.4 -2.6" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="254" y={c.y + 17} fontSize="7" fontWeight="600" fill={INK}>{c.label}</text>
      </g>
    ))}
  </svg>
)

const Scene4 = () => (
  <svg viewBox="0 0 320 180" className="w-[94%] h-[92%]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="s4shadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={INK} floodOpacity="0.2" />
      </filter>
    </defs>

    {/* OR at top */}
    <g className="animate-[popIn_2.5s_ease-in-out_infinite] origin-center">
      <circle cx="160" cy="12" r="9" fill="#5b21b6" stroke="#ffffff" strokeWidth="2" />
      <text x="160" y="15.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="#ffffff">OR</text>
    </g>

    {/* Phone / bank mockup (centre) */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" transform="translate(40 18)" filter="url(#s4shadow)">
      <rect x="62" y="14" width="116" height="124" rx="13" fill={INK} />
      <rect x="64" y="16" width="112" height="120" rx="11" fill="#f5f3ff" />
      <rect x="108" y="18" width="24" height="3.5" rx="1.75" fill={INK} />
      <text x="70" y="30" fontSize="3.5" fill={INK} fontWeight="500">9:41</text>
      <rect x="160" y="27" width="8" height="3" rx="0.5" fill={INK} />
      <path d="M 64 47 L 64 27 Q 64 16 75 16 L 165 16 Q 176 16 176 27 L 176 47 Z" fill="#5b21b6" />
      <text x="120" y="42" textAnchor="middle" fontSize="5" fontWeight="700" fill="#ffffff">Your Bank</text>
      <text x="78" y="58" fontSize="3" fill="#7c3aed" fontWeight="600">CURRENT ACCOUNT</text>
      <text x="78" y="68" fontSize="3" fill="#7c3aed">Available balance</text>
      <text x="78" y="79" fontSize="9" fill={INK} fontWeight="700">£12,450.00</text>
      <line x1="72" y1="85" x2="168" y2="85" stroke="#ede9fe" strokeWidth="0.6" />
      <g className="animate-[slideInDown_4s_ease-in-out_infinite]">
        <rect x="70" y="90" width="100" height="32" rx="5" fill="#10b981" />
        <circle cx="80" cy="100" r="5" fill="#ffffff" />
        <path d="M 78 99 L 80 102 L 84 95" stroke="#10b981" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="90" y="98" fontSize="3.5" fontWeight="600" fill="#ffffff">Payment received</text>
        <text x="90" y="103" fontSize="2.8" fill="#bbf7d0">From: Epping Car Buyer</text>
        <text x="90" y="108.5" fontSize="5" fontWeight="700" fill="#ffffff">+ £8,450.00</text>
        <text x="90" y="115" fontSize="2.5" fill="#bbf7d0">Faster Payments • just now</text>
        <g className="animate-[lightning_1.5s_ease-in-out_infinite] origin-center" transform="translate(160 99)">
          <path d="M 0 -6 L -3 0 L -1 0 L -2 6 L 3 -1 L 1 -1 Z" fill="#fbbf24" stroke="#78350f" strokeWidth="0.4" />
        </g>
      </g>
      <rect x="72" y="126" width="44" height="6" rx="3" fill="#5b21b6" />
      <text x="94" y="130.2" textAnchor="middle" fontSize="3" fontWeight="600" fill="#ffffff">View transaction</text>
      <rect x="120" y="126" width="44" height="6" rx="3" fill="#ffffff" stroke="#5b21b6" strokeWidth="0.5" />
      <text x="142" y="130.2" textAnchor="middle" fontSize="3" fontWeight="600" fill="#5b21b6">Done</text>
    </g>

    {/* Left card — instant cash */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" style={{ animationDelay: "-0.3s" }} filter="url(#s4shadow)">
      <rect x="6" y="58" width="92" height="70" rx="11" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 6 70 Q 6 58 18 58 L 86 58 Q 98 58 98 70 L 98 74 L 6 74 Z" fill="#10b981" />
      <text x="52" y="69.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="#ffffff">CASH OFFER</text>
      <g transform="translate(20 92)" className="animate-[lightning_1.5s_ease-in-out_infinite] origin-center">
        <circle r="7" fill="#d1fae5" />
        <path d="M 1 -3.5 L -2.5 1 L 0 1 L -1 3.5 L 2.5 -1 L 0 -1 Z" fill="#10b981" />
      </g>
      <text x="31" y="89" fontSize="9" fontWeight="700" fill={INK}>£8,450</text>
      <text x="14" y="106" fontSize="5.5" fill="#6b7280">Paid same day</text>
      <g transform="translate(16 116)">
        <circle r="5" fill="#10b981" />
        <path d="M -2.2 0 L -0.5 1.8 L 2.4 -2" stroke="#ffffff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="25" y="118.5" fontSize="6" fontWeight="600" fill="#047857">Done in minutes</text>
    </g>

    {/* Right card — sold for more */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" style={{ animationDelay: "-0.6s" }} filter="url(#s4shadow)">
      <rect x="222" y="58" width="92" height="70" rx="11" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <path d="M 222 70 Q 222 58 234 58 L 302 58 Q 314 58 314 70 L 314 74 L 222 74 Z" fill="#FFCC00" />
      <text x="268" y="69.5" textAnchor="middle" fontSize="6" fontWeight="700" fill={INK}>MARKET &amp; SELL</text>
      {/* SOLD stamp */}
      <g transform="translate(285 88) rotate(-8)">
        <rect x="-20" y="-7.5" width="40" height="15" rx="3" fill="none" stroke="#10b981" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fontSize="8" fontWeight="700" fill="#10b981" letterSpacing="1">SOLD</text>
      </g>
      <text x="231" y="90" fontSize="9" fontWeight="700" fill={INK}>£11,200</text>
      {/* progress bar */}
      <rect x="232" y="106" width="72" height="6" rx="3" fill="#f3f4f6" />
      <rect x="232" y="106" width="72" height="6" rx="3" fill="#10b981" style={{ transformOrigin: "232px 109px", animation: "barGrow 3.5s ease-in-out infinite" }} />
      <text x="232" y="124" fontSize="5.5" fontWeight="600" fill="#6b7280">Sold within 7 days</text>
    </g>

    {/* Arrows pointing inward to the phone */}
    <g className="animate-[arrowFlow_2s_ease-in-out_infinite]" transform="translate(100 92)">
      <line x1="0" y1="0" x2="12" y2="0" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 9 -3 L 14 0 L 9 3" stroke="#10b981" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g className="animate-[arrowFlow_2s_ease-in-out_infinite]" transform="translate(208 92)" style={{ animationDelay: "-0.6s" }}>
      <line x1="14" y1="0" x2="2" y2="0" stroke="#ca8a04" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 5 -3 L 0 0 L 5 3" stroke="#ca8a04" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)

const EppingSkyline = () => (
  <svg className="absolute bottom-0 left-0 right-0 h-[38%] opacity-[0.18] pointer-events-none" viewBox="0 0 600 100" preserveAspectRatio="xMidYEnd meet" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 100 L 0 70 L 30 70 L 30 60 L 50 60 L 50 70 L 80 70 L 80 50 L 95 50 L 95 30 L 100 18 L 105 30 L 105 50 L 130 50 L 130 65 L 165 65 L 165 55 L 180 55 L 180 65 L 220 65 L 220 45 L 235 45 L 235 28 L 245 12 L 255 28 L 255 45 L 290 45 L 290 60 L 320 60 L 320 50 L 360 50 L 360 38 L 372 38 L 372 22 L 380 8 L 388 22 L 388 38 L 410 38 L 410 55 L 450 55 L 450 65 L 490 65 L 490 50 L 505 50 L 505 30 L 515 14 L 525 30 L 525 50 L 555 50 L 555 70 L 600 70 L 600 100 Z" fill="#ffffff" />
  </svg>
)

const STEPS: Step[] = [
  { num: "01", title: "Choose your path", desc: "Get a cash valuation or let us sell your car for you.", scene: Scene1 },
  { num: "02", title: "Book an appointment", desc: "We come to you for viewing and inspection.", scene: Scene2 },
  { num: "03", title: "We inspect your car", desc: "Full appraisal, test drive, price agreed.", scene: Scene3 },
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

  return (
    <section className="w-full max-w-5xl mx-auto p-6">
      <style>{`
        @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes popIn { 0%, 30% { opacity: 0; transform: scale(0.3); } 45%, 90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1); } }
        @keyframes tapRing { 0% { opacity: 0.8; transform: scale(0.5); } 100% { opacity: 0; transform: scale(1.6); } }
        @keyframes scan { 0%, 100% { transform: translateX(-26px); } 50% { transform: translateX(26px); } }
        @keyframes barGrow { 0% { transform: scaleX(0); } 60%, 100% { transform: scaleX(1); } }
        @keyframes lightning { 0%, 60%, 100% { opacity: 0.6; transform: scale(1); } 70%, 80% { opacity: 1; transform: scale(1.15); } }
        @keyframes slideInDown { 0%, 30% { opacity: 0; transform: translateY(-20px); } 45%, 95% { opacity: 1; transform: translateY(0); } }
        @keyframes arrowFlow { 0% { opacity: 0; transform: translateX(20px); } 30%, 70% { opacity: 1; transform: translateX(0); } 100% { opacity: 0; transform: translateX(-20px); } }
        @keyframes barFill { from { width: 0; } to { width: 100%; } }
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

        {STEPS.map((s, i) => (
          <div key={i} className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${current === i + 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
            <s.scene />
          </div>
        ))}
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
