import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Lightbulb } from 'lucide-react';
interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
interface ExperienceFormProps {
  data: any;
  onUpdate: (data: any) => void;
}
const ExperienceForm = ({
  data,
  onUpdate
}: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(data.experience || [{
    id: '1',
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }]);
  useEffect(() => {
    onUpdate({
      experience: experiences
    });
  }, [experiences, onUpdate]);
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };
  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };
  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => exp.id === id ? {
      ...exp,
      [field]: value
    } : exp));
  };
  const suggestions = ["Start each bullet point with an action verb", "Include quantifiable achievements (numbers, percentages)", "Focus on results and impact, not just duties", "Use 3-5 bullet points per role"];
  return <div className="space-y-6">
      {experiences.map((exp, index) => <Card key={exp.id} className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex justify-between items-center">
              Experience #{index + 1}
              {experiences.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4" />
                </Button>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Job Title *</Label>
                <Input value={exp.jobTitle} onChange={e => updateExperience(exp.id, 'jobTitle', e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-slate-400" placeholder="Software Engineer" />
              </div>
              <div>
                <Label className="text-white">Company *</Label>
                <Input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-slate-400" placeholder="Tech Company Inc." />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">Location</Label>
                <Input value={exp.location} onChange={e => updateExperience(exp.id, 'location', e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-slate-400" placeholder="San Francisco, CA" />
              </div>
              <div>
                <Label className="text-white">Start Date</Label>
                <Input type="month" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">End Date</Label>
                <Input type="month" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} className="bg-white/10 border-white/20 text-white" disabled={exp.current} placeholder={exp.current ? 'Present' : ''} />
                <div className="flex items-center mt-2">
                  <input type="checkbox" id={`current-${exp.id}`} checked={exp.current} onChange={e => updateExperience(exp.id, 'current', e.target.checked)} className="mr-2" />
                  <label htmlFor={`current-${exp.id}`} className="text-sm text-slate-300">
                    I currently work here
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-white">Description</Label>
              <Textarea value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 min-h-[100px]" placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver features on time&#10;• Improved application performance by 30% through code optimization" />
            </div>
          </CardContent>
        </Card>)}

      <Button variant="outline" onClick={addExperience} className="w-full border-white/30 text-zinc-900 bg-zinc-50">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Experience
      </Button>

      {/* Smart Suggestions */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium mb-2">Experience Tips</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              {suggestions.map((tip, index) => <li key={index}>• {tip}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default ExperienceForm;