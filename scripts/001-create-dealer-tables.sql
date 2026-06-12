-- Dealers table (links to auth.users)
CREATE TABLE IF NOT EXISTS public.dealers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cars table
CREATE TABLE IF NOT EXISTS public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  guide_price INTEGER NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bids table
CREATE TABLE IF NOT EXISTS public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  dealer_id UUID NOT NULL REFERENCES public.dealers(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  dealer_id UUID NOT NULL REFERENCES public.dealers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('call', 'message')),
  message TEXT,
  handled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Dealers policies: dealers can only see their own profile
CREATE POLICY "dealers_select_own" ON public.dealers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "dealers_update_own" ON public.dealers FOR UPDATE USING (auth.uid() = id);

-- Cars policies: all authenticated users can view available cars
CREATE POLICY "cars_select_available" ON public.cars FOR SELECT USING (
  status = 'available' OR 
  auth.uid() IN (SELECT id FROM public.dealers WHERE id = auth.uid()) OR
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);

-- Admin can do everything with cars
CREATE POLICY "cars_admin_all" ON public.cars FOR ALL USING (
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);

-- Bids policies: dealers can view and create their own bids
CREATE POLICY "bids_select_own" ON public.bids FOR SELECT USING (
  dealer_id = auth.uid() OR
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);
CREATE POLICY "bids_insert_own" ON public.bids FOR INSERT WITH CHECK (dealer_id = auth.uid());

-- Admin can manage all bids
CREATE POLICY "bids_admin_all" ON public.bids FOR ALL USING (
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);

-- Enquiries policies: dealers can view and create their own enquiries
CREATE POLICY "enquiries_select_own" ON public.enquiries FOR SELECT USING (
  dealer_id = auth.uid() OR
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);
CREATE POLICY "enquiries_insert_own" ON public.enquiries FOR INSERT WITH CHECK (dealer_id = auth.uid());

-- Admin can manage all enquiries
CREATE POLICY "enquiries_admin_all" ON public.enquiries FOR ALL USING (
  (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cars_status ON public.cars(status);
CREATE INDEX IF NOT EXISTS idx_bids_car_id ON public.bids(car_id);
CREATE INDEX IF NOT EXISTS idx_bids_dealer_id ON public.bids(dealer_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_car_id ON public.enquiries(car_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_dealer_id ON public.enquiries(dealer_id);
