import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bibleVerses, versesCategories, BibleVerse } from "@/data/versesContent";
import { useVerseProgress } from "@/hooks/useVerseProgress";
import VerseCard from "@/components/VerseCard";

const VersesPage = () => {
  const navigate = useNavigate();
  const { verseProgress, getVerseProgress } = useVerseProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const filteredVerses = useMemo(() => {
    let filtered = [...bibleVerses];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (verse) =>
          verse.reference.toLowerCase().includes(query) ||
          verse.text.toLowerCase().includes(query) ||
          verse.book.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((verse) => verse.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((verse) => verse.difficulty === selectedDifficulty);
    }

    // Sort
    switch (sortBy) {
      case "mastery-desc":
        filtered.sort((a, b) => {
          const progressA = getVerseProgress(a.id)?.mastery_level ?? 0;
          const progressB = getVerseProgress(b.id)?.mastery_level ?? 0;
          return progressB - progressA;
        });
        break;
      case "mastery-asc":
        filtered.sort((a, b) => {
          const progressA = getVerseProgress(a.id)?.mastery_level ?? 0;
          const progressB = getVerseProgress(b.id)?.mastery_level ?? 0;
          return progressA - progressB;
        });
        break;
      case "book":
        filtered.sort((a, b) => a.book.localeCompare(b.book));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy, getVerseProgress]);

  // Stats
  const totalVerses = bibleVerses.length;
  const learnedVerses = verseProgress.filter((vp) => vp.mastery_level >= 3).length;
  const masteredVerses = verseProgress.filter((vp) => vp.mastery_level >= 5).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground">Catalogue des Versets</h1>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl font-bold text-foreground">{totalVerses}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-primary/30 text-center">
            <div className="text-2xl font-bold text-primary">{learnedVerses}</div>
            <div className="text-sm text-muted-foreground">Appris</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-amber-500/30 text-center">
            <div className="text-2xl font-bold text-amber-500">{masteredVerses}</div>
            <div className="text-sm text-muted-foreground">Maîtrisés</div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="space-y-4 mb-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un verset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {versesCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulté" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="beginner">🟢 Débutant</SelectItem>
                <SelectItem value="intermediate">🟡 Intermédiaire</SelectItem>
                <SelectItem value="advanced">🔴 Avancé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Par défaut</SelectItem>
                <SelectItem value="mastery-desc">Maîtrise ↓</SelectItem>
                <SelectItem value="mastery-asc">Maîtrise ↑</SelectItem>
                <SelectItem value="book">Livre biblique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Tous
          </button>
          {versesCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-4">
          {filteredVerses.length} verset{filteredVerses.length > 1 ? "s" : ""} trouvé{filteredVerses.length > 1 ? "s" : ""}
        </div>

        {/* Verses list */}
        <div className="space-y-3">
          {filteredVerses.map((verse) => {
            const category = versesCategories.find((c) => c.id === verse.category);
            const progress = getVerseProgress(verse.id);
            return (
              <VerseCard
                key={verse.id}
                reference={verse.reference}
                preview={verse.text.substring(0, 80)}
                category={verse.category}
                categoryIcon={category?.icon || "📖"}
                difficulty={verse.difficulty}
                isLocked={false}
                isCompleted={progress?.mastery_level ? progress.mastery_level >= 4 : false}
                masteryLevel={progress?.mastery_level || 0}
                onClick={() => navigate(`/verse/${verse.id}`)}
              />
            );
          })}
        </div>

        {filteredVerses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">
              Aucun verset trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez d'ajuster vos filtres ou votre recherche.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VersesPage;
