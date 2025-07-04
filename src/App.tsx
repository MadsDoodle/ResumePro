import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ToastProvider } from "@/hooks/use-toast";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import AnalyzePage from "./pages/AnalyzePage";
import TemplateSelection from "./pages/TemplateSelection";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeChat from "./components/ResumeChat";
import ResumeBuilder from "./components/ResumeBuilder";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { OnboardingProvider } from "@/hooks/useOnboarding";

const queryClient = new QueryClient();

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen bg-[#060315] flex items-center justify-center">
      <div className="text-purple-400">Loading...</div>
    </div>;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

// Create a wrapper component for ResumeBuilder
function CreatePage() {
  return (
    <div className="min-h-screen bg-[#060315] relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          <ResumeBuilder />
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <OnboardingProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/auth" element={
                  <PublicRoute>
                    <AuthPage />
                  </PublicRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/resume-chat" element={
                  <ProtectedRoute>
                    <ResumeChat />
                  </ProtectedRoute>
                } />
                <Route path="/analyze" element={
                  <ProtectedRoute>
                    <AnalyzePage />
                  </ProtectedRoute>
                } />
                <Route path="/create" element={
                  <ProtectedRoute>
                    <CreatePage />
                  </ProtectedRoute>
                } />
                <Route path="/templates" element={
                  <ProtectedRoute>
                    <TemplateSelection />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OnboardingProvider>
        </AuthProvider>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
