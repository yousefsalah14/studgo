import { X } from "lucide-react";

function TalkForm({ talk, onSubmit, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const talkData = {
      id: talk?.id || Date.now(),
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      date: formData.get("date"),
      time: formData.get("time"),
      capacity: parseInt(formData.get("capacity")),
      image: formData.get("image") || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
    };
    onSubmit(talkData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            {talk ? "Edit Talk" : "Add Talk"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={talk?.title}
              required
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={talk?.description}
              required
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              defaultValue={talk?.image}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {talk?.image && (
              <div className="mt-2">
                <img
                  src={talk.image}
                  alt="Talk preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type
            </label>
            <select
              name="type"
              defaultValue={talk?.type || "technical"}
              required
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="technical">Technical</option>
              <option value="soft-skills">Soft Skills</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={talk?.date}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                defaultValue={talk?.time}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              defaultValue={talk?.capacity || 20}
              required
              min="1"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {talk ? "Update" : "Add"} Talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TalkForm; 