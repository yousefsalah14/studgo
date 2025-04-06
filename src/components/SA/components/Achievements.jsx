import { Award, XCircle } from "lucide-react";

export default function Achievements({ achievements, onAdd, onDelete }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
          <Award className="w-5 h-5" />
          Achievements
        </h2>
        <button 
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          onClick={onAdd}
        >
          Add New
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

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
          </div>
        )}
      </div>
    </div>
  );
}