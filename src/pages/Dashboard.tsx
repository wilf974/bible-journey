import { useState } from "react";
import { BookOpen, Star, Target, Trophy, ChevronRight, ScrollText } from "lucide-react";
import Header from "@/components/Header";
import StreakCard from "@/components/StreakCard";
import XPProgress from "@/components/XPProgress";
import LessonCard from "@/components/LessonCard";
import BibleBookCard from "@/components/BibleBookCard";
import VerseCard from "@/components/VerseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { oldTestamentBooks, newTestamentBooks, sampleLessons } from "@/data/bibleContent";
import { bibleVerses, versesCategories } from "@/data/versesContent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, isLoading, getTimeUntilNextLife } = useUserProfile();
  const [activeTab, setActiveTab] = useState("lessons");

  // Use profile data or defaults
  const userStats = {
    streak: profile?.current_streak ?? 0,
    xp: profile?.current_xp ?? 0,
    lives: profile?.lives ?? 5,
    maxLives: profile?.max_lives ?? 5,
    level: profile?.current_level ?? 1,
    levelXP: (profile?.current_level ?? 1) * 500,
    todayComplete: profile?.last_activity_date === new Date().toISOString().split('T')[0],
    longestStreak: profile?.longest_streak ?? 0,
    displayName: profile?.display_name ?? user?.email?.split('@')[0] ?? 'Disciple',
  };

  // Mock progress data (will be replaced with real data)
  const completedBooks: Record<string, number> = {
    genesis: 3,
    exodus: 0,
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "intro":
        return <BookOpen className="w-6 h-6" />;
      case "quiz":
        return <Target className="w-6 h-6" />;
      case "memorize":
        return <Star className="w-6 h-6" />;
      case "review":
        return <Trophy className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-gold flex items-center justify-center shadow-button animate-pulse">
            <span className="text-3xl">📖</span>
          </div>
          <p className="text-muted-foreground">Chargement de votre progression...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        streak={userStats.streak}
        xp={userStats.xp}
        lives={userStats.lives}
        maxLives={userStats.maxLives}
        isLoggedIn={true}
        getTimeUntilNextLife={getTimeUntilNextLife}
      />

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Bonjour, {userStats.displayName} ! 👋
          </h1>
          <p className="text-muted-foreground">
            Continuez votre voyage à travers les Écritures
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <StreakCard
            currentStreak={userStats.streak}
            longestStreak={userStats.longestStreak}
            todayComplete={userStats.todayComplete}
          />
          <XPProgress
            currentXP={userStats.xp}
            levelXP={userStats.levelXP}
            level={userStats.level}
          />
        </div>

        {/* Continue learning */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-foreground">
              Continuer l'apprentissage
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/lesson/genesis-1-intro")}>
              Voir tout
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl gradient-gold">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary-foreground/80 mb-1">Genèse - Chapitre 1</p>
              <h3 className="text-xl font-display font-bold text-primary-foreground">
                La Création du Monde
              </h3>
              <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3 rounded-full" />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-white text-primary border-white hover:bg-white/90"
              onClick={() => navigate("/lesson/genesis-1-intro")}
            >
              Continuer
            </Button>
          </div>
        </div>

        {/* Tabs: Lessons / Verses / Bible */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="lessons" className="font-semibold text-xs sm:text-sm">
              📚 Leçons
            </TabsTrigger>
            <TabsTrigger value="verses" className="font-semibold text-xs sm:text-sm">
              📜 Versets
            </TabsTrigger>
            <TabsTrigger value="bible" className="font-semibold text-xs sm:text-sm">
              📖 Bible
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-4">
            {sampleLessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                icon={getLessonIcon(lesson.type)}
                progress={index === 0 ? 60 : 0}
                isLocked={index > 1}
                isCompleted={index === 0 && false}
                xp={lesson.xpReward}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="verses">
            <div className="space-y-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {versesCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Featured verse */}
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <ScrollText className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Verset du jour</span>
                </div>
                <p className="text-lg italic text-foreground mb-2">
                  "{bibleVerses[0]?.text.substring(0, 100)}..."
                </p>
                <p className="text-sm text-muted-foreground mb-4">— {bibleVerses[0]?.reference}</p>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => navigate(`/verse/${bibleVerses[0]?.id}`)}
                >
                  Apprendre ce verset
                </Button>
              </div>

              {/* Verses to learn */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-sm">
                    ✨
                  </span>
                  Versets à mémoriser
                </h3>
                <div className="space-y-3">
                  {bibleVerses.slice(0, 5).map((verse, index) => {
                    const category = versesCategories.find(c => c.id === verse.category);
                    return (
                      <VerseCard
                        key={verse.id}
                        reference={verse.reference}
                        preview={verse.text.substring(0, 80)}
                        category={verse.category}
                        categoryIcon={category?.icon || "📖"}
                        difficulty={verse.difficulty}
                        isLocked={index > 2}
                        masteryLevel={index === 0 ? 3 : 0}
                        onClick={() => navigate(`/verse/${verse.id}`)}
                      />
                    );
                  })}
                </div>
                <Button variant="ghost" className="w-full mt-2">
                  Voir tous les versets
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bible">
            <div className="space-y-6">
              {/* Nouveau Testament */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-sm">
                    ✝️
                  </span>
                  Nouveau Testament
                </h3>
                <div className="space-y-2">
                  {newTestamentBooks.slice(0, 5).map((book, index) => (
                    <BibleBookCard
                      key={book.id}
                      name={book.name}
                      testament={book.testament}
                      chaptersCount={book.chaptersCount}
                      completedChapters={completedBooks[book.id] || 0}
                      isLocked={index > 1}
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2">
                  Voir tous les livres
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Ancien Testament */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-sm">
                    📜
                  </span>
                  Ancien Testament
                </h3>
                <div className="space-y-2">
                  {oldTestamentBooks.slice(0, 5).map((book, index) => (
                    <BibleBookCard
                      key={book.id}
                      name={book.name}
                      testament={book.testament}
                      chaptersCount={book.chaptersCount}
                      completedChapters={completedBooks[book.id] || 0}
                      isLocked={index > 0}
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2">
                  Voir tous les livres
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
