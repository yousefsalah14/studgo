import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, BookOpen, TrendingUp, Compass } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-[400px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-800"></div>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Student Activities Hub
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover, Connect, and Thrive in Student Organizations
          </p>
          
          {/* Creative interactive element replacing the buttons */}
          <motion.div 
            className="flex justify-center gap-3 py-3 px-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex flex-col items-center px-6 py-4 bg-gray-800 rounded-lg">
                <Search className="w-10 h-10 text-pink-400 mb-1" />
                <span className="text-white font-medium">Explore</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex flex-col items-center px-6 py-4 bg-gray-800 rounded-lg">
                <Calendar className="w-10 h-10 text-blue-400 mb-1" />
                <span className="text-white font-medium">Events</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex flex-col items-center px-6 py-4 bg-gray-800 rounded-lg">
                <Users className="w-10 h-10 text-green-400 mb-1" />
                <span className="text-white font-medium">Connect</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex flex-col items-center px-6 py-4 bg-gray-800 rounded-lg">
                <TrendingUp className="w-10 h-10 text-amber-400 mb-1" />
                <span className="text-white font-medium">Grow</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;