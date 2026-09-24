import { MessageSquare } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export function ContactSection() {
  return (
    <section id="contact" className="bg-gradient-to-b from-muted/30 to-background px-4 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto">
        <div className="mb-8 space-y-3 text-center sm:mb-12 sm:space-y-4">
          <h2 className="text-4xl font-bold sm:text-5xl">Get In Touch</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Questions about a car inspection or Market &amp; Sell? Send us a message or a WhatsApp.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[3fr_2fr]">
          <ContactForm headingLevel="h3" />

          <div className="rounded-3xl border-2 border-[#25D366]/30 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/10">
              <MessageSquare className="h-10 w-10 text-[#25D366]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-2xl font-bold">Prefer WhatsApp?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Send us photos and details of the vehicle for a quick response.
            </p>
            <a
              href="https://wa.me/441992367909"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-lg font-bold text-white shadow-lg transition hover:bg-[#1da851]"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
