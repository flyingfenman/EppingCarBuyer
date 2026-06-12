"use client"

import { Phone, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-bold">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to sell? Contact us today for a free, no-obligation valuation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Phone Contact */}
          <Card
            className={`transition-all duration-500 hover:-translate-y-2 border-2 ${
              hoveredCard === "phone" ? "shadow-2xl border-primary/50" : "shadow-lg"
            }`}
            onMouseEnter={() => setHoveredCard("phone")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="text-center space-y-4">
              <div
                className={`mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === "phone" ? "scale-110 bg-primary/20" : "scale-100"
                }`}
              >
                <Phone className={`h-10 w-10 text-primary ${hoveredCard === "phone" ? "animate-pulse" : ""}`} />
              </div>
              <CardTitle className="text-2xl">Call Us</CardTitle>
              <CardDescription className="text-base">
                Speak directly with Henry for an immediate response and quick valuation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="default"
                className="w-full h-14 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                size="lg"
              >
                <a href="tel:01205212339">
                  <Phone className="mr-2 h-5 w-5" />
                  01205 212339
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card
            className={`transition-all duration-500 hover:-translate-y-2 border-2 ${
              hoveredCard === "whatsapp" ? "shadow-2xl border-[#25D366]/50" : "shadow-lg"
            }`}
            onMouseEnter={() => setHoveredCard("whatsapp")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="text-center space-y-4">
              <div
                className={`mx-auto w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === "whatsapp" ? "scale-110 bg-[#25D366]/20" : "scale-100"
                }`}
              >
                <MessageSquare
                  className={`h-10 w-10 text-[#25D366] ${hoveredCard === "whatsapp" ? "animate-pulse" : ""}`}
                />
              </div>
              <CardTitle className="text-2xl">WhatsApp</CardTitle>
              <CardDescription className="text-base">
                Send us photos and details of your vehicle for a quick response.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="default"
                className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#1da851] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                size="lg"
              >
                <a href="https://wa.me/441205212339" target="_blank" rel="noopener noreferrer">
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
