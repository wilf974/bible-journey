import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Erreur de connexion",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Connexion réussie !",
            description: "Bienvenue dans votre voyage biblique.",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          toast({
            title: "Erreur d'inscription",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Compte créé !",
            description: "Bienvenue dans votre voyage biblique.",
          });
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center shadow-button">
              <span className="text-3xl">📖</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                BibleQuest
              </h1>
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Content de vous revoir !" : "Créez votre compte"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : isLogin ? (
                "Se connecter"
              ) : (
                "Créer mon compte"
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-6 text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-primary font-semibold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 gradient-gold items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-3xl flex items-center justify-center shadow-glow animate-float">
            <span className="text-7xl">✝️</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-primary-foreground mb-4">
            Commencez votre voyage
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Explorez les Écritures d'une manière nouvelle et engageante.
            Apprenez, mémorisez et grandissez dans la foi chaque jour.
          </p>
          
          <div className="flex justify-center gap-4 mt-10">
            {["📖", "🕊️", "✨", "🙏"].map((emoji, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
