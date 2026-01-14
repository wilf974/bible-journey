import { useState } from "react";
import { Heart, Sparkles, Zap, Shield, Snowflake, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePowerUps, PowerUpType } from "@/hooks/usePowerUps";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PowerUpShopProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LIFE_COST = 20;

const POWER_UP_DETAILS: Record<PowerUpType, {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = {
  hint: {
    name: "Indice",
    description: "Élimine 2 mauvaises réponses",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "text-amber-500 bg-amber-500/10",
  },
  shield: {
    name: "Bouclier",
    description: "Protège une vie sur erreur",
    icon: <Shield className="w-6 h-6" />,
    color: "text-blue-500 bg-blue-500/10",
  },
  double_xp: {
    name: "Double XP",
    description: "Double l'XP pendant 1 leçon",
    icon: <Zap className="w-6 h-6" />,
    color: "text-purple-500 bg-purple-500/10",
  },
  freeze: {
    name: "Gel de série",
    description: "Garde votre série si inactif",
    icon: <Snowflake className="w-6 h-6" />,
    color: "text-cyan-500 bg-cyan-500/10",
  },
};

const PowerUpShop = ({ open, onOpenChange }: PowerUpShopProps) => {
  const { profile, buyLife } = useUserProfile();
  const { buyPowerUp, getQuantity, POWER_UP_COSTS } = usePowerUps();
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const manna = profile?.manna ?? 0;
  const lives = profile?.lives ?? 5;
  const maxLives = profile?.max_lives ?? 5;
  const canBuyLife = manna >= LIFE_COST && lives < maxLives;

  const handleBuyLife = async () => {
    if (!canBuyLife) return;
    setPurchasing("life");
    try {
      await buyLife.mutateAsync();
      toast.success("Vie achetée !", {
        description: `Vous avez maintenant ${lives + 1} vie${lives + 1 > 1 ? "s" : ""}.`,
        icon: "❤️",
      });
    } catch (error) {
      toast.error("Erreur lors de l'achat");
    } finally {
      setPurchasing(null);
    }
  };

  const handleBuyPowerUp = async (type: PowerUpType) => {
    const cost = POWER_UP_COSTS[type];
    if (manna < cost) {
      toast.error("Manne insuffisante");
      return;
    }
    setPurchasing(type);
    try {
      await buyPowerUp.mutateAsync({ type, manna });
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Boutique
          </DialogTitle>
          <DialogDescription>
            Dépensez votre manne pour des bonus
          </DialogDescription>
        </DialogHeader>

        {/* Current manna balance */}
        <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-2xl">🍞</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Votre manne</p>
              <p className="text-2xl font-bold text-amber-600">{manna}</p>
            </div>
          </div>
        </div>

        {/* Lives Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Vies
          </h4>
          <div className={cn(
            "border-2 rounded-xl p-4 transition-all",
            canBuyLife 
              ? "border-primary/30 hover:border-primary/50 bg-card" 
              : "border-muted bg-muted/30 opacity-60"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">1 Vie</p>
                  <p className="text-sm text-muted-foreground">
                    {lives >= maxLives ? "Vies pleines !" : "Restaurez une vie"}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleBuyLife}
                disabled={!canBuyLife || purchasing === "life"}
                className="gap-2"
                variant={canBuyLife ? "default" : "secondary"}
              >
                <span className="text-lg">🍞</span>
                {LIFE_COST}
              </Button>
            </div>
          </div>
        </div>

        {/* Power-ups Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Power-ups
          </h4>
          
          {(Object.keys(POWER_UP_DETAILS) as PowerUpType[]).map(type => {
            const details = POWER_UP_DETAILS[type];
            const cost = POWER_UP_COSTS[type];
            const quantity = getQuantity(type);
            const canBuy = manna >= cost;

            return (
              <div 
                key={type}
                className={cn(
                  "border-2 rounded-xl p-4 transition-all",
                  canBuy 
                    ? "border-primary/30 hover:border-primary/50 bg-card" 
                    : "border-muted bg-muted/30 opacity-60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", details.color)}>
                      {details.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg">{details.name}</p>
                        {quantity > 0 && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            x{quantity}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {details.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBuyPowerUp(type)}
                    disabled={!canBuy || purchasing === type}
                    className="gap-2"
                    variant={canBuy ? "default" : "secondary"}
                  >
                    <span className="text-lg">🍞</span>
                    {cost}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* How to earn */}
        <div className="bg-muted/50 rounded-xl p-4 mt-2">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <span>💡</span> Comment gagner de la manne ?
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Terminez des leçons (+5 🍞)</li>
            <li>• Maintenez votre série (+2 🍞/jour)</li>
            <li>• Complétez les défis quotidiens</li>
            <li>• Débloquez des badges (bonus 🍞)</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PowerUpShop;
