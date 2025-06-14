
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
      <Card className="bg-white text-black max-h-[800px] overflow-y-auto border-2 border-gray-200 shadow-lg">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 min-h-[800px]">
            {/* Left Sidebar */}
            <div className="col-span-1 p-8 text-white border-r-4 border-white/20" style={{ backgroundColor: primaryColor }}>
              {photo === 'with' && (
                <div className="w-28 h-28 rounded-full bg-white/20 mx-auto mb-8 flex items-center justify-center border-4 border-white/30 shadow-lg">
                  <User className="h-14 w-14 text-white/70" />
                </div>
              )}
              
              <div className="mb-8 pb-6 border-b-2 border-white/30">
                <h1 className="text-2xl font-bold mb-4 text-center">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="space-y-3 text-sm">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2 p-2 rounded bg-white/10">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2 p-2 rounded bg-white/10">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2 p-2 rounded bg-white/10">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center gap-2 p-2 rounded bg-white/10">
                      <Linkedin className="h-4 w-4 flex-shrink-0" />
                      <span className="break-all">{personalInfo.linkedin}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center gap-2 p-2 rounded bg-white/10">
                      <Globe className="h-4 w-4 flex-shrink-0" />
                      <span className="break-all">{personalInfo.website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="mb-8 pb-6 border-b-2 border-white/30">
                  <h3 className="font-semibold text-xl mb-4 pb-2 border-b border-white/30">
                    SKILLS
                  </h3>
                  <div className="space-y-2">
                    {skills.map((skill: string, index: number) => (
                      <div key={index} className="text-sm py-2 px-3 rounded bg-white/10 border-l-4 border-white/50">
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education in Sidebar */}
              {education.length > 0 && (
                <div>
                  <h3 className="font-semibold text-xl mb-4 pb-2 border-b border-white/30">
                    EDUCATION
                  </h3>
                  <div className="space-y-4">
                    {education.map((ed: any, index: number) => (
                      <div key={index} className="text-sm p-3 rounded bg-white/10 border-l-4 border-white/50">
                        <div className="font-medium mb-1">{ed.degree}</div>
                        <div className="text-white/80 mb-1">{ed.institution}</div>
                        <div className="text-white/70 mb-1">{ed.graduationDate}</div>
                        {ed.gpa && <div className="text-white/70">GPA: {ed.gpa}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="col-span-2 p-8 space-y-8">
              {/* Professional Summary */}
              {summary && (
                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50/50">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed mt-3">{summary}</p>
                </div>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50/50">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                    WORK EXPERIENCE
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border-l-4 bg-white border border-gray-200" style={{ borderLeftColor: primaryColor }}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{exp.jobTitle}</h3>
                            <p className="text-gray-700 font-medium mt-1">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                            <p className="font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                            {exp.location && <p>{exp.location}</p>}
                          </div>
                        </div>
                        {exp.description && (
                          <div className="text-sm text-gray-700 mt-3 pl-3 border-l-2 border-gray-200">
                            {exp.description.split('\n').map((line: string, i: number) => (
                              <p key={i} className="mb-2">{line}</p>
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
    <Card className="bg-white text-black max-h-[800px] overflow-y-auto border-2 border-gray-200 shadow-lg">
      <CardContent className="p-8 space-y-8">
        {/* Header */}
        <div className="text-center pb-6 rounded-lg border-b-4" style={{ borderBottomColor: primaryColor, background: `linear-gradient(to bottom, ${primaryColor}05, transparent)` }}>
          {photo === 'with' && (
            <div className="w-28 h-28 rounded-full bg-gray-300 mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg">
              <User className="h-14 w-14 text-gray-500" />
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
                <Phone className="h-4 w-4" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
                <MapPin className="h-4 w-4" />
                {personalInfo.location}
              </div>
            )}
          </div>
          {(personalInfo.linkedin || personalInfo.website) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-3">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
                  <Linkedin className="h-4 w-4" />
                  {personalInfo.linkedin}
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
                  <Globe className="h-4 w-4" />
                  {personalInfo.website}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mt-3">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6 mt-4">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="p-4 rounded-lg border-l-4 bg-white border border-gray-200" style={{ borderLeftColor: primaryColor }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{exp.jobTitle}</h3>
                      <p className="text-gray-700 text-sm mt-1">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                      <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-sm text-gray-700 mt-3 pl-3 border-l-2 border-gray-200">
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-2">{line}</p>
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
          <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
              EDUCATION
            </h2>
            <div className="space-y-4 mt-4">
              {education.map((ed: any, index: number) => (
                <div key={index} className="flex justify-between items-start p-4 rounded-lg border-l-4 bg-white border border-gray-200" style={{ borderLeftColor: primaryColor }}>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{ed.degree}</h3>
                    <p className="text-gray-700 text-sm mt-1">{ed.institution}</p>
                    {ed.gpa && <p className="text-gray-600 text-sm mt-1">GPA: {ed.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
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
          <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50/50">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm rounded-full border-2 shadow-sm"
                  style={{ backgroundColor: `${primaryColor}20`, color: primaryColor, borderColor: primaryColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder message when no data */}
        {!personalInfo.fullName && !summary && experience.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-lg">Your resume preview will appear here as you fill out the form.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
