import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fredoka } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const charlesWright = localFont({
  src: "../public/fonts/charles-wright.ttf",
  variable: "--font-charles-wright",
})

export const metadata: Metadata = {
  title: "Epping Car Buyer - We Pay More",
  description:
    "Sell your car quickly and easily in Epping. Get instant quotes and fast cash for your vehicle in any condition.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.app',
  metadataBase: new URL("https://www.eppingcarbuyer.com"),
  openGraph: {
    type: "website",
    siteName: "Epping Car Buyer",
    title: "Epping Car Buyer - We Pay More",
    description:
      "Sell your car quickly and easily in Epping. Get instant quotes and fast cash for your vehicle in any condition.",
    images: ["/images/inspection-car.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Epping Car Buyer - We Pay More",
    description:
      "Sell your car quickly and easily in Epping. Get instant quotes and fast cash for your vehicle in any condition.",
    images: ["/images/inspection-car.jpg"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const GA_TRACKING_ID = "G-0VZ6KTHLBW"
const META_PIXEL_ID = "805110688694115"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={charlesWright.variable}>
      <head>
        <LocalBusinessSchema />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className={fredoka.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
