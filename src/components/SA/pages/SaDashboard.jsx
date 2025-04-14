import { useState, useEffect } from "react";
import { Activity, Users, FileText, TrendingUp, ChartPie } from "lucide-react";
import { useAuthStore } from "../../../store/authStore.js";
import { axiosInstance } from "../../../lib/axios";
import { toast } from "react-hot-toast";
import DistributionChart from "../components/charts/DistributionChart.jsx";
import ActivityTypeChart from "../components/charts/ActivityTypeChart.jsx";
import { useNavigate } from "react-router-dom";

function SaDashboard() {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [saProfile, setSaProfile] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    activities: { count: 0, trend: "+0%" },
    teams: { count: 0, trend: "+0%" },
    followers: { count: 0, trend: "+0%" }
  });
  const [statistics, setStatistics] = useState({
    numOfActivites: 0,
    numOfEventActivites: 0,
    numOfCourseActivites: 0,
    numOfWorkshopActivites: 0,
    numOfTechnicalActivites: 0,
    numOfNonTechnicalActivites: 0,
    numOfMixedActivites: 0,
    numOfTeams: 0,
    numOfFollowers: 0
  });
  const navigate = useNavigate();

  // Fetch SA profile
  useEffect(() => {
    const fetchSaProfile = async () => {
      try {
        const response = await axiosInstance().get("/sa/profile");
        console.log("SA Profile Response:", response.data);
        
        if (response.data?.isSuccess) {
          const profileData = response.data.data;
          setSaProfile(profileData);
          localStorage.setItem('saProfile', JSON.stringify(profileData));
          toast.success("Profile loaded successfully");
        } else {
          console.error("Failed to fetch SA profile:", response.data);
          toast.error("Failed to load profile");
        }
      } catch (error) {
        console.error("Error fetching SA profile:", error);
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    };

    // Try to get profile from localStorage first
    const storedProfile = localStorage.getItem('saProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setSaProfile(parsedProfile);
      // Only fetch if stored data is older than 1 hour
      const storedTime = localStorage.getItem('saProfileTimestamp');
      const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
      
      if (!storedTime || Date.now() - parseInt(storedTime) > ONE_HOUR) {
        fetchSaProfile();
        localStorage.setItem('saProfileTimestamp', Date.now().toString());
      }
    } else {
      // No stored profile, fetch from API
      fetchSaProfile();
      localStorage.setItem('saProfileTimestamp', Date.now().toString());
    }
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance().get("/sa/statistics");
        
        if (response.data?.isSuccess) {
          const stats = response.data.data;
          setStatistics(stats);
          
          // Update dashboard data with real statistics
          setDashboardData({
            activities: { 
              count: stats.numOfActivites, 
              trend: "+0%" 
            },
            teams: { 
              count: stats.numOfTeams, 
              trend: "+0%" 
            },
            followers: { 
              count: stats.numOfFollowers, 
              trend: "+0%" 
            }
          });
        } else {
          console.error("Failed to fetch statistics:", response.data);
          toast.error("Failed to load statistics");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        toast.error(error.response?.data?.message || "Failed to load statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Fetch recent activities
  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const saProfile = JSON.parse(localStorage.getItem('saProfile'));
        if (!saProfile?.id) {
          toast.error("Student Activity profile not found");
          return;
        }

        const response = await axiosInstance().get(
          `/activity/filter?PageIndex=0&PageSize=5&StudentActivityId=${saProfile.id}&IsSortedByStartDate=true&IsDescending=true`
        );

        if (response.data?.isSuccess) {
          setRecentActivities(response.data.data || []);
        } else {
          console.error("Failed to fetch recent activities:", response.data);
          toast.error("Failed to load recent activities");
        }
      } catch (error) {
        console.error("Error fetching recent activities:", error);
        toast.error(error.response?.data?.message || "Failed to load recent activities");
      }
    };

    fetchRecentActivities();
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to get status style
  const getStatusStyle = (isOpened) => {
    return isOpened 
      ? { bgColor: 'bg-green-500/20', textColor: 'text-green-400', text: 'Active' }
      : { bgColor: 'bg-red-500/20', textColor: 'text-red-400', text: 'Closed' };
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          {saProfile?.pictureUrl ? (
            <img
              src={saProfile.pictureUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-4 border-white/20 mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/64?text=SA";
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20 mb-4">
              <span className="text-2xl font-bold text-white">
                {saProfile?.name?.charAt(0) || currentUser?.UserName?.charAt(0) || 'S'}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Welcome, {saProfile?.name || currentUser?.UserName || "Admin"}!
            </h1>
            <p className="text-gray-100 max-w-2xl">
              {saProfile?.biography ? (
                <span className="line-clamp-2">{saProfile.biography}</span>
              ) : (
                "Manage your student activities, teams, and followers from this dashboard."
              )}
            </p>
          </div>
        </div>
      </div>
    
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Activities" 
          value={dashboardData.activities.count} 
          trend={dashboardData.activities.trend}
          icon={<Activity size={24} />}
          color="bg-blue-600"
          isLoading={isLoading}
          statistics={statistics}
        />
        <StatCard 
          title="Teams" 
          value={dashboardData.teams.count} 
          trend={dashboardData.teams.trend}
          icon={<Users size={24} />}
          color="bg-green-600"
          isLoading={isLoading}
          statistics={statistics}
        />
        <StatCard 
          title="Followers" 
          value={dashboardData.followers.count} 
          trend={dashboardData.followers.trend}
          icon={<Users size={24} />}
          color="bg-purple-500"
          isLoading={isLoading}
          statistics={statistics}
        />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-yellow-400" size={20} />
            Activity Distribution
          </h2>
          <div className="h-[300px]">
            <DistributionChart 
              isLoading={isLoading}
              statistics={statistics}
            />
          </div>
        </div>

        {/* Activity Type Chart */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ChartPie className="mr-2 text-purple-400" size={20} />
            Activity Categories
          </h2>
          <div className="h-[300px]">
            <ActivityTypeChart 
              isLoading={isLoading}
              statistics={statistics}
            />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2 text-blue-400" size={20} />
            Recent Activities
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="py-3"><div className="animate-pulse h-4 w-32 bg-gray-700 rounded"></div></td>
                      <td className="py-3"><div className="animate-pulse h-4 w-20 bg-gray-700 rounded"></div></td>
                      <td className="py-3"><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></td>
                      <td className="py-3"><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></td>
                    </tr>
                  ))
                ) : (
                  <>
                    {recentActivities.map((activity) => {
                      const status = getStatusStyle(activity.isOpened);
                      return (
                        <tr key={activity.id}>
                          <td className="py-3 font-medium">{activity.title}</td>
                          <td className="py-3 text-gray-400">{formatDate(activity.startDate)}</td>
                          <td className="py-3">{activity.activityType}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${status.bgColor} ${status.textColor}`}>
                              {status.text}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {recentActivities.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-gray-400">
                          No activities found
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <button 
            onClick={() => navigate('/student-activity/activities')} 
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All Activities →
          </button>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, trend, icon, color, isLoading, statistics }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-700 group relative">
      <div className="flex items-center justify-between">
        <div className={`${color} rounded-full p-3 transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        {!isLoading && (
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'} transition-opacity group-hover:opacity-75`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-gray-400 text-sm transition-colors group-hover:text-gray-300">{title}</p>
        {isLoading ? (
          <div className="animate-pulse h-8 w-20 bg-gray-700 rounded mt-1"></div>
        ) : (
          <p className="text-2xl font-bold transition-colors group-hover:text-white">{value}</p>
        )}
      </div>
      
      {/* Hover tooltip */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gray-900 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-300 pointer-events-none">
        {title === "Activities" && (
          <div className="space-y-1">
            <p>Total activities in your organization</p>
            <div className="flex justify-between text-xs">
              <span>Events: {statistics?.numOfEventActivites || 0}</span>
              <span>Workshops: {statistics?.numOfWorkshopActivites || 0}</span>
              <span>Courses: {statistics?.numOfCourseActivites || 0}</span>
            </div>
          </div>
        )}
        {title === "Teams" && (
          <div className="space-y-1">
            <p>Total teams in your organization</p>
            <p className="text-xs">Manage your teams and their members</p>
          </div>
        )}
        {title === "Followers" && (
          <div className="space-y-1">
            <p>Total followers of your organization</p>
            <p className="text-xs">Students following your activities</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SaDashboard;
