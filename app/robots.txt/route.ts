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

// Content Signals (https://contentsignals.org): says out loud that search indexing, use in AI answers and AI training
// are all permitted. Cloudflare's own "managed robots.txt" would instead discourage AI training, so it stays off.
const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes"

// Written by hand (not app/robots.ts) because the Next.js robots helper cannot output a Content-Signal line.
export function GET() {
  const group = (userAgent: string) =>
    [`User-Agent: ${userAgent}`, CONTENT_SIGNAL, "Allow: /", ...PRIVATE_PATHS.map((path) => `Disallow: ${path}`)].join("\n")

  const body =
    [...AI_CRAWLERS, "*"].map(group).join("\n\n") + `\n\nHost: ${BASE_URL}\nSitemap: ${BASE_URL}/sitemap.xml\n`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
