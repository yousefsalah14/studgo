import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Import components
import HeroSection from '../components/Events/HeroSection';
import QuickStats from '../components/Events/QuickStats';
import SearchAndFilter from '../components/Events/SearchAndFilter';
import EventCard from '../components/Events/EventCard';
import EventDetailsModal from '../components/Events/EventDetailsModal';

function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [appliedEvents, setAppliedEvents] = useState([]);

  const { data: eventList = [], isLoading, error } = useQuery(
    'events',
    async () => {
      const { data } = await axios.get("https://studgov1.runasp.net/api/Events/all");
      return data.data;
    }
  );

  const filteredEvents = eventList.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const handleApply = (id) => {
    const eventToApply = eventList.find((event) => event.id === id);
    const conflict = appliedEvents.some(
      (appliedEvent) =>
        new Date(eventToApply.startDate) <= new Date(appliedEvent.endDate) &&
        new Date(eventToApply.endDate) >= new Date(appliedEvent.startDate)
    );

    if (conflict) {
      toast.error('There is a conflict with an already applied event.');
    } else {
      setAppliedEvents([...appliedEvents, eventToApply]);
      toast.success('Successfully applied to the event!');
    }
  };

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuickStats eventList={eventList} appliedEvents={appliedEvents} />
        
        <SearchAndFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={openEventDetails}
              onApply={handleApply}
              isApplied={appliedEvents.some(appliedEvent => appliedEvent.id === event.id)}
            />
          ))}
        </div>

        {showModal && (
          <EventDetailsModal
            event={currentEvent}
            onClose={closeModal}
            onApply={handleApply}
            isApplied={appliedEvents.some(appliedEvent => appliedEvent.id === currentEvent.id)}
          />
        )}
      </div>
    </div>
  );
}

export default Events;
