import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Star, Zap, BookOpen, Flame, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import BlockComplete from "@/components/BlockComplete";
import ComboIndicator from "@/components/ComboIndicator";
import { allBooks } from "@/data/bibleContent";
import { getQuestionsByBookChapter, getQuestionsByBookId } from "@/data/bibleQuestions";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useBookProgress } from "@/hooks/useBookProgress";
import { useComboSystem } from "@/hooks/useComboSystem";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useDailyChallenges } from "@/hooks/useDailyChallenges";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { usePowerUps } from "@/hooks/usePowerUps";
import { toast } from "sonner";

const QUESTIONS_PER_BLOCK = 5;

const LessonPage = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { profile, addXP, addManna, updateStreak, updateLives } = useUserProfile();
  const { playSound } = useSoundEffects();
  const { combo, onCorrectAnswer, onWrongAnswer, calculateXP, resetCombo } = useComboSystem();
  const { updateProgress: updateChallengeProgress } = useDailyChallenges();
  const { updateEntry: updateLeaderboard } = useLeaderboard();
  const { getQuantity, usePowerUp } = usePowerUps();
  
  // Power-up states
  const [hasShield, setHasShield] = useState(false);
  const [hasDoubleXP, setHasDoubleXP] = useState(false);
  
  // Parse lessonId to get bookId and chapter
  const { bookId, chapter } = useMemo(() => {
    if (!lessonId) return { bookId: null, chapter: null };
    
    const parts = lessonId.split("-");
    
    for (let i = parts.length - 1; i >= 1; i--) {
      const chapterNum = parseInt(parts[i]);
      if (!isNaN(chapterNum)) {
        const bookPart = parts.slice(0, i).join("-");
        return { bookId: bookPart, chapter: chapterNum };
      }
    }
    
    return { bookId: parts[0], chapter: null };
  }, [lessonId]);

  const { saveProgress } = useBookProgress(bookId || undefined);
  
  const book = bookId ? allBooks.find((b) => b.id === bookId) : null;

  const questions = useMemo(() => {
    if (!bookId) return [];
    if (chapter !== null) {
      return getQuestionsByBookChapter(bookId, chapter);
    }
    return getQuestionsByBookId(bookId);
  }, [bookId, chapter]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(profile?.lives ?? 5);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBlockComplete, setShowBlockComplete] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [blockScore, setBlockScore] = useState(0);
  const [blockXp, setBlockXp] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [failedQuestion, setFailedQuestion] = useState<{
    question: string;
    correctAnswer: string;
    verseReference?: string;
    chapter?: string;
  } | null>(null);

  const maxLives = profile?.max_lives ?? 5;
  
  // Check for active power-ups on mount
  useEffect(() => {
    const shieldCount = getQuantity("shield");
    const doubleXpCount = getQuantity("double_xp");
    
    if (shieldCount > 0) {
      setHasShield(true);
    }
    if (doubleXpCount > 0) {
      setHasDoubleXP(true);
      usePowerUp.mutate("double_xp");
      toast.info("⚡ Double XP activé !", { duration: 2000 });
    }
  }, []);
  
  const questionBlocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < questions.length; i += QUESTIONS_PER_BLOCK) {
      blocks.push(questions.slice(i, i + QUESTIONS_PER_BLOCK));
    }
    return blocks;
  }, [questions]);

  const totalBlocks = questionBlocks.length;
  const currentBlockQuestions = questionBlocks[currentBlock] || [];
  const questionInBlock = currentQuestion - currentBlock * QUESTIONS_PER_BLOCK;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      onCorrectAnswer();
      playSound("correct");
      
      // Play combo sound for streaks
      if (combo.streak >= 2) {
        setTimeout(() => playSound("combo"), 200);
      }
      
      setScore((prev) => prev + 1);
      setBlockScore((prev) => prev + 1);
      
      let baseXp = questions[currentQuestion].xpReward;
      let finalXp = calculateXP(baseXp);
      
      // Apply double XP if active
      if (hasDoubleXP) {
        finalXp *= 2;
      }
      
      setXpEarned((prev) => prev + finalXp);
      setBlockXp((prev) => prev + finalXp);
      
      // Update daily challenge for XP
      updateChallengeProgress.mutate({ type: "xp", increment: finalXp });
    } else {
      onWrongAnswer();
      playSound("wrong");

      // Check if shield is active
      if (hasShield) {
        setHasShield(false);
        usePowerUp.mutate("shield");
        toast.info("🛡️ Bouclier utilisé ! Vie protégée.", { duration: 2000 });
        return;
      }

      // Get the current question details
      const currentQ = questions[currentQuestion];
      const correctOption = currentQ.options.find(o => o.isCorrect);

      // Extract chapter from verseReference (e.g., "Marc 2:5" -> "Marc 2")
      let chapterRef = currentQ.verseReference;
      if (chapterRef) {
        // Remove verse number (everything after the colon)
        chapterRef = chapterRef.replace(/:\d+(-\d+)?$/, "");
      }

      // Store the failed question info and end the game
      setFailedQuestion({
        question: currentQ.question,
        correctAnswer: correctOption?.text || "",
        verseReference: currentQ.verseReference,
        chapter: chapterRef,
      });
      setIsGameOver(true);

      setLives((prev) => {
        const newLives = Math.max(0, prev - 1);
        updateLives.mutate(-1);
        return newLives;
      });
    }
  };

  const handleNext = () => {
    const isLastQuestionInBlock = questionInBlock >= currentBlockQuestions.length - 1;

    if (isLastQuestionInBlock) {
      setShowBlockComplete(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBlockContinue = () => {
    const isLastBlock = currentBlock >= totalBlocks - 1;
    
    if (isLastBlock) {
      setIsComplete(true);
      playSound("complete");
      
      if (xpEarned > 0) {
        addXP.mutate(xpEarned);
      }
      
      addManna.mutate(5);
      updateStreak.mutate();
      
      // Update daily challenges
      updateChallengeProgress.mutate({ type: "lessons", increment: 1 });
      
      // Check for perfect lesson
      if (score === questions.length) {
        updateChallengeProgress.mutate({ type: "perfect", increment: 1 });
        updateLeaderboard.mutate({ 
          xpIncrement: xpEarned, 
          lessonIncrement: 1, 
          perfectIncrement: 1 
        });
      } else {
        updateLeaderboard.mutate({ 
          xpIncrement: xpEarned, 
          lessonIncrement: 1, 
          perfectIncrement: 0 
        });
      }
      
      if (bookId) {
        saveProgress.mutate({
          bookId,
          chapterId: chapter?.toString() || "1",
          lessonId: lessonId || `${bookId}-${chapter || 1}`,
          score,
          xpEarned,
        });
      }
    } else {
      setCurrentBlock((prev) => prev + 1);
      setCurrentQuestion((prev) => prev + 1);
      setBlockScore(0);
      setBlockXp(0);
    }
    setShowBlockComplete(false);
  };

  // No questions available
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            {book?.name || "Leçon"}
          </h2>
          <p className="text-muted-foreground mb-6">
            Les questions pour {chapter ? `le chapitre ${chapter}` : "cette leçon"} arrivent bientôt !
          </p>
          <Button onClick={() => navigate(bookId ? `/book/${bookId}` : "/dashboard")} className="w-full" size="lg">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  // Game Over screen when player answers incorrectly
  if (isGameOver && failedQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Oups, ce n'est pas la bonne réponse !
          </h2>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-muted-foreground mb-3">
              📖 Ouvrez votre Bible et cherchez la réponse dans ce passage :
            </p>
            {failedQuestion.chapter && (
              <p className="text-2xl font-bold text-primary mb-2">
                {failedQuestion.chapter}
              </p>
            )}
            <p className="text-sm text-muted-foreground italic">
              La lecture de la Parole de Dieu vous aidera à mieux retenir !
            </p>
          </div>

          <div className="text-sm text-muted-foreground mb-6">
            <p>Score actuel : <span className="font-bold">{score}</span> bonne{score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""}</p>
            {xpEarned > 0 && <p>XP gagnés : <span className="font-bold text-primary">+{xpEarned}</span></p>}
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate(bookId ? `/book/${bookId}` : "/dashboard")} className="w-full" size="lg">
              Retour au livre
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsGameOver(false);
                setFailedQuestion(null);
                setCurrentQuestion(0);
                setCurrentBlock(0);
                setScore(0);
                setBlockScore(0);
                setXpEarned(0);
                setBlockXp(0);
                resetCombo();
              }}
              className="w-full"
            >
              Réessayer le chapitre
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (lives === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-4xl">💔</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Plus de vies !
          </h2>
          <p className="text-muted-foreground mb-6">
            Vous avez utilisé toutes vos vies. Revenez plus tard ou révisez les leçons précédentes.
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
              Retour au tableau de bord
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setLives(profile?.lives ?? 5);
                setIsGameOver(false);
                setFailedQuestion(null);
                setCurrentQuestion(0);
                setCurrentBlock(0);
                setScore(0);
                setBlockScore(0);
                setXpEarned(0);
                setBlockXp(0);
                resetCombo();
              }}
              className="w-full"
            >
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPerfect = score === questions.length;
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center shadow-glow animate-celebrate">
            <span className="text-5xl">{isPerfect ? "👑" : "🏆"}</span>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {isPerfect ? "Parfait !" : "Félicitations !"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {book ? `${book.name} - Chapitre ${chapter}` : "Leçon"} terminé !
          </p>

          {/* Combo max */}
          {combo.maxStreak >= 3 && (
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-3 mb-4 flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-600">
                Meilleur combo : {combo.maxStreak} réponses !
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <div className="bg-muted rounded-xl p-3">
              <Star className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xl font-bold text-foreground">{percentage}%</p>
              <p className="text-xs text-muted-foreground">Précision</p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xl font-bold text-foreground">+{xpEarned}</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
            <div className="bg-amber-500/10 rounded-xl p-3">
              <span className="text-xl block">🍞</span>
              <p className="text-xl font-bold text-amber-600">+5</p>
              <p className="text-xs text-muted-foreground">Manne</p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <span className="text-xl block">🎯</span>
              <p className="text-xl font-bold text-foreground">{score}/{questions.length}</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate(bookId ? `/book/${bookId}` : "/dashboard")} className="w-full" size="lg" variant="hero">
              Continuer
            </Button>
            {bookId && (
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
                Retour au tableau de bord
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Combo indicator */}
      <ComboIndicator streak={combo.streak} multiplier={combo.multiplier} />
      
      {/* Active power-ups indicator */}
      {(hasShield || hasDoubleXP) && (
        <div className="fixed top-20 left-2 sm:left-4 z-50 flex flex-col gap-1 sm:gap-2 scale-90 sm:scale-100 origin-top-left">
          {hasShield && (
            <div className="bg-blue-500/20 border border-blue-500/30 text-blue-600 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Shield className="w-4 h-4" />
              Bouclier actif
            </div>
          )}
          {hasDoubleXP && (
            <div className="bg-purple-500/20 border border-purple-500/30 text-purple-600 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Double XP
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(bookId ? `/book/${bookId}` : "/dashboard")}
            className="rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
          {book && (
            <div className="flex-1">
              <p className="text-sm font-medium">{book.name}</p>
              {chapter && <p className="text-xs text-muted-foreground">Chapitre {chapter}</p>}
            </div>
          )}
          
          {/* XP earned indicator */}
          {xpEarned > 0 && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-lg text-sm font-medium">
              <Zap className="w-4 h-4" />
              +{xpEarned}
            </div>
          )}
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        {showBlockComplete ? (
          <BlockComplete
            blockNumber={currentBlock + 1}
            totalBlocks={totalBlocks}
            score={blockScore}
            totalQuestions={currentBlockQuestions.length}
            xpEarned={blockXp}
            onContinue={handleBlockContinue}
          />
        ) : (
          <>
            <QuizProgress
              current={questionInBlock + 1}
              total={currentBlockQuestions.length}
              lives={lives}
              maxLives={maxLives}
            />

            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: totalBlocks }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < currentBlock
                      ? "bg-primary"
                      : i === currentBlock
                        ? "bg-primary/50"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <QuizQuestion
              key={questions[currentQuestion].id}
              question={questions[currentQuestion].question}
              verse={questions[currentQuestion].verse}
              options={questions[currentQuestion].options}
              explanation={questions[currentQuestion].explanation}
              verseReference={questions[currentQuestion].verseReference}
              onAnswer={handleAnswer}
              onNext={handleNext}
              manna={profile?.manna ?? 0}
              showHint={true}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default LessonPage;
