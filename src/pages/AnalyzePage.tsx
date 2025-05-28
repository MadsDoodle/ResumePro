
import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, Download, ArrowLeft, Home, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';

const AnalyzePage = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const handleReUpload = () => {
    setUploadedFile(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
  };

  const mockAnalysisData = {
    designScore: 92,
    clarityScore: 78,
    atsScore: 85,
    overallScore: 85,
    recommendations: [
      'Add more quantifiable achievements with specific numbers',
      'Improve consistency in formatting and spacing',
      'Include more industry-relevant keywords',
      'Optimize for ATS compatibility by using standard section headers'
    ]
  };

  if (!uploadedFile && !analysisComplete) {
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
              
              <h1 className="text-3xl font-bold text-white">Resume Analysis</h1>
              
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-4">
                    Upload Your Resume for Analysis
                  </CardTitle>
                  <p className="text-purple-300">
                    Get AI-powered insights and recommendations to improve your resume
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-purple-500/40 rounded-lg p-12 text-center hover:border-purple-500/60 transition-colors">
                    <Upload className="mx-auto h-16 w-16 text-purple-400 mb-4" />
                    <p className="text-white text-lg mb-2">Drag and drop your resume here</p>
                    <p className="text-purple-300 mb-6">or click to browse files</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button 
                        asChild
                        className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105"
                      >
                        <span className="cursor-pointer">Choose File</span>
                      </Button>
                    </label>
                    <p className="text-sm text-gray-400 mt-4">
                      Supports PDF, DOC, and DOCX files up to 10MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#060315] relative overflow-hidden">
        <AnimatedBackground />
        <Header />
        
        <div className="relative z-10 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardContent className="text-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-6"></div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Analyzing Your Resume</h3>
                  <p className="text-purple-300">Our AI is evaluating your resume for optimization opportunities...</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">Analysis Results</h1>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            </div>
            
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* File Info */}
            <div className="mb-8">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">{uploadedFile?.name}</p>
                        <p className="text-purple-300 text-sm">
                          {uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(2) : 0} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleReUpload}
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400"
                    >
                      Upload New File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Scores */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{mockAnalysisData.overallScore}/100</div>
                    <Progress value={mockAnalysisData.overallScore} className="mb-2" />
                    <p className="text-purple-300 text-sm">Great performance!</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{mockAnalysisData.designScore}/100</div>
                    <Progress value={mockAnalysisData.designScore} className="mb-2" />
                    <p className="text-purple-300 text-sm">Excellent design</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Clarity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{mockAnalysisData.clarityScore}/100</div>
                    <Progress value={mockAnalysisData.clarityScore} className="mb-2" />
                    <p className="text-purple-300 text-sm">Room for improvement</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">ATS Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{mockAnalysisData.atsScore}/100</div>
                    <Progress value={mockAnalysisData.atsScore} className="mb-2" />
                    <p className="text-purple-300 text-sm">ATS friendly</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-purple-900/20 border-purple-500/30 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Improvement Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockAnalysisData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-purple-300">{rec}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex space-x-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105">
                    <Download className="mr-2 h-4 w-4" />
                    Download Improved Resume
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/create')}
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400"
                  >
                    Create New Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
