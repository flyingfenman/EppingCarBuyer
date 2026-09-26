import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Epping Car Buyer',
  description: 'Manage dealers, cars, and bids',
  // Keeps the admin area out of search results (it can otherwise turn up as a Google sitelink).
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
