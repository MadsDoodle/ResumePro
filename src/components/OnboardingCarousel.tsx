
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface OnboardingResponse {
  purpose?: string;
  role?: string;
  interests: string[];
  expectations?: string;
  source?: string;
}

interface OnboardingCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (responses: OnboardingResponse) => void;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [responses, setResponses] = useState<OnboardingResponse>({
    interests: []
  });

  const slides = [
    {
      id: 'purpose',
      title: "Let's get to know you 😊",
      question: "What brings you here?",
      type: 'single' as const,
      options: [
        { value: 'resume', label: '🧠 Build an impressive resume' },
        { value: 'tools', label: '🛠️ Explore AI career tools' },
        { value: 'trying', label: '✨ Just trying it out' },
        { value: 'jobs', label: '🎓 Looking for internships/jobs' },
        { value: 'docs', label: '📝 Create professional docs' }
      ]
    },
    {
      id: 'role',
      title: "What's your current vibe?",
      question: "What's your current role?",
      type: 'single' as const,
      options: [
        { value: 'student', label: '👨‍🎓 Student' },
        { value: 'jobseeker', label: '👩‍💼 Job seeker' },
        { value: 'educator', label: '🧑‍🏫 Educator' },
        { value: 'professional', label: '🧑‍💻 Working professional' },
        { value: 'freelancer', label: '🚀 Freelancer/Entrepreneur' }
      ]
    },
    {
      id: 'interests',
      title: "What are you excited to explore?",
      question: "What are you interested in? (multi-select)",
      type: 'multi' as const,
      options: [
        { value: 'resume-building', label: '📄 Resume building' },
        { value: 'career-tips', label: '🧠 AI career tips' },
        { value: 'interview-prep', label: '💬 Interview prep' },
        { value: 'portfolio', label: '🖼️ Portfolio design' },
        { value: 'cover-letters', label: '📬 Cover letters' },
        { value: 'templates', label: '🧰 Tools & templates' }
      ]
    },
    {
      id: 'expectations',
      title: "What do you expect from us?",
      question: "What do you hope to get from the app?",
      type: 'single' as const,
      options: [
        { value: 'easier', label: '✨ Make job applications easier' },
        { value: 'personalize', label: '🎯 Help personalize my resume' },
        { value: 'fast', label: '🚀 Fast, one-click solutions' },
        { value: 'creative', label: '🧩 Creative templates & tips' },
        { value: 'ai-help', label: '🤖 Smart AI help along the way' }
      ]
    },
    {
      id: 'source',
      title: "How'd you find us?",
      question: "Where did you hear about us?",
      type: 'single' as const,
      options: [
        { value: 'linkedin', label: '🔗 LinkedIn' },
        { value: 'twitter', label: '🐦 Twitter' },
        { value: 'youtube', label: '🎥 YouTube' },
        { value: 'instagram', label: '📱 Instagram' },
        { value: 'friend', label: '👨‍💻 From a friend' },
        { value: 'online', label: '🌍 Found you online' }
      ]
    }
  ];

  const handleOptionSelect = (slideId: string, value: string, type: 'single' | 'multi') => {
    setResponses(prev => {
      if (slideId === 'interests' && type === 'multi') {
        const currentInterests = prev.interests || [];
        const newInterests = currentInterests.includes(value)
          ? currentInterests.filter(interest => interest !== value)
          : [...currentInterests, value];
        return { ...prev, interests: newInterests };
      } else {
        return { ...prev, [slideId]: value };
      }
    });
  };

  const canProceed = () => {
    const currentSlideData = slides[currentSlide];
    if (currentSlideData.id === 'interests') {
      return responses.interests.length > 0;
    }
    return responses[currentSlideData.id as keyof OnboardingResponse] !== undefined;
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Final slide - complete onboarding
      onComplete(responses);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progressPercentage = ((currentSlide + 1) / slides.length) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl"
        >
          <Card className="glass-card border-purple-500/20 bg-gradient-to-br from-gray-900/95 via-purple-900/20 to-blue-900/20">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-0 top-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Progress Indicator */}
              <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index <= currentSlide ? 'bg-purple-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <Progress value={progressPercentage} className="w-full" />
                <p className="text-center text-sm text-gray-400">
                  Step {currentSlide + 1} of {slides.length}
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <CardTitle className="text-2xl md:text-3xl font-sf-pro text-white">
                      {slides[currentSlide].title}
                    </CardTitle>
                    <p className="text-lg text-purple-200">
                      {slides[currentSlide].question}
                    </p>
                  </div>

                  <div className="grid gap-3 max-h-80 overflow-y-auto">
                    {slides[currentSlide].options.map((option) => {
                      const isSelected = slides[currentSlide].type === 'multi'
                        ? responses.interests.includes(option.value)
                        : responses[slides[currentSlide].id as keyof OnboardingResponse] === option.value;

                      return (
                        <Button
                          key={option.value}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => handleOptionSelect(slides[currentSlide].id, option.value, slides[currentSlide].type)}
                          className={`h-auto p-4 text-left justify-start transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400'
                              : 'border-purple-500/30 bg-white/5 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400'
                          }`}
                        >
                          <span className="text-base font-medium">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentSlide === 0}
                      className="border-purple-500/40 bg-white/5 text-purple-300 hover:bg-purple-500/20"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="btn-premium"
                    >
                      {currentSlide === slides.length - 1 ? 'Complete' : 'Next'}
                      {currentSlide !== slides.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
