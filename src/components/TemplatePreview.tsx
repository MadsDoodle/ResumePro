
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Linkedin, User } from 'lucide-react';
import { ResumeTemplate } from '@/data/resumeTemplates';

interface TemplatePreviewProps {
  template: ResumeTemplate;
  isFullPreview?: boolean;
}

const TemplatePreview = ({ template, isFullPreview = false }: TemplatePreviewProps) => {
  const { structure, primaryColor, secondaryColor, layout, photo } = template;

  if (isFullPreview) {
    return (
      <Card className="bg-white text-black overflow-hidden">
        <CardContent className={`p-6 ${layout === '2-column' ? 'grid grid-cols-3 gap-6' : 'space-y-6'}`}>
          {layout === '2-column' ? (
            <>
              {/* Left Column */}
              <div className="col-span-1 space-y-4" style={{ backgroundColor: `${primaryColor}10` }}>
                <div className="p-4">
                  {photo === 'with' && (
                    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h1 className="text-xl font-bold" style={{ color: primaryColor }}>
                      {structure.personalInfo.fullName}
                    </h1>
                    <div className="text-xs text-gray-600 space-y-1 mt-2">
                      <div className="flex items-center justify-center gap-1">
                        <Mail className="h-3 w-3" />
                        {structure.personalInfo.email}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Phone className="h-3 w-3" />
                        {structure.personalInfo.phone}
                      </div>
                      {structure.personalInfo.location && (
                        <div className="flex items-center justify-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {structure.personalInfo.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2" style={{ color: primaryColor }}>SKILLS</h3>
                    <div className="space-y-1">
                      {structure.skills.slice(0, 4).map((skill, index) => (
                        <div key={index} className="text-xs text-gray-700">{skill}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-2 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold mb-2" style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: '2px' }}>
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-xs text-gray-700 leading-relaxed">{structure.summary}</p>
                </div>

                <div>
                  <h2 className="text-sm font-semibold mb-2" style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: '2px' }}>
                    EXPERIENCE
                  </h2>
                  {structure.experience.slice(0, 2).map((exp, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold text-xs">{exp.jobTitle}</h3>
                          <p className="text-xs text-gray-600">{exp.company}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <div className="text-xs text-gray-700">
                        {exp.description.split('\n').slice(0, 2).map((line, i) => (
                          <p key={i} className="mb-1">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Single Column Layout */
            <div className="space-y-4">
              <div className="text-center border-b pb-3" style={{ borderColor: primaryColor }}>
                {photo === 'with' && (
                  <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                )}
                <h1 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                  {structure.personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {structure.personalInfo.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {structure.personalInfo.phone}
                  </div>
                  {structure.personalInfo.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {structure.personalInfo.location}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold mb-2" style={{ color: primaryColor }}>
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">{structure.summary}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold mb-2" style={{ color: primaryColor }}>
                  EXPERIENCE
                </h2>
                {structure.experience.slice(0, 1).map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-xs">{exp.jobTitle}</h3>
                        <p className="text-xs text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-sm font-semibold mb-2" style={{ color: primaryColor }}>
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-1">
                  {structure.skills.slice(0, 6).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Mini preview for template selection
  return (
    <div className="aspect-[1.4/1] bg-white rounded-lg shadow-lg p-3 relative overflow-hidden">
      <div className="h-2 rounded mb-2" style={{ backgroundColor: primaryColor }}></div>
      <div className="space-y-1 mb-3">
        <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-1 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="space-y-1">
        <div className="h-1 bg-gray-100 rounded"></div>
        <div className="h-1 bg-gray-100 rounded w-5/6"></div>
        <div className="h-1 bg-gray-100 rounded w-4/5"></div>
      </div>
      
      {photo === 'with' && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-500" />
        </div>
      )}
      
      {layout === '2-column' && (
        <div className="absolute left-0 top-0 bottom-0 w-1/3" style={{ backgroundColor: `${primaryColor}10` }}></div>
      )}
    </div>
  );
};

export default TemplatePreview;
