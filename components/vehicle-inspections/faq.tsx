"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "What is included in the mechanical report?",
    answer:
      "Both packages include an in-depth mechanical and condition report covering relevant engine and cooling checks, gearbox and drivetrain operation, brakes, steering, suspension, tyres, full-system diagnostic findings and road-test behaviour. We explain issues observed, what needs attention and any checks we could not complete. Photos, a clear video review and a personal call help you understand the findings and make your purchase decision. Checks are adapted to the vehicle and accessible components.",
  },
  {
    question: "Are seller identity and document checks included in Standard?",
    answer:
      "Yes. Seller identity and document checks are included in both Standard and Premium, subject to the seller’s cooperation and documents being available. Premium adds the deeper condition assessment, extended road test, available auction and previous advert searches, and checks for indicators of undisclosed motor trading.",
  },
  {
    question: "Do both packages include a video review and buying advice?",
    answer:
      "Yes. Standard and Premium both include an easy-to-understand video review of the vehicle, photos of key findings, a same-day digital report and a personal phone call. We explain the positives, concerns and what needs attention, helping you decide whether to proceed, request repairs or discuss the price with the seller.",
  },
  {
    question: "How can the inspection evidence help me after buying?",
    answer:
      "Your video, photographs and written findings provide a record of the issues observed during the inspection. Keep them for reference: they can help you explain a later concern to the seller or a repairer and compare it with what was recorded before purchase. The record covers what was observed at the time of inspection.",
  },
  {
    question: "What does Premium add to the Standard inspection?",
    answer:
      "Premium includes everything in Standard, including the video review and personal buying guidance, plus a deeper 140-point assessment and an extended road test where safe and permitted. We also search available auction, salvage and previous advert records, including Copart where available, and look for indicators of undisclosed motor trading. Seller identity and document checks are included in both packages, with the seller’s cooperation. We report the evidence found and any limitations; no matching record does not establish that a vehicle has never been auctioned.",
  },
  {
    question: "How much does a car inspection cost?",
    answer:
      "There are two options: the Standard Inspection at £149.99 (a 90-point check) and the Premium Inspection at £199.99 (a 140-point check). Both are adapted to the vehicle's powertrain, whether petrol, diesel, hybrid or electric. For compatible fully electric vehicles, an EV Battery State of Health Report can be added to either inspection for £49.99.",
  },
  {
    question: "Is it worth paying for an inspection before buying a used car?",
    answer:
      "Yes. You get an outstanding finance, write-off, stolen and mileage history check, a full diagnostic scan, a road test and a detailed condition report — plus powertrain-specific checks appropriate to the vehicle. The aim is to uncover expensive problems before you hand over any money.",
  },
  {
    question: "Do you properly inspect electric cars, or is the EV check only an add-on?",
    answer:
      "Electric cars receive a proper EV-focused pre-purchase inspection as standard. Alongside tyres, brakes, suspension, steering, bodywork, interior, road test and history checks, we assess relevant EV systems such as high-voltage and battery-management faults, charging-system faults, drive-motor or inverter faults, regenerative braking, battery thermal management and visible battery-pack or underbody damage where the vehicle supports those checks. The £49.99 State of Health add-on is a separate, deeper battery-health report — it is not the point where the EV inspection starts.",
  },
  {
    question: "Do you check the high-voltage battery on electric cars?",
    answer:
      "Yes. Relevant high-voltage and battery-management diagnostic checks are part of the core EV inspection where supported. For compatible fully electric vehicles, you can also add an EV Battery State of Health (SOH) Report for £49.99 using the CARA Approved® Autel EV Battery Health Test, with the customer battery-health report supplied alongside your inspection.",
  },
  {
    question: "What does EV battery State of Health mean?",
    answer:
      "State of Health (SOH) is a percentage used to describe the condition of an EV's high-voltage traction battery. The Autel EV Battery Health Test obtains and evaluates battery-management information available from the vehicle to produce the SOH result. Vehicle compatibility and the exact data available vary by model.",
  },
  {
    question: "Is the EV battery test an independent capacity test?",
    answer:
      "No. The Autel EV Battery Health Test is a diagnostic SOH assessment based on data available from the vehicle and its battery management system. It is not a full independent charge-and-discharge capacity test.",
  },
  {
    question: "Where do inspections take place?",
    answer:
      "Wherever the car is. Based in Waltham Abbey, the inspector travels to the vehicle — a dealer forecourt, a private seller's address, or your own home — covering Essex, Hertfordshire, Cambridgeshire, Greater London, and parts of Bedfordshire and Suffolk.",
  },
  {
    question: "How do I book, and how do I get in touch?",
    answer:
      "Book online and pick a time slot, or message us on WhatsApp — it's the fastest way to reach Epping Car Buyer. If you want the dedicated EV battery State of Health report, select the £49.99 SOH add-on when booking.",
  },
  {
    question: "How long does it take and when do I get the report?",
    answer:
      "Allow around 40–60 minutes on site for a Standard Inspection and 70–90 minutes for Premium. Both include a video review, photo evidence, a digital inspection report the same day and a personal phone call to talk through the findings and your purchase decision. EV customers who select the SOH add-on also receive the separate battery-health report.",
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
