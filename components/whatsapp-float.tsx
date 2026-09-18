"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/441992367909"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA55] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-700 focus-visible:ring-offset-2"
      aria-label="Any questions? Send us a WhatsApp!"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
      <span className="absolute right-full mr-3 w-max max-w-[calc(100vw-7rem)] px-7 py-6 text-center text-sm leading-snug text-gray-900 drop-shadow-lg">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 220 100"
          preserveAspectRatio="none"
        >
          <path
            d="M22 74C2 73-3 43 17 34C8 13 40 2 59 15C73-1 107-1 121 13C143 1 172 8 177 24C200 18 218 38 204 56L218 66L199 69C197 91 167 99 149 87C132 101 106 97 94 89C74 103 47 96 39 84C28 88 18 82 22 74Z"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        </svg>
        <span className="relative block font-semibold">Any questions?</span>
        <span className="relative block">Send us a WhatsApp!</span>
      </span>
    </a>
  )
}
