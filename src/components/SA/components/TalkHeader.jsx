import { ListFilter, Plus } from "lucide-react";

function TalkHeader({ searchTerm, onSearchChange, onAddTalk, onFilterChange, filterType }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Talks</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search talks..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange("all")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                filterType === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <ListFilter size={16} />
              All
            </button>
            <button
              onClick={() => onFilterChange("technical")}
              className={`px-4 py-2 rounded-lg ${
                filterType === "technical"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => onFilterChange("soft-skills")}
              className={`px-4 py-2 rounded-lg ${
                filterType === "soft-skills"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Soft Skills
            </button>
          </div>
          
          <button
            onClick={onAddTalk}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Add Talk
          </button>
        </div>
      </div>
    </div>
  );
}

export default TalkHeader; 