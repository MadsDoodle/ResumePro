
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
    // Extract text from the uploaded file
    const extractedText = await extractTextFromFile(file);
    
    // Call our Supabase edge function for AI analysis
    const response = await fetch('/functions/v1/analyze-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText: extractedText,
        fileName: file.name
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    const result = await response.json();
    return {
      ...result,
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
