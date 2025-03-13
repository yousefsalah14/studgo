
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { User } from "lucide-react";

function StudentActivityHome() {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  // Fetch student activities
  async function getStudentActivities() {
    try {
      const { data } = await axios.get("https://studgov1.runasp.net/api/StudentActivity/all");
      const studentActivities = data.data || [];
      setOrganizations(studentActivities);
      setFilteredOrganizations(studentActivities);
    } catch (error) {
      console.error("Error fetching student activities:", error);
    }
  }

  useEffect(() => {
    getStudentActivities();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(
        (org) =>
          org.name?.toLowerCase().includes(query) ||
          org.email?.toLowerCase().includes(query) ||
          org.role?.toLowerCase().includes(query) ||
          org.activities?.toLowerCase().includes(query)
      );
      setFilteredOrganizations(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-800 to-black text-white flex flex-col items-center pt-12 px-6">
      {/* Hero Section */}
      <div className="relative w-full max-w-6xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <img
          src="src/assets/download.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 flex flex-col items-center text-center py-24 px-8 space-y-6">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Explore Student Activities
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Find the best student organizations to enhance your skills and grow your network.
          </p>
          {/* Search Bar */}
          <div className="relative w-full max-w-lg">
            <div className="flex items-center bg-gray-800 rounded-full shadow-lg overflow-hidden px-4 py-3 border border-gray-600 focus-within:ring-2 focus-within:ring-blue-400">
              <FiSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => {
                  setSearchQuery("");
                  setFilteredOrganizations(organizations);
                }}>
                  <FiX className="text-gray-400 hover:text-gray-300" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Organization List */}
      <div className="w-full max-w-5xl px-6 mt-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((org) => (
              <li
                key={org.id}
                className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700"
              >
                <Link to={`/studentactivity/${org.id}`} className="flex flex-col items-center text-center space-y-4">
                {org.pictureUrl == null ? 
                  <img
                    alt={org.name}
                    src={org.pictureUrl }
                    className="w-24 h-24 rounded-full border-4 border-gray-500 shadow-lg hover:scale-105 transition-transform"
                  /> :
                  <User size={24} className="text-white" /> }
                  <div>
                    <p className="text-lg font-semibold text-white">{org.name}</p>
                    <p className="text-sm text-gray-400">{org.contactEmail}</p>
                    <p className="text-sm text-gray-400">Phone: {org.contactPhoneNumber}</p>
                    <p className="text-sm text-gray-400">City: {org.city}</p>
                  </div>
                </Link>
                {org.lastActivity && (
                  <p className="text-xs text-gray-400 mt-4">Last activity: <time>{org.lastActivity}</time></p>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center py-6 col-span-full">No organizations found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default StudentActivityHome;