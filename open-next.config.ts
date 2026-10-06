import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Pages that are built ahead of time are served from the deployed files, so no extra Cloudflare storage is needed.
// Nothing here refreshes on a timer: pages that show live data (cars for sale, the shop) are marked
// `dynamic = "force-dynamic"` and are rendered fresh on every request.
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache })
