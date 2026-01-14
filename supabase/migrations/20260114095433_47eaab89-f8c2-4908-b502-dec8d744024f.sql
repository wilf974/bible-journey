-- Table pour la progression des versets
CREATE TABLE public.verse_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  verse_id TEXT NOT NULL,
  mastery_level INTEGER NOT NULL DEFAULT 0,
  times_practiced INTEGER NOT NULL DEFAULT 0,
  times_correct INTEGER NOT NULL DEFAULT 0,
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  next_review_at TIMESTAMP WITH TIME ZONE,
  ease_factor NUMERIC(4,2) NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, verse_id)
);

-- Table pour les statistiques d'apprentissage
CREATE TABLE public.learning_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  stat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  verses_practiced INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  time_spent_minutes INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_answers INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, stat_date)
);

-- Enable RLS
ALTER TABLE public.verse_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for verse_progress
CREATE POLICY "Users can view their own verse progress"
ON public.verse_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verse progress"
ON public.verse_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verse progress"
ON public.verse_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for learning_stats
CREATE POLICY "Users can view their own learning stats"
ON public.learning_stats
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning stats"
ON public.learning_stats
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning stats"
ON public.learning_stats
FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_verse_progress_updated_at
BEFORE UPDATE ON public.verse_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_stats_updated_at
BEFORE UPDATE ON public.learning_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();