/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

// Import all components
import HeaderSection from "../components/StudentActivity/Details/HeaderSection";
import ContactInfoCard from "../components/StudentActivity/Details/ContactInfoCard";
import OrganizationDetailsCard from "../components/StudentActivity/Details/OrganizationDetailsCard";
import QuickActionsCard from "../components/StudentActivity/Details/QuickActionsCard";
import ActivityCalendarCard from "../components/StudentActivity/Details/ActivityCalendarCard";
import AboutSection from "../components/StudentActivity/Details/AboutSection";
import MissionVisionSection from "../components/StudentActivity/Details/MissionVisionSection";
import TagsSection from "../components/StudentActivity/Details/TagsSection";
import RecentActivitiesSection from "../components/StudentActivity/Details/RecentActivitiesSection";
import UpcomingEventsSection from "../components/StudentActivity/Details/UpcomingEventsSection";
import WorkshopsSection from "../components/StudentActivity/Details/WorkshopsSection";
import AchievementsSection from "../components/StudentActivity/Details/AchievementsSection";

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

  const { 
    name, 
    contactEmail, 
    role, 
    pictureUrl, 
    lastActivity, 
    foundingDate, 
    description, 
    tags, 
    biography,
    phone,
    location,
    memberCount,
    mission,
    vision
  } = studentActivityDetails;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-12">
        <HeaderSection name={name} role={role} pictureUrl={pictureUrl} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Cards */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactInfoCard 
              contactEmail={contactEmail} 
              phone={phone} 
              location={location} 
            />
            <OrganizationDetailsCard 
              foundingDate={foundingDate}
              memberCount={memberCount}
              lastActivity={lastActivity}
            />
            <QuickActionsCard />
            <ActivityCalendarCard />
          </motion.div>

          {/* Right Column - Details */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AboutSection biography={biography} description={description} />
            <MissionVisionSection mission={mission} vision={vision} />
            <TagsSection tags={tags} />
            <RecentActivitiesSection description={description} />
            <UpcomingEventsSection />
            <WorkshopsSection />
            <AchievementsSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StudentActivityDetails;