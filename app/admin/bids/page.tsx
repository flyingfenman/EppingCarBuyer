'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminNav } from '@/components/admin/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Bid = {
  id: string
  amount: number
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  cars: { make: string; model: string; year: number; guide_price: number } | null
  dealers: { name: string; email: string; company_name: string | null } | null
}

export default function AdminBidsPage() {
  const [bids, setBids] = useState<Bid[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.user_metadata?.is_admin !== true) {
      router.push('/admin/login')
      return
    }
    fetchBids()
  }

  const fetchBids = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('bids')
      .select('*, cars(make, model, year, guide_price), dealers(name, email, company_name)')
      .order('created_at', { ascending: false })
    setBids(data || [])
    setIsLoading(false)
  }

  const updateBidStatus = async (id: string, status: 'accepted' | 'rejected') => {
    const { error } = await supabase.from('bids').update({ status }).eq('id', id)
    if (!error) fetchBids()
  }

  const filteredBids = bids.filter(bid => 
    statusFilter === 'all' || bid.status === statusFilter
  )

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      accepted: 'default',
      rejected: 'destructive',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Bids</h1>

        <Card>
          <CardHeader>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filteredBids.length === 0 ? (
              <p className="text-muted-foreground">No bids found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Guide Price</TableHead>
                    <TableHead>Bid Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bid.dealers?.name}</div>
                          <div className="text-sm text-muted-foreground">{bid.dealers?.company_name || bid.dealers?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {bid.cars?.year} {bid.cars?.make} {bid.cars?.model}
                      </TableCell>
                      <TableCell>£{bid.cars?.guide_price?.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">£{bid.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(bid.status)}</TableCell>
                      <TableCell>{new Date(bid.created_at).toLocaleDateString('en-GB')}</TableCell>
                      <TableCell>
                        {bid.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-100"
                              onClick={() => updateBidStatus(bid.id, 'accepted')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => updateBidStatus(bid.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
