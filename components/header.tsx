"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
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
            <Link href="/sell-for-me">
              <Button
                size="lg"
                className="text-base font-semibold bg-[#FFCC00] text-black hover:bg-[#E6B800] border-2 border-[#E6B800] shadow-md"
              >
                Sell It For Me
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
            <a href="tel:01205212339">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/sell-for-me" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-start font-semibold bg-[#FFCC00] text-black hover:bg-[#E6B800]" size="lg">
                Sell It For Me
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#6711a4] hover:bg-[#6711a4]/90" size="lg">
                Contact Us
              </Button>
            </Link>
            <a href="tel:01205212339">
              <Button className="w-full" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
