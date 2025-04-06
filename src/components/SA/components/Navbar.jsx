import { useState, useEffect, useRef } from "react";
import { Bell, User, X, Check, Clock, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore.js";
import Search from "./Search.jsx";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { currentUser } = useAuthStore();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Mock notifications data - in a real app, this would come from an API
    const [notifications, setNotifications] = useState([
        { 
            id: 1, 
            message: "New event added: Student Leadership Workshop", 
            time: "5m ago",
            read: false,
            type: "event"
        },
        { 
            id: 2, 
            message: "Your request to join the Debate Club has been approved.", 
            time: "1h ago",
            read: false,
            type: "approval"
        },
        { 
            id: 3, 
            message: "Reminder: Student Council Meeting at 3 PM today.", 
            time: "3h ago",
            read: true,
            type: "reminder"
        },
        { 
            id: 4, 
            message: "New announcement: Campus Clean-up Day this Saturday", 
            time: "1d ago",
            read: true,
            type: "announcement"
        }
    ]);

    // Handle search functionality
    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        
        // Mock search results - in a real app, this would call an API
        const mockResults = [
            { id: 1, title: "Student Leadership Workshop", type: "event" },
            { id: 2, title: "Debate Club", type: "club" },
            { id: 3, title: "Student Council", type: "organization" },
            { id: 4, title: "Campus Clean-up Day", type: "event" }
        ].filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSearchResults(mockResults);
    };

    // Mark notification as read
    const markAsRead = (id) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    // Get unread notifications count
    const unreadCount = notifications.filter(notif => !notif.read).length;

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch(type) {
            case "event":
                return <Clock className="h-4 w-4 text-blue-400" />;
            case "approval":
                return <Check className="h-4 w-4 text-green-400" />;
            case "reminder":
                return <Bell className="h-4 w-4 text-yellow-400" />;
            case "announcement":
                return <Settings className="h-4 w-4 text-purple-400" />;
            default:
                return <Bell className="h-4 w-4 text-gray-400" />;
        }
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-900 shadow-md relative z-10">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <Search onSearch={handleSearch} placeholder="Search events, clubs, organizations..." />
                
                {/* Search Results Dropdown */}
                {isSearching && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20">
                        {searchResults.map(result => (
                            <div 
                                key={result.id} 
                                className="p-3 hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3"
                                onClick={() => {
                                    // Navigate to the appropriate page based on result type
                                    if (result.type === "event") {
                                        navigate(`/student-activity/events/${result.id}`);
                                    } else if (result.type === "club") {
                                        navigate(`/student-activity/clubs/${result.id}`);
                                    } else {
                                        navigate(`/student-activity/organizations/${result.id}`);
                                    }
                                    setIsSearching(false);
                                }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                    {getNotificationIcon(result.type)}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{result.title}</div>
                                    <div className="text-gray-400 text-xs capitalize">{result.type}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Notification & User Profile */}
            <div className="flex items-center gap-4">
                {/* Notification Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    {/* Bell Icon */}
                    <div 
                        className="relative cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                            <Bell size={20} className="text-white" />
                            {unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
                                    {unreadCount}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dropdown List */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-gray-800 shadow-lg rounded-lg overflow-hidden z-20">
                            <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                                <div className="text-white font-semibold">Notifications</div>
                                {unreadCount > 0 && (
                                    <button 
                                        onClick={markAllAsRead}
                                        className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div 
                                            key={notif.id} 
                                            className={`p-3 text-sm hover:bg-gray-700 transition flex items-start gap-3 ${!notif.read ? 'bg-gray-700/50' : ''}`}
                                        >
                                            <div className="mt-1">
                                                {getNotificationIcon(notif.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white">{notif.message}</div>
                                                <div className="text-gray-400 text-xs mt-1">{notif.time}</div>
                                            </div>
                                            {!notif.read && (
                                                <button 
                                                    onClick={() => markAsRead(notif.id)}
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-400">No notifications</div>
                                )}
                            </div>
                            <div className="p-2 border-t border-gray-700 text-center">
                                <Link 
                                    to="/student-activity/notifications" 
                                    className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                                >
                                    View all notifications
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile Section */}
                <Link 
                    to="/student-activity/profile" 
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
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
                        <span className="text-gray-400 text-xs">
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
