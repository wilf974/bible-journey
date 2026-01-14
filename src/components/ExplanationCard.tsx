import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExplanationCardProps {
  explanation: string;
  verseReference?: string;
  isCorrect: boolean;
  className?: string;
}

const ExplanationCard = ({ explanation, verseReference, isCorrect, className }: ExplanationCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-4 border-2 animate-slide-in",
        isCorrect
          ? "bg-success/5 border-success/30"
          : "bg-amber-500/5 border-amber-500/30",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            isCorrect ? "bg-success/20" : "bg-amber-500/20"
          )}
        >
          {isCorrect ? (
            <Sparkles className="w-5 h-5 text-success" />
          ) : (
            <BookOpen className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground mb-1">
            {isCorrect ? "Excellent !" : "Le saviez-vous ?"}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
          {verseReference && (
            <p className="text-xs text-primary mt-2 font-medium">
              📖 {verseReference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
