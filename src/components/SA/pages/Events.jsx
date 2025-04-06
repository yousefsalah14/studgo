import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

const Events = ({ events }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
          <Calendar className="w-5 h-5" />
          Upcoming Events
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-lg hover:bg-gray-700/50">
            <Clock className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-700/50">
            <Users className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}, {event.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{event.attendees || 0} attendees</span>
                </div>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">{event.type}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 bg-gray-700/30 rounded-xl text-center">
            <p className="text-gray-400">No upcoming events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
