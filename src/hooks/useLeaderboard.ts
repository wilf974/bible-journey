import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardEntry {
  id: string;
  user_id: string;
  week_start: string;
  xp_earned: number;
  lessons_completed: number;
  perfect_lessons: number;
  display_name?: string;
  avatar_url?: string;
}

const getWeekStart = (): string => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
};

export const useLeaderboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const weekStart = getWeekStart();

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard", weekStart],
    queryFn: async () => {
      const { data: entries, error } = await supabase
        .from("leaderboard_entries")
        .select("*")
        .eq("week_start", weekStart)
        .order("xp_earned", { ascending: false })
        .limit(50);

      if (error) throw error;

      // Fetch display names for all users
      const userIds = entries.map(e => e.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) ?? []);

      return entries.map(entry => ({
        ...entry,
        display_name: profileMap.get(entry.user_id)?.display_name || "Anonyme",
        avatar_url: profileMap.get(entry.user_id)?.avatar_url,
      })) as LeaderboardEntry[];
    },
  });

  const { data: userEntry } = useQuery({
    queryKey: ["leaderboardEntry", user?.id, weekStart],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("leaderboard_entries")
        .select("*")
        .eq("user_id", user.id)
        .eq("week_start", weekStart)
        .maybeSingle();

      if (error) throw error;
      return data as LeaderboardEntry | null;
    },
    enabled: !!user?.id,
  });

  const updateEntry = useMutation({
    mutationFn: async ({ 
      xpIncrement = 0, 
      lessonIncrement = 0, 
      perfectIncrement = 0 
    }: { 
      xpIncrement?: number; 
      lessonIncrement?: number; 
      perfectIncrement?: number 
    }) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data: existing } = await supabase
        .from("leaderboard_entries")
        .select("*")
        .eq("user_id", user.id)
        .eq("week_start", weekStart)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("leaderboard_entries")
          .update({
            xp_earned: existing.xp_earned + xpIncrement,
            lessons_completed: existing.lessons_completed + lessonIncrement,
            perfect_lessons: existing.perfect_lessons + perfectIncrement,
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("leaderboard_entries")
          .insert({
            user_id: user.id,
            week_start: weekStart,
            xp_earned: xpIncrement,
            lessons_completed: lessonIncrement,
            perfect_lessons: perfectIncrement,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboardEntry"] });
    },
  });

  const getUserRank = (): number | null => {
    if (!user?.id || !leaderboard) return null;
    const index = leaderboard.findIndex(e => e.user_id === user.id);
    return index >= 0 ? index + 1 : null;
  };

  return {
    leaderboard,
    userEntry,
    isLoading,
    updateEntry,
    getUserRank,
    weekStart,
  };
};
