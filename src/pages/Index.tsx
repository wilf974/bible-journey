import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Flame, Star, Trophy, ArrowRight, CheckCircle, Users } from "lucide-react";
import { useOnlinePlayers } from "@/hooks/useOnlinePlayers";

const Index = () => {
  const navigate = useNavigate();
  const { onlineCount, isConnected } = useOnlinePlayers();

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "66 livres",
      description: "Toute la Bible, de la Genèse à l'Apocalypse",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Séries quotidiennes",
      description: "Restez motivé avec des objectifs journaliers",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quiz interactifs",
      description: "Apprenez en vous amusant avec des défis variés",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Badges & récompenses",
      description: "Célébrez chaque étape de votre parcours",
    },
  ];

  const benefits = [
    "Apprenez l'histoire biblique",
    "Mémorisez des versets clés",
    "Comprenez les enseignements",
    "Suivez votre progression",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Navigation */}
        <nav className="container max-w-6xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-gold flex items-center justify-center shadow-button">
              <span className="text-xl sm:text-2xl">📖</span>
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl text-foreground hidden sm:block">
              BibleQuest
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")} className="text-sm">
              Connexion
            </Button>
            <Button size="sm" onClick={() => navigate("/auth")} className="text-sm">
              Commencer
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container max-w-6xl mx-auto px-4 py-12 sm:py-20 text-center">
          {/* Online Players Counter */}
          {isConnected && (
            <div className="inline-flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full mb-3 sm:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <Users className="w-3.5 h-3.5 text-green-600" />
              <span className="font-medium text-green-600 text-xs sm:text-sm">
                {onlineCount} joueur{onlineCount > 1 ? "s" : ""} en ligne
              </span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="font-semibold text-primary text-sm sm:text-base">Apprendre la Bible n'a jamais été aussi fun</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Découvrez la Bible
            <br />
            <span className="text-gradient">comme jamais</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            Une application ludique et complète pour apprendre toute la Bible,
            chapitre par chapitre, avec des quiz interactifs et un système de progression addictif.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Button
              size="lg"
              variant="hero"
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto sm:min-w-[250px]"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto"
            >
              Voir la démo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-16 px-4">
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-display font-bold text-foreground">66</p>
              <p className="text-sm sm:text-base text-muted-foreground">Livres</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-display font-bold text-foreground">1189</p>
              <p className="text-sm sm:text-base text-muted-foreground">Chapitres</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-display font-bold text-foreground">31K+</p>
              <p className="text-sm sm:text-base text-muted-foreground">Versets</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-display font-bold text-foreground">∞</p>
              <p className="text-sm sm:text-base text-muted-foreground">Sagesse</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-success/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-card">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-3 sm:mb-4">
              Apprenez en vous amusant
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Une expérience d'apprentissage inspirée des meilleures apps de langues
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center text-primary-foreground mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-4 sm:mb-6">
                Devenez expert de la Bible
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8">
                Que vous soyez débutant ou que vous connaissiez déjà bien les Écritures,
                BibleQuest s'adapte à votre niveau pour vous faire progresser.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-success flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success-foreground" />
                    </div>
                    <span className="text-lg text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock phone UI */}
            <div className="relative">
              <div className="bg-card rounded-3xl p-6 shadow-card border border-border max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                    <Flame className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">7 jours de série !</p>
                    <p className="text-sm text-muted-foreground">Continuez comme ça</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {["Genèse 1", "Genèse 2", "Genèse 3"].map((chapter, i) => (
                    <div
                      key={chapter}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
                        i === 0
                          ? "border-success bg-success/5"
                          : i === 1
                          ? "border-primary"
                          : "border-border opacity-60"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          i === 0
                            ? "gradient-success"
                            : i === 1
                            ? "gradient-gold"
                            : "bg-muted"
                        }`}
                      >
                        {i === 0 ? (
                          <CheckCircle className="w-5 h-5 text-success-foreground" />
                        ) : (
                          <BookOpen className={`w-5 h-5 ${i === 1 ? "text-primary-foreground" : "text-muted-foreground"}`} />
                        )}
                      </div>
                      <span className="font-semibold text-foreground">{chapter}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-button animate-float">
                +100 XP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 gradient-gold">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-primary-foreground mb-4 sm:mb-6">
            Prêt à commencer votre voyage ?
          </h2>
          <p className="text-base sm:text-xl text-primary-foreground/80 mb-6 sm:mb-10">
            Rejoignez des milliers de personnes qui découvrent la Bible chaque jour
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary border-white hover:bg-white/90 w-full sm:w-auto sm:min-w-[250px]"
            onClick={() => navigate("/auth")}
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-card border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <span className="text-lg">📖</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                BibleQuest
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 BibleQuest. Fait avec ❤️ pour la gloire de Dieu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
