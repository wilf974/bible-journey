import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Star, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import BlockComplete from "@/components/BlockComplete";
import { allBooks } from "@/data/bibleContent";
import { getQuestionsByBookChapter, getQuestionsByBookId } from "@/data/bibleQuestions";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useBookProgress } from "@/hooks/useBookProgress";

const QUESTIONS_PER_BLOCK = 5;

const LessonPage = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { profile, addXP, updateStreak, updateLives } = useUserProfile();
  
  // Parse lessonId to get bookId and chapter (format: "bookId-chapter" or just "lessonId")
  const { bookId, chapter } = useMemo(() => {
    if (!lessonId) return { bookId: null, chapter: null };
    
    const parts = lessonId.split("-");
    if (parts.length >= 2) {
      const chapterNum = parseInt(parts[parts.length - 1]);
      if (!isNaN(chapterNum)) {
        const bookPart = parts.slice(0, -1).join("-");
        return { bookId: bookPart, chapter: chapterNum };
      }
    }
    return { bookId: lessonId, chapter: null };
  }, [lessonId]);

  const { saveProgress } = useBookProgress(bookId || undefined);
  
  const book = bookId ? allBooks.find((b) => b.id === bookId) : null;

  // Get questions based on bookId and chapter
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

  const maxLives = profile?.max_lives ?? 5;
  
  // Diviser les questions en blocs
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
      setScore((prev) => prev + 1);
      setBlockScore((prev) => prev + 1);
      const xp = questions[currentQuestion].xpReward;
      setXpEarned((prev) => prev + xp);
      setBlockXp((prev) => prev + xp);
    } else {
      setLives((prev) => {
        const newLives = Math.max(0, prev - 1);
        // Update lives in database
        updateLives.mutate(-1);
        return newLives;
      });
    }
  };

  const handleNext = () => {
    const isLastQuestionInBlock = questionInBlock >= currentBlockQuestions.length - 1;
    const isLastBlock = currentBlock >= totalBlocks - 1;

    if (isLastQuestionInBlock) {
      // Fin du bloc
      setShowBlockComplete(true);
    } else {
      // Question suivante dans le même bloc
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBlockContinue = () => {
    const isLastBlock = currentBlock >= totalBlocks - 1;
    
    if (isLastBlock) {
      setIsComplete(true);
      // Save XP and update streak
      if (xpEarned > 0) {
        addXP.mutate(xpEarned);
      }
      updateStreak.mutate();
      
      // Save progress to database
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
      // Passer au bloc suivant
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
                setCurrentQuestion(0);
                setCurrentBlock(0);
                setScore(0);
                setBlockScore(0);
                setXpEarned(0);
                setBlockXp(0);
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
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center animate-slide-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center shadow-glow animate-celebrate">
            <span className="text-5xl">🏆</span>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            Félicitations !
          </h2>
          <p className="text-muted-foreground mb-6">
            {book ? `${book.name} - Chapitre ${chapter}` : "Leçon"} terminé avec brio !
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-xl p-4">
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{percentage}%</p>
              <p className="text-xs text-muted-foreground">Précision</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">+{xpEarned}</p>
              <p className="text-xs text-muted-foreground">XP gagnés</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <span className="text-2xl block mb-1">🎯</span>
              <p className="text-2xl font-bold text-foreground">{score}/{questions.length}</p>
              <p className="text-xs text-muted-foreground">Réponses</p>
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
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
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default LessonPage;
