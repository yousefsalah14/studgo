import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { axiosInstance } from '../../../lib/axios';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Users, Star, Award } from 'lucide-react';
import HeroSection from '../components/StudentActivity/HeroSection';
import StatsSection from '../components/StudentActivity/StatsSection';
import SearchAndFilterSection from '../components/StudentActivity/SearchAndFilterSection';
import OrganizationsGrid from '../components/StudentActivity/OrganizationsGrid';

function StudentActivityHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  // Fetch student activities using React Query with filtering and pagination
  const { data: organizationsData = { data: [], count: 0 }, isLoading, error } = useQuery(
    ["studentActivities", pageIndex, pageSize, searchQuery],
    async () => {
      const params = {
        PageIndex: pageIndex,
        PageSize: pageSize,
        StudentActivityName: searchQuery || null,
        StudentActivityId: null
      };
      const { data } = await axiosInstance().get("/sa/filter", { params });
      return data;
    },
    {
      keepPreviousData: true
    }
  );

  // Calculate total pages
  const totalPages = useMemo(() => 
    Math.ceil(organizationsData.count / pageSize),
    [organizationsData.count, pageSize]
  );

  // Filter organizations based on category
  const filteredOrganizations = useMemo(() => {
    if (selectedCategory === "all") {
      return organizationsData.data;
    }
    return organizationsData.data.filter(org => org.category === selectedCategory);
  }, [organizationsData.data, selectedCategory]);

  // Handle search with debounce
  const handleSearch = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPageIndex(0); // Reset to first page when searching
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((category) => {
    setSelectedCategory(category);
    setPageIndex(0); // Reset to first page when changing category
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    setPageIndex(newPage);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-16 w-16 border-t-2 border-b-2 border-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500"
        >
          Failed to load student activities. Please try again later.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto">
      <HeroSection />
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatsSection organizationsCount={organizationsData.count || 0} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-700">
            <SearchAndFilterSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              organizations={organizationsData.data || []}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleFilterChange}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <OrganizationsGrid filteredOrganizations={filteredOrganizations} />
        </motion.div>

        {filteredOrganizations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="inline-block p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <p className="text-gray-400 text-lg">No organizations found matching your search.</p>
            </div>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center items-center space-x-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                pageIndex === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">
                Page {pageIndex + 1} of {totalPages}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex >= totalPages - 1}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                pageIndex >= totalPages - 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StudentActivityHome; 