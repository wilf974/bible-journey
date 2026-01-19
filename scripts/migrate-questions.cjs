/**
 * Script to migrate all questions from TypeScript files to SQL format
 * Run with: node scripts/migrate-questions.js
 */

const fs = require('fs');
const path = require('path');

// Helper function to escape SQL strings
function escapeSql(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

// Read and parse a TypeScript file to extract question arrays
function extractQuestionsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];

  // Match each question object
  const questionRegex = /\{\s*id:\s*"([^"]+)"[^}]*bookId:\s*"([^"]+)"[^}]*chapter:\s*(\d+)[^}]*type:\s*"([^"]+)"[^}]*question:\s*"([^"]+)"[^}]*(?:verse:\s*"([^"]+)")?[^}]*(?:verseReference:\s*"([^"]+)")?[^}]*options:\s*\[([\s\S]*?)\][^}]*(?:explanation:\s*"([^"]+)")?[^}]*xpReward:\s*(\d+)/g;

  let match;
  while ((match = questionRegex.exec(content)) !== null) {
    const [_, id, bookId, chapter, type, questionText, verse, verseReference, optionsStr, explanation, xpReward] = match;

    // Parse options
    const optionRegex = /\{\s*id:\s*"([^"]+)",\s*text:\s*"([^"]+)",\s*isCorrect:\s*(true|false)\s*\}/g;
    const options = [];
    let optMatch;
    while ((optMatch = optionRegex.exec(optionsStr)) !== null) {
      options.push({
        id: `${id}-${optMatch[1]}`,
        text: optMatch[2],
        isCorrect: optMatch[3] === 'true'
      });
    }

    questions.push({
      id,
      bookId,
      chapter: parseInt(chapter),
      type,
      questionText,
      verse: verse || null,
      verseReference: verseReference || null,
      explanation: explanation || null,
      xpReward: parseInt(xpReward),
      options
    });
  }

  return questions;
}

// Alternative: Use a simpler regex approach for multi-line content
function extractQuestionsSimple(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];

  // Split by question blocks
  const blocks = content.split(/\{\s*\n?\s*id:/);

  for (let i = 1; i < blocks.length; i++) {
    const block = 'id:' + blocks[i];

    // Extract fields
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const bookIdMatch = block.match(/bookId:\s*"([^"]+)"/);
    const chapterMatch = block.match(/chapter:\s*(\d+)/);
    const typeMatch = block.match(/type:\s*"([^"]+)"/);
    const questionMatch = block.match(/question:\s*"([^"]+)"/);
    const verseMatch = block.match(/verse:\s*"([^"]+)"/);
    const verseRefMatch = block.match(/verseReference:\s*"([^"]+)"/);
    const explanationMatch = block.match(/explanation:\s*"([^"]+)"/);
    const xpMatch = block.match(/xpReward:\s*(\d+)/);

    if (!idMatch || !bookIdMatch || !chapterMatch || !typeMatch || !questionMatch) {
      continue;
    }

    // Extract options
    const optionsSection = block.match(/options:\s*\[([\s\S]*?)\]/);
    const options = [];
    if (optionsSection) {
      const optionRegex = /\{\s*id:\s*"([^"]+)",\s*text:\s*"([^"]+)",\s*isCorrect:\s*(true|false)\s*\}/g;
      let optMatch;
      while ((optMatch = optionRegex.exec(optionsSection[1])) !== null) {
        options.push({
          id: `${idMatch[1]}-${optMatch[1]}`,
          text: optMatch[2],
          isCorrect: optMatch[3] === 'true',
          sortOrder: options.length + 1
        });
      }
    }

    questions.push({
      id: idMatch[1],
      bookId: bookIdMatch[1],
      chapter: parseInt(chapterMatch[1]),
      type: typeMatch[1],
      questionText: questionMatch[1],
      verse: verseMatch ? verseMatch[1] : null,
      verseReference: verseRefMatch ? verseRefMatch[1] : null,
      explanation: explanationMatch ? explanationMatch[1] : null,
      xpReward: xpMatch ? parseInt(xpMatch[1]) : 10,
      options
    });
  }

  return questions;
}

