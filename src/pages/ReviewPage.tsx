import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useVerseProgress } from "@/hooks/useVerseProgress";
import { useLearningStats } from "@/hooks/useLearningStats";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getVerseById } from "@/data/versesContent";
import AudioButton from "@/components/AudioButton";
import { cn } from "@/lib/utils";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { getVersesToReview, updateVerseProgress } = useVerseProgress();
  const { updateStats } = useLearningStats();
  const { addXP } = useUserProfile();

  const versesToReview = getVersesToReview();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [totalReviewed, setTotalReviewed] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentProgress = versesToReview[currentIndex];
  const currentVerse = currentProgress ? getVerseById(currentProgress.verse_id) : null;

  const handleRate = async (quality: number) => {
    if (!currentProgress || !currentVerse) return;

    const wasCorrect = quality >= 3;

    await updateVerseProgress.mutateAsync({
      verseId: currentProgress.verse_id,
      wasCorrect,
      quality,
    });

    if (wasCorrect) {
      setXpEarned((prev) => prev + 10);
    }

    setTotalReviewed((prev) => prev + 1);

    if (currentIndex < versesToReview.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      // Complete review session
      const finalXP = wasCorrect ? xpEarned + 10 : xpEarned;
      setXpEarned(finalXP);
      
      await updateStats.mutateAsync({
        versesPracticed: totalReviewed + 1,
        xpEarned: finalXP,
        correctAnswers: wasCorrect ? 1 : 0,
        totalAnswers: 1,
      });

      if (finalXP > 0) {
        await addXP.mutateAsync(finalXP);
      }

      setIsComplete(true);
    }
  };

  if (versesToReview.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Aucun verset à réviser !
          </h2>
          <p className="text-muted-foreground mb-6">
            Tous vos versets sont à jour. Revenez plus tard ou apprenez de nouveaux versets.
          </p>
          <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center shadow-glow animate-celebrate">
            <span className="text-5xl">🧠</span>
          </div>

          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Session terminée !
          </h2>
          <p className="text-muted-foreground mb-6">
            Vous avez révisé {totalReviewed} verset{totalReviewed > 1 ? "s" : ""}
          </p>

          <div className="bg-muted rounded-xl p-4 mb-6">
            <p className="text-2xl font-bold text-primary">+{xpEarned} XP</p>
            <p className="text-sm text-muted-foreground">gagnés</p>
          </div>

          <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg" variant="hero">
            Continuer
          </Button>
        </div>
      </div>
    );
  }

  if (!currentVerse) {
    return null;
  }

  const progress = ((currentIndex + 1) / versesToReview.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <Progress value={progress} className="h-3" />
          </div>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1}/{versesToReview.length}
          </span>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
            🧠 Révision espacée
          </span>
          <h2 className="text-lg font-display font-bold text-foreground">
            Rappelez-vous ce verset
          </h2>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-6">
          {/* Reference */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-primary">{currentVerse.reference}</span>
            <AudioButton text={currentVerse.text} />
          </div>

          {/* Question or Answer */}
          {!showAnswer ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-6">
                Essayez de vous rappeler ce verset...
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                {Array.from({ length: currentProgress.mastery_level }).map((_, i) => (
                  <span key={i} className="text-amber-500">⭐</span>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={() => setShowAnswer(true)}>
                Voir la réponse
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <p className="text-lg leading-relaxed text-foreground mb-8 italic">
                "{currentVerse.text}"
              </p>

              <p className="text-sm text-muted-foreground mb-4 text-center">
                Comment était votre rappel ?
              </p>

              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  className="flex flex-col py-4 border-destructive/50 hover:bg-destructive/10"
                  onClick={() => handleRate(1)}
                >
                  <span className="text-lg">😓</span>
                  <span className="text-xs">Oublié</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col py-4 border-orange-500/50 hover:bg-orange-500/10"
                  onClick={() => handleRate(2)}
                >
                  <span className="text-lg">🤔</span>
                  <span className="text-xs">Difficile</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col py-4 border-primary/50 hover:bg-primary/10"
                  onClick={() => handleRate(4)}
                >
                  <span className="text-lg">😊</span>
                  <span className="text-xs">Bien</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col py-4 border-green-500/50 hover:bg-green-500/10"
                  onClick={() => handleRate(5)}
                >
                  <span className="text-lg">🎉</span>
                  <span className="text-xs">Parfait</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            La révision espacée optimise votre mémorisation en vous faisant réviser au moment idéal.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;
