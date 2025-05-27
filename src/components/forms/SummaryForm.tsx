
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lightbulb, Zap } from 'lucide-react';

interface SummaryFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SummaryForm = ({ data, onUpdate }: SummaryFormProps) => {
  const [summary, setSummary] = useState(data.summary || '');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = summary.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    onUpdate({ summary });
  }, [summary, onUpdate]);

  const generateSample = () => {
    const sampleSummary = "Results-driven software engineer with 5+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-quality solutions that improve user experience and business outcomes. Expertise in React, Node.js, and cloud technologies.";
    setSummary(sampleSummary);
  };

  const suggestions = [
    "Start with your years of experience and key role",
    "Include 2-3 major achievements or skills",
    "Keep it between 50-150 words",
    "Use action words like 'developed', 'led', 'improved'"
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="summary" className="text-white">Professional Summary</Label>
          <span className="text-sm text-slate-400">{wordCount} words</span>
        </div>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 min-h-[120px]"
          placeholder="Write a compelling summary that highlights your key achievements and expertise..."
        />
      </div>

      <Button
        variant="outline"
        onClick={generateSample}
        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
      >
        <Zap className="mr-2 h-4 w-4" />
        Generate Sample
      </Button>

      {/* Smart Suggestions */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium mb-2">Writing Tips</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              {suggestions.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
