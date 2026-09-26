"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
            Epping Car Buyer
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-base font-semibold bg-[#0d9488] text-white hover:bg-[#0b7a70] border-2 border-[#0b7a70] shadow-md"
            >
              <Link href="/vehicle-inspections">Vehicle Inspections</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-base font-semibold bg-[#FFCC00] text-black hover:bg-[#E6B800] border-2 border-[#E6B800] shadow-md"
            >
              <Link href="/market-and-sell">Market &amp; Sell</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base bg-[#6711a4] text-white hover:bg-[#6711a4]/90 border-[#6711a4]"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4 pb-4 space-y-2">
            <Button asChild className="flex h-12 w-full font-semibold bg-[#0d9488] text-white hover:bg-[#0b7a70]" size="lg">
              <Link href="/vehicle-inspections" onClick={() => setIsMenuOpen(false)}>
                Vehicle Inspections
              </Link>
            </Button>
            <Button asChild className="flex h-12 w-full font-semibold bg-[#FFCC00] text-black hover:bg-[#E6B800]" size="lg">
              <Link href="/market-and-sell" onClick={() => setIsMenuOpen(false)}>
                Market &amp; Sell
              </Link>
            </Button>
            <Button asChild className="flex h-12 w-full bg-[#6711a4] text-white hover:bg-[#6711a4]/90" size="lg">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
