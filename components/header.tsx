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
            <Link href="/cars-for-sale">
              <Button
                size="lg"
                className="text-base font-semibold bg-[#2563eb] text-white hover:bg-[#1d4ed8] border-2 border-[#1d4ed8] shadow-md"
              >
                Cars For Sale
              </Button>
            </Link>
            <Link href="/market-and-sell">
              <Button
                size="lg"
                className="text-base font-semibold bg-[#FFCC00] text-black hover:bg-[#E6B800] border-2 border-[#E6B800] shadow-md"
              >
                Market &amp; Sell
              </Button>
            </Link>
            <Link href="/vehicle-inspections">
              <Button
                size="lg"
                className="text-base font-semibold bg-[#0d9488] text-white hover:bg-[#0b7a70] border-2 border-[#0b7a70] shadow-md"
              >
                Inspections
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-base bg-[#6711a4] text-white hover:bg-[#6711a4]/90 border-[#6711a4]"
              >
                Contact Us
              </Button>
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/cars-for-sale" onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="w-full font-semibold bg-[#2563eb] text-white hover:bg-[#1d4ed8]" size="lg">
                Cars For Sale
              </Button>
            </Link>
            <Link href="/market-and-sell" onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="w-full font-semibold bg-[#FFCC00] text-black hover:bg-[#E6B800]" size="lg">
                Market &amp; Sell
              </Button>
            </Link>
            <Link href="/vehicle-inspections" onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="w-full font-semibold bg-[#0d9488] text-white hover:bg-[#0b7a70]" size="lg">
                Inspections
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="w-full bg-[#6711a4] text-white hover:bg-[#6711a4]/90" size="lg">
                Contact Us
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
