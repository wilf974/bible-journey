import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Challenge {
  id: string;
  challenger_id: string;
  opponent_id: string | null;
  status: "waiting" | "active" | "completed" | "cancelled";
  book_id: string | null;
  chapter: number | null;
  challenger_score: number;
  opponent_score: number;
  challenger_answers: number;
  opponent_answers: number;
  total_questions: number;
  current_question: number;
  winner_id: string | null;
  xp_reward: number;
  manna_reward: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  challenger_name?: string;
  opponent_name?: string;
}

export const usePvpChallenge = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  // Get waiting challenges (matchmaking queue)
  const { data: waitingChallenges, isLoading: isLoadingWaiting } = useQuery({
    queryKey: ["waitingChallenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("player_challenges")
        .select("*")
        .eq("status", "waiting")
        .neq("challenger_id", user?.id ?? "")
        .order("created_at", { ascending: true })
        .limit(10);

      if (error) throw error;

      // Fetch challenger names
      const challengerIds = data.map(c => c.challenger_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", challengerIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p.display_name]) ?? []);

      return data.map(c => ({
        ...c,
        challenger_name: profileMap.get(c.challenger_id) || "Anonyme",
      })) as Challenge[];
    },
    enabled: !!user?.id,
    refetchInterval: 5000,
  });

  // Get user's active challenge
  const { data: myActiveChallenge, isLoading: isLoadingActive } = useQuery({
    queryKey: ["myActiveChallenge", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("player_challenges")
        .select("*")
        .or(`challenger_id.eq.${user.id},opponent_id.eq.${user.id}`)
        .in("status", ["waiting", "active"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as Challenge | null;
    },
    enabled: !!user?.id,
  });

  // Get user's challenge history
  const { data: challengeHistory } = useQuery({
    queryKey: ["challengeHistory", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("player_challenges")
        .select("*")
        .or(`challenger_id.eq.${user.id},opponent_id.eq.${user.id}`)
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as Challenge[];
    },
    enabled: !!user?.id,
  });

  // Subscribe to realtime updates for active challenge
  useEffect(() => {
    if (!myActiveChallenge?.id) {
      setActiveChallenge(null);
      return;
    }

    setActiveChallenge(myActiveChallenge);

    const channel = supabase
      .channel(`challenge-${myActiveChallenge.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "player_challenges",
          filter: `id=eq.${myActiveChallenge.id}`,
        },
        (payload) => {
          const updatedChallenge = payload.new as Challenge;
          setActiveChallenge(updatedChallenge);
          queryClient.invalidateQueries({ queryKey: ["myActiveChallenge"] });

          // Notify on status changes
          if (updatedChallenge.status === "active" && myActiveChallenge.status === "waiting") {
            toast.success("Le défi commence !", { icon: "⚔️" });
          }
          if (updatedChallenge.status === "completed") {
            const isWinner = updatedChallenge.winner_id === user?.id;
            const isDraw = !updatedChallenge.winner_id;
            if (isDraw) {
              toast.info("Match nul !", { icon: "🤝" });
            } else if (isWinner) {
              toast.success("Victoire !", { icon: "🏆" });
            } else {
              toast.info("Défaite...", { icon: "😔" });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [myActiveChallenge?.id, user?.id, queryClient]);

  // Create a new challenge
  const createChallenge = useMutation({
    mutationFn: async ({ bookId, chapter }: { bookId?: string; chapter?: number }) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("player_challenges")
        .insert({
          challenger_id: user.id,
          book_id: bookId || null,
          chapter: chapter || null,
          status: "waiting",
          total_questions: 5,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Challenge;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActiveChallenge"] });
      queryClient.invalidateQueries({ queryKey: ["waitingChallenges"] });
      toast.success("Défi créé ! En attente d'un adversaire...", { icon: "⚔️" });
    },
    onError: () => {
      toast.error("Erreur lors de la création du défi");
    },
  });

  // Join an existing challenge
  const joinChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("player_challenges")
        .update({
          opponent_id: user.id,
          status: "active",
          started_at: new Date().toISOString(),
        })
        .eq("id", challengeId)
        .eq("status", "waiting")
        .select()
        .single();

      if (error) throw error;
      return data as Challenge;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActiveChallenge"] });
      queryClient.invalidateQueries({ queryKey: ["waitingChallenges"] });
      toast.success("Vous avez rejoint le défi !", { icon: "⚔️" });
    },
    onError: () => {
      toast.error("Ce défi n'est plus disponible");
      queryClient.invalidateQueries({ queryKey: ["waitingChallenges"] });
    },
  });

  // Submit an answer
  const submitAnswer = useMutation({
    mutationFn: async ({ challengeId, isCorrect }: { challengeId: string; isCorrect: boolean }) => {
      if (!user?.id || !activeChallenge) throw new Error("Not authenticated");

      const isChallenger = activeChallenge.challenger_id === user.id;
      const scoreField = isChallenger ? "challenger_score" : "opponent_score";
      const answersField = isChallenger ? "challenger_answers" : "opponent_answers";

      const currentScore = isChallenger ? activeChallenge.challenger_score : activeChallenge.opponent_score;
      const currentAnswers = isChallenger ? activeChallenge.challenger_answers : activeChallenge.opponent_answers;

      const { error } = await supabase
        .from("player_challenges")
        .update({
          [scoreField]: isCorrect ? currentScore + 1 : currentScore,
          [answersField]: currentAnswers + 1,
        })
        .eq("id", challengeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActiveChallenge"] });
    },
  });

  // Complete the challenge
  const completeChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user?.id || !activeChallenge) throw new Error("Not in challenge");

      // Determine winner
      let winnerId: string | null = null;
      if (activeChallenge.challenger_score > activeChallenge.opponent_score) {
        winnerId = activeChallenge.challenger_id;
      } else if (activeChallenge.opponent_score > activeChallenge.challenger_score) {
        winnerId = activeChallenge.opponent_id;
      }

      const { error } = await supabase
        .from("player_challenges")
        .update({
          status: "completed",
          winner_id: winnerId,
          completed_at: new Date().toISOString(),
        })
        .eq("id", challengeId);

      if (error) throw error;

      // Update profiles with win/loss
      const isWinner = winnerId === user.id;
      const isDraw = !winnerId;

      // Get current profile stats
      const { data: profile } = await supabase
        .from("profiles")
        .select("pvp_wins, pvp_losses, pvp_draws, current_xp, manna")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        const updates: Record<string, number> = {};
        
        if (isDraw) {
          updates.pvp_draws = (profile.pvp_draws ?? 0) + 1;
        } else if (isWinner) {
          updates.pvp_wins = (profile.pvp_wins ?? 0) + 1;
          updates.current_xp = profile.current_xp + activeChallenge.xp_reward;
          updates.manna = profile.manna + activeChallenge.manna_reward;
        } else {
          updates.pvp_losses = (profile.pvp_losses ?? 0) + 1;
        }

        await supabase
          .from("profiles")
          .update(updates)
          .eq("user_id", user.id);
      }

      return { winnerId, isDraw };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActiveChallenge"] });
      queryClient.invalidateQueries({ queryKey: ["challengeHistory"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  // Cancel a waiting challenge
  const cancelChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("player_challenges")
        .update({ status: "cancelled" })
        .eq("id", challengeId)
        .eq("challenger_id", user.id)
        .eq("status", "waiting");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myActiveChallenge"] });
      queryClient.invalidateQueries({ queryKey: ["waitingChallenges"] });
      toast.info("Défi annulé");
    },
  });

  return {
    waitingChallenges,
    myActiveChallenge,
    activeChallenge,
    challengeHistory,
    isLoading: isLoadingWaiting || isLoadingActive,
    createChallenge,
    joinChallenge,
    submitAnswer,
    completeChallenge,
    cancelChallenge,
  };
};
