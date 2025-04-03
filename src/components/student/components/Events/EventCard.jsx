import React from 'react';
import { 
  Clock, 
  MapPin, 
  Users, 
  User,
  BadgeInfo,
  CheckCircle2,
  ChevronRight,
  CalendarIcon
} from 'lucide-react';
import { format } from 'date-fns';

function EventCard({ event, onViewDetails, onApply, isApplied }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300">
      <div className="h-48 relative">
        <img 
          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-sm">Organized by StudGov</span>
            </div>
          </div>
          {isApplied && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Applied
            </span>
          )}
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-300">
            <CalendarIcon className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{format(new Date(event.startDate), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{format(new Date(event.startDate), "h:mm a")}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{event.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{event.numberOfSeats} seats available</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => onViewDetails(event)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            View Details
            <BadgeInfo className="w-4 h-4" />
          </button>
          {!isApplied && (
            <button
              onClick={() => onApply(event.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
            >
              Apply Now
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard; 