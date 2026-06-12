import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Epping Car Buyer',
  description: 'Manage dealers, cars, and bids',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
