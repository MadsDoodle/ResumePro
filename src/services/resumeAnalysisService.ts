
import { supabase } from '@/integrations/supabase/client';

interface AnalysisResult {
  overallScore: number;
  designScore: number;
  clarityScore: number;
  atsScore: number;
  recommendations: string[];
  extractedText: string;
}

export const analyzeResumeWithAI = async (file: File): Promise<AnalysisResult> => {
  try {
    console.log('Starting resume analysis for file:', file.name);
    
    // Extract text from the uploaded file
    const extractedText = await extractTextFromFile(file);
    console.log('Text extracted, length:', extractedText.length);
    
    // Call our Supabase edge function for AI analysis using the proper client method
    const { data, error } = await supabase.functions.invoke('analyze-resume', {
      body: {
        resumeText: extractedText,
        fileName: file.name
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to analyze resume: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from analysis');
    }

    console.log('Analysis completed successfully:', data);
    
    return {
      ...data,
      extractedText
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        if (file.type === 'application/pdf') {
          // For PDF files, we'll extract basic text
          // In a real implementation, you'd use a PDF parsing library
          resolve("Sample extracted text from PDF. This would contain the actual resume content in a production environment.");
        } else if (file.type.includes('word') || file.name.endsWith('.docx')) {
          // For Word documents
          resolve("Sample extracted text from DOCX. This would contain the actual resume content in a production environment.");
        } else {
          // For other text-based files
          resolve(e.target?.result as string || '');
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    if (file.type === 'application/pdf' || file.type.includes('word')) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
};
