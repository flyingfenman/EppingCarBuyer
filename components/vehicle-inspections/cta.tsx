"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, CalendarDays } from "lucide-react"
import { InspectionsBookingCalendar } from "./booking-calendar"

type Tab = "contact" | "calendar"

export function InspectionsCta() {
  const [tab, setTab] = useState<Tab>("calendar")

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl lg:text-5xl font-bold">Book an Inspection</h2>
            <p className="text-xl text-muted-foreground">
              Pick a time that works for you and pay securely online.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl border border-border overflow-hidden mb-8 bg-background max-w-lg mx-auto">
            <button
              onClick={() => setTab("calendar")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                tab === "calendar"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <CalendarDays className="inline w-4 h-4 mr-2 mb-0.5" />
              Book Online
            </button>
            <button
              onClick={() => setTab("contact")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                tab === "contact"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <Phone className="inline w-4 h-4 mr-2 mb-0.5" />
              Call or WhatsApp
            </button>
          </div>

          {/* Contact tab */}
          {tab === "contact" && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg bg-[#25D366] hover:bg-[#1da851] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <a href="https://wa.me/441992367909" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg border-2 hover:bg-muted/50 transition-all duration-300"
              >
                <a href="tel:+441992367909">
                  <Phone className="mr-2 h-5 w-5" />
                  01992 367909
                </a>
              </Button>
            </div>
          )}

          {/* Calendar tab */}
          {tab === "calendar" && <InspectionsBookingCalendar />}

          <p className="text-sm text-muted-foreground text-center mt-6">
            Speak to Henry directly. Real person, real local service.
          </p>
        </div>
      </div>
    </section>
  )
}
