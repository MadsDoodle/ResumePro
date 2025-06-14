
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
      <Card className="bg-white text-black overflow-hidden border-2 border-gray-200 shadow-lg">
        <CardContent className={`p-8 ${layout === '2-column' ? 'grid grid-cols-3 gap-8' : 'space-y-8'}`}>
          {layout === '2-column' ? (
            <>
              {/* Left Column */}
              <div className="col-span-1 space-y-6 p-6 rounded-lg border-r-2 border-gray-100" style={{ backgroundColor: `${primaryColor}10` }}>
                <div>
                  {photo === 'with' && (
                    <div className="w-28 h-28 rounded-full bg-gray-300 mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="h-14 w-14 text-gray-500" />
                    </div>
                  )}
                  
                  <div className="text-center mb-6 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                      {structure.personalInfo.fullName}
                    </h1>
                    <div className="text-sm text-gray-600 space-y-2 mt-3">
                      <div className="flex items-center justify-center gap-2 p-1">
                        <Mail className="h-4 w-4" />
                        {structure.personalInfo.email}
                      </div>
                      <div className="flex items-center justify-center gap-2 p-1">
                        <Phone className="h-4 w-4" />
                        {structure.personalInfo.phone}
                      </div>
                      {structure.personalInfo.location && (
                        <div className="flex items-center justify-center gap-2 p-1">
                          <MapPin className="h-4 w-4" />
                          {structure.personalInfo.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-white/50">
                    <h3 className="font-semibold text-lg mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>SKILLS</h3>
                    <div className="space-y-2">
                      {structure.skills.slice(0, 4).map((skill, index) => (
                        <div key={index} className="text-sm text-gray-700 p-2 rounded border-l-4" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}05` }}>{skill}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-2 space-y-6 pl-2">
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/30">
                  <h2 className="text-lg font-semibold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed mt-3">{structure.summary}</p>
                </div>

                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/30">
                  <h2 className="text-lg font-semibold mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
                    EXPERIENCE
                  </h2>
                  {structure.experience.slice(0, 2).map((exp, index) => (
                    <div key={index} className="mb-4 p-3 rounded border-l-4 bg-white" style={{ borderColor: primaryColor }}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                          <p className="text-sm text-gray-600 mt-1">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 mt-3">
                        {exp.description.split('\n').slice(0, 2).map((line, i) => (
                          <p key={i} className="mb-2">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Single Column Layout */
            <div className="space-y-6">
              <div className="text-center pb-6 border-b-4 rounded-b-lg" style={{ borderColor: primaryColor, background: `linear-gradient(to bottom, ${primaryColor}05, transparent)` }}>
                {photo === 'with' && (
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                    <User className="h-12 w-12 text-gray-500" />
                  </div>
                )}
                <h1 className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>
                  {structure.personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white">
                    <Mail className="h-3 w-3" />
                    {structure.personalInfo.email}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white">
                    <Phone className="h-3 w-3" />
                    {structure.personalInfo.phone}
                  </div>
                  {structure.personalInfo.location && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white">
                      <MapPin className="h-3 w-3" />
                      {structure.personalInfo.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-lg border border-gray-200 bg-gray-50/30">
                <h2 className="text-lg font-semibold mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mt-3">{structure.summary}</p>
              </div>

              <div className="p-5 rounded-lg border border-gray-200 bg-gray-50/30">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  EXPERIENCE
                </h2>
                {structure.experience.slice(0, 1).map((exp, index) => (
                  <div key={index} className="mb-4 p-3 rounded border-l-4 bg-white" style={{ borderColor: primaryColor }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                        <p className="text-sm text-gray-600 mt-1">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-lg border border-gray-200 bg-gray-50/30">
                <h2 className="text-lg font-semibold mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {structure.skills.slice(0, 6).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 text-sm rounded-full border"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor, borderColor: primaryColor }}
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
    <div className="aspect-[1.4/1] bg-white rounded-lg shadow-lg p-4 relative overflow-hidden border-2 border-gray-200">
      <div className="h-3 rounded mb-3 shadow-sm" style={{ backgroundColor: primaryColor }}></div>
      <div className="space-y-2 mb-4">
        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
        <div className="h-1.5 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="space-y-1.5">
        <div className="h-1 bg-gray-100 rounded"></div>
        <div className="h-1 bg-gray-100 rounded w-5/6"></div>
        <div className="h-1 bg-gray-100 rounded w-4/5"></div>
      </div>
      
      {photo === 'with' && (
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white shadow-md">
          <User className="h-5 w-5 text-gray-500" />
        </div>
      )}
      
      {layout === '2-column' && (
        <div className="absolute left-0 top-0 bottom-0 w-1/3 rounded-l-lg border-r-2 border-gray-100" style={{ backgroundColor: `${primaryColor}10` }}></div>
      )}
    </div>
  );
};

export default TemplatePreview;
