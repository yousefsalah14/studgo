import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../../lib/axios";
import axios from "axios";
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
  ChevronLeft,
  Search
} from "lucide-react";
import { toast } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Fix for the default marker icon in react-leaflet
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Map click handler component
function MapClickHandler({ onLocationSelect }) {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        // Reverse geocoding to get address from coordinates
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        if (data.display_name) {
          onLocationSelect(data.display_name, lat, lng);
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error);
        toast.error('Failed to get location address');
      }
    }
  });
  return null;
}

// Map and search component
function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState([30.0444, 31.2357]); // Default to Cairo
  const [map, setMap] = useState(null);

  const handleMapLocationSelect = (address, lat, lng) => {
    setPosition([lat, lng]);
    onLocationSelect(address, lat, lng);
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          ref={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler onLocationSelect={handleMapLocationSelect} />
          <Marker position={position} icon={defaultIcon} />
        </MapContainer>
      </div>
      <p className="text-sm text-gray-400">Click anywhere on the map to select a location.</p>
    </div>
  );
}

// Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  birthDate: Yup.date().required("Birth date is required"),
  contactPhoneNumber: Yup.string().required("Phone number is required"),
  contactEmail: Yup.string().email("Invalid email").required("Email is required"),
  fieldOfStudy: Yup.string().required("Field of study is required"),
  university: Yup.string().required("University is required"),
  faculty: Yup.string().required("Faculty is required"),
  address: Yup.string().required("Address is required"),
  longitude: Yup.number().nullable(),
  latitude: Yup.number().nullable(),
});

