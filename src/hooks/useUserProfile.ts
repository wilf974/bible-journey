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
  lives_updated_at: string;
  manna: number;
  created_at: string;
  updated_at: string;
}

const LIFE_COST = 20; // Manna cost for 1 life

const REGEN_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes in milliseconds

// Calculate regenerated lives based on time passed
const calculateRegeneratedLives = (
  currentLives: number,
  maxLives: number,
  livesUpdatedAt: string
): { lives: number; shouldUpdate: boolean } => {
  if (currentLives >= maxLives) {
    return { lives: maxLives, shouldUpdate: false };
  }

  const lastUpdate = new Date(livesUpdatedAt).getTime();
  const now = Date.now();
  const timePassed = now - lastUpdate;
  const livesToRegen = Math.floor(timePassed / REGEN_INTERVAL_MS);

  if (livesToRegen > 0) {
    const newLives = Math.min(maxLives, currentLives + livesToRegen);
    return { lives: newLives, shouldUpdate: newLives !== currentLives };
  }

  return { lives: currentLives, shouldUpdate: false };
};

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
      
      if (data) {
        // Check if lives need regeneration
        const { lives: regenLives, shouldUpdate } = calculateRegeneratedLives(
          data.lives,
          data.max_lives,
          data.lives_updated_at
        );

        if (shouldUpdate) {
          // Update the database with regenerated lives
          await supabase
            .from("profiles")
            .update({ 
              lives: regenLives, 
              lives_updated_at: new Date().toISOString() 
            })
            .eq("user_id", user.id);
          
          return { ...data, lives: regenLives } as UserProfile;
        }
      }
      
      return data as UserProfile | null;
    },
    enabled: !!user?.id,
    refetchInterval: REGEN_INTERVAL_MS, // Refetch every 30 min to check regeneration
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
        .update({ 
          lives: newLives,
          lives_updated_at: new Date().toISOString() // Reset timer when lives change
        })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  const buyLife = useMutation({
    mutationFn: async () => {
      if (!user?.id || !profile) throw new Error("No user or profile");
      if (profile.manna < LIFE_COST) throw new Error("Not enough manna");
      if (profile.lives >= profile.max_lives) throw new Error("Lives already full");
      
      const { error } = await supabase
        .from("profiles")
        .update({ 
          lives: profile.lives + 1,
          manna: profile.manna - LIFE_COST,
          lives_updated_at: new Date().toISOString()
        })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  const addManna = useMutation({
    mutationFn: async (mannaAmount: number) => {
      if (!user?.id || !profile) throw new Error("No user or profile");
      
      const { error } = await supabase
        .from("profiles")
        .update({ manna: profile.manna + mannaAmount })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  // Helper to get time until next life regeneration
  const getTimeUntilNextLife = (): number | null => {
    if (!profile || profile.lives >= profile.max_lives) return null;
    
    const lastUpdate = new Date(profile.lives_updated_at).getTime();
    const now = Date.now();
    const timePassed = now - lastUpdate;
    const timeUntilNext = REGEN_INTERVAL_MS - (timePassed % REGEN_INTERVAL_MS);
    
    return timeUntilNext;
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    addXP,
    addManna,
    updateStreak,
    updateLives,
    buyLife,
    getTimeUntilNextLife,
  };
};
