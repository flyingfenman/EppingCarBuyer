import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminNav } from '@/components/admin/admin-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, Users, Banknote, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.is_admin !== true) {
    redirect('/admin/login')
  }

  // Fetch counts
  const [carsResult, dealersResult, bidsResult, enquiriesResult] = await Promise.all([
    supabase.from('cars').select('*', { count: 'exact', head: true }),
    supabase.from('dealers').select('*', { count: 'exact', head: true }),
    supabase.from('bids').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('handled', false),
  ])

  const stats = [
    { 
      title: 'Total Cars', 
      value: carsResult.count || 0, 
      icon: Car, 
      href: '/admin/cars',
      color: 'text-blue-600'
    },
    { 
      title: 'Active Dealers', 
      value: dealersResult.count || 0, 
      icon: Users, 
      href: '/admin/dealers',
      color: 'text-green-600'
    },
    { 
      title: 'Pending Bids', 
      value: bidsResult.count || 0, 
      icon: Banknote, 
      href: '/admin/bids',
      color: 'text-amber-600'
    },
    { 
      title: 'New Enquiries', 
      value: enquiriesResult.count || 0, 
      icon: MessageSquare, 
      href: '/admin/enquiries',
      color: 'text-purple-600'
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
