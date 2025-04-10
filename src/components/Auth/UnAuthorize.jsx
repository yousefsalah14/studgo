import { Shield, Home, LogIn, Lock } from 'lucide-react';

function UnAuthorize() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-4 py-8 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-red-500"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `pulse ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Shield Icon */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-red-500 blur-xl opacity-30 rounded-full animate-pulse"></div>
          <Shield className="w-24 h-24 text-red-500 relative z-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* 401 Number */}
      <div className="text-center">
        <div className="relative inline-block">
          <p className="font-bold text-8xl sm:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
            401
          </p>
          <div className="absolute -bottom-4 -right-4 animate-bounce-slow opacity-80">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">ERROR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center flex flex-col items-center gap-y-4 max-w-2xl mt-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-orange-400 to-red-300 animate-gradient">Access Denied</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto backdrop-blur-sm bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
          Sorry, you don't have permission to access this page. Please log in with the appropriate credentials.
        </p>

        {/* Security Badge */}
        <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-400">
          <Shield className="w-4 h-4 text-red-500" />
          This area requires proper authentication
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
          <a
            href="/login"
            className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-8 py-4 text-lg font-medium text-white shadow-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 hover:shadow-red-500/30 hover:scale-105 w-full sm:w-auto"
          >
            <LogIn className="w-6 h-6" />
            Go to Login
          </a>
          <a
            href="/"
            className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 px-8 py-4 text-lg font-medium text-white shadow-xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:border-gray-500 hover:scale-105 w-full sm:w-auto"
          >
            <Home className="w-6 h-6" />
            Return to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-gray-500 text-sm">
        © 2024 StudGo - Empowering Student Success
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}

export default UnAuthorize;
