import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  X, 
  MoreVertical, 
  Edit, 
  Trash, 
  Users, 
  ArrowUpDown,
  ChevronDown,
  UserPlus
} from "lucide-react";

// Mock team data
const teamsData = [
  {
    id: 1,
    name: "Web Development Team",
    description: "Responsible for developing and maintaining the student portal website",
    members: 8,
    leader: "Ahmed Hassan",
    leaderAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    createdAt: "2023-09-15",
    tags: ["web", "frontend", "backend"],
    avatar: "https://img.icons8.com/color/96/000000/code.png"
  },
  {
    id: 2,
    name: "Design Team",
    description: "Creates visual content for student activities and events",
    members: 6,
    leader: "Sara Ahmed",
    leaderAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    createdAt: "2023-10-05",
    tags: ["design", "ui/ux", "graphics"],
    avatar: "https://img.icons8.com/color/96/000000/design.png"
  },
  {
    id: 3,
    name: "Event Planning Committee",
    description: "Plans and organizes student events and activities",
    members: 12,
    leader: "Omar Khaled",
    leaderAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    createdAt: "2023-08-20",
    tags: ["events", "planning", "coordination"],
    avatar: "https://img.icons8.com/color/96/000000/calendar.png"
  },
  {
    id: 4,
    name: "Marketing Team",
    description: "Promotes student activities and manages social media",
    members: 5,
    leader: "Nour Mahmoud",
    leaderAvatar: "https://randomuser.me/api/portraits/women/29.jpg",
    createdAt: "2023-11-10",
    tags: ["marketing", "social media", "promotion"],
    avatar: "https://img.icons8.com/color/96/000000/commercial.png"
  },
  {
    id: 5,
    name: "Technical Support Team",
    description: "Provides technical support for student activities and events",
    members: 4,
    leader: "Karim Adel",
    leaderAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    createdAt: "2023-07-30",
    tags: ["technical", "support", "it"],
    avatar: "https://img.icons8.com/color/96/000000/technical-support.png"
  },
  {
    id: 6,
    name: "Content Creation Team",
    description: "Creates content for student activities website and social media",
    members: 7,
    leader: "Laila Mohamed",
    leaderAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    createdAt: "2023-12-05",
    tags: ["content", "writing", "media"],
    avatar: "https://img.icons8.com/color/96/000000/content.png"
  }
];

