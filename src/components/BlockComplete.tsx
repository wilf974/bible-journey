import { Button } from "./ui/button";
import { ArrowRight, Star, Zap } from "lucide-react";

interface BlockCompleteProps {
  blockNumber: number;
  totalBlocks: number;
  score: number;
  totalQuestions: number;
  xpEarned: number;
  onContinue: () => void;
}

const BlockComplete = ({
  blockNumber,
  totalBlocks,
  score,
  totalQuestions,
  xpEarned,
  onContinue,
}: BlockCompleteProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isLastBlock = blockNumber === totalBlocks;

  return (
    <div className="animate-slide-in text-center py-8">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Star className="w-10 h-10 text-primary animate-scale-in" />
      </div>

      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
        Bloc {blockNumber} terminé !
      </h2>
      <p className="text-muted-foreground mb-8">
        {isLastBlock
          ? "Dernier bloc ! Voyons votre résultat final."
          : `Plus que ${totalBlocks - blockNumber} bloc${totalBlocks - blockNumber > 1 ? "s" : ""} à faire.`}
      </p>

      {/* Stats du bloc */}
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-xs mx-auto">
        <div className="bg-muted rounded-xl p-4">
          <Star className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{percentage}%</p>
          <p className="text-xs text-muted-foreground">Précision</p>
        </div>
        <div className="bg-muted rounded-xl p-4">
          <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">+{xpEarned}</p>
          <p className="text-xs text-muted-foreground">XP gagnés</p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < blockNumber
                ? "bg-primary"
                : i === blockNumber
                  ? "bg-primary/50 animate-pulse"
                  : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Button onClick={onContinue} size="lg" className="w-full max-w-xs" variant="hero">
        {isLastBlock ? "Voir les résultats" : "Continuer"}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default BlockComplete;
