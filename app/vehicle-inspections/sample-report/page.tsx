import { Metadata } from "next"
import { ReportHeader } from "@/components/vehicle-inspections/sample-report/report-header"
import { VehicleCheckReport } from "@/components/vehicle-inspections/sample-report/vehicle-check-report"
import { ReportSummary } from "@/components/vehicle-inspections/sample-report/summary"
import { CategoryScores } from "@/components/vehicle-inspections/sample-report/category-scores"
import { ReportChecklist } from "@/components/vehicle-inspections/sample-report/checklist"
import { ReportPhotoGallery } from "@/components/vehicle-inspections/sample-report/photo-gallery"
import { ReportTerms } from "@/components/vehicle-inspections/sample-report/terms"

export const metadata: Metadata = {
  title: "Sample Inspection Report - Epping Car Buyer",
  description:
    "See exactly what you get with an Epping Car Buyer vehicle inspection — a sample report for a fictional example vehicle.",
  robots: { index: false, follow: true },
}

export default function SampleReportPage() {
  return (
    <div className="min-h-screen">
      <ReportHeader />
      <VehicleCheckReport />
      <CategoryScores />
      <ReportSummary />
      <ReportChecklist />
      <ReportPhotoGallery />
      <ReportTerms />
    </div>
  )
}
