export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "learning" | "streak" | "mastery" | "collection" | "special";
  requirement: {
    type: "verses_learned" | "streak_days" | "xp_earned" | "lessons_completed" | "perfect_reviews" | "category_mastery" | "total_reviews";
    value: number;
    categoryId?: string;
  };
  xpReward: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const achievements: Achievement[] = [
  // ==================== APPRENTISSAGE ====================
  {
    id: "first-verse",
    name: "Premier Pas",
    description: "Apprendre votre premier verset",
    icon: "🌱",
    category: "learning",
    requirement: { type: "verses_learned", value: 1 },
    xpReward: 50,
    rarity: "common",
  },
  {
    id: "ten-verses",
    name: "Disciple Assidu",
    description: "Apprendre 10 versets",
    icon: "📚",
    category: "learning",
    requirement: { type: "verses_learned", value: 10 },
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "fifty-verses",
    name: "Érudit",
    description: "Apprendre 50 versets",
    icon: "🎓",
    category: "learning",
    requirement: { type: "verses_learned", value: 50 },
    xpReward: 250,
    rarity: "rare",
  },
  {
    id: "hundred-verses",
    name: "Maître des Écritures",
    description: "Apprendre 100 versets",
    icon: "👑",
    category: "learning",
    requirement: { type: "verses_learned", value: 100 },
    xpReward: 500,
    rarity: "epic",
  },

  // ==================== SÉRIES ====================
  {
    id: "streak-3",
    name: "Première Flamme",
    description: "Maintenir une série de 3 jours",
    icon: "🔥",
    category: "streak",
    requirement: { type: "streak_days", value: 3 },
    xpReward: 50,
    rarity: "common",
  },
  {
    id: "streak-7",
    name: "Semaine Parfaite",
    description: "Maintenir une série de 7 jours",
    icon: "🌟",
    category: "streak",
    requirement: { type: "streak_days", value: 7 },
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "streak-30",
    name: "Mois de Dévotion",
    description: "Maintenir une série de 30 jours",
    icon: "💎",
    category: "streak",
    requirement: { type: "streak_days", value: 30 },
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "streak-100",
    name: "Centurion Fidèle",
    description: "Maintenir une série de 100 jours",
    icon: "🏆",
    category: "streak",
    requirement: { type: "streak_days", value: 100 },
    xpReward: 1000,
    rarity: "legendary",
  },

  // ==================== MAÎTRISE ====================
  {
    id: "perfect-review",
    name: "Mémoire Parfaite",
    description: "Réussir une révision sans erreur",
    icon: "✨",
    category: "mastery",
    requirement: { type: "perfect_reviews", value: 1 },
    xpReward: 25,
    rarity: "common",
  },
  {
    id: "ten-perfect-reviews",
    name: "Esprit Affûté",
    description: "10 révisions parfaites",
    icon: "🧠",
    category: "mastery",
    requirement: { type: "perfect_reviews", value: 10 },
    xpReward: 150,
    rarity: "rare",
  },
  {
    id: "total-reviews-50",
    name: "Réviseur Assidu",
    description: "Effectuer 50 révisions",
    icon: "🔄",
    category: "mastery",
    requirement: { type: "total_reviews", value: 50 },
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "total-reviews-200",
    name: "Maître de la Répétition",
    description: "Effectuer 200 révisions",
    icon: "♾️",
    category: "mastery",
    requirement: { type: "total_reviews", value: 200 },
    xpReward: 300,
    rarity: "epic",
  },

  // ==================== COLLECTION PAR CATÉGORIE ====================
  {
    id: "faith-collector",
    name: "Pilier de Foi",
    description: "Maîtriser 5 versets sur la Foi",
    icon: "✝️",
    category: "collection",
    requirement: { type: "category_mastery", value: 5, categoryId: "faith" },
    xpReward: 150,
    rarity: "rare",
  },
  {
    id: "love-collector",
    name: "Cœur d'Amour",
    description: "Maîtriser 5 versets sur l'Amour",
    icon: "❤️",
    category: "collection",
    requirement: { type: "category_mastery", value: 5, categoryId: "love" },
    xpReward: 150,
    rarity: "rare",
  },
  {
    id: "wisdom-collector",
    name: "Sage Parmi les Sages",
    description: "Maîtriser 5 versets sur la Sagesse",
    icon: "📖",
    category: "collection",
    requirement: { type: "category_mastery", value: 5, categoryId: "wisdom" },
    xpReward: 150,
    rarity: "rare",
  },
  {
    id: "hope-collector",
    name: "Porteur d'Espérance",
    description: "Maîtriser 5 versets sur l'Espérance",
    icon: "🌟",
    category: "collection",
    requirement: { type: "category_mastery", value: 5, categoryId: "hope" },
    xpReward: 150,
    rarity: "rare",
  },

  // ==================== SPÉCIAL ====================
  {
    id: "xp-1000",
    name: "Millénaire",
    description: "Gagner 1000 XP au total",
    icon: "⚡",
    category: "special",
    requirement: { type: "xp_earned", value: 1000 },
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "xp-5000",
    name: "Éclair Divin",
    description: "Gagner 5000 XP au total",
    icon: "🌩️",
    category: "special",
    requirement: { type: "xp_earned", value: 5000 },
    xpReward: 250,
    rarity: "rare",
  },
  {
    id: "xp-10000",
    name: "Légende Biblique",
    description: "Gagner 10000 XP au total",
    icon: "🌈",
    category: "special",
    requirement: { type: "xp_earned", value: 10000 },
    xpReward: 500,
    rarity: "legendary",
  },
  {
    id: "lessons-10",
    name: "Étudiant Appliqué",
    description: "Terminer 10 leçons",
    icon: "📝",
    category: "special",
    requirement: { type: "lessons_completed", value: 10 },
    xpReward: 100,
    rarity: "common",
  },
];

export const getAchievementById = (id: string) => {
  return achievements.find((a) => a.id === id);
};

export const getAchievementsByCategory = (category: Achievement["category"]) => {
  return achievements.filter((a) => a.category === category);
};

export const rarityColors = {
  common: "from-slate-400 to-slate-500",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-amber-400 to-amber-600",
};

export const rarityLabels = {
  common: "Commun",
  rare: "Rare",
  epic: "Épique",
  legendary: "Légendaire",
};
