import { useState, useEffect } from "react";
import { Activity, Users, FileText, TrendingUp } from "lucide-react";
import { useAuthStore } from "../../../store/authStore.js";
import ActivityChart from "../components/charts/ActivityChart.jsx";
import DistributionChart from "../components/charts/DistributionChart.jsx";
import AttendanceChart from "../components/charts/AttendanceChart.jsx";
import EngagementChart from "../components/charts/EngagementChart.jsx";

function SaDashboard() {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    activities: { count: 0, trend: "+12%" },
    teams: { count: 0, trend: "+5%" },
    followers: { count: 0, trend: "+15%" },
    reports: { count: 0, trend: "+8%" }
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardData({
        activities: { count: 12, trend: "+12%" },
        teams: { count: 8, trend: "+5%" },
        followers: { count: 150, trend: "+15%" },
        reports: { count: 5, trend: "+8%" }
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser?.UserName || "Admin"}!</h1>
            <p className="text-gray-100 max-w-2xl">
              Manage your student activities, teams, and followers from this dashboard. Get insights into participation and engagement metrics.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg font-medium shadow-sm">
              Create New Activity
            </button>
          </div>
        </div>
      </div>
    
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Activities" 
          value={dashboardData.activities.count} 
          trend={dashboardData.activities.trend}
          icon={<Activity size={24} />}
          color="bg-blue-600"
          isLoading={isLoading}
        />
        <StatCard 
          title="Teams" 
          value={dashboardData.teams.count} 
          trend={dashboardData.teams.trend}
          icon={<Users size={24} />}
          color="bg-green-600"
          isLoading={isLoading}
        />
        <StatCard 
          title="Followers" 
          value={dashboardData.followers.count} 
          trend={dashboardData.followers.trend}
          icon={<Users size={24} />}
          color="bg-purple-500"
          isLoading={isLoading}
        />
        <StatCard 
          title="Reports" 
          value={dashboardData.reports.count} 
          trend={dashboardData.reports.trend}
          icon={<FileText size={24} />}
          color="bg-yellow-500"
          isLoading={isLoading}
        />
      </div>

      {/* Activity Chart */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Activity className="mr-2 text-blue-400" size={20} />
            Activity Overview
          </h2>
          <div className="flex gap-2">
            <select className="bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
              <option value="year">This Year</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>
        <div className="h-[350px]">
          <ActivityChart isLoading={isLoading} />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance by Department */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2 text-green-400" size={20} />
            Followers by Department
          </h2>
          <div className="h-[300px]">
            <AttendanceChart isLoading={isLoading} />
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-yellow-400" size={20} />
            Activity Distribution
          </h2>
          <div className="h-[300px]">
            <DistributionChart isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl shadow-lg p-6">
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
                    <tr>
                      <td className="py-3 font-medium">Tech Workshop</td>
                      <td className="py-3 text-gray-400">Apr 12, 2025</td>
                      <td className="py-3">Workshop</td>
                      <td className="py-3"><span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Active</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Career Fair</td>
                      <td className="py-3 text-gray-400">Apr 15, 2025</td>
                      <td className="py-3">Event</td>
                      <td className="py-3"><span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">Pending</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Leadership Talk</td>
                      <td className="py-3 text-gray-400">Apr 20, 2025</td>
                      <td className="py-3">Talk</td>
                      <td className="py-3"><span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">Planning</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Coding Contest</td>
                      <td className="py-3 text-gray-400">Apr 25, 2025</td>
                      <td className="py-3">Competition</td>
                      <td className="py-3"><span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">Draft</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Networking Mixer</td>
                      <td className="py-3 text-gray-400">Apr 30, 2025</td>
                      <td className="py-3">Social</td>
                      <td className="py-3"><span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Active</span></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Activities →
          </button>
        </div>

        {/* Team Members */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2 text-purple-400" size={20} />
            Team Members
          </h2>
          <ul className="space-y-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="animate-pulse h-10 w-10 bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="animate-pulse h-4 w-24 bg-gray-700 rounded mb-2"></div>
                    <div className="animate-pulse h-3 w-32 bg-gray-700 rounded"></div>
                  </div>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">JD</div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-gray-400">Team Lead</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Design</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">MS</div>
                  <div>
                    <p className="font-medium">Mike Smith</p>
                    <p className="text-sm text-gray-400">Coordinator</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Marketing</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">AJ</div>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-sm text-gray-400">Member</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">Tech</span>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
          <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Members →
          </button>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2 text-indigo-400" size={20} />
          Engagement Metrics
        </h2>
        <div className="h-[350px]">
          <EngagementChart isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, trend, icon, color, isLoading }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-5">
      <div className="flex items-center justify-between">
        <div className={`${color} rounded-full p-3`}>
          {icon}
        </div>
        {!isLoading && (
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-gray-400 text-sm">{title}</p>
        {isLoading ? (
          <div className="animate-pulse h-8 w-20 bg-gray-700 rounded mt-1"></div>
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </div>
    </div>
  );
}

export default SaDashboard;
