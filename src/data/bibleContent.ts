// Bible books data structure
export interface BibleBook {
  id: string;
  name: string;
  testament: "old" | "new";
  chaptersCount: number;
  order: number;
}

export interface BibleChapter {
  bookId: string;
  chapter: number;
  versesCount: number;
  keyVerses: string[];
}

export interface QuizQuestion {
  id: string;
  bookId: string;
  chapter: number;
  type: "multiple_choice" | "fill_blank" | "true_false" | "verse_order";
  question: string;
  verse?: string;
  verseReference?: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation?: string;
  xpReward: number;
}

// Old Testament books
export const oldTestamentBooks: BibleBook[] = [
  { id: "genesis", name: "Genèse", testament: "old", chaptersCount: 50, order: 1 },
  { id: "exodus", name: "Exode", testament: "old", chaptersCount: 40, order: 2 },
  { id: "leviticus", name: "Lévitique", testament: "old", chaptersCount: 27, order: 3 },
  { id: "numbers", name: "Nombres", testament: "old", chaptersCount: 36, order: 4 },
  { id: "deuteronomy", name: "Deutéronome", testament: "old", chaptersCount: 34, order: 5 },
  { id: "joshua", name: "Josué", testament: "old", chaptersCount: 24, order: 6 },
  { id: "judges", name: "Juges", testament: "old", chaptersCount: 21, order: 7 },
  { id: "ruth", name: "Ruth", testament: "old", chaptersCount: 4, order: 8 },
  { id: "1samuel", name: "1 Samuel", testament: "old", chaptersCount: 31, order: 9 },
  { id: "2samuel", name: "2 Samuel", testament: "old", chaptersCount: 24, order: 10 },
  { id: "1kings", name: "1 Rois", testament: "old", chaptersCount: 22, order: 11 },
  { id: "2kings", name: "2 Rois", testament: "old", chaptersCount: 25, order: 12 },
  { id: "1chronicles", name: "1 Chroniques", testament: "old", chaptersCount: 29, order: 13 },
  { id: "2chronicles", name: "2 Chroniques", testament: "old", chaptersCount: 36, order: 14 },
  { id: "ezra", name: "Esdras", testament: "old", chaptersCount: 10, order: 15 },
  { id: "nehemiah", name: "Néhémie", testament: "old", chaptersCount: 13, order: 16 },
  { id: "esther", name: "Esther", testament: "old", chaptersCount: 10, order: 17 },
  { id: "job", name: "Job", testament: "old", chaptersCount: 42, order: 18 },
  { id: "psalms", name: "Psaumes", testament: "old", chaptersCount: 150, order: 19 },
  { id: "proverbs", name: "Proverbes", testament: "old", chaptersCount: 31, order: 20 },
  { id: "ecclesiastes", name: "Ecclésiaste", testament: "old", chaptersCount: 12, order: 21 },
  { id: "song", name: "Cantique des Cantiques", testament: "old", chaptersCount: 8, order: 22 },
  { id: "isaiah", name: "Ésaïe", testament: "old", chaptersCount: 66, order: 23 },
  { id: "jeremiah", name: "Jérémie", testament: "old", chaptersCount: 52, order: 24 },
  { id: "lamentations", name: "Lamentations", testament: "old", chaptersCount: 5, order: 25 },
  { id: "ezekiel", name: "Ézéchiel", testament: "old", chaptersCount: 48, order: 26 },
  { id: "daniel", name: "Daniel", testament: "old", chaptersCount: 12, order: 27 },
  { id: "hosea", name: "Osée", testament: "old", chaptersCount: 14, order: 28 },
  { id: "joel", name: "Joël", testament: "old", chaptersCount: 3, order: 29 },
  { id: "amos", name: "Amos", testament: "old", chaptersCount: 9, order: 30 },
  { id: "obadiah", name: "Abdias", testament: "old", chaptersCount: 1, order: 31 },
  { id: "jonah", name: "Jonas", testament: "old", chaptersCount: 4, order: 32 },
  { id: "micah", name: "Michée", testament: "old", chaptersCount: 7, order: 33 },
  { id: "nahum", name: "Nahum", testament: "old", chaptersCount: 3, order: 34 },
  { id: "habakkuk", name: "Habacuc", testament: "old", chaptersCount: 3, order: 35 },
  { id: "zephaniah", name: "Sophonie", testament: "old", chaptersCount: 3, order: 36 },
  { id: "haggai", name: "Aggée", testament: "old", chaptersCount: 2, order: 37 },
  { id: "zechariah", name: "Zacharie", testament: "old", chaptersCount: 14, order: 38 },
  { id: "malachi", name: "Malachie", testament: "old", chaptersCount: 4, order: 39 },
];

