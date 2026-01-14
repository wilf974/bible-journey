import { Heart, Clock, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LivesIndicatorProps {
  lives: number;
  maxLives: number;
  getTimeUntilNextLife: () => number | null;
  onShopClick?: () => void;
}

const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const LivesIndicator = ({ lives, maxLives, getTimeUntilNextLife, onShopClick }: LivesIndicatorProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const time = getTimeUntilNextLife();
      setTimeLeft(time);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [getTimeUntilNextLife, lives]);

  const isFull = lives >= maxLives;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={onShopClick}
            className="flex items-center gap-1.5 bg-destructive/10 px-3 py-1.5 rounded-lg hover:bg-destructive/20 transition-colors"
          >
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <span className="font-bold text-destructive">{lives}</span>
            {!isFull && timeLeft !== null && (
              <div className="flex items-center gap-1 ml-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            {!isFull && (
              <Plus className="w-4 h-4 text-destructive/60" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isFull ? (
            <p>Vies complètes !</p>
          ) : (
            <p>Cliquez pour acheter des vies • Prochaine dans {timeLeft ? formatTime(timeLeft) : "..."}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LivesIndicator;
