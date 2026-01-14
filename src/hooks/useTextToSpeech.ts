import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

interface UseTextToSpeechOptions {
  voiceId?: string;
}

export const useTextToSpeech = (options: UseTextToSpeechOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    if (isLoading) return;

    // Stop any currently playing audio
    stop();

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            text, 
            voiceId: options.voiceId || "onwK4e9ZLuTAKqWW03F9" // Daniel - French voice
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to generate audio" }));
        throw new Error(error.error || "Failed to generate audio");
      }

      const audioBlob = await response.blob();
      
      // Clean up previous audio URL
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        toast.error("Erreur lors de la lecture audio");
      };

      await audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      toast.error(error instanceof Error ? error.message : "Erreur audio");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, options.voiceId, stop]);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
  };
};
