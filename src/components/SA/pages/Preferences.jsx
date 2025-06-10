import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/axios";
import { User, MapPin, University, BookOpen } from "lucide-react";

const questions = [
  { key: "cvBio", label: "How important is a detailed CV/Bio?", icon: <User className="inline-block mr-2 text-blue-400" size={20} /> },
  { key: "location", label: "Do you prefer students from the same location?", icon: <MapPin className="inline-block mr-2 text-green-400" size={20} /> },
  { key: "university", label: "Do you prefer students from the same university?", icon: <University className="inline-block mr-2 text-purple-400" size={20} /> },
  { key: "faculty", label: "Do you prefer students from the same faculty?", icon: <BookOpen className="inline-block mr-2 text-pink-400" size={20} /> },
];

function Preferences() {
  const [values, setValues] = useState({ cvBio: 0, location: 0, university: 0, faculty: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance().get("/sa/preferences")
      .then(res => {
        if (res.data?.isSuccess && res.data.data) {
          setValues({
            cvBio: res.data.data.cvBio ?? 0,
            location: res.data.data.location ?? 0,
            university: res.data.data.university ?? 0,
            faculty: res.data.data.faculty ?? 0,
          });
        } else {
          setError("Failed to load preferences.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load preferences.");
        setLoading(false);
      });
  }, []);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setError("");
    setSuccess("");
    setSaving(true);
    axiosInstance().post("/sa/preferences", values)
      .then(res => {
        if (res.data?.isSuccess) {
          setSuccess("Preferences updated successfully!");
        } else {
          setError("Failed to update preferences.");
        }
        setSaving(false);
      })
      .catch(() => {
        setError("Failed to update preferences.");
        setSaving(false);
      });
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><div className="loader"></div></div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-gray-900 to-blue-900 py-10 px-2">
      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative">
        <h2 className="text-3xl font-extrabold mb-2 text-white drop-shadow">Preferences</h2>
        <p className="text-gray-300 mb-8 text-lg">Customize how you want to match with other students. Move the sliders to set your preferences.</p>
        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.key} className="mb-2">
              <label className="block mb-3 text-lg font-semibold text-white flex items-center">
                {q.icon} {q.label}
              </label>
              <div className="relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  value={values[q.key]}
                  onChange={e => handleChange(q.key, Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg appearance-none transition-all duration-300 focus:outline-none slider-thumb"
                  style={{ accentColor: '#3b82f6' }}
                />
                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-8 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transition-all duration-300"
                  style={{ left: `${(values[q.key] / 5) * 100}%`, transform: `translate(-50%, -50%)` }}
                >
                  {values[q.key]} / 5
                </span>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="text-red-400 mt-6 text-center animate-pulse">{error}</div>}
        {success && <div className="text-green-400 mt-6 text-center animate-bounce">{success}</div>}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`mt-8 w-full py-3 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {saving ? (
            <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Saving...</span>
          ) : (
            "Save Preferences"
          )}
        </button>
      </div>
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #3b82f6 40%, #a78bfa 100%);
          border-radius: 50%;
          box-shadow: 0 2px 8px #0003;
          border: 3px solid #fff;
          transition: background 0.3s;
        }
        .slider-thumb::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #3b82f6 40%, #a78bfa 100%);
          border-radius: 50%;
          box-shadow: 0 2px 8px #0003;
          border: 3px solid #fff;
          transition: background 0.3s;
        }
        .slider-thumb::-ms-thumb {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #3b82f6 40%, #a78bfa 100%);
          border-radius: 50%;
          box-shadow: 0 2px 8px #0003;
          border: 3px solid #fff;
          transition: background 0.3s;
        }
        .loader {
          border: 6px solid #e0e7ef;
          border-top: 6px solid #6366f1;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Preferences; 