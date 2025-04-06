import { X } from "lucide-react";

function WorkshopForm({ workshop, onSubmit, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const workshopData = {
      id: workshop?.id || Date.now(),
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      date: formData.get("date"),
      time: formData.get("time"),
      capacity: parseInt(formData.get("capacity")),
      image: formData.get("image") || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
    };
    onSubmit(workshopData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            {workshop ? "Edit Workshop" : "Add Workshop"}
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
              defaultValue={workshop?.title}
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
              defaultValue={workshop?.description}
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
              defaultValue={workshop?.image}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {workshop?.image && (
              <div className="mt-2">
                <img
                  src={workshop.image}
                  alt="Workshop preview"
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
              defaultValue={workshop?.type || "technical"}
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
                defaultValue={workshop?.date}
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
                defaultValue={workshop?.time}
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
              defaultValue={workshop?.capacity || 20}
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
              {workshop ? "Update" : "Add"} Workshop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkshopForm; 