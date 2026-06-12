import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dealer Portal - Epping Car Buyer',
  description: 'View available cars and make offers',
}

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
