"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

// Pages that should NOT have the standard header/footer
const MINIMAL_LAYOUT_PATHS = ["/quote"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const isMinimalLayout = MINIMAL_LAYOUT_PATHS.some(path => pathname.startsWith(path))

  if (isMinimalLayout) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
