import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fredoka } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"
import Script from "next/script"
import { SiteTracking } from "@/components/tracking/site-tracking"
import { CookieConsentPrompt } from "@/components/tracking/cookie-consent-prompt"

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
      </head>
      <body className={fredoka.className}>
        <SiteTracking />
        <CookieConsentPrompt />
        {/* Cloudflare Zaraz runs the analytics/ads tags and the cookie banner. Cloudflare cannot auto-inject it into pages a
            Worker generates, so it is loaded here. It loads after hydration on purpose: as a blocking tag in <head> it
            changed the page before React hydrated, which caused hydration error #418 and a full client re-render. */}
        <Script src="/cdn-cgi/zaraz/i.js" strategy="afterInteractive" referrerPolicy="origin" />
        {/* Cloudflare Web Analytics: free, cookie-less real-visitor speed (Core Web Vitals) and traffic data. Cloudflare cannot
            auto-inject it into Worker-generated pages, so it is added here. Token is public by design. */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="lazyOnload"
          data-cf-beacon='{"token": "495a6b145e1c4de78d8fbc2371f52080"}'
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
