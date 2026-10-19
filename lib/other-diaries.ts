import "server-only"
import { PACKAGE_KEYS, type PackageKey, type Slot } from "@/lib/inspection-slots"

// Pro Vehicle Inspections (www.provehicleinspections.com) takes its bookings into its own Stripe account, so each
// site works out its free times from its own bookings alone. Henry is one person, so a time booked on either site has
// to disappear from both. Each site publishes the times its own bookings leave free at
// /api/inspection-slots?package=all&diary=own, and this site only offers (and only sells) a time that is free on every
// site.
//
// Stamford Car Buyer shares this site's Stripe account, so its bookings are already in this diary and it is not listed here.
const OTHER_SITES = [{ name: "Pro Vehicle Inspections", origin: "https://www.provehicleinspections.com" }]

// Longer than the other site normally takes (it reads its bookings from Stripe first), short enough that the booking
// calendar still loads if it is struggling.
const TIMEOUT_MS = 8000

// Another site's diary: the times it still has free, per package, keyed by slotKey.
export interface OtherDiary {
  name: string
  free: Record<PackageKey, Set<string>>
}

// Both sites offer the same grid of times, so a time is free on the other site exactly when it is in its list.
// Keyed by the instant rather than the ISO string, so the same moment written two ways still matches.
function slotKey(slot: Slot) {
  return `${new Date(slot.start).getTime()}|${new Date(slot.end).getTime()}`
}

async function fetchDiary(site: { name: string; origin: string }): Promise<OtherDiary | null> {
  try {
    const response = await fetch(`${site.origin}/api/inspection-slots?package=all&diary=own`, {
      headers: { accept: "application/json", "user-agent": "EppingCarBuyer diary check" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const body = (await response.json()) as { slotsByPackage?: Partial<Record<PackageKey, Slot[]>> }
    const free = {} as Record<PackageKey, Set<string>>
    for (const key of PACKAGE_KEYS) {
      const slots = body.slotsByPackage?.[key]
      if (!Array.isArray(slots)) throw new Error(`no ${key} slots in the response`)
      free[key] = new Set(slots.map(slotKey))
    }
    return { name: site.name, free }
  } catch (error) {
    // Fail open: the other site being down must not stop anyone booking here. Logged so a double booking can be
    // traced back to it.
    console.error(`Could not read the ${site.name} diary, so only this site's bookings are being checked:`, error)
    return null
  }
}

// The other sites' diaries, read together. A site that could not be read is left out.
export async function fetchOtherDiaries(): Promise<OtherDiary[]> {
  const diaries = await Promise.all(OTHER_SITES.map(fetchDiary))
  return diaries.filter((diary): diary is OtherDiary => diary !== null)
}

// True when every other site still has this time free (or no other site could be read).
export function isFreeElsewhere(diaries: OtherDiary[], packageKey: PackageKey, slot: Slot): boolean {
  const key = slotKey(slot)
  return diaries.every((diary) => diary.free[packageKey].has(key))
}

export function onlyFreeEverywhere(diaries: OtherDiary[], packageKey: PackageKey, slots: Slot[]): Slot[] {
  if (diaries.length === 0) return slots
  return slots.filter((slot) => isFreeElsewhere(diaries, packageKey, slot))
}