// New Testament books
export const newTestamentBooks: BibleBook[] = [
  { id: "matthew", name: "Matthieu", testament: "new", chaptersCount: 28, order: 40 },
  { id: "mark", name: "Marc", testament: "new", chaptersCount: 16, order: 41 },
  { id: "luke", name: "Luc", testament: "new", chaptersCount: 24, order: 42 },
  { id: "john", name: "Jean", testament: "new", chaptersCount: 21, order: 43 },
  { id: "acts", name: "Actes", testament: "new", chaptersCount: 28, order: 44 },
  { id: "romans", name: "Romains", testament: "new", chaptersCount: 16, order: 45 },
  { id: "1corinthians", name: "1 Corinthiens", testament: "new", chaptersCount: 16, order: 46 },
  { id: "2corinthians", name: "2 Corinthiens", testament: "new", chaptersCount: 13, order: 47 },
  { id: "galatians", name: "Galates", testament: "new", chaptersCount: 6, order: 48 },
  { id: "ephesians", name: "Éphésiens", testament: "new", chaptersCount: 6, order: 49 },
  { id: "philippians", name: "Philippiens", testament: "new", chaptersCount: 4, order: 50 },
  { id: "colossians", name: "Colossiens", testament: "new", chaptersCount: 4, order: 51 },
  { id: "1thessalonians", name: "1 Thessaloniciens", testament: "new", chaptersCount: 5, order: 52 },
  { id: "2thessalonians", name: "2 Thessaloniciens", testament: "new", chaptersCount: 3, order: 53 },
  { id: "1timothy", name: "1 Timothée", testament: "new", chaptersCount: 6, order: 54 },
  { id: "2timothy", name: "2 Timothée", testament: "new", chaptersCount: 4, order: 55 },
  { id: "titus", name: "Tite", testament: "new", chaptersCount: 3, order: 56 },
  { id: "philemon", name: "Philémon", testament: "new", chaptersCount: 1, order: 57 },
  { id: "hebrews", name: "Hébreux", testament: "new", chaptersCount: 13, order: 58 },
  { id: "james", name: "Jacques", testament: "new", chaptersCount: 5, order: 59 },
  { id: "1peter", name: "1 Pierre", testament: "new", chaptersCount: 5, order: 60 },
  { id: "2peter", name: "2 Pierre", testament: "new", chaptersCount: 3, order: 61 },
  { id: "1john", name: "1 Jean", testament: "new", chaptersCount: 5, order: 62 },
  { id: "2john", name: "2 Jean", testament: "new", chaptersCount: 1, order: 63 },
  { id: "3john", name: "3 Jean", testament: "new", chaptersCount: 1, order: 64 },
  { id: "jude", name: "Jude", testament: "new", chaptersCount: 1, order: 65 },
  { id: "revelation", name: "Apocalypse", testament: "new", chaptersCount: 22, order: 66 },
];

export const allBooks = [...oldTestamentBooks, ...newTestamentBooks];

