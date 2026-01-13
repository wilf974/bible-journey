import { Lock, Check, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
  xp: number;
  onClick: () => void;
}

const LessonCard = ({
  title,
  description,
  icon,
  progress,
  isLocked,
  isCompleted,
  xp,
  onClick,
}: LessonCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "group relative w-full p-6 rounded-2xl border-2 transition-all duration-300",
        "bg-card shadow-card hover:shadow-lg",
        isLocked
          ? "border-muted opacity-60 cursor-not-allowed"
          : isCompleted
          ? "border-success hover:border-success/80"
          : "border-border hover:border-primary hover:-translate-y-1"
      )}
    >
      {/* Badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-md animate-scale-in">
          <Check className="w-5 h-5 text-success-foreground" />
        </div>
      )}
      
      {isLocked && (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-muted flex items-center justify-center shadow-md">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
            isLocked
              ? "bg-muted text-muted-foreground"
              : isCompleted
              ? "gradient-success text-success-foreground"
              : "gradient-gold text-primary-foreground"
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <h3 className="font-display font-bold text-lg text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Progress bar */}
          {!isLocked && !isCompleted && progress > 0 && (
            <div className="mt-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-gold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* XP */}
          <div className="mt-3 flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-primary" />
            <span className="font-semibold text-primary">{xp} XP</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default LessonCard;
