-- Create power_ups table for tracking user power-ups
CREATE TABLE public.power_ups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  power_up_type TEXT NOT NULL CHECK (power_up_type IN ('double_xp', 'shield', 'hint', 'freeze')),
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, power_up_type)
);

-- Create daily_challenges table for daily objectives
CREATE TABLE public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('lessons', 'xp', 'streak', 'perfect')),
  target_value INTEGER NOT NULL,
  current_value INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  reward_xp INTEGER NOT NULL DEFAULT 0,
  reward_manna INTEGER NOT NULL DEFAULT 0,
  claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_date, challenge_type)
);

-- Create leaderboard_entries table for weekly rankings
CREATE TABLE public.leaderboard_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week_start DATE NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  perfect_lessons INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start)
);

-- Enable RLS on all tables
ALTER TABLE public.power_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for power_ups
CREATE POLICY "Users can view their own power-ups"
ON public.power_ups FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own power-ups"
ON public.power_ups FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own power-ups"
ON public.power_ups FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for daily_challenges
CREATE POLICY "Users can view their own daily challenges"
ON public.daily_challenges FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily challenges"
ON public.daily_challenges FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily challenges"
ON public.daily_challenges FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for leaderboard_entries (everyone can view for rankings)
CREATE POLICY "Anyone can view leaderboard entries"
ON public.leaderboard_entries FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own leaderboard entries"
ON public.leaderboard_entries FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leaderboard entries"
ON public.leaderboard_entries FOR UPDATE
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_power_ups_updated_at
BEFORE UPDATE ON public.power_ups
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leaderboard_entries_updated_at
BEFORE UPDATE ON public.leaderboard_entries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();