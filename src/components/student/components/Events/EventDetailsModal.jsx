import React from 'react';
import { 
  X, 
  CalendarIcon, 
  MapPin, 
  Building2, 
  Users, 
  BadgeInfo,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

function EventDetailsModal({ event, onClose, onApply, isApplied }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">{event.name}</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Description</h3>
            <p className="text-gray-300">{event.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-300">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                <span>Start: {format(new Date(event.startDate), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                <span>End: {format(new Date(event.endDate), "MMM d, yyyy")}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>{event.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span>{event.city}, {event.governorate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-5 h-5 text-blue-400" />
            <span>{event.numberOfSeats} seats available</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <BadgeInfo className="w-5 h-5 text-blue-400" />
            <span>Category: {event.category}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          {!isApplied && (
            <button
              onClick={() => {
                onApply(event.id);
                onClose();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
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

export default EventDetailsModal; 