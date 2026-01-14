import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Lock, CheckCircle, Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { allBooks } from "@/data/bibleContent";
import { getQuestionsByBookId, getAvailableChapters, getQuestionsByBookChapter } from "@/data/bibleQuestions";
import { useBookProgress } from "@/hooks/useBookProgress";

const BookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const book = allBooks.find((b) => b.id === bookId);
  const availableChapters = bookId ? getAvailableChapters(bookId) : [];
  const questions = bookId ? getQuestionsByBookId(bookId) : [];
  
  const { getCompletedChapters, isLoading } = useBookProgress(bookId);
  const completedChaptersArray = bookId ? getCompletedChapters(bookId) : [];

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

  const completedChapters = completedChaptersArray.length;
  const progress = availableChapters.length > 0 
    ? (completedChapters / availableChapters.length) * 100 
    : 0;

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
              {progress === 100 ? (
                <Trophy className="w-8 h-8 text-primary-foreground" />
              ) : (
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-display font-bold">{book.name}</h2>
              <p className="text-sm text-muted-foreground">
                {completedChapters} / {availableChapters.length} chapitres terminés
              </p>
            </div>
            {progress === 100 && (
              <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                Terminé !
              </div>
            )}
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {questions.length} questions disponibles • {availableChapters.length} chapitres avec quiz
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-display font-bold mb-4">Chapitres</h3>
          
          {/* Find the first non-completed available chapter - only this one should be unlocked */}
          {(() => {
            const firstUncompletedIndex = availableChapters.findIndex(
              ch => !completedChaptersArray.includes(ch)
            );
            const nextUnlockedChapter = firstUncompletedIndex >= 0 
              ? availableChapters[firstUncompletedIndex] 
              : null;

            return (
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {Array.from({ length: book.chaptersCount }, (_, i) => i + 1).map((chapter) => {
                  const hasQuestions = availableChapters.includes(chapter);
                  const isCompleted = completedChaptersArray.includes(chapter);
                  const chapterQuestions = bookId ? getQuestionsByBookChapter(bookId, chapter) : [];
                  
                  // A chapter is unlocked ONLY if it's the next one to complete
                  const isUnlocked = hasQuestions && chapter === nextUnlockedChapter;
                  const isLocked = !hasQuestions || (!isCompleted && !isUnlocked);

                  return (
                    <button
                      key={chapter}
                      onClick={() => !isLocked && navigate(`/lesson/${bookId}-${chapter}`)}
                      disabled={isLocked}
                      title={
                        isCompleted 
                          ? `Chapitre ${chapter} - Terminé !` 
                          : isLocked && hasQuestions
                            ? `Chapitre ${chapter} - Terminez les chapitres précédents`
                            : hasQuestions 
                              ? `Chapitre ${chapter} - ${chapterQuestions.length} questions` 
                              : `Chapitre ${chapter} - Bientôt disponible`
                      }
                      className={`
                        aspect-square rounded-xl flex items-center justify-center font-bold text-lg
                        transition-all duration-200
                        ${isCompleted 
                          ? "bg-green-500 text-white shadow-md" 
                          : isUnlocked
                            ? "bg-primary text-primary-foreground hover:opacity-90 shadow-button hover:scale-105" 
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
            );
          })()}
        </div>

        {/* Start Learning Button */}
        {availableChapters.length > 0 && (() => {
          // Find next unlocked chapter (first non-completed chapter that is unlocked)
          const nextChapter = availableChapters.find((chapter, index) => {
            if (completedChaptersArray.includes(chapter)) return false;
            if (index === 0) return true;
            const prevChapter = availableChapters[index - 1];
            return completedChaptersArray.includes(prevChapter);
          }) || availableChapters[0];
          
          const allCompleted = availableChapters.every(ch => completedChaptersArray.includes(ch));
          
          return (
            <Button 
              className="w-full py-6 text-lg font-bold gradient-gold hover:opacity-90"
              onClick={() => navigate(`/lesson/${bookId}-${nextChapter}`)}
            >
              <Play className="w-5 h-5 mr-2" />
              {allCompleted ? `Réviser ${book.name}` : `Continuer ${book.name}`}
            </Button>
          );
        })()}

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