// Sample quiz questions for Genesis chapter 1
export const sampleQuestions: QuizQuestion[] = [
  {
    id: "gen1-1",
    bookId: "genesis",
    chapter: 1,
    type: "multiple_choice",
    question: "Qu'a créé Dieu au commencement ?",
    verse: "Au commencement, Dieu créa les cieux et la terre.",
    verseReference: "Genèse 1:1",
    options: [
      { id: "a", text: "Les cieux et la terre", isCorrect: true },
      { id: "b", text: "La lumière et les ténèbres", isCorrect: false },
      { id: "c", text: "L'homme et la femme", isCorrect: false },
      { id: "d", text: "Les animaux et les plantes", isCorrect: false },
    ],
    explanation: "Le tout premier verset de la Bible nous dit que Dieu a créé les cieux et la terre.",
    xpReward: 10,
  },
  {
    id: "gen1-2",
    bookId: "genesis",
    chapter: 1,
    type: "multiple_choice",
    question: "Quelle était la première chose que Dieu a créée au premier jour ?",
    options: [
      { id: "a", text: "Le soleil", isCorrect: false },
      { id: "b", text: "La lumière", isCorrect: true },
      { id: "c", text: "Les étoiles", isCorrect: false },
      { id: "d", text: "La lune", isCorrect: false },
    ],
    verseReference: "Genèse 1:3",
    explanation: "Dieu dit : 'Que la lumière soit !' Et la lumière fut.",
    xpReward: 10,
  },
  {
    id: "gen1-3",
    bookId: "genesis",
    chapter: 1,
    type: "multiple_choice",
    question: "Combien de jours a pris la création selon la Genèse ?",
    options: [
      { id: "a", text: "5 jours", isCorrect: false },
      { id: "b", text: "6 jours", isCorrect: true },
      { id: "c", text: "7 jours", isCorrect: false },
      { id: "d", text: "4 jours", isCorrect: false },
    ],
    explanation: "Dieu a créé le monde en 6 jours et s'est reposé le 7ème jour.",
    xpReward: 10,
  },
  {
    id: "gen1-4",
    bookId: "genesis",
    chapter: 1,
    type: "multiple_choice",
    question: "Qu'a fait Dieu le septième jour ?",
    options: [
      { id: "a", text: "Il a créé l'homme", isCorrect: false },
      { id: "b", text: "Il a créé les animaux", isCorrect: false },
      { id: "c", text: "Il s'est reposé", isCorrect: true },
      { id: "d", text: "Il a créé la mer", isCorrect: false },
    ],
    verseReference: "Genèse 2:2",
    explanation: "Dieu acheva son œuvre le septième jour et se reposa.",
    xpReward: 10,
  },
  {
    id: "gen1-5",
    bookId: "genesis",
    chapter: 1,
    type: "multiple_choice",
    question: "À l'image de qui l'homme a-t-il été créé ?",
    verse: "Dieu créa l'homme à son image",
    verseReference: "Genèse 1:27",
    options: [
      { id: "a", text: "Des anges", isCorrect: false },
      { id: "b", text: "De Dieu", isCorrect: true },
      { id: "c", text: "Des animaux", isCorrect: false },
      { id: "d", text: "De la terre", isCorrect: false },
    ],
    xpReward: 15,
  },
];

// Lesson types
export interface Lesson {
  id: string;
  bookId: string;
  chapter: number;
  title: string;
  description: string;
  type: "intro" | "quiz" | "memorize" | "review";
  xpReward: number;
  questionsCount: number;
}

export const sampleLessons: Lesson[] = [
  {
    id: "genesis-1-intro",
    bookId: "genesis",
    chapter: 1,
    title: "La Création",
    description: "Découvrez comment Dieu a créé le monde en 6 jours",
    type: "intro",
    xpReward: 50,
    questionsCount: 5,
  },
  {
    id: "genesis-1-quiz",
    bookId: "genesis",
    chapter: 1,
    title: "Quiz: Genèse 1",
    description: "Testez vos connaissances sur le premier chapitre",
    type: "quiz",
    xpReward: 100,
    questionsCount: 10,
  },
  {
    id: "genesis-1-memorize",
    bookId: "genesis",
    chapter: 1,
    title: "Mémorisation",
    description: "Apprenez les versets clés de la Création",
    type: "memorize",
    xpReward: 75,
    questionsCount: 5,
  },
];
