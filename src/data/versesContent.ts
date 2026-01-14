export interface BibleVerse {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  verseNumber: number;
  text: string;
  category: "faith" | "love" | "hope" | "wisdom" | "strength" | "peace" | "salvation";
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const versesCategories = [
  { id: "faith", name: "Foi", icon: "✝️", color: "primary" },
  { id: "love", name: "Amour", icon: "❤️", color: "destructive" },
  { id: "hope", name: "Espérance", icon: "🌟", color: "secondary" },
  { id: "wisdom", name: "Sagesse", icon: "📖", color: "primary" },
  { id: "strength", name: "Force", icon: "💪", color: "secondary" },
  { id: "peace", name: "Paix", icon: "🕊️", color: "primary" },
  { id: "salvation", name: "Salut", icon: "🙏", color: "secondary" },
] as const;

export const bibleVerses: BibleVerse[] = [
  // Foi - Beginner
  {
    id: "john-3-16",
    reference: "Jean 3:16",
    book: "Jean",
    chapter: 3,
    verseNumber: 16,
    text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
    category: "faith",
    difficulty: "beginner",
  },
  {
    id: "hebrews-11-1",
    reference: "Hébreux 11:1",
    book: "Hébreux",
    chapter: 11,
    verseNumber: 1,
    text: "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.",
    category: "faith",
    difficulty: "beginner",
  },
  {
    id: "romans-10-17",
    reference: "Romains 10:17",
    book: "Romains",
    chapter: 10,
    verseNumber: 17,
    text: "Ainsi la foi vient de ce qu'on entend, et ce qu'on entend vient de la parole de Christ.",
    category: "faith",
    difficulty: "beginner",
  },
  {
    id: "mark-11-24",
    reference: "Marc 11:24",
    book: "Marc",
    chapter: 11,
    verseNumber: 24,
    text: "C'est pourquoi je vous dis: Tout ce que vous demanderez en priant, croyez que vous l'avez reçu, et vous le verrez s'accomplir.",
    category: "faith",
    difficulty: "intermediate",
  },

  // Amour
  {
    id: "1-cor-13-4",
    reference: "1 Corinthiens 13:4-5",
    book: "1 Corinthiens",
    chapter: 13,
    verseNumber: 4,
    text: "L'amour est patient, l'amour est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point, il ne s'enfle point d'orgueil.",
    category: "love",
    difficulty: "beginner",
  },
  {
    id: "1-john-4-8",
    reference: "1 Jean 4:8",
    book: "1 Jean",
    chapter: 4,
    verseNumber: 8,
    text: "Celui qui n'aime pas n'a pas connu Dieu, car Dieu est amour.",
    category: "love",
    difficulty: "beginner",
  },
  {
    id: "john-15-13",
    reference: "Jean 15:13",
    book: "Jean",
    chapter: 15,
    verseNumber: 13,
    text: "Il n'y a pas de plus grand amour que de donner sa vie pour ses amis.",
    category: "love",
    difficulty: "beginner",
  },
  {
    id: "romans-8-38-39",
    reference: "Romains 8:38-39",
    book: "Romains",
    chapter: 8,
    verseNumber: 38,
    text: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus Christ notre Seigneur.",
    category: "love",
    difficulty: "advanced",
  },

  // Espérance
  {
    id: "jeremiah-29-11",
    reference: "Jérémie 29:11",
    book: "Jérémie",
    chapter: 29,
    verseNumber: 11,
    text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    category: "hope",
    difficulty: "beginner",
  },
  {
    id: "romans-15-13",
    reference: "Romains 15:13",
    book: "Romains",
    chapter: 15,
    verseNumber: 13,
    text: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi, pour que vous abondiez en espérance, par la puissance du Saint Esprit!",
    category: "hope",
    difficulty: "intermediate",
  },
  {
    id: "psalm-27-14",
    reference: "Psaume 27:14",
    book: "Psaumes",
    chapter: 27,
    verseNumber: 14,
    text: "Espère en l'Éternel! Fortifie-toi et que ton cœur s'affermisse! Espère en l'Éternel!",
    category: "hope",
    difficulty: "beginner",
  },

  // Sagesse
  {
    id: "proverbs-3-5-6",
    reference: "Proverbes 3:5-6",
    book: "Proverbes",
    chapter: 3,
    verseNumber: 5,
    text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse. Reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
    category: "wisdom",
    difficulty: "beginner",
  },
  {
    id: "james-1-5",
    reference: "Jacques 1:5",
    book: "Jacques",
    chapter: 1,
    verseNumber: 5,
    text: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.",
    category: "wisdom",
    difficulty: "beginner",
  },
  {
    id: "proverbs-9-10",
    reference: "Proverbes 9:10",
    book: "Proverbes",
    chapter: 9,
    verseNumber: 10,
    text: "Le commencement de la sagesse, c'est la crainte de l'Éternel; et la science des saints, c'est l'intelligence.",
    category: "wisdom",
    difficulty: "beginner",
  },

  // Force
  {
    id: "philippians-4-13",
    reference: "Philippiens 4:13",
    book: "Philippiens",
    chapter: 4,
    verseNumber: 13,
    text: "Je puis tout par celui qui me fortifie.",
    category: "strength",
    difficulty: "beginner",
  },
  {
    id: "isaiah-40-31",
    reference: "Ésaïe 40:31",
    book: "Ésaïe",
    chapter: 40,
    verseNumber: 31,
    text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point, ils marchent, et ne se fatiguent point.",
    category: "strength",
    difficulty: "intermediate",
  },
  {
    id: "joshua-1-9",
    reference: "Josué 1:9",
    book: "Josué",
    chapter: 1,
    verseNumber: 9,
    text: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi partout où tu iras.",
    category: "strength",
    difficulty: "beginner",
  },
  {
    id: "2-timothy-1-7",
    reference: "2 Timothée 1:7",
    book: "2 Timothée",
    chapter: 1,
    verseNumber: 7,
    text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.",
    category: "strength",
    difficulty: "beginner",
  },

  // Paix
  {
    id: "john-14-27",
    reference: "Jean 14:27",
    book: "Jean",
    chapter: 14,
    verseNumber: 27,
    text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.",
    category: "peace",
    difficulty: "beginner",
  },
  {
    id: "philippians-4-6-7",
    reference: "Philippiens 4:6-7",
    book: "Philippiens",
    chapter: 4,
    verseNumber: 6,
    text: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus Christ.",
    category: "peace",
    difficulty: "intermediate",
  },
  {
    id: "isaiah-26-3",
    reference: "Ésaïe 26:3",
    book: "Ésaïe",
    chapter: 26,
    verseNumber: 3,
    text: "A celui qui est ferme dans ses sentiments tu assures la paix, la paix, parce qu'il se confie en toi.",
    category: "peace",
    difficulty: "beginner",
  },

  // Salut
  {
    id: "romans-10-9",
    reference: "Romains 10:9",
    book: "Romains",
    chapter: 10,
    verseNumber: 9,
    text: "Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l'a ressuscité des morts, tu seras sauvé.",
    category: "salvation",
    difficulty: "beginner",
  },
  {
    id: "ephesians-2-8-9",
    reference: "Éphésiens 2:8-9",
    book: "Éphésiens",
    chapter: 2,
    verseNumber: 8,
    text: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu. Ce n'est point par les œuvres, afin que personne ne se glorifie.",
    category: "salvation",
    difficulty: "intermediate",
  },
  {
    id: "acts-4-12",
    reference: "Actes 4:12",
    book: "Actes",
    chapter: 4,
    verseNumber: 12,
    text: "Il n'y a de salut en aucun autre; car il n'y a sous le ciel aucun autre nom qui ait été donné parmi les hommes, par lequel nous devions être sauvés.",
    category: "salvation",
    difficulty: "beginner",
  },
  {
    id: "john-14-6",
    reference: "Jean 14:6",
    book: "Jean",
    chapter: 14,
    verseNumber: 6,
    text: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
    category: "salvation",
    difficulty: "beginner",
  },
];

export const getVersesByCategory = (category: string): BibleVerse[] => {
  return bibleVerses.filter((v) => v.category === category);
};

export const getVersesByDifficulty = (difficulty: string): BibleVerse[] => {
  return bibleVerses.filter((v) => v.difficulty === difficulty);
};

export const getVerseById = (id: string): BibleVerse | undefined => {
  return bibleVerses.find((v) => v.id === id);
};
