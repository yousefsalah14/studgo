import { useState } from "react";
import TalkHeader from "../components/TalkHeader";
import TalkCard from "../components/TalkCard";
import TalkForm from "../components/TalkForm";

// Static data for talks
const initialTalks = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Learn the basics of machine learning and its applications",
    type: "technical",
    date: "2024-04-10",
    time: "14:00",
    capacity: 25,
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 2,
    title: "Public Speaking Mastery",
    description: "Improve your public speaking skills and confidence",
    type: "soft-skills",
    date: "2024-04-12",
    time: "15:00",
    capacity: 20,
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
  {
    id: 3,
    title: "Web Development Best Practices",
    description: "Learn modern web development techniques and best practices",
    type: "technical",
    date: "2024-04-15",
    time: "13:00",
    capacity: 30,
    image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
  },
];

function SaTalks() {
  const [talks, setTalks] = useState(initialTalks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState(null);

  // Filter talks based on search term and type
  const filteredTalks = talks.filter(talk => {
    const matchesSearch = 
      talk.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      talk.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || talk.type === filterType;
    
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

  // Handle adding a new talk
  const handleAddTalk = () => {
    setSelectedTalk(null);
    setShowForm(true);
  };

  // Handle editing a talk
  const handleEditTalk = (talk) => {
    setSelectedTalk(talk);
    setShowForm(true);
  };

  // Handle deleting a talk
  const handleDeleteTalk = (id) => {
    if (window.confirm("Are you sure you want to delete this talk?")) {
      setTalks(talks.filter(talk => talk.id !== id));
    }
  };

  // Handle form submission
  const handleFormSubmit = (talkData) => {
    if (selectedTalk) {
      // Update existing talk
      setTalks(talks.map(talk => 
        talk.id === selectedTalk.id ? talkData : talk
      ));
    } else {
      // Add new talk
      setTalks([...talks, talkData]);
    }
    setShowForm(false);
    setSelectedTalk(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <TalkHeader 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange}
        onAddTalk={handleAddTalk}
        onFilterChange={handleFilterChange}
        filterType={filterType}
      />

      {filteredTalks.length === 0 ? (
        <div className="text-center mt-8 text-gray-400">
          <p>No talks found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredTalks.map((talk) => (
            <TalkCard
              key={talk.id}
              talk={talk}
              onEdit={handleEditTalk}
              onDelete={handleDeleteTalk}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TalkForm
          talk={selectedTalk}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setSelectedTalk(null);
          }}
        />
      )}
    </div>
  );
}

export default SaTalks;
