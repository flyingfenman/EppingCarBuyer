export type ContactDetail =
  | { kind: "email"; email: string }
  | { kind: "phone"; phone: string; whatsappNumber: string }

export function parseContactDetail(input: string): ContactDetail | null {
  const value = input.trim()
  if (value.includes("@")) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? { kind: "email", email: value } : null
  }
  const digits = value.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 15) return null
  return { kind: "phone", phone: value, whatsappNumber: toInternational(digits) }
}

// Handles 07…, 0044 7…, +44 7… and +44 (0) 7… as typed by UK visitors.
function toInternational(digits: string): string {
  if (digits.startsWith("00")) digits = digits.slice(2)
  else if (digits.startsWith("0")) digits = `44${digits.slice(1)}`
  return digits.replace(/^440/, "44")
}
