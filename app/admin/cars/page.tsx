'use client'

import { useEffect, useState, useRef } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Search, ImagePlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Car = {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  guide_price: number
  status: 'available' | 'sold' | 'pending'
  notes: string | null
  photos: string[] | null
  created_at: string
}

type CarForm = {
  make: string
  model: string
  year: string
  mileage: string
  guide_price: string
  status: string
  notes: string
}

const emptyCarForm: CarForm = { make: '', model: '', year: '', mileage: '', guide_price: '', status: 'available', notes: '' }

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [carForm, setCarForm] = useState<CarForm>(emptyCarForm)
  const [photos, setPhotos] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    try {
      const res = await fetch('/api/admin/check-auth')
      if (!res.ok) {
        router.push('/admin/login')
        return
      }
      fetchCars()
    } catch {
      router.push('/admin/login')
    }
  }

  const fetchCars = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/cars')
      if (res.ok) {
        const data = await res.json()
        setCars(data.cars || [])
      }
    } catch (err) {
      console.error('Failed to fetch cars:', err)
    }
    setIsLoading(false)
  }

  const openAddDialog = () => {
    setEditingCar(null)
    setCarForm(emptyCarForm)
    setPhotos([])
    setError(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (car: Car) => {
    setEditingCar(car)
    setCarForm({
      make: car.make,
      model: car.model,
      year: car.year.toString(),
      mileage: car.mileage.toString(),
      guide_price: car.guide_price.toString(),
      status: car.status,
      notes: car.notes || '',
    })
    setPhotos(car.photos || [])
    setError(null)
    setIsDialogOpen(true)
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploadingPhoto(true)
    
    for (const file of Array.from(files)) {
      if (photos.length >= 10) break
      
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const res = await fetch('/api/admin/upload-photo', {
          method: 'POST',
          body: formData,
        })
        
        if (res.ok) {
          const { url } = await res.json()
          setPhotos(prev => [...prev, url])
        }
      } catch (err) {
        console.error('Failed to upload photo:', err)
      }
    }
    
    setIsUploadingPhoto(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    const carData = {
      make: carForm.make,
      model: carForm.model,
      year: parseInt(carForm.year),
      mileage: parseInt(carForm.mileage),
      guide_price: parseInt(carForm.guide_price),
      status: carForm.status,
      notes: carForm.notes || null,
      photos: photos.length > 0 ? photos : null,
    }

    try {
      const res = await fetch('/api/admin/cars', {
        method: editingCar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCar ? { ...carData, id: editingCar.id } : carData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save car')
      }

      setIsDialogOpen(false)
      fetchCars()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save car')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return

    try {
      const res = await fetch(`/api/admin/cars?id=${id}`, { method: 'DELETE' })
      if (res.ok) fetchCars()
    } catch (err) {
      console.error('Failed to delete car:', err)
    }
  }

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || car.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      available: 'default',
      pending: 'secondary',
      sold: 'destructive',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Cars</h1>
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Car
          </Button>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/80" onClick={() => setIsDialogOpen(false)} />
            <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border rounded-lg p-6 mx-4">
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
              <h2 className="text-lg font-semibold mb-4">{editingCar ? 'Edit Car' : 'Add New Car'}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="make">Make *</Label>
                    <Input
                      id="make"
                      required
                      placeholder="e.g. Ford"
                      value={carForm.make}
                      onChange={(e) => setCarForm({ ...carForm, make: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      required
                      placeholder="e.g. Focus"
                      value={carForm.model}
                      onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      type="number"
                      required
                      min="1900"
                      max="2030"
                      placeholder="e.g. 2020"
                      value={carForm.year}
                      onChange={(e) => setCarForm({ ...carForm, year: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="mileage">Mileage *</Label>
                    <Input
                      id="mileage"
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 45000"
                      value={carForm.mileage}
                      onChange={(e) => setCarForm({ ...carForm, mileage: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="guide_price">Guide Price (£) *</Label>
                    <Input
                      id="guide_price"
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 8500"
                      value={carForm.guide_price}
                      onChange={(e) => setCarForm({ ...carForm, guide_price: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={carForm.status}
                      onValueChange={(value) => setCarForm({ ...carForm, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Any additional notes..."
                    value={carForm.notes}
                    onChange={(e) => setCarForm({ ...carForm, notes: e.target.value })}
                  />
                </div>
                
                {/* Photo Upload Section */}
                <div className="flex flex-col gap-2">
                  <Label>Photos (up to 10)</Label>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Car photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 10 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center hover:border-primary transition-colors disabled:opacity-50"
                      >
                        {isUploadingPhoto ? (
                          <span className="text-xs">...</span>
                        ) : (
                          <ImagePlus className="h-6 w-6 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : (editingCar ? 'Update Car' : 'Add Car')}
                </Button>
              </form>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by make or model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filteredCars.length === 0 ? (
              <p className="text-muted-foreground">No cars found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left font-medium">Photo</th>
                      <th className="h-12 px-4 text-left font-medium">Make</th>
                      <th className="h-12 px-4 text-left font-medium">Model</th>
                      <th className="h-12 px-4 text-left font-medium">Year</th>
                      <th className="h-12 px-4 text-left font-medium">Mileage</th>
                      <th className="h-12 px-4 text-left font-medium">Guide Price</th>
                      <th className="h-12 px-4 text-left font-medium">Status</th>
                      <th className="h-12 px-4 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCars.map((car) => (
                      <tr key={car.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          {car.photos && car.photos.length > 0 ? (
                            <img src={car.photos[0]} alt={`${car.make} ${car.model}`} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              <ImagePlus className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-medium">{car.make}</td>
                        <td className="p-4">{car.model}</td>
                        <td className="p-4">{car.year}</td>
                        <td className="p-4">{car.mileage.toLocaleString()}</td>
                        <td className="p-4">£{car.guide_price.toLocaleString()}</td>
                        <td className="p-4">{getStatusBadge(car.status)}</td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(car)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(car.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
