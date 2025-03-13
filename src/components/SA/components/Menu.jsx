import { LogOut, Presentation } from "lucide-react";
import Logo from "./../../../assets/student.png";
import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems.jsx";


import { useAuthStore } from "../../../store/authStore.js";

function Menu() {
  const navigate = useNavigate();
  const { handleLogout } = useAuthStore()
  return (
    <div className="flex flex-col items-center space-x-3 mt-5 gap-6">
      <div className="flex">
        <img src={Logo} alt="Logo" className="w-10 h-10  object-cover " />
        <Link
          to="/student-activity"
          className=" hidden lg:block md:block text-xl font-bold tracking-wide  hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:drop-shadow-lg lg:justify-start"
        >
          StudGO
        </Link>
      </div>
      <MenuItems />
      <hr className="w-3/4 mt-4 border-1 border-gray-300" />
      <div
        className="w-full flex items-center gap-2 px-4 text-md text-red-500 hover:text-blue-600 transition-all cursor-pointer group md:px-4 lg:px-6 xl:px-8"
        onClick={handleLogout}
      >
        <LogOut
          size={18}
          className=" text-red-500 group-hover:text-blue-600 transition-all font-md"
        />
        <span className="hidden lg:block md:block font-md">Logout</span>
      </div>
    </div>
  );
}

export default Menu;
