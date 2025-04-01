import { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  List,
  Grid,
  Calendar as CalendarView,
  CheckCircle2,
  Clock3,
  CalendarCheck,
  CalendarX,
  ListChecks
} from "lucide-react";
import { toast } from "react-hot-toast";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar() {
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("all"); // all, events, agenda

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Room 101",
      attendees: 25,
      type: "workshop",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Leadership Talk",
      date: "2024-03-20",
      time: "2:00 PM",
      location: "Auditorium",
      attendees: 50,
      type: "talk",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Data Science Workshop",
      date: "2024-03-10",
      time: "11:00 AM",
      location: "Lab 3",
      attendees: 30,
      type: "workshop",
      status: "completed"
    }
  ];

  // Mock data for agenda items
  const agendaItems = [
    {
      id: 1,
      title: "Complete Workshop Assignment",
      date: "2024-03-17",
      time: "5:00 PM",
      relatedEvent: "Web Development Workshop",
      status: "pending"
    },
    {
      id: 2,
      title: "Submit Event Feedback",
      date: "2024-03-12",
      time: "3:00 PM",
      relatedEvent: "Data Science Workshop",
      status: "overdue"
    }
  ];

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    toast.success(`Switched to ${mode} view`);
  };

  const handleDateNavigation = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Calendar
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDateNavigation("prev")}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => handleDateNavigation("next")}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-2 bg-gray-800/50 p-1 rounded-lg w-fit">
          <button
            onClick={() => handleViewModeChange("month")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === "month"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <CalendarView className="w-4 h-4" />
            Month
          </button>
          <button
            onClick={() => handleViewModeChange("week")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === "week"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Grid className="w-4 h-4" />
            Week
          </button>
          <button
            onClick={() => handleViewModeChange("day")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === "day"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
            Day
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-gray-400 font-medium py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-700/30 rounded-lg p-2 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm text-gray-400">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Events and Agenda Sidebar */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-gray-800/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg flex-1 text-center ${
                  activeTab === "all"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 rounded-lg flex-1 text-center ${
                  activeTab === "events"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab("agenda")}
                className={`px-4 py-2 rounded-lg flex-1 text-center ${
                  activeTab === "agenda"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Agenda
              </button>
            </div>

            {/* Events List */}
            {(activeTab === "all" || activeTab === "events") && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-blue-400">Upcoming Events</h2>
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{event.location}</span>
                      </div>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Agenda List */}
            {(activeTab === "all" || activeTab === "agenda") && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-yellow-400">Agenda Items</h2>
                {agendaItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <ListChecks className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.relatedEvent}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                      <span
                        className={`px-2 py-1 ${
                          item.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        } text-xs rounded-full`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 