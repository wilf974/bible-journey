import { useCallback, useRef } from "react";

type SoundType = "correct" | "wrong" | "combo" | "levelUp" | "achievement" | "click" | "complete";

// Simple audio context for generating sounds
const createAudioContext = () => {
  if (typeof window !== "undefined" && window.AudioContext) {
    return new AudioContext();
  }
  return null;
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = "sine") => {
    const ctx = getAudioContext();
    if (!ctx || !enabledRef.current) return;

    // Resume context if suspended
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [getAudioContext]);

  const playSound = useCallback((type: SoundType) => {
    if (!enabledRef.current) return;

    switch (type) {
      case "correct":
        // Rising happy tone
        playTone(523.25, 0.1, "sine"); // C5
        setTimeout(() => playTone(659.25, 0.15, "sine"), 100); // E5
        break;
      case "wrong":
        // Low buzzer
        playTone(200, 0.2, "square");
        break;
      case "combo":
        // Ascending arpeggio
        playTone(523.25, 0.1, "sine"); // C5
        setTimeout(() => playTone(659.25, 0.1, "sine"), 80); // E5
        setTimeout(() => playTone(783.99, 0.15, "sine"), 160); // G5
        break;
      case "levelUp":
        // Victory fanfare
        playTone(523.25, 0.15, "sine");
        setTimeout(() => playTone(659.25, 0.15, "sine"), 150);
        setTimeout(() => playTone(783.99, 0.15, "sine"), 300);
        setTimeout(() => playTone(1046.5, 0.3, "sine"), 450);
        break;
      case "achievement":
        // Special unlock sound
        playTone(440, 0.1, "triangle");
        setTimeout(() => playTone(554.37, 0.1, "triangle"), 100);
        setTimeout(() => playTone(659.25, 0.2, "triangle"), 200);
        break;
      case "click":
        // Soft click
        playTone(800, 0.05, "sine");
        break;
      case "complete":
        // Completion melody
        playTone(392, 0.15, "sine"); // G4
        setTimeout(() => playTone(523.25, 0.15, "sine"), 150); // C5
        setTimeout(() => playTone(659.25, 0.2, "sine"), 300); // E5
        setTimeout(() => playTone(783.99, 0.3, "sine"), 450); // G5
        break;
    }
  }, [playTone]);

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  return {
    playSound,
    setEnabled,
    isEnabled: () => enabledRef.current,
  };
};
