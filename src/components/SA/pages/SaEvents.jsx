import { useState } from "react";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import EventHeader from "../components/EventHeader";
import { X } from "lucide-react";

// Static data for events
const initialEvents = [
  {
    id: 2,
    title: "Node.js Bootcamp",
    description: "Deep dive into backend development with Node.js.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
    date: "2023-12-20",
    time: "2:00 PM",
    location: "Conference Hall A",
    capacity: 50,
    registered: 28,
    type: "bootcamp",
    registrations: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "approved" },
      { id: 2, name: "Bob Wilson", email: "bob@example.com", status: "approved" }
    ]
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications with React Native.",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
    date: "2024-01-10",
    time: "1:00 PM",
    location: "Mobile Lab",
    capacity: 35,
    registered: 22,
    type: "bootcamp",
    registrations: [
      { id: 1, name: "Charlie Brown", email: "charlie@example.com", status: "approved" },
      { id: 2, name: "Diana Ross", email: "diana@example.com", status: "pending" }
    ]
  }
];

function SaEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
    date: "",
    time: "",
    location: "",
    capacity: 0,
    registered: 0,
    type: "bootcamp",
    registrations: []
  });

  // Filter events based on search term and type
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || event.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description) {
      const eventToAdd = {
        ...newEvent,
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        registrations: []
      };
      setEvents([...events, eventToAdd]);
      setShowAddModal(false);
      setNewEvent({
        title: "",
        description: "",
        image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
        date: "",
        time: "",
        location: "",
        capacity: 0,
        registered: 0,
        type: "bootcamp",
        registrations: []
      });
    }
  };

  // Handle updating an event
  const handleUpdateEvent = () => {
    if (currentEvent) {
      setEvents(events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      ));
      setShowEditModal(false);
      setCurrentEvent(null);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  // Handle managing registrations
  const handleManageRegistrations = (event) => {
    setSelectedEvent(event);
    setShowRegistrationsModal(true);
  };

  // Handle registration status update
  const handleRegistrationStatusUpdate = (eventId, registrationId, newStatus) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const updatedRegistrations = event.registrations.map(reg => 
          reg.id === registrationId ? { ...reg, status: newStatus } : reg
        );
        return {
          ...event,
          registrations: updatedRegistrations,
          registered: updatedRegistrations.filter(reg => reg.status === "approved").length
        };
      }
      return event;
    }));
  };

  // Open edit modal with event data
  const openEditModal = (event) => {
    setCurrentEvent({...event});
    setShowEditModal(true);
  };

  // Handle input changes for new event
  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Handle input changes for editing event
  const handleEditEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value
    });
  };

  return (
    <div className="text-white p-4 rounded-md flex-1 m-4 mt-0">
      <EventHeader 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange}
        onAddEvent={() => setShowAddModal(true)}
        onFilterChange={handleFilterChange}
        filterType={filterType}
        onManageRegistrations={handleManageRegistrations}
        selectedEvent={selectedEvent}
      />

      {filteredEvents.length === 0 ? (
        <div className="text-center mt-8 text-gray-400">
          <p>No events found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={openEditModal}
              onDelete={handleDeleteEvent}
              onManageRegistrations={() => handleManageRegistrations(event)}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <EventForm
          title="Add New Event"
          event={newEvent}
          onChange={handleNewEventChange}
          onSubmit={handleAddEvent}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && currentEvent && (
        <EventForm
          title="Edit Event"
          event={currentEvent}
          onChange={handleEditEventChange}
          onSubmit={handleUpdateEvent}
          onCancel={() => setShowEditModal(false)}
          isEdit
        />
      )}

      {showRegistrationsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Manage Registrations - {selectedEvent.title}</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  setShowRegistrationsModal(false);
                  setSelectedEvent(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="w-full">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="pb-2 w-1/3">Name</th>
                    <th className="pb-2 w-1/3">Email</th>
                    <th className="pb-2 w-1/6">Status</th>
                    <th className="pb-2 w-1/6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.registrations.map((registration) => (
                    <tr key={registration.id} className="border-b border-gray-700">
                      <td className="py-2 truncate pr-2">{registration.name}</td>
                      <td className="py-2 truncate pr-2">{registration.email}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          registration.status === "approved" 
                            ? "bg-green-500 text-white" 
                            : "bg-yellow-500 text-white"
                        }`}>
                          {registration.status}
                        </span>
                      </td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          {registration.status === "pending" && (
                            <button
                              onClick={() => handleRegistrationStatusUpdate(selectedEvent.id, registration.id, "approved")}
                              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm whitespace-nowrap"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleRegistrationStatusUpdate(selectedEvent.id, registration.id, "rejected")}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm whitespace-nowrap"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaEvents;
