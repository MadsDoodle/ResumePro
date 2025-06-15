
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';
import { format } from 'date-fns';

interface AnalysisHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnalysisHistoryModal = ({ isOpen, onClose }: AnalysisHistoryModalProps) => {
  const { getAnalysisHistory, deleteAnalysis } = useResumeAnalysis();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadAnalyses();
    }
  }, [isOpen]);

  const loadAnalyses = async () => {
    setLoading(true);
    try {
      const data = await getAnalysisHistory();
      setAnalyses(data);
    } catch (error) {
      console.error('Error loading analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (analysisId: string) => {
    const success = await deleteAnalysis(analysisId);
    if (success) {
      setAnalyses(prev => prev.filter(analysis => analysis.id !== analysisId));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
            Resume Analysis History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading analysis history...</p>
            </div>
          ) : analyses.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">No analysis history found</p>
              <p className="text-gray-500 text-sm">Upload and analyze your first resume to see results here</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {analyses.map((analysis) => (
                <Card key={analysis.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">
                        {analysis.created_resume?.resume_title || 'Unnamed Resume Analysis'}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getScoreBadgeColor(analysis.overall_score)} text-white`}>
                          {analysis.overall_score}/100
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(analysis.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Overall</p>
                        <p className={`font-bold text-lg ${getScoreColor(analysis.overall_score)}`}>
                          {analysis.overall_score}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">ATS Score</p>
                        <p className={`font-bold text-lg ${getScoreColor(analysis.ats_score)}`}>
                          {analysis.ats_score}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Design</p>
                        <p className={`font-bold text-lg ${getScoreColor(analysis.strengths?.design || 0)}`}>
                          {analysis.strengths?.design || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Clarity</p>
                        <p className={`font-bold text-lg ${getScoreColor(analysis.strengths?.clarity || 0)}`}>
                          {analysis.strengths?.clarity || 0}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(analysis.analysis_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {analysis.improvements?.length || 0} recommendations
                      </div>
                    </div>
                    
                    {analysis.analysis_summary && (
                      <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                        {analysis.analysis_summary}
                      </p>
                    )}
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

export default AnalysisHistoryModal;
