'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminNav } from '@/components/admin/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Check, Phone, MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Enquiry = {
  id: string
  type: 'call' | 'message'
  message: string | null
  handled: boolean
  created_at: string
  cars: { make: string; model: string; year: number } | null
  dealers: { name: string; email: string; phone: string | null; company_name: string | null } | null
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
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
    fetchEnquiries()
  }

  const fetchEnquiries = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('enquiries')
      .select('*, cars(make, model, year), dealers(name, email, phone, company_name)')
      .order('created_at', { ascending: false })
    setEnquiries(data || [])
    setIsLoading(false)
  }

  const markAsHandled = async (id: string) => {
    const { error } = await supabase.from('enquiries').update({ handled: true }).eq('id', id)
    if (!error) fetchEnquiries()
  }

  const filteredEnquiries = enquiries.filter(enq => {
    if (filter === 'all') return true
    if (filter === 'unhandled') return !enq.handled
    return enq.type === filter
  })

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Enquiries</h1>

        <Card>
          <CardHeader>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unhandled">Unhandled</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filteredEnquiries.length === 0 ? (
              <p className="text-muted-foreground">No enquiries found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell>
                        {enquiry.type === 'call' ? (
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" /> Call
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <MessageSquare className="h-3 w-3" /> Message
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{enquiry.dealers?.name}</div>
                          <div className="text-sm text-muted-foreground">{enquiry.dealers?.company_name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{enquiry.dealers?.email}</div>
                          {enquiry.dealers?.phone && <div>{enquiry.dealers?.phone}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {enquiry.cars?.year} {enquiry.cars?.make} {enquiry.cars?.model}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {enquiry.message || '-'}
                      </TableCell>
                      <TableCell>{new Date(enquiry.created_at).toLocaleDateString('en-GB')}</TableCell>
                      <TableCell>
                        <Badge variant={enquiry.handled ? 'default' : 'secondary'}>
                          {enquiry.handled ? 'Handled' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {!enquiry.handled && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-700 hover:bg-green-100"
                            onClick={() => markAsHandled(enquiry.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
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
