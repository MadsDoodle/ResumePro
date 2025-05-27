
import { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, BookOpen, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import FileUpload from '@/components/FileUpload';

const ResumeAnalysis = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const mockAnalysisData = {
    score: 85,
    keywords: { found: 12, recommended: 15 },
    ats: 92,
    structure: 78,
    recommendations: [
      'Add more industry-specific keywords',
      'Improve work experience descriptions',
      'Include quantifiable achievements'
    ],
    salaryRange: '$65,000 - $85,000',
    jobMatches: [
      { title: 'Senior Software Developer', match: 94 },
      { title: 'Full Stack Engineer', match: 89 },
      { title: 'Technical Lead', match: 82 }
    ],
    learningResources: [
      { title: 'Advanced React Patterns', type: 'Course' },
      { title: 'AWS Cloud Practitioner', type: 'Certification' },
      { title: 'System Design Interview', type: 'Course' }
    ]
  };

  if (!uploadedFile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white mb-4">
              Upload Your Resume for Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload onFileUpload={handleFileUpload} />
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
            <h3 className="text-2xl font-semibold text-white mb-4">Analyzing Your Resume</h3>
            <p className="text-slate-300">Our AI is evaluating your resume for optimization opportunities...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Resume Analysis Results</h2>
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
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">{mockAnalysisData.score}/100</div>
                  <Progress value={mockAnalysisData.score} className="mb-4" />
                  <p className="text-slate-300">Your resume is performing well!</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">ATS Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{mockAnalysisData.ats}%</div>
                  <Progress value={mockAnalysisData.ats} className="mb-4" />
                  <p className="text-slate-300">Excellent ATS compatibility</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockAnalysisData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <Zap className="mr-3 h-4 w-4 text-yellow-400" />
                      {rec}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Optimize Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigator" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Salary Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-4">{mockAnalysisData.salaryRange}</div>
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
                  {mockAnalysisData.jobMatches.map((job, index) => (
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
                {mockAnalysisData.learningResources.map((resource, index) => (
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
