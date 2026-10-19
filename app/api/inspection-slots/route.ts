import { type NextRequest, NextResponse } from "next/server"
import { PACKAGE_KEYS, generateAllSlots, isPackageKey, rangesOverlap, type PackageKey } from "@/lib/inspection-slots"
import { getOccupiedRanges } from "@/lib/inspection-bookings-server"
import { fetchOtherDiaries, onlyFreeEverywhere, type OtherDiary } from "@/lib/other-diaries"

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
    // diary=own: the times this site's own bookings leave free, which is what the other inspection sites read when
    // they check a time against our diary. Without it, times booked on the other sites are taken out as well.
    const ownOnly = request.nextUrl.searchParams.get("diary") === "own"

    const now = new Date()
    const [occupied, otherDiaries] = await Promise.all([
      getOccupiedRanges(LOOKBACK_DAYS),
      ownOnly ? Promise.resolve<OtherDiary[]>([]) : fetchOtherDiaries(),
    ])
    const available = (packageKey: PackageKey) =>
      onlyFreeEverywhere(otherDiaries, packageKey, filterAvailable(packageKey, now, occupied))

    if (packageParam === "all") {
      return NextResponse.json({
        slotsByPackage: Object.fromEntries(PACKAGE_KEYS.map((key) => [key, available(key)])),
      })
    }

    return NextResponse.json({ slots: available(packageParam) })
  } catch (error) {
    console.error("Error fetching inspection slots:", error)
    return NextResponse.json({ error: "Failed to load available slots" }, { status: 500 })
  }
}
