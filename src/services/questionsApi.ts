/**
 * Questions API Service
 * Fetches questions from the Supabase database instead of hardcoded files
 */

import { supabase } from '@/integrations/supabase/client';
import type { QuizQuestion } from '@/data/bibleContent';

// Types for database responses
interface DbQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface DbQuestion {
  id: string;
  book_id: string;
  chapter: number;
  question_type: 'multiple_choice' | 'fill_blank' | 'true_false' | 'verse_order';
  question_text: string;
  verse_text: string | null;
  verse_reference: string | null;
  explanation: string | null;
  xp_reward: number;
  options: DbQuestionOption[];
}

interface DbBook {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters_count: number;
  sort_order: number;
}

// Transform database question to frontend format
const transformQuestion = (dbQuestion: DbQuestion): QuizQuestion => ({
  id: dbQuestion.id,
  bookId: dbQuestion.book_id,
  chapter: dbQuestion.chapter,
  type: dbQuestion.question_type,
  question: dbQuestion.question_text,
  verse: dbQuestion.verse_text || undefined,
  verseReference: dbQuestion.verse_reference || undefined,
  options: dbQuestion.options || [],
  explanation: dbQuestion.explanation || undefined,
  xpReward: dbQuestion.xp_reward,
});

// Cache for questions to avoid repeated fetches
let questionsCache: QuizQuestion[] | null = null;
let booksCacheMap: Map<string, DbBook> | null = null;

/**
 * Fetch all questions from database
 */
export const fetchAllQuestions = async (): Promise<QuizQuestion[]> => {
  if (questionsCache) {
    return questionsCache;
  }

  try {
    const { data, error } = await supabase
      .from('questions_with_options')
      .select('*');

    if (error) {
      console.error('Error fetching questions:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    questionsCache = (data as unknown as DbQuestion[]).map(transformQuestion);
    return questionsCache;
  } catch (err) {
    console.error('Failed to fetch questions:', err);
    return [];
  }
};

/**
 * Fetch questions for a specific book
 */
export const fetchQuestionsByBookId = async (bookId: string): Promise<QuizQuestion[]> => {
  try {
    const { data, error } = await supabase
      .from('questions_with_options')
      .select('*')
      .eq('book_id', bookId);

    if (error) {
      console.error('Error fetching questions for book:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return (data as unknown as DbQuestion[]).map(transformQuestion);
  } catch (err) {
    console.error('Failed to fetch questions for book:', err);
    return [];
  }
};

/**
 * Fetch questions for a specific book and chapter
 */
export const fetchQuestionsByBookChapter = async (
  bookId: string,
  chapter: number
): Promise<QuizQuestion[]> => {
  try {
    const { data, error } = await supabase
      .from('questions_with_options')
      .select('*')
      .eq('book_id', bookId)
      .eq('chapter', chapter);

    if (error) {
      console.error('Error fetching questions for chapter:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return (data as unknown as DbQuestion[]).map(transformQuestion);
  } catch (err) {
    console.error('Failed to fetch questions for chapter:', err);
    return [];
  }
};

/**
 * Fetch all Bible books from database
 */
export const fetchAllBooks = async (): Promise<DbBook[]> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching books:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    // Cache books
    booksCacheMap = new Map(data.map((b: DbBook) => [b.id, b]));
    return data as DbBook[];
  } catch (err) {
    console.error('Failed to fetch books:', err);
    return [];
  }
};

/**
 * Check if a book has questions in the database
 */
export const checkBookHasQuestions = async (bookId: string): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('book_id', bookId);

    if (error) {
      console.error('Error checking book questions:', error);
      return false;
    }

    return (count ?? 0) > 0;
  } catch (err) {
    console.error('Failed to check book questions:', err);
    return false;
  }
};

/**
 * Get available chapters for a book from database
 */
export const fetchAvailableChapters = async (bookId: string): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('chapter')
      .eq('book_id', bookId);

    if (error) {
      console.error('Error fetching available chapters:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    const chapters = [...new Set(data.map((q: { chapter: number }) => q.chapter))];
    return chapters.sort((a, b) => a - b);
  } catch (err) {
    console.error('Failed to fetch available chapters:', err);
    return [];
  }
};

/**
 * Get total question count from database
 */
export const fetchTotalQuestionCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching question count:', error);
      return 0;
    }

    return count ?? 0;
  } catch (err) {
    console.error('Failed to fetch question count:', err);
    return 0;
  }
};

/**
 * Clear the questions cache (useful for admin updates)
 */
export const clearQuestionsCache = (): void => {
  questionsCache = null;
  booksCacheMap = null;
};
