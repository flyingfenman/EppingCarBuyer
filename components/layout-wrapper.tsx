"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

// The admin and dealer areas keep their own look: the away notice is for customers only.
const NO_NOTICE_PATHS = ["/admin", "/dealer"]

// notice is the line shown under the header while Henry is away (components/away-notice.tsx), or nothing.
export function LayoutWrapper({ children, notice }: { children: React.ReactNode; notice?: React.ReactNode }) {
  const pathname = usePathname()
  const showNotice = !NO_NOTICE_PATHS.some((path) => pathname.startsWith(path))

  return (
    <>
      <Header />
      {showNotice && notice}
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
