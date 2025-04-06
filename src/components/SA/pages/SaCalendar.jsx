import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import './../style/bigCalendar.css';
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

// Event Data with updated theme colors
const eventsData = [
    { id: 1, title: "Lake Trip", class: "1A", date: "2025-01-05", startTime: "10:00", endTime: "12:00", color: "#bfdbfe" },
    { id: 2, title: "Picnic", class: "2A", date: "2025-02-14", startTime: "09:00", endTime: "11:30", color: "#dbeafe" },
    { id: 3, title: "Beach Trip", class: "3A", date: "2025-03-22", startTime: "13:00", endTime: "15:00", color: "#eff6ff" },
    { id: 4, title: "Museum Trip", class: "4A", date: "2025-04-10", startTime: "14:30", endTime: "16:00", color: "#bfdbfe" },
    { id: 5, title: "Music Concert", class: "5A", date: "2025-05-18", startTime: "17:00", endTime: "19:00", color: "#dbeafe" },
    { id: 6, title: "Magician Show", class: "1B", date: "2025-06-07", startTime: "11:00", endTime: "12:30", color: "#eff6ff" },
    { id: 7, title: "Lake Trip", class: "2B", date: "2025-07-15", startTime: "08:00", endTime: "10:00", color: "#bfdbfe" },
    { id: 8, title: "Cycling Race", class: "3B", date: "2025-08-25", startTime: "15:00", endTime: "17:00", color: "#dbeafe" },
    { id: 9, title: "Art Exhibition", class: "4B", date: "2025-09-30", startTime: "12:00", endTime: "14:00", color: "#eff6ff" },
    { id: 10, title: "Sports Tournament", class: "5B", date: "2025-10-20", startTime: "10:00", endTime: "12:00", color: "#bfdbfe" }
  ];

const localizer = momentLocalizer(moment);

const SaCalendar = () => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date(2025, 0, 15));

  const handleOnChangeView = (selectedView) => {
    if (Object.values(Views).includes(selectedView)) {
      setView(selectedView);
    }
  };

  // Convert eventsData to match react-big-calendar format
  const formattedEvents = eventsData.map((event) => ({
    id: event.id,
    title: `${event.title} (Class: ${event.class})`,
    start: new Date(`${event.date}T${event.startTime}:00`),
    end: new Date(`${event.date}T${event.endTime}:00`),
    color: event.color
  }));

  // Custom toolbar component
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };
    
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };
    
    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span className="text-xl font-semibold">{date.format('MMMM YYYY')}</span>
      );
    };

    return (
      <div className="rbc-toolbar custom-toolbar">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={goToCurrent}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition-colors"
            >
              <CalendarDays size={18} />
              Today
            </button>
            <div className="flex items-center ml-4">
              <button 
                onClick={goToBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={goToNext}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="text-center">
            {label()}
          </div>
          <div className="rbc-btn-group">
            {toolbar.views.map(name => (
              <button
                key={name}
                className={`px-4 py-2 rounded-lg ${
                  view === name ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => toolbar.onView(name)}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Custom event component
  const EventComponent = ({ event }) => {
    return (
      <div 
        className="custom-event" 
        style={{ backgroundColor: event.color }}
      >
        <div className="event-title">{event.title}</div>
        <div className="event-time">
          {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Student Activities Calendar</h2>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        view={view}
        date={date}
        onNavigate={date => setDate(date)}
        style={{ height: 800 }}
        onView={handleOnChangeView}
        min={new Date(2025, 0, 1, 8, 0, 0)}
        max={new Date(2025, 0, 1, 22, 0, 0)}
        className="calendar-container"
        components={{
          toolbar: CustomToolbar,
          event: EventComponent
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
};

export default SaCalendar;
