import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../../lib/axios';

// Import components
import HeroSection from '../components/Activities/HeroSection';
import QuickStats from '../components/Activities/QuickStats';
import SearchAndFilter from '../components/Activities/SearchAndFilter';
import ActivityCard from '../components/Activities/ActivityCard';

function Activities() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedActivityType, setSelectedActivityType] = useState('All');
  const [appliedActivityIds, setAppliedActivityIds] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  // Fetch states data
  const { data: statesData, isLoading: statesLoading } = useQuery(
    'states',
    async () => {
      const { data } = await axiosInstance().get("/State/GetStates");
      return data.data;
    }
  );

  // Fetch activities data with filtering
  const { data: activitiesData = { data: [], count: 0 }, isLoading: activitiesLoading, error } = useQuery(
    ['activities', searchQuery, selectedCategory, selectedActivityType, pageIndex],
    async () => {
      const { data } = await axiosInstance().get("/activity/filter", {
        params: {
          Name: searchQuery,
          PageIndex: pageIndex,
          PageSize: pageSize,
          // Only include category filter if not "All"
          ...(selectedCategory !== 'All' && { ActivityCategory: selectedCategory }),
          // Only include activity type filter if not "All"
          ...(selectedActivityType !== 'All' && { ActivityType: selectedActivityType })
        }
      });
      return data;
    },
    {
      keepPreviousData: true,
    }
  );

  // Check applied status for each activity
  const checkAppliedStatus = async (activityId) => {
    try {
      const response = await axiosInstance().get("/activity/student/applied", {
        params: { activityId: activityId }
      });
      
      // If the API call was successful (status 200), it means the user has applied
      // The API returns a 200 status code when the user has applied to the activity
      return true;
    } catch (error) {
      // If the API returns a 404, it means the user has not applied
      if (error.response && error.response.status === 404) {
        return false;
      }
      
      return false;
    }
  };

  // Update applied status for all activities when activities data changes
  useEffect(() => {
    const updateAppliedStatus = async () => {
      if (!activitiesData.data || activitiesData.data.length === 0) return;
      
      // Only check if user is logged in
      if (!localStorage.getItem('accessToken')) {
        setAppliedActivityIds([]);
        return;
      }
      
      const appliedIds = [];
      
      // Check each activity's applied status
      for (const activity of activitiesData.data) {
        const isApplied = await checkAppliedStatus(activity.id);
        if (isApplied) {
          appliedIds.push(activity.id);
        }
      }
      
      setAppliedActivityIds(appliedIds);
    };
    
    updateAppliedStatus();
  }, [activitiesData.data]);

  const isLoading = statesLoading || activitiesLoading;

  const filteredActivities = activitiesData.data;

  // Calculate total pages using the count from API
  const totalPages = Math.ceil(activitiesData.count / pageSize);

  // Handle page navigation
  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  // Handle search and filter changes
  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setPageIndex(0);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    // Reset to first page when category changes
    setPageIndex(0);
  };

  const handleActivityTypeChange = (value) => {
    setSelectedActivityType(value);
    // Reset to first page when activity type changes
    setPageIndex(0);
  };

  const handleApply = async (id) => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('You need to be logged in to apply for activities.');
        return;
      }
      
      // Call the apply endpoint with the activity ID
      await axiosInstance().post(`/activity/${id}/apply`);
      
      // Add the activity ID to appliedActivityIds
      setAppliedActivityIds([...appliedActivityIds, id]);
      
      toast.success('Successfully applied to the activity!');
    } catch (error) {
      console.error('Error applying to activity:', error);
      
      // Handle 400 Bad Request errors
      if (error.response && error.response.status === 400) {
        // Check if there are validation errors in the response
        if (error.response.data && error.response.data.errors) {
          // Display each validation error message
          const errorMessages = error.response.data.errors;
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach(message => {
              toast.error(message);
            });
          } else if (typeof errorMessages === 'object') {
            // If errors is an object with field names as keys
            Object.values(errorMessages).forEach(messages => {
              if (Array.isArray(messages)) {
                messages.forEach(message => toast.error(message));
              } else {
                toast.error(messages);
              }
            });
          } else {
            // If errors is a single string
            toast.error(errorMessages);
          }
        } else if (error.response.data && error.response.data.message) {
          // If there's a single error message
          toast.error(error.response.data.message);
        } else {
          toast.error('Failed to apply to the activity. Please check your input and try again.');
        }
      } else if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        toast.error('You need to be logged in to apply for activities.');
      } else {
        // Generic error for other status codes
        toast.error('Failed to apply to the activity. Please try again later.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Failed to load activities. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuickStats 
          totalActivities={statesData?.totalActivities || 0} 
          appliedActivities={(statesData?.appliedEvents || 0) + (statesData?.appliedWorkshops || 0)}
          upcomingActivities={statesData?.upcomingActivities || 0}
        />
        
        <SearchAndFilter 
          searchQuery={searchInput}
          setSearchQuery={handleSearchInputChange}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          selectedActivityType={selectedActivityType}
          setSelectedActivityType={handleActivityTypeChange}
          onSearch={handleSearchSubmit}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isApplied={appliedActivityIds.includes(activity.id)}
              onApply={() => handleApply(activity.id)}
            />
          ))}
        </div>

        {/* Pagination - Always visible */}
        <div className="flex justify-center items-center gap-4 mt-8 p-4 bg-gray-800 rounded-lg">
          <button
            onClick={handlePrevPage}
            disabled={pageIndex === 0}
            className={`p-3 rounded-lg flex items-center gap-2 ${
              pageIndex === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <span className="text-white px-4 py-2 bg-gray-700 rounded-lg">
            Page {pageIndex + 1} of {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pageIndex >= (totalPages - 1)}
            className={`p-3 rounded-lg flex items-center gap-2 ${
              pageIndex >= (totalPages - 1)
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Activities; 