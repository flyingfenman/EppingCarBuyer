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

// AI search, assistant and training crawlers are welcome: the business is found through ChatGPT, Perplexity, Claude
// and Google. A crawler with its own group ignores the "*" group, so each one repeats the private paths.
const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
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
