import { useState, useEffect } from "react";
import { 
  Search, 
  UserPlus, 
  UserMinus, 
  Mail, 
  Filter,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

// Mock data for followers
const FOLLOWERS_DATA = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    department: "Computer Science",
    year: "3rd Year",
    joinDate: "2024-09-15",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima.ali@example.com",
    department: "Engineering",
    year: "2nd Year",
    joinDate: "2024-10-03",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "Omar Khalid",
    email: "omar.khalid@example.com",
    department: "Business",
    year: "4th Year",
    joinDate: "2024-08-22",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "Layla Mohamed",
    email: "layla.mohamed@example.com",
    department: "Medicine",
    year: "1st Year",
    joinDate: "2024-11-10",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "Youssef Ibrahim",
    email: "youssef.ibrahim@example.com",
    department: "Computer Science",
    year: "3rd Year",
    joinDate: "2024-09-05",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: 6,
    name: "Nour Ahmed",
    email: "nour.ahmed@example.com",
    department: "Arts",
    year: "2nd Year",
    joinDate: "2024-10-15",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

function SaFollowers() {
  const [followers, setFollowers] = useState(FOLLOWERS_DATA);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentFollower, setCurrentFollower] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Computer Science",
    year: "1st Year",
    status: "Active"
  });
  const { apiRequest } = useAuthStore();

  // Filter followers based on search query and filters
  useEffect(() => {
    let result = followers;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        follower => 
          follower.name.toLowerCase().includes(query) || 
          follower.email.toLowerCase().includes(query) ||
          follower.department.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter(follower => follower.status === statusFilter);
    }
    
    // Apply department filter
    if (departmentFilter !== "All") {
      result = result.filter(follower => follower.department === departmentFilter);
    }
    
    setFilteredFollowers(result);
  }, [followers, searchQuery, statusFilter, departmentFilter]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFollowers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFollowers.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      department: "Computer Science",
      year: "1st Year",
      status: "Active"
    });
    setIsAddModalOpen(true);
  };

  // Open remove modal
  const openRemoveModal = (follower) => {
    setCurrentFollower(follower);
    setIsRemoveModalOpen(true);
  };

  // Handle add follower
  const handleAddFollower = (e) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    const newFollower = {
      id: followers.length + 1,
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50) + 1}.jpg`
    };
    
    setFollowers([...followers, newFollower]);
    setIsAddModalOpen(false);
    
    // Example API call (commented out)
    // try {
    //   const response = await apiRequest('/followers', 'POST', formData);
    //   setFollowers([...followers, response.data]);
    // } catch (error) {
    //   console.error('Error adding follower:', error);
    // }
  };

  // Handle remove follower
  const handleRemoveFollower = () => {
    // In a real app, you would make an API call here
    const updatedFollowers = followers.filter(
      follower => follower.id !== currentFollower.id
    );
    
    setFollowers(updatedFollowers);
    setIsRemoveModalOpen(false);
    
    // Example API call (commented out)
    // try {
    //   await apiRequest(`/followers/${currentFollower.id}`, 'DELETE');
    //   const updatedFollowers = followers.filter(
    //     follower => follower.id !== currentFollower.id
    //   );
    //   setFollowers(updatedFollowers);
    // } catch (error) {
    //   console.error('Error removing follower:', error);
    // }
  };

  // Get unique departments for filter
  const departments = [...new Set(followers.map(follower => follower.department))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Followers</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={18} className="mr-2" />
          Add Follower
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search followers..."
              className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="w-full md:w-48">
            <select
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Followers List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {currentItems.length > 0 ? (
            currentItems.map((follower) => (
              <div key={follower.id} className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <div className="p-4 flex items-center space-x-4">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{follower.name}</h3>
                    <p className="text-gray-400 text-sm">{follower.department}</p>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        follower.status === 'Active' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {follower.status}
                      </span>
                      <span className="text-gray-500 text-xs ml-2">{follower.year}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-600 px-4 py-3 flex justify-between">
                  <a
                    href={`mailto:${follower.email}`}
                    className="text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    <Mail size={16} className="mr-1" />
                    <span className="text-sm">Contact</span>
                  </a>
                  <button
                    onClick={() => openRemoveModal(follower)}
                    className="text-red-400 hover:text-red-300 flex items-center"
                  >
                    <UserMinus size={16} className="mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-400">
              No followers found
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredFollowers.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-700">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFollowers.length)} of {filteredFollowers.length} followers
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Follower Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Add New Follower</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddFollower} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Year
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Follower
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Confirm Remove</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">
                Are you sure you want to remove "{currentFollower?.name}" from your followers? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveFollower}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaFollowers;
