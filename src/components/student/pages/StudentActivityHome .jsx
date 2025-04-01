/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { User, Mail, Building2, Activity, Calendar, Users, MapPin, Globe, Phone, Award, Clock, BookOpen, Target, Trophy, Star, Heart, TrendingUp } from "lucide-react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

function StudentActivityHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch student activities using React Query
  const { data: organizations = [], isLoading, error } = useQuery(
    "studentActivities",
    async () => {
      const { data } = await axios.get("https://studgov1.runasp.net/api/StudentActivity/all");
      return data.data || [];
    }
  );

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(
        (org) =>
          org.name?.toLowerCase().includes(query) ||
          org.contactEmail?.toLowerCase().includes(query) ||
          org.role?.toLowerCase().includes(query) ||
          org.description?.toLowerCase().includes(query)
      );
      setFilteredOrganizations(filtered);
    }
  };

  // Update filtered organizations when organizations data changes
  useEffect(() => {
    setFilteredOrganizations(organizations);
  }, [organizations]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500">
          Failed to load student activities. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-800"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Student Activities Hub
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover, Connect, and Thrive in Student Organizations
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Join Now
              </button>
              <button className="px-8 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-6 space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{organizations.length}</h3>
                <p className="text-gray-400">Active Organizations</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">500+</h3>
                <p className="text-gray-400">Active Members</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">100+</h3>
                <p className="text-gray-400">Monthly Activities</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {searchQuery ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredOrganizations(organizations);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              ) : (
                <FiSearch className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            {["CS", "academic", "Engineering", "Business", "social"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/studentactivity/${org.id}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300">
                  <div className="p-4">
                    {/* Header with Image/Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500/20">
                        {org.pictureUrl == null ? (
                          <img
                            src={org.pictureUrl}
                            alt={org.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">{org.name}</h2>
                        <p className="text-sm text-gray-400">{org.role}</p>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="truncate">{org.contactEmail || 'No email provided'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>Founded: {new Date(org.foundingDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="truncate">{org.description || 'No description available'}</span>
                      </div>
                    </div>

                    {/* Tags if available */}
                    {org.tags && org.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {org.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {org.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                            +{org.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Organization Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{org.memberCount || '0'} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>{org.activityCount || '0'} activities</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{org.rating || '0'} rating</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <button className="w-full bg-blue-600/80 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredOrganizations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No organizations found matching your search.</p>
          </div>
        )}

        {/* Featured Organizations Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
            <TrendingUp className="w-6 h-6" />
            Featured Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.slice(0, 3).map((org, index) => (
              <motion.div
                key={org.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500/20">
                    {org.pictureUrl == null ? (
                      <img
                        src={org.pictureUrl}
                        alt={org.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{org.name}</h3>
                    <p className="text-sm text-gray-400">{org.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {org.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">4.8</span>
                  </div>
                  <Link to={`/studentactivity/${org.id}`}>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      Learn More →
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentActivityHome;