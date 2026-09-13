"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "How much does a car inspection cost?",
    answer:
      "There are two options: the Standard Inspection at £130 (a 90-point check) and the Premium Inspection at £180 (a 140-point check). Both are one flat fee — no hidden extras.",
  },
  {
    question: "Is it worth paying for an inspection before buying a used car?",
    answer:
      "Yes. You get an outstanding finance, write-off, stolen and mileage history check, a full OBD diagnostic scan, and a road test — the exact things that catch a bad purchase before you hand over any money. It's cheap insurance against buying someone else's problem.",
  },
  {
    question: "Do you check the battery on electric or hybrid cars?",
    answer:
      "Yes. The Premium Inspection includes an EV & hybrid battery health check, where applicable.",
  },
  {
    question: "Where do inspections take place?",
    answer:
      "Wherever the car is. Based in Waltham Abbey, the inspector travels to you — a dealer forecourt, a private seller's address, or your own home — covering Essex, Hertfordshire, Cambridgeshire, Greater London, and parts of Bedfordshire and Suffolk.",
  },
  {
    question: "How do I book, and how do I get in touch?",
    answer:
      "Book online and pick a time slot, or message us on WhatsApp — it's the fastest way to reach Epping Car Buyer.",
  },
  {
    question: "How long does it take and when do I get the report?",
    answer:
      "40–60 minutes on site for a Standard Inspection, 70–90 minutes for Premium. You'll get a digital report the same day, plus a personal phone call talking through what we found.",
  },
]

export function InspectionsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        suppressHydrationWarning
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick answers to the questions we get asked most
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <Card key={faq.question} className="rounded-2xl border shadow-sm py-0 gap-0 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
