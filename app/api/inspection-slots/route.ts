import { type NextRequest, NextResponse } from "next/server"
import { PACKAGE_KEYS, generateAllSlots, isPackageKey, rangesOverlap, type PackageKey } from "@/lib/inspection-slots"
import { getOccupiedRanges } from "@/lib/inspection-bookings-server"

const LOOKBACK_DAYS = 45

function filterAvailable(packageKey: PackageKey, now: Date, occupied: Awaited<ReturnType<typeof getOccupiedRanges>>) {
  return generateAllSlots(packageKey, now).filter(
    (slot) => !occupied.some((range) => rangesOverlap(slot.start, slot.end, range.start, range.end)),
  )
}

export async function GET(request: NextRequest) {
  try {
    const packageParam = request.nextUrl.searchParams.get("package")
    if (packageParam !== "all" && !isPackageKey(packageParam)) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 })
    }

    const now = new Date()
    const occupied = await getOccupiedRanges(LOOKBACK_DAYS)

    if (packageParam === "all") {
      return NextResponse.json({
        slotsByPackage: Object.fromEntries(PACKAGE_KEYS.map((key) => [key, filterAvailable(key, now, occupied)])),
      })
    }

    return NextResponse.json({ slots: filterAvailable(packageParam, now, occupied) })
  } catch (error) {
    console.error("Error fetching inspection slots:", error)
    return NextResponse.json({ error: "Failed to load available slots" }, { status: 500 })
  }
}
