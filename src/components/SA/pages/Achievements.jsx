import React, { useState } from 'react';
import { Award, XCircle, Plus, Calendar, FileText } from 'lucide-react';

const Achievements = ({ achievements, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!newAchievement.title || !newAchievement.date || !newAchievement.description) {
      return; // Don't submit if fields are empty
    }
    onAdd(newAchievement);
    setNewAchievement({ title: '', date: '', description: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
          <Award className="w-5 h-5" />
          Achievements
        </h2>
        <button 
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New'}
          {showForm ? <XCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Add Achievement Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-700/50 rounded-xl">
          <h3 className="text-lg font-medium text-blue-300 mb-4">Add New Achievement</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" /> Title
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={newAchievement.title}
                onChange={handleInputChange}
                placeholder="Enter achievement title"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Date
                </span>
              </label>
              <input
                type="date"
                name="date"
                value={newAchievement.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Description
                </span>
              </label>
              <textarea
                name="description"
                value={newAchievement.description}
                onChange={handleInputChange}
                placeholder="Enter achievement description"
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Add Achievement
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <div key={index} className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button 
                  className="text-red-400 hover:text-red-300"
                  onClick={() => onDelete(achievement.id)}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-300 mt-2">{achievement.description}</p>
            </div>
          ))
        ) : (
          <div className="p-4 bg-gray-700/30 rounded-xl text-center">
            <p className="text-gray-400">No achievements added yet.</p>
            <p className="text-sm text-gray-500 mt-2">Add your first achievement by clicking the "Add New" button above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
