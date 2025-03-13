/* eslint-disable no-unused-vars */

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "lucide-react";

function StudentActivityDetails() {
  let { id } = useParams();
  const [studentActivityDetails, setStudentActivityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getStudentActivity(id) {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://studgov1.runasp.net/api/StudentActivity/${id}`);
      setStudentActivityDetails(data.data);
    } catch (err) {
      setError("Failed to load Student Activity details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStudentActivity(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white animate-pulse">
        <p>Loading student activity details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  const { name, contactEmail, role, pictureUrl, lastActivity, foundingDate, description, tags, biography } =
    studentActivityDetails;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <motion.h1 
          className="text-4xl font-extrabold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {name}
        </motion.h1>

        <motion.div 
          className="flex flex-wrap md:flex-nowrap items-start bg-gray-800 rounded-lg shadow-lg p-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/3 p-6 flex justify-center">
          {
            pictureUrl == null ? 
            <motion.img
              src={pictureUrl || "https://via.placeholder.com/300"}
              alt={name}
              className="w-full h-auto object-cover rounded-lg border-2 border-gray-700 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            /> : <User size={24} className="text-white" /> }
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-4">{role}</h2>
            <p className="mb-8 text-gray-300 text-lg leading-relaxed">{biography || "No description available."}</p>
            <h3 className="text-lg font-medium">Contact: <span className="text-blue-400">{contactEmail || "Not available"}</span></h3>
            <div className="flex justify-between my-6 text-gray-400">
              <h3 className="text-md">Last Activity: <span className="text-gray-300">{lastActivity}</span></h3>
              <h3 className="text-md">Founded: <span className="text-gray-300">{new Date(foundingDate).toLocaleDateString()}</span></h3>
            </div>
            <div className="flex gap-6 mt-8">
              <motion.button 
                className="w-full bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Follow
              </motion.button>
              <motion.button 
                className="w-full bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chat
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tags Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="bg-blue-800 text-white text-sm px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {tag}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-400">No tags available.</p>
            )}
          </div>
        </motion.div>

        {/* Activities Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Activities</h2>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentActivityDetails;