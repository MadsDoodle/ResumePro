
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import ChatBox from '@/components/ChatBox';
import ResumeBuilder from '@/components/ResumeBuilder';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { MessageSquare, BarChart3, FileText, Plus, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const resumeBuilderRef = useRef<HTMLDivElement>(null);

  const scrollToResumeBuilder = () => {
    setShowResumeBuilder(true);
    setTimeout(() => {
      resumeBuilderRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const dashboardOptions = [
    {
      id: 'chatbox',
      icon: MessageSquare,
      title: 'AI Chatbox',
      description: 'Get instant help and guidance for your resume',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    {
      id: 'analyze',
      icon: BarChart3,
      title: 'Analyze Resume',
      description: 'Upload and get AI-powered analysis of your resume',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
    },
    {
      id: 'create',
      icon: FileText,
      title: 'Create New Resume',
      description: 'Start building your professional resume from scratch',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      action: scrollToResumeBuilder,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-black relative overflow-hidden flex w-full">
        <AnimatedBackground />
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          <Header />
          
          <div className="relative z-10 pt-20">
            <div className="container mx-auto px-4 py-12">
              {/* Header with sidebar trigger */}
              <div className="flex items-center gap-4 mb-8">
                <SidebarTrigger className="text-white hover:bg-purple-600/20" />
                <div className="text-center flex-1">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Welcome back, {user?.user_metadata?.full_name || user?.email}!
                  </h1>
                  <p className="text-purple-300 text-lg">What would you like to do today?</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {dashboardOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      if (option.action) {
                        option.action();
                      } else {
                        scrollToSection(option.id);
                      }
                    }}
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
                      <Button 
                        className={`w-full ${option.color} ${option.hoverColor} text-white`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Feature Sections */}
              <div className="mt-20 space-y-20">
                <section id="chatbox" className="scroll-mt-20">
                  <Card className="bg-purple-900/20 border-purple-500/30 max-w-4xl mx-auto">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl text-center">AI Resume Assistant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-purple-300 mb-6">
                        Chat with our AI assistant for personalized resume advice and tips.
                      </div>
                      <ChatBox />
                    </CardContent>
                  </Card>
                </section>
                
                <section id="analyze" className="scroll-mt-20">
                  <Card className="bg-purple-900/20 border-purple-500/30 max-w-4xl mx-auto">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl text-center">Resume Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-purple-300 mb-6">
                        Upload your resume to get detailed analysis and improvement suggestions.
                      </div>
                      <div className="bg-black/30 rounded-lg p-6 min-h-[300px] border border-purple-500/20">
                        <p className="text-purple-400 text-center">Resume analysis tool will be implemented here</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Resume Builder Section */}
                {showResumeBuilder && (
                  <section ref={resumeBuilderRef} className="scroll-mt-20">
                    <Card className="bg-purple-900/20 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-white text-2xl text-center flex items-center justify-center gap-2">
                          <FileText className="h-6 w-6" />
                          Resume Builder
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResumeBuilder />
                      </CardContent>
                    </Card>
                  </section>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
