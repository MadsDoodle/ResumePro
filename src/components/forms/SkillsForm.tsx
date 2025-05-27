
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Lightbulb } from 'lucide-react';

interface SkillsFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [currentSkill, setCurrentSkill] = useState('');

  useEffect(() => {
    onUpdate({ skills });
  }, [skills, onUpdate]);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript',
    'AWS', 'Docker', 'Git', 'SQL', 'MongoDB'
  ];

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-white">Add Skills</Label>
        <div className="flex gap-2 mt-2">
          <Input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="Type a skill and press Enter"
          />
          <Button
            onClick={addSkill}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current Skills */}
      {skills.length > 0 && (
        <div>
          <Label className="text-white">Your Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-600 text-white hover:bg-blue-700 pr-1"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:bg-blue-800 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Skills */}
      <div>
        <Label className="text-white">Suggested Skills</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestedSkills
            .filter(skill => !skills.includes(skill))
            .map((skill, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => addSuggestedSkill(skill)}
                className="border-white/30 text-white hover:bg-white/10 text-xs"
              >
                + {skill}
              </Button>
            ))}
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium mb-2">Skill Tips</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Include both technical and soft skills</li>
              <li>• Match skills to job descriptions you're targeting</li>
              <li>• List 10-15 relevant skills maximum</li>
              <li>• Prioritize skills you're proficient in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
