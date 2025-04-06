import { Calendar, Clock, Edit, MapPin, Trash2, Users } from "lucide-react";

function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => onEdit(event)}
          >
            <Edit size={14} />
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-300 mb-4">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="mr-2 text-blue-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock size={16} className="mr-2 text-green-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <MapPin size={16} className="mr-2 text-yellow-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Users size={16} className="mr-2 text-purple-400" />
            <span>{event.registered} / {event.capacity} registered</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard; 