import { Flame, Zap, Heart, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  streak: number;
  xp: number;
  lives: number;
  isLoggedIn?: boolean;
}

const Header = ({ streak, xp, lives, isLoggedIn = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-button">
            <span className="text-xl">📖</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground hidden sm:block">
            BibleQuest
          </span>
        </Link>

        {/* Stats */}
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg">
            <Flame className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">{streak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-lg">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="font-bold text-secondary">{xp}</span>
          </div>

          {/* Lives */}
          <div className="flex items-center gap-1.5 bg-destructive/10 px-3 py-1.5 rounded-lg">
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <span className="font-bold text-destructive">{lives}</span>
          </div>

          {/* Profile */}
          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="sm">Connexion</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
