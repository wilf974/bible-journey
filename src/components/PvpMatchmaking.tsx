import { useState } from "react";
import { Swords, Users, Loader2, X, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePvpChallenge } from "@/hooks/usePvpChallenge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PvpMatchmakingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PvpMatchmaking = ({ open, onOpenChange }: PvpMatchmakingProps) => {
  const navigate = useNavigate();
  const {
    waitingChallenges,
    myActiveChallenge,
    isLoading,
    createChallenge,
    joinChallenge,
    cancelChallenge,
  } = usePvpChallenge();

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateChallenge = async () => {
    setIsCreating(true);
    try {
      await createChallenge.mutateAsync({});
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinChallenge = async (challengeId: string) => {
    await joinChallenge.mutateAsync(challengeId);
    onOpenChange(false);
    navigate(`/challenge/${challengeId}`);
  };

  const handleCancelChallenge = async () => {
    if (myActiveChallenge) {
      await cancelChallenge.mutateAsync(myActiveChallenge.id);
    }
  };

  // If user has an active challenge
  if (myActiveChallenge?.status === "waiting") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              En attente d'un adversaire
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <p className="text-muted-foreground mb-6">
              Recherche d'un adversaire...
            </p>
            <Button variant="outline" onClick={handleCancelChallenge}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (myActiveChallenge?.status === "active") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              Défi en cours !
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center">
              <Swords className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground mb-6">
              Vous avez un défi en cours !
            </p>
            <Button 
              onClick={() => {
                onOpenChange(false);
                navigate(`/challenge/${myActiveChallenge.id}`);
              }}
              variant="hero"
            >
              Reprendre le défi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" />
            Mode Défi PvP
          </DialogTitle>
          <DialogDescription>
            Affrontez d'autres joueurs en temps réel !
          </DialogDescription>
        </DialogHeader>

        {/* Create challenge button */}
        <Button
          onClick={handleCreateChallenge}
          disabled={isCreating}
          className="w-full gap-2"
          variant="hero"
          size="lg"
        >
          {isCreating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Swords className="w-5 h-5" />
          )}
          Créer un défi
        </Button>

        {/* Waiting challenges */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Défis disponibles
            </h4>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          </div>

          {waitingChallenges && waitingChallenges.length > 0 ? (
            <div className="space-y-2">
              {waitingChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {challenge.challenger_name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{challenge.challenger_name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{challenge.total_questions} questions</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleJoinChallenge(challenge.id)}
                  >
                    Rejoindre
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>Aucun défi disponible</p>
              <p className="text-sm">Créez-en un pour commencer !</p>
            </div>
          )}
        </div>

        {/* Rewards info */}
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl p-4">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            Récompenses de victoire
          </h4>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-primary font-bold">+50 XP</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-amber-600">+10 🍞</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PvpMatchmaking;
