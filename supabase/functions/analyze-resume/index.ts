
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisScores {
  overallScore: number;
  designScore: number;
  clarityScore: number;
  atsScore: number;
  recommendations: string[];
}

serve(async (req) => {
  console.log('Analyze resume function called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, fileName } = await req.json();
    console.log('Processing resume:', fileName, 'Text length:', resumeText?.length);

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    if (!resumeText) {
      throw new Error('No resume text provided');
    }

    const analysisPrompt = `
You are an expert resume analyzer and career consultant. Analyze the following resume text and provide detailed feedback.

Resume Content:
${resumeText}

Please analyze this resume and provide:

1. SCORES (0-100 scale):
   - Overall Score: Based on completeness, relevance, and professional presentation
   - Design Score: Based on structure, formatting, and visual appeal (inferred from text structure)
   - Clarity Score: Based on how clear and well-written the content is
   - ATS Score: Based on ATS-friendliness (keywords, formatting, standard sections)

2. RECOMMENDATIONS: Provide 4-6 specific, actionable recommendations to improve this resume.

Format your response as a JSON object with this exact structure:
{
  "overallScore": number,
  "designScore": number, 
  "clarityScore": number,
  "atsScore": number,
  "recommendations": ["recommendation 1", "recommendation 2", ...]
}

Be specific and actionable in your recommendations. Focus on content improvements, keyword optimization, structure enhancements, and ATS compatibility.
`;

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert resume analyzer. Always respond with valid JSON in the exact format requested.' 
          },
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const analysisText = data.choices[0].message.content;
    console.log('Analysis text:', analysisText);
    
    // Parse the JSON response
    let analysisResult: AnalysisScores;
    try {
      analysisResult = JSON.parse(analysisText);
      console.log('Parsed analysis result:', analysisResult);
    } catch (parseError) {
      console.error('Failed to parse AI response:', analysisText, parseError);
      // Fallback response if parsing fails
      analysisResult = {
        overallScore: 75,
        designScore: 70,
        clarityScore: 80,
        atsScore: 65,
        recommendations: [
          "Unable to parse detailed analysis. Please try uploading your resume again.",
          "Ensure your resume includes clear section headers (Experience, Education, Skills)",
          "Add quantifiable achievements with specific numbers and metrics",
          "Include relevant keywords from your target job descriptions"
        ]
      };
    }

    // Ensure scores are within valid range
    analysisResult.overallScore = Math.min(100, Math.max(0, analysisResult.overallScore));
    analysisResult.designScore = Math.min(100, Math.max(0, analysisResult.designScore));
    analysisResult.clarityScore = Math.min(100, Math.max(0, analysisResult.clarityScore));
    analysisResult.atsScore = Math.min(100, Math.max(0, analysisResult.atsScore));

    console.log('Returning analysis result:', analysisResult);
    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        overallScore: 0,
        designScore: 0,
        clarityScore: 0,
        atsScore: 0,
        recommendations: ["Error analyzing resume. Please try again."]
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
