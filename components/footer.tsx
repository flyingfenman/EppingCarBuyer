import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/quote" className="text-sm hover:underline">
              Get a Quote
            </Link>
            <Link href="/sell-for-me" className="text-sm hover:underline">
              Sell It For Me
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
            <Link href="/admin/login" className="text-sm hover:underline text-muted-foreground">
              Admin
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            Stamford Car Buyer offers the best prices for your vehicle with a hassle-free process.
          </p>
          <p className="text-sm text-muted-foreground">© 2025 Stamford Car Buyer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
