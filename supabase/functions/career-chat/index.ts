
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CAREER_COACH_SYSTEM_PROMPT = `You are a supportive, intelligent AI Career Coach built into a resume assistant platform. Your mission is to help users:

- Explore suitable career paths based on their background or goals
- Recommend skillsets, certifications, and projects to improve their resumes
- Offer insights into job markets, roles, and industry trends
- Personalize advice using the user's uploaded or described resume

Style: Be friendly, professional, motivating — like a career mentor. Use bullet points, structured lists, or examples. Always focus on clarity and career growth. 

If a user is unsure or vague, ask questions to help clarify their direction (e.g., "What field are you currently in?", "What interests you most: people, data, creativity, or code?")

Never give generic filler. Be sharp, helpful, and structured.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build messages array with system prompt and conversation history
    const messages = [
      { role: 'system', content: CAREER_COACH_SYSTEM_PROMPT },
      ...conversationHistory.map((msg: any) => ({
        role: msg.isAI ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in career-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
