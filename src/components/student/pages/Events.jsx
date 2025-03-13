import axios from 'axios';
import React, { useState, useEffect } from 'react';


const { data } = await axios.get(
          "https://studgov1.runasp.net/api/Events/all",
        );

function Events() {
  const [eventList, setEventList] = useState(data.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = eventList.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApply = (id) => {
    const eventToApply = eventList.find((event) => event.id === id);
    const conflict = appliedEvents.some(
      (appliedEvent) =>
        new Date(eventToApply.startDate) <= new Date(appliedEvent.endDate) &&
        new Date(eventToApply.endDate) >= new Date(appliedEvent.startDate)
    );

    if (conflict) {
      alert('There is a conflict with an already applied event.');
    } else {
      setAppliedEvents([...appliedEvents, eventToApply]);
      setEventList(eventList.map((event) => (event.id === id ? { ...event, applied: true } : event)));
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
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = [];

    for (let i = 1; i <= endDate.getDate(); i++) {
      daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          const dayEvents = appliedEvents.filter(
            (event) =>
              new Date(event.startDate) <= day && new Date(event.endDate) >= day
          );
          return (
            <div
              key={day}
              className="p-2 border border-gray-600 rounded-lg"
              style={{
                backgroundColor: dayEvents.length > 0 ? 'rgba(34, 197, 94, 0.5)' : '',
              }}
            >
              <div className="text-center">{day.getDate()}</div>
              {dayEvents.length > 0 && (
                <div className="text-xs text-white">
                  {dayEvents.map((event, index) => (
                    <p key={index}>{event.name}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-8 px-4">
      {/* Header Section */}
      <div className="text-center max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight">Upcoming Events </h1>
        <p className="mt-2 text-gray-400 text-sm">
          Explore events and workshops to expand your knowledge and skills!
        </p>
      </div>

      {/* Search & Category Filters */}
      <div className="w-full max-w-4xl px-6 flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Workshop">Workshop</option>
          <option value="Bootcamp">Bootcamp</option>
          <option value="Seminar">Seminar</option>
        </select>
      </div>

      {/* Calendar Navigation */}
      <div className="flex gap-4 mb-8">
        <button onClick={goToPreviousMonth} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Previous
        </button>
        <div className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={goToNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>

      {/* Calendar */}
      <div className="w-full max-w-4xl px-6 mb-8">{renderCalendar()}</div>

      {/* Events List */}
      <div className="w-full max-w-4xl px-6">
        <ul role="list" className="space-y-6">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4 sm:gap-y-0 py-6 px-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all ease-in-out transform hover:scale-105"
            >
              {/* Event Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-6">
                <div>
                  <p className="text-xl font-semibold">{event.name}</p>
                  <p className="text-sm text-gray-400 mt-2">{event.description}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    <span className="font-semibold">Date:</span> {event.startDate} - {event.endDate}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Location:</span> {event.city}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Location:</span> {event.governorate}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Address:</span> {event.address}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Seats:</span> {event.numberOfSeats}
                  </p>
                </div>
              </div>

              {/* Apply and Details Buttons */}
              <div className="mt-4 sm:mt-0 flex gap-4">
                {event.applied ? (
                  <button
                    disabled
                    className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(event.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
                <button
                  onClick={() => openEventDetails(event)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Event Details */}
      {showModal && currentEvent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{currentEvent.name}</h2>
            <p className="text-gray-300">{currentEvent.description}</p>
            <div className="mt-4">
              <p>
                <span className="font-semibold">Start Date:</span> {currentEvent.startDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {currentEvent.endDate}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {currentEvent.address}
              </p>
              <p>
                <span className="font-semibold">City:</span> {currentEvent.governorate}
              </p>
              <p>
                <span className="font-semibold">Seats:</span> {currentEvent.numberOfSeats}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
