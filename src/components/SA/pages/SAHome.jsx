import { useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import Menu from "./../components/Menu.jsx";
import { Outlet } from "react-router-dom";
import { Loader } from "lucide-react";

function SAHome() {


    return (
        <div className="h-screen flex">
            {/* Left Sidebar (Fixed) */}
            <div className="w-[14%] md:w-[20%] lg:w-[16%] xl:w-[14%] sm:w-[10%] bg-gray-900 text-white p-3 fixed top-0 left-0 h-full overflow-y-auto">
                <Menu />
            </div>

            {/* Right Section (Scrollable) */}
            <div className="w-full ml-[14%] md:ml-[20%] lg:ml-[16%] xl:ml-[14%] sm:ml-[10%]  h-screen overflow-y-auto bg-gray-800">
                <Navbar />
                <div >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SAHome;
