import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Calendar, 
  Users, 
  Filter,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

const ACTIVITIES_DATA = [
  {
    id: 1,
    title: "Web Development Workshop",
    description: "Learn the basics of web development with HTML, CSS, and JavaScript",
    date: "2025-05-15",
    location: "Computer Lab 101",
    capacity: 30,
    registered: 18,
    category: "Workshop",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "AI Ethics Talk",
    description: "Discussion on ethical considerations in artificial intelligence",
    date: "2025-05-20",
    location: "Auditorium B",
    capacity: 100,
    registered: 65,
    category: "Talk",
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Hands-on workshop for building mobile applications",
    date: "2025-04-05",
    location: "Innovation Hub",
    capacity: 25,
    registered: 25,
    category: "Workshop",
    status: "Completed"
  },
  {
    id: 4,
    title: "Cybersecurity Seminar",
    description: "Learn about protecting digital assets and information security",
    date: "2025-06-10",
    location: "Conference Room 3",
    capacity: 50,
    registered: 12,
    category: "Seminar",
    status: "Upcoming"
  },
  {
    id: 5,
    title: "Data Science Bootcamp",
    description: "Intensive training on data analysis and machine learning",
    date: "2025-04-01",
    location: "Computer Lab 203",
    capacity: 20,
    registered: 20,
    category: "Bootcamp",
    status: "Completed"
  }
];

function SaActivities() {
  const [activities, setActivities] = useState(ACTIVITIES_DATA);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    category: "Workshop",
    status: "Upcoming"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { apiRequest } = useAuthStore();

  // Filter activities based on search query and filters
  useEffect(() => {
    let result = activities;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        activity => 
          activity.title.toLowerCase().includes(query) || 
          activity.description.toLowerCase().includes(query) ||
          activity.location.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter(activity => activity.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter(activity => activity.category === categoryFilter);
    }
    
    setFilteredActivities(result);
  }, [activities, searchQuery, statusFilter, categoryFilter]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

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
      title: "",
      description: "",
      date: "",
      location: "",
      capacity: "",
      category: "Workshop",
      status: "Upcoming"
    });
    setIsAddModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (activity) => {
    setCurrentActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      date: activity.date,
      location: activity.location,
      capacity: activity.capacity,
      category: activity.category,
      status: activity.status
    });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (activity) => {
    setCurrentActivity(activity);
    setIsDeleteModalOpen(true);
  };

  // Handle add activity
  const handleAddActivity = (e) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    const newActivity = {
      id: activities.length + 1,
      ...formData,
      registered: 0
    };
    
    setActivities([...activities, newActivity]);
    setIsAddModalOpen(false);
    
    // Example API call (commented out)
    // try {
    //   const response = await apiRequest('/activities', 'POST', formData);
    //   setActivities([...activities, response.data]);
    // } catch (error) {
    //   console.error('Error adding activity:', error);
    // }
  };

  // Handle edit activity
  const handleEditActivity = (e) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    const updatedActivities = activities.map(activity => 
      activity.id === currentActivity.id 
        ? { ...activity, ...formData } 
        : activity
    );
    
    setActivities(updatedActivities);
    setIsEditModalOpen(false);
    
    // Example API call (commented out)
    // try {
    //   await apiRequest(`/activities/${currentActivity.id}`, 'PUT', formData);
    //   const updatedActivities = activities.map(activity => 
    //     activity.id === currentActivity.id 
    //       ? { ...activity, ...formData } 
    //       : activity
    //   );
    //   setActivities(updatedActivities);
    // } catch (error) {
    //   console.error('Error updating activity:', error);
    // }
  };

  // Handle delete activity
  const handleDeleteActivity = () => {
    // In a real app, you would make an API call here
    const updatedActivities = activities.filter(
      activity => activity.id !== currentActivity.id
    );
    
    setActivities(updatedActivities);
    setIsDeleteModalOpen(false);
    
    // Example API call (commented out)
    // try {
    //   await apiRequest(`/activities/${currentActivity.id}`, 'DELETE');
    //   const updatedActivities = activities.filter(
    //     activity => activity.id !== currentActivity.id
    //   );
    //   setActivities(updatedActivities);
    // } catch (error) {
    //   console.error('Error deleting activity:', error);
    // }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Activities</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Activity
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search activities..."
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
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <select
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Talk">Talk</option>
              <option value="Bootcamp">Bootcamp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {currentItems.length > 0 ? (
                currentItems.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{activity.title}</span>
                        <span className="text-xs text-gray-400">{activity.description.substring(0, 50)}...</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {activity.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-400">
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        activity.status === 'Upcoming' 
                          ? 'bg-green-900/30 text-green-400' 
                          : activity.status === 'Completed' 
                            ? 'bg-gray-700 text-gray-400' 
                            : 'bg-red-900/30 text-red-400'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-300">
                          {activity.registered}/{activity.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(activity)}
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(activity)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                    No activities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredActivities.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-700">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredActivities.length)} of {filteredActivities.length} activities
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

      {/* Add Activity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Add New Activity</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddActivity} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Talk">Talk</option>
                    <option value="Bootcamp">Bootcamp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
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
                  Add Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Activity Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Edit Activity</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditActivity} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Talk">Talk</option>
                    <option value="Bootcamp">Bootcamp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Confirm Delete</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete "{currentActivity?.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteActivity}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaActivities;
