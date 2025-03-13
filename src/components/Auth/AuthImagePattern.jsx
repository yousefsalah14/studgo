const AuthImagePattern = ({ title, subtitle ,image}) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-gray-900 p-12">
        <div className="max-w-md text-center">
          {/* Image Container */}
          <div className="flex justify-center mb-8">
            <img
              src={image} // Use the imported image
              alt="Authentication Illustration"
              className="w-96 h-96 object-contain " // Set perfect width and height
            />
          </div>
          {/* Title and Subtitle */}
          <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-gray-300">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;