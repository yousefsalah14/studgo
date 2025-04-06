import { useState } from "react";
import WorkshopHeader from "../components/WorkshopHeader";
import WorkshopCard from "../components/WorkshopCard";
import WorkshopForm from "../components/WorkshopForm";

// Static data for workshops
const initialWorkshops = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    type: "technical",
    date: "2024-04-15",
    time: "09:00",
    capacity: 30,
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 2,
    title: "Leadership Skills Workshop",
    description: "Develop essential leadership skills for student organizations",
    type: "soft-skills",
    date: "2024-04-20",
    time: "14:00",
    capacity: 25,
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data science, Python, and machine learning",
    type: "technical",
    date: "2024-04-25",
    time: "10:00",
    capacity: 20,
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
];

function SaWorkshops() {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Filter workshops based on search term and type
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = 
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || workshop.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Handle adding a new workshop
  const handleAddWorkshop = () => {
    setSelectedWorkshop(null);
    setShowForm(true);
  };

  // Handle editing a workshop
  const handleEditWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowForm(true);
  };

  // Handle deleting a workshop
  const handleDeleteWorkshop = (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      setWorkshops(workshops.filter(workshop => workshop.id !== id));
    }
  };

  // Handle form submission
  const handleFormSubmit = (workshopData) => {
    if (selectedWorkshop) {
      // Update existing workshop
      setWorkshops(workshops.map(workshop => 
        workshop.id === selectedWorkshop.id ? workshopData : workshop
      ));
    } else {
      // Add new workshop
      setWorkshops([...workshops, workshopData]);
    }
    setShowForm(false);
    setSelectedWorkshop(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <WorkshopHeader 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange}
        onAddWorkshop={handleAddWorkshop}
        onFilterChange={handleFilterChange}
        filterType={filterType}
      />

      {filteredWorkshops.length === 0 ? (
        <div className="text-center mt-8 text-gray-400">
          <p>No workshops found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              onEdit={handleEditWorkshop}
              onDelete={handleDeleteWorkshop}
            />
          ))}
        </div>
      )}

      {showForm && (
        <WorkshopForm
          workshop={selectedWorkshop}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setSelectedWorkshop(null);
          }}
        />
      )}
    </div>
  );
}

export default SaWorkshops;
