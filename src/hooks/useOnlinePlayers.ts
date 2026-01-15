import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { RealtimeChannel } from "@supabase/supabase-js";

export const useOnlinePlayers = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const setupPresence = async () => {
      // Create a presence channel
      channel = supabase.channel("online-players", {
        config: {
          presence: {
            key: user?.id || `anonymous-${Math.random().toString(36).substr(2, 9)}`,
          },
        },
      });

      // Track presence state
      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel?.presenceState() || {};
          const count = Object.keys(state).length;
          setOnlineCount(count);
          setIsConnected(true);
        })
        .on("presence", { event: "join" }, ({ newPresences }) => {
          console.log("Player joined:", newPresences);
        })
        .on("presence", { event: "leave" }, ({ leftPresences }) => {
          console.log("Player left:", leftPresences);
        });

      // Subscribe and track this user
      await channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel?.track({
            online_at: new Date().toISOString(),
            user_id: user?.id || null,
          });
        }
      });
    };

    setupPresence();

    // Cleanup on unmount
    return () => {
      if (channel) {
        channel.untrack();
        supabase.removeChannel(channel);
      }
    };
  }, [user?.id]);

  return { onlineCount, isConnected };
};
