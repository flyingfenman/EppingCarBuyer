import { MessageCircle } from "lucide-react"
import { SITE } from "./site"

// The questions customers ask most, with short answers. They are always open and are also the page's
// FAQ markup, so this is exactly what visitors see.
const faqs = [
  {
    question: "How much does a car inspection cost?",
    answer:
      "Standard is £149.99 (160 points) and Premium is £199.99 (260 points). For electric and plug-in hybrid cars you can add the battery report for £49.99, or book the battery check on its own for £99.99.",
  },
  {
    question: "Is a history check, like an HPI check, included?",
    answer:
      "Yes, in both. We check for outstanding finance, insurance write-offs, theft and mileage. Premium goes further with seller and logbook checks and searches of auction, salvage and previous advert records.",
  },
  {
    question: "What does Premium add to the Standard inspection?",
    answer:
      "A deeper 260-point inspection with paint-depth readings, repair-cost guidance and an action plan, an extended road test and the extra research above. Searches depend on the records available.",
  },
  {
    question: "Does Premium include the EV battery State of Health report?",
    answer:
      "No. The battery report is an optional £49.99 extra with either inspection, so Standard is £199.98 with it and Premium is £249.98. Electric and hybrid fault checks are already included in both.",
  },
  {
    question: "Do you come to the car, and which areas do you cover?",
    answer: `Yes, wherever the car is: a dealer, a private seller's address or your own home. We cover ${SITE.serves}.`,
  },
  {
    question: "How long does it take and when do I get the report?",
    answer:
      "Around 40–60 minutes on site for Standard and 70–90 minutes for Premium. You get the video review, photos and written report the same day, plus a personal call to talk it through.",
  },
  {
    question: "Is it worth paying for an inspection before buying a used car?",
    answer:
      "Yes. It can uncover expensive problems before you hand over any money. You get finance, write-off, stolen and mileage checks, a full diagnostic scan, a road test and a detailed report.",
  },
  {
    question: "How do I book, and how do I get in touch?",
    answer: `Book online and pick a time, or message us on WhatsApp, the fastest way to reach ${SITE.brand}.`,
  },
]

export function InspectionsFAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return (
    <section className="bg-primary/[0.04] py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} suppressHydrationWarning />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Questions</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">What buyers ask us most</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-bold leading-snug sm:text-xl">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border sm:flex-row sm:p-6">
          <p className="text-lg font-bold">Something else you want to know? Ask Henry directly.</p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-lg font-bold text-white transition hover:bg-[#1da851]">
            <MessageCircle className="h-5 w-5" /> Message Henry
          </a>
        </div>
      </div>
    </section>
  )
}
