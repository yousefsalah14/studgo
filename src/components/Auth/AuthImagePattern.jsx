import React from 'react';

function AuthImagePattern({ title, subtitle, image }) {
  return (
    <div className="relative h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        {/* Image Container */}
        <div className="mb-8 flex justify-center">
          <img
            src={image}
            alt="Authentication"
            className="w-full max-w-[400px] h-auto object-contain"
          />
        </div>

        {/* Text Content */}
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 text-lg">{subtitle}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;