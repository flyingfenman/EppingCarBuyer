"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "How much does a car inspection cost?",
    answer:
      "There are two options: the Standard Inspection at £149.99 (a 90-point check) and the Premium Inspection at £199.99 (a 140-point check). For compatible fully electric vehicles, an EV Battery State of Health Report can be added to either inspection for £49.99.",
  },
  {
    question: "Is it worth paying for an inspection before buying a used car?",
    answer:
      "Yes. You get an outstanding finance, write-off, stolen and mileage history check, a full OBD diagnostic scan, a road test and a detailed condition report — the checks that can uncover expensive problems before you hand over any money.",
  },
  {
    question: "Do you check the high-voltage battery on electric cars?",
    answer:
      "Yes. On compatible fully electric vehicles, you can add an EV Battery State of Health (SOH) Report for £49.99. We use the Autel Blitz Battery Health Check, which carries the Battery Health Check CARA Approved® certification mark, and provide the customer battery health report alongside your inspection.",
  },
  {
    question: "What does EV battery State of Health mean?",
    answer:
      "State of Health (SOH) is a percentage used to describe the condition of an EV's high-voltage traction battery. The Autel Blitz Test obtains and evaluates battery-management information available from the vehicle to produce the SOH result. Vehicle compatibility and the exact data available vary by model.",
  },
  {
    question: "Is the EV battery test an independent capacity test?",
    answer:
      "No. The Autel Blitz Test is a diagnostic SOH assessment based on data available from the vehicle and its battery management system. It is not a full independent charge-and-discharge capacity test.",
  },
  {
    question: "Where do inspections take place?",
    answer:
      "Wherever the car is. Based in Waltham Abbey, the inspector travels to the vehicle — a dealer forecourt, a private seller's address, or your own home — covering Essex, Hertfordshire, Cambridgeshire, Greater London, and parts of Bedfordshire and Suffolk.",
  },
  {
    question: "How do I book, and how do I get in touch?",
    answer:
      "Book online and pick a time slot, or message us on WhatsApp — it's the fastest way to reach Epping Car Buyer. If you want an EV battery report, select the £49.99 SOH add-on when booking.",
  },
  {
    question: "How long does it take and when do I get the report?",
    answer:
      "Allow around 40–60 minutes on site for a Standard Inspection and 70–90 minutes for Premium. You'll get a digital inspection report the same day, plus a personal phone call to talk through the findings. EV customers who select the SOH add-on also receive the battery health report.",
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
