import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Stamford Car Buyer',
  description: 'Manage dealers, cars, and bids',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
