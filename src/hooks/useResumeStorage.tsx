
import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export function useResumeStorage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const uploadResume = async (file: File, resumeTitle: string) => {
    if (!user) return null;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save resume metadata to database
      const { data: resumeData, error: dbError } = await supabase
        .from('created_resume')
        .insert({
          user_id: user.id,
          resume_title: resumeTitle,
          resume_pdf: uploadData.path
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "Resume Saved",
        description: "Your resume has been successfully saved to your library.",
      });

      return resumeData;
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const downloadResume = async (resumeId: string) => {
    if (!user) return;

    try {
      const { data: resumeData, error: dbError } = await supabase
        .from('created_resume')
        .select('resume_pdf, resume_title')
        .eq('id', resumeId)
        .eq('user_id', user.id)
        .single();

      if (dbError) throw dbError;

      if (resumeData.resume_pdf) {
        const { data: fileData, error: downloadError } = await supabase.storage
          .from('resumes')
          .download(resumeData.resume_pdf);

        if (downloadError) throw downloadError;

        // Create download link
        const url = URL.createObjectURL(fileData);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.resume_title}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
          title: "Download Started",
          description: `Downloading ${resumeData.resume_title}...`,
        });
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getUserResumes = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('created_resume')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching resumes:', error);
      return [];
    }
  };

  const saveResumeToDatabase = async (resumeData: any, resumeTitle: string) => {
    if (!user) return null;

    try {
      // Create a JSON file from the resume data
      const resumeContent = JSON.stringify(resumeData, null, 2);
      const blob = new Blob([resumeContent], { type: 'application/json' });
      const file = new File([blob], `${resumeTitle}.json`, { type: 'application/json' });

      // Upload the file and save metadata
      const result = await uploadResume(file, resumeTitle);
      
      return result;
    } catch (error) {
      console.error('Error saving resume to database:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your resume to the database.",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    uploadResume,
    downloadResume,
    getUserResumes,
    saveResumeToDatabase,
    uploading
  };
}
