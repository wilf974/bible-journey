-- =============================================
-- Bible Journey Database Schema
-- =============================================

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  current_xp INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  total_lessons_completed INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  lives INTEGER NOT NULL DEFAULT 5,
  max_lives INTEGER NOT NULL DEFAULT 5,
  lives_updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  manna INTEGER NOT NULL DEFAULT 50,
  pvp_wins INTEGER NOT NULL DEFAULT 0,
  pvp_losses INTEGER NOT NULL DEFAULT 0,
  pvp_draws INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  book_id TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  score INTEGER,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create daily_goals table
CREATE TABLE IF NOT EXISTS public.daily_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_xp INTEGER NOT NULL DEFAULT 50,
  earned_xp INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(user_id, goal_date)
);

-- Create verse_progress table
CREATE TABLE IF NOT EXISTS public.verse_progress (
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

-- Create learning_stats table
CREATE TABLE IF NOT EXISTS public.learning_stats (
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

-- Create power_ups table
CREATE TABLE IF NOT EXISTS public.power_ups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  power_up_type TEXT NOT NULL CHECK (power_up_type IN ('double_xp', 'shield', 'hint', 'freeze')),
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, power_up_type)
);

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS public.daily_challenges (
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

-- Create leaderboard_entries table
CREATE TABLE IF NOT EXISTS public.leaderboard_entries (
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

-- Create player_challenges table
CREATE TABLE IF NOT EXISTS public.player_challenges (
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

-- =============================================
-- Enable RLS on all tables
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verse_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.power_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_challenges ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies
-- =============================================

-- Profiles - Allow all authenticated users to view (for leaderboard)
CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- User progress
CREATE POLICY "Users can view their own progress"
ON public.user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- User achievements
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily goals
CREATE POLICY "Users can view their own daily goals"
ON public.daily_goals FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily goals"
ON public.daily_goals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily goals"
ON public.daily_goals FOR UPDATE USING (auth.uid() = user_id);

-- Verse progress
CREATE POLICY "Users can view their own verse progress"
ON public.verse_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verse progress"
ON public.verse_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verse progress"
ON public.verse_progress FOR UPDATE USING (auth.uid() = user_id);

-- Learning stats
CREATE POLICY "Users can view their own learning stats"
ON public.learning_stats FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning stats"
ON public.learning_stats FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning stats"
ON public.learning_stats FOR UPDATE USING (auth.uid() = user_id);

-- Power ups
CREATE POLICY "Users can view their own power-ups"
ON public.power_ups FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own power-ups"
ON public.power_ups FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own power-ups"
ON public.power_ups FOR UPDATE USING (auth.uid() = user_id);

-- Daily challenges
CREATE POLICY "Users can view their own daily challenges"
ON public.daily_challenges FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily challenges"
ON public.daily_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily challenges"
ON public.daily_challenges FOR UPDATE USING (auth.uid() = user_id);

-- Leaderboard entries (public view)
CREATE POLICY "Anyone can view leaderboard entries"
ON public.leaderboard_entries FOR SELECT USING (true);

CREATE POLICY "Users can insert their own leaderboard entries"
ON public.leaderboard_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leaderboard entries"
ON public.leaderboard_entries FOR UPDATE USING (auth.uid() = user_id);

-- Player challenges
CREATE POLICY "Users can view their own challenges"
ON public.player_challenges FOR SELECT
USING (auth.uid() = challenger_id OR auth.uid() = opponent_id OR status = 'waiting');

CREATE POLICY "Users can create challenges"
ON public.player_challenges FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Participants can update challenges"
ON public.player_challenges FOR UPDATE
USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

-- =============================================
-- Functions and Triggers
-- =============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_verse_progress_updated_at
BEFORE UPDATE ON public.verse_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_stats_updated_at
BEFORE UPDATE ON public.learning_stats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_power_ups_updated_at
BEFORE UPDATE ON public.power_ups
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leaderboard_entries_updated_at
BEFORE UPDATE ON public.leaderboard_entries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_player_challenges_updated_at
BEFORE UPDATE ON public.player_challenges
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
