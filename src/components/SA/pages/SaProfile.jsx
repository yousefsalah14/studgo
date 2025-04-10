import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../../store/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import ProfileForm from "../components/ProfileForm";
import { Formik } from "formik";

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
  name: Yup.string().required("Activity name is required"),
  contactEmail: Yup.string().email("Invalid email").required("Email is required"),
  contactPhone: Yup.string().required("Phone number is required"),
  foundingDate: Yup.date().required("Founding date is required"),
  description: Yup.string().required("Description is required").min(50, "Description must be at least 50 characters"),
  mission: Yup.string().required("Mission statement is required"),
  vision: Yup.string().required("Vision statement is required"),
  location: Yup.string().required("Location is required"),
  tags: Yup.array().min(1, "At least one tag is required"),
});

export default function SaProfile() {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    date: "",
    description: ""
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contactEmail: currentUser?.email || "",
      contactPhone: "",
      foundingDate: "",
      description: "",
      mission: "",
      vision: "",
      location: "",
      tags: [],
      memberCount: 0,
      logoUrl: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.post("/student-activity/update-profile", values);
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

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/student-activity/profile");
        if (response.data) {
          const profileData = response.data;
          
          // Update formik values with fetched data
          formik.setValues({
            name: profileData.name || "",
            contactEmail: profileData.contactEmail || currentUser?.email || "",
            contactPhone: profileData.contactPhone || "",
            foundingDate: profileData.foundingDate || "",
            description: profileData.description || "",
            mission: profileData.mission || "",
            vision: profileData.vision || "",
            location: profileData.location || "",
            tags: profileData.tags || [],
            memberCount: profileData.memberCount || 0,
            logoUrl: profileData.logoUrl || ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      }
    };
    
    fetchProfileData();
  }, [currentUser]);

  // Handle tag addition
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !formik.values.tags.includes(tagInput.trim())) {
      formik.setFieldValue("tags", [...formik.values.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter(tag => tag !== tagToRemove)
    );
  };

  // Handle logo upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);

    try {
      setIsLoading(true);
      const response = await api.post("/student-activity/upload-logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        formik.setFieldValue("logoUrl", response.data.logoUrl);
        toast.success("Logo uploaded successfully!");
      }
    } catch (error) {
      console.error("Logo upload error:", error);
      toast.error("Failed to upload logo");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced error handling for form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await api.post("/student-activity/update-profile", values);
      if (response.data) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced UI for profile form
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-b-2xl shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Student Activity Profile</h1>
          <p className="text-gray-200">Manage your activity details and information.</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
            <span className="text-sm text-gray-200">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {/* Profile Form */}
            <div className="space-y-8">
              <Formik initialValues={formik.initialValues} validationSchema={formik.validationSchema} onSubmit={formik.handleSubmit}>
                <ProfileForm isLoading={isLoading} api={api} toast={toast} />
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-gray-800 p-6 mt-8">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p> {new Date().getFullYear()} StudGO - Student Activity Management</p>
          <p className="mt-2">Enhance your student activity experience with our platform</p>
        </div>
      </div>
    </div>
  );
}