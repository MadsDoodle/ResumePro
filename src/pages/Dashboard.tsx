
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import CreditDisplay from '@/components/CreditDisplay';
import { MessageSquare, BarChart3, FileText, Download, Plus, Zap, Sparkles, Target, Brain } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import FlowchartCreator from '@/components/FlowchartCreator';
import ChatInterface from '@/components/ChatInterface';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { hasCredits } = useCredits();

  const dashboardOptions = [
    {
      id: 'chatbox',
      icon: MessageSquare,
      title: 'AI Chatbox',
      description: 'Get instant help and guidance for your resume',
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      glowColor: 'shadow-glow-blue',
      route: '/chat',
      delay: '0.2s'
    },
    {
      id: 'analyze',
      icon: BarChart3,
      title: 'Analyze Resume',
      description: 'Upload and get AI-powered analysis of your resume',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      route: '/analyze',
      delay: '0.4s'
    },
    {
      id: 'create',
      icon: FileText,
      title: 'Create New Resume',
      description: 'Start building your professional resume from scratch',
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      glowColor: 'shadow-glow-purple',
      route: '/create',
      delay: '0.6s'
    }
  ];

  const handleCardClick = async (route: string) => {
    const creditRequiredRoutes = ['/create', '/analyze', '/chat'];
    
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
                <Sparkles className="h-6 w-6 animate-bounce-icon" />
                <p>What would you like to create today?</p>
                <Sparkles className="h-6 w-6 animate-bounce-icon" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
          
          {/* Create Flowchart Hero Card */}
          <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card 
              className="glass-card hover-lift cursor-pointer group relative overflow-hidden animate-pulse-glow"
              onClick={() => setIsFlowchartModalOpen(true)}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-shimmer"></div>
              
              <div className="relative z-10">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative p-8 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        <Plus className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-white text-3xl md:text-4xl font-sf-pro mb-2 flex items-center justify-center gap-3">
                    Create Flowchart
                    <div className="flex gap-1">
                      <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
                      <Target className="h-8 w-8 text-green-400 animate-bounce-icon" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Design professional flowcharts with our advanced AI-powered creator. 
                    <span className="block mt-2 text-blue-300 font-medium">Transform your ideas into visual masterpieces</span>
                  </p>
                  <Button className="btn-premium text-lg py-4 px-8 font-semibold tracking-wide">
                    <Brain className="h-5 w-5 mr-2" />
                    Start Creating Magic
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
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                
                <CardHeader className="text-center relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${option.gradient} group-hover:scale-110 transition-transform duration-300 ${option.glowColor} group-hover:${option.glowColor}`}>
                        <option.icon className="h-8 w-8 text-white" />
                      </div>
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
                  <Button className={`w-full bg-gradient-to-r ${option.gradient} hover:scale-105 text-white transition-all duration-300 font-medium py-3 rounded-lg shadow-lg hover:shadow-xl`}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* AI Resume Assistant Section */}
          <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Card className="glass-card hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 opacity-50"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-white text-3xl text-center font-sf-pro flex items-center justify-center gap-3">
                  <Brain className="h-8 w-8 text-purple-400 animate-pulse" />
                  AI Resume Assistant
                  <MessageSquare className="h-8 w-8 text-blue-400 animate-bounce-icon" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-center text-purple-300 mb-8 text-lg leading-relaxed">
                  Chat with our advanced AI assistant for personalized resume advice, 
                  <span className="block text-blue-300 font-medium mt-1">optimization tips, and career guidance.</span>
                </div>
                
                <div className="glass-card-dark rounded-2xl p-8 min-h-[200px] border border-purple-500/20 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="flex flex-col items-center space-y-6 relative z-10">
                    <Button 
                      onClick={() => setIsChatOpen(true)}
                      className="btn-premium text-lg px-10 py-4 font-semibold tracking-wide"
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      Start AI Conversation
                    </Button>
                    <Button 
                      onClick={handleDownloadPDF} 
                      variant="outline" 
                      className="border-purple-500/40 bg-white/5 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white transition-all duration-300 hover:scale-105 px-8 py-3 font-medium"
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

      {/* Chat Interface */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
