import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import { sampleQuestions } from "@/data/bibleContent";

const LessonPage = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const questions = sampleQuestions;
  const maxLives = 5;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setXpEarned((prev) => prev + questions[currentQuestion].xpReward);
    } else {
      setLives((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
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
                setLives(5);
                setCurrentQuestion(0);
                setScore(0);
                setXpEarned(0);
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
        <QuizProgress
          current={currentQuestion + 1}
          total={questions.length}
          lives={lives}
          maxLives={maxLives}
        />

        <QuizQuestion
          key={questions[currentQuestion].id}
          question={questions[currentQuestion].question}
          verse={questions[currentQuestion].verse}
          options={questions[currentQuestion].options}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </main>
    </div>
  );
};

export default LessonPage;