function SaTeams() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setTeams(teamsData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get all unique tags from teams
  const allTags = Array.from(
    new Set(teamsData.flatMap(team => team.tags))
  ).sort();

  // Filter and sort teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === "all" || team.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "members") {
      comparison = a.members - b.members;
    } else if (sortBy === "date") {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle tag filter change
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setIsFilterMenuOpen(false);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Handle team selection
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setShowTeamModal(true);
  };

  // Handle team action (edit/delete)
  const handleTeamAction = (action, team, e) => {
    e.stopPropagation();
    
    if (action === "edit") {
      // In a real app, this would open the edit form
      alert(`Edit team: ${team.name}`);
    } else if (action === "delete") {
      // In a real app, this would delete the team after confirmation
      if (window.confirm(`Are you sure you want to delete ${team.name}?`)) {
        setTeams(teams.filter(t => t.id !== team.id));
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header with search and filters */}
      <div className="mb-6 bg-gray-800 p-4 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">Teams</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search teams..."
                className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            
            {/* Filter Button */}
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                <Filter size={18} />
                <span>Filter</span>
                <ChevronDown size={16} />
              </button>
              
              {/* Filter Dropdown */}
              {isFilterMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700">
                  <div className="p-2 max-h-60 overflow-y-auto">
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${selectedTag === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      onClick={() => handleTagChange('all')}
                    >
                      All Teams
                    </button>
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        className={`w-full text-left px-3 py-2 rounded-md ${selectedTag === tag ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => handleTagChange(tag)}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* View Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-700">
              <button
                className={`px-3 py-2 flex items-center gap-1 ${
                  viewMode === 'grid' 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                className={`px-3 py-2 flex items-center gap-1 ${
                  viewMode === 'list' 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setViewMode('list')}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
            
            {/* Add Team Button */}
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSelectedTeam(null);
                setShowTeamModal(true);
              }}
            >
              <Plus size={18} />
              <span>Add Team</span>
            </button>
          </div>
        </div>
        
        {/* Active Filters */}
        {selectedTag !== 'all' && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-400 mr-2">Filters:</span>
            <div className="flex items-center bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              {selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)}
              <button
                className="ml-2 text-blue-400 hover:text-blue-300"
                onClick={() => handleTagChange('all')}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredTeams.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center">
          <Users size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No teams found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={() => {
              setSearchTerm("");
              setSelectedTag("all");
            }}
          >
            <X size={18} />
            <span>Clear Filters</span>
          </button>
        </div>
      ) : (
        <>
          {/* List View */}
          {viewMode === 'list' && (
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gray-750">
                <div className="col-span-4 flex items-center">
                  <button 
                    className="font-medium text-white flex items-center gap-1"
                    onClick={() => handleSortChange('name')}
                  >
                    Team Name
                    <ArrowUpDown size={14} className={sortBy === 'name' ? 'text-blue-400' : 'text-gray-500'} />
                  </button>
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="font-medium text-white">Leader</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <button 
                    className="font-medium text-white flex items-center gap-1"
                    onClick={() => handleSortChange('members')}
                  >
                    Members
                    <ArrowUpDown size={14} className={sortBy === 'members' ? 'text-blue-400' : 'text-gray-500'} />
                  </button>
                </div>
                <div className="col-span-2 flex items-center">
                  <button 
                    className="font-medium text-white flex items-center gap-1"
                    onClick={() => handleSortChange('date')}
                  >
                    Created
                    <ArrowUpDown size={14} className={sortBy === 'date' ? 'text-blue-400' : 'text-gray-500'} />
                  </button>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <span className="font-medium text-white">Actions</span>
                </div>
              </div>
              
              {/* Table Body */}
              {filteredTeams.map(team => (
                <div 
                  key={team.id} 
                  className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors"
                  onClick={() => handleSelectTeam(team)}
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                      <img src={team.avatar} alt={team.name} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{team.name}</h3>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{team.description}</p>
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={team.leaderAvatar} alt={team.leader} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-gray-300">{team.leader}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-gray-300">{team.members}</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-300">{new Date(team.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <div className="relative group">
                      <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                        <MoreVertical size={16} />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700 hidden group-hover:block">
                        <button
                          className="w-full flex items-center gap-2 p-3 text-left text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={(e) => handleTeamAction('edit', team, e)}
                        >
                          <Edit size={16} />
                          <span>Edit Team</span>
                        </button>
                        <button
                          className="w-full flex items-center gap-2 p-3 text-left text-red-400 hover:bg-gray-700 transition-colors"
                          onClick={(e) => handleTeamAction('delete', team, e)}
                        >
                          <Trash size={16} />
                          <span>Delete Team</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map(team => (
                <div 
                  key={team.id} 
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-700 hover:border-gray-600"
                  onClick={() => handleSelectTeam(team)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          <img src={team.avatar} alt={team.name} className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{team.name}</h3>
                          <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                            <Users size={14} />
                            <span>{team.members} members</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative group">
                        <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700">
                          <MoreVertical size={16} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700 hidden group-hover:block">
                          <button
                            className="w-full flex items-center gap-2 p-3 text-left text-gray-300 hover:bg-gray-700 transition-colors"
                            onClick={(e) => handleTeamAction('edit', team, e)}
                          >
                            <Edit size={16} />
                            <span>Edit Team</span>
                          </button>
                          <button
                            className="w-full flex items-center gap-2 p-3 text-left text-red-400 hover:bg-gray-700 transition-colors"
                            onClick={(e) => handleTeamAction('delete', team, e)}
                          >
                            <Trash size={16} />
                            <span>Delete Team</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mt-4 line-clamp-2">{team.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {team.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src={team.leaderAvatar} alt={team.leader} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Team Leader</p>
                          <p className="text-sm text-gray-300">{team.leader}</p>
                        </div>
                      </div>
                      <button className="p-2 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-500/10 transition-colors">
                        <UserPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {selectedTeam ? 'Team Details' : 'Create New Team'}
              </h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowTeamModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {selectedTeam ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img src={selectedTeam.avatar} alt={selectedTeam.name} className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedTeam.name}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTeam.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Description</h4>
                  <p className="text-gray-300">{selectedTeam.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Team Leader</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={selectedTeam.leaderAvatar} alt={selectedTeam.leader} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{selectedTeam.leader}</p>
                        <p className="text-sm text-gray-400">Team Leader</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Team Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Members:</span>
                        <span className="text-white font-medium">{selectedTeam.members}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Created:</span>
                        <span className="text-white font-medium">{new Date(selectedTeam.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-sm text-gray-400 mb-3">Team Members</h4>
                  <p className="text-gray-300 text-center py-4">In a real application, this would show a list of team members.</p>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      // In a real app, this would open the edit form
                      alert('Edit functionality would go here');
                    }}
                  >
                    Edit Team
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => {
                      // In a real app, this would delete the team
                      if (window.confirm(`Are you sure you want to delete ${selectedTeam.name}?`)) {
                        setTeams(teams.filter(t => t.id !== selectedTeam.id));
                        setShowTeamModal(false);
                      }
                    }}
                  >
                    Delete Team
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Users size={48} className="mx-auto text-gray-600 mb-4" />
                <h4 className="text-lg font-medium text-white mb-2">Create Team Form</h4>
                <p className="mb-4">In a real application, this would be a form to create a new team.</p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setShowTeamModal(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SaTeams;
