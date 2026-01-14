import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type ChallengeType = "lessons" | "xp" | "streak" | "perfect";

interface DailyChallenge {
  id: string;
  user_id: string;
  challenge_date: string;
  challenge_type: ChallengeType;
  target_value: number;
  current_value: number;
  completed: boolean;
  reward_xp: number;
  reward_manna: number;
  claimed: boolean;
}

const CHALLENGE_CONFIGS: Record<ChallengeType, { name: string; icon: string; unit: string }> = {
  lessons: { name: "Terminer des leçons", icon: "📚", unit: "leçon(s)" },
  xp: { name: "Gagner de l'XP", icon: "⚡", unit: "XP" },
  streak: { name: "Maintenir la série", icon: "🔥", unit: "jour(s)" },
  perfect: { name: "Leçons parfaites", icon: "🎯", unit: "leçon(s)" },
};

export const useDailyChallenges = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: challenges, isLoading } = useQuery({
    queryKey: ["dailyChallenges", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const today = new Date().toISOString().split("T")[0];
      
      const { data, error } = await supabase
        .from("daily_challenges")
        .select("*")
        .eq("user_id", user.id)
        .eq("challenge_date", today);
      
      if (error) throw error;

      // If no challenges for today, generate them
      if (!data || data.length === 0) {
        const newChallenges = await generateDailyChallenges(user.id);
        return newChallenges;
      }

      return data as DailyChallenge[];
    },
    enabled: !!user?.id,
  });

  const generateDailyChallenges = async (userId: string): Promise<DailyChallenge[]> => {
    const today = new Date().toISOString().split("T")[0];
    
    const challengesToCreate = [
      { type: "lessons" as ChallengeType, target: 3, rewardXp: 50, rewardManna: 5 },
      { type: "xp" as ChallengeType, target: 100, rewardXp: 30, rewardManna: 3 },
      { type: "perfect" as ChallengeType, target: 1, rewardXp: 75, rewardManna: 8 },
    ];

    const inserts = challengesToCreate.map(c => ({
      user_id: userId,
      challenge_date: today,
      challenge_type: c.type,
      target_value: c.target,
      current_value: 0,
      completed: false,
      reward_xp: c.rewardXp,
      reward_manna: c.rewardManna,
      claimed: false,
    }));

    const { data, error } = await supabase
      .from("daily_challenges")
      .insert(inserts)
      .select();

    if (error) throw error;
    return data as DailyChallenge[];
  };

  const updateProgress = useMutation({
    mutationFn: async ({ type, increment }: { type: ChallengeType; increment: number }) => {
      if (!user?.id) throw new Error("Not authenticated");
      
      const today = new Date().toISOString().split("T")[0];
      
      const { data: challenge } = await supabase
        .from("daily_challenges")
        .select("*")
        .eq("user_id", user.id)
        .eq("challenge_date", today)
        .eq("challenge_type", type)
        .maybeSingle();

      if (!challenge) return;

      const newValue = challenge.current_value + increment;
      const completed = newValue >= challenge.target_value;

      const { error } = await supabase
        .from("daily_challenges")
        .update({ 
          current_value: newValue,
          completed 
        })
        .eq("id", challenge.id);

      if (error) throw error;

      if (completed && !challenge.completed) {
        toast.success("Défi complété !", {
          description: `${CHALLENGE_CONFIGS[type].name} terminé !`,
          icon: CHALLENGE_CONFIGS[type].icon,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyChallenges"] });
    },
  });

  const claimReward = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const challenge = challenges?.find(c => c.id === challengeId);
      if (!challenge || !challenge.completed || challenge.claimed) {
        throw new Error("Cannot claim this reward");
      }

      // Mark as claimed
      const { error: claimError } = await supabase
        .from("daily_challenges")
        .update({ claimed: true })
        .eq("id", challengeId);

      if (claimError) throw claimError;

      // Add rewards to profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("current_xp, manna")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            current_xp: profile.current_xp + challenge.reward_xp,
            manna: profile.manna + challenge.reward_manna,
          })
          .eq("user_id", user.id);

        if (updateError) throw updateError;
      }

      return challenge;
    },
    onSuccess: (challenge) => {
      queryClient.invalidateQueries({ queryKey: ["dailyChallenges"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Récompense réclamée !", {
        description: `+${challenge.reward_xp} XP et +${challenge.reward_manna} 🍞`,
      });
    },
  });

  return {
    challenges,
    isLoading,
    updateProgress,
    claimReward,
    CHALLENGE_CONFIGS,
  };
};
