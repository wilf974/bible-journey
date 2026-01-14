-- Create player_challenges table for PvP battles
CREATE TABLE public.player_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID NOT NULL,
  opponent_id UUID,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
  book_id TEXT,
  chapter INTEGER,
  challenger_score INTEGER NOT NULL DEFAULT 0,
  opponent_score INTEGER NOT NULL DEFAULT 0,
  challenger_answers INTEGER NOT NULL DEFAULT 0,
  opponent_answers INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 5,
  current_question INTEGER NOT NULL DEFAULT 0,
  winner_id UUID,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  manna_reward INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.player_challenges ENABLE ROW LEVEL SECURITY;

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_challenges;

-- RLS policies - players can see challenges they're part of
CREATE POLICY "Users can view their own challenges"
ON public.player_challenges FOR SELECT
USING (auth.uid() = challenger_id OR auth.uid() = opponent_id OR status = 'waiting');

CREATE POLICY "Users can create challenges"
ON public.player_challenges FOR INSERT
WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Participants can update challenges"
ON public.player_challenges FOR UPDATE
USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

-- Trigger for updated_at
CREATE TRIGGER update_player_challenges_updated_at
BEFORE UPDATE ON public.player_challenges
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add win/loss stats to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS pvp_wins INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS pvp_losses INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS pvp_draws INTEGER NOT NULL DEFAULT 0;