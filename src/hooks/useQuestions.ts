/**
 * Hook for fetching questions with database/local fallback
 */

import { useState, useEffect, useCallback } from 'react';
import type { QuizQuestion } from '@/data/bibleContent';
import {
  getQuestionsByBookChapterAsync,
  getQuestionsByBookIdAsync,
  getAvailableChaptersAsync,
  getQuestionsByBookChapter,
  getQuestionsByBookId,
  getAvailableChapters,
} from '@/data/bibleQuestions';

interface UseQuestionsResult {
  questions: QuizQuestion[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface UseChapterQuestionsOptions {
  bookId: string | null;
  chapter: number | null;
}

interface UseBookQuestionsOptions {
  bookId: string | null;
}

/**
 * Fetch questions for a specific book and chapter
 */
export const useChapterQuestions = ({ bookId, chapter }: UseChapterQuestionsOptions): UseQuestionsResult => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuestions = useCallback(async () => {
    if (!bookId) {
      setQuestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result: QuizQuestion[];
      if (chapter !== null) {
        result = await getQuestionsByBookChapterAsync(bookId, chapter);
      } else {
        result = await getQuestionsByBookIdAsync(bookId);
      }
      setQuestions(result);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch questions'));
      // Fallback to local data
      if (chapter !== null) {
        setQuestions(getQuestionsByBookChapter(bookId, chapter));
      } else {
        setQuestions(getQuestionsByBookId(bookId));
      }
    } finally {
      setIsLoading(false);
    }
  }, [bookId, chapter]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { questions, isLoading, error, refetch: fetchQuestions };
};

/**
 * Fetch all questions for a book
 */
export const useBookQuestions = ({ bookId }: UseBookQuestionsOptions): UseQuestionsResult => {
  return useChapterQuestions({ bookId, chapter: null });
};

interface UseAvailableChaptersResult {
  chapters: number[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Fetch available chapters for a book
 */
export const useAvailableChapters = (bookId: string | null): UseAvailableChaptersResult => {
  const [chapters, setChapters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!bookId) {
        setChapters([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getAvailableChaptersAsync(bookId);
        setChapters(result);
      } catch (err) {
        console.error('Error fetching chapters:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch chapters'));
        // Fallback to local data
        setChapters(getAvailableChapters(bookId));
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapters();
  }, [bookId]);

  return { chapters, isLoading, error };
};
