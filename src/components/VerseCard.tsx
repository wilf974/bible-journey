import { CheckCircle, Lock, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerseCardProps {
  reference: string;
  preview: string;
  category: string;
  categoryIcon: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  masteryLevel?: number; // 0-5 stars
  onClick?: () => void;
}

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-600 border-red-500/20",
};

const difficultyLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

const VerseCard = ({
  reference,
  preview,
  category,
  categoryIcon,
  isCompleted = false,
  isLocked = false,
  difficulty,
  masteryLevel = 0,
  onClick,
}: VerseCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "w-full p-4 rounded-xl border transition-all duration-200 text-left",
        "bg-card hover:shadow-card",
        isLocked && "opacity-50 cursor-not-allowed",
        isCompleted && "border-green-500/50 bg-green-500/5",
        !isLocked && !isCompleted && "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
            isCompleted
              ? "bg-green-500/10"
              : isLocked
                ? "bg-muted"
                : "gradient-gold"
          )}
        >
          {isLocked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : isCompleted ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            categoryIcon
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-foreground truncate">
              {reference}
            </h3>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                difficultyColors[difficulty]
              )}
            >
              {difficultyLabels[difficulty]}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            "{preview}"
          </p>

          {/* Mastery stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < masteryLevel
                    ? "text-primary fill-primary"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
            {!isCompleted && !isLocked && (
              <span className="ml-2 text-xs text-primary font-medium flex items-center gap-1">
                <Play className="w-3 h-3" />
                Apprendre
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default VerseCard;
