-- Public retail asking price, separate from the trade guide_price used for dealer bids.
-- A car only appears on the public "Cars For Sale" page once this is set (and status = 'available').
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS retail_price INTEGER;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS description TEXT;
