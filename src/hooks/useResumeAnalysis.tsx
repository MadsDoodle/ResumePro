
import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface AnalysisResult {
  overallScore: number;
  designScore: number;
  clarityScore: number;
  atsScore: number;
  recommendations: string[];
  extractedText: string;
}

interface StoredAnalysis {
  id: string;
  resume_id: string;
  analysis_date: string;
  ats_score: number;
  overall_score: number;
  strengths: any;
  improvements: any;
  suggestions: any;
  analysis_summary: string;
}

export function useResumeAnalysis() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const saveAnalysisResult = async (
    analysisResult: AnalysisResult,
    resumeId?: string,
    fileName?: string
  ) => {
    if (!user) return null;

    setSaving(true);
    try {
      // If no resumeId provided, create a resume record first
      let finalResumeId = resumeId;
      
      if (!finalResumeId && fileName) {
        const { data: resumeData, error: resumeError } = await supabase
          .from('created_resume')
          .insert({
            user_id: user.id,
            resume_title: `Analysis of ${fileName}`,
            resume_pdf: null // This was an uploaded file for analysis only
          })
          .select()
          .single();

        if (resumeError) throw resumeError;
        finalResumeId = resumeData.id;
      }

      // Save analysis results
      const { data, error } = await supabase
        .from('resume_analysis')
        .insert({
          user_id: user.id,
          resume_id: finalResumeId,
          ats_score: analysisResult.atsScore,
          overall_score: analysisResult.overallScore,
          strengths: {
            design: analysisResult.designScore,
            clarity: analysisResult.clarityScore
          },
          improvements: analysisResult.recommendations,
          suggestions: analysisResult.recommendations,
          analysis_summary: `Overall Score: ${analysisResult.overallScore}/100, ATS Score: ${analysisResult.atsScore}/100`
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Analysis Saved",
        description: "Your resume analysis has been saved to your library.",
      });

      return data;
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save analysis results. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  const getAnalysisHistory = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('resume_analysis')
        .select(`
          *,
          created_resume (
            resume_title,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('analysis_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching analysis history:', error);
      return [];
    }
  };

  const deleteAnalysis = async (analysisId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('resume_analysis')
        .delete()
        .eq('id', analysisId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Analysis Deleted",
        description: "Analysis record has been removed from your library.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete analysis. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    saveAnalysisResult,
    getAnalysisHistory,
    deleteAnalysis,
    saving
  };
}
