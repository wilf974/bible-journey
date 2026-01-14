import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swords, Trophy, X, Zap, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import QuizQuestion from "@/components/QuizQuestion";
import { usePvpChallenge } from "@/hooks/usePvpChallenge";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { completeQuestionBank } from "@/data/bibleQuestions";
import { cn } from "@/lib/utils";

const ChallengePage = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { playSound } = useSoundEffects();
  const { activeChallenge, submitAnswer, completeChallenge } = usePvpChallenge();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get deterministic random questions based on challengeId
  // This ensures both players get the SAME questions in the SAME order
  const questions = useMemo(() => {
    if (!challengeId) return [];
    
    // Seeded random number generator for deterministic shuffle
    const seededRandom = (seed: string) => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      
      // LCG parameters
      const a = 1664525;
      const c = 1013904223;
      const m = Math.pow(2, 32);
      let state = Math.abs(hash);
      
      return () => {
        state = (a * state + c) % m;
        return state / m;
      };
    };
    
    const rng = seededRandom(challengeId);
    
    // Fisher-Yates shuffle with seeded RNG
    const shuffled = [...completeQuestionBank];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Take 5 unique questions
    return shuffled.slice(0, 5);
  }, [challengeId]);

  const isChallenger = activeChallenge?.challenger_id === user?.id;
  const myScore = isChallenger ? activeChallenge?.challenger_score : activeChallenge?.opponent_score;
  const opponentScore = isChallenger ? activeChallenge?.opponent_score : activeChallenge?.challenger_score;
  const myAnswers = isChallenger ? activeChallenge?.challenger_answers : activeChallenge?.opponent_answers;
  const opponentAnswers = isChallenger ? activeChallenge?.opponent_answers : activeChallenge?.challenger_answers;

  // Check if challenge is complete
  useEffect(() => {
    if (activeChallenge?.status === "completed") {
      setShowResults(true);
    }
  }, [activeChallenge?.status]);

  // Check if both players finished
  useEffect(() => {
    if (
      activeChallenge &&
      activeChallenge.challenger_answers >= activeChallenge.total_questions &&
      activeChallenge.opponent_answers >= activeChallenge.total_questions &&
      activeChallenge.status === "active"
    ) {
      completeChallenge.mutate(activeChallenge.id);
    }
  }, [activeChallenge?.challenger_answers, activeChallenge?.opponent_answers]);

  if (!activeChallenge || activeChallenge.id !== challengeId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center">
          <Swords className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-display font-bold mb-2">Défi introuvable</h2>
          <p className="text-muted-foreground mb-6">
            Ce défi n'existe plus ou a été annulé.
          </p>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    );
  }

  if (showResults || activeChallenge.status === "completed") {
    const isWinner = activeChallenge.winner_id === user?.id;
    const isDraw = !activeChallenge.winner_id;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className={cn(
            "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-glow animate-celebrate",
            isDraw ? "bg-muted" : isWinner ? "gradient-gold" : "bg-muted"
          )}>
            <span className="text-5xl">
              {isDraw ? "🤝" : isWinner ? "👑" : "😔"}
            </span>
          </div>

          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {isDraw ? "Match nul !" : isWinner ? "Victoire !" : "Défaite"}
          </h2>

          {/* Score display */}
          <div className="flex items-center justify-center gap-8 my-6">
            <div className="text-center">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                isWinner ? "gradient-gold" : "bg-muted"
              )}>
                <span className="text-2xl font-bold">{myScore}</span>
              </div>
              <p className="text-sm text-muted-foreground">Vous</p>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">VS</div>
            <div className="text-center">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                !isWinner && !isDraw ? "gradient-gold" : "bg-muted"
              )}>
                <span className="text-2xl font-bold">{opponentScore}</span>
              </div>
              <p className="text-sm text-muted-foreground">Adversaire</p>
            </div>
          </div>

          {/* Rewards */}
          {isWinner && (
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl p-4 mb-6">
              <p className="font-bold text-amber-600">Récompenses gagnées !</p>
              <div className="flex justify-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-primary" />
                  +{activeChallenge.xp_reward} XP
                </span>
                <span>+{activeChallenge.manna_reward} 🍞</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={() => navigate("/dashboard")} className="w-full" variant="hero">
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((myAnswers ?? 0) / activeChallenge.total_questions) * 100;

  const handleAnswer = async (isCorrect: boolean) => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    
    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
    }

    await submitAnswer.mutateAsync({
      challengeId: activeChallenge.id,
      isCorrect,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasAnswered(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* VS Display */}
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{myScore ?? 0}</p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-muted text-xs font-bold">
              VS
            </div>

            <div className="flex items-center gap-2">
              <div className="text-center">
                <p className="text-lg font-bold text-muted-foreground">{opponentScore ?? 0}</p>
              </div>
              <Avatar className="w-8 h-8 border-2 border-muted">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Question counter */}
          <div className="text-sm font-medium text-muted-foreground">
            {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>

        {/* Progress bar */}
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      {/* Opponent progress indicator */}
      <div className="container max-w-2xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
          <span>Votre progression: {myAnswers ?? 0}/{activeChallenge.total_questions}</span>
          <span>Adversaire: {opponentAnswers ?? 0}/{activeChallenge.total_questions}</span>
        </div>
      </div>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        {currentQuestion && (
          <QuizQuestion
            key={currentQuestion.id}
            question={currentQuestion.question}
            verse={currentQuestion.verse}
            options={currentQuestion.options}
            explanation={currentQuestion.explanation}
            verseReference={currentQuestion.verseReference}
            onAnswer={handleAnswer}
            onNext={handleNext}
            showHint={false}
          />
        )}
      </main>
    </div>
  );
};

export default ChallengePage;
