import React from 'react';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Presentation,
  Target,
  Award,
  Star,
  ChevronRight,
  Laptop,
  MessageSquare,
  User,
  GraduationCap
} from 'lucide-react';

const Workshops = () => {
  // Static data for workshops
  const workshops = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      instructor: "Ahmed Hassan",
      instructorTitle: "Senior Developer at Tech Corp",
      date: "2024-03-15",
      time: "10:00 AM - 2:00 PM",
      location: "Tech Hub, Cairo",
      capacity: 30,
      enrolled: 25,
      category: "Technical",
      level: "Intermediate",
      description: "A comprehensive workshop covering modern web development practices, including React, Node.js, and database design.",
      topics: ["React Fundamentals", "Node.js Basics", "Database Design", "API Development"],
      requirements: ["Basic JavaScript knowledge", "Laptop with Node.js installed"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    },
    {
      id: 2,
      title: "UI/UX Design Workshop",
      instructor: "Sarah Ahmed",
      instructorTitle: "UX Lead at Design Studio",
      date: "2024-03-20",
      time: "1:00 PM - 5:00 PM",
      location: "Design Center, Alexandria",
      capacity: 25,
      enrolled: 20,
      category: "Design",
      level: "Beginner",
      description: "Learn the fundamentals of user interface and user experience design, including wireframing and prototyping.",
      topics: ["Design Principles", "User Research", "Wireframing", "Prototyping"],
      requirements: ["No prior experience needed", "Figma account"],
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd"
    }
  ];

  // Static data for talks
  const talks = [
    {
      id: 1,
      title: "Future of AI in Education",
      speaker: "Dr. Mohamed Kamal",
      speakerTitle: "AI Research Lead at Tech University",
      date: "2024-03-18",
      time: "11:00 AM - 12:30 PM",
      location: "Main Auditorium, Cairo University",
      capacity: 200,
      registered: 150,
      category: "Technology",
      description: "An insightful talk about how artificial intelligence is transforming education and what the future holds.",
      topics: ["AI in Education", "Machine Learning Applications", "Future Trends"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    },
    {
      id: 2,
      title: "Entrepreneurship Journey",
      speaker: "Laila Ibrahim",
      speakerTitle: "Founder & CEO of StartTech",
      date: "2024-03-25",
      time: "2:00 PM - 3:30 PM",
      location: "Innovation Hub, Smart Village",
      capacity: 150,
      registered: 120,
      category: "Business",
      description: "Learn from a successful entrepreneur about the challenges and opportunities in starting your own tech company.",
      topics: ["Starting a Business", "Fundraising", "Team Building", "Growth Strategies"],
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Workshops & Talks
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enhance your skills and knowledge through our interactive workshops and inspiring talks
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workshops Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Laptop className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Technical Workshops</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <div 
                key={workshop.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="h-48 relative">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {workshop.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{workshop.title}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{workshop.instructor}</span>
                      </div>
                      <div className="text-xs text-gray-500">{workshop.instructorTitle}</div>
                    </div>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      {workshop.level}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-2">{workshop.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{workshop.enrolled}/{workshop.capacity} enrolled</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workshop.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2">
                      Register Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Talks Section */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Featured Talks</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {talks.map((talk) => (
              <div 
                key={talk.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="h-48 relative">
                  <img 
                    src={talk.image} 
                    alt={talk.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {talk.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{talk.title}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-sm">{talk.speaker}</span>
                      </div>
                      <div className="text-xs text-gray-500">{talk.speakerTitle}</div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-2">{talk.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{talk.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{talk.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{talk.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{talk.registered}/{talk.capacity} registered</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {talk.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2">
                      Reserve Seat
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;