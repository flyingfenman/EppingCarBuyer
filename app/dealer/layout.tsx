import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dealer Portal - Stamford Car Buyer',
  description: 'View available cars and make offers',
}

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
