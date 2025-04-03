import React from 'react';
import { Search } from 'lucide-react';

function SearchAndFilter({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        >
          <option value="All">All Categories</option>
          <option value="Workshop">Workshop</option>
          <option value="Bootcamp">Bootcamp</option>
          <option value="Seminar">Seminar</option>
        </select>
      </div>
    </div>
  );
}

export default SearchAndFilter; 