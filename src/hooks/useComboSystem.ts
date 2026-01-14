import { useState, useCallback } from "react";

interface ComboState {
  streak: number;
  multiplier: number;
  maxStreak: number;
}

const getMultiplier = (streak: number): number => {
  if (streak >= 10) return 3;
  if (streak >= 5) return 2;
  if (streak >= 3) return 1.5;
  return 1;
};

export const useComboSystem = () => {
  const [combo, setCombo] = useState<ComboState>({
    streak: 0,
    multiplier: 1,
    maxStreak: 0,
  });

  const onCorrectAnswer = useCallback(() => {
    setCombo(prev => {
      const newStreak = prev.streak + 1;
      return {
        streak: newStreak,
        multiplier: getMultiplier(newStreak),
        maxStreak: Math.max(prev.maxStreak, newStreak),
      };
    });
  }, []);

  const onWrongAnswer = useCallback(() => {
    setCombo(prev => ({
      ...prev,
      streak: 0,
      multiplier: 1,
    }));
  }, []);

  const resetCombo = useCallback(() => {
    setCombo({
      streak: 0,
      multiplier: 1,
      maxStreak: 0,
    });
  }, []);

  const calculateXP = useCallback((baseXP: number): number => {
    return Math.round(baseXP * combo.multiplier);
  }, [combo.multiplier]);

  return {
    combo,
    onCorrectAnswer,
    onWrongAnswer,
    resetCombo,
    calculateXP,
    getMultiplier,
  };
};
