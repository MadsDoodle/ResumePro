
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Terminal, 
  PenTool, 
  Search, 
  Download, 
  TrendingUp,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareerPath, setSelectedCareerPath] = useState<number | null>(null);

  const resumeTips = [
    {
      title: 'ATS Optimization Tips',
      category: 'Technical',
      content: 'Learn how to make your resume ATS-friendly with proper formatting and keywords.',
      downloadable: true
    },
    {
      title: 'Industry-Specific Templates',
      category: 'Templates',
      content: 'Professional templates tailored for different industries and career levels.',
      downloadable: true
    },
    {
      title: 'Cover Letter Best Practices',
      category: 'Writing',
      content: 'Craft compelling cover letters that complement your resume perfectly.',
      downloadable: false
    },
    {
      title: 'Remote Work Resume Guide',
      category: 'Modern',
      content: 'Highlight remote work skills and experience in your resume.',
      downloadable: true
    }
  ];

  const careerPaths = [
    {
      title: 'Machine Learning Engineer',
      description: 'Design and implement ML algorithms and systems',
      requiredSkills: ['Python', 'TensorFlow', 'Statistics', 'Data Analysis'],
      salaryRange: '$90k - $180k',
      demand: 'High',
      learningResources: ['Coursera ML Course', 'Kaggle Competitions', 'Papers With Code'],
      color: 'bg-purple-100 border-purple-300'
    },
    {
      title: 'Web Developer',
      description: 'Build responsive web applications and websites',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'CSS'],
      salaryRange: '$60k - $130k',
      demand: 'Very High',
      learningResources: ['FreeCodeCamp', 'MDN Web Docs', 'React Documentation'],
      color: 'bg-blue-100 border-blue-300'
    },
    {
      title: 'AI Engineer',
      description: 'Develop AI-powered applications and systems',
      requiredSkills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision'],
      salaryRange: '$100k - $200k',
      demand: 'Very High',
      learningResources: ['Fast.ai', 'OpenAI Documentation', 'Hugging Face'],
      color: 'bg-green-100 border-green-300'
    },
    {
      title: 'Data Scientist',
      description: 'Extract insights from complex datasets',
      requiredSkills: ['Python', 'SQL', 'Statistics', 'Visualization'],
      salaryRange: '$80k - $160k',
      demand: 'High',
      learningResources: ['Kaggle Learn', 'DataCamp', 'Towards Data Science'],
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      title: 'Data Analyst',
      description: 'Analyze data to support business decisions',
      requiredSkills: ['SQL', 'Excel', 'Tableau', 'Python'],
      salaryRange: '$50k - $90k',
      demand: 'High',
      learningResources: ['Google Analytics Academy', 'Tableau Public', 'SQL Tutorial'],
      color: 'bg-red-100 border-red-300'
    },
    {
      title: 'Cybersecurity Specialist',
      description: 'Protect systems and networks from threats',
      requiredSkills: ['Network Security', 'Penetration Testing', 'CISSP', 'Linux'],
      salaryRange: '$70k - $140k',
      demand: 'Very High',
      learningResources: ['SANS Training', 'Cybrary', 'OWASP'],
      color: 'bg-indigo-100 border-indigo-300'
    },
    {
      title: 'Product Manager',
      description: 'Guide product development from concept to launch',
      requiredSkills: ['Strategy', 'Analytics', 'Communication', 'Agile'],
      salaryRange: '$90k - $170k',
      demand: 'High',
      learningResources: ['Product School', 'Mind the Product', 'First Round Review'],
      color: 'bg-pink-100 border-pink-300'
    },
    {
      title: 'UX/UI Designer',
      description: 'Design user-friendly interfaces and experiences',
      requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      salaryRange: '$60k - $120k',
      demand: 'High',
      learningResources: ['Figma Academy', 'Nielsen Norman Group', 'Material Design'],
      color: 'bg-orange-100 border-orange-300'
    },
    {
      title: 'Blockchain Developer',
      description: 'Build decentralized applications and smart contracts',
      requiredSkills: ['Solidity', 'Web3', 'Ethereum', 'Cryptography'],
      salaryRange: '$80k - $160k',
      demand: 'Medium',
      learningResources: ['Ethereum.org', 'CryptoZombies', 'OpenZeppelin'],
      color: 'bg-teal-100 border-teal-300'
    },
    {
      title: 'DevOps Engineer',
      description: 'Streamline development and deployment processes',
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      salaryRange: '$80k - $150k',
      demand: 'Very High',
      learningResources: ['AWS Training', 'Docker Documentation', 'Kubernetes.io'],
      color: 'bg-gray-100 border-gray-300'
    }
  ];

  const filteredTips = resumeTips.filter(tip =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">AI Resume Pro</div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              <a href="/resources" className="text-blue-600 font-medium">Resources</a>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Resources Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to advance your career journey
          </p>
        </div>

        <Tabs defaultValue="resume-tips" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resume-tips" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Resume Tips</span>
            </TabsTrigger>
            <TabsTrigger value="career-paths" className="flex items-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span>Career Paths</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <PenTool className="w-4 h-4" />
              <span>Blog</span>
            </TabsTrigger>
          </TabsList>

          {/* Resume Tips Tab */}
          <TabsContent value="resume-tips" className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tips and templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <Badge variant="secondary">{tip.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{tip.content}</p>
                    {tip.downloadable && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Career Paths Tab */}
          <TabsContent value="career-paths" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((path, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${path.color} ${
                    selectedCareerPath === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCareerPath(selectedCareerPath === index ? null : index)}
                  style={{
                    transform: selectedCareerPath === index ? 'rotateY(5deg)' : 'rotateY(0deg)',
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <p className="text-sm text-gray-600">{path.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Salary
                        </span>
                        <span className="text-sm font-medium">{path.salaryRange}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Demand
                        </span>
                        <Badge className={getDemandColor(path.demand)}>
                          {path.demand}
                        </Badge>
                      </div>

                      {selectedCareerPath === index && (
                        <div className="mt-4 space-y-3 animate-fade-in">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Required Skills:</h4>
                            <div className="flex flex-wrap gap-1">
                              {path.requiredSkills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-2">Learning Resources:</h4>
                            <ul className="text-xs space-y-1">
                              {path.learningResources.map((resource, resourceIndex) => (
                                <li key={resourceIndex} className="text-blue-600">
                                  • {resource}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input placeholder="Enter blog post title..." />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <Input placeholder="career, tips, industry..." />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Author Bio</label>
                      <Input placeholder="Brief author description..." />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <textarea
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none"
                        placeholder="Write your blog post content here..."
                      />
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Submit for Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Blog Posts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">The Future of Remote Work</CardTitle>
                  <div className="flex space-x-2">
                    <Badge>Remote Work</Badge>
                    <Badge>Career Tips</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Explore how remote work is reshaping the job market and what skills you need...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By Sarah Johnson</span>
                    <span>5 min read</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI in Hiring: What Job Seekers Need to Know</CardTitle>
                  <div className="flex space-x-2">
                    <Badge>AI</Badge>
                    <Badge>Hiring</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Understanding how AI is changing the recruitment process and how to adapt...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By Michael Chen</span>
                    <span>7 min read</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourcesPage;
