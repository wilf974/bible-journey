import { BookOpen, Lock, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BibleBookCardProps {
  name: string;
  testament: "old" | "new";
  chaptersCount: number;
  completedChapters: number;
  isLocked: boolean;
  onClick: () => void;
}

const BibleBookCard = ({
  name,
  testament,
  chaptersCount,
  completedChapters,
  isLocked,
  onClick,
}: BibleBookCardProps) => {
  const progress = (completedChapters / chaptersCount) * 100;
  const isCompleted = completedChapters === chaptersCount;

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4",
        "bg-card hover:shadow-lg",
        isLocked
          ? "border-muted opacity-50 cursor-not-allowed"
          : isCompleted
          ? "border-success"
          : "border-border hover:border-primary"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
          isLocked
            ? "bg-muted"
            : isCompleted
            ? "gradient-success"
            : testament === "old"
            ? "bg-secondary/20"
            : "gradient-gold"
        )}
      >
        {isLocked ? (
          <Lock className="w-5 h-5 text-muted-foreground" />
        ) : isCompleted ? (
          <Check className="w-5 h-5 text-success-foreground" />
        ) : (
          <BookOpen className={cn("w-5 h-5", testament === "old" ? "text-secondary" : "text-primary-foreground")} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h4 className="font-display font-bold text-foreground">{name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-500", isCompleted ? "gradient-success" : "gradient-gold")}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {completedChapters}/{chaptersCount}
          </span>
        </div>
      </div>

      <ChevronRight className={cn("w-5 h-5", isLocked ? "text-muted-foreground" : "text-primary")} />
    </button>
  );
};

export default BibleBookCard;
