import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { axiosInstance } from '../../../lib/axios';
import HeroSection from '../components/Workshops/HeroSection';
import SearchAndFilter from '../components/Workshops/SearchAndFilter';
import WorkshopCard from '../components/Workshops/WorkshopCard';

const Workshops = () => {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appliedWorkshops, setAppliedWorkshops] = useState([]);

  // Fetch workshops with filtering and pagination
  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const params = {
        Name: searchQuery,
        PageIndex: currentPage - 1,
        PageSize: 10,
        ActivityType: 'Workshop'
      };

      // Only add ActivityCategory if not 'All'
      if (selectedCategory !== 'All') {
        params.ActivityCategory = selectedCategory;
      }

      const response = await axiosInstance()({
        method: 'get',
        url: '/activity/filter',
        params
      });

      // Check if response exists and has data property
      if (!response || !response.data) {
        console.error('Invalid response format:', response);
        setError('Invalid response format from server');
        return;
      }

      // Handle the response data based on the exact API structure
      const workshopsData = response.data.data || [];
      const totalElements = response.data.count || 0;
      const totalPagesCount = Math.ceil(totalElements / 10) || 1;

      setWorkshops(workshopsData);
      setTotalPages(totalPagesCount);
    } catch (err) {
      console.error('Error fetching workshops:', err);
      setError(err.message || 'Failed to fetch workshops');
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    fetchWorkshops(); // Only fetch when search button is clicked
  };

  // Handle page change
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    fetchWorkshops();
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleApply = async (workshopId) => {
    try {
      await axiosInstance()({
        method: 'post',
        url: `/activity/${workshopId}/apply`
      });
      setAppliedWorkshops(prev => [...prev, workshopId]);
      alert('Successfully applied for the workshop!');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('You have already applied to this workshop.');
        return;
      }
      console.error('Error applying for workshop:', error);
      alert('Failed to apply for workshop. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Workshops</h2>
        </div>

        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSearch={handleSearch}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading workshops...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchWorkshops}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No workshops found.</p>
          </div>
        ) : (
          <>
            {/* List View */}
            <div className="space-y-6">
              {workshops.map((workshop) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onApply={handleApply}
                  isApplied={appliedWorkshops.includes(workshop.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Workshops;