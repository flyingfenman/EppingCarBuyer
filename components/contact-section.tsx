"use client"

import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background px-4 py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="mb-8 space-y-3 text-center sm:mb-12">
          <h2 className="text-4xl font-bold sm:text-5xl">Have a car you&apos;re thinking of buying?</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Send us the advert or registration on WhatsApp. We can confirm the right inspection, EV compatibility and availability before you book.
          </p>
        </div>

        <div className="mx-auto max-w-sm">
          <Card
            className={`border-2 transition-all duration-300 hover:-translate-y-1 ${
              hoveredCard === "whatsapp" ? "border-[#25D366]/50 shadow-2xl" : "shadow-lg"
            }`}
            onMouseEnter={() => setHoveredCard("whatsapp")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/10">
                <MessageSquare className="h-10 w-10 text-[#25D366]" />
              </div>
              <CardTitle className="text-2xl">Ask us on WhatsApp</CardTitle>
              <CardDescription className="text-base">
                Send the vehicle advert, registration or any questions about the inspection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="h-14 w-full bg-[#25D366] text-lg shadow-lg transition hover:bg-[#1da851]"
                size="lg"
              >
                <a href="https://wa.me/441992367909" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Message on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
