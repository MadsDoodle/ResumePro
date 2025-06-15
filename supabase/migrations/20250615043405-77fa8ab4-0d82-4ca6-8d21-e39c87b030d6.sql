
-- Create voice_conversations table to store voice chat history
CREATE TABLE voice_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID NOT NULL,
  message_content TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('user', 'ai')) NOT NULL,
  audio_url TEXT, -- For storing audio file URLs if needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS policies
ALTER TABLE voice_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own voice conversations" ON voice_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own voice conversations" ON voice_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own voice conversations" ON voice_conversations
  FOR DELETE USING (auth.uid() = user_id);

-- Add index for better performance
CREATE INDEX idx_voice_conversations_user_id ON voice_conversations(user_id);
CREATE INDEX idx_voice_conversations_conversation_id ON voice_conversations(conversation_id);
