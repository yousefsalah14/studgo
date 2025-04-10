import { useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import Menu from "./../components/Menu.jsx";
import { Outlet } from "react-router-dom";
import { Loader } from "lucide-react";

function SAHome() {
    return (
        <div className="h-screen flex overflow-hidden">
            {/* Left Sidebar (Fixed) */}
            <div className="w-[240px] bg-gray-900 text-white p-2 h-full">
                <Menu />
            </div>

            {/* Right Section (Scrollable) */}
            <div className="flex-1 flex flex-col  h-screen overflow-y-auto bg-gray-800">
                    <Navbar />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SAHome;
