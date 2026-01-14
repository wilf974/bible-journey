import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import BlockComplete from "@/components/BlockComplete";
import { sampleQuestions } from "@/data/bibleContent";
import { useUserProfile } from "@/hooks/useUserProfile";

const QUESTIONS_PER_BLOCK = 5;

const LessonPage = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { profile, addXP, updateStreak, updateLives } = useUserProfile();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(profile?.lives ?? 5);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBlockComplete, setShowBlockComplete] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [blockScore, setBlockScore] = useState(0);
  const [blockXp, setBlockXp] = useState(0);

  const questions = sampleQuestions;
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
    } else {
      // Passer au bloc suivant
      setCurrentBlock((prev) => prev + 1);
      setCurrentQuestion((prev) => prev + 1);
      setBlockScore(0);
      setBlockXp(0);
    }
    setShowBlockComplete(false);
  };

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
            Vous avez terminé la leçon avec brio !
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

          <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg" variant="hero">
            Continuer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
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
