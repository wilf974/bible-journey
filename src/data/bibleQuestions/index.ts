// Re-export all Bible content from the main file and additional questions
export * from '../bibleContent';
export * from './pentateuchQuestions';
export * from './historicalQuestions';
export * from './wisdomQuestions';
export * from './prophetQuestions';
export * from './gospelQuestions';
export * from './epistleQuestions';
export * from './genesisExtendedQuestions';
export * from './exodusExtendedQuestions';
export * from './newTestamentExtendedQuestions';
export * from './oldTestamentExtendedQuestions';

// Import API service for database questions
import {
  fetchQuestionsByBookId,
  fetchQuestionsByBookChapter,
  checkBookHasQuestions,
  fetchAvailableChapters,
  fetchTotalQuestionCount,
} from '@/services/questionsApi';
import type { QuizQuestion } from '../bibleContent';

// Combine all local questions (fallback when DB is not available)
import { genesisQuestions, exodusQuestions, matthewQuestions, johnQuestions } from '../bibleContent';
import { leviticusQuestions, numbersQuestions, deuteronomyQuestions } from './pentateuchQuestions';
import { joshuaQuestions, judgesQuestions, ruthQuestions, samuel1Questions, samuel2Questions, kings1Questions, kings2Questions } from './historicalQuestions';
import { jobQuestions, psalmsQuestions, proverbsQuestions, ecclesiastesQuestions } from './wisdomQuestions';
import { isaiahQuestions, jeremiahQuestions, ezekielQuestions, danielQuestions } from './prophetQuestions';
import { markQuestions, lukeQuestions, actsQuestions } from './gospelQuestions';
import { romansQuestions, corinthians1Questions, corinthians2Questions, galatiansQuestions, ephesiansQuestions, philippiansQuestions, hebrewsQuestions, jamesQuestions, revelationQuestions } from './epistleQuestions';
import { genesisExtendedQuestions } from './genesisExtendedQuestions';
import { exodusExtendedQuestions } from './exodusExtendedQuestions';
import { newTestamentExtendedQuestions } from './newTestamentExtendedQuestions';
import { oldTestamentExtendedQuestions } from './oldTestamentExtendedQuestions';

// Local question bank (fallback)
export const completeQuestionBank = [
  // Pentateuque
  ...genesisQuestions,
  ...genesisExtendedQuestions,
  ...exodusQuestions,
  ...exodusExtendedQuestions,
  ...leviticusQuestions,
  ...numbersQuestions,
  ...deuteronomyQuestions,
  // Livres historiques
  ...joshuaQuestions,
  ...judgesQuestions,
  ...ruthQuestions,
  ...samuel1Questions,
  ...samuel2Questions,
  ...kings1Questions,
  ...kings2Questions,
  // Livres de sagesse
  ...jobQuestions,
  ...psalmsQuestions,
  ...proverbsQuestions,
  ...ecclesiastesQuestions,
  // Prophètes
  ...isaiahQuestions,
  ...jeremiahQuestions,
  ...ezekielQuestions,
  ...danielQuestions,
  // Évangiles et Actes
  ...matthewQuestions,
  ...markQuestions,
  ...lukeQuestions,
  ...johnQuestions,
  ...actsQuestions,
  // Épîtres
  ...romansQuestions,
  ...corinthians1Questions,
  ...corinthians2Questions,
  ...galatiansQuestions,
  ...ephesiansQuestions,
  ...philippiansQuestions,
  ...hebrewsQuestions,
  ...jamesQuestions,
  ...revelationQuestions,
  // Questions étendues
  ...newTestamentExtendedQuestions,
  ...oldTestamentExtendedQuestions,
];

// ============================================
// SYNCHRONOUS FUNCTIONS (use local data)
// ============================================

// Get questions by book (synchronous - local data)
export const getQuestionsByBookId = (bookId: string): QuizQuestion[] => {
  return completeQuestionBank.filter(q => q.bookId === bookId);
};

// Get questions by book and chapter (synchronous - local data)
export const getQuestionsByBookChapter = (bookId: string, chapter: number): QuizQuestion[] => {
  return completeQuestionBank.filter(q => q.bookId === bookId && q.chapter === chapter);
};

// Check if a book has questions available (synchronous - local data)
export const bookHasQuestions = (bookId: string): boolean => {
  return completeQuestionBank.some(q => q.bookId === bookId);
};

// Get available chapters for a book (synchronous - local data)
export const getAvailableChapters = (bookId: string): number[] => {
  const chapters = completeQuestionBank
    .filter(q => q.bookId === bookId)
    .map(q => q.chapter);
  return [...new Set(chapters)].sort((a, b) => a - b);
};

// Get total question count (synchronous - local data)
export const getTotalQuestionCount = (): number => {
  return completeQuestionBank.length;
};

// ============================================
// ASYNC FUNCTIONS (prefer DB, fallback to local)
// ============================================

/**
 * Get questions by book - tries database first, falls back to local
 */
export const getQuestionsByBookIdAsync = async (bookId: string): Promise<QuizQuestion[]> => {
  try {
    const dbQuestions = await fetchQuestionsByBookId(bookId);
    if (dbQuestions.length > 0) {
      return dbQuestions;
    }
  } catch (error) {
    console.warn('Failed to fetch from DB, using local data:', error);
  }
  return getQuestionsByBookId(bookId);
};

/**
 * Get questions by book and chapter - tries database first, falls back to local
 */
export const getQuestionsByBookChapterAsync = async (
  bookId: string,
  chapter: number
): Promise<QuizQuestion[]> => {
  try {
    const dbQuestions = await fetchQuestionsByBookChapter(bookId, chapter);
    if (dbQuestions.length > 0) {
      return dbQuestions;
    }
  } catch (error) {
    console.warn('Failed to fetch from DB, using local data:', error);
  }
  return getQuestionsByBookChapter(bookId, chapter);
};

/**
 * Check if book has questions - tries database first, falls back to local
 */
export const bookHasQuestionsAsync = async (bookId: string): Promise<boolean> => {
  try {
    const hasDbQuestions = await checkBookHasQuestions(bookId);
    if (hasDbQuestions) {
      return true;
    }
  } catch (error) {
    console.warn('Failed to check DB, using local data:', error);
  }
  return bookHasQuestions(bookId);
};

/**
 * Get available chapters - tries database first, falls back to local
 */
export const getAvailableChaptersAsync = async (bookId: string): Promise<number[]> => {
  try {
    const dbChapters = await fetchAvailableChapters(bookId);
    if (dbChapters.length > 0) {
      return dbChapters;
    }
  } catch (error) {
    console.warn('Failed to fetch from DB, using local data:', error);
  }
  return getAvailableChapters(bookId);
};

/**
 * Get total question count - tries database first, falls back to local
 */
export const getTotalQuestionCountAsync = async (): Promise<number> => {
  try {
    const dbCount = await fetchTotalQuestionCount();
    if (dbCount > 0) {
      return dbCount;
    }
  } catch (error) {
    console.warn('Failed to fetch from DB, using local data:', error);
  }
  return getTotalQuestionCount();
};
