import { cn } from "@/lib/utils";
import { Achievement, rarityColors, rarityLabels } from "@/data/achievements";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement & {
    unlocked: boolean;
    unlockedAt?: string;
    progress: { current: number; target: number; percentage: number };
  };
  compact?: boolean;
}

const AchievementCard = ({ achievement, compact = false }: AchievementCardProps) => {
  const { unlocked, progress } = achievement;

  if (compact) {
    return (
      <div
        className={cn(
          "relative w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all",
          unlocked
            ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} shadow-lg`
            : "bg-muted opacity-50 grayscale"
        )}
      >
        {unlocked ? (
          achievement.icon
        ) : (
          <Lock className="w-6 h-6 text-muted-foreground" />
        )}
        {unlocked && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card rounded-xl p-4 border transition-all duration-200",
        unlocked
          ? "border-primary/30 shadow-card"
          : "border-border opacity-75"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 transition-all",
            unlocked
              ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} shadow-lg`
              : "bg-muted grayscale"
          )}
        >
          {unlocked ? (
            achievement.icon
          ) : (
            <span className="opacity-30">{achievement.icon}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "font-display font-bold truncate",
              unlocked ? "text-foreground" : "text-muted-foreground"
            )}>
              {achievement.name}
            </h3>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full text-white whitespace-nowrap",
                `bg-gradient-to-r ${rarityColors[achievement.rarity]}`
              )}
            >
              {rarityLabels[achievement.rarity]}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {achievement.description}
          </p>

          {/* Progress */}
          {!unlocked && (
            <div className="space-y-1">
              <Progress value={progress.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress.current} / {progress.target}
              </p>
            </div>
          )}

          {unlocked && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500 font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Débloqué
              </span>
              <span className="text-primary font-bold">+{achievement.xpReward} XP</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
