
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

interface EducationFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const [educations, setEducations] = useState<Education[]>(
    data.education || [
      {
        id: '1',
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: '',
      }
    ]
  );

  useEffect(() => {
    onUpdate({ education: educations });
  }, [educations, onUpdate]);

  const addEducation = () => {
    const newEd: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
    };
    setEducations([...educations, newEd]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(ed => ed.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(ed => 
      ed.id === id ? { ...ed, [field]: value } : ed
    ));
  };

  return (
    <div className="space-y-6">
      {educations.map((ed, index) => (
        <Card key={ed.id} className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex justify-between items-center">
              Education #{index + 1}
              {educations.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(ed.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Degree *</Label>
                <Input
                  value={ed.degree}
                  onChange={(e) => updateEducation(ed.id, 'degree', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <Label className="text-white">Institution *</Label>
                <Input
                  value={ed.institution}
                  onChange={(e) => updateEducation(ed.id, 'institution', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  placeholder="University of California"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">Location</Label>
                <Input
                  value={ed.location}
                  onChange={(e) => updateEducation(ed.id, 'location', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  placeholder="Berkeley, CA"
                />
              </div>
              <div>
                <Label className="text-white">Graduation Date</Label>
                <Input
                  type="month"
                  value={ed.graduationDate}
                  onChange={(e) => updateEducation(ed.id, 'graduationDate', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">GPA (Optional)</Label>
                <Input
                  value={ed.gpa || ''}
                  onChange={(e) => updateEducation(ed.id, 'gpa', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  placeholder="3.8"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        onClick={addEducation}
        className="w-full border-white/30 text-white hover:bg-white/10"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Another Education
      </Button>
    </div>
  );
};

export default EducationForm;
