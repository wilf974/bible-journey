import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Lock, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { allBooks } from "@/data/bibleContent";
import { getQuestionsByBookId, getAvailableChapters } from "@/data/bibleQuestions";

const BookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const book = allBooks.find((b) => b.id === bookId);
  const availableChapters = bookId ? getAvailableChapters(bookId) : [];
  const questions = bookId ? getQuestionsByBookId(bookId) : [];

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Livre non trouvé</h1>
          <Button onClick={() => navigate("/dashboard")}>Retour au tableau de bord</Button>
        </div>
      </div>
    );
  }

  const completedChapters = 0; // TODO: Get from user progress
  const progress = (completedChapters / book.chaptersCount) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-display font-bold">{book.name}</h1>
              <p className="text-sm text-muted-foreground">
                {book.testament === "old" ? "Ancien Testament" : "Nouveau Testament"} • {book.chaptersCount} chapitres
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-display font-bold">{book.name}</h2>
              <p className="text-sm text-muted-foreground">
                {completedChapters} / {book.chaptersCount} chapitres terminés
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {questions.length} questions disponibles
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-display font-bold mb-4">Chapitres</h3>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {Array.from({ length: book.chaptersCount }, (_, i) => i + 1).map((chapter) => {
              const hasQuestions = availableChapters.includes(chapter);
              const isCompleted = false; // TODO: Get from user progress
              const isLocked = !hasQuestions;

              return (
                <button
                  key={chapter}
                  onClick={() => hasQuestions && navigate(`/lesson/${bookId}-${chapter}`)}
                  disabled={isLocked}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center font-bold text-lg
                    transition-all duration-200
                    ${isCompleted 
                      ? "bg-green-500 text-white" 
                      : hasQuestions 
                        ? "bg-primary text-primary-foreground hover:opacity-90 shadow-button" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    chapter
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Learning Button */}
        {availableChapters.length > 0 && (
          <Button 
            className="w-full py-6 text-lg font-bold gradient-gold hover:opacity-90"
            onClick={() => navigate(`/lesson/${bookId}-${availableChapters[0]}`)}
          >
            <Play className="w-5 h-5 mr-2" />
            Commencer {book.name}
          </Button>
        )}

        {availableChapters.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Les questions pour ce livre arrivent bientôt !</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookPage;
