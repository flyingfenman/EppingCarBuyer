import type { PackageKey } from "@/lib/inspection-slots"

export type InspectionPackage = {
  key: PackageKey
  name: string
  price: string
  amount: number
  points: string
  strapline: string
  features: string[]
  popular?: boolean
}

export const INSPECTION_PACKAGES: InspectionPackage[] = [
  {
    key: "standard",
    name: "Standard Inspection",
    price: "£149.99",
    amount: 149.99,
    points: "160-point inspection",
    strapline: "In-depth mechanical findings and buying guidance",
    features: ["Engine / drivetrain, brakes, steering and suspension", "Full diagnostic scan and road test", "Vehicle history check", "Easy-to-understand video review", "Photo evidence and same-day mechanical report", "Personal call and buying guidance"],
  },
  {
    key: "premium",
    name: "Premium Inspection",
    price: "£199.99",
    amount: 199.99,
    points: "260-point inspection",
    strapline: "Deeper inspection and vehicle and seller research",
    features: ["Everything in Standard, including video review", "Deeper bodywork and condition assessment", "Extended road test where safe and permitted", "Available auction, salvage and previous advert searches", "Checks for indicators of undisclosed motor trading"],
    popular: true,
  },
]
