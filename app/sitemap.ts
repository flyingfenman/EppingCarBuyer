import type { MetadataRoute } from "next"
import { getPublicCars } from "@/lib/cars-public"

const BASE_URL = "https://www.eppingcarbuyer.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vehicle-inspections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/vehicle-inspection-epping`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pre-purchase-car-inspection-essex`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ev-battery-health-check`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vehicle-inspections/sample-report`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/market-and-sell`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/cars-for-sale`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  let dynamicEntries: MetadataRoute.Sitemap = []

  try {
    const cars = await getPublicCars()

    if (cars && cars.length > 0) {
      dynamicEntries = cars.map((car) => ({
        url: `${BASE_URL}/cars-for-sale/${car.id}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.6,
      }))
    }
  } catch {
    dynamicEntries = []
  }

  return [...staticEntries, ...dynamicEntries]
}
