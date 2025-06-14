
import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, Download, ArrowLeft, Home, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import { analyzeResumeWithAI } from '@/services/resumeAnalysisService';
import { useToast } from '@/hooks/use-toast';

interface AnalysisData {
  overallScore: number;
  designScore: number;
  clarityScore: number;
  atsScore: number;
  recommendations: string[];
}

const AnalyzePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setError(null);
      
      try {
        const result = await analyzeResumeWithAI(file);
        setAnalysisData({
          overallScore: result.overallScore,
          designScore: result.designScore,
          clarityScore: result.clarityScore,
          atsScore: result.atsScore,
          recommendations: result.recommendations
        });
        setAnalysisComplete(true);
        toast({
          title: "Analysis Complete",
          description: "Your resume has been analyzed successfully!",
        });
      } catch (error) {
        console.error('Analysis failed:', error);
        setError('Failed to analyze resume. Please try again.');
        toast({
          title: "Analysis Failed",
          description: "There was an error analyzing your resume. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleReUpload = () => {
    setUploadedFile(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
    setAnalysisData(null);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs improvement';
    return 'Requires attention';
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
              
              <h1 className="text-3xl font-bold text-white">AI Resume Analysis</h1>
              
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
                    Upload Your Resume for AI Analysis
                  </CardTitle>
                  <p className="text-purple-300">
                    Get AI-powered insights and personalized recommendations to improve your resume
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
                  
                  {error && (
                    <Alert className="mt-4 bg-red-500/10 border-red-500/20">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-400">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
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
                  <h3 className="text-2xl font-semibold text-white mb-4">Analyzing Your Resume with AI</h3>
                  <p className="text-purple-300">Our AI is evaluating your resume content, structure, and ATS compatibility...</p>
                  <p className="text-purple-400 text-sm mt-2">This may take 30-60 seconds</p>
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
              <h1 className="text-3xl font-bold text-white">AI Analysis Results</h1>
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
            {analysisData && (
              <>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-purple-900/20 border-purple-500/30">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white">Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.overallScore)}`}>
                          {analysisData.overallScore}/100
                        </div>
                        <Progress value={analysisData.overallScore} className="mb-2" />
                        <p className="text-purple-300 text-sm">{getScoreDescription(analysisData.overallScore)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-900/20 border-purple-500/30">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white">Design</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.designScore)}`}>
                          {analysisData.designScore}/100
                        </div>
                        <Progress value={analysisData.designScore} className="mb-2" />
                        <p className="text-purple-300 text-sm">{getScoreDescription(analysisData.designScore)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-900/20 border-purple-500/30">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white">Clarity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.clarityScore)}`}>
                          {analysisData.clarityScore}/100
                        </div>
                        <Progress value={analysisData.clarityScore} className="mb-2" />
                        <p className="text-purple-300 text-sm">{getScoreDescription(analysisData.clarityScore)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-900/20 border-purple-500/30">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white">ATS Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.atsScore)}`}>
                          {analysisData.atsScore}/100
                        </div>
                        <Progress value={analysisData.atsScore} className="mb-2" />
                        <p className="text-purple-300 text-sm">{getScoreDescription(analysisData.atsScore)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Recommendations */}
                <Card className="bg-purple-900/20 border-purple-500/30 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      AI-Powered Recommendations
                    </CardTitle>
                    <p className="text-purple-300 text-sm">Personalized suggestions based on your resume analysis</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {analysisData.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-purple-300">{rec}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex space-x-4">
                      <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105">
                        <Download className="mr-2 h-4 w-4" />
                        Download Analysis Report
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/create')}
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400"
                      >
                        Create Improved Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
