import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarCheck } from "lucide-react"
import { InspectionsWhatWeInspect } from "@/components/vehicle-inspections/what-we-inspect"

export const metadata: Metadata = {
  title: "What We Inspect | 260-Point Premium Vehicle Inspection | Epping Car Buyer",
  description:
    "See the full 260-point Premium pre-purchase vehicle inspection checklist, including diagnostics, paint-depth assessment, underbody, road test, repair-cost guidance and seller and vehicle provenance checks.",
  alternates: {
    canonical: "/vehicle-inspections/what-we-inspect",
  },
}

export default function WhatWeInspectPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-border bg-slate-50">
        <div className="container mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/vehicle-inspections"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicle Inspections
          </Link>
          <Link
            href="/vehicle-inspections#book"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
          >
            <CalendarCheck className="h-4 w-4" />
            Book an Inspection
          </Link>
        </div>
      </div>
      <InspectionsWhatWeInspect />
    </main>
  )
}
