"use client"

import { useEffect, useState } from "react"

let cached: Promise<boolean> | null = null

// True once the server says the newsletter can take signups. Fetched once per page load.
export function useNewsletterReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    cached ??= fetch("/api/newsletter/status")
      .then((res) => (res.ok ? res.json() : { ready: false }))
      .then((data) => data.ready === true)
      .catch(() => false)
    let live = true
    cached.then((value) => live && setReady(value))
    return () => {
      live = false
    }
  }, [])
  return ready
}
