import { Star, Zap } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  levelXP: number;
  level: number;
}

const XPProgress = ({ currentXP, levelXP, level }: XPProgressProps) => {
  const progress = (currentXP / levelXP) * 100;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shadow-button">
            <span className="text-xl font-display font-bold text-primary-foreground">{level}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Niveau</p>
            <p className="font-display font-bold text-foreground">Disciple</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">{currentXP.toLocaleString()}</span>
          <span className="text-muted-foreground">/ {levelXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 gradient-gold transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
        
        {/* Stars at milestones */}
        {[25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
              progress >= milestone ? "gradient-gold shadow-sm" : "bg-muted border-2 border-background"
            }`}
            style={{ left: `calc(${milestone}% - 12px)` }}
          >
            <Star className={`w-3 h-3 ${progress >= milestone ? "text-primary-foreground" : "text-muted-foreground"}`} />
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-3">
        Plus que <span className="font-semibold text-primary">{(levelXP - currentXP).toLocaleString()} XP</span> pour le niveau suivant !
      </p>
    </div>
  );
};

export default XPProgress;
