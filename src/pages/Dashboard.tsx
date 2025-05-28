import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import EnhancedSidebar from '@/components/EnhancedSidebar';
import { MessageSquare, BarChart3, FileText, Home } from 'lucide-react';
const Dashboard = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const dashboardOptions = [{
    id: 'chatbox',
    icon: MessageSquare,
    title: 'AI Chatbox',
    description: 'Get instant help and guidance for your resume',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    route: '/chat'
  }, {
    id: 'analyze',
    icon: BarChart3,
    title: 'Analyze Resume',
    description: 'Upload and get AI-powered analysis of your resume',
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
    route: '/analyze'
  }, {
    id: 'create',
    icon: FileText,
    title: 'Create New Resume',
    description: 'Start building your professional resume from scratch',
    color: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700',
    route: '/create'
  }];
  const handleCardClick = (route: string) => {
    navigate(route);
  };
  return <SidebarProvider>
      <div className="min-h-screen bg-[#060315] relative overflow-hidden flex w-full">
        <AnimatedBackground />
        <EnhancedSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-[#060315]/90 backdrop-blur-sm border-b border-purple-500/20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-white hover:bg-purple-600/20 transition-all duration-300 hover:scale-110" />
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                    <FileText className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-xl font-bold text-white">ResumePro</span>
                </div>
              </div>
              
              <Button onClick={() => navigate('/')} variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </header>
          
          <div className="relative z-10 pt-8 bg-indigo-950">
            <div className="container mx-auto px-4 py-12">
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Welcome back, {user?.user_metadata?.full_name || user?.email}!
                </h1>
                <p className="text-purple-300 text-lg">What would you like to do today?</p>
              </div>
              
              {/* Dashboard Options */}
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                {dashboardOptions.map(option => <Card key={option.id} className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer group hover:scale-105" onClick={() => handleCardClick(option.route)}>
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
                  </Card>)}
              </div>
              
              {/* AI Resume Assistant Section */}
              <div className="max-w-4xl mx-auto">
                <Card className="bg-purple-900/20 border-purple-500/30 hover:scale-[1.02] transition-transform">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center">AI Resume Assistant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-purple-300 mb-6">
                      Chat with our AI assistant for personalized resume advice and tips.
                    </div>
                    <div className="bg-black/30 rounded-lg p-6 min-h-[200px] border border-purple-500/20 flex items-center justify-center">
                      <Button onClick={() => navigate('/chat')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                        Start Chatting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>;
};
export default Dashboard;