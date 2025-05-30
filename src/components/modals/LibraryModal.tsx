
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Trash2, FileText, GitBranch } from 'lucide-react';
import { useFlowcharts } from '@/hooks/useFlowcharts';
import { useToast } from '@/hooks/use-toast';

interface LibraryModalProps {
  onClose: () => void;
}

const LibraryModal = ({ onClose }: LibraryModalProps) => {
  const [filter, setFilter] = useState<'all' | 'resumes' | 'flowcharts'>('all');
  const { flowcharts, loading, deleteFlowchart } = useFlowcharts();
  const { toast } = useToast();

  const handleDownloadFlowchart = (flowchart: any) => {
    try {
      // Create PDF content for flowchart
      const pdfContent = `
        Flowchart: ${flowchart.title}
        Created: ${new Date(flowchart.created_at).toLocaleDateString()}
        
        Description: ${flowchart.description || 'No description provided'}
        
        Nodes: ${flowchart.flowchart_data?.nodes?.length || 0}
        Edges: ${flowchart.flowchart_data?.edges?.length || 0}
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${flowchart.title.replace(/\s+/g, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Flowchart downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download flowchart",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFlowchart = async (id: string) => {
    try {
      await deleteFlowchart(id);
      toast({
        title: "Success",
        description: "Item deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    }
  };

  const filteredItems = flowcharts.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'flowcharts') return true; // Currently only flowcharts
    return false;
  });

  return (
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
      ) : filteredItems.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <CardHeader className="pb-2">
                {/* Thumbnail */}
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
        </div>
      )}
    </div>
  );
};

export default LibraryModal;