export default function Profile() {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      longitude: null,
      latitude: null,
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
        const api = axiosInstance();
        const response = await api.post("/student/update-profile", values);
        if (response.data.isSuccess) {
          setIsProfileSaved(true); // Enable upload buttons only after successful profile save
          toast.success(response.data.message || "Profile updated successfully!");
          // After successful update, fetch the profile data
          fetchProfileData();
        } else {
          toast.error(response.data.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Profile update error:", error);
        const errorMessage = error.response?.data?.message || error.response?.data?.errors?.join(", ") || "Failed to update profile";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleLocationSelect = (address, lat, lng) => {
    formik.setFieldValue('address', address);
    formik.setFieldValue('latitude', lat);
    formik.setFieldValue('longitude', lng);
  };

  // Function to fetch profile data
  const fetchProfileData = async () => {
    try {
      const api = axiosInstance();
      const response = await api.get("/student/profile");
      
      if (response.data.isSuccess) {
        const data = response.data.data;
        setProfileData(data);
        
        // Check if profile is completed by verifying all required fields exist
        const isProfileComplete = data && 
          data.firstName && 
          data.lastName && 
          data.birthDate && 
          data.contactPhoneNumber && 
          data.contactEmail && 
          data.fieldOfStudy && 
          data.university && 
          data.faculty && 
          data.address;
        
        // If profile is complete, enable the upload buttons
        setIsProfileSaved(isProfileComplete);
        
        // If there is profile data, show the profile card
        if (data) {
          setShowProfileCard(true);
          
          // Populate form with existing data
          formik.setValues({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split("T")[0] : "",
            contactPhoneNumber: data.contactPhoneNumber || "",
            contactEmail: data.contactEmail || currentUser?.email || "",
            fieldOfStudy: data.fieldOfStudy || "",
            university: data.university || "",
            faculty: data.faculty || "",
            address: data.address || "",
            longitude: data.longitude || null,
            latitude: data.latitude || null,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      const errorMsg = error.response?.data?.message || "Failed to fetch profile data";
      toast.error(errorMsg);
    }
  };

  const handleCVUpload = async (event) => {
    if (!isProfileSaved) return; // Don't proceed if profile isn't saved

    const file = event.target.files[0];
    if (!file) return;

    // Accept common document and image formats (including images for testing)
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF, Word document, or image file");
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setUploadingCV(true);
    const formData = new FormData();
    // Try a different field name - in many APIs, the field is expected to be named based on the purpose
    formData.append('CV', file);
    
    console.log("CV Upload - File info:", {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Get the token for authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("You must be logged in to upload a CV");
      setUploadingCV(false);
      return;
    }
    
    try {
      // Use direct axios instead of axiosInstance to bypass any potential issues
      const baseURL = "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net/api";
      const url = `${baseURL}/student/upload-cv`;
      
      console.log(`Attempting CV upload to: ${url}`);
      
      // Try with 'Bearer ' prefix for the token
      const response = await axios.post(url, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("CV upload response:", response.data);
      
      if (response.data.isSuccess) {
        toast.success(response.data.message || "CV uploaded successfully");
        // Get CV URL from the cvUrl field in the response
        const cvUrl = response.data.data.cvUrl;
        console.log("CV uploaded successfully:", cvUrl);
        fetchProfileData();
      } else {
        toast.error(response.data.message || "Failed to upload CV");
        console.error("CV upload failed with isSuccess=false:", response.data);
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        
        // Show specific errors from the backend if available
        if (error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
          console.error("Specific errors:", error.response.data.errors);
          toast.error(`Upload failed: ${error.response.data.errors.join(", ")}`);
        } else if (error.response.status === 401) {
          toast.error("Authentication error. Please log in again.");
        } else if (error.response.status === 413) {
          toast.error("File too large. Please upload a smaller file.");
        } else if (error.response.status === 400) {
          const errorMsg = error.response.data?.message || "Invalid request";
          toast.error(errorMsg || "Bad request when uploading CV");
        } else {
          const errorMsg = error.response.data?.message || "Failed to upload CV";
          toast.error(errorMsg);
        }
      } else if (error.request) {
        console.error("Error request (no response received):", error.request);
        toast.error("No response from server. Please check your internet connection.");
      } else {
        console.error("Error message:", error.message);
        toast.error("Upload error: " + error.message);
      }
    } finally {
      setUploadingCV(false);
      // Reset the file input so the same file can be selected again if needed
      document.getElementById('cv-upload').value = '';
    }
  };

  const handleProfilePictureUpload = async (event) => {
    if (!isProfileSaved) return; // Don't proceed if profile isn't saved

    const file = event.target.files[0];
    if (!file) return;

    // Only accept image files
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setUploadingPicture(true);
    const formData = new FormData();
    // Use a field name that matches the expected parameter on the server
    formData.append('ProfilePicture', file);
    
    console.log("Profile Picture Upload - File info:", {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    // Get the token for authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("You must be logged in to upload a profile picture");
      setUploadingPicture(false);
      return;
    }

    try {
      // Use direct axios instead of axiosInstance to bypass any potential issues
      const baseURL = "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net/api";
      const url = `${baseURL}/student/upload-profile-picture`;
      
      console.log(`Attempting profile picture upload to: ${url}`);
      
      // Use Bearer prefix for token
      const response = await axios.post(url, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("Profile picture upload response:", response.data);
      
      if (response.data.isSuccess) {
        toast.success(response.data.message || "Profile picture uploaded successfully");
        // Get picture URL from the pictureUrl field in the response
        const pictureUrl = response.data.data.pictureUrl;
        console.log("Profile picture uploaded successfully:", pictureUrl);
        fetchProfileData();
      } else {
        toast.error(response.data.message || "Failed to upload profile picture");
        console.error("Profile picture upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        
        // Show specific errors from the backend if available
        if (error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
          console.error("Specific errors:", error.response.data.errors);
          toast.error(`Upload failed: ${error.response.data.errors.join(", ")}`);
        } else if (error.response.status === 401) {
          toast.error("Authentication error. Please log in again.");
        } else if (error.response.status === 413) {
          toast.error("File too large. Please upload a smaller file.");
        } else if (error.response.status === 400) {
          const errorMsg = error.response.data?.message || "Invalid request";
          toast.error(errorMsg || "Bad request when uploading profile picture");
        } else {
          const errorMsg = error.response.data?.message || "Failed to upload profile picture";
          toast.error(errorMsg);
        }
      } else if (error.request) {
        console.error("Error request (no response received):", error.request);
        toast.error("No response from server. Please check your internet connection.");
      } else {
        console.error("Error message:", error.message);
        toast.error("Upload error: " + error.message);
      }
    } finally {
      setUploadingPicture(false);
      // Reset the file input
      document.getElementById('profile-picture-upload').value = '';
    }
  };

  const handleDeleteCV = async () => {
    if (!isProfileSaved) return; // Don't proceed if profile isn't saved
    
    if (!window.confirm("Are you sure you want to delete your CV?")) {
      return; // User canceled the deletion
    }
    
    setIsLoading(true);
    
    try {
      const api = axiosInstance();
      const response = await api.delete("/student/delete-cv");
      
      console.log("Delete CV response:", response.data);
      
      if (response.data.isSuccess) {
        toast.success(response.data.message || "CV deleted successfully");
        // Refresh profile data to update CV status
        fetchProfileData();
      } else {
        toast.error(response.data.message || "Failed to delete CV");
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
      
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        const errorMsg = error.response.data?.message || "Failed to delete CV";
        toast.error(errorMsg);
      } else if (error.request) {
        toast.error("No response from server. Please check your internet connection.");
      } else {
        toast.error("Delete error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check for token and fetch profile data on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to access your profile");
      // You can add navigation to login page here
      return;
    }
    
    // Fetch profile data on component mount
    fetchProfileData();
  }, []);

  // Effect to set isProfileSaved based on profileData
  useEffect(() => {
    if (profileData) {
      // Do not automatically set isProfileSaved here
      // Users must explicitly press the Save Profile button
      // setIsProfileSaved(true);
    }
  }, [profileData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Profile Image */}
      <div className="relative h-screen w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9fHxlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-800"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-800">
                <img
                  src={profileData?.pictureUrl ? profileData.pictureUrl : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                className={`absolute bottom-0 right-0 p-2 rounded-full transition-colors ${
                  isProfileSaved 
                    ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' 
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
                onClick={() => isProfileSaved && document.getElementById('profile-picture-upload').click()}
                disabled={!isProfileSaved || uploadingPicture}
                title={isProfileSaved ? "Upload profile picture" : "Save profile first to upload picture"}
              >
                {uploadingPicture ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Upload className="w-5 h-5 text-white" />
                )}
              </button>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureUpload}
              />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {profileData?.firstName || formik.values.firstName || "Your"} {profileData?.lastName || formik.values.lastName || "Profile"}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {profileData?.university || formik.values.university || "University"} • {profileData?.fieldOfStudy || formik.values.fieldOfStudy || "Field of Study"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => isProfileSaved && document.getElementById("cv-upload").click()}
                className={`px-6 py-3 text-white rounded-lg transition-colors flex items-center gap-2 ${
                  isProfileSaved 
                    ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' 
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
                disabled={!isProfileSaved || uploadingCV}
                title={isProfileSaved ? "Upload your CV" : "Save profile first to upload CV"}
              >
                {uploadingCV ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    {profileData?.cvUrl ? "Replace CV" : "Upload CV"}
                  </>
                )}
              </button>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpeg"
                className="hidden"
                onChange={handleCVUpload}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Card - Shown after fetch or save */}
          {showProfileCard && profileData && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8 transform transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Student Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Personal Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <User className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="text-white">{profileData.firstName} {profileData.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Address</p>
                        <p className="text-white">{profileData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Birth Date</p>
                        <p className="text-white">{new Date(profileData.birthDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{profileData.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white">{profileData.contactPhoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Academic Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <Building2 className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">University</p>
                        <p className="text-white">{profileData.university}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Faculty</p>
                        <p className="text-white">{profileData.faculty}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">Field of Study</p>
                        <p className="text-white">{profileData.fieldOfStudy}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Documents</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-400">CV Status</p>
                        <p className="text-white">{profileData.cvUrl ? "Uploaded" : "Not uploaded"}</p>
                      </div>
                    </div>
                    {profileData && profileData.cvUrl && (
                      <div className="mt-2 flex space-x-4">
                        <a 
                          href={profileData.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View CV
                        </a>
                        <button
                          onClick={handleDeleteCV}
                          className="inline-flex items-center text-red-400 hover:text-red-300"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Delete CV
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowProfileCard(false);
                  setIsProfileSaved(false); // Disable upload buttons when editing profile
                }}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
          )}

          {/* Profile Form - Hidden when card is shown */}
          {!showProfileCard && (
            <div>
              <form onSubmit={formik.handleSubmit} className="space-y-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                        <input
                          type="text"
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          placeholder="Selected location address"
                          className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-200 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              formik.touched.contactEmail && formik.errors.contactEmail ? "border-red-500" : ""
                            }`}
                          />
                          {formik.touched.contactEmail && formik.errors.contactEmail && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.contactEmail}</p>
                          )}
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
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-200 mb-4">Academic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            placeholder="Enter your university"
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
                            placeholder="Enter your faculty"
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

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating Profile...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Profile
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
