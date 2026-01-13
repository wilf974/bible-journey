import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check, X, ArrowRight } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionProps {
  question: string;
  verse?: string;
  options: QuizOption[];
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuizQuestion = ({ question, verse, options, onAnswer, onNext }: QuizQuestionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (option: QuizOption) => {
    if (hasAnswered) return;
    
    setSelectedId(option.id);
    setHasAnswered(true);
    onAnswer(option.isCorrect);
  };

  const getOptionStyles = (option: QuizOption) => {
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

  return (
    <div className="animate-slide-in">
      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          {question}
        </h2>
        {verse && (
          <p className="text-muted-foreground italic bg-muted/50 px-4 py-3 rounded-xl inline-block">
            "{verse}"
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            disabled={hasAnswered}
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

      {/* Next button */}
      {hasAnswered && (
        <Button
          onClick={onNext}
          className="w-full"
          variant={
            options.find((o) => o.id === selectedId)?.isCorrect
              ? "success"
              : "default"
          }
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
