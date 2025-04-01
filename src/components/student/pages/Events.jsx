import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Building2, 
  Search,
  ChevronRight,
  ChevronLeft,
  BadgeCheck,
  BadgeInfo,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as LocationIcon,
  Users as UsersIcon,
  Building2 as BuildingIcon,
  Star,
  Award,
  Trophy,
  Medal
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: eventList = [], isLoading, error } = useQuery(
    'events',
    async () => {
      const { data } = await axios.get("https://studgov1.runasp.net/api/Events/all");
      return data.data;
    }
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const dayEvents = eventList.filter(
              (event) =>
                new Date(event.startDate) <= day && new Date(event.endDate) >= day
            );
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toString()}
                className={`p-2 border border-gray-700 rounded-lg min-h-[100px] transition-colors
                  ${isCurrentMonth ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                  ${isCurrentDay ? 'border-blue-500' : ''}
                  hover:bg-gray-700/50`}
              >
                <div className={`text-center text-sm font-medium mb-1
                  ${isCurrentMonth ? 'text-gray-300' : 'text-gray-500'}
                  ${isCurrentDay ? 'text-blue-400' : ''}`}>
                  {format(day, 'd')}
                </div>
                {dayEvents.length > 0 && (
                  <div className="space-y-1">
                    {dayEvents.map((event, idx) => (
                      <div 
                        key={idx}
                        className="text-xs text-blue-400 bg-blue-500/10 rounded px-1 py-0.5 truncate cursor-pointer hover:bg-blue-500/20"
                        onClick={() => openEventDetails(event)}
                      >
                        {event.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
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
              Events & Activities
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover and participate in exciting student events
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{eventList.length}</h3>
                <p className="text-gray-400">Total Events</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{appliedEvents.length}</h3>
                <p className="text-gray-400">Applied Events</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {eventList.filter(event => new Date(event.startDate) > new Date()).length}
                </h3>
                <p className="text-gray-400">Upcoming Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="All">All Categories</option>
              <option value="Workshop">Workshop</option>
              <option value="Bootcamp">Bootcamp</option>
              <option value="Seminar">Seminar</option>
            </select>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-400">Event Calendar</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={goToPreviousMonth} 
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold text-gray-300">
                {format(currentDate, 'MMMM yyyy')}
              </span>
              <button 
                onClick={goToNextMonth} 
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          {renderCalendar()}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1">
                      {event.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CalendarIcon className="w-4 h-4 text-blue-400" />
                        <span>{format(new Date(event.startDate), "MMM d, yyyy")} - {format(new Date(event.endDate), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <LocationIcon className="w-4 h-4 text-blue-400" />
                        <span>{event.address}, {event.city}, {event.governorate}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <UsersIcon className="w-4 h-4 text-blue-400" />
                        <span>{event.numberOfSeats} seats available</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {event.applied ? (
                    <button
                      disabled
                      className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(event.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      Apply Now
                    </button>
                  )}
                  <button
                    onClick={() => openEventDetails(event)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Event Details */}
        {showModal && currentEvent && (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-white">{currentEvent.name}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Description</h3>
                  <p className="text-gray-300">{currentEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CalendarIcon className="w-5 h-5 text-blue-400" />
                      <span>Start: {format(new Date(currentEvent.startDate), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CalendarIcon className="w-5 h-5 text-blue-400" />
                      <span>End: {format(new Date(currentEvent.endDate), "MMM d, yyyy")}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <LocationIcon className="w-5 h-5 text-blue-400" />
                      <span>{currentEvent.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <BuildingIcon className="w-5 h-5 text-blue-400" />
                      <span>{currentEvent.city}, {currentEvent.governorate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <UsersIcon className="w-5 h-5 text-blue-400" />
                  <span>{currentEvent.numberOfSeats} seats available</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <BadgeInfo className="w-5 h-5 text-blue-400" />
                  <span>Category: {currentEvent.category}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
