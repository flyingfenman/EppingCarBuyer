'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DealerNav } from '@/components/dealer/dealer-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { ArrowLeft, Phone, MessageSquare, Banknote } from 'lucide-react'
import Link from 'next/link'

type Car = {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  guide_price: number
  status: string
  notes: string | null
}

export default function CarDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [car, setCar] = useState<Car | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  
  // Bid state
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [isBidding, setIsBidding] = useState(false)
  const [bidError, setBidError] = useState<string | null>(null)
  const [bidSuccess, setBidSuccess] = useState(false)
  
  // Message state
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState(false)

  // Call state
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false)
  const [callSuccess, setCallSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    checkAuthAndFetch()
  }, [params.id])

  const checkAuthAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/dealer/login')
      return
    }
    setUserId(user.id)
    fetchCar()
  }

  const fetchCar = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('cars')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (data) {
      setCar(data)
    }
    setIsLoading(false)
  }

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !car) return
    
    setIsBidding(true)
    setBidError(null)

    const { error } = await supabase.from('bids').insert({
      car_id: car.id,
      dealer_id: userId,
      amount: parseInt(bidAmount),
    })

    if (error) {
      setBidError(error.message)
    } else {
      setBidSuccess(true)
      setTimeout(() => {
        setIsBidDialogOpen(false)
        setBidSuccess(false)
        setBidAmount('')
      }, 2000)
    }
    setIsBidding(false)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !car) return
    
    setIsSendingMessage(true)

    const { error } = await supabase.from('enquiries').insert({
      car_id: car.id,
      dealer_id: userId,
      type: 'message',
      message: message,
    })

    if (!error) {
      setMessageSuccess(true)
      setTimeout(() => {
        setIsMessageDialogOpen(false)
        setMessageSuccess(false)
        setMessage('')
      }, 2000)
    }
    setIsSendingMessage(false)
  }

  const handleRequestCall = async () => {
    if (!userId || !car) return

    const { error } = await supabase.from('enquiries').insert({
      car_id: car.id,
      dealer_id: userId,
      type: 'call',
    })

    if (!error) {
      setCallSuccess(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <DealerNav />
        <main className="container mx-auto p-6">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-muted/30">
        <DealerNav />
        <main className="container mx-auto p-6">
          <p className="text-muted-foreground">Car not found</p>
          <Link href="/dealer/dashboard">
            <Button variant="link" className="px-0 mt-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DealerNav />
      <main className="container mx-auto p-6">
        <Link href="/dealer/dashboard">
          <Button variant="ghost" className="mb-6 px-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all cars
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {car.year} {car.make} {car.model}
              </CardTitle>
              <CardDescription>Vehicle details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Make</span>
                  <span className="font-medium">{car.make}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">{car.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Mileage</span>
                  <span className="font-medium">{car.mileage.toLocaleString()} miles</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Guide Price</span>
                  <span className="font-bold text-xl">£{car.guide_price.toLocaleString()}</span>
                </div>
                {car.notes && (
                  <div className="pt-4 border-t">
                    <span className="text-muted-foreground text-sm">Notes</span>
                    <p className="mt-1">{car.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interested in this car?</CardTitle>
              <CardDescription>Make an offer or get in touch</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Make an Offer */}
              <Dialog open={isBidDialogOpen} onOpenChange={setIsBidDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Banknote className="h-5 w-5 mr-2" />
                    Make an Offer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make an Offer</DialogTitle>
                    <DialogDescription>
                      Submit your offer for the {car.year} {car.make} {car.model}
                    </DialogDescription>
                  </DialogHeader>
                  {bidSuccess ? (
                    <div className="py-8 text-center">
                      <p className="text-green-600 font-medium">Offer submitted successfully!</p>
                      <p className="text-sm text-muted-foreground mt-1">We will review and get back to you.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitBid} className="flex flex-col gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Guide price: <span className="font-medium">£{car.guide_price.toLocaleString()}</span>
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="amount">Your Offer (£)</Label>
                        <Input
                          id="amount"
                          type="number"
                          required
                          min="1"
                          placeholder="Enter your offer amount"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                      </div>
                      {bidError && <p className="text-sm text-destructive">{bidError}</p>}
                      <Button type="submit" disabled={isBidding}>
                        {isBidding ? 'Submitting...' : 'Submit Offer'}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              {/* Call Henry */}
              <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Henry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact by Phone</DialogTitle>
                    <DialogDescription>
                      Request a callback about the {car.year} {car.make} {car.model}
                    </DialogDescription>
                  </DialogHeader>
                  {callSuccess ? (
                    <div className="py-8 text-center">
                      <p className="text-green-600 font-medium">Call request submitted!</p>
                      <p className="text-sm text-muted-foreground mt-1">Henry will call you back soon.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="text-center py-4">
                        <p className="text-2xl font-bold">07XXX XXXXXX</p>
                        <p className="text-sm text-muted-foreground mt-1">Available Mon-Sat, 9am-6pm</p>
                      </div>
                      <Button onClick={handleRequestCall}>
                        Request Callback
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Send Message */}
              <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send a Message</DialogTitle>
                    <DialogDescription>
                      Ask a question about the {car.year} {car.make} {car.model}
                    </DialogDescription>
                  </DialogHeader>
                  {messageSuccess ? (
                    <div className="py-8 text-center">
                      <p className="text-green-600 font-medium">Message sent successfully!</p>
                      <p className="text-sm text-muted-foreground mt-1">We will respond as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Type your question or message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <Button type="submit" disabled={isSendingMessage}>
                        {isSendingMessage ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
