
import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, BookOpen, Download, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUpload from '@/components/FileUpload';
import { analyzeResumeWithAI } from '@/services/resumeAnalysisService';
import { useToast } from '@/hooks/use-toast';

interface AnalysisData {
  overallScore: number;
  designScore: number;
  clarityScore: number;
  atsScore: number;
  recommendations: string[];
}

const ResumeAnalysis = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
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
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent performance!';
    if (score >= 60) return 'Good, room for improvement';
    if (score >= 40) return 'Needs improvement';
    return 'Requires immediate attention';
  };

  // Mock data for career navigator and learning hub (these don't require AI analysis)
  const mockCareerData = {
    salaryRange: '$65,000 - $85,000',
    jobMatches: [
      { title: 'Senior Software Developer', match: 94 },
      { title: 'Full Stack Engineer', match: 89 },
      { title: 'Technical Lead', match: 82 }
    ]
  };

  const mockLearningResources = [
    { title: 'Advanced React Patterns', type: 'Course' },
    { title: 'AWS Cloud Practitioner', type: 'Certification' },
    { title: 'System Design Interview', type: 'Course' }
  ];

  if (!uploadedFile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white mb-4">
              Upload Your Resume for AI Analysis
            </CardTitle>
            <p className="text-slate-300">
              Get personalized insights and recommendations powered by AI
            </p>
          </CardHeader>
          <CardContent>
            <FileUpload onFileUpload={handleFileUpload} />
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
    );
  }

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI is Analyzing Your Resume</h3>
            <p className="text-slate-300">Our AI is evaluating your resume content, structure, and ATS compatibility...</p>
            <p className="text-slate-400 text-sm mt-2">This may take 30-60 seconds</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Analysis Results</h2>
        <Badge variant="secondary" className="bg-green-600 text-white">
          Analysis Complete
        </Badge>
      </div>

      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="assessment" className="data-[state=active]:bg-blue-600">
            <BarChart3 className="mr-2 h-4 w-4" />
            Resume Assessment
          </TabsTrigger>
          <TabsTrigger value="navigator" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="mr-2 h-4 w-4" />
            Career Navigator
          </TabsTrigger>
          <TabsTrigger value="learning" className="data-[state=active]:bg-pink-600">
            <BookOpen className="mr-2 h-4 w-4" />
            Learning Hub
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="mt-6">
          {analysisData && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisData.overallScore)}`}>
                      {analysisData.overallScore}/100
                    </div>
                    <Progress value={analysisData.overallScore} className="mb-4" />
                    <p className="text-slate-300">{getScoreDescription(analysisData.overallScore)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">ATS Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisData.atsScore)}`}>
                      {analysisData.atsScore}/100
                    </div>
                    <Progress value={analysisData.atsScore} className="mb-4" />
                    <p className="text-slate-300">{getScoreDescription(analysisData.atsScore)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Design Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisData.designScore)}`}>
                      {analysisData.designScore}/100
                    </div>
                    <Progress value={analysisData.designScore} className="mb-4" />
                    <p className="text-slate-300">{getScoreDescription(analysisData.designScore)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Content Clarity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisData.clarityScore)}`}>
                      {analysisData.clarityScore}/100
                    </div>
                    <Progress value={analysisData.clarityScore} className="mb-4" />
                    <p className="text-slate-300">{getScoreDescription(analysisData.clarityScore)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">AI-Powered Recommendations</CardTitle>
                  <p className="text-slate-300 text-sm">Personalized suggestions based on your resume analysis</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-slate-300">
                        <Zap className="mr-3 h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download Analysis Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="navigator" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Salary Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-4">{mockCareerData.salaryRange}</div>
                  <p className="text-slate-300">Expected salary range for your profile</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Top Job Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCareerData.jobMatches.map((job, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-300">{job.title}</span>
                      <Badge variant="secondary" className="bg-purple-600 text-white">
                        {job.match}% match
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="mt-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recommended Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {mockLearningResources.map((resource, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <BookOpen className="mr-2 h-4 w-4 text-pink-400" />
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <h4 className="text-white font-semibold">{resource.title}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeAnalysis;
