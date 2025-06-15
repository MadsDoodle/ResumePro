
-- Create table for resume analysis results
CREATE TABLE public.resume_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  resume_id UUID REFERENCES public.created_resume(id) ON DELETE CASCADE,
  analysis_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ats_score INTEGER,
  overall_score INTEGER,
  strengths JSONB,
  improvements JSONB,
  suggestions JSONB,
  analysis_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resume_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own resume analysis" 
  ON public.resume_analysis 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resume analysis" 
  ON public.resume_analysis 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resume analysis" 
  ON public.resume_analysis 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resume analysis" 
  ON public.resume_analysis 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add index for better performance
CREATE INDEX idx_resume_analysis_user_id ON public.resume_analysis(user_id);
CREATE INDEX idx_resume_analysis_resume_id ON public.resume_analysis(resume_id);
