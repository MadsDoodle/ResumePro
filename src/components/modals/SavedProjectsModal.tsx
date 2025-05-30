
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Trash2, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SavedProjectsModalProps {
  onClose: () => void;
}

interface SavedProject {
  id: string;
  resume_title: string;
  resume_pdf: string | null;
  created_at: string;
  updated_at: string;
}

const SavedProjectsModal = ({ onClose }: SavedProjectsModalProps) => {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('created_resume')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load saved projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = (project: SavedProject) => {
    try {
      // Create a simple PDF content for the resume
      const pdfContent = `
        Resume: ${project.resume_title}
        Created: ${new Date(project.created_at).toLocaleDateString()}
        Last Updated: ${new Date(project.updated_at).toLocaleDateString()}
        
        ${project.resume_pdf || 'Resume content not available'}
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.resume_title.replace(/\s+/g, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Resume downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive"
      });
    }
  };

  const handlePreview = (project: SavedProject) => {
    // Create a preview modal or new window
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Resume Preview: ${project.resume_title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
            </style>
          </head>
          <body>
            <h1>${project.resume_title}</h1>
            <p><strong>Created:</strong> ${new Date(project.created_at).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> ${new Date(project.updated_at).toLocaleDateString()}</p>
            <hr>
            <div>${project.resume_pdf || 'Resume content not available'}</div>
          </body>
        </html>
      `);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('created_resume')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-gray-300">
        <p>View and manage your saved resume projects</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No saved projects found</p>
          <p className="text-sm mt-2">Create your first resume to see it here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{project.resume_title}</h3>
                      <p className="text-gray-400 text-sm">
                        Updated {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handlePreview(project)}
                      size="sm"
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDownloadPDF(project)}
                      size="sm"
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(project.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProjectsModal;
