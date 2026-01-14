import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LearningStats {
  id: string;
  user_id: string;
  stat_date: string;
  lessons_completed: number;
  verses_practiced: number;
  xp_earned: number;
  time_spent_minutes: number;
  correct_answers: number;
  total_answers: number;
  created_at: string;
  updated_at: string;
}

export const useLearningStats = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const today = new Date().toISOString().split("T")[0];

  const { data: todayStats, isLoading: isLoadingToday } = useQuery({
    queryKey: ["learningStats", "today", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("learning_stats")
        .select("*")
        .eq("user_id", user.id)
        .eq("stat_date", today)
        .maybeSingle();

      if (error) throw error;
      return data as LearningStats | null;
    },
    enabled: !!user?.id,
  });

  const { data: weeklyStats = [], isLoading: isLoadingWeekly } = useQuery({
    queryKey: ["learningStats", "weekly", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("learning_stats")
        .select("*")
        .eq("user_id", user.id)
        .gte("stat_date", weekAgo.toISOString().split("T")[0])
        .order("stat_date", { ascending: true });

      if (error) throw error;
      return data as LearningStats[];
    },
    enabled: !!user?.id,
  });

  const { data: allTimeStats, isLoading: isLoadingAllTime } = useQuery({
    queryKey: ["learningStats", "allTime", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("learning_stats")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      // Aggregate all stats
      const stats = data as LearningStats[];
      return {
        totalLessons: stats.reduce((sum, s) => sum + s.lessons_completed, 0),
        totalVersesPracticed: stats.reduce((sum, s) => sum + s.verses_practiced, 0),
        totalXP: stats.reduce((sum, s) => sum + s.xp_earned, 0),
        totalTimeMinutes: stats.reduce((sum, s) => sum + s.time_spent_minutes, 0),
        totalCorrect: stats.reduce((sum, s) => sum + s.correct_answers, 0),
        totalAnswers: stats.reduce((sum, s) => sum + s.total_answers, 0),
        daysActive: stats.length,
      };
    },
    enabled: !!user?.id,
  });

  const updateStats = useMutation({
    mutationFn: async ({
      lessonsCompleted = 0,
      versesPracticed = 0,
      xpEarned = 0,
      timeSpentMinutes = 0,
      correctAnswers = 0,
      totalAnswers = 0,
    }: {
      lessonsCompleted?: number;
      versesPracticed?: number;
      xpEarned?: number;
      timeSpentMinutes?: number;
      correctAnswers?: number;
      totalAnswers?: number;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");

      if (todayStats) {
        const { data, error } = await supabase
          .from("learning_stats")
          .update({
            lessons_completed: todayStats.lessons_completed + lessonsCompleted,
            verses_practiced: todayStats.verses_practiced + versesPracticed,
            xp_earned: todayStats.xp_earned + xpEarned,
            time_spent_minutes: todayStats.time_spent_minutes + timeSpentMinutes,
            correct_answers: todayStats.correct_answers + correctAnswers,
            total_answers: todayStats.total_answers + totalAnswers,
          })
          .eq("id", todayStats.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("learning_stats")
          .insert({
            user_id: user.id,
            stat_date: today,
            lessons_completed: lessonsCompleted,
            verses_practiced: versesPracticed,
            xp_earned: xpEarned,
            time_spent_minutes: timeSpentMinutes,
            correct_answers: correctAnswers,
            total_answers: totalAnswers,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learningStats"] });
    },
  });

  return {
    todayStats,
    weeklyStats,
    allTimeStats,
    isLoading: isLoadingToday || isLoadingWeekly || isLoadingAllTime,
    updateStats,
  };
};
