import { ArrowLeft, TrendingUp, Clock, Target, Trophy, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLearningStats } from "@/hooks/useLearningStats";
import { useVerseProgress } from "@/hooks/useVerseProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";

const StatsPage = () => {
  const navigate = useNavigate();
  const { todayStats, weeklyStats, allTimeStats, isLoading } = useLearningStats();
  const { verseProgress, getVersesToReview } = useVerseProgress();
  const { profile } = useUserProfile();

  const versesToReview = getVersesToReview();
  const masteredVerses = verseProgress.filter((v) => v.mastery_level >= 4);
  
  const accuracy = allTimeStats && allTimeStats.totalAnswers > 0
    ? Math.round((allTimeStats.totalCorrect / allTimeStats.totalAnswers) * 100)
    : 0;

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const getWeeklyData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const stat = weeklyStats.find((s) => s.stat_date === dateStr);
      data.push({
        day: weekDays[(date.getDay() + 6) % 7],
        xp: stat?.xp_earned || 0,
        lessons: stat?.lessons_completed || 0,
        verses: stat?.verses_practiced || 0,
      });
    }
    return data;
  };

  const weekData = getWeeklyData();
  const maxXP = Math.max(...weekData.map((d) => d.xp), 1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-gold flex items-center justify-center animate-pulse">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Chargement des statistiques...</p>
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
          <h1 className="text-xl font-display font-bold">Statistiques</h1>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl gradient-gold flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{profile?.current_xp || 0}</p>
              <p className="text-xs text-muted-foreground">XP Total</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Précision</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{allTimeStats?.totalLessons || 0}</p>
              <p className="text-xs text-muted-foreground">Leçons</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{masteredVerses.length}</p>
              <p className="text-xs text-muted-foreground">Versets maîtrisés</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Progression de la semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-40">
              {weekData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-1">{day.xp} XP</span>
                    <div
                      className={cn(
                        "w-full rounded-t-lg transition-all",
                        day.xp > 0 ? "gradient-gold" : "bg-muted"
                      )}
                      style={{ height: `${(day.xp / maxXP) * 100}px`, minHeight: "8px" }}
                    />
                  </div>
                  <span className="text-xs font-medium">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              Aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Leçons complétées</span>
              <span className="font-bold">{todayStats?.lessons_completed || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Versets pratiqués</span>
              <span className="font-bold">{todayStats?.verses_practiced || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">XP gagnés</span>
              <span className="font-bold text-primary">+{todayStats?.xp_earned || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Temps d'étude</span>
              <span className="font-bold">{formatTime(todayStats?.time_spent_minutes || 0)}</span>
            </div>
            {todayStats && todayStats.total_answers > 0 && (
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Précision du jour</span>
                  <span className="font-bold">
                    {Math.round((todayStats.correct_answers / todayStats.total_answers) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(todayStats.correct_answers / todayStats.total_answers) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Spaced Repetition Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              Révision espacée
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-bold text-lg">{versesToReview.length}</p>
                <p className="text-sm text-muted-foreground">Versets à réviser</p>
              </div>
              {versesToReview.length > 0 && (
                <Button variant="hero" onClick={() => navigate("/review")}>
                  Réviser maintenant
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{verseProgress.length}</p>
                <p className="text-xs text-muted-foreground">Versets commencés</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">{masteredVerses.length}</p>
                <p className="text-xs text-muted-foreground">Maîtrisés (4+ ⭐)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {allTimeStats?.totalVersesPracticed || 0}
                </p>
                <p className="text-xs text-muted-foreground">Pratiques totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All-Time Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques globales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Jours d'activité</span>
              <span className="font-bold">{allTimeStats?.daysActive || 0} jours</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Temps total d'étude</span>
              <span className="font-bold">{formatTime(allTimeStats?.totalTimeMinutes || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Réponses correctes</span>
              <span className="font-bold">{allTimeStats?.totalCorrect || 0} / {allTimeStats?.totalAnswers || 0}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Série la plus longue</span>
              <span className="font-bold text-primary">{profile?.longest_streak || 0} jours 🔥</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StatsPage;
