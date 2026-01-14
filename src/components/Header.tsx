import { useState } from "react";
import { Flame, Zap, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LivesIndicator from "./LivesIndicator";
import MannaShop from "./MannaShop";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  streak: number;
  xp: number;
  lives: number;
  maxLives?: number;
  manna?: number;
  isLoggedIn?: boolean;
  getTimeUntilNextLife?: () => number | null;
}

const Header = ({ 
  streak, 
  xp, 
  lives, 
  maxLives = 5,
  manna = 0,
  isLoggedIn = false,
  getTimeUntilNextLife = () => null 
}: HeaderProps) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [shopOpen, setShopOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-button">
              <span className="text-xl">📖</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              BibleQuest
            </span>
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Manna */}
            <button 
              onClick={() => setShopOpen(true)}
              className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors"
            >
              <span className="text-lg">🍞</span>
              <span className="font-bold text-amber-600">{manna}</span>
            </button>

            {/* Streak */}
            <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg">
              <Flame className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{streak}</span>
            </div>

            {/* XP - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-lg">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="font-bold text-secondary">{xp}</span>
            </div>

            {/* Lives with regeneration timer */}
            <LivesIndicator 
              lives={lives} 
              maxLives={maxLives}
              getTimeUntilNextLife={getTimeUntilNextLife}
              onShopClick={() => setShopOpen(true)}
            />

            {/* Profile */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm">Connexion</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <MannaShop open={shopOpen} onOpenChange={setShopOpen} />
    </>
  );
};

export default Header;
