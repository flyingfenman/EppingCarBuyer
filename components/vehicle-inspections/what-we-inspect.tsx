"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  CheckCircle2,
  FileSearch,
  FileText,
  Gauge,
  ScanLine,
  ShieldCheck,
  Video,
} from "lucide-react"

type InspectionSection = {
  title: string
  description: string
  items: string[]
  premiumHighlight?: boolean
}

const inspectionSections: InspectionSection[] = [
  {
    title: "Vehicle Identity & Details",
    description: "The basics are recorded first so the inspection, diagnostics and history evidence all relate to the same vehicle.",
    items: [
      "Registration number",
      "VIN visible",
      "VIN consistency",
      "Make",
      "Model",
      "Derivative / specification",
      "Year",
      "Displayed mileage",
      "Fuel type",
      "Transmission type",
    ],
  },
  {
    title: "Exterior Bodywork",
    description: "A panel-by-panel visual condition review rather than a quick walk around.",
    items: [
      "Bonnet condition",
      "Roof condition",
      "Boot / tailgate condition",
      "Front bumper",
      "Rear bumper",
      "Front-left wing",
      "Front-right wing",
      "Rear-left quarter",
      "Rear-right quarter",
      "Front-left door",
      "Front-right door",
      "Rear-left door",
      "Rear-right door",
      "Left sill",
      "Right sill",
      "Panel alignment",
      "Panel gaps",
      "Visible dents",
      "Visible scratches",
      "Paint colour consistency",
      "Visible corrosion",
      "Visible previous repair evidence",
      "Exterior trim",
      "Grille",
      "Number plates",
      "Door handles",
      "Door operation",
      "Bonnet operation",
      "Boot / tailgate operation",
      "Fuel flap / cap",
    ],
  },
  {
    title: "Paint Depth Assessment",
    description: "Premium includes paint-depth readings on suitable accessible painted panels to help identify repainting, excessive build and possible previous repair work.",
    premiumHighlight: true,
    items: [
      "Bonnet paint depth",
      "Roof paint depth",
      "Boot / tailgate paint depth",
      "Front-left wing paint depth",
      "Front-right wing paint depth",
      "Front-left door paint depth",
      "Front-right door paint depth",
      "Rear-left door paint depth",
      "Rear-right door paint depth",
      "Rear-left quarter paint depth",
      "Rear-right quarter paint depth",
      "Left sill paint assessment",
      "Right sill paint assessment",
      "Paint-depth consistency",
      "Evidence of repainting",
      "Evidence of excessive paint build",
      "Possible filler indication",
      "Panel-to-panel reading comparison",
      "Previous body-repair evidence assessment",
      "Paint assessment summary",
    ],
  },
  {
    title: "Enhanced Body & Condition Assessment",
    description: "A deeper review of fit, structure, trim and common signs of previous damage or poor repair.",
    premiumHighlight: true,
    items: [
      "Overall body-line consistency",
      "Bumper alignment and fit",
      "Exterior trim and moulding fit",
      "Door hinge / striker condition",
      "Door and aperture seal condition",
      "Under-bonnet structural visual check",
      "Boot floor / spare-wheel well visual check",
      "Visible repair seams / sealant irregularities",
      "Common corrosion-area assessment",
      "Overall body-condition summary",
    ],
  },
  {
    title: "Glass, Mirrors & Lighting",
    description: "Visibility, glazing and exterior lighting are checked for condition and operation.",
    items: [
      "Windscreen condition",
      "Windscreen chips / cracks",
      "Front-left window",
      "Front-right window",
      "Rear-left window",
      "Rear-right window",
      "Rear screen",
      "Left mirror",
      "Right mirror",
      "Windscreen wipers",
      "Windscreen washers operation",
      "Headlights",
      "Main beam",
      "Front indicators",
      "Rear indicators",
      "Brake lights",
      "Tail lights",
      "Reverse lights",
      "Fog lights where fitted",
      "Number-plate lights",
    ],
  },
  {
    title: "Wheels, Tyres & Visible Brakes",
    description: "All four corners are assessed individually, including tread, wheel condition and accessible brake components.",
    items: [
      "Front-left tyre condition",
      "Front-right tyre condition",
      "Rear-left tyre condition",
      "Rear-right tyre condition",
      "Front-left tread depth",
      "Front-right tread depth",
      "Rear-left tread depth",
      "Rear-right tread depth",
      "Front-left wheel condition",
      "Front-right wheel condition",
      "Rear-left wheel condition",
      "Rear-right wheel condition",
      "Front-left visible brake condition",
      "Front-right visible brake condition",
      "Rear-left visible brake condition",
      "Rear-right visible brake condition",
      "Spare wheel / tyre repair kit",
      "Locking wheel nut key",
      "Visible uneven tyre wear",
      "Tyre suitability / matching observations",
    ],
  },
  {
    title: "Engine & Fluids",
    description: "For combustion-engine and hybrid vehicles, accessible engine-bay systems are checked for condition, levels, leaks and warning signs.",
    items: [
      "Engine oil level",
      "Engine oil visible condition",
      "Coolant level",
      "Coolant visible condition",
      "Brake fluid level",
      "Brake fluid visible condition",
      "Power-steering fluid where applicable",
      "Visible engine oil leaks",
      "Visible coolant leaks",
      "Other visible fluid leaks",
      "Auxiliary belt condition",
      "Visible pulleys / tensioners",
      "Coolant hoses",
      "Visible pipework",
      "Visible engine mountings",
      "Battery terminals",
      "Battery physical condition",
      "Abnormal engine noises",
      "Exhaust smoke observation",
      "Signs of overheating / coolant contamination",
    ],
  },
  {
    title: "Battery Health & Enhanced Mechanical Assessment",
    description: "12V battery and wider mechanical behaviour are assessed alongside the main physical inspection.",
    items: [
      "Battery health test",
      "Battery voltage",
      "Battery starting performance where testable",
      "Charging-system observation",
      "Battery security",
      "Battery terminal condition",
      "Suspension noise assessment",
      "Steering noise / play observation",
      "Drivetrain operation assessment",
      "Enhanced mechanical findings review",
    ],
  },
  {
    title: "Underbody Inspection",
    description: "Accessible underside areas are visually reviewed for damage, corrosion, leaks and component condition.",
    items: [
      "Front underbody condition",
      "Centre underbody condition",
      "Rear underbody condition",
      "Visible chassis / subframe condition",
      "Front subframe",
      "Rear subframe where visible",
      "Left sill underside",
      "Right sill underside",
      "Visible floor-pan condition",
      "Visible structural corrosion",
      "Visible suspension components",
      "Visible steering components",
      "Visible brake pipes",
      "Visible brake hoses",
      "Visible fuel lines",
      "Visible exhaust system",
      "Exhaust mountings",
      "Visible driveshaft / CV components",
      "Visible underbody fluid leaks",
      "Undertrays / underbody panels",
    ],
  },
  {
    title: "Interior & Safety Equipment",
    description: "Cabin condition, restraints, controls and everyday safety-related equipment are checked.",
    items: [
      "Driver's seat condition",
      "Front passenger seat condition",
      "Rear seat condition",
      "Driver's seat adjustment",
      "Passenger seat adjustment",
      "Driver's seat belt",
      "Front passenger seat belt",
      "Rear seat belts",
      "Dashboard condition",
      "Instrument cluster",
      "Warning lights on ignition",
      "Warning lights after start",
      "Horn",
      "Steering-wheel controls",
      "Interior lighting",
      "Electric windows",
      "Central locking",
      "Electric mirror adjustment",
      "Heating operation",
      "Air-conditioning operation",
    ],
  },
  {
    title: "Electrical & Equipment",
    description: "Fitted convenience and driver-assistance equipment is operated where practical.",
    items: [
      "Infotainment system",
      "Radio / audio system",
      "Bluetooth / connectivity where fitted",
      "Parking sensors where fitted",
      "Reversing camera where fitted",
      "Heated seats where fitted",
      "Heated rear screen",
      "Electric seat functions where fitted",
      "Key / remote operation",
      "Number of keys presented",
    ],
  },
  {
    title: "OBD Diagnostics",
    description: "A full-system diagnostic scan checks accessible control modules. The 260-point checklist is not a cap on diagnostic data: a modern vehicle can expose many modules, codes and live-data values.",
    items: [
      "OBD communication established",
      "Engine ECU scan",
      "Transmission module scan where supported",
      "ABS module scan",
      "Airbag / SRS module scan",
      "Body-control module scan where supported",
      "Steering module scan where supported",
      "Parking module scan where supported",
      "HVAC module scan where supported",
      "Other accessible control modules",
      "Current diagnostic trouble codes",
      "Stored diagnostic trouble codes",
      "Pending diagnostic trouble codes",
      "Engine-related fault codes",
      "Emissions-related fault codes",
      "ABS-related fault codes",
      "Airbag / SRS-related fault codes",
      "Transmission-related fault codes",
      "Communication / network faults",
      "Diagnostic findings recorded",
    ],
  },
  {
    title: "Road Test",
    description: "Where the vehicle is safe, legal and permission is available, the road test assesses how it behaves rather than relying on a static inspection alone.",
    items: [
      "Engine starting",
      "Idle quality",
      "Engine acceleration",
      "Engine performance",
      "Gear selection",
      "Gearbox operation",
      "Clutch operation where applicable",
      "Steering operation",
      "Steering alignment observation",
      "Braking performance",
      "Parking brake operation",
      "Suspension behaviour",
      "Ride quality",
      "Drivetrain noise",
      "Wheel-bearing noise observation",
      "Vibration",
      "Abnormal rattles / noises",
      "Temperature behaviour",
      "Warning lights during road test",
      "General road-test behaviour",
    ],
  },
  {
    title: "Estimated Repair Cost Guidance",
    description: "Premium turns defects into an action list, with indicative repair-cost guidance to help with the buying and negotiation decision.",
    premiumHighlight: true,
    items: [
      "Immediate defect identification",
      "Immediate defect priority",
      "Immediate repair-cost estimate",
      "Secondary defect identification",
      "Secondary defect priority",
      "Secondary repair-cost estimate",
      "Maintenance item identification",
      "Future maintenance estimate",
      "Estimated combined repair requirement",
      "Repair-cost summary",
    ],
  },
  {
    title: "Premium Reporting & Action Plan",
    description: "The inspection is translated into evidence and a practical plan rather than handed over as a raw checklist.",
    premiumHighlight: true,
    items: [
      "Comprehensive photographic evidence review",
      "Major-defect photographic references",
      "Minor-defect photographic references",
      "Bodywork photographic evidence",
      "Mechanical photographic evidence",
      "Priority defect summary",
      "Immediate-action plan",
      "Recommended three-month action plan",
      "Monitor / future-maintenance plan",
      "Personalised video inspection summary",
    ],
  },
  {
    title: "Seller & Vehicle Provenance",
    description: "Premium adds seller and vehicle provenance checks to help identify inconsistencies before money changes hands.",
    premiumHighlight: true,
    items: [
      "Registration / VIN / history consistency",
      "V5C keeper details reviewed where supplied",
      "Private-seller name / ID consistency where documents and permission are available",
      "Outstanding finance check",
      "Stolen vehicle check",
      "Insurance write-off / category check",
      "Mileage-history consistency",
      "Available previous advert / auction / salvage searches",
      "Indicators of undisclosed motor trading",
      "Provenance findings and inconsistencies summary",
    ],
  },
]

