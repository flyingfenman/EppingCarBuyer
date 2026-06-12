"use client"

import { useState, useEffect, useRef, type MouseEvent } from "react"

/**
 * Stamford Car Buyer - How It Works section (v7)
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

const Scene1 = () => (
  <svg viewBox="0 0 320 170" className="w-[92%] h-[90%]" xmlns="http://www.w3.org/2000/svg">
    {/* Option 1: Cash Offer - Car with banknotes flying */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]">
      <rect x="15" y="15" width="135" height="140" rx="10" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
      <rect x="15" y="15" width="135" height="28" rx="10" fill="#10b981" />
      <text x="82.5" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Cash Offer</text>
      
      {/* Mini car */}
      <g transform="translate(82.5 75)">
        <rect x="-32" y="-2" width="64" height="14" rx="3" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
        <path d="M -22 -2 Q -20 -12, -12 -12 L 12 -12 Q 20 -12, 22 -2 Z" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="-18" cy="12" r="5" fill="#10b981" />
        <circle cx="18" cy="12" r="5" fill="#10b981" />
      </g>
      
      {/* Flying banknotes */}
      <g className="animate-[popIn_2s_ease-in-out_infinite]" style={{ animationDelay: "-0.2s" }}>
        <rect x="40" y="48" width="18" height="10" rx="1" fill="#10b981" stroke="#15803d" strokeWidth="0.5" transform="rotate(-15 49 53)" />
        <text x="49" y="55" textAnchor="middle" fontSize="6" fontWeight="600" fill="#ffffff" transform="rotate(-15 49 53)">£</text>
      </g>
      <g className="animate-[popIn_2s_ease-in-out_infinite]" style={{ animationDelay: "-0.6s" }}>
        <rect x="100" y="52" width="18" height="10" rx="1" fill="#10b981" stroke="#15803d" strokeWidth="0.5" transform="rotate(12 109 57)" />
        <text x="109" y="59" textAnchor="middle" fontSize="6" fontWeight="600" fill="#ffffff" transform="rotate(12 109 57)">£</text>
      </g>
      <g className="animate-[popIn_2s_ease-in-out_infinite]" style={{ animationDelay: "-1s" }}>
        <rect x="70" y="42" width="18" height="10" rx="1" fill="#10b981" stroke="#15803d" strokeWidth="0.5" transform="rotate(5 79 47)" />
        <text x="79" y="49" textAnchor="middle" fontSize="6" fontWeight="600" fill="#ffffff" transform="rotate(5 79 47)">£</text>
      </g>
      
      {/* Lightning bolt for instant */}
      <g transform="translate(125 55)" className="animate-[lightning_1.5s_ease-in-out_infinite]">
        <path d="M 0 -8 L -5 0 L -1 0 L -3 8 L 5 -2 L 1 -2 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
      </g>
      
      <text x="82.5" y="105" textAnchor="middle" fontSize="6" fill="#1f1147" fontWeight="500">Sell today, get paid</text>
      <text x="82.5" y="115" textAnchor="middle" fontSize="6" fill="#1f1147" fontWeight="500">instantly via bank transfer</text>
      
      <rect x="37" y="125" width="91" height="22" rx="11" fill="#10b981" />
      <text x="82.5" y="139" textAnchor="middle" fontSize="7" fontWeight="600" fill="#ffffff">Get Valuation</text>
    </g>
    
    {/* OR divider */}
    <g className="animate-[popIn_2.5s_ease-in-out_infinite] origin-center">
      <circle cx="160" cy="85" r="16" fill="#5b21b6" />
      <text x="160" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">OR</text>
    </g>
    
    {/* Option 2: Sell It For Me - Car with camera/megaphone */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" style={{ animationDelay: "-0.5s" }}>
      <rect x="170" y="15" width="135" height="140" rx="10" fill="#ffffff" stroke="#FFCC00" strokeWidth="2.5" />
      <rect x="170" y="15" width="135" height="28" rx="10" fill="#FFCC00" />
      <text x="237.5" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1f1147">Sell It For Me</text>
      
      {/* Mini car */}
      <g transform="translate(237.5 80)">
        <rect x="-32" y="-2" width="64" height="14" rx="3" fill="#fefce8" stroke="#FFCC00" strokeWidth="1.5" />
        <path d="M -22 -2 Q -20 -12, -12 -12 L 12 -12 Q 20 -12, 22 -2 Z" fill="#fefce8" stroke="#FFCC00" strokeWidth="1.5" />
        <circle cx="-18" cy="12" r="5" fill="#FFCC00" />
        <circle cx="18" cy="12" r="5" fill="#FFCC00" />
      </g>
      
      {/* Camera icon */}
      <g transform="translate(200 55)" className="animate-[popIn_2s_ease-in-out_infinite]" style={{ animationDelay: "-0.3s" }}>
        <rect x="-10" y="-6" width="20" height="14" rx="2" fill="#1f1147" />
        <circle cx="0" cy="1" r="5" fill="#3b82f6" stroke="#1f1147" strokeWidth="1" />
        <circle cx="0" cy="1" r="2" fill="#ffffff" />
        <rect x="-4" y="-9" width="8" height="4" rx="1" fill="#1f1147" />
      </g>
      
      {/* Megaphone icon */}
      <g transform="translate(275 55)" className="animate-[popIn_2s_ease-in-out_infinite]" style={{ animationDelay: "-0.7s" }}>
        <path d="M -8 -4 L 6 -10 L 6 10 L -8 4 Z" fill="#FFCC00" stroke="#ca8a04" strokeWidth="1" />
        <rect x="-12" y="-4" width="5" height="8" rx="1" fill="#1f1147" />
        <g className="animate-[tapRing_1.5s_ease-in-out_infinite]">
          <path d="M 8 -6 Q 14 0, 8 6" fill="none" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="animate-[tapRing_1.5s_ease-in-out_infinite]" style={{ animationDelay: "-0.5s" }}>
          <path d="M 11 -9 Q 20 0, 11 9" fill="none" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />
        </g>
      </g>
      
      {/* Upward arrow with £+ */}
      <g transform="translate(237.5 55)" className="animate-[floatUp_2s_ease-in-out_infinite]">
        <path d="M 0 8 L 0 -5 M -4 -1 L 0 -6 L 4 -1" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      <text x="237.5" y="108" textAnchor="middle" fontSize="6" fill="#1f1147" fontWeight="500">We advertise, show &amp; sell</text>
      <text x="237.5" y="118" textAnchor="middle" fontSize="6" fill="#1f1147" fontWeight="500">your car for a higher price</text>
      
      <rect x="192" y="125" width="91" height="22" rx="11" fill="#FFCC00" />
      <text x="237.5" y="139" textAnchor="middle" fontSize="7" fontWeight="600" fill="#1f1147">Learn More</text>
    </g>
  </svg>
)

