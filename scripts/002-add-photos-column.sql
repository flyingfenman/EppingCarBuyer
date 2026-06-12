-- Add photos column to cars table
ALTER TABLE cars ADD COLUMN IF NOT EXISTS photos TEXT[];
