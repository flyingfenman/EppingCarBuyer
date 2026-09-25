import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import {
  MIN_BOOKING_NOTICE_HOURS,
  PACKAGE_DURATIONS_MIN,
  rangesOverlap,
  type PackageKey,
} from "@/lib/inspection-slots"
import { getOccupiedRanges } from "@/lib/inspection-bookings-server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
const LOOKBACK_DAYS = 45
const EV_SOH_AMOUNT_PENCE = 4999

const PACKAGE_INFO: Record<PackageKey, { name: string; amountPence: number }> = {
  standard: { name: "Standard Inspection", amountPence: 14999 },
  premium: { name: "Premium Inspection", amountPence: 19999 },
}

function isPackageKey(value: unknown): value is PackageKey {
  return value === "standard" || value === "premium"
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      packageKey, slotStart, slotEnd, registration, location, sellerName, sellerPhone, advertUrl,
      name, phone, email, notes, includeEvSoh, shortNoticeConfirmed, trafficSource,
    } = body as {
      packageKey: unknown
      slotStart: string
      slotEnd: string
      registration: string
      location: string
      sellerName?: string
      sellerPhone?: string
      advertUrl?: string
      name: string
      phone: string
      email: string
      notes?: string
      includeEvSoh?: boolean
      shortNoticeConfirmed?: boolean
      trafficSource?: { label?: unknown; detail?: unknown; landingPage?: unknown } | null
    }

    if (!isPackageKey(packageKey) || !slotStart || !slotEnd || !registration || !location || !name || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const start = new Date(slotStart)
    const end = new Date(slotEnd)
    const expectedDurationMin = PACKAGE_DURATIONS_MIN[packageKey]
    const actualDurationMin = (end.getTime() - start.getTime()) / 60000
    const earliestAllowedStart = Date.now() + MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000
    const isShortNotice = start.getTime() < earliestAllowedStart
    const hasShortNoticeConfirmation = shortNoticeConfirmed === true

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      actualDurationMin !== expectedDurationMin
    ) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 })
    }

    if (isShortNotice && !hasShortNoticeConfirmation) {
      return NextResponse.json(
        { error: `Appointments inside ${MIN_BOOKING_NOTICE_HOURS} hours must be confirmed with Henry before online booking.` },
        { status: 400 },
      )
    }

    const occupied = await getOccupiedRanges(LOOKBACK_DAYS)
    const alreadyTaken = occupied.some((range) => rangesOverlap(slotStart, slotEnd, range.start, range.end))
    if (alreadyTaken) {
      return NextResponse.json({ error: "That slot was just booked by someone else — please pick another." }, { status: 409 })
    }

    const { name: packageName, amountPence } = PACKAGE_INFO[packageKey]
    const wantsEvSoh = includeEvSoh === true
    const origin = request.nextUrl.origin
    const trimmedNotes = (notes || "").slice(0, 400)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "gbp",
          unit_amount: amountPence,
          product_data: {
            name: `${packageName} — Vehicle Inspection`,
            description: `${registration} · ${start.toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })}`,
          },
        },
        quantity: 1,
      },
    ]

    if (wantsEvSoh) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          unit_amount: EV_SOH_AMOUNT_PENCE,
          product_data: {
            name: "EV Battery State of Health Report",
            description: "CARA Approved® Autel EV Battery Health Test add-on for compatible fully electric and plug-in hybrid vehicles",
          },
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      line_items: lineItems,
      metadata: {
        type: "inspection_booking",
        packageKey,
        packageName,
        includeEvSoh: wantsEvSoh ? "yes" : "no",
        shortNoticeConfirmed: isShortNotice && hasShortNoticeConfirmation ? "yes" : "no",
        slotStart,
        slotEnd,
        registration,
        location,
        sellerName: (sellerName || "").slice(0, 200),
        sellerPhone: (sellerPhone || "").slice(0, 50),
        advertUrl: (advertUrl || "").slice(0, 400),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        notes: trimmedNotes,
        trafficSource: cleanText(trafficSource?.label, 60),
        trafficDetail: cleanText(trafficSource?.detail, 120),
        landingPage: cleanText(trafficSource?.landingPage, 120),
      },
      success_url: `${origin}/vehicle-inspections/booked?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/vehicle-inspections?booking=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating inspection checkout session:", error)
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 })
  }
}
