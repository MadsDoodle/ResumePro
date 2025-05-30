
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Download, 
  BookOpen, 
  Code, 
  Brain,
  Database,
  BarChart3,
  Shield,
  Users,
  Palette,
  Link as LinkIcon,
  Settings,
  PenTool,
  Filter,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tips');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [resourceDocs, setResourceDocs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    authorBio: '',
    tags: ''
  });

  const careerPaths = [
    {
      id: 'ml',
      title: 'Machine Learning',
      icon: Brain,
      description: 'Build intelligent systems that learn from data',
      skills: ['Python', 'TensorFlow', 'Statistics', 'Data Preprocessing'],
      salary: '$95,000 - $180,000',
      demand: 'Very High',
      resources: ['Coursera ML Course', 'Kaggle Competitions', 'Papers with Code']
    },
    {
      id: 'webdev',
      title: 'Web Development',
      icon: Code,
      description: 'Create dynamic websites and web applications',
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
      salary: '$70,000 - $140,000',
      demand: 'High',
      resources: ['MDN Web Docs', 'freeCodeCamp', 'The Odin Project']
    },
    {
      id: 'ai',
      title: 'AI Engineering',
      icon: Brain,
      description: 'Develop and deploy artificial intelligence solutions',
      skills: ['Python', 'Deep Learning', 'MLOps', 'Computer Vision'],
      salary: '$100,000 - $200,000',
      demand: 'Very High',
      resources: ['Fast.ai', 'CS231n Stanford', 'Hugging Face']
    },
    {
      id: 'datascience',
      title: 'Data Science',
      icon: BarChart3,
      description: 'Extract insights from complex datasets',
      skills: ['Python/R', 'SQL', 'Statistics', 'Machine Learning'],
      salary: '$85,000 - $160,000',
      demand: 'High',
      resources: ['Kaggle Learn', 'DataCamp', 'Towards Data Science']
    },
    {
      id: 'analytics',
      title: 'Data Analytics',
      icon: Database,
      description: 'Transform data into actionable business insights',
      skills: ['SQL', 'Excel', 'Tableau', 'Python'],
      salary: '$65,000 - $120,000',
      demand: 'High',
      resources: ['Google Analytics Academy', 'Tableau Public', 'SQL Zoo']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: Shield,
      description: 'Protect systems and data from digital threats',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance'],
      salary: '$80,000 - $150,000',
      demand: 'Very High',
      resources: ['Cybrary', 'OWASP', 'SANS Training']
    },
    {
      id: 'product',
      title: 'Product Management',
      icon: Users,
      description: 'Guide product development from conception to launch',
      skills: ['Market Research', 'Roadmapping', 'Agile', 'Analytics'],
      salary: '$90,000 - $170,000',
      demand: 'High',
      resources: ['Product School', 'Mind the Product', 'Lean Startup']
    },
    {
      id: 'ux',
      title: 'UX/UI Design',
      icon: Palette,
      description: 'Design intuitive and beautiful user experiences',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      salary: '$75,000 - $140,000',
      demand: 'High',
      resources: ['Figma Academy', 'NNG UX Training', 'Interaction Design Foundation']
    },
    {
      id: 'blockchain',
      title: 'Blockchain Dev',
      icon: LinkIcon,
      description: 'Build decentralized applications and smart contracts',
      skills: ['Solidity', 'Web3', 'Ethereum', 'Cryptography'],
      salary: '$90,000 - $180,000',
      demand: 'Medium',
      resources: ['CryptoZombies', 'Ethereum.org', 'Moralis Academy']
    },
    {
      id: 'devops',
      title: 'DevOps',
      icon: Settings,
      description: 'Bridge development and operations for efficient deployment',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
      salary: '$85,000 - $160,000',
      demand: 'Very High',
      resources: ['Docker Documentation', 'Kubernetes Academy', 'AWS Training']
    }
  ];

  const resumeTips = [
    {
      id: 1,
      category: 'ATS Optimization',
      title: 'Making Your Resume ATS-Friendly',
      description: 'Learn how to format your resume to pass through Applicant Tracking Systems',
      tips: [
        'Use standard section headings like "Work Experience" and "Education"',
        'Include relevant keywords from the job description',
        'Avoid complex formatting, tables, and graphics',
        'Use standard fonts like Arial, Calibri, or Times New Roman',
        'Save as both PDF and Word document formats'
      ]
    },
    {
      id: 2,
      category: 'Content Writing',
      title: 'Writing Compelling Bullet Points',
      description: 'Transform your job duties into achievement-focused statements',
      tips: [
        'Start with strong action verbs (managed, developed, implemented)',
        'Include quantifiable results and metrics whenever possible',
        'Focus on achievements rather than responsibilities',
        'Use the STAR method (Situation, Task, Action, Result)',
        'Tailor bullet points to match the target job requirements'
      ]
    },
    {
      id: 3,
      category: 'Industry-Specific',
      title: 'Technology Resume Best Practices',
      description: 'Special considerations for tech professionals',
      tips: [
        'Include a technical skills section with relevant technologies',
        'Showcase projects with links to GitHub or portfolio',
        'Highlight programming languages and frameworks',
        'Include relevant certifications and continuous learning',
        'Demonstrate problem-solving and analytical thinking'
      ]
    }
  ];

  useEffect(() => {
    fetchBlogPosts();
    fetchResourceDocs();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('publication_date', { ascending: false });
      
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchResourceDocs = async () => {
    try {
      const { data, error } = await supabase
        .from('resource_documents')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setResourceDocs(data || []);
    } catch (error) {
      console.error('Error fetching resource documents:', error);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to submit a blog post');
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          user_id: user.id,
          title: blogForm.title,
          content: blogForm.content,
          author_bio: blogForm.authorBio,
          tags: blogForm.tags.split(',').map(tag => tag.trim()),
          status: 'draft'
        }]);

      if (error) throw error;
      
      alert('Blog post submitted for review!');
      setBlogForm({ title: '', content: '', authorBio: '', tags: '' });
      fetchBlogPosts();
    } catch (error) {
      console.error('Error submitting blog post:', error);
      alert('Error submitting blog post. Please try again.');
    }
  };

  const filteredTips = resumeTips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xl font-bold text-white">ResumePro</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              <button onClick={() => navigate('/resources')} className="text-purple-400 font-medium">Resources</button>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                onClick={() => navigate('/auth')}
              >
                Sign in
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/auth')}
              >
                Start for free
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Career Resources Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to accelerate your career growth - from resume tips to career roadmaps.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-2 flex space-x-2">
              {[
                { id: 'tips', label: 'Resume Tips', icon: FileText },
                { id: 'careers', label: 'Career Paths', icon: Users },
                { id: 'blog', label: 'Blog', icon: PenTool }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === 'tips' && (
            <div className="max-w-6xl mx-auto">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search resume tips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Resume Tips */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredTips.map((tip) => (
                  <Card key={tip.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2 bg-purple-600/20 text-purple-400">
                        {tip.category}
                      </Badge>
                      <CardTitle className="text-white">{tip.title}</CardTitle>
                      <p className="text-gray-400">{tip.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tip.tips.slice(0, 3).map((point, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Downloadable Templates */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Downloadable Resources</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {resourceDocs.map((doc) => (
                    <Card key={doc.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Download className="h-5 w-5 mr-2 text-purple-400" />
                          {doc.file_name.replace('.pdf', '').replace(/_/g, ' ')}
                        </CardTitle>
                        <p className="text-gray-400">{doc.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Download PDF
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="max-w-7xl mx-auto">
              {selectedCareer ? (
                // Career Detail View
                <div>
                  <Button 
                    onClick={() => setSelectedCareer(null)}
                    variant="outline"
                    className="mb-6 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    ← Back to Career Paths
                  </Button>
                  
                  <Card className="bg-gray-800/50 border-purple-500/20 p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-4 bg-purple-600/20 rounded-lg mr-4">
                        <selectedCareer.icon className="h-8 w-8 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{selectedCareer.title}</h2>
                        <p className="text-gray-300 text-lg">{selectedCareer.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedCareer.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-400">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-4">Salary Range</h3>
                        <p className="text-green-400 text-lg font-medium mb-6">{selectedCareer.salary}</p>

                        <h3 className="text-xl font-semibold text-white mb-4">Market Demand</h3>
                        <Badge 
                          variant="secondary" 
                          className={`mb-6 ${
                            selectedCareer.demand === 'Very High' ? 'bg-green-600/20 text-green-400' :
                            selectedCareer.demand === 'High' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-blue-600/20 text-blue-400'
                          }`}
                        >
                          {selectedCareer.demand}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Learning Resources</h3>
                        <div className="space-y-3">
                          {selectedCareer.resources.map((resource, index) => (
                            <Card key={index} className="bg-gray-700/50 border-purple-500/20 p-4">
                              <p className="text-gray-300">{resource}</p>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                // Career Paths Grid
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Explore Career Paths</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {careerPaths.map((career) => (
                      <Card 
                        key={career.id}
                        className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl transform-gpu"
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'perspective(1000px) rotateY(5deg) scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
                        }}
                        onClick={() => setSelectedCareer(career)}
                      >
                        <CardHeader className="text-center">
                          <div className="mx-auto p-4 bg-purple-600/20 rounded-lg w-fit mb-4">
                            <career.icon className="h-8 w-8 text-purple-400" />
                          </div>
                          <CardTitle className="text-white">{career.title}</CardTitle>
                          <p className="text-gray-400 text-sm">{career.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Salary Range</p>
                              <p className="text-green-400 font-medium">{career.salary}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Market Demand</p>
                              <Badge 
                                variant="secondary" 
                                className={`${
                                  career.demand === 'Very High' ? 'bg-green-600/20 text-green-400' :
                                  career.demand === 'High' ? 'bg-yellow-600/20 text-yellow-400' :
                                  'bg-blue-600/20 text-blue-400'
                                }`}
                              >
                                {career.demand}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="max-w-6xl mx-auto">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Blog Submission Form */}
              {user && (
                <Card className="bg-gray-800/50 border-purple-500/20 p-6 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white">Submit a Blog Post</CardTitle>
                    <p className="text-gray-400">Share your knowledge with the community</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <Input
                        placeholder="Blog Title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                        required
                      />
                      <textarea
                        placeholder="Blog Content"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                        rows={6}
                        className="w-full p-3 bg-gray-700/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
                        required
                      />
                      <Input
                        placeholder="Author Bio"
                        value={blogForm.authorBio}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, authorBio: e.target.value }))}
                        className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                      <Input
                        placeholder="Tags (comma separated)"
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value }))}
                        className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                      />
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Submit for Review
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publication_date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      {post.author_bio && (
                        <p className="text-gray-400 text-sm flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author_bio}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {post.content.substring(0, 150)}...
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Button variant="outline" className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No blog posts found. Be the first to contribute!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-xl font-bold text-white">ResumePro</span>
              </div>
              <p className="text-gray-400">Building careers with AI-powered tools.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Resume Builder</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Resume Analyzer</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">AI Career Advisor</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">Resume Tips</a>
                <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">Career Paths</a>
                <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                <a href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-gray-500">© 2024 ResumePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
