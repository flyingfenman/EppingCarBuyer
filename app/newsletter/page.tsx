import { Metadata } from "next"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { newsletterReady } from "@/lib/newsletter"

const title = "Newsletter | Epping Car Buyer"
const description = "A short email from Henry at Epping Car Buyer each Friday about buying and selling used cars."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/newsletter" },
  openGraph: { title, description },
}

const MESSAGES: Record<string, { heading: string; body: string }> = {
  confirmed: { heading: "You're on the list", body: "Thanks for confirming. The newsletter comes out on Fridays." },
  expired: {
    heading: "That link has expired",
    body: "Confirmation links last a week. Pop your email in below and we'll send a fresh one.",
  },
  error: { heading: "Something went wrong", body: "Sorry, we couldn't finish that. Please try again below." },
}

export default async function NewsletterPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams
  const message = newsletterReady()
    ? status ? MESSAGES[status] : undefined
    : { heading: "The Friday newsletter", body: "Signups open soon. Check back shortly." }

  return (
    <div className="container mx-auto px-4 py-10 sm:py-14">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">{message?.heading ?? "The Friday newsletter"}</h1>
        <p className="mt-4 text-lg text-foreground">
          {message?.body ?? "A short email from Henry each Friday about buying and selling used cars. Free, and easy to leave."}
        </p>
        {newsletterReady() && status !== "confirmed" && (
          <div className="mt-8 w-full">
            <NewsletterSignup source="newsletter-page" />
          </div>
        )}
      </div>
    </div>
  )
}
