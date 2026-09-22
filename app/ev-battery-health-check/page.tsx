import type { Metadata } from "next"
import Link from "next/link"
import { BatteryCharging, BadgeCheck, Gauge, FileCheck2, MapPin, ShieldCheck, ArrowRight, Info, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "EV Battery Health Check & SOH Report | CARA Approved® Autel Test | Epping Car Buyer",
  description:
    "Buying a used Tesla or other EV? Add an EV battery State of Health (SOH) report, using a CARA Approved® Autel EV Battery Health Test on compatible vehicles, to a pre-purchase vehicle inspection for £49.99 across Essex, Hertfordshire, Greater London, South Cambridgeshire and nearby areas.",
  alternates: {
    canonical: "/ev-battery-health-check",
  },
  openGraph: {
    title: "EV Battery Health Check & State of Health Report",
    description:
      "Check a used EV's high-voltage traction battery before you buy. CARA Approved® Autel EV Battery Health Test, available as a £49.99 inspection add-on.",
    url: "/ev-battery-health-check",
    type: "website",
  },
}

const faqs = [
  {
    question: "What is EV battery State of Health (SOH)?",
    answer:
      "State of Health is a percentage used to describe the condition of an electric vehicle's high-voltage traction battery. The Autel EV Battery Health Test obtains and evaluates battery-management data available from the vehicle to produce an SOH result and battery health report.",
  },
  {
    question: "Is the Autel EV battery test CARA Approved?",
    answer:
      "Yes. The Autel battery health test method we use carries the Battery Health Check CARA Approved® certification mark. The approval applies to the Autel test method, not to Epping Car Buyer as a separate certification body.",
  },
  {
    question: "How much does an EV battery health check cost?",
    answer:
      "The EV Battery State of Health Report is £49.99 when added to either an Epping Car Buyer pre-purchase vehicle inspection.",
  },
  {
    question: "Is this the same as a full independent battery capacity test?",
    answer:
      "No. The Autel EV Battery Health Test is a diagnostic SOH assessment based on data available from the vehicle and its battery management system. It is not a full independent charge-and-discharge capacity test.",
  },
  {
    question: "Can every electric car be tested?",
    answer:
      "Vehicle compatibility and the battery data available vary by manufacturer, model and software version. Send us the registration or vehicle details before booking if you want us to confirm compatibility.",
  },
  {
    question: "Can you inspect a used Tesla?",
    answer:
      "Yes. We inspect used Teslas and other electric cars before you buy. Every inspection includes diagnostic checks appropriate to the vehicle, and on older EVs we recommend adding the £49.99 EV Battery State of Health report where the car is compatible. Send us the model and year before booking and we'll confirm compatibility.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "EV Battery State of Health Check",
  serviceType: "Electric vehicle traction battery State of Health assessment",
  url: "https://www.eppingcarbuyer.com/ev-battery-health-check",
  description:
    "Mobile EV battery State of Health assessment using a CARA Approved Autel EV Battery Health Test, available as an add-on to a pre-purchase vehicle inspection.",
  provider: {
    "@type": "AutomotiveBusiness",
    name: "Epping Car Buyer",
    url: "https://www.eppingcarbuyer.com",
    telephone: "+441992367909",
  },
  areaServed: ["Essex", "Hertfordshire", "Greater London", "South Cambridgeshire", "Bedfordshire", "Suffolk"],
  offers: {
    "@type": "Offer",
    price: "49.99",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    description: "Optional add-on to a pre-purchase vehicle inspection; compatible fully electric vehicles only.",
  },
}

const faqSchema = {
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

export default function EvBatteryHealthCheckPage() {
  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-b border-border bg-primary/5 py-14 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-bold text-primary mb-6">
              <BadgeCheck className="w-4 h-4" />
              CARA Approved® Autel EV Battery Health Test
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground">
              EV Battery Health Check Before You Buy
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Buying a used electric car? Add a high-voltage traction battery State of Health (SOH) assessment and customer battery report to your pre-purchase inspection.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="rounded-xl border border-primary/15 bg-white px-6 py-3 text-left shadow-sm">
                <p className="text-xs uppercase tracking-wide font-bold text-primary">Inspection add-on</p>
                <p className="text-3xl font-bold text-foreground">£49.99</p>
              </div>
              <Button asChild size="lg" className="h-16 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <Link href="/vehicle-inspections#book">
                  Book a Vehicle Inspection <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" /> Essex, Hertfordshire, Greater London, South Cambridgeshire and surrounding areas
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold">What the EV battery report gives you</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The traction battery is one of the most important parts of a used EV. Our optional test gives you an additional battery-specific assessment alongside the rest of the vehicle inspection.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <Gauge className="w-9 h-9 text-primary" />
                <h3 className="font-bold text-xl mt-4">State of Health (SOH)</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  A clear battery-health percentage produced from the battery-management information available from the vehicle.
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <FileCheck2 className="w-9 h-9 text-primary" />
                <h3 className="font-bold text-xl mt-4">Customer Report</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  A separate Autel battery health report to keep with your Epping Car Buyer pre-purchase inspection report.
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <BadgeCheck className="w-9 h-9 text-primary" />
                <h3 className="font-bold text-xl mt-4">CARA Approved® Method</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  The Autel battery health test method we use carries the Battery Health Check CARA Approved® certification mark.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm uppercase tracking-wider font-bold text-primary">Why it matters</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">A normal diagnostic scan and an EV battery SOH test are not the same thing.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Every inspection includes diagnostic checks appropriate to the vehicle. The £49.99 EV Battery State of Health add-on goes further by running the dedicated Autel battery-health procedure and producing a specific traction-battery SOH report.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                That gives a used-EV buyer another useful piece of evidence when deciding whether the car is worth buying and whether the asking price reflects the battery condition.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <BatteryCharging className="w-6 h-6 text-primary" /> What&apos;s included
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>Dedicated high-voltage EV traction-battery health assessment on compatible vehicles</span></li>
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>State of Health (SOH) result based on available vehicle/BMS battery data</span></li>
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>Autel end-customer battery health report</span></li>
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>Battery findings considered alongside the wider pre-purchase inspection</span></li>
              </ul>
              <div className="mt-6 rounded-xl bg-primary/5 border border-primary/15 p-4 flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Compatibility and available metrics vary by vehicle. The Autel EV Battery Health Test is based on battery-management data available from the vehicle and is not a full independent charge/discharge capacity test.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-wider font-bold text-primary">Used Tesla &amp; EV buyers</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">Buying a used Tesla? Check the battery before you pay.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We inspect used Teslas and other electric cars before you buy. On older EVs the battery matters most, so we recommend adding the £49.99 State of Health report.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="h-14 px-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/vehicle-inspections#book">
                    Book an EV inspection <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-7 font-bold bg-white">
                  <a
                    href={`https://wa.me/441992367909?text=${encodeURIComponent("Hi, I'm looking at a used Tesla and would like to check the EV Battery SOH report works on it. Model and year: ")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" /> Check my Tesla
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-xl">What you get on a used Tesla</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>A full pre-purchase inspection, with diagnostic checks appropriate to the vehicle</span></li>
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>The optional £49.99 Autel State of Health report on compatible vehicles</span></li>
                <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" /><span>WhatsApp us the model and year and we&apos;ll confirm compatibility before you book</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold">EV Battery Health Check FAQs</h2>
              <p className="mt-3 text-muted-foreground">Straight answers before you book.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border p-5 sm:p-6 bg-white">
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Inspect the whole car — and the EV battery.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Choose a Standard or Premium inspection, then add the EV Battery State of Health Report for £49.99.
            </p>
            <Button asChild size="lg" className="mt-7 h-14 px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/vehicle-inspections#book">View inspection packages &amp; book</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
