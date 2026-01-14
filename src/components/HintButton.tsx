import { useState } from "react";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePowerUps } from "@/hooks/usePowerUps";
import { toast } from "sonner";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface HintButtonProps {
  options: QuizOption[];
  onUseHint: (eliminatedIds: string[]) => void;
  disabled?: boolean;
  manna: number;
}

const HINT_MANNA_COST = 5;

const HintButton = ({ options, onUseHint, disabled, manna }: HintButtonProps) => {
  const [used, setUsed] = useState(false);
  const { getQuantity, usePowerUp } = usePowerUps();
  
  const hintCount = getQuantity("hint");
  const canUseHint = !used && !disabled && (hintCount > 0 || manna >= HINT_MANNA_COST);

  const handleUseHint = async () => {
    if (!canUseHint) return;

    // Get wrong answers to eliminate (keep 2 max)
    const wrongOptions = options.filter(o => !o.isCorrect);
    const toEliminate = wrongOptions.slice(0, 2).map(o => o.id);

    if (hintCount > 0) {
      // Use stored hint
      await usePowerUp.mutateAsync("hint");
    } else {
      // Would cost manna - for now just use if available
      toast.info(`Indice utilisé (-${HINT_MANNA_COST} 🍞)`, { duration: 2000 });
    }

    setUsed(true);
    onUseHint(toEliminate);
  };

  if (used) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUseHint}
      disabled={!canUseHint}
      className={cn(
        "gap-2 transition-all",
        canUseHint && "border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10"
      )}
    >
      <Lightbulb className="w-4 h-4 text-amber-500" />
      <span>Indice</span>
      {hintCount > 0 ? (
        <span className="text-xs bg-amber-500/20 text-amber-600 px-1.5 py-0.5 rounded">
          {hintCount}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">
          {HINT_MANNA_COST} 🍞
        </span>
      )}
    </Button>
  );
};

export default HintButton;
