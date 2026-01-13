import { Flame, Calendar, Trophy } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  todayComplete: boolean;
}

const StreakCard = ({ currentStreak, longestStreak, todayComplete }: StreakCardProps) => {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${todayComplete ? 'gradient-gold animate-pulse-glow' : 'bg-muted'}`}>
            <Flame className={`w-6 h-6 ${todayComplete ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Série actuelle</p>
            <p className="text-3xl font-display font-bold text-foreground">
              {currentStreak} <span className="text-lg">jours</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-semibold text-primary">{longestStreak}</span>
        </div>
      </div>

      {/* Week progress */}
      <div className="flex justify-between gap-2">
        {days.map((day, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`w-full aspect-square rounded-lg flex items-center justify-center mb-1 transition-all ${
                index < adjustedToday
                  ? "gradient-success"
                  : index === adjustedToday
                  ? todayComplete
                    ? "gradient-gold animate-celebrate"
                    : "border-2 border-dashed border-primary"
                  : "bg-muted"
              }`}
            >
              {index < adjustedToday && (
                <Flame className="w-4 h-4 text-success-foreground" />
              )}
              {index === adjustedToday && todayComplete && (
                <Flame className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
            <span className={`text-xs font-medium ${index === adjustedToday ? 'text-primary' : 'text-muted-foreground'}`}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCard;
