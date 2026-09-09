import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Order received!</h1>
        <p className="text-muted-foreground">
          Payment received and your order is confirmed. We&apos;ll get it dispatched and send you tracking details
          once it&apos;s on its way.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  )
}
