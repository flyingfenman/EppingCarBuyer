'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminNav } from '@/components/admin/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Dealer = {
  id: string
  email: string
  name: string
  company_name: string | null
  phone: string | null
  created_at: string
}

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newDealer, setNewDealer] = useState({ email: '', password: '', name: '', company_name: '', phone: '' })
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
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
    fetchDealers()
  }

  const fetchDealers = async () => {
    setIsLoading(true)
    const { data } = await supabase.from('dealers').select('*').order('created_at', { ascending: false })
    setDealers(data || [])
    setIsLoading(false)
  }

  const handleCreateDealer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/dealers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDealer),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error)

      setIsDialogOpen(false)
      setNewDealer({ email: '', password: '', name: '', company_name: '', phone: '' })
      fetchDealers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create dealer')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteDealer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dealer?')) return

    const response = await fetch(`/api/admin/dealers?id=${id}`, { method: 'DELETE' })
    if (response.ok) {
      fetchDealers()
    }
  }

  const filteredDealers = dealers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    (d.company_name?.toLowerCase() || '').includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dealers</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Dealer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Dealer</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateDealer} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={newDealer.name}
                    onChange={(e) => setNewDealer({ ...newDealer, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={newDealer.email}
                    onChange={(e) => setNewDealer({ ...newDealer, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={newDealer.password}
                    onChange={(e) => setNewDealer({ ...newDealer, password: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={newDealer.company_name}
                    onChange={(e) => setNewDealer({ ...newDealer, company_name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newDealer.phone}
                    onChange={(e) => setNewDealer({ ...newDealer, phone: e.target.value })}
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Dealer'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dealers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filteredDealers.length === 0 ? (
              <p className="text-muted-foreground">No dealers found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.name}</TableCell>
                      <TableCell>{dealer.email}</TableCell>
                      <TableCell>{dealer.company_name || '-'}</TableCell>
                      <TableCell>{dealer.phone || '-'}</TableCell>
                      <TableCell>{new Date(dealer.created_at).toLocaleDateString('en-GB')}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDealer(dealer.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
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
