
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    console.log('Received message:', message);
    console.log('Conversation history length:', conversationHistory?.length || 0);

    // Prepare conversation context
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful, friendly, and engaging AI assistant. Provide clear, concise, and conversational responses. Keep your responses natural and engaging, as they will be converted to speech. Avoid using special characters or formatting that might interfere with text-to-speech conversion.'
      }
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      // Add last few messages for context (limit to prevent token overflow)
      const recentHistory = conversationHistory.slice(-6);
      recentHistory.forEach(msg => {
        if (msg.type === 'user') {
          messages.push({ role: 'user', content: msg.content });
        } else if (msg.type === 'ai') {
          messages.push({ role: 'assistant', content: msg.content });
        }
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    console.log('Sending to OpenAI with messages:', messages.length);

    // Send to OpenAI for chat completion
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const result = await response.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    const aiResponse = result.choices[0].message.content;
    console.log('AI response generated:', aiResponse.substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        usage: result.usage || {}
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Voice chat error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check the function logs for more information'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
