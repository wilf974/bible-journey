-- Add manna currency to profiles table
ALTER TABLE public.profiles 
ADD COLUMN manna integer NOT NULL DEFAULT 50;

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.manna IS 'In-game currency (manna) used to purchase extra lives';