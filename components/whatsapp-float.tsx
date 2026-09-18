"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X } from "lucide-react"

const DISMISSED_KEY = "whatsapp-message-dismissed"

export function WhatsAppFloat() {
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    try {
      setShowMessage(sessionStorage.getItem(DISMISSED_KEY) !== "true")
    } catch {
      // The close button still works when browser storage is unavailable.
    }
  }, [])

  function dismissMessage() {
    setShowMessage(false)
    try {
      sessionStorage.setItem(DISMISSED_KEY, "true")
    } catch {
      // Keep the message dismissed for the current page.
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 h-14 w-14">
      <a
        href="https://wa.me/441992367909"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full w-full items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA55] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" aria-hidden="true" />
      </a>
      {showMessage && (
        <div className="absolute right-full top-1/2 mr-3 w-max max-w-[calc(100vw-7rem)] -translate-y-[66%] px-7 py-6 text-center text-sm leading-snug text-gray-900 drop-shadow-lg">
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
          <a
            href="https://wa.me/441992367909"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            aria-label="Any questions? Send us a WhatsApp!"
          >
            <span className="block font-semibold">Any questions?</span>
            <span className="block">Send us a WhatsApp!</span>
          </a>
          <button
            type="button"
            onClick={dismissMessage}
            aria-label="Dismiss WhatsApp message"
            className="absolute -top-2 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
