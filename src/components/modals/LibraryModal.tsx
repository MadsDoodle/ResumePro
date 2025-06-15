import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, FileText, GitBranch } from 'lucide-react';
import { useFlowcharts } from '@/hooks/useFlowcharts';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import { usePDFGeneration } from '@/hooks/usePDFGeneration';
import { useToast } from '@/hooks/use-toast';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LibraryModal = ({ isOpen, onClose }: LibraryModalProps) => {
  const [filter, setFilter] = useState<'all' | 'resumes' | 'flowcharts'>('all');
  const { flowcharts, loading, deleteFlowchart } = useFlowcharts();
  const { getUserResumes } = useResumeStorage();
  const { generatePDF } = usePDFGeneration();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<any[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      const fetchResumes = async () => {
        const userResumes = await getUserResumes();
        setResumes(userResumes);
      };
      fetchResumes();
    }
  }, [isOpen]);

  const handleDownloadFlowchart = async (flowchart: any) => {
    try {
      // Create a better PDF representation of the flowchart
      const flowchartContent = `
        <div id="flowchart-export" style="padding: 40px; font-family: Arial, sans-serif;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            ${flowchart.title}
          </h1>
          <p style="color: #6b7280; margin-bottom: 30px;">
            Created: ${new Date(flowchart.created_at).toLocaleDateString()}
          </p>
          
          ${flowchart.description ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937;">Description</h2>
              <p>${flowchart.description}</p>
            </div>
          ` : ''}
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1f2937;">Flowchart Overview</h2>
            <p>Nodes: ${flowchart.flowchart_data?.nodes?.length || 0}</p>
            <p>Connections: ${flowchart.flowchart_data?.edges?.length || 0}</p>
          </div>
          
          ${flowchart.flowchart_data?.nodes?.length ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937;">Nodes</h2>
              ${flowchart.flowchart_data.nodes.map((node: any, index: number) => `
                <div style="margin-bottom: 15px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
                  <h3 style="color: #374151; margin-bottom: 5px;">${index + 1}. ${node.data?.label || 'Untitled Node'}</h3>
                  <p style="color: #6b7280; font-size: 14px;">Type: ${node.data?.nodeType || 'process'}</p>
                  ${node.data?.description ? `<p style="margin-top: 8px;">${node.data.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${flowchart.flowchart_data?.edges?.length ? `
            <div>
              <h2 style="color: #1f2937;">Connections</h2>
              ${flowchart.flowchart_data.edges.map((edge: any, index: number) => {
                const sourceNode = flowchart.flowchart_data.nodes.find((n: any) => n.id === edge.source);
                const targetNode = flowchart.flowchart_data.nodes.find((n: any) => n.id === edge.target);
                return `
                  <p style="margin-bottom: 8px;">
                    ${index + 1}. ${sourceNode?.data?.label || edge.source} → ${targetNode?.data?.label || edge.target}
                  </p>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
      
      // Create temporary element
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = flowchartContent;
      tempDiv.id = 'flowchart-export';
      document.body.appendChild(tempDiv);
      
      await generatePDF('flowchart-export', flowchart.title.replace(/\s+/g, '_'));
      
      document.body.removeChild(tempDiv);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download flowchart as PDF",
        variant: "destructive"
      });
    }
  };

  const handleDownloadResume = async (resume: any) => {
    try {
      // For now, just show a message since we don't have the resume data structure
      toast({
        title: "Info",
        description: "Resume download feature will be available once you create a resume using the builder.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFlowchart = async (id: string) => {
    try {
      await deleteFlowchart(id);
      toast({
        title: "Success",
        description: "Flowchart deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete flowchart",
        variant: "destructive"
      });
    }
  };

  const filteredFlowcharts = filter === 'all' || filter === 'flowcharts' ? flowcharts : [];
  const filteredResumes = filter === 'all' || filter === 'resumes' ? resumes : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <FileText className="mr-2 h-5 w-5 text-purple-400" />
            My Library
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Filter Controls */}
          <div className="flex space-x-2">
            {(['all', 'resumes', 'flowcharts'] as const).map((filterType) => (
              <Button
                key={filterType}
                onClick={() => setFilter(filterType)}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                className={filter === filterType ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>

          {/* Items Grid */}
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          ) : (filteredFlowcharts.length === 0 && filteredResumes.length === 0) ? (
            <div className="text-center text-gray-400 py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Flowcharts */}
              {filteredFlowcharts.map((item) => (
                <Card key={item.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardHeader className="pb-2">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                      <GitBranch className="h-8 w-8 text-purple-400" />
                    </div>
                    <CardTitle className="text-white text-sm line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-400 text-xs line-clamp-3 mb-4">
                      {item.description || 'No description available'}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDownloadFlowchart(item)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10 text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                      <Button
                        onClick={() => handleDeleteFlowchart(item.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Resumes */}
              {filteredResumes.map((item) => (
                <Card key={item.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardHeader className="pb-2">
                    <div className="w-full h-32 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="h-8 w-8 text-green-400" />
                    </div>
                    <CardTitle className="text-white text-sm line-clamp-2">{item.resume_title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-400 text-xs line-clamp-3 mb-4">
                      Created: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDownloadResume(item)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10 text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryModal;
