
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <FloatingIcons />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in leading-tight">
              Resume<span className="text-white">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4 animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
              Talk Smarter. Build Faster.
            </p>
            <p className="text-lg md:text-xl text-slate-400 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Powered by AI.
            </p>
            
            {/* Interactive CTA Tabs */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                className={`group h-16 px-12 text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 ${
                  activeTab === 'analyze'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl shadow-blue-500/30 border-blue-400'
                    : 'bg-slate-800/50 hover:bg-slate-700/50 text-white border-slate-600 backdrop-blur-sm'
                }`}
                onClick={() => setActiveTab('analyze')}
              >
                <BarChart3 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Analyze My Resume
              </Button>
              
              <Button
                size="lg"
                className={`group h-16 px-12 text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 ${
                  activeTab === 'create'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/30 border-purple-400'
                    : 'bg-slate-800/50 hover:bg-slate-700/50 text-white border-slate-600 backdrop-blur-sm'
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
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Perfect Story, One Feature at a Time
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Unlock the power of AI-driven resume optimization and career guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center text-white text-xl">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mr-4">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  AI-Powered Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 relative z-10">
                Get instant feedback on your resume's ATS compatibility and optimization suggestions powered by advanced machine learning.
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center text-white text-xl">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mr-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  Career Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 relative z-10">
                Discover personalized career paths and salary insights based on your profile and industry trends.
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center text-white text-xl">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 relative z-10">
                Access curated learning materials and certification recommendations tailored to your career goals.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hear what our users have to say
            </h2>
            <p className="text-xl text-slate-400">
              Join thousands of professionals who've transformed their careers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <p className="text-slate-300 mb-4 italic">
                    "ResumePro helped me land my dream job in tech. The AI analysis was incredibly accurate and the suggestions were spot-on."
                  </p>
                  <p className="text-white font-semibold">Sarah Chen</p>
                  <p className="text-slate-400 text-sm">Software Engineer at Google</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div>
                  <p className="text-slate-300 mb-4 italic">
                    "The career insights feature opened my eyes to opportunities I never considered. Highly recommended!"
                  </p>
                  <p className="text-white font-semibold">Michael Rodriguez</p>
                  <p className="text-slate-400 text-sm">Marketing Director</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-slate-800">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              © 2024 ResumePro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
