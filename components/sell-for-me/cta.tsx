"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Phone } from "lucide-react"

export function SellForMeCta() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground">
            Get in touch and we&apos;ll take it from here. No pressure, no obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg bg-[#25D366] hover:bg-[#1da851] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <a href="https://wa.me/441205212339" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-2 hover:bg-muted/50 transition-all duration-300"
            >
              <a href="tel:01205212339">
                <Phone className="mr-2 h-5 w-5" />
                01205 212339
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Speak to Henry directly. Real person, real local service.
          </p>
        </div>
      </div>
    </section>
  )
}
