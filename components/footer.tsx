import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 px-4 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/vehicle-inspections" className="text-sm font-semibold hover:underline">
              Vehicle Inspections
            </Link>
            <Link href="/vehicle-inspections/what-we-inspect" className="text-sm hover:underline">
              What We Inspect
            </Link>
            <Link href="/vehicle-inspections/sample-report" className="text-sm hover:underline">
              Sample Report
            </Link>
            <Link href="/ev-battery-health-check" className="text-sm hover:underline">
              EV Battery Health Check
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </nav>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Independent pre-purchase vehicle inspections across London, Essex, Hertfordshire and surrounding areas, including EV and hybrid diagnostic checks.
          </p>
          <p className="text-sm text-muted-foreground">© 2026 Epping Car Buyer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
