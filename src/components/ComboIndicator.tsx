import { Zap, Flame, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboIndicatorProps {
  streak: number;
  multiplier: number;
  className?: string;
}

const ComboIndicator = ({ streak, multiplier, className }: ComboIndicatorProps) => {
  if (streak < 3) return null;

  const getComboColor = () => {
    if (streak >= 10) return "from-purple-500 to-pink-500";
    if (streak >= 5) return "from-orange-500 to-red-500";
    return "from-yellow-500 to-orange-500";
  };

  const getComboLabel = () => {
    if (streak >= 10) return "LÉGENDAIRE !";
    if (streak >= 5) return "EN FEU !";
    return "COMBO !";
  };

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-50 animate-bounce-slow",
        className
      )}
    >
      <div
        className={cn(
          "bg-gradient-to-r text-white px-4 py-2 rounded-xl shadow-lg",
          "flex items-center gap-2 font-bold",
          getComboColor()
        )}
      >
        <div className="flex items-center gap-1">
          {streak >= 10 ? (
            <Target className="w-5 h-5 animate-spin" />
          ) : streak >= 5 ? (
            <Flame className="w-5 h-5 animate-pulse" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
          <span className="text-lg">{streak}</span>
        </div>
        <div className="border-l border-white/30 pl-2">
          <span className="text-xs block">{getComboLabel()}</span>
          <span className="text-sm">x{multiplier}</span>
        </div>
      </div>
    </div>
  );
};

export default ComboIndicator;