// Generate SQL for questions
function generateSql(questions) {
  let sql = `-- =============================================
-- Bible Journey - Migrated Questions
-- Generated on ${new Date().toISOString()}
-- Total questions: ${questions.length}
-- =============================================

-- Delete existing questions (but keep sample ones if needed)
-- TRUNCATE public.questions CASCADE;

`;

  // Group questions by book for better organization
  const byBook = {};
  questions.forEach(q => {
    if (!byBook[q.bookId]) byBook[q.bookId] = [];
    byBook[q.bookId].push(q);
  });

  for (const [bookId, bookQuestions] of Object.entries(byBook)) {
    sql += `\n-- =============================================\n`;
    sql += `-- ${bookId.toUpperCase()} (${bookQuestions.length} questions)\n`;
    sql += `-- =============================================\n\n`;

    // Insert questions
    sql += `INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES\n`;

    const questionValues = bookQuestions.map(q => {
      return `(${escapeSql(q.id)}, ${escapeSql(q.bookId)}, ${q.chapter}, ${escapeSql(q.type)}, ${escapeSql(q.questionText)}, ${q.verse ? escapeSql(q.verse) : 'NULL'}, ${q.verseReference ? escapeSql(q.verseReference) : 'NULL'}, ${q.explanation ? escapeSql(q.explanation) : 'NULL'}, ${q.xpReward})`;
    });

    sql += questionValues.join(',\n') + '\nON CONFLICT (id) DO NOTHING;\n\n';

    // Insert options
    sql += `INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES\n`;

    const optionValues = [];
    bookQuestions.forEach(q => {
      q.options.forEach((opt, idx) => {
        optionValues.push(`(${escapeSql(opt.id)}, ${escapeSql(q.id)}, ${escapeSql(opt.text)}, ${opt.isCorrect}, ${idx + 1})`);
      });
    });

    sql += optionValues.join(',\n') + '\nON CONFLICT (id) DO NOTHING;\n';
  }

  return sql;
}

// Main execution
const questionFiles = [
  'src/data/bibleContent.ts',
  'src/data/bibleQuestions/pentateuchQuestions.ts',
  'src/data/bibleQuestions/historicalQuestions.ts',
  'src/data/bibleQuestions/wisdomQuestions.ts',
  'src/data/bibleQuestions/prophetQuestions.ts',
  'src/data/bibleQuestions/gospelQuestions.ts',
  'src/data/bibleQuestions/epistleQuestions.ts',
  'src/data/bibleQuestions/genesisExtendedQuestions.ts',
  'src/data/bibleQuestions/exodusExtendedQuestions.ts',
  'src/data/bibleQuestions/newTestamentExtendedQuestions.ts',
  'src/data/bibleQuestions/oldTestamentExtendedQuestions.ts',
];

const allQuestions = [];
const basePath = process.cwd();

console.log('Extracting questions from TypeScript files...\n');

questionFiles.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    const questions = extractQuestionsSimple(fullPath);
    console.log(`  ${file}: ${questions.length} questions`);
    allQuestions.push(...questions);
  } else {
    console.log(`  ${file}: FILE NOT FOUND`);
  }
});

console.log(`\nTotal questions extracted: ${allQuestions.length}`);

// Remove duplicates by ID (keep first occurrence)
const seenIds = new Set();
const uniqueQuestions = allQuestions.filter(q => {
  if (seenIds.has(q.id)) {
    return false;
  }
  seenIds.add(q.id);
  return true;
});

console.log(`After removing duplicates: ${uniqueQuestions.length} unique questions`);
console.log(`Removed ${allQuestions.length - uniqueQuestions.length} duplicates`);

// Generate SQL
const sql = generateSql(uniqueQuestions);

// Write to file
const outputPath = path.join(basePath, 'supabase/init/06-migrated-questions.sql');
fs.writeFileSync(outputPath, sql);
console.log(`\nSQL written to: ${outputPath}`);
console.log('You can now apply this migration to your database.');
