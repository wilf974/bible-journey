-- Add column to track when lives were last updated for regeneration
ALTER TABLE public.profiles 
ADD COLUMN lives_updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();