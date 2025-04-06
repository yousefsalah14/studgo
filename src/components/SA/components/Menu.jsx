import { LogOut } from "lucide-react";
import Logo from "./../../../assets/student.png";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems.jsx";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore.js";

function Menu() {
  const { handleLogout } = useAuthStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex flex-col h-full bg-gray-900 transition-all duration-300 ease-in-out w-60 ${isMobile ? 'fixed top-0 left-0 z-50 h-screen' : 'relative'}`}>
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      {/* Logo and title */}
      <div className="flex items-center justify-center p-6 mt-4">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-cover rounded-lg" />
          <Link
            to="/student-activity"
            className="text-2xl font-bold tracking-wide text-white hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            StudGO
          </Link>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 py-6 px-4">
        <MenuItems isCollapsed={false} />
      </div>

      {/* Divider */}
      <hr className="w-4/5 mx-auto border-gray-700 my-6" />

      {/* Logout button */}
      <div
        className="flex items-center gap-4 px-6 py-4 text-xl text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all cursor-pointer group mb-6"
        onClick={handleLogout}
      >
        <LogOut
          size={22}
          className="text-red-400 group-hover:text-red-300 transition-all flex-shrink-0"
        />
        <span className="font-medium">Logout</span>
      </div>
    </div>
  );
}

export default Menu;
