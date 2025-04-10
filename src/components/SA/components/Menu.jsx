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
    <div className="flex flex-col h-full bg-gray-900 transition-all duration-300 ease-in-out w-full">
      {/* Mobile overlay is hidden by default */}

      {/* Logo and title */}
      <div className="flex items-center justify-start p-2 mt-1">
        <div className="flex items-center gap-1">
          <img src={Logo} alt="Logo" className="w-8 h-8 object-cover rounded-lg" />
          <Link
            to="/student-activity"
            className="text-lg font-bold tracking-wide text-white hover:text-blue-400 transition duration-300 ease-in-out"
          >
            StudGO
          </Link>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 py-2 px-1">
        <MenuItems isCollapsed={false} />
      </div>

      {/* Divider */}
      <hr className="w-4/5 mx-auto border-gray-700 my-2" />

      {/* Logout button */}
      <div
        className="flex items-center gap-1 px-3 py-1 text-base text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all cursor-pointer group mb-2"
        onClick={handleLogout}
      >
        <LogOut
          size={16}
          className="text-red-400 group-hover:text-red-300 transition-all flex-shrink-0"
        />
        <span className="font-medium">Logout</span>
      </div>
    </div>
  );
}

export default Menu;
