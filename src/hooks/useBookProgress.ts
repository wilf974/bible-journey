import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ChapterProgress {
  book_id: string;
  chapter_id: string;
  lesson_id: string;
  completed: boolean;
  score: number | null;
  xp_earned: number;
  completed_at: string | null;
}

export const useBookProgress = (bookId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all progress for a specific book
  const { data: bookProgress, isLoading } = useQuery({
    queryKey: ["bookProgress", bookId, user?.id],
    queryFn: async () => {
      if (!user?.id || !bookId) return [];
      
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("book_id", bookId);
      
      if (error) throw error;
      return data as ChapterProgress[];
    },
    enabled: !!user?.id && !!bookId,
  });

  // Fetch all user progress (for dashboard stats)
  const { data: allProgress } = useQuery({
    queryKey: ["allProgress", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("completed", true);
      
      if (error) throw error;
      return data as ChapterProgress[];
    },
    enabled: !!user?.id,
  });

  // Save lesson progress
  const saveProgress = useMutation({
    mutationFn: async ({
      bookId,
      chapterId,
      lessonId,
      score,
      xpEarned,
    }: {
      bookId: string;
      chapterId: string;
      lessonId: string;
      score: number;
      xpEarned: number;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");

      // Check if progress exists
      const { data: existing } = await supabase
        .from("user_progress")
        .select("id, score")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .single();

      if (existing) {
        // Update if new score is better
        if (score > (existing.score || 0)) {
          const { error } = await supabase
            .from("user_progress")
            .update({
              score,
              xp_earned: xpEarned,
              completed: true,
              completed_at: new Date().toISOString(),
            })
            .eq("id", existing.id);
          
          if (error) throw error;
        }
      } else {
        // Insert new progress
        const { error } = await supabase
          .from("user_progress")
          .insert({
            user_id: user.id,
            book_id: bookId,
            chapter_id: chapterId,
            lesson_id: lessonId,
            score,
            xp_earned: xpEarned,
            completed: true,
            completed_at: new Date().toISOString(),
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookProgress"] });
      queryClient.invalidateQueries({ queryKey: ["allProgress"] });
    },
  });

  // Get completed chapters for a book
  const getCompletedChapters = (bookId: string): number[] => {
    if (!allProgress) return [];
    return allProgress
      .filter((p) => p.book_id === bookId && p.completed)
      .map((p) => parseInt(p.chapter_id))
      .filter((n) => !isNaN(n));
  };

  // Check if a specific chapter is completed
  const isChapterCompleted = (chapterId: string): boolean => {
    if (!bookProgress) return false;
    return bookProgress.some((p) => p.chapter_id === chapterId && p.completed);
  };

  // Get stats for dashboard
  const getStats = () => {
    if (!allProgress) return { booksStarted: 0, chaptersCompleted: 0, totalXp: 0 };
    
    const uniqueBooks = new Set(allProgress.map((p) => p.book_id));
    const totalXp = allProgress.reduce((sum, p) => sum + p.xp_earned, 0);
    
    return {
      booksStarted: uniqueBooks.size,
      chaptersCompleted: allProgress.length,
      totalXp,
    };
  };

  return {
    bookProgress,
    allProgress,
    isLoading,
    saveProgress,
    getCompletedChapters,
    isChapterCompleted,
    getStats,
  };
};
