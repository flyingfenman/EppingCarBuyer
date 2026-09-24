import { Metadata } from "next"
import { CalendarDays, Clock, Mail, MapPin, MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

const title = "Contact Us — Epping Car Buyer"
const description =
  "Send us a message, WhatsApp or email us about a car inspection or selling your car. Covering Essex, Hertfordshire, South Cambridgeshire, Greater London and more."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/inspection-car.jpg"],
  },
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground sm:text-xl">
            A question about an inspection, or selling your car? Send us a message below, or WhatsApp or email if you
            prefer.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[3fr_2fr]">
          <ContactForm />

          <aside className="space-y-4" aria-label="Other ways to contact us">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Prefer to message directly?</h2>
              <div className="mt-4 space-y-3">
                <a
                  href="https://wa.me/441992367909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-lg font-bold text-white transition hover:bg-[#1da851]"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp us
                </a>
                <a
                  href="mailto:henry@eppingcarbuyer.com"
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-white px-5 text-lg font-bold text-primary transition hover:bg-primary/5"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" /> Email Henry
                </a>
                <p className="text-center text-base text-muted-foreground">henry@eppingcarbuyer.com</p>
              </div>
            </div>

            <ul className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-sm">
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-bold">Quick replies</p>
                  <p className="text-base text-muted-foreground">Usually within 1 hour during business hours</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CalendarDays className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-bold">Opening hours</p>
                  <p className="text-base text-muted-foreground">Monday to Saturday, 9am to 6pm</p>
                  <p className="text-base text-muted-foreground">Sunday by appointment</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-bold">Where we cover</p>
                  <p className="text-base text-muted-foreground">
                    Essex, Hertfordshire, South Cambridgeshire, Greater London, and parts of Bedfordshire and Suffolk
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}
