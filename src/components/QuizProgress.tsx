import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizProgressProps {
  current: number;
  total: number;
  lives: number;
  maxLives: number;
}

const QuizProgress = ({ current, total, lives, maxLives }: QuizProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Progress bar */}
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full gradient-gold transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Lives */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLives }).map((_, i) => (
          <Heart
            key={i}
            className={cn(
              "w-6 h-6 transition-all duration-300",
              i < lives
                ? "text-destructive fill-destructive"
                : "text-muted-foreground"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizProgress;
