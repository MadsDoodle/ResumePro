
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: any;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [] } = data;

  return (
    <Card className="bg-white text-black max-h-[800px] overflow-y-auto">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {personalInfo.location}
              </div>
            )}
          </div>
          {(personalInfo.linkedin || personalInfo.website) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-3 w-3" />
                  {personalInfo.linkedin}
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {personalInfo.website}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-gray-700 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-sm text-gray-700 mt-2">
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((ed: any, index: number) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{ed.degree}</h3>
                    <p className="text-gray-700 text-sm">{ed.institution}</p>
                    {ed.gpa && <p className="text-gray-600 text-sm">GPA: {ed.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{ed.graduationDate}</p>
                    {ed.location && <p>{ed.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder message when no data */}
        {!personalInfo.fullName && !summary && experience.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Your resume preview will appear here as you fill out the form.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
