import { CalendarDays, Handshake, Home, Laptop, Podcast, Presentation, Users, Activity, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    items: [
      { name: "Home", link: "/student-activity", icon: <Home size={18} /> },
      { name: "Events", link: "/student-activity/events", icon: <Presentation size={18} /> },
      { name: "Workshops", link: "/student-activity/workshops", icon: <Laptop size={18} /> },
      { name: "Talks", link: "/student-activity/talks", icon: <Podcast size={18} /> },
      { name: "Calendar", link: "/student-activity/calendar", icon: <CalendarDays size={18} /> },
      { name: "Student Activities", link: "/student-activity/student-activities", icon: <Handshake size={18} /> },
      { name: "Activities", link: "/student-activity/activities", icon: <Activity size={18} /> },
      { name: "Followers", link: "/student-activity/followers", icon: <Users size={18} /> },
      { name: "Teams", link: "/student-activity/teams", icon: <Users size={18} /> },
      { name: "Profile", link: "/student-activity/profile", icon: <UserCircle size={18} /> },
    ],
  },
];

function MenuItems({ isCollapsed }) {
  const location = useLocation();
  
  return (
    <div className="flex flex-col py-1">
      {menuItems.map((item, index) => (
        <div key={index}>
          {!isCollapsed && (
            <span className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              {item.title}
            </span>
          )}
          <ul>
            {item.items.map((menu, i) => {
              const isActive = location.pathname === menu.link;
              return (
                <li key={i}>
                  <Link
                    to={menu.link}
                    className={`flex items-center px-4 py-3 text-sm rounded-md transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className={`${isActive ? 'text-white ' : 'text-gray-400'} mr-3`}>
                      {menu.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="font-medium text-xl">{menu.name}</span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-16 text-lg bg-white text-gray-900  py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {menu.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MenuItems;
