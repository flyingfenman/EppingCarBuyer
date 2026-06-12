import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DealerNav } from '@/components/dealer/dealer-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Car = {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  guide_price: number
  status: string
}

export default async function DealerDashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/dealer/login')
  }

  // Fetch available cars
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false })

  // Fetch dealer's bids
  const { data: myBids } = await supabase
    .from('bids')
    .select('*, cars(make, model, year)')
    .eq('dealer_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-muted/30">
      <DealerNav />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Available Cars</h1>
        <p className="text-muted-foreground mb-8">Browse our stock and make an offer</p>

        {myBids && myBids.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Your Recent Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {myBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span>
                      {bid.cars?.year} {bid.cars?.make} {bid.cars?.model}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">£{bid.amount.toLocaleString()}</span>
                      <Badge variant={bid.status === 'accepted' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'}>
                        {bid.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!cars || cars.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No cars available at the moment. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car: Car) => (
              <Link key={car.id} href={`/dealer/car/${car.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">
                      {car.year} {car.make} {car.model}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mileage</span>
                        <span className="font-medium">{car.mileage.toLocaleString()} miles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guide Price</span>
                        <span className="font-bold text-lg">£{car.guide_price.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
