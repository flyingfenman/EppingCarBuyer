'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin/admin-nav'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'

type Subscriber = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  created_at: string
  unsubscribed: boolean
}

type State =
  | { kind: 'loading' }
  | { kind: 'not-ready' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; subscribers: Subscriber[] }

export default function AdminNewsletterPage() {
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/newsletter', { cache: 'no-store' })
      .then(async (res) => {
        if (res.status === 401) return router.push('/admin/login')
        const data = await res.json()
        if (!res.ok) return setState({ kind: 'error', message: data.error || 'Could not load the list' })
        setState(data.ready ? { kind: 'loaded', subscribers: data.subscribers } : { kind: 'not-ready' })
      })
      .catch(() => setState({ kind: 'error', message: 'Could not load the list' }))
  }, [router])

  const subscribers = state.kind === 'loaded' ? state.subscribers : []
  const active = subscribers.filter((s) => !s.unsubscribed).length
  const shown = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return subscribers
    return subscribers.filter((s) =>
      [s.email, s.first_name, s.last_name].some((v) => v?.toLowerCase().includes(q)),
    )
  }, [subscribers, search])

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground">
            Everyone on the Epping &amp; Stamford Database list in Resend. People only appear here once they have
            confirmed their signup.
          </p>
        </div>

        {state.kind === 'loading' && <p className="text-muted-foreground">Loading…</p>}

        {state.kind === 'not-ready' && (
          <Card>
            <CardContent className="py-6">
              The list can&apos;t be read yet. It needs the full-access Resend key saved on the Worker as{' '}
              <code>RESEND_CONTACTS_API_KEY</code>. The website signup switches on at the same time.
            </CardContent>
          </Card>
        )}

        {state.kind === 'error' && (
          <Card>
            <CardContent className="py-6 text-red-700">{state.message}</CardContent>
          </Card>
        )}

        {state.kind === 'loaded' && (
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>
                {active} subscribed{subscribers.length > active ? `, ${subscribers.length - active} unsubscribed` : ''}
              </CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent>
              {shown.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  {subscribers.length === 0 ? 'Nobody has signed up yet.' : 'No matches.'}
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shown.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{[s.first_name, s.last_name].filter(Boolean).join(' ') || '-'}</TableCell>
                        <TableCell>{s.email}</TableCell>
                        <TableCell>
                          {new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell>
                          {s.unsubscribed ? <Badge variant="secondary">Unsubscribed</Badge> : <Badge>Subscribed</Badge>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
