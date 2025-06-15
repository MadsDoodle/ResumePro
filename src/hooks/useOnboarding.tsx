
import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingResponse {
  purpose?: string;
  role?: string;
  interests: string[];
  expectations?: string;
  source?: string;
}

interface OnboardingContextType {
  responses: OnboardingResponse | null;
  isCompleted: boolean;
  setResponses: (responses: OnboardingResponse) => void;
  markCompleted: () => void;
  clearOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [responses, setResponsesState] = useState<OnboardingResponse | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedResponses = localStorage.getItem('onboarding_responses');
    const savedCompleted = localStorage.getItem('onboarding_completed');
    
    if (savedResponses) {
      setResponsesState(JSON.parse(savedResponses));
    }
    
    if (savedCompleted === 'true') {
      setIsCompleted(true);
    }
  }, []);

  const setResponses = (responses: OnboardingResponse) => {
    setResponsesState(responses);
    localStorage.setItem('onboarding_responses', JSON.stringify(responses));
    console.log('Onboarding responses saved:', responses);
  };

  const markCompleted = () => {
    setIsCompleted(true);
    localStorage.setItem('onboarding_completed', 'true');
    console.log('Onboarding marked as completed');
  };

  const clearOnboarding = () => {
    setResponsesState(null);
    setIsCompleted(false);
    localStorage.removeItem('onboarding_responses');
    localStorage.removeItem('onboarding_completed');
  };

  return (
    <OnboardingContext.Provider value={{
      responses,
      isCompleted,
      setResponses,
      markCompleted,
      clearOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
