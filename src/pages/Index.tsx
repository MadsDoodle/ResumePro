
import { useState } from 'react';
import { Upload, BarChart3, FileText, Sparkles, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingIcons from '@/components/FloatingIcons';
import ResumeAnalysis from '@/components/ResumeAnalysis';
import ResumeBuilder from '@/components/ResumeBuilder';

const Index = () => {
  const [activeTab, setActiveTab] = useState('analyze');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <FloatingIcons />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
              Resume<span className="text-white">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Elevate your career with AI-powered resume optimization and intelligent career guidance
            </p>
            
            {/* Interactive CTA Tabs */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                className={`group h-16 px-8 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  activeTab === 'analyze'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                onClick={() => setActiveTab('analyze')}
              >
                <BarChart3 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Analyze My Resume
              </Button>
              
              <Button
                size="lg"
                className={`group h-16 px-8 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  activeTab === 'create'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                onClick={() => setActiveTab('create')}
              >
                <FileText className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Create New Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 pb-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="analyze" className="mt-0">
              <ResumeAnalysis />
            </TabsContent>
            
            <TabsContent value="create" className="mt-0">
              <ResumeBuilder />
            </TabsContent>
          </Tabs>
        </section>

        {/* Features Overview */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Sparkles className="mr-3 h-6 w-6 text-yellow-400" />
                  AI-Powered Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Get instant feedback on your resume's ATS compatibility and optimization suggestions.
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="mr-3 h-6 w-6 text-green-400" />
                  Career Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Discover personalized career paths and salary insights based on your profile.
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="mr-3 h-6 w-6 text-blue-400" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Access curated learning materials and certification recommendations.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
