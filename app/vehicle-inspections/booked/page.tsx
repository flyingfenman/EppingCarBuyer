import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InspectionBookedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">You&apos;re booked in!</h1>
        <p className="text-muted-foreground">
          Payment received and your inspection is confirmed. You&apos;ll get a confirmation call or message shortly
          to finalise the details.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </div>
  )
}
