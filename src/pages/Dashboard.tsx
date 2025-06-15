import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import CreditDisplay from '@/components/CreditDisplay';
import { MessageSquare, BarChart3, FileText, Download, Plus, Sparkles, Target, Brain, Mic } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import FlowchartCreator from '@/components/FlowchartCreator';
import ChatInterface from '@/components/ChatInterface';
import OnboardingCarousel from '@/components/OnboardingCarousel';
import { useOnboarding } from '@/hooks/useOnboarding';
import VoiceModal from '@/components/modals/VoiceModal';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const { hasCredits } = useCredits();
  const { responses, isCompleted, setResponses, markCompleted } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding for new users
  useEffect(() => {
    if (user && !isCompleted) {
      // Small delay to let the dashboard load first
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, isCompleted]);

  const handleOnboardingComplete = (onboardingResponses: any) => {
    setResponses(onboardingResponses);
    markCompleted();
    setShowOnboarding(false);
    
    // Show a personalized welcome message based on responses
    console.log('Welcome! Your preferences have been saved:', onboardingResponses);
  };

  const dashboardOptions = [
    {
      id: 'resume-chat',
      icon: MessageSquare,
      title: 'AI Resume Assistant',
      description: 'Get AI-powered help to build and optimize your resume',
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      route: '/resume-chat',
      delay: '0.2s'
    },
    {
      id: 'voice-assistant',
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Talk to AI and get voice responses for your ideas',
      gradient: 'from-green-500 via-emerald-600 to-teal-600',
      action: () => setIsVoiceModalOpen(true),
      delay: '0.3s'
    },
    {
      id: 'analyze',
      icon: BarChart3,
      title: 'Analyze Resume',
      description: 'Upload and get AI-powered analysis of your resume',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      route: '/analyze',
      delay: '0.4s'
    },
    {
      id: 'create',
      icon: FileText,
      title: 'Create New Resume',
      description: 'Start building your professional resume from scratch',
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      route: '/templates',
      delay: '0.6s'
    }
  ];

  const handleCardClick = async (option: any) => {
    if (option.action) {
      option.action();
      return;
    }

    const route = option.route;
    const creditRequiredRoutes = ['/templates', '/analyze', '/resume-chat'];
    
    if (creditRequiredRoutes.includes(route)) {
      const userHasCredits = await hasCredits();
      if (!userHasCredits) {
        navigate('/pricing');
        return;
      }
    }
    
    navigate(route);
  };

  const handleDownloadPDF = async () => {
    console.log('PDF download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] bg-abstract font-inter">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <ModernNavigation />
      </div>
      
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content with top padding to account for fixed nav */}
      <div className="relative z-10 pt-16">
        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Welcome Section */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 font-sf-pro">
                Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}!
              </h1>
              <div className="flex items-center justify-center gap-2 text-xl text-purple-300">
                <Sparkles className="h-6 w-6" />
                <p>
                  {responses?.purpose === 'resume' ? 'Ready to build that impressive resume?' :
                   responses?.purpose === 'tools' ? 'Let\'s explore some AI career tools!' :
                   responses?.purpose === 'jobs' ? 'Time to land that perfect opportunity!' :
                   'What would you like to create today?'}
                </p>
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          {/* Create Flowchart Hero Card */}
          <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card 
              className="glass-card hover-lift cursor-pointer group relative overflow-hidden gentle-glow"
              onClick={() => setIsFlowchartModalOpen(true)}
            >
              <div className="relative z-10">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="p-8 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                        <Plus className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-white text-3xl md:text-4xl font-sf-pro mb-2 flex items-center justify-center gap-3">
                    Create Flowchart
                    <Target className="h-8 w-8 text-green-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Design professional flowcharts with our advanced AI-powered creator. 
                    <span className="block mt-2 text-blue-300 font-medium">Transform your ideas into visual masterpieces</span>
                  </p>
                  <Button className="btn-premium text-lg py-4 px-8 font-semibold tracking-wide">
                    <Brain className="h-5 w-5 mr-2" />
                    Start Creating
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
          
          {/* Dashboard Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {dashboardOptions.map((option, index) => (
              <Card 
                key={option.id} 
                className="glass-card hover-lift cursor-pointer group relative overflow-hidden animate-fade-in-up" 
                style={{ animationDelay: option.delay }}
                onClick={() => handleCardClick(option)}
              >
                <CardHeader className="text-center relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className={`p-6 rounded-2xl bg-gradient-to-r ${option.gradient} group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl font-sf-pro group-hover:text-purple-200 transition-colors duration-300">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-purple-300 text-center mb-6 leading-relaxed group-hover:text-purple-200 transition-colors duration-300">
                    {option.description}
                  </p>
                  <Button className={`w-full bg-gradient-to-r ${option.gradient} hover:scale-[1.02] text-white transition-all duration-300 font-medium py-3 rounded-lg shadow-lg hover:shadow-xl`}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* AI Career Coach Section */}
          <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Card className="glass-card hover-lift relative overflow-hidden">
              <CardHeader className="relative z-10">
                <CardTitle className="text-white text-3xl text-center font-sf-pro flex items-center justify-center gap-3">
                  <Brain className="h-8 w-8 text-purple-400" />
                  AI Career Coach
                  <MessageSquare className="h-8 w-8 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-center text-purple-300 mb-8 text-lg leading-relaxed">
                  Chat with our advanced AI coach for career guidance, 
                  <span className="block text-blue-300 font-medium mt-1">job search strategies, and professional development.</span>
                </div>
                
                <div className="glass-card-dark rounded-2xl p-8 min-h-[200px] border border-purple-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="flex flex-col items-center space-y-6 relative z-10">
                    <Button 
                      onClick={() => setIsChatOpen(true)}
                      className="btn-premium text-lg px-10 py-4 font-semibold tracking-wide"
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      Start Career Conversation
                    </Button>
                    <Button 
                      onClick={handleDownloadPDF} 
                      variant="outline" 
                      className="border-purple-500/40 bg-white/5 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white transition-all duration-300 hover:scale-[1.02] px-8 py-3 font-medium"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume (PDF)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Onboarding Carousel */}
      <OnboardingCarousel 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />

      {/* Flowchart Creator Modal */}
      <FlowchartCreator 
        isOpen={isFlowchartModalOpen} 
        onClose={() => setIsFlowchartModalOpen(false)} 
      />

      {/* Career Chat Interface */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* Voice Assistant Modal */}
      <VoiceModal 
        isOpen={isVoiceModalOpen} 
        onClose={() => setIsVoiceModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