const premiumTotal = inspectionSections.reduce((total, section) => total + section.items.length, 0)

const differentiators = [
  {
    icon: Gauge,
    title: "260 defined Premium inspection points",
    text: "A structured, auditable checklist covering condition, bodywork, paint, mechanical systems, diagnostics, underbody, road test, repair guidance and provenance.",
  },
  {
    icon: ScanLine,
    title: "Diagnostics go beyond the point count",
    text: "We scan accessible control modules and record relevant faults. We do not inflate the headline by pretending every module or fault-code field is another inspection point.",
  },
  {
    icon: Video,
    title: "You see what we see",
    text: "Premium includes photographic evidence, a personalised video inspection summary and a practical action plan so the findings are easy to understand and use.",
  },
  {
    icon: ShieldCheck,
    title: "Inspected from a buyer's perspective",
    text: "We have spent years buying vehicles with our own money on the line. The inspection is built around the questions that matter before you commit to somebody else's car.",
  },
]

export function InspectionsWhatWeInspect() {
  return (
    <section id="what-we-inspect" className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">The full inspection scope</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">What We Inspect</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Standard is a comprehensive 160-point pre-purchase inspection. Premium is our {premiumTotal}-point inspection for buyers who want the deepest assessment, evidence and provenance work before committing.
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-4xl gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-slate-50 p-5">
            <p className="text-sm font-bold text-primary">Standard · £149.99</p>
            <p className="mt-1 text-3xl font-bold">160 points</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The essential mechanical, diagnostic, safety, condition and road-test checks, with history, video, photos, report and buying guidance.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-primary">Premium · £199.99</p>
            </div>
            <p className="mt-1 text-3xl font-bold">{premiumTotal} points</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The extensive checklist below, including paint-depth assessment, deeper body checks, repair-cost guidance, enhanced reporting and seller / vehicle provenance.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-4xl overflow-hidden rounded-2xl border border-primary/15 bg-primary/5">
          <div className="grid gap-4 p-5 sm:grid-cols-[220px_1fr] sm:items-center sm:p-6">
            <div className="relative aspect-[1600/629] overflow-hidden rounded-xl bg-white">
              <Image
                src="/images/inspection-car.jpg"
                alt="Vehicle undergoing a pre-purchase inspection"
                fill
                className="object-contain p-2"
                sizes="220px"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">The point count is the checklist, not the limit of the inspection</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Vehicle diagnostics can involve dozens of control modules and many individual fault records or live-data values. Those are investigated and reported where relevant, but we keep the headline at a clear {premiumTotal} defined inspection points rather than artificially inflating the number.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-9 max-w-5xl">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Premium {premiumTotal}-point checklist</h3>
              <p className="mt-1 text-sm text-muted-foreground">Open any section to see every defined inspection point.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">
              <CheckCircle2 className="h-4 w-4" />
              {premiumTotal} points in total
            </div>
          </div>

          <div className="space-y-3">
            {inspectionSections.map((section) => (
              <details
                key={section.title}
                className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-bold">{section.title}</span>
                      {section.premiumHighlight && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                          Premium depth
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground sm:text-sm">{section.description}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-foreground">
                    {section.items.length}
                  </span>
                </summary>
                <div className="border-t border-border bg-slate-50/60 p-4 sm:p-5">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 rounded-xl border border-border bg-white p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm leading-snug text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <FileSearch className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div className="text-sm leading-relaxed text-amber-950/80">
              <p className="font-bold text-amber-950">Important inspection notes</p>
              <p className="mt-1">
                Checks depend on vehicle design, access, condition, safety and fitted equipment. Paint-depth readings are taken only on suitable accessible painted substrates. Road testing requires a safe, legal vehicle and permission. Repair-cost figures are guidance rather than repair quotations. V5C and seller checks can identify inconsistencies but do not prove legal ownership. Previous advert, auction and salvage searches depend on available records.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-5xl rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BatteryCharging className="h-5 w-5 text-primary" />
                <h3 className="font-bold">EV & hybrid vehicles</h3>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Relevant high-voltage, charging, electric-drivetrain and battery-management diagnostics are included where the vehicle and diagnostic equipment support them. The separate £49.99 EV Battery State of Health Report is an optional deeper traction-battery assessment for compatible fully electric vehicles.
              </p>
            </div>
            <Link
              href="/ev-battery-health-check"
              className="inline-flex shrink-0 items-center gap-2 font-bold text-primary hover:underline"
            >
              EV Battery Health <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/vehicle-inspections/sample-report"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 bg-primary/5 px-5 py-3 font-bold text-primary transition-all hover:border-primary/40 hover:bg-primary/10"
          >
            <FileText className="h-5 w-5" />
            See a sample inspection report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
