import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  current_xp: number;
  current_level: number;
  total_lessons_completed: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  lives: number;
  max_lives: number;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as UserProfile | null;
    },
    enabled: !!user?.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user?.id) throw new Error("No user");
      
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  const addXP = useMutation({
    mutationFn: async (xpAmount: number) => {
      if (!user?.id || !profile) throw new Error("No user or profile");
      
      const newXP = profile.current_xp + xpAmount;
      const levelXPRequirement = profile.current_level * 500;
      const newLevel = newXP >= levelXPRequirement ? profile.current_level + 1 : profile.current_level;
      
      const { error } = await supabase
        .from("profiles")
        .update({
          current_xp: newXP,
          current_level: newLevel,
          last_activity_date: new Date().toISOString().split('T')[0],
        })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  const updateStreak = useMutation({
    mutationFn: async () => {
      if (!user?.id || !profile) throw new Error("No user or profile");
      
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = profile.last_activity_date;
      
      let newStreak = profile.current_streak;
      
      if (lastActivity) {
        const lastDate = new Date(lastActivity);
        const todayDate = new Date(today);
        const diffTime = todayDate.getTime() - lastDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = profile.current_streak + 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      const longestStreak = Math.max(newStreak, profile.longest_streak);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_activity_date: today,
        })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  const updateLives = useMutation({
    mutationFn: async (livesChange: number) => {
      if (!user?.id || !profile) throw new Error("No user or profile");
      
      const newLives = Math.max(0, Math.min(profile.max_lives, profile.lives + livesChange));
      
      const { error } = await supabase
        .from("profiles")
        .update({ lives: newLives })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    addXP,
    updateStreak,
    updateLives,
  };
};
