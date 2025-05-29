
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import AnimatedBackground from '@/components/AnimatedBackground';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

interface Resume {
  id: string;
  resume_title: string;
  created_at: string;
  updated_at: string;
  resume_pdf: string | null;
}

const SavedProjectsPage = () => {
  const { user } = useAuth();
  const { getUserResumes, downloadResume } = useResumeStorage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      if (user) {
        setLoading(true);
        const userResumes = await getUserResumes();
        setResumes(userResumes);
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user, getUserResumes]);

  const handleDownload = async (resumeId: string) => {
    await downloadResume(resumeId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#060315] relative overflow-hidden">
      <AnimatedBackground />
      <ModernNavigation />
      
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Saved Projects
            </h1>
            <p className="text-purple-300 text-lg">Manage your created and downloaded resumes</p>
          </div>
          
          <Tabs defaultValue="all" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-purple-900/20 border border-purple-500/30">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-purple-600">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="recent" className="text-white data-[state=active]:bg-purple-600">
                Recent
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-white data-[state=active]:bg-purple-600">
                Favorites
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              {loading ? (
                <div className="text-center text-white">Loading your projects...</div>
              ) : resumes.length === 0 ? (
                <Card className="bg-purple-900/20 border-purple-500/30 text-center py-12">
                  <CardContent>
                    <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
                    <p className="text-purple-300 mb-4">Start creating resumes to see them here</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Create Your First Resume
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resumes.map((resume) => (
                    <Card 
                      key={resume.id} 
                      className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                    >
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-purple-400" />
                          {resume.resume_title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-purple-300">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(resume.created_at)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPreviewResume(resume)}
                            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(resume.id)}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes
                  .slice()
                  .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                  .slice(0, 6)
                  .map((resume) => (
                    <Card 
                      key={resume.id} 
                      className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                    >
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-purple-400" />
                          {resume.resume_title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-purple-300">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(resume.updated_at)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPreviewResume(resume)}
                            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(resume.id)}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-8">
              <Card className="bg-purple-900/20 border-purple-500/30 text-center py-12">
                <CardContent>
                  <h3 className="text-xl font-semibold text-white mb-2">Favorites Feature Coming Soon</h3>
                  <p className="text-purple-300">Soon you'll be able to mark your favorite resumes</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Preview Modal */}
      {previewResume && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E0E0E] rounded-lg p-6 max-w-2xl w-full border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">{previewResume.resume_title}</h2>
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6 min-h-[300px] flex items-center justify-center">
              <p className="text-gray-400">Resume preview will be implemented here</p>
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => setPreviewResume(null)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Close
              </Button>
              <Button 
                onClick={() => handleDownload(previewResume.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedProjectsPage;
