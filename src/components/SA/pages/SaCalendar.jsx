import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import './../style/bigCalendar.css'
// Event Data
const eventsData = [
    { id: 1, title: "Lake Trip", class: "1A", date: "2025-01-05", startTime: "10:00", endTime: "12:00" },
    { id: 2, title: "Picnic", class: "2A", date: "2025-02-14", startTime: "09:00", endTime: "11:30" },
    { id: 3, title: "Beach Trip", class: "3A", date: "2025-03-22", startTime: "13:00", endTime: "15:00" },
    { id: 4, title: "Museum Trip", class: "4A", date: "2025-04-10", startTime: "14:30", endTime: "16:00" },
    { id: 5, title: "Music Concert", class: "5A", date: "2025-05-18", startTime: "17:00", endTime: "19:00" },
    { id: 6, title: "Magician Show", class: "1B", date: "2025-06-07", startTime: "11:00", endTime: "12:30" },
    { id: 7, title: "Lake Trip", class: "2B", date: "2025-07-15", startTime: "08:00", endTime: "10:00" },
    { id: 8, title: "Cycling Race", class: "3B", date: "2025-08-25", startTime: "15:00", endTime: "17:00" },
    { id: 9, title: "Art Exhibition", class: "4B", date: "2025-09-30", startTime: "12:00", endTime: "14:00" },
    { id: 10, title: "Sports Tournament", class: "5B", date: "2025-10-20", startTime: "10:00", endTime: "12:00" }
  ];
  
const localizer = momentLocalizer(moment);

const SaCalendar = () => {
  const [view, setView] = useState(Views.WORK_WEEK);

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
  }));

  return (
    <div className="bg-white text-gray-900 p-2 rounded-lg shadow-lg">
    <Calendar
      localizer={localizer}
      events={formattedEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day" ,"month","agenda"]}
      view={view}
      style={{ height: 800 }}
      onView={handleOnChangeView}
      min={new Date(2025, 0, 1, 12, 0, 0)}
      max={new Date(2025, 0, 1, 22, 0, 0)}
    />
    </div>
  );
};

export default SaCalendar;