const Scene2 = () => (
  <svg viewBox="0 0 240 150" className="w-[92%] h-[90%]" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.22">
      <path d="M 12 130 L 12 100 L 16 100 L 16 90 L 22 78 L 28 90 L 28 100 L 36 100 L 36 130 Z" fill="#fef3c7" />
      <rect x="18" y="105" width="4" height="6" fill="#7c3aed" />
      <rect x="22" y="115" width="4" height="6" fill="#7c3aed" />
      <path d="M 200 130 L 200 95 L 220 95 L 220 78 L 226 78 L 226 65 L 232 56 L 238 65 L 238 78 L 246 78 L 246 130 Z" fill="#fef3c7" />
      <rect x="206" y="100" width="4" height="6" fill="#7c3aed" />
      <rect x="214" y="100" width="4" height="6" fill="#7c3aed" />
      <rect x="206" y="112" width="4" height="6" fill="#7c3aed" />
      <rect x="214" y="112" width="4" height="6" fill="#7c3aed" />
    </g>
    <g className="animate-[floatUp_3s_ease-in-out_infinite]">
      <rect x="62" y="32" width="116" height="92" rx="5" fill="#1f1147" />
      <rect x="64" y="34" width="112" height="88" rx="4" fill="#ffffff" />
      {[80, 100, 120, 140, 160].map(cx => (
        <circle key={cx} cx={cx} cy="32" r="2.5" fill="#fbbf24" stroke="#3b0764" strokeWidth="0.5" />
      ))}
      <rect x="64" y="34" width="112" height="14" rx="2" fill="#5b21b6" />
      <text x="120" y="44" textAnchor="middle" fontSize="6" fontWeight="500" fill="#ffffff">May 2026</text>
      <g fontSize="4" fontWeight="500" fill="#7c3aed" textAnchor="middle">
        <text x="76" y="56">M</text><text x="92" y="56">T</text><text x="108" y="56">W</text>
        <text x="124" y="56">T</text><text x="140" y="56">F</text><text x="156" y="56">S</text><text x="172" y="56">S</text>
      </g>
      <line x1="68" y1="60" x2="172" y2="60" stroke="#ede9fe" strokeWidth="0.5" />
      <g fontSize="4.5" fill="#1f1147" textAnchor="middle">
        <text x="76" y="70">5</text><text x="92" y="70">6</text><text x="108" y="70">7</text>
        <text x="124" y="70">8</text><text x="140" y="70">9</text><text x="156" y="70">10</text><text x="172" y="70">11</text>
        <text x="76" y="84">12</text><text x="92" y="84">13</text><text x="108" y="84">14</text>
        <text x="124" y="84">15</text><text x="140" y="84">16</text><text x="156" y="84">17</text><text x="172" y="84">18</text>
        <text x="76" y="98">19</text><text x="92" y="98">20</text>
        <text x="124" y="98">22</text><text x="140" y="98">23</text><text x="156" y="98">24</text><text x="172" y="98">25</text>
        <text x="76" y="112">26</text><text x="92" y="112">27</text><text x="108" y="112">28</text>
        <text x="124" y="112">29</text><text x="140" y="112">30</text><text x="156" y="112">31</text>
      </g>
      <circle cx="108" cy="96" r="7" fill="#5b21b6" />
      <text x="108" y="98.5" textAnchor="middle" fontSize="4.5" fontWeight="500" fill="#ffffff">21</text>
      <circle className="animate-[tapRing_2s_ease-in-out_infinite] origin-center" cx="108" cy="96" r="7" fill="none" stroke="#fbbf24" strokeWidth="1.2" />
      <circle className="animate-[tapRing_2s_ease-in-out_infinite] origin-center" cx="108" cy="96" r="7" fill="none" stroke="#fbbf24" strokeWidth="1.2" style={{ animationDelay: "0.6s" }} />
    </g>
    <g className="animate-[popIn_2.5s_ease-in-out_infinite] origin-center">
      <rect x="184" y="50" width="46" height="22" rx="3" fill="#ffffff" stroke="#5b21b6" strokeWidth="1" />
      <circle cx="190" cy="61" r="3" fill="#10b981" />
      <path d="M 188 61 L 189.5 62.5 L 192 59.5" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <text x="196" y="59" fontSize="3" fontWeight="500" fill="#1f1147">Wed 21 May</text>
      <text x="196" y="64" fontSize="2.5" fill="#7c3aed">2:30 PM, Stamford</text>
      <text x="196" y="69" fontSize="2.3" fill="#10b981">we come to you</text>
    </g>
    <g className="animate-[floatUp_3s_ease-in-out_-1.2s_infinite]" transform="translate(40 90)">
      <circle cx="0" cy="0" r="10" fill="#fbbf24" />
      <circle cx="0" cy="0" r="8" fill="none" stroke="#78350f" strokeWidth="0.5" />
      <line x1="0" y1="0" x2="0" y2="-5" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
      <line x1="0" y1="0" x2="4" y2="0" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
      <circle cx="0" cy="0" r="0.8" fill="#78350f" />
    </g>
  </svg>
)

const StaticWheel = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="18" fill="#1f1147" />
    <circle r="13" fill="#0a0518" />
    <rect x="-1.5" y="-12" width="3" height="24" rx="1" fill="#c4b5fd" />
    <rect x="-1.5" y="-12" width="3" height="24" rx="1" fill="#c4b5fd" transform="rotate(45)" />
    <rect x="-1.5" y="-12" width="3" height="24" rx="1" fill="#c4b5fd" transform="rotate(90)" />
    <rect x="-1.5" y="-12" width="3" height="24" rx="1" fill="#c4b5fd" transform="rotate(135)" />
    <circle r="3.5" fill="#fbbf24" stroke="#1f1147" strokeWidth="1.5" />
  </g>
)

const Scene3 = () => (
  <svg viewBox="0 0 320 180" className="w-[92%] h-[90%]" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="148" x2="300" y2="148" stroke="#ffffff" strokeWidth="1" opacity="0.4" strokeDasharray="4 6" />

    <g className="animate-[motionDash_1.2s_linear_infinite]"><line x1="30" y1="110" x2="55" y2="110" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" /></g>
    <g className="animate-[motionDash_1.2s_linear_infinite]" style={{ animationDelay: "-0.3s" }}><line x1="22" y1="125" x2="52" y2="125" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" /></g>
    <g className="animate-[motionDash_1.2s_linear_infinite]" style={{ animationDelay: "-0.6s" }}><line x1="32" y1="140" x2="58" y2="140" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" /></g>

    <g className="animate-[driveIn_4.5s_ease-in-out_infinite]">
      <rect x="80" y="105" width="160" height="35" rx="8" fill="#ffffff" stroke="#1f1147" strokeWidth="3" />
      <path d="M 110 105 Q 115 78, 140 78 L 195 78 Q 215 78, 220 105 Z" fill="#ffffff" stroke="#1f1147" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 118 102 Q 122 84, 142 84 L 162 84 L 162 102 Z" fill="#3b82f6" stroke="#1f1147" strokeWidth="2" />
      <path d="M 168 84 L 192 84 Q 210 84, 214 102 L 168 102 Z" fill="#3b82f6" stroke="#1f1147" strokeWidth="2" />
      <rect x="150" y="120" width="10" height="2.5" rx="1" fill="#1f1147" />
      <circle cx="232" cy="118" r="4" fill="#fbbf24" stroke="#1f1147" strokeWidth="2" />
      <rect x="84" y="115" width="6" height="6" rx="1.5" fill="#dc2626" stroke="#1f1147" strokeWidth="2" />
      <StaticWheel x={115} y={140} />
      <StaticWheel x={205} y={140} />
    </g>
  </svg>
)

