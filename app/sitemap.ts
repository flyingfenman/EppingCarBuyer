import type { MetadataRoute } from "next"

const BASE_URL = "https://www.eppingcarbuyer.com"

// No lastModified: a date that is always "now" is ignored by Google, and wrong dates hurt trust in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[path: string, priority: number]> = [
    ["/", 1.0],
    ["/vehicle-inspections", 0.95],
    ["/vehicle-inspections/what-we-inspect", 0.85],
    ["/vehicle-inspection-london", 0.9],
    ["/pre-purchase-car-inspection-essex", 0.9],
    ["/ev-battery-health-check", 0.9],
    ["/vehicle-inspections/sample-report", 0.7],
    ["/market-and-sell", 0.8],
    ["/contact", 0.6],
    ["/privacy-policy", 0.2],
    ["/terms-of-service", 0.2],
  ]

  return pages.map(([path, priority]) => ({ url: `${BASE_URL}${path}`, priority }))
}
