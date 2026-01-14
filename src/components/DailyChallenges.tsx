import { CheckCircle2, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDailyChallenges, ChallengeType } from "@/hooks/useDailyChallenges";
import { cn } from "@/lib/utils";

const DailyChallenges = () => {
  const { challenges, isLoading, claimReward, CHALLENGE_CONFIGS } = useDailyChallenges();

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return null;
  }

  const completedCount = challenges.filter(c => c.completed).length;
  const allCompleted = completedCount === challenges.length;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">Défis du jour</h3>
            <p className="text-xs text-muted-foreground">
              {completedCount}/{challenges.length} complétés
            </p>
          </div>
        </div>
        {allCompleted && (
          <div className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-full">
            ✓ Tous complétés !
          </div>
        )}
      </div>

      <div className="space-y-3">
        {challenges.map(challenge => {
          const config = CHALLENGE_CONFIGS[challenge.challenge_type as ChallengeType];
          const progress = Math.min(
            (challenge.current_value / challenge.target_value) * 100,
            100
          );

          return (
            <div
              key={challenge.id}
              className={cn(
                "rounded-xl p-4 border transition-all",
                challenge.completed
                  ? "bg-success/5 border-success/30"
                  : "bg-muted/30 border-border"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{config.icon}</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {config.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {challenge.current_value}/{challenge.target_value} {config.unit}
                    </p>
                  </div>
                </div>

                {challenge.completed && !challenge.claimed && (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => claimReward.mutate(challenge.id)}
                    disabled={claimReward.isPending}
                    className="gap-1"
                  >
                    <Gift className="w-4 h-4" />
                    Réclamer
                  </Button>
                )}

                {challenge.claimed && (
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}

                {!challenge.completed && (
                  <div className="text-xs text-muted-foreground">
                    +{challenge.reward_xp} XP, +{challenge.reward_manna} 🍞
                  </div>
                )}
              </div>

              <Progress
                value={progress}
                className={cn(
                  "h-2",
                  challenge.completed && "[&>div]:bg-success"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyChallenges;
