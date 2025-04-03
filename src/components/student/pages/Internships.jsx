import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import InternshipModal from '../components/InternshipModal';

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);

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

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const searchMatch = searchQuery.toLowerCase() === '' || 
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()));

      const typeMatch = selectedFilter === 'all' || 
        (selectedFilter === 'remote' && internship.location.toLowerCase() === 'remote') ||
        (selectedFilter === 'full-time' && internship.type.toLowerCase() === 'full-time') ||
        (selectedFilter === 'part-time' && internship.type.toLowerCase() === 'part-time');

      return searchMatch && typeMatch;
    });
  }, [internships, searchQuery, selectedFilter]);

  const handleViewDetails = (internship) => {
    setCurrentInternship(internship);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentInternship(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2784&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Find Your Dream Internship
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover opportunities that match your skills and career goals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search internships..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="bg-gray-800 rounded-lg border border-gray-700 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-white"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filters.map(filter => (
                <option key={filter.id} value={filter.id}>{filter.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          Found {filteredInternships.length} internships
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onViewDetails={handleViewDetails}
            />
          ))}

          {/* No Results Message */}
          {filteredInternships.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No internships found matching your criteria.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <InternshipModal
          internship={currentInternship}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Internships; 