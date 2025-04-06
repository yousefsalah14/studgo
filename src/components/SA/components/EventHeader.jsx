import { ListFilter, Plus, Users } from "lucide-react";
import Search from "./Search.jsx";

function EventHeader({ 
  searchTerm, 
  onSearchChange, 
  onAddEvent, 
  onFilterChange, 
  filterType,
  onManageRegistrations,
  selectedEvent
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold">Events</h2>
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full md:w-64 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === "all" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange("workshop")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === "workshop" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Workshops
          </button>
          <button
            onClick={() => onFilterChange("bootcamp")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === "bootcamp" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Bootcamps
          </button>
        </div>
        {selectedEvent && (
          <button
            onClick={() => onManageRegistrations(selectedEvent)}
            className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
            title="Manage Registrations"
          >
            <Users size={18} />
            <span className="hidden md:inline">Manage Registrations</span>
          </button>
        )}
        <button
          onClick={onAddEvent}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          title="Add New Event"
        >
          <Plus size={18} />
          <span className="hidden md:inline">Add Event</span>
        </button>
      </div>
    </div>
  );
}

export default EventHeader; 