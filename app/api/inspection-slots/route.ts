import { type NextRequest, NextResponse } from "next/server"
import { generateAllSlots, rangesOverlap, type PackageKey } from "@/lib/inspection-slots"
import { getOccupiedRanges } from "@/lib/inspection-bookings-server"

const LOOKBACK_DAYS = 15 // slots are only ever generated up to 14 days ahead, plus a small safety margin

export async function GET(request: NextRequest) {
  try {
    const packageKey = request.nextUrl.searchParams.get("package") as PackageKey | null
    if (packageKey !== "standard" && packageKey !== "premium") {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 })
    }

    const now = new Date()
    const allSlots = generateAllSlots(packageKey, now)
    const occupied = await getOccupiedRanges(LOOKBACK_DAYS)

    const availableSlots = allSlots.filter(
      (slot) => !occupied.some((range) => rangesOverlap(slot.start, slot.end, range.start, range.end)),
    )

    return NextResponse.json({ slots: availableSlots })
  } catch (error) {
    console.error("Error fetching inspection slots:", error)
    return NextResponse.json({ error: "Failed to load available slots" }, { status: 500 })
  }
}
