import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface VerseProgress {
  id: string;
  user_id: string;
  verse_id: string;
  mastery_level: number;
  times_practiced: number;
  times_correct: number;
  last_practiced_at: string | null;
  next_review_at: string | null;
  ease_factor: number;
  interval_days: number;
  created_at: string;
  updated_at: string;
}

// SM-2 Spaced Repetition Algorithm
const calculateNextReview = (
  quality: number, // 0-5 scale
  easeFactor: number,
  intervalDays: number
): { newEaseFactor: number; newInterval: number; nextReview: Date } => {
  // Minimum ease factor is 1.3
  let newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  let newInterval: number;

  if (quality < 3) {
    // Reset interval on failure
    newInterval = 1;
  } else if (intervalDays === 0) {
    newInterval = 1;
  } else if (intervalDays === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(intervalDays * newEaseFactor);
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return { newEaseFactor, newInterval, nextReview };
};

export const useVerseProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: verseProgress = [], isLoading } = useQuery({
    queryKey: ["verseProgress", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("verse_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data as VerseProgress[];
    },
    enabled: !!user?.id,
  });

  const getVerseProgress = (verseId: string) => {
    return verseProgress.find((vp) => vp.verse_id === verseId);
  };

  const getVersesToReview = () => {
    const now = new Date();
    return verseProgress.filter((vp) => {
      if (!vp.next_review_at) return true;
      return new Date(vp.next_review_at) <= now;
    });
  };

  const updateVerseProgress = useMutation({
    mutationFn: async ({
      verseId,
      wasCorrect,
      quality = wasCorrect ? 4 : 2,
    }: {
      verseId: string;
      wasCorrect: boolean;
      quality?: number;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");

      const existing = getVerseProgress(verseId);
      const now = new Date().toISOString();

      const easeFactor = existing?.ease_factor ?? 2.5;
      const intervalDays = existing?.interval_days ?? 0;
      
      const { newEaseFactor, newInterval, nextReview } = calculateNextReview(
        quality,
        easeFactor,
        intervalDays
      );

      const timesCorrect = (existing?.times_correct ?? 0) + (wasCorrect ? 1 : 0);
      const timesPracticed = (existing?.times_practiced ?? 0) + 1;
      
      // Calculate mastery level (0-5 stars)
      const masteryLevel = Math.min(5, Math.floor(timesCorrect / 2));

      if (existing) {
        const { data, error } = await supabase
          .from("verse_progress")
          .update({
            times_practiced: timesPracticed,
            times_correct: timesCorrect,
            mastery_level: masteryLevel,
            last_practiced_at: now,
            next_review_at: nextReview.toISOString(),
            ease_factor: newEaseFactor,
            interval_days: newInterval,
          })
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("verse_progress")
          .insert({
            user_id: user.id,
            verse_id: verseId,
            times_practiced: 1,
            times_correct: wasCorrect ? 1 : 0,
            mastery_level: wasCorrect ? 1 : 0,
            last_practiced_at: now,
            next_review_at: nextReview.toISOString(),
            ease_factor: newEaseFactor,
            interval_days: newInterval,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verseProgress"] });
    },
  });

  return {
    verseProgress,
    isLoading,
    getVerseProgress,
    getVersesToReview,
    updateVerseProgress,
  };
};
