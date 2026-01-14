// Re-export all Bible content from the main file and additional questions
export * from '../bibleContent';
export * from './pentateuchQuestions';
export * from './historicalQuestions';
export * from './wisdomQuestions';
export * from './prophetQuestions';
export * from './gospelQuestions';
export * from './epistleQuestions';

// Combine all questions
import { genesisQuestions, exodusQuestions, matthewQuestions, johnQuestions } from '../bibleContent';
import { leviticusQuestions, numbersQuestions, deuteronomyQuestions } from './pentateuchQuestions';
import { joshuaQuestions, judgesQuestions, ruthQuestions, samuel1Questions, samuel2Questions, kings1Questions, kings2Questions } from './historicalQuestions';
import { jobQuestions, psalmsQuestions, proverbsQuestions, ecclesiastesQuestions } from './wisdomQuestions';
import { isaiahQuestions, jeremiahQuestions, ezekielQuestions, danielQuestions } from './prophetQuestions';
import { markQuestions, lukeQuestions, actsQuestions } from './gospelQuestions';
import { romansQuestions, corinthians1Questions, corinthians2Questions, galatiansQuestions, ephesiansQuestions, philippiansQuestions, hebrewsQuestions, jamesQuestions, revelationQuestions } from './epistleQuestions';

export const completeQuestionBank = [
  // Pentateuque
  ...genesisQuestions,
  ...exodusQuestions,
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
];

// Get questions by book
export const getQuestionsByBookId = (bookId: string) => {
  return completeQuestionBank.filter(q => q.bookId === bookId);
};

// Get questions by book and chapter
export const getQuestionsByBookChapter = (bookId: string, chapter: number) => {
  return completeQuestionBank.filter(q => q.bookId === bookId && q.chapter === chapter);
};

// Check if a book has questions available
export const bookHasQuestions = (bookId: string): boolean => {
  return completeQuestionBank.some(q => q.bookId === bookId);
};

// Get available chapters for a book
export const getAvailableChapters = (bookId: string): number[] => {
  const chapters = completeQuestionBank
    .filter(q => q.bookId === bookId)
    .map(q => q.chapter);
  return [...new Set(chapters)].sort((a, b) => a - b);
};
