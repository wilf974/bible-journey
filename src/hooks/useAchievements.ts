import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { achievements, Achievement } from "@/data/achievements";
import { useVerseProgress } from "@/hooks/useVerseProgress";
import { bibleVerses } from "@/data/versesContent";
import { toast } from "sonner";

interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export const useAchievements = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { profile, addXP } = useUserProfile();
  const { verseProgress } = useVerseProgress();

  const { data: userAchievements = [], isLoading } = useQuery({
    queryKey: ["userAchievements", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data as UserAchievement[];
    },
    enabled: !!user?.id,
  });

  const isUnlocked = (achievementId: string) => {
    return userAchievements.some((ua) => ua.achievement_id === achievementId);
  };

  const getUnlockedAt = (achievementId: string) => {
    const ua = userAchievements.find((ua) => ua.achievement_id === achievementId);
    return ua?.unlocked_at;
  };

  const checkProgress = (achievement: Achievement): { current: number; target: number; percentage: number } => {
    const { type, value, categoryId } = achievement.requirement;

    let current = 0;

    switch (type) {
      case "verses_learned":
        current = verseProgress.filter((vp) => vp.mastery_level >= 3).length;
        break;
      case "streak_days":
        current = profile?.current_streak ?? 0;
        break;
      case "xp_earned":
        current = profile?.current_xp ?? 0;
        break;
      case "lessons_completed":
        current = profile?.total_lessons_completed ?? 0;
        break;
      case "perfect_reviews":
        // Count verses with 5 stars
        current = verseProgress.filter((vp) => vp.mastery_level >= 5).length;
        break;
      case "total_reviews":
        current = verseProgress.reduce((sum, vp) => sum + vp.times_practiced, 0);
        break;
      case "category_mastery":
        if (categoryId) {
          const categoryVerseIds = bibleVerses
            .filter((v) => v.category === categoryId)
            .map((v) => v.id);
          current = verseProgress.filter(
            (vp) => categoryVerseIds.includes(vp.verse_id) && vp.mastery_level >= 4
          ).length;
        }
        break;
    }

    return {
      current: Math.min(current, value),
      target: value,
      percentage: Math.min(100, Math.round((current / value) * 100)),
    };
  };

  const unlockAchievement = useMutation({
    mutationFn: async (achievementId: string) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_achievements")
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: async (_, achievementId) => {
      const achievement = achievements.find((a) => a.id === achievementId);
      if (achievement) {
        toast.success(`🏆 Badge débloqué: ${achievement.name}!`, {
          description: `+${achievement.xpReward} XP`,
        });
        await addXP.mutateAsync(achievement.xpReward);
      }
      queryClient.invalidateQueries({ queryKey: ["userAchievements"] });
    },
  });

  const checkAndUnlockAchievements = async () => {
    if (!user?.id) return;

    for (const achievement of achievements) {
      if (isUnlocked(achievement.id)) continue;

      const progress = checkProgress(achievement);
      if (progress.percentage >= 100) {
        try {
          await unlockAchievement.mutateAsync(achievement.id);
        } catch (error) {
          // Ignore duplicate key errors (already unlocked)
          console.error("Failed to unlock achievement:", error);
        }
      }
    }
  };

  const getAchievementsWithProgress = () => {
    return achievements.map((achievement) => ({
      ...achievement,
      unlocked: isUnlocked(achievement.id),
      unlockedAt: getUnlockedAt(achievement.id),
      progress: checkProgress(achievement),
    }));
  };

  return {
    userAchievements,
    achievements: getAchievementsWithProgress(),
    isLoading,
    isUnlocked,
    checkProgress,
    checkAndUnlockAchievements,
    unlockAchievement,
  };
};
