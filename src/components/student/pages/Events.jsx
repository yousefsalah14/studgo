import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AlertCircle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../../lib/axios';

// Import components
import HeroSection from '../components/Events/HeroSection';
import QuickStats from '../components/Events/QuickStats';
import SearchAndFilter from '../components/Events/SearchAndFilter';
import EventCard from '../components/Events/EventCard';
import EventDetailsModal from '../components/Events/EventDetailsModal';

function Events() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [appliedEventIds, setAppliedEventIds] = useState([]);
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

  // Fetch events data with filtering
  const { data: eventsData = { data: [], count: 0 }, isLoading: eventsLoading, error } = useQuery(
    ['events', searchQuery, selectedCategory, pageIndex],
    async () => {
      const { data } = await axiosInstance().get("/activity/filter", {
        params: {
          Name: searchQuery,
          ActivityType: "Event",
          PageIndex: pageIndex,
          PageSize: pageSize,
          // Only include category filter if not "All"
          ...(selectedCategory !== 'All' && { ActivityCategory: selectedCategory })
        }
      });
      return data;
    },
    {
      keepPreviousData: true,
    }
  );

  // Check applied status for each event
  const checkAppliedStatus = async (eventId) => {
    try {
      console.log(`Checking applied status for event ${eventId}...`);
      const response = await axiosInstance().get("/activity/student/applied", {
        params: { activityId: eventId }
      });
      
      console.log(`Response for event ${eventId}:`, response.data);
      
      // If the API call was successful (status 200), it means the user has applied
      // The API returns a 200 status code when the user has applied to the event
      return true;
    } catch (error) {
      // If the API returns a 404, it means the user has not applied
      if (error.response && error.response.status === 404) {
        console.log(`User has not applied to event ${eventId}`);
        return false;
      }
      
      console.error(`Error checking applied status for event ${eventId}:`, error);
      return false;
    }
  };

  // Update applied status for all events when events data changes
  useEffect(() => {
    const updateAppliedStatus = async () => {
      if (!eventsData.data || eventsData.data.length === 0) return;
      
      // Only check if user is logged in
      if (!localStorage.getItem('accessToken')) {
        console.log('User not logged in, skipping applied status check');
        setAppliedEventIds([]);
        return;
      }
      
      console.log('Checking applied status for all events...');
      const appliedIds = [];
      
      // Check each event's applied status
      for (const event of eventsData.data) {
        const isApplied = await checkAppliedStatus(event.id);
        if (isApplied) {
          console.log(`User has applied to event ${event.id}`);
          appliedIds.push(event.id);
        }
      }
      
      console.log('Applied event IDs:', appliedIds);
      setAppliedEventIds(appliedIds);
    };
    
    updateAppliedStatus();
  }, [eventsData.data]);

  const isLoading = statesLoading || eventsLoading;

  const filteredEvents = eventsData.data;

  // Calculate total pages using the count from API
  const totalPages = Math.ceil(eventsData.count / pageSize);

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

  const handleApply = async (id) => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('You need to be logged in to apply for events.');
        return;
      }
      
      // Call the apply endpoint with the event ID
      await axiosInstance().post(`/activity/${id}/apply`);
      
      // Add the event ID to appliedEventIds
      setAppliedEventIds([...appliedEventIds, id]);
      
      toast.success('Successfully applied to the event!');
    } catch (error) {
      console.error('Error applying to event:', error);
      
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
          toast.error('Failed to apply to the event. Please check your input and try again.');
        }
      } else if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        toast.error('You need to be logged in to apply for events.');
      } else {
        // Generic error for other status codes
        toast.error('Failed to apply to the event. Please try again later.');
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
          Failed to load events. Please try again later.
        </div>
      </div>
    );
  }

  const openEventDetails = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <QuickStats 
          totalEvents={statesData?.totalEvents || 0} 
          appliedEvents={statesData?.appliedEvents || 0}
          upcomingEvents={statesData?.upcomingEvents || 0}
        />
        
        <SearchAndFilter
          searchInput={searchInput}
          setSearchInput={handleSearchInputChange}
          handleSearchSubmit={handleSearchSubmit}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />

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

export default Events; 