import { CalendarDays, Handshake, Home, Laptop, Podcast, Presentation, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    items: [
      { name: "Home", link: "/student-activity", icon: <Home size={15} /> },
      { name: "Events", link: "/student-activity/events", icon: <Presentation size={15} /> },
      { name: "Workshops", link: "/student-activity/workshops", icon: <Laptop size={15} /> },
      { name: "Talks", link: "/student-activity/talks", icon: <Podcast size={15} /> },
      { name: "Calendar", link: "/student-activity/calendar", icon: <CalendarDays size={15} /> },
      { name: "Student Activities", link: "/student-activity/student-activities", icon: <Handshake size={15} /> },
      { name: "Activities", link: "/student-activity/activities", icon: <Activity size={15} /> }, // Added Activities
      { name: "Followers", link: "/student-activity/followers", icon: <Users size={15} /> }, // Added Followers
      { name: "Teams", link: "/student-activity/teams", icon: <Users size={15} /> }, // Added Teams
    ],
  },
];



function MenuItems() {
  return (
    <div className="flex flex-col space-y-5 text-lg">
      {menuItems.map((item, index) => (
        <div key={index} className="space-y-3">
          <span className="hidden lg:block text-sm font-light text-gray-400 mt-6">{item.title}</span>
          <ul className="flex flex-col space-y-3 p-2 gap-2 font-semibold">
            {item.items.map((menu, i) => (
              <li key={i} className="flex items-center">
                <Link
                  to={menu.link}
                  className="relative flex items-center text-white hover:text-blue-600 transition-all py-2 pl-8"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2">{menu.icon}</span>
                  <span className="hidden md:block lg:block">{menu.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MenuItems;
