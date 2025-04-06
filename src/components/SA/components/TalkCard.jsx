import { Calendar, Clock, Users, Edit2, Trash2 } from "lucide-react";

function TalkCard({ talk, onEdit, onDelete }) {
  const getTypeColor = () => {
    switch (talk.type) {
      case "technical":
        return "bg-blue-500 text-white";
      case "soft-skills":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={talk.image || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
          alt={talk.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(talk)}
            className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(talk.id)}
            className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-2">{talk.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor()}`}>
            {talk.type === "technical" ? "Technical" : "Soft Skills"}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4">{talk.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="mr-2 text-blue-400" />
            <span>{talk.date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock size={16} className="mr-2 text-green-400" />
            <span>{talk.time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Users size={16} className="mr-2 text-purple-400" />
            <span>Capacity: {talk.capacity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalkCard; 