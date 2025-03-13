import { useState } from "react";
import { Bell, User } from "lucide-react";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore.js";
import Search from "./Search.jsx";


function Navbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {currentUser}=useAuthStore()

    const notifications = [
        { id: 1, message: "New event added!", time: "5m ago" },
        { id: 2, message: "Your request has been approved.", time: "1h ago" },
        { id: 3, message: "Reminder: Meeting at 3 PM.", time: "3h ago" }
    ];

    return (
        <div className="flex justify-between items-center p-4 bg-gray-900 shadow-md relative">
            {/* Search Bar */}
            <Search />

            {/* Notification & User Profile */}
            <div className="flex items-center gap-4">
                                {/* Notification Dropdown */}
                                <div className="relative">
                    {/* Bell Icon */}
                    <div 
                        className="relative cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="rounded-full w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition">
                            <Bell size={22} className="text-white" />
                            {notifications.length > 0 && (
                                <div className="absolute -top-1 -right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
                                    {notifications.length}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dropdown List */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-3  border-b border-gray-700 text-white font-semibold">
                                Notifications
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div key={notif.id} className="p-3 text-sm text-white hover:bg-gray-700 transition flex justify-between">
                                            <span>{notif.message}</span>
                                            <span className="text-gray-400 text-xs">{notif.time}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-3 text-center text-gray-400">No notifications</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* User Profile Section */}
                <Link 
                    to={currentUser.userId ? `/student-activity-profile/${currentUser.userId}` : "#"} 
                    className="flex items-center gap-3 px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                >
                    {/* Profile Picture */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                        {currentUser?.profileImage ? (
                            <img 
                                src={currentUser.profileImage}  
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <User size={24} className="text-white" />
                        )}
                    </div>
                    

                    {/* User Info */}
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">
                            {currentUser?.UserName || "Guest"}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {Array.isArray(currentUser?.role) 
                                ? currentUser.role.join(", ") 
                                : currentUser?.role || "User"}
                        </span>
                    </div>
                </Link>


            </div>
        </div>
    );
}

export default Navbar;
