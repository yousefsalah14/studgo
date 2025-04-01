import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import "./../style/Calendar.css"; // Custom styles

const events = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    date: "2025-03-15",
    time: "10:00 AM – 1:00 PM",
    description: "A hands-on workshop covering full-stack web development using the MERN stack.",
  },
  {
    id: 2,
    title: "AI & Machine Learning Conference",
    date: "2025-03-20",
    time: "2:00 PM – 5:00 PM",
    description: "Industry experts discuss the latest trends in artificial intelligence and machine learning.",
  },
  {
    id: 3,
    title: "Tech Entrepreneurship Panel",
    date: "2025-03-25",
    time: "6:00 PM – 8:00 PM",
    description: "Successful startup founders share insights on building and scaling tech businesses.",
  },
  {
    id: 3,
    title: "Tech Entrepreneurship Panel",
    date: "2025-03-25",
    time: "6:00 PM – 8:00 PM",
    description: "Successful startup founders share insights on building and scaling tech businesses.",
  },
];

function EventCalendar() {
  const [value, setValue] = useState(new Date());
  

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const correctedDate = new Date(date);
    correctedDate.setDate(correctedDate.getDate() + 1); // Fix off-by-one issue
    return correctedDate.toISOString().split("T")[0];
  };

  // Find events matching the selected date
  const selectedDate = formatDate(value);
  const eventsForDate = events.filter((event) => event.date === selectedDate);

  return (
    <>
      <div className="p-4 rounded-lg shadow-lg flex justify-center max-w-2xl text-lg font-bold transition-all duration-300 hover:scale-105 cursor-pointer">
        <Calendar
          locale="en-US"
          onChange={setValue}
          value={value}
          tileClassName={({ date }) =>
            events.some((event) => event.date === formatDate(date))
              ? "bg-blue-500 text-white font-bold rounded-md" // Highlight event days
              : "hover:bg-gray-600 rounded-md transition"
          }
        />
      </div>

      <div className="mt-2 p-4 text-blue-700 bg-gray-800 rounded-lg w-full max-w-full text-center shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
        <h2 className="text-xl font-semibold">Selected Date: {selectedDate}</h2>
        {eventsForDate.length > 0 ? (
          eventsForDate.map((event) => (
            <p key={event.id} className="mt-2 text-lg text-white">
              {event.title} ({event.time})
            </p>
          ))
        ) : (
          <p className="mt-2 text-lg text-white">No events</p>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 text-white bg-blue-600 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.time}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventCalendar;
