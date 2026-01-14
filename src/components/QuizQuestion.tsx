import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import HintButton from "./HintButton";
import ExplanationCard from "./ExplanationCard";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionProps {
  question: string;
  verse?: string;
  options: QuizOption[];
  explanation?: string;
  verseReference?: string;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  manna?: number;
  showHint?: boolean;
}

const QuizQuestion = ({ 
  question, 
  verse, 
  options, 
  explanation,
  verseReference,
  onAnswer, 
  onNext,
  manna = 0,
  showHint = true,
}: QuizQuestionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  const handleSelect = (option: QuizOption) => {
    if (hasAnswered) return;
    
    setSelectedId(option.id);
    setHasAnswered(true);
    onAnswer(option.isCorrect);
  };

  const handleUseHint = (toEliminate: string[]) => {
    setEliminatedIds(toEliminate);
  };

  const getOptionStyles = (option: QuizOption) => {
    const isEliminated = eliminatedIds.includes(option.id);
    
    if (isEliminated && !hasAnswered) {
      return "border-muted bg-muted/50 opacity-40 line-through pointer-events-none";
    }

    if (!hasAnswered) {
      return selectedId === option.id
        ? "border-primary bg-primary/5"
        : "border-border hover:border-primary/50";
    }

    if (option.isCorrect) {
      return "border-success bg-success/10";
    }

    if (selectedId === option.id && !option.isCorrect) {
      return "border-destructive bg-destructive/10 animate-shake";
    }

    return "border-border opacity-50";
  };

  const isCorrectAnswer = options.find(o => o.id === selectedId)?.isCorrect ?? false;

  return (
    <div className="animate-slide-in">
      {/* Question */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          {question}
        </h2>
        {verse && (
          <p className="text-muted-foreground italic bg-muted/50 px-4 py-3 rounded-xl inline-block">
            "{verse}"
          </p>
        )}
      </div>

      {/* Hint button */}
      {showHint && !hasAnswered && (
        <div className="flex justify-center mb-4">
          <HintButton 
            options={options} 
            onUseHint={handleUseHint} 
            disabled={hasAnswered}
            manna={manna}
          />
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            disabled={hasAnswered || eliminatedIds.includes(option.id)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all duration-300",
              "flex items-center justify-between",
              getOptionStyles(option)
            )}
          >
            <span className="font-medium text-foreground">{option.text}</span>
            
            {hasAnswered && option.isCorrect && (
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center animate-scale-in">
                <Check className="w-5 h-5 text-success-foreground" />
              </div>
            )}
            
            {hasAnswered && selectedId === option.id && !option.isCorrect && (
              <div className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center">
                <X className="w-5 h-5 text-destructive-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {hasAnswered && explanation && (
        <ExplanationCard
          explanation={explanation}
          verseReference={verseReference}
          isCorrect={isCorrectAnswer}
          className="mb-6"
        />
      )}

      {/* Next button */}
      {hasAnswered && (
        <Button
          onClick={onNext}
          className="w-full"
          variant={isCorrectAnswer ? "success" : "default"}
          size="lg"
        >
          Continuer
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default QuizQuestion;
