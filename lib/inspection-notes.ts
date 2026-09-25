export type InspectionFinding = {
  title: string
  detail: string
  status: "flagged" | "good"
}

export type InspectionNote = {
  slug: string
  title: string
  metaTitle: string
  description: string
  vehicle: string
  town: string
  service: string
  inspected: string
  /** ISO date the note went live, used for sorting and structured data. */
  published: string
  image: string
  imageAlt: string
  imagePosition?: string
  intro: string
  findings: InspectionFinding[]
  outcome: string[]
  quote?: { text: string; name: string }
  related: { href: string; label: string }[]
}

// Only publish facts from the real inspection, with the customer's OK and number plates blurred.
const notes: InspectionNote[] = [
  {
    slug: "land-rover-discovery-wickford-oil-leak-coolant-error",
    title: "Land Rover Discovery, Wickford: Oil Leak and Coolant Error Found Before Purchase",
    metaTitle: "Land Rover Discovery Inspection, Wickford | Epping Car Buyer",
    description:
      "A 72-plate Land Rover Discovery inspected at a prestige dealer in Wickford, Essex. We found an oil leak and a coolant error before the buyer paid.",
    vehicle: "72-plate Land Rover Discovery",
    town: "Wickford, Essex",
    service: "Premium inspection + EV battery health check",
    inspected: "September 2026",
    published: "2026-09-25",
    image: "/images/testimonials/dave-land-rover-discovery.jpg",
    imageAlt: "72-plate Land Rover Discovery on ramps during its Premium inspection at a prestige car dealer in Wickford, Essex",
    intro:
      "Dave asked us to check a 72-plate Land Rover Discovery at a prestige car dealer in Wickford before committing to it. He booked our Premium inspection with the EV battery health check.",
    findings: [
      {
        title: "Oil leak underneath",
        detail:
          "There was oil spread across a large area underneath the car. Because it had spread so far, the exact source couldn't be pinned down on the day, so we recorded it in the report.",
        status: "flagged",
      },
      {
        title: "Coolant error",
        detail: "We also picked up a coolant error and flagged it alongside the leak.",
        status: "flagged",
      },
    ],
    outcome: [
      "A garage has since traced the oil leak to a gasket, which is being replaced, and put the coolant error down to a sensor.",
      "Both issues were found and written up before Dave handed over his money. If the leak ever comes back, the report shows it was there before he bought the car.",
    ],
    quote: { text: "I am very happy with the service. Value for money was great.", name: "Dave" },
    related: [
      { href: "/pre-purchase-car-inspection-essex", label: "Car inspections in Essex" },
      { href: "/ev-battery-health-check", label: "EV battery health check" },
    ],
  },
]

export const inspectionNotes = [...notes].sort((a, b) => b.published.localeCompare(a.published))

export function getInspectionNote(slug: string) {
  return inspectionNotes.find((note) => note.slug === slug)
}
