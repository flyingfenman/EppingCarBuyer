import type { MetadataRoute } from "next"

const BASE_URL = "https://www.eppingcarbuyer.com"
// /admin is left crawlable on purpose: its pages carry noindex, which Google only sees if it can fetch them.
const PRIVATE_PATHS = [
  "/dealer",
  "/dealer/",
  "/api",
  "/api/",
  "/quote",
  "/fb",
  "/continue",
  "/vehicle-details",
  "/shop",
  "/shop/",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
