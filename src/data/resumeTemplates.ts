
export interface ResumeTemplate {
  id: string;
  name: string;
  layout: '1-column' | '2-column';
  photo: 'with' | 'without';
  style: 'modern' | 'classic' | 'creative';
  primaryColor: string;
  secondaryColor: string;
  isRecommended: boolean;
  structure: {
    personalInfo: any;
    summary: string;
    experience: any[];
    education: any[];
    skills: string[];
    additionalSections: {};
  };
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-blue',
    name: 'Modern Professional',
    layout: '2-column',
    photo: 'without',
    style: 'modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    isRecommended: true,
    structure: {
      personalInfo: {
        fullName: 'Your Name',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State',
        linkedin: 'linkedin.com/in/yourname',
        website: 'yourwebsite.com'
      },
      summary: 'Results-driven professional with [X] years of experience in [Your Field]. Proven track record of [Key Achievement]. Seeking to leverage expertise in [Skills] to drive growth and innovation.',
      experience: [
        {
          jobTitle: 'Senior Position Title',
          company: 'Company Name',
          location: 'City, State',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: '• Led cross-functional teams to achieve 25% increase in productivity\n• Implemented new processes resulting in $500K annual savings\n• Managed budget of $2M+ and delivered projects on time'
        },
        {
          jobTitle: 'Previous Position',
          company: 'Previous Company',
          location: 'City, State',
          startDate: '2020',
          endDate: '2022',
          current: false,
          description: '• Developed and executed strategic initiatives\n• Collaborated with stakeholders to improve efficiency\n• Achieved 95% customer satisfaction rating'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Your Field',
          institution: 'University Name',
          location: 'City, State',
          graduationDate: '2020',
          gpa: '3.8'
        }
      ],
      skills: ['Project Management', 'Data Analysis', 'Leadership', 'Strategic Planning', 'Team Building', 'Process Improvement'],
      additionalSections: {}
    }
  },
  {
    id: 'classic-navy',
    name: 'Classic Executive',
    layout: '1-column',
    photo: 'with',
    style: 'classic',
    primaryColor: '#1E3A8A',
    secondaryColor: '#3730A3',
    isRecommended: false,
    structure: {
      personalInfo: {
        fullName: 'Your Name',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State',
        linkedin: 'linkedin.com/in/yourname'
      },
      summary: 'Accomplished executive with extensive experience in [Industry]. Demonstrated success in leading high-performing teams and driving organizational growth. Strong background in strategic planning and operational excellence.',
      experience: [
        {
          jobTitle: 'Executive Director',
          company: 'Corporation Name',
          location: 'City, State',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: '• Oversee operations for $10M+ business unit\n• Develop and implement strategic business plans\n• Lead team of 50+ professionals across multiple departments'
        }
      ],
      education: [
        {
          degree: 'Master of Business Administration',
          institution: 'Business School',
          location: 'City, State',
          graduationDate: '2018'
        }
      ],
      skills: ['Executive Leadership', 'Strategic Planning', 'Financial Management', 'Business Development', 'Change Management'],
      additionalSections: {}
    }
  },
  {
    id: 'creative-purple',
    name: 'Creative Designer',
    layout: '2-column',
    photo: 'with',
    style: 'creative',
    primaryColor: '#8B5CF6',
    secondaryColor: '#7C3AED',
    isRecommended: true,
    structure: {
      personalInfo: {
        fullName: 'Your Name',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State',
        website: 'yourportfolio.com',
        linkedin: 'linkedin.com/in/yourname'
      },
      summary: 'Creative professional with a passion for innovative design and user experience. Skilled in visual storytelling and brand development. Experienced in leading creative projects from concept to completion.',
      experience: [
        {
          jobTitle: 'Senior Creative Director',
          company: 'Design Agency',
          location: 'City, State',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: '• Lead creative team of 8 designers and developers\n• Increased client satisfaction by 40% through innovative design solutions\n• Managed creative projects worth $2M+ annually'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Fine Arts in Graphic Design',
          institution: 'Art Institute',
          location: 'City, State',
          graduationDate: '2019'
        }
      ],
      skills: ['Adobe Creative Suite', 'UI/UX Design', 'Brand Development', 'Creative Direction', 'Team Leadership', 'Client Relations'],
      additionalSections: {}
    }
  },
  {
    id: 'minimal-green',
    name: 'Minimal Clean',
    layout: '1-column',
    photo: 'without',
    style: 'modern',
    primaryColor: '#10B981',
    secondaryColor: '#047857',
    isRecommended: false,
    structure: {
      personalInfo: {
        fullName: 'Your Name',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State'
      },
      summary: 'Detail-oriented professional focused on delivering high-quality results. Strong analytical skills and commitment to continuous improvement. Seeking opportunities to contribute to organizational success.',
      experience: [
        {
          jobTitle: 'Analyst',
          company: 'Tech Company',
          location: 'City, State',
          startDate: '2023',
          endDate: 'Present',
          current: true,
          description: '• Analyze complex data sets to identify trends and insights\n• Create detailed reports for executive leadership\n• Collaborate with cross-functional teams'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Analytics',
          institution: 'University',
          location: 'City, State',
          graduationDate: '2023'
        }
      ],
      skills: ['Data Analysis', 'Excel', 'SQL', 'Python', 'Tableau', 'Problem Solving'],
      additionalSections: {}
    }
  },
  {
    id: 'bold-orange',
    name: 'Bold Creative',
    layout: '2-column',
    photo: 'without',
    style: 'creative',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    isRecommended: false,
    structure: {
      personalInfo: {
        fullName: 'Your Name',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State',
        website: 'yourwork.com'
      },
      summary: 'Bold and innovative professional with expertise in creative problem-solving. Passionate about pushing boundaries and delivering impactful results. Strong collaborator with excellent communication skills.',
      experience: [
        {
          jobTitle: 'Innovation Specialist',
          company: 'Creative Corp',
          location: 'City, State',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: '• Develop innovative solutions for complex business challenges\n• Lead ideation sessions and creative workshops\n• Collaborate with diverse teams to drive innovation'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Arts in Innovation Studies',
          institution: 'Innovation University',
          location: 'City, State',
          graduationDate: '2021'
        }
      ],
      skills: ['Creative Thinking', 'Innovation', 'Workshop Facilitation', 'Collaboration', 'Problem Solving', 'Design Thinking'],
      additionalSections: {}
    }
  },
  {
    id: 'traditional-gray',
    name: 'Traditional Format',
    layout: '1-column',
    photo: 'without',
    style: 'classic',
    primaryColor: '#6B7280',
    secondaryColor: '#4B5563',
    isRecommended: false,
    structure: {
      personalInfo: {
        fullName: 'Your Name',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State'
      },
      summary: 'Experienced professional with a strong foundation in [Your Field]. Committed to excellence and continuous learning. Proven ability to work effectively in team environments.',
      experience: [
        {
          jobTitle: 'Professional Role',
          company: 'Established Company',
          location: 'City, State',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: '• Perform essential duties with high accuracy and efficiency\n• Maintain professional relationships with clients and colleagues\n• Contribute to team goals and objectives'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Arts',
          institution: 'University',
          location: 'City, State',
          graduationDate: '2020'
        }
      ],
      skills: ['Communication', 'Organization', 'Time Management', 'Attention to Detail', 'Teamwork', 'Reliability'],
      additionalSections: {}
    }
  }
];
