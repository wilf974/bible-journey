import { useState } from "react";
import { Trophy, Medal, Crown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LeaderboardCard = () => {
  const [showFull, setShowFull] = useState(false);
  const { leaderboard, isLoading, getUserRank, weekStart } = useLeaderboard();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const topThree = leaderboard?.slice(0, 3) ?? [];
  const userRank = getUserRank();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30";
      default:
        return "bg-muted/30 border-border";
    }
  };

  return (
    <>
      <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">Classement</h3>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </div>
          </div>
          {userRank && (
            <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
              Vous êtes #{userRank}
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {topThree.map((entry, index) => {
            const isCurrentUser = entry.user_id === user?.id;
            return (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all",
                  getRankBg(index + 1),
                  isCurrentUser && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <div className="w-8 flex justify-center">
                  {getRankIcon(index + 1)}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={entry.avatar_url || undefined} />
                  <AvatarFallback className="text-xs">
                    {entry.display_name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {isCurrentUser ? "Vous" : entry.display_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-primary">{entry.xp_earned} XP</p>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="ghost"
          className="w-full gap-2"
          onClick={() => setShowFull(true)}
        >
          Voir tout le classement
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={showFull} onOpenChange={setShowFull}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Classement de la semaine
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2">
            {leaderboard?.map((entry, index) => {
              const isCurrentUser = entry.user_id === user?.id;
              return (
                <div
                  key={entry.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all",
                    index < 3 ? getRankBg(index + 1) : "bg-muted/30 border-border",
                    isCurrentUser && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  <div className="w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={entry.avatar_url || undefined} />
                    <AvatarFallback className="text-xs">
                      {entry.display_name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {isCurrentUser ? "Vous" : entry.display_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.lessons_completed} leçons
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">{entry.xp_earned} XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeaderboardCard;
