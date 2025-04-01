import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../../store/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Building2,
  Save,
  Loader2,
  Upload,
  FileText,
  Calendar,
  Clock,
  Activity,
  ListTodo,
  Users,
  Star,
  Award,
  XCircle,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { toast } from "react-hot-toast";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://studgov1.runasp.net",
});

// Add request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  birthDate: Yup.date().required("Birth date is required"),
  contactPhoneNumber: Yup.string().required("Phone number is required"),
  fieldOfStudy: Yup.string().required("Field of study is required"),
  university: Yup.string().required("University is required"),
  faculty: Yup.string().required("Faculty is required"),
  longitude: Yup.number().nullable(),
  latitude: Yup.number().nullable(),
});

export default function Profile() {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      longitude: "",
      latitude: "",
      fieldOfStudy: "",
      contactEmail: currentUser?.email || "",
      contactPhoneNumber: "",
      birthDate: "",
      university: "",
      faculty: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.post("/student/update-profile", values);
        if (response.data) {
          toast.success("Profile updated successfully!");
        }
      } catch (error) {
        console.error("Profile update error:", error);
        toast.error(error.response?.data?.message || "Failed to update profile");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Check for token and redirect if not found
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to access your profile");
      // You can add navigation to login page here
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Profile Image */}
      <div className="relative h-screen w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-800"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-800">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Upload className="w-5 h-5 text-white" />
              </button>
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Complete your profile information to get started
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Form and CV Upload */}
          <div className="lg:col-span-2 space-y-8">
            {/* CV Upload Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                  <FileText className="w-5 h-5" />
                  CV/Resume
                </h2>
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload New CV
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white">my_resume_2024.pdf</h3>
                    <p className="text-xs text-gray-400">Uploaded on March 10, 2024</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                      <span className="text-xs text-gray-500">2.4 MB</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white p-2">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg opacity-60">
                  <div className="p-3 bg-gray-600/10 rounded-lg">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-300">old_resume.pdf</h3>
                    <p className="text-xs text-gray-400">Uploaded on January 15, 2024</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-gray-600/20 text-gray-400 text-xs rounded-full">Archived</span>
                      <span className="text-xs text-gray-500">1.8 MB</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white p-2">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <form onSubmit={formik.handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your first name"
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.firstName && formik.errors.firstName ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your last name"
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.lastName && formik.errors.lastName ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Birth Date
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.birthDate && formik.errors.birthDate ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.birthDate && formik.errors.birthDate && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.birthDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                      <Mail className="w-5 h-5" />
                      Contact Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        placeholder="Enter your email"

                        value={formik.values.contactEmail}
                        onChange={formik.handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent opacity-75 "
                      />
                      
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="contactPhoneNumber"
                        value={formik.values.contactPhoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your phone number"
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.contactPhoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          name="latitude"
                          value={formik.values.latitude}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Latitude"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          step="any"
                        />
                        <input
                          type="number"
                          name="longitude"
                          value={formik.values.longitude}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Longitude"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                      <GraduationCap className="w-5 h-5" />
                      Academic Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        University
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={formik.values.university}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your university name"
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.university && formik.errors.university ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.university && formik.errors.university && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.university}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Faculty
                      </label>
                      <input
                        type="text"
                        name="faculty"
                        value={formik.values.faculty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your faculty name"
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.faculty && formik.errors.faculty ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.faculty && formik.errors.faculty && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.faculty}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        name="fieldOfStudy"
                        value={formik.values.fieldOfStudy}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your field of study"
                        className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formik.touched.fieldOfStudy && formik.errors.fieldOfStudy ? "border-red-500" : ""
                        }`}
                      />
                      {formik.touched.fieldOfStudy && formik.errors.fieldOfStudy && (
                        <p className="mt-1 text-sm text-red-400">{formik.errors.fieldOfStudy}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Activities and Calendar */}
          <div className="space-y-8">
            {/* My Activities */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                  <Activity className="w-5 h-5" />
                  My Activities
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Student Council</h3>
                      <p className="text-sm text-gray-400">Member</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">Leadership</span>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">Active</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Tech Club</h3>
                      <p className="text-sm text-gray-400">Project Lead</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">Technical</span>
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">Project</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-lg hover:bg-gray-700/50">
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-gray-700/50">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Council Meeting</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Tomorrow, 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">15 attendees</span>
                    </div>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">Important</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Tech Workshop</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Friday, 3:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">28 attendees</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">Workshop</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                View Full Calendar
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