const Scene4 = () => (
  <svg viewBox="0 0 240 150" className="w-[92%] h-[90%]" xmlns="http://www.w3.org/2000/svg">
    {/* Bank/Phone mockup in center */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]">
      <rect x="62" y="14" width="116" height="124" rx="11" fill="#1f1147" />
      <rect x="64" y="16" width="112" height="120" rx="9" fill="#f5f3ff" />
      <rect x="178" y="38" width="2" height="14" rx="1" fill="#3b0764" />
      <rect x="60" y="42" width="2" height="10" rx="1" fill="#3b0764" />
      <rect x="60" y="56" width="2" height="14" rx="1" fill="#3b0764" />
      <rect x="108" y="18" width="24" height="3.5" rx="1.5" fill="#1f1147" />
      <text x="70" y="30" fontSize="3.5" fill="#1f1147" fontWeight="500">9:41</text>
      <rect x="160" y="27" width="8" height="3" rx="0.5" fill="#1f1147" />
      <rect x="64" y="34" width="112" height="14" fill="#5b21b6" />
      <text x="120" y="43.5" textAnchor="middle" fontSize="4.5" fontWeight="500" fill="#ffffff">Your Bank</text>
      <text x="78" y="58" fontSize="3" fill="#7c3aed" fontWeight="500">CURRENT ACCOUNT</text>
      <text x="78" y="68" fontSize="3" fill="#7c3aed">Available balance</text>
      <text x="78" y="79" fontSize="9" fill="#1f1147" fontWeight="500">£12,450.00</text>
      <line x1="72" y1="85" x2="168" y2="85" stroke="#ede9fe" strokeWidth="0.6" />
      <g className="animate-[slideInDown_4s_ease-in-out_infinite]">
        <rect x="70" y="90" width="100" height="32" rx="4" fill="#10b981" />
        <rect x="70" y="90" width="100" height="32" rx="4" fill="none" stroke="#15803d" strokeWidth="0.4" />
        <circle cx="80" cy="100" r="5" fill="#ffffff" />
        <path d="M 78 99 L 80 102 L 84 95" stroke="#10b981" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="90" y="98" fontSize="3.5" fontWeight="500" fill="#ffffff">Payment received</text>
        <text x="90" y="103" fontSize="2.8" fill="#bbf7d0">From: Stamford Car Buyer</text>
        <text x="90" y="108" fontSize="5" fontWeight="500" fill="#ffffff">+ £8,450.00</text>
        <text x="90" y="115" fontSize="2.5" fill="#bbf7d0">Faster Payments • just now</text>
        <g className="animate-[lightning_1.5s_ease-in-out_infinite] origin-center" transform="translate(160 99)">
          <path d="M 0 -6 L -3 0 L -1 0 L -2 6 L 3 -1 L 1 -1 Z" fill="#fbbf24" stroke="#78350f" strokeWidth="0.4" />
        </g>
      </g>
      <rect x="72" y="126" width="44" height="6" rx="3" fill="#5b21b6" />
      <text x="94" y="130.2" textAnchor="middle" fontSize="3" fontWeight="500" fill="#ffffff">View transaction</text>
      <rect x="120" y="126" width="44" height="6" rx="3" fill="#ffffff" stroke="#5b21b6" strokeWidth="0.5" />
      <text x="142" y="130.2" textAnchor="middle" fontSize="3" fontWeight="500" fill="#5b21b6">Done</text>
    </g>
    
    {/* Left side - Cash Offer badge */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" style={{ animationDelay: "-0.3s" }}>
      <rect x="6" y="50" width="50" height="50" rx="6" fill="#10b981" />
      <text x="31" y="68" textAnchor="middle" fontSize="4" fontWeight="600" fill="#ffffff">CASH</text>
      <text x="31" y="76" textAnchor="middle" fontSize="4" fontWeight="600" fill="#ffffff">OFFER</text>
      <g className="animate-[lightning_1.5s_ease-in-out_infinite] origin-center" transform="translate(31 90)">
        <path d="M 0 -5 L -3 0 L -1 0 L -2 5 L 3 -1 L 1 -1 Z" fill="#ffffff" stroke="#15803d" strokeWidth="0.3" />
      </g>
      <text x="31" y="106" textAnchor="middle" fontSize="3.5" fontWeight="500" fill="#ffffff">Instant</text>
    </g>
    
    {/* Right side - Sell It For Me badge */}
    <g className="animate-[floatUp_3s_ease-in-out_infinite]" style={{ animationDelay: "-0.6s" }}>
      <rect x="184" y="50" width="50" height="50" rx="6" fill="#FFCC00" />
      <text x="209" y="65" textAnchor="middle" fontSize="4" fontWeight="600" fill="#1f1147">SELL IT</text>
      <text x="209" y="73" textAnchor="middle" fontSize="4" fontWeight="600" fill="#1f1147">FOR ME</text>
      <text x="209" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1f1147">7</text>
      <text x="209" y="106" textAnchor="middle" fontSize="3.5" fontWeight="500" fill="#1f1147">Days</text>
    </g>
    
    {/* Arrows pointing to phone */}
    <g className="animate-[arrowFlow_2s_ease-in-out_infinite]" transform="translate(48 75)">
      <line x1="0" y1="0" x2="12" y2="0" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      <path d="M 9 -3 L 14 0 L 9 3" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g className="animate-[arrowFlow_2s_ease-in-out_infinite]" transform="translate(172 75)" style={{ animationDelay: "-0.6s" }}>
      <line x1="12" y1="0" x2="0" y2="0" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" />
      <path d="M 3 -3 L -2 0 L 3 3" stroke="#FFCC00" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    
    {/* OR text at top */}
    <g className="animate-[popIn_2.5s_ease-in-out_infinite] origin-center">
      <circle cx="120" cy="8" r="8" fill="#5b21b6" />
      <text x="120" y="11" textAnchor="middle" fontSize="5" fontWeight="600" fill="#ffffff">OR</text>
    </g>
  </svg>
)

const StamfordSkyline = () => (
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
        @keyframes driveIn { 0% { transform: translateX(-120px); opacity: 0; } 18%, 100% { transform: translateX(0); opacity: 1; } }
        @keyframes motionDash { 0% { transform: translateX(15px); opacity: 0; } 30% { opacity: 0.8; } 100% { transform: translateX(-25px); opacity: 0; } }
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

        <StamfordSkyline />

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
