import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type PowerUpType = "double_xp" | "shield" | "hint" | "freeze";

interface PowerUp {
  id: string;
  user_id: string;
  power_up_type: PowerUpType;
  quantity: number;
}

const POWER_UP_COSTS: Record<PowerUpType, number> = {
  hint: 10,
  shield: 25,
  double_xp: 30,
  freeze: 15,
};

const POWER_UP_NAMES: Record<PowerUpType, string> = {
  hint: "Indice",
  shield: "Bouclier",
  double_xp: "Double XP",
  freeze: "Gel de série",
};

const POWER_UP_ICONS: Record<PowerUpType, string> = {
  hint: "💡",
  shield: "🛡️",
  double_xp: "⚡",
  freeze: "❄️",
};

export const usePowerUps = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: powerUps, isLoading } = useQuery({
    queryKey: ["powerUps", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("power_ups")
        .select("*")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data as PowerUp[];
    },
    enabled: !!user?.id,
  });

  const getQuantity = (type: PowerUpType): number => {
    return powerUps?.find(p => p.power_up_type === type)?.quantity ?? 0;
  };

  const buyPowerUp = useMutation({
    mutationFn: async ({ type, manna }: { type: PowerUpType; manna: number }) => {
      if (!user?.id) throw new Error("Not authenticated");
      
      const cost = POWER_UP_COSTS[type];
      if (manna < cost) throw new Error("Not enough manna");

      // First deduct manna
      const { error: mannaError } = await supabase
        .from("profiles")
        .update({ manna: manna - cost })
        .eq("user_id", user.id);
      
      if (mannaError) throw mannaError;

      // Then add power-up
      const { data: existing } = await supabase
        .from("power_ups")
        .select("*")
        .eq("user_id", user.id)
        .eq("power_up_type", type)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("power_ups")
          .update({ quantity: existing.quantity + 1 })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("power_ups")
          .insert({ user_id: user.id, power_up_type: type, quantity: 1 });
        if (error) throw error;
      }

      return type;
    },
    onSuccess: (type) => {
      queryClient.invalidateQueries({ queryKey: ["powerUps"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success(`${POWER_UP_NAMES[type]} acheté !`, {
        icon: POWER_UP_ICONS[type],
      });
    },
    onError: () => {
      toast.error("Erreur lors de l'achat");
    },
  });

  const usePowerUp = useMutation({
    mutationFn: async (type: PowerUpType) => {
      if (!user?.id) throw new Error("Not authenticated");
      
      const current = getQuantity(type);
      if (current <= 0) throw new Error("No power-up available");

      const { error } = await supabase
        .from("power_ups")
        .update({ quantity: current - 1 })
        .eq("user_id", user.id)
        .eq("power_up_type", type);

      if (error) throw error;
      return type;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["powerUps"] });
    },
  });

  return {
    powerUps,
    isLoading,
    getQuantity,
    buyPowerUp,
    usePowerUp,
    POWER_UP_COSTS,
    POWER_UP_NAMES,
    POWER_UP_ICONS,
  };
};
