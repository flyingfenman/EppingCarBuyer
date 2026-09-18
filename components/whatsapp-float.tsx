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
      <span className="absolute right-full mr-3 w-max max-w-[calc(100vw-7rem)] rounded-xl bg-gray-900 px-4 py-3 text-left text-sm leading-snug text-white shadow-lg">
        <span className="block font-semibold">Any questions?</span>
        <span className="block">Send us a WhatsApp!</span>
        <span aria-hidden="true" className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900" />
      </span>
    </a>
  )
}
