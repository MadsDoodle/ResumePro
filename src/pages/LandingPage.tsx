
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import ProcessFlow from '@/components/ProcessFlow';
import { BarChart3, FileText } from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleTabAction = (tab: string) => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Resume<span className="text-purple-400">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-300 mb-4">
              Talk Smarter. Build Faster.
            </p>
            <p className="text-lg md:text-xl text-gray-400 mb-16">
              Powered by AI.
            </p>
            
            {/* Resume Image */}
            <div className="mb-16 flex justify-center">
              <div className="relative">
                <div className="w-64 h-80 bg-white rounded-lg shadow-2xl border border-purple-500/20 p-6">
                  <div className="h-4 bg-purple-600 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-purple-500/20 rounded-lg blur-lg"></div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-purple-900/30 border border-purple-500/30">
                <TabsTrigger 
                  value="analyze"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analyze Resume
                </TabsTrigger>
                <TabsTrigger 
                  value="create"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Create Resume
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="analyze">
                  <div className="text-center space-y-4">
                    <p className="text-purple-300">Upload your resume and get instant AI-powered feedback</p>
                    <Button 
                      size="lg"
                      onClick={() => handleTabAction('analyze')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                    >
                      Start Analysis
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="create">
                  <div className="text-center space-y-4">
                    <p className="text-purple-300">Build a professional resume from scratch with AI assistance</p>
                    <Button 
                      size="lg"
                      onClick={() => handleTabAction('create')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                    >
                      Create Resume
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        <ProcessFlow />

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-purple-500/20">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2024 ResumePro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
