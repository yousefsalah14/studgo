import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import HeroSection from '../components/StudentActivity/HeroSection';
import StatsSection from '../components/StudentActivity/StatsSection';
import SearchAndFilterSection from '../components/StudentActivity/SearchAndFilterSection';
import OrganizationsGrid from '../components/StudentActivity/OrganizationsGrid';
import FeaturedOrganizationsSection from '../components/StudentActivity/FeaturedOrganizationsSection';

function StudentActivityHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch student activities using React Query
  const { data: organizations = [], isLoading, error } = useQuery(
    "studentActivities",
    async () => {
      const { data } = await axios.get("https://studgov1.runasp.net/api/StudentActivity/all");
      return data.data || [];
    }
  );

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
          org.contactEmail?.toLowerCase().includes(query) ||
          org.role?.toLowerCase().includes(query) ||
          org.description?.toLowerCase().includes(query)
      );
      setFilteredOrganizations(filtered);
    }
  };

  // Update filtered organizations when organizations data changes
  useEffect(() => {
    setFilteredOrganizations(organizations);
  }, [organizations]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500">
          Failed to load student activities. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto">
      <HeroSection />
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-6 space-y-8">
        <StatsSection organizationsCount={organizations.length} />
        <SearchAndFilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setFilteredOrganizations={setFilteredOrganizations}
          organizations={organizations}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <OrganizationsGrid filteredOrganizations={filteredOrganizations} />
        {filteredOrganizations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No organizations found matching your search.</p>
          </div>
        )}
        <FeaturedOrganizationsSection organizations={organizations} />
      </div>
    </div>
  );
}

export default StudentActivityHome;