import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LessonPage from "./pages/LessonPage";
import BookPage from "./pages/BookPage";
import VerseLearningPage from "./pages/VerseLearningPage";
import StatsPage from "./pages/StatsPage";
import ReviewPage from "./pages/ReviewPage";
import AchievementsPage from "./pages/AchievementsPage";
import VersesPage from "./pages/VersesPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lesson/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/:bookId"
              element={
                <ProtectedRoute>
                  <BookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verse/:verseId"
              element={
                <ProtectedRoute>
                  <VerseLearningPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <StatsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/review"
              element={
                <ProtectedRoute>
                  <ReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute>
                  <AchievementsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verses"
              element={
                <ProtectedRoute>
                  <VersesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
