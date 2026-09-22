"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: "/vehicle-inspections", label: "Vehicle Inspections" },
    { href: "/vehicle-inspections/what-we-inspect", label: "What We Inspect" },
    { href: "/ev-battery-health-check", label: "EV Battery Health" },
    { href: "/vehicle-inspections/sample-report", label: "Sample Report" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-bold text-primary transition-opacity group-hover:opacity-90">Epping Car Buyer</span>
              <span className="block text-xs font-semibold text-muted-foreground">Independent Vehicle Inspections</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm" className="font-semibold">
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/vehicle-inspections#book" className="ml-2">
              <Button size="lg" className="font-bold shadow-sm">
                Book Inspection
              </Button>
            </Link>
          </nav>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mt-4 space-y-2 border-t pt-4 lg:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block">
                <Button variant="outline" className="w-full justify-start font-semibold" size="lg">
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/vehicle-inspections#book" onClick={() => setIsMenuOpen(false)} className="block">
              <Button className="w-full font-bold" size="lg">
                Book Inspection
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
