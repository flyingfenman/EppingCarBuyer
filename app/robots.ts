import type { MetadataRoute } from "next"

const BASE_URL = "https://www.eppingcarbuyer.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
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
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
