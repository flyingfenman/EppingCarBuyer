"use client"

import { useState } from "react"
import { Loader2, ShoppingCart } from "lucide-react"

export function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleBuy = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/create-product-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl transition-colors shadow-lg disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Redirecting to payment...
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </>
        )}
      </button>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
      <p className="text-xs text-center text-muted-foreground">
        You&apos;ll pay securely via Stripe, then enter your delivery address.
      </p>
    </div>
  )
}
