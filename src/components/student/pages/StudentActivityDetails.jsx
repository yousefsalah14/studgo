/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { axiosInstance } from '../../../lib/axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ArrowLeft, Mail, Phone, Globe, Calendar, MapPin, Users, Activity } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const StudentActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: activityData, isLoading, error } = useQuery(
    ['studentActivity', id],
    async () => {
      const { data } = await axiosInstance().get(`/sa/${id}`);
      return data.data;
    },
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-16 w-16 border-t-2 border-b-2 border-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500"
        >
          Failed to load student activity details. Please try again later.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        {/* Back Button at top left */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pb-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Activities</span>
          </motion.button>
        </motion.div>

        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Activity Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header with Image */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500/20">
                    {activityData.pictureUrl ? (
                      <img
                        src={activityData.pictureUrl}
                        alt={activityData.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Users className="w-12 h-12 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{activityData.name}</h1>
                    <p className="text-gray-400 mt-1">{activityData.university}</p>
                    <p className="text-gray-400">{activityData.faculty}</p>
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">{activityData.biography}</p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>{activityData.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>{activityData.contactPhoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <a
                      href={activityData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Visit Website
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>Founded: {new Date(activityData.foundingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>{activityData.address}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-[600px] rounded-xl overflow-hidden border border-gray-700"
            >
              <MapContainer
                center={[activityData.latitude, activityData.longitude]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[activityData.latitude, activityData.longitude]}>
                  <Popup>
                    <div className="text-gray-800">
                      <h3 className="font-semibold">{activityData.name}</h3>
                      <p className="text-sm">{activityData.address}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentActivityDetails;