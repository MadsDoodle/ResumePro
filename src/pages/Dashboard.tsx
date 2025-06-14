import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import CreditDisplay from '@/components/CreditDisplay';
import { MessageSquare, BarChart3, FileText, Download, Plus, Zap } from 'lucide-react';
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
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      route: '/chat'
    },
    {
      id: 'analyze',
      icon: BarChart3,
      title: 'Analyze Resume',
      description: 'Upload and get AI-powered analysis of your resume',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      route: '/analyze'
    },
    {
      id: 'create',
      icon: FileText,
      title: 'Create New Resume',
      description: 'Start building your professional resume from scratch',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      route: '/create'
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#181818] via-[#232046] to-[#15152e]">
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
        <div className="container mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, {user?.user_metadata?.full_name || user?.email}!
            </h1>
            <p className="text-purple-300 text-lg">What would you like to do today?</p>
          </div>
          
          {/* Create Flowchart Card with Gradual Halo Effect */}
          <div className="max-w-6xl mx-auto mb-8">
            <Card 
              className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer group hover:scale-105 backdrop-blur-sm relative overflow-hidden"
              onClick={() => setIsFlowchartModalOpen(true)}
            >
              {/* Gradual Halo Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>
              
              <div className="relative">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(147,51,234,0.7)]">
                      <Plus className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-white text-2xl flex items-center justify-center gap-2">
                    Create Flowchart
                    <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300 text-center mb-4 text-lg">
                    Design professional flowcharts with our advanced AI-powered creator
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 text-lg py-3">
                    Start Creating
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
          
          {/* Dashboard Options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {dashboardOptions.map(option => (
              <Card 
                key={option.id} 
                className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer group hover:scale-105 backdrop-blur-sm" 
                onClick={() => handleCardClick(option.route)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${option.color} group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300 text-center mb-4">{option.description}</p>
                  <Button className={`w-full ${option.color} ${option.hoverColor} text-white transition-all duration-300 hover:scale-105`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* AI Resume Assistant Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-purple-900/20 border-purple-500/30 hover:scale-[1.02] transition-transform backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">AI Resume Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-purple-300 mb-6">
                  Chat with our AI assistant for personalized resume advice and tips.
                </div>
                <div className="bg-black/30 rounded-lg p-6 min-h-[200px] border border-purple-500/20 flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <Button 
                      onClick={() => setIsChatOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                    >
                      Start Chatting
                    </Button>
                    <Button 
                      onClick={handleDownloadPDF} 
                      variant="outline" 
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
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
