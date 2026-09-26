import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 px-4 pt-8 pb-24 sm:pb-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <nav className="flex flex-wrap justify-center gap-x-6">
            <Link href="/market-and-sell" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Market &amp; Sell
            </Link>
            <Link href="/vehicle-inspections" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Vehicle Inspections
            </Link>
            <Link href="/inspection-notes" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Inspection Notes
            </Link>
            <Link href="/ev-battery-health-check" className="inline-flex min-h-11 items-center text-sm hover:underline">
              EV Battery Health Check
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="inline-flex min-h-11 items-center text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="inline-flex min-h-11 items-center text-sm hover:underline text-muted-foreground">
              Admin
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            Independent vehicle buying, selling and pre-purchase inspection services across Essex and surrounding areas.
          </p>
          <p className="text-sm text-muted-foreground">© 2026 Epping Car Buyer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
