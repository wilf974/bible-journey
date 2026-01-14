import { useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Check, ArrowRight, RotateCcw, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getVerseById } from "@/data/versesContent";
import { useUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";

type ExerciseType = "reveal" | "fillBlank" | "reorder" | "typing";

interface Exercise {
  type: ExerciseType;
  instruction: string;
}

const VerseLearningPage = () => {
  const navigate = useNavigate();
  const { verseId } = useParams();
  const { profile, addXP, updateLives } = useUserProfile();

  const verse = verseId ? getVerseById(verseId) : null;

  const [currentExercise, setCurrentExercise] = useState(0);
  const [lives, setLives] = useState(profile?.lives ?? 5);
  const [xpEarned, setXpEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Exercise-specific states
  const [revealedWords, setRevealedWords] = useState<number[]>([]);
  const [selectedBlanks, setSelectedBlanks] = useState<string[]>([]);
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [typedText, setTypedText] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const maxLives = profile?.max_lives ?? 5;

  const exercises: Exercise[] = useMemo(() => [
    { type: "reveal", instruction: "Découvrez le verset mot par mot" },
    { type: "fillBlank", instruction: "Complétez les mots manquants" },
    { type: "reorder", instruction: "Remettez les mots dans l'ordre" },
    { type: "typing", instruction: "Écrivez le verset de mémoire" },
  ], []);

  const words = useMemo(() => {
    if (!verse) return [];
    return verse.text.split(/\s+/);
  }, [verse]);

  // Generate blanks (hide ~30% of words)
  const blanksData = useMemo(() => {
    if (words.length === 0) return { blankedText: [], hiddenIndices: [], hiddenWords: [] };
    
    const hiddenIndices: number[] = [];
    const numToHide = Math.max(2, Math.floor(words.length * 0.3));
    
    while (hiddenIndices.length < numToHide) {
      const idx = Math.floor(Math.random() * words.length);
      if (!hiddenIndices.includes(idx)) {
        hiddenIndices.push(idx);
      }
    }
    
    hiddenIndices.sort((a, b) => a - b);
    const hiddenWords = hiddenIndices.map(i => words[i]);
    
    return { hiddenIndices, hiddenWords };
  }, [words]);

  // Shuffled words for reorder exercise
  const shuffledWords = useMemo(() => {
    const shortVerse = words.slice(0, Math.min(10, words.length));
    return [...shortVerse].sort(() => Math.random() - 0.5);
  }, [words]);

  // Initialize available words when exercise changes
  useMemo(() => {
    if (exercises[currentExercise]?.type === "fillBlank") {
      setAvailableWords([...blanksData.hiddenWords].sort(() => Math.random() - 0.5));
      setSelectedBlanks([]);
    } else if (exercises[currentExercise]?.type === "reorder") {
      setAvailableWords([...shuffledWords]);
      setReorderedWords([]);
    }
  }, [currentExercise, blanksData.hiddenWords, shuffledWords, exercises]);

  const handleRevealWord = () => {
    if (revealedWords.length < words.length) {
      setRevealedWords((prev) => [...prev, prev.length]);
    }
  };

  const handleSelectWord = (word: string, index: number) => {
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    
    if (exercises[currentExercise].type === "fillBlank") {
      setSelectedBlanks(prev => [...prev, word]);
    } else if (exercises[currentExercise].type === "reorder") {
      setReorderedWords(prev => [...prev, word]);
    }
  };

  const handleRemoveWord = (index: number) => {
    if (exercises[currentExercise].type === "fillBlank") {
      const word = selectedBlanks[index];
      setSelectedBlanks(prev => prev.filter((_, i) => i !== index));
      setAvailableWords(prev => [...prev, word]);
    } else if (exercises[currentExercise].type === "reorder") {
      const word = reorderedWords[index];
      setReorderedWords(prev => prev.filter((_, i) => i !== index));
      setAvailableWords(prev => [...prev, word]);
    }
  };

  const checkAnswer = useCallback(() => {
    const exerciseType = exercises[currentExercise].type;
    let correct = false;

    if (exerciseType === "fillBlank") {
      correct = selectedBlanks.every((word, i) => 
        word.toLowerCase() === blanksData.hiddenWords[i]?.toLowerCase()
      ) && selectedBlanks.length === blanksData.hiddenWords.length;
    } else if (exerciseType === "reorder") {
      const expectedWords = words.slice(0, Math.min(10, words.length));
      correct = reorderedWords.every((word, i) => 
        word.toLowerCase() === expectedWords[i]?.toLowerCase()
      ) && reorderedWords.length === expectedWords.length;
    } else if (exerciseType === "typing") {
      const normalizedTyped = typedText.toLowerCase().replace(/[.,;:!?]/g, "").trim();
      const normalizedVerse = verse?.text.toLowerCase().replace(/[.,;:!?]/g, "").trim() || "";
      correct = normalizedTyped === normalizedVerse;
    }

    setIsCorrect(correct);

    if (correct) {
      setXpEarned(prev => prev + 15);
    } else {
      setLives(prev => {
        const newLives = Math.max(0, prev - 1);
        updateLives.mutate(-1);
        return newLives;
      });
    }
  }, [exercises, currentExercise, selectedBlanks, blanksData.hiddenWords, reorderedWords, words, typedText, verse, updateLives]);

  const handleNext = () => {
    if (currentExercise >= exercises.length - 1) {
      setIsComplete(true);
      if (xpEarned > 0) {
        addXP.mutate(xpEarned);
      }
    } else {
      setCurrentExercise(prev => prev + 1);
      setIsCorrect(null);
      setShowHint(false);
      setTypedText("");
    }
  };

  const resetExercise = () => {
    if (exercises[currentExercise].type === "fillBlank") {
      setAvailableWords([...blanksData.hiddenWords].sort(() => Math.random() - 0.5));
      setSelectedBlanks([]);
    } else if (exercises[currentExercise].type === "reorder") {
      setAvailableWords([...shuffledWords]);
      setReorderedWords([]);
    } else if (exercises[currentExercise].type === "typing") {
      setTypedText("");
    }
    setIsCorrect(null);
  };

  if (!verse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verset non trouvé</h1>
          <Button onClick={() => navigate("/dashboard")}>Retour</Button>
        </div>
      </div>
    );
  }

  if (lives === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-4xl">💔</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Plus de vies !
          </h2>
          <p className="text-muted-foreground mb-6">
            Revenez plus tard pour continuer à apprendre ce verset.
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
            <span className="text-5xl">📜</span>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Verset appris !
          </h2>
          <p className="text-muted-foreground mb-2">{verse.reference}</p>
          <p className="text-sm italic text-muted-foreground mb-6">
            "{verse.text.substring(0, 80)}..."
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

  const currentEx = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;

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
            <X className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <Progress value={progress} className="h-3" />
          </div>
          <div className="flex items-center gap-1 text-destructive">
            <span className="text-lg">❤️</span>
            <span className="font-bold">{lives}</span>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        {/* Reference */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
            {verse.reference}
          </span>
          <h2 className="text-lg font-display font-bold text-foreground">
            {currentEx.instruction}
          </h2>
        </div>

        {/* Exercise Content */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-6">
          {/* Reveal Exercise */}
          {currentEx.type === "reveal" && (
            <div className="text-center">
              <p className="text-lg leading-relaxed mb-6">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-block mx-1 transition-all duration-300",
                      revealedWords.includes(i)
                        ? "opacity-100"
                        : "opacity-0 bg-muted rounded px-2"
                    )}
                  >
                    {revealedWords.includes(i) ? word : "____"}
                  </span>
                ))}
              </p>
              {revealedWords.length < words.length ? (
                <Button onClick={handleRevealWord} variant="hero" size="lg">
                  Révéler le mot suivant
                </Button>
              ) : (
                <Button onClick={handleNext} variant="hero" size="lg">
                  Continuer <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          )}

          {/* Fill Blanks Exercise */}
          {currentEx.type === "fillBlank" && (
            <div>
              <p className="text-lg leading-relaxed mb-6">
                {words.map((word, i) => {
                  const blankIndex = blanksData.hiddenIndices.indexOf(i);
                  if (blankIndex !== -1) {
                    const selectedWord = selectedBlanks[blankIndex];
                    return (
                      <button
                        key={i}
                        onClick={() => selectedWord && handleRemoveWord(blankIndex)}
                        className={cn(
                          "inline-block mx-1 px-3 py-1 rounded-lg border-2 border-dashed min-w-[60px] transition-all",
                          selectedWord
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-muted border-muted-foreground/30"
                        )}
                      >
                        {selectedWord || "___"}
                      </button>
                    );
                  }
                  return <span key={i} className="inline-block mx-1">{word}</span>;
                })}
              </p>

              {/* Available words */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {availableWords.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectWord(word, i)}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-all"
                  >
                    {word}
                  </button>
                ))}
              </div>

              {isCorrect !== null && (
                <div className={cn(
                  "p-4 rounded-xl mb-4 text-center",
                  isCorrect ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
                )}>
                  {isCorrect ? (
                    <p className="font-bold flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Correct !
                    </p>
                  ) : (
                    <p className="font-bold">Pas tout à fait... Essayez encore !</p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetExercise} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" /> Réinitialiser
                </Button>
                {isCorrect === true ? (
                  <Button onClick={handleNext} variant="hero" className="flex-1">
                    Continuer <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={checkAnswer} variant="hero" className="flex-1" disabled={selectedBlanks.length !== blanksData.hiddenWords.length}>
                    Vérifier
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Reorder Exercise */}
          {currentEx.type === "reorder" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Reconstituez le début du verset
              </p>
              
              {/* Answer area */}
              <div className="min-h-[80px] p-4 bg-muted/50 rounded-xl mb-4 flex flex-wrap gap-2">
                {reorderedWords.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => handleRemoveWord(i)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-medium"
                  >
                    {word}
                  </button>
                ))}
                {reorderedWords.length === 0 && (
                  <span className="text-muted-foreground">Appuyez sur les mots ci-dessous...</span>
                )}
              </div>

              {/* Available words */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {availableWords.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectWord(word, i)}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-all"
                  >
                    {word}
                  </button>
                ))}
              </div>

              {isCorrect !== null && (
                <div className={cn(
                  "p-4 rounded-xl mb-4 text-center",
                  isCorrect ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
                )}>
                  {isCorrect ? (
                    <p className="font-bold flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Parfait !
                    </p>
                  ) : (
                    <p className="font-bold">L'ordre n'est pas correct. Réessayez !</p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetExercise} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" /> Réinitialiser
                </Button>
                {isCorrect === true ? (
                  <Button onClick={handleNext} variant="hero" className="flex-1">
                    Continuer <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={checkAnswer} variant="hero" className="flex-1" disabled={availableWords.length > 0}>
                    Vérifier
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Typing Exercise */}
          {currentEx.type === "typing" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Écrivez le verset de mémoire
              </p>

              {showHint && (
                <div className="p-3 bg-primary/10 rounded-xl mb-4 text-sm">
                  <p className="text-primary font-medium flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Indice : "{verse.text.substring(0, 50)}..."
                  </p>
                </div>
              )}

              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Commencez à écrire le verset..."
                className="w-full h-32 p-4 bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none resize-none text-foreground"
              />

              {isCorrect !== null && (
                <div className={cn(
                  "p-4 rounded-xl my-4 text-center",
                  isCorrect ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
                )}>
                  {isCorrect ? (
                    <p className="font-bold flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Excellent ! Vous connaissez ce verset !
                    </p>
                  ) : (
                    <div>
                      <p className="font-bold mb-2">Pas tout à fait...</p>
                      <p className="text-sm opacity-80">"{verse.text}"</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setShowHint(true)} disabled={showHint}>
                  <Lightbulb className="w-4 h-4 mr-2" /> Indice
                </Button>
                {isCorrect === true ? (
                  <Button onClick={handleNext} variant="hero" className="flex-1">
                    Terminer <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={checkAnswer} variant="hero" className="flex-1" disabled={!typedText.trim()}>
                    Vérifier
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerseLearningPage;
