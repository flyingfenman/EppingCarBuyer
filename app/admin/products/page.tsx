'use client'

import { useEffect, useState, useRef } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Search, ImagePlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Product = {
  id: string
  name: string
  description: string | null
  price: number
  status: 'active' | 'inactive'
  supplier_notes: string | null
  photos: string[] | null
  created_at: string
}

type ProductForm = {
  name: string
  description: string
  price: string
  status: string
  supplier_notes: string
}

const emptyProductForm: ProductForm = { name: '', description: '', price: '', status: 'active', supplier_notes: '' }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState<ProductForm>(emptyProductForm)
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
      fetchProducts()
    } catch {
      router.push('/admin/login')
    }
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
    setIsLoading(false)
  }

  const openAddDialog = () => {
    setEditingProduct(null)
    setProductForm(emptyProductForm)
    setPhotos([])
    setError(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      status: product.status,
      supplier_notes: product.supplier_notes || '',
    })
    setPhotos(product.photos || [])
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

    const productData = {
      name: productForm.name,
      description: productForm.description || null,
      price: parseInt(productForm.price),
      status: productForm.status,
      supplier_notes: productForm.supplier_notes || null,
      photos: photos.length > 0 ? photos : null,
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct ? { ...productData, id: editingProduct.id } : productData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save product')
      }

      setIsDialogOpen(false)
      fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
      if (res.ok) fetchProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'active' ? 'default' : 'secondary'}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Shop Products</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Only &quot;Active&quot; products show on the public /shop page.
            </p>
          </div>
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
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
              <h2 className="text-lg font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="e.g. Microfibre Car Cleaning Kit"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Price (£) *</Label>
                    <Input
                      id="price"
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 25"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">What the customer pays, in full.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={productForm.status}
                      onValueChange={(value) => setProductForm({ ...productForm, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Public Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What it is, what's included, why it's worth buying..."
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="supplier_notes">Supplier Notes (internal only)</Label>
                  <Input
                    id="supplier_notes"
                    placeholder="Where you source this from, supplier SKU/link..."
                    value={productForm.supplier_notes}
                    onChange={(e) => setProductForm({ ...productForm, supplier_notes: e.target.value })}
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
                          alt={`Product photo ${index + 1}`}
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
                  {isSaving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
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
                  placeholder="Search by name..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-muted-foreground">No products found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left font-medium">Photo</th>
                      <th className="h-12 px-4 text-left font-medium">Name</th>
                      <th className="h-12 px-4 text-left font-medium">Price</th>
                      <th className="h-12 px-4 text-left font-medium">Status</th>
                      <th className="h-12 px-4 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          {product.photos && product.photos.length > 0 ? (
                            <img src={product.photos[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              <ImagePlus className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4">£{product.price.toLocaleString()}</td>
                        <td className="p-4">{getStatusBadge(product.status)}</td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
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
