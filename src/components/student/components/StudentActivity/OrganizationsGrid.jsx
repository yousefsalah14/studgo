import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Activity, Star, Users } from 'lucide-react';

const OrganizationsGrid = ({ filteredOrganizations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredOrganizations.map((org, index) => (
        <motion.div
          key={org.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link to={`/studentactivity/${org.id}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300">
              <div className="p-4">
                {/* Header with Image/Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500/20">
                    {org.pictureUrl == null ? (
                      <img
                        src={org.pictureUrl}
                        alt={org.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{org.name}</h2>
                    <p className="text-sm text-gray-400">{org.role}</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="truncate">{org.contactEmail || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Founded: {new Date(org.foundingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="truncate">{org.description || 'No description available'}</span>
                  </div>
                </div>

                {/* Tags if available */}
                {org.tags && org.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {org.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {org.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                        +{org.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Organization Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{org.memberCount || '0'} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>{org.activityCount || '0'} activities</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{org.rating || '0'} rating</span>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="w-full bg-blue-600/80 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default OrganizationsGrid; 