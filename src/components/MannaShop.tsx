import { useState } from "react";
import { Heart, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";

interface MannaShopProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LIFE_COST = 20; // Cost in manna to buy 1 life

const MannaShop = ({ open, onOpenChange }: MannaShopProps) => {
  const { profile, buyLife } = useUserProfile();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const manna = profile?.manna ?? 0;
  const lives = profile?.lives ?? 5;
  const maxLives = profile?.max_lives ?? 5;
  const canBuyLife = manna >= LIFE_COST && lives < maxLives;

  const handleBuyLife = async () => {
    if (!canBuyLife) return;
    
    setIsPurchasing(true);
    try {
      await buyLife.mutateAsync();
      toast.success("Vie achetée !", {
        description: `Vous avez maintenant ${lives + 1} vie${lives + 1 > 1 ? "s" : ""}.`,
        icon: "❤️",
      });
    } catch (error) {
      toast.error("Erreur lors de l'achat");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Boutique Manne
          </DialogTitle>
          <DialogDescription>
            Utilisez votre manne pour acheter des vies supplémentaires
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

        {/* Shop items */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Articles disponibles
          </h4>

          {/* Buy 1 life */}
          <div className={`
            border-2 rounded-xl p-4 transition-all
            ${canBuyLife 
              ? "border-primary/30 hover:border-primary/50 bg-card" 
              : "border-muted bg-muted/30 opacity-60"
            }
          `}>
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
                disabled={!canBuyLife || isPurchasing}
                className="gap-2"
                variant={canBuyLife ? "default" : "secondary"}
              >
                <span className="text-lg">🍞</span>
                {LIFE_COST}
              </Button>
            </div>
          </div>

          {/* Buy 5 lives (bundle) */}
          <div className="border-2 border-muted rounded-xl p-4 bg-muted/30 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center relative">
                  <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full">
                    x5
                  </span>
                </div>
                <div>
                  <p className="font-bold text-lg">5 Vies</p>
                  <p className="text-sm text-muted-foreground">Bientôt disponible</p>
                </div>
              </div>
              <Button disabled className="gap-2" variant="secondary">
                <span className="text-lg">🍞</span>
                80
              </Button>
            </div>
          </div>
        </div>

        {/* How to earn manna */}
        <div className="bg-muted/50 rounded-xl p-4 mt-2">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <span>💡</span> Comment gagner de la manne ?
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Terminez des leçons (+5 🍞)</li>
            <li>• Maintenez votre série (+2 🍞/jour)</li>
            <li>• Débloquez des badges (bonus 🍞)</li>
            <li>• Maîtrisez des versets (+3 🍞)</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MannaShop;