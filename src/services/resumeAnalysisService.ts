
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
          // For PDF files, we need to use a PDF parsing library
          // Since we can't install pdf-parse in the browser, we'll read as text for now
          // In a production environment, you'd want to handle PDF parsing server-side
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            // Convert ArrayBuffer to text (this is a simplified approach)
            const uint8Array = new Uint8Array(result);
            let text = '';
            for (let i = 0; i < uint8Array.length; i++) {
              if (uint8Array[i] >= 32 && uint8Array[i] <= 126) {
                text += String.fromCharCode(uint8Array[i]);
              } else if (uint8Array[i] === 10 || uint8Array[i] === 13) {
                text += ' ';
              }
            }
            // Clean up the extracted text
            text = text.replace(/\s+/g, ' ').trim();
            resolve(text || 'Unable to extract text from PDF. Please ensure the PDF contains readable text.');
          } else {
            resolve('Unable to extract text from PDF.');
          }
        } else if (file.type.includes('word') || file.name.endsWith('.docx')) {
          // For Word documents, similar approach
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(result);
            let text = '';
            for (let i = 0; i < uint8Array.length; i++) {
              if (uint8Array[i] >= 32 && uint8Array[i] <= 126) {
                text += String.fromCharCode(uint8Array[i]);
              } else if (uint8Array[i] === 10 || uint8Array[i] === 13) {
                text += ' ';
              }
            }
            text = text.replace(/\s+/g, ' ').trim();
            resolve(text || 'Unable to extract text from DOCX. Please ensure the document contains readable text.');
          } else {
            resolve('Unable to extract text from DOCX.');
          }
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
