
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface PersonalInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    ...data.personalInfo
  });

  useEffect(() => {
    onUpdate({ personalInfo: formData });
  }, [formData, onUpdate]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const suggestions = [
    "Use a professional email address (avoid nicknames)",
    "Include your city and state (no need for full address)",
    "LinkedIn URL should be customized (linkedin.com/in/yourname)"
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="text-white">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-white">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="john.doe@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-white">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="text-white">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin" className="text-white">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        
        <div>
          <Label htmlFor="website" className="text-white">Portfolio/Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            placeholder="www.johndoe.com"
          />
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-medium mb-2">Pro Tips</h4>
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

export default PersonalInfoForm;
