import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import CreditDisplay from '@/components/CreditDisplay';
import { MessageSquare, BarChart3, FileText, Download, Plus, Sparkles, Target, Brain } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import FlowchartCreator from '@/components/FlowchartCreator';
import ChatInterface from '@/components/ChatInterface';
import { useTheme } from '@/contexts/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { hasCredits } = useCredits();
  const { isDark } = useTheme();

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

  const handleCardClick = async (route: string) => {
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
    <div className={`min-h-screen relative overflow-hidden bg-abstract font-inter transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
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
              <h1 className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-4 font-sf-pro transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-white via-purple-200 to-blue-200' 
                  : 'bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-700'
              }`}>
                Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}!
              </h1>
              <div className={`flex items-center justify-center gap-2 text-xl transition-colors duration-300 ${
                isDark ? 'text-purple-300' : 'text-blue-600'
              }`}>
                <Sparkles className="h-6 w-6" />
                <p>What would you like to create today?</p>
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
                      <div className={`p-8 rounded-full group-hover:scale-105 transition-transform duration-300 shadow-lg ${
                        isDark 
                          ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600' 
                          : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700'
                      }`}>
                        <Plus className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className={`text-3xl md:text-4xl font-sf-pro mb-2 flex items-center justify-center gap-3 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Create Flowchart
                    <Target className="h-8 w-8 text-green-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className={`text-lg mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-purple-200' : 'text-gray-600'
                  }`}>
                    Design professional flowcharts with our advanced AI-powered creator. 
                    <span className={`block mt-2 font-medium ${
                      isDark ? 'text-blue-300' : 'text-blue-600'
                    }`}>Transform your ideas into visual masterpieces</span>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dashboardOptions.map((option, index) => (
              <Card 
                key={option.id} 
                className="glass-card hover-lift cursor-pointer group relative overflow-hidden animate-fade-in-up" 
                style={{ animationDelay: option.delay }}
                onClick={() => handleCardClick(option.route)}
              >
                <CardHeader className="text-center relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className={`p-6 rounded-2xl bg-gradient-to-r ${option.gradient} group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className={`text-xl font-sf-pro group-hover:opacity-80 transition-all duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className={`text-center mb-6 leading-relaxed group-hover:opacity-80 transition-all duration-300 ${
                    isDark ? 'text-purple-300' : 'text-gray-600'
                  }`}>
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
                <CardTitle className={`text-3xl text-center font-sf-pro flex items-center justify-center gap-3 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <Brain className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-blue-600'}`} />
                  AI Career Coach
                  <MessageSquare className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-indigo-600'}`} />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className={`text-center mb-8 text-lg leading-relaxed transition-colors duration-300 ${
                  isDark ? 'text-purple-300' : 'text-gray-600'
                }`}>
                  Chat with our advanced AI coach for career guidance, 
                  <span className={`block font-medium mt-1 ${
                    isDark ? 'text-blue-300' : 'text-blue-600'
                  }`}>job search strategies, and professional development.</span>
                </div>
                
                <div className={`glass-card-dark rounded-2xl p-8 min-h-[200px] border flex items-center justify-center relative overflow-hidden ${
                  isDark ? 'border-purple-500/20' : 'border-blue-200/40'
                }`}>
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
                      className={`transition-all duration-300 hover:scale-[1.02] px-8 py-3 font-medium ${
                        isDark 
                          ? 'border-purple-500/40 bg-white/5 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white' 
                          : 'border-blue-300 bg-white/50 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-800'
                      }`}
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
    </div>
  );
};

export default Dashboard;
