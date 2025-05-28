
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import EnhancedSidebar from '@/components/EnhancedSidebar';
import { MessageSquare, BarChart3, FileText, Home, Menu, Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const platformItems = [
    { name: 'Resume Builder', href: '/create' },
    { name: 'Resume Analyzer', href: '/analyze' },
    { name: 'AI Career Advisor', href: '/chat' }
  ];

  const featureItems = [
    { name: 'ATS Optimized Templates', href: '/templates' },
    { name: 'Chat-Based Editing', href: '/chat' },
    { name: 'Smart Suggestions', href: '/features' },
    { name: 'Version History', href: '/history' }
  ];

  const resourceItems = [
    { name: 'Resume Tips', href: '/tips' },
    { name: 'Career Paths', href: '/paths' },
    { name: 'Blog', href: '/blog' }
  ];

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadPDF = async () => {
    // This would be implemented with html2pdf.js
    console.log('PDF download functionality would be implemented here');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#060315] relative overflow-hidden flex w-full">
        <AnimatedBackground />
        <EnhancedSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header with Navigation */}
          <header className="sticky top-0 z-50 bg-[#060315]/95 backdrop-blur-sm border-b border-purple-500/20">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="text-white hover:bg-purple-600/20 transition-all duration-300 hover:scale-110" />
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                      <FileText className="h-6 w-6 text-purple-400" />
                    </div>
                    <span className="text-xl font-bold text-white">ResumePro</span>
                  </div>
                </div>
                
                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors duration-200">
                      Platform
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30 text-white">
                      {platformItems.map((item) => (
                        <DropdownMenuItem key={item.name} onClick={() => navigate(item.href)} className="hover:bg-purple-600/20">
                          {item.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors duration-200">
                      Features
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30 text-white">
                      {featureItems.map((item) => (
                        <DropdownMenuItem key={item.name} onClick={() => navigate(item.href)} className="hover:bg-purple-600/20">
                          {item.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-300 hover:text-white transition-colors duration-200">
                      Resources
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30 text-white">
                      {resourceItems.map((item) => (
                        <DropdownMenuItem key={item.name} onClick={() => navigate(item.href)} className="hover:bg-purple-600/20">
                          {item.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button 
                    onClick={() => scrollToSection('pricing-section')}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('contact-section')}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </button>
                </nav>
                
                <div className="flex items-center space-x-4">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-400 text-sm font-medium">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={() => navigate('/')} 
                    variant="outline" 
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="relative z-10 pt-8">
            <div className="container mx-auto px-4 py-12">
              {/* Welcome Section */}
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Welcome back, {user?.user_metadata?.full_name || user?.email}!
                </h1>
                <p className="text-purple-300 text-lg">What would you like to do today?</p>
              </div>
              
              {/* Dashboard Options */}
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                {dashboardOptions.map((option) => (
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
                          onClick={() => navigate('/chat')} 
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
