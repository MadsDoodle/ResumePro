
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Linkedin, User } from 'lucide-react';
import { ResumeTemplate } from '@/data/resumeTemplates';

interface ResumePreviewProps {
  data: any;
  template?: ResumeTemplate | null;
}

const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [] } = data;
  
  // Use template colors or default
  const primaryColor = template?.primaryColor || '#3B82F6';
  const layout = template?.layout || '1-column';
  const photo = template?.photo || 'without';

  if (layout === '2-column') {
    return (
      <Card className="bg-white text-black max-h-[800px] overflow-y-auto">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 min-h-[800px]">
            {/* Left Sidebar */}
            <div className="col-span-1 p-6 text-white" style={{ backgroundColor: primaryColor }}>
              {photo === 'with' && (
                <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center">
                  <User className="h-12 w-12 text-white/70" />
                </div>
              )}
              
              <div className="mb-6">
                <h1 className="text-xl font-bold mb-3 text-center">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="space-y-2 text-sm">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-3 w-3 flex-shrink-0" />
                      <span className="break-all">{personalInfo.linkedin}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 flex-shrink-0" />
                      <span className="break-all">{personalInfo.website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3 border-b border-white/30 pb-1">
                    SKILLS
                  </h3>
                  <div className="space-y-1">
                    {skills.map((skill: string, index: number) => (
                      <div key={index} className="text-sm py-1">
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education in Sidebar */}
              {education.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 border-b border-white/30 pb-1">
                    EDUCATION
                  </h3>
                  <div className="space-y-3">
                    {education.map((ed: any, index: number) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{ed.degree}</div>
                        <div className="text-white/80">{ed.institution}</div>
                        <div className="text-white/70">{ed.graduationDate}</div>
                        {ed.gpa && <div className="text-white/70">GPA: {ed.gpa}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="col-span-2 p-6 space-y-6">
              {/* Professional Summary */}
              {summary && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
                </div>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                    WORK EXPERIENCE
                  </h2>
                  <div className="space-y-4">
                    {experience.map((exp: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base">{exp.jobTitle}</h3>
                            <p className="text-gray-700 font-medium">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <p className="font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
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
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Single column layout (default)
  return (
    <Card className="bg-white text-black max-h-[800px] overflow-y-auto">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center pb-4" style={{ borderBottomColor: primaryColor, borderBottomWidth: '2px' }}>
          {photo === 'with' && (
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-500" />
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-3" style={{ color: primaryColor }}>
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
            <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              WORK EXPERIENCE
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
            <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              EDUCATION
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
            <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded"
                  style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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
