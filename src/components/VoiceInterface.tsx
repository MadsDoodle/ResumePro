import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Send, Volume2, Square, Edit3, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface VoiceMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: string;
}

// Extend Window interface to include Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const VoiceInterface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [editableTranscript, setEditableTranscript] = useState('');
  const [realtimeTranscript, setRealtimeTranscript] = useState('');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiSpeechText, setAiSpeechText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const conversationIdRef = useRef(crypto.randomUUID());
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Initialize speech recognition for real-time transcription
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setRealtimeTranscript(finalTranscript + interimTranscript);
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTranscript('');
      setRealtimeTranscript('');

      // Start speech recognition for real-time transcription
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Convert audio to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      // Send to speech-to-text function
      const { data, error } = await supabase.functions.invoke('speech-to-text', {
        body: { audio: base64Audio }
      });

      if (error) throw error;

      setTranscript(data.text);
      setEditableTranscript(data.text);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process audio",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const sendMessage = async (textToSend?: string) => {
    const messageText = textToSend || editableTranscript || transcript;
    if (!messageText.trim() || !user) return;

    setIsProcessing(true);
    const userMessage: VoiceMessage = {
      id: crypto.randomUUID(),
      content: messageText,
      type: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Save user message to database
      await supabase.from('voice_conversations').insert({
        user_id: user.id,
        conversation_id: conversationIdRef.current,
        message_content: messageText,
        message_type: 'user'
      });

      // Get AI response
      const { data: chatData, error: chatError } = await supabase.functions.invoke('voice-chat', {
        body: { message: messageText }
      });

      if (chatError) throw chatError;

      const aiMessage: VoiceMessage = {
        id: crypto.randomUUID(),
        content: chatData.response,
        type: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setAiSpeechText(chatData.response);

      // Save AI message to database
      await supabase.from('voice_conversations').insert({
        user_id: user.id,
        conversation_id: conversationIdRef.current,
        message_content: chatData.response,
        message_type: 'ai'
      });

      // Convert AI response to speech
      const { data: speechData, error: speechError } = await supabase.functions.invoke('text-to-speech', {
        body: { text: chatData.response }
      });

      if (speechError) throw speechError;

      // Play the audio
      playAudio(speechData.audioContent);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setTranscript('');
      setEditableTranscript('');
      setRealtimeTranscript('');
      setIsEditingTranscript(false);
    }
  };

  const playAudio = (base64Audio: string) => {
    try {
      // Convert base64 to blob
      const byteCharacters = atob(base64Audio);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: 'audio/mpeg' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        setAiSpeechText('');
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setAiSpeechText('');
        URL.revokeObjectURL(audioUrl);
        toast({
          title: "Error",
          description: "Failed to play audio",
          variant: "destructive"
        });
      };

      audio.play();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to play audio",
        variant: "destructive"
      });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setAiSpeechText('');
    }
  };

  const handleEditTranscript = () => {
    setIsEditingTranscript(true);
    setEditableTranscript(transcript);
  };

  const handleSaveEdit = () => {
    setTranscript(editableTranscript);
    setIsEditingTranscript(false);
  };

  return (
    <div className="space-y-6">
      {/* Voice Controls */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mic className="h-5 w-5 text-purple-400" />
            Voice Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recording Controls */}
          <div className="flex justify-center">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`w-20 h-20 rounded-full ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isRecording ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>

          {/* Status */}
          <div className="text-center text-gray-300">
            {isRecording ? 'Recording... Click to stop' : 
             isProcessing ? 'Processing...' : 
             'Click to start recording'}
          </div>

          {/* Real-time Transcript Display */}
          {(isRecording && realtimeTranscript) && (
            <Card className="bg-blue-900/20 border border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-300 text-sm font-medium">Live Transcript</span>
                </div>
                <p className="text-white text-sm italic">{realtimeTranscript}</p>
              </CardContent>
            </Card>
          )}

          {/* AI Speaking Display */}
          {isPlaying && aiSpeechText && (
            <Card className="bg-green-900/20 border border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="h-4 w-4 text-green-400 animate-pulse" />
                  <span className="text-green-300 text-sm font-medium">AI Speaking</span>
                </div>
                <p className="text-white text-sm">{aiSpeechText}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Transcript Editor */}
      {transcript && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-green-400" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditingTranscript ? (
              <div className="space-y-3">
                <Textarea
                  value={editableTranscript}
                  onChange={(e) => setEditableTranscript(e.target.value)}
                  className="bg-gray-800/50 border border-purple-500/20 text-white min-h-[100px]"
                  placeholder="Edit your transcript..."
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setIsEditingTranscript(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-white text-sm">{transcript}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isProcessing || !transcript.trim()}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send & Get Voice Response
                  </Button>
                  <Button
                    onClick={handleEditTranscript}
                    variant="outline"
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Audio Controls */}
      {isPlaying && (
        <div className="flex justify-center">
          <Button
            onClick={stopAudio}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop Audio
          </Button>
        </div>
      )}

      {/* Conversation History */}
      {messages.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-purple-900/30 border border-purple-500/20 text-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && (
                      <Volume2 className="h-4 w-4 mt-1 flex-shrink-0 text-purple-400" />
                    )}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceInterface;
