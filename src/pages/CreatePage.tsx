
import { useState, useEffect } from 'react';
import { ArrowLeft, Home, Save, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import ResumeBuilder from '@/components/ResumeBuilder';

const CreatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    personalInfo: {},
    summary: '',
    experience: [],
    education: [],
    skills: [],
    additionalSections: {}
  });

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        toast({
          title: "Draft Loaded",
          description: "Your previous work has been restored.",
        });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your resume has been saved locally.",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "PDF download feature will be implemented with html2pdf integration.",
    });
  };

  return (
    <div className="min-h-screen bg-[#060315] relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl font-bold text-white">Resume Builder</h1>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSaveDraft}
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 hover:scale-105"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button 
                onClick={handleDownloadPDF}
                className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-8">
            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Choose a Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {['Professional', 'Modern', 'Creative'].map((template, index) => (
                    <div 
                      key={template}
                      className="p-4 border border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300 text-center"
                    >
                      <div className="w-full h-24 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded mb-2"></div>
                      <p className="text-white font-medium">{template}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume Builder Component */}
          <ResumeBuilder />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
