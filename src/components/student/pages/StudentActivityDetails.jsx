/* eslint-disable no-unused-vars */

import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Building2, Tag, Activity, Users, MapPin, Globe, Phone, Award, Clock, BookOpen, Target, Trophy, CalendarDays, CalendarCheck, CalendarClock, CalendarX, ChevronRight } from "lucide-react";
import { useQuery } from "react-query";

function StudentActivityDetails() {
  let { id } = useParams();
  
  const { data: studentActivityDetails, isLoading, error } = useQuery(
    ["studentActivity", id],
    async () => {
      const { data } = await axios.get(`https://studgov1.runasp.net/api/StudentActivity/${id}`);
      return data.data;
    },
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500">
          Failed to load Student Activity details. Please try again.
        </div>
      </div>
    );
  }

  if (!studentActivityDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="text-gray-400 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          No student activity found.
        </div>
      </div>
    );
  }

  const { name, contactEmail, role, pictureUrl, lastActivity, foundingDate, description, tags, biography } =
    studentActivityDetails;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-12">
        {/* Header Section with Background */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            {pictureUrl ? (
              <img
                src={pictureUrl}
                alt={name}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <User className="w-32 h-32 text-blue-400 opacity-20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-800"></div>
          </div>
          <div className="relative px-8 py-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-8">
                <div className="w-40 h-40 rounded-full border-4 border-blue-500/20 overflow-hidden bg-gray-800/50 backdrop-blur-sm">
                  {pictureUrl == null ? (
                    <img
                      src={pictureUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-20 h-20 text-blue-400" />
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {name}
              </h1>
              <p className="text-2xl text-gray-300 mb-8">{role}</p>
              <div className="flex justify-center gap-4">
                <button className="px-8 py-3 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5" />
                  Join Organization
                </button>
                <button className="px-8 py-3 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5" />
                  Visit Website
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Contact Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Mail className="w-5 h-5" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="truncate">{contactEmail || "Not available"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>{studentActivityDetails.phone || "Not available"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>{studentActivityDetails.location || "Not specified"}</span>
                </div>
              </div>
            </div>

            {/* Organization Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Building2 className="w-5 h-5" />
                Organization Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Founded: {new Date(foundingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Members: {studentActivityDetails.memberCount || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>Last Activity: {lastActivity || "No recent activity"}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Target className="w-5 h-5" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600/80 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Join Organization
                </button>
                <button className="w-full bg-purple-600/80 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  Visit Website
                </button>
                <button className="w-full bg-green-600/80 hover:bg-green-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Award className="w-4 h-4" />
                  View Achievements
                </button>
              </div>
            </div>

            {/* Activity Calendar */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <CalendarDays className="w-5 h-5" />
                Activity Calendar
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-colors ${
                        i === 15
                          ? 'bg-blue-500 text-white'
                          : i > 0 && i < 31
                          ? 'hover:bg-gray-700/50'
                          : 'text-gray-700'
                      }`}
                    >
                      {i > 0 && i < 31 ? i : ''}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="w-full bg-blue-600/80 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <CalendarCheck className="w-4 h-4" />
                    View Full Calendar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* About Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <BookOpen className="w-6 h-6" />
                About
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {biography || description || "No description available."}
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Target className="w-6 h-6" />
                Mission & Vision
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mission</h3>
                  <p className="text-gray-300">
                    {studentActivityDetails.mission || "To empower students through meaningful activities and experiences."}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Vision</h3>
                  <p className="text-gray-300">
                    {studentActivityDetails.vision || "To be the leading student organization fostering growth and development."}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Tag className="w-6 h-6" />
                Tags & Categories
              </h2>
              <div className="flex flex-wrap gap-3">
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No tags available.</p>
                )}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Activity className="w-6 h-6" />
                Recent Activities
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-400">Last week</span>
                      </div>
                      <h3 className="text-white font-medium mb-1">Activity Title {index + 1}</h3>
                      <p className="text-gray-300 text-sm">
                        Brief description of the activity and its impact on students.
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300">{description || "No activities listed."}</p>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
                  <CalendarClock className="w-6 h-6" />
                  Upcoming Events
                </h2>
                <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((event, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <CalendarClock className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-blue-400">March {15 + index}, 2024</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">2:00 PM - 4:00 PM</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Event Title {index + 1}</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Brief description of the event and what participants can expect.
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>50 participants</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>Room 101</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workshops & Talks */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
                  <BookOpen className="w-6 h-6" />
                  Workshops & Talks
                </h2>
                <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((workshop, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-purple-400">March {20 + index}, 2024</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">3:00 PM - 5:00 PM</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Workshop Title {index + 1}</h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Brief description of the workshop and learning outcomes.
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>30 participants</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>Lab 205</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Trophy className="w-6 h-6" />
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((_, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-400">2024</span>
                    </div>
                    <h3 className="text-white font-medium mb-1">Achievement Title {index + 1}</h3>
                    <p className="text-gray-300 text-sm">
                      Description of the achievement and its significance.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StudentActivityDetails;