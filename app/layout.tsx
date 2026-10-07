import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fredoka } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"
import { SiteTracking } from "@/components/tracking/site-tracking"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

// Number-plate font, cut down to the basic Latin characters a registration can contain.
// Not preloaded: only the registration boxes use it, so other pages never download it.
const charlesWright = localFont({
  src: "../public/fonts/charles-wright.woff2",
  variable: "--font-charles-wright",
  preload: false,
})

export const metadata: Metadata = {
  title: "Epping Car Buyer | Independent Vehicle Inspections",
  description:
    "Independent pre-purchase vehicle inspections across London, Essex, Hertfordshire and surrounding areas, with diagnostics, road testing, video evidence and EV and hybrid checks.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.app',
  metadataBase: new URL("https://www.eppingcarbuyer.com"),
  openGraph: {
    type: "website",
    siteName: "Epping Car Buyer",
    title: "Epping Car Buyer | Independent Vehicle Inspections",
    description:
      "Independent pre-purchase vehicle inspections across London, Essex, Hertfordshire and surrounding areas, with diagnostics, road testing, video evidence and EV and hybrid checks.",
    images: ["/images/inspection-car.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Epping Car Buyer | Independent Vehicle Inspections",
    description:
      "Independent pre-purchase vehicle inspections across London, Essex, Hertfordshire and surrounding areas, with diagnostics, road testing, video evidence and EV and hybrid checks.",
    images: ["/images/inspection-car.jpg"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={charlesWright.variable}>
      <head>
        <LocalBusinessSchema />
        {/* Cloudflare Zaraz runs the analytics/ads tags and the cookie banner. Cloudflare cannot auto-inject it into pages
            a Worker generates, so it is loaded here, as Cloudflare documents. Left blocking on purpose so the zaraz
            object exists before the booking conversion fires. It is a few KB from our own domain. */}
        <script src="/cdn-cgi/zaraz/i.js" referrerPolicy="origin" />
      </head>
      <body className={fredoka.className}>
        <SiteTracking />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
