import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../lib/axios';

const FollowedStudentActivities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default image URL for activities without pictures
  const defaultImageUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%230A84FF' rx='75'/%3E%3Ctext x='75' y='85' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' fill='white'%3ESA%3C/text%3E%3C/svg%3E";

  // Fetch followed student activities
  const fetchFollowedActivities = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance()({
        method: 'get',
        url: '/api/sa/student/followed-sa'
      });

      if (response.data && response.data.data) {
        setActivities(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching followed activities:', err);
      setError(err.message || 'Failed to fetch followed activities');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchFollowedActivities();
  }, []);

  const handleViewDetails = (activityId) => {
    navigate(`/studentactivity/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Followed Student Activities</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading activities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchFollowedActivities}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">You haven't followed any student activities yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative group cursor-pointer"
                onClick={() => handleViewDetails(activity.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
                <div className="relative flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-gray-600 group-hover:border-blue-500/50 transition-all duration-300">
                    {activity.pictureUrl ? (
                      <img
                        src={activity.pictureUrl}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = defaultImageUrl;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={defaultImageUrl}
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-400">{activity.university}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowedStudentActivities;