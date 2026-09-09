-- Products table for the dropship shop. price is stored in whole pounds,
-- same convention as cars.guide_price/retail_price.
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  supplier_notes TEXT,
  photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can see active products; admin can see everything.
CREATE POLICY "products_select_active" ON public.products FOR SELECT USING (
  status = 'active' OR
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);

-- Admin can manage all products.
CREATE POLICY "products_admin_all" ON public.products FOR ALL USING (
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);

CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
