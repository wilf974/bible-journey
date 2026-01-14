import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Flame, Brain, FolderHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAchievements } from "@/hooks/useAchievements";
import AchievementCard from "@/components/AchievementCard";

const categoryInfo = {
  learning: { name: "Apprentissage", icon: <Trophy className="w-4 h-4" />, emoji: "📚" },
  streak: { name: "Séries", icon: <Flame className="w-4 h-4" />, emoji: "🔥" },
  mastery: { name: "Maîtrise", icon: <Brain className="w-4 h-4" />, emoji: "🧠" },
  collection: { name: "Collection", icon: <FolderHeart className="w-4 h-4" />, emoji: "💝" },
  special: { name: "Spécial", icon: <Sparkles className="w-4 h-4" />, emoji: "✨" },
};

const AchievementsPage = () => {
  const navigate = useNavigate();
  const { achievements, isLoading } = useAchievements();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const filteredAchievements =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  // Sort: unlocked first, then by progress percentage
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return b.progress.percentage - a.progress.percentage;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-gold flex items-center justify-center shadow-button animate-pulse">
            <span className="text-3xl">🏆</span>
          </div>
          <p className="text-muted-foreground">Chargement des badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground">Badges</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {unlockedCount}/{totalCount}
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Summary */}
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 border border-primary/20 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center shadow-glow">
              <span className="text-4xl">🏆</span>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                {unlockedCount} badge{unlockedCount > 1 ? "s" : ""} débloqué{unlockedCount > 1 ? "s" : ""}
              </h2>
              <p className="text-muted-foreground">
                Continuez votre progression pour débloquer les {totalCount - unlockedCount} restants !
              </p>
            </div>
          </div>
        </div>

        {/* Categories tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6 h-auto p-1">
            <TabsTrigger value="all" className="text-xs py-2">
              Tous
            </TabsTrigger>
            {Object.entries(categoryInfo).map(([key, info]) => (
              <TabsTrigger key={key} value={key} className="text-xs py-2 gap-1">
                <span className="hidden sm:inline">{info.emoji}</span>
                <span className="truncate">{info.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="space-y-4">
            {sortedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AchievementsPage;
