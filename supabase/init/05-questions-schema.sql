-- =============================================
-- Bible Journey - Questions Schema
-- Store questions in database instead of code
-- =============================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.question_options CASCADE;
DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.books CASCADE;

-- =============================================
-- Books Table
-- =============================================
CREATE TABLE public.books (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    testament TEXT NOT NULL CHECK (testament IN ('old', 'new')),
    chapters_count INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
);

-- Insert all Bible books
INSERT INTO public.books (id, name, testament, chapters_count, sort_order) VALUES
-- Old Testament
('genesis', 'Genèse', 'old', 50, 1),
('exodus', 'Exode', 'old', 40, 2),
('leviticus', 'Lévitique', 'old', 27, 3),
('numbers', 'Nombres', 'old', 36, 4),
('deuteronomy', 'Deutéronome', 'old', 34, 5),
('joshua', 'Josué', 'old', 24, 6),
('judges', 'Juges', 'old', 21, 7),
('ruth', 'Ruth', 'old', 4, 8),
('1samuel', '1 Samuel', 'old', 31, 9),
('2samuel', '2 Samuel', 'old', 24, 10),
('1kings', '1 Rois', 'old', 22, 11),
('2kings', '2 Rois', 'old', 25, 12),
('1chronicles', '1 Chroniques', 'old', 29, 13),
('2chronicles', '2 Chroniques', 'old', 36, 14),
('ezra', 'Esdras', 'old', 10, 15),
('nehemiah', 'Néhémie', 'old', 13, 16),
('esther', 'Esther', 'old', 10, 17),
('job', 'Job', 'old', 42, 18),
('psalms', 'Psaumes', 'old', 150, 19),
('proverbs', 'Proverbes', 'old', 31, 20),
('ecclesiastes', 'Ecclésiaste', 'old', 12, 21),
('song', 'Cantique des Cantiques', 'old', 8, 22),
('isaiah', 'Ésaïe', 'old', 66, 23),
('jeremiah', 'Jérémie', 'old', 52, 24),
('lamentations', 'Lamentations', 'old', 5, 25),
('ezekiel', 'Ézéchiel', 'old', 48, 26),
('daniel', 'Daniel', 'old', 12, 27),
('hosea', 'Osée', 'old', 14, 28),
('joel', 'Joël', 'old', 3, 29),
('amos', 'Amos', 'old', 9, 30),
('obadiah', 'Abdias', 'old', 1, 31),
('jonah', 'Jonas', 'old', 4, 32),
('micah', 'Michée', 'old', 7, 33),
('nahum', 'Nahum', 'old', 3, 34),
('habakkuk', 'Habacuc', 'old', 3, 35),
('zephaniah', 'Sophonie', 'old', 3, 36),
('haggai', 'Aggée', 'old', 2, 37),
('zechariah', 'Zacharie', 'old', 14, 38),
('malachi', 'Malachie', 'old', 4, 39),
-- New Testament
('matthew', 'Matthieu', 'new', 28, 40),
('mark', 'Marc', 'new', 16, 41),
('luke', 'Luc', 'new', 24, 42),
('john', 'Jean', 'new', 21, 43),
('acts', 'Actes', 'new', 28, 44),
('romans', 'Romains', 'new', 16, 45),
('1corinthians', '1 Corinthiens', 'new', 16, 46),
('2corinthians', '2 Corinthiens', 'new', 13, 47),
('galatians', 'Galates', 'new', 6, 48),
('ephesians', 'Éphésiens', 'new', 6, 49),
('philippians', 'Philippiens', 'new', 4, 50),
('colossians', 'Colossiens', 'new', 4, 51),
('1thessalonians', '1 Thessaloniciens', 'new', 5, 52),
('2thessalonians', '2 Thessaloniciens', 'new', 3, 53),
('1timothy', '1 Timothée', 'new', 6, 54),
('2timothy', '2 Timothée', 'new', 4, 55),
('titus', 'Tite', 'new', 3, 56),
('philemon', 'Philémon', 'new', 1, 57),
('hebrews', 'Hébreux', 'new', 13, 58),
('james', 'Jacques', 'new', 5, 59),
('1peter', '1 Pierre', 'new', 5, 60),
('2peter', '2 Pierre', 'new', 3, 61),
('1john', '1 Jean', 'new', 5, 62),
('2john', '2 Jean', 'new', 1, 63),
('3john', '3 Jean', 'new', 1, 64),
('jude', 'Jude', 'new', 1, 65),
('revelation', 'Apocalypse', 'new', 22, 66);

-- =============================================
-- Questions Table
-- =============================================
CREATE TABLE public.questions (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES public.books(id),
    chapter INTEGER NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'fill_blank', 'true_false', 'verse_order')),
    question_text TEXT NOT NULL,
    verse_text TEXT,
    verse_reference TEXT,
    explanation TEXT,
    xp_reward INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- Question Options Table
-- =============================================
CREATE TABLE public.question_options (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- =============================================
-- Indexes for performance
-- =============================================
CREATE INDEX idx_questions_book_id ON public.questions(book_id);
CREATE INDEX idx_questions_chapter ON public.questions(book_id, chapter);
CREATE INDEX idx_question_options_question_id ON public.question_options(question_id);

-- =============================================
-- RLS Policies - Public read access
-- =============================================
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;

-- Everyone can read books
CREATE POLICY "Public can read books" ON public.books FOR SELECT USING (true);

-- Everyone can read questions
CREATE POLICY "Public can read questions" ON public.questions FOR SELECT USING (true);

-- Everyone can read options
CREATE POLICY "Public can read options" ON public.question_options FOR SELECT USING (true);

-- =============================================
-- Views for easy querying
-- =============================================
CREATE OR REPLACE VIEW public.questions_with_options AS
SELECT
    q.id,
    q.book_id,
    q.chapter,
    q.question_type,
    q.question_text,
    q.verse_text,
    q.verse_reference,
    q.explanation,
    q.xp_reward,
    json_agg(
        json_build_object(
            'id', o.id,
            'text', o.option_text,
            'isCorrect', o.is_correct
        ) ORDER BY o.sort_order
    ) AS options
FROM public.questions q
LEFT JOIN public.question_options o ON q.id = o.question_id
GROUP BY q.id;

-- Grant access to the view
GRANT SELECT ON public.questions_with_options TO anon, authenticated;
GRANT SELECT ON public.books TO anon, authenticated;
GRANT SELECT ON public.questions TO anon, authenticated;
GRANT SELECT ON public.question_options TO anon, authenticated;

-- =============================================
-- Sample questions removed - see 06-migrated-questions.sql
-- for the complete set of 524 questions
-- =============================================
