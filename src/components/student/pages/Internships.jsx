import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  Search, 
  Filter,
  Bookmark,
  ExternalLink
} from 'lucide-react';

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const internships = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      logo: "https://via.placeholder.com/50",
      title: "Software Development Intern",
      location: "San Francisco, CA",
      type: "Full-time",
      duration: "3 months",
      stipend: "$25/hour",
      requirements: ["React", "Node.js", "MongoDB"],
      description: "Join our dynamic team of developers working on cutting-edge web applications. Gain hands-on experience with modern tech stack and agile methodologies.",
      postedDate: "2 days ago",
      deadline: "2024-04-15",
      status: "Open"
    },
    {
      id: 2,
      company: "Data Analytics Co.",
      logo: "https://via.placeholder.com/50",
      title: "Data Science Intern",
      location: "Remote",
      type: "Part-time",
      duration: "6 months",
      stipend: "$30/hour",
      requirements: ["Python", "Machine Learning", "SQL"],
      description: "Work on real-world data analysis projects. Help develop predictive models and data visualization tools for business insights.",
      postedDate: "1 week ago",
      deadline: "2024-04-20",
      status: "Open"
    },
    {
      id: 3,
      company: "AI Research Lab",
      logo: "https://via.placeholder.com/50",
      title: "AI Research Intern",
      location: "New York, NY",
      type: "Full-time",
      duration: "4 months",
      stipend: "$35/hour",
      requirements: ["TensorFlow", "PyTorch", "Computer Vision"],
      description: "Contribute to groundbreaking AI research projects. Work with leading experts in machine learning and artificial intelligence.",
      postedDate: "3 days ago",
      deadline: "2024-04-10",
      status: "Open"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Internships' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'remote', label: 'Remote' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Internship</h1>
            <p className="text-lg text-gray-200">Discover opportunities that match your skills and career goals</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search internships..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="bg-gray-800 rounded-lg border border-gray-700 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filters.map(filter => (
                <option key={filter.id} value={filter.id}>{filter.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div key={internship.id} className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={internship.logo} alt={internship.company} className="w-12 h-12 rounded-lg" />
                <div>
                  <h3 className="font-semibold text-lg">{internship.company}</h3>
                  <p className="text-gray-400">{internship.title}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{internship.type} • {internship.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span>{internship.stipend}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {internship.requirements.map((req, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{internship.description}</p>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Posted {internship.postedDate}
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships; 