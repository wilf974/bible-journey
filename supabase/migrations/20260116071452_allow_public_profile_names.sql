-- Allow authenticated users to see other users' display names and avatars
-- This is needed for the leaderboard to show player names instead of "Anonyme"

-- Drop the old restrictive policy that only allowed viewing own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Add policy to allow all authenticated users to read profile info
-- This enables the leaderboard to display real player names
CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);
