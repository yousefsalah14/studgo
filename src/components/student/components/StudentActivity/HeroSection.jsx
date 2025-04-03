import React from 'react';

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
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Join Now
            </button>
            <button className="px-8 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 