import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";
import { BaseUrl } from "../../../lib/axios";

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Activity name is required"),
  biography: Yup.string().required("Biography is required").min(50, "Biography must be at least 50 characters"),
  foundingDate: Yup.date().required("Founding date is required"),
  contactEmail: Yup.string().email("Invalid email").required("Email is required"),
  contactPhoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  university: Yup.string().required("University is required"),
  faculty: Yup.string().required("Faculty is required"),
  websiteUrl: Yup.string().url("Invalid website URL").nullable(),
  joinFormUrl: Yup.string().url("Invalid join form URL").nullable(),
  longitude: Yup.number().required("Longitude is required"),
  latitude: Yup.number().required("Latitude is required"),
});

export default function SaProfile() {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      biography: "",
      foundingDate: "",
      pictureUrl: "",
      joinFormUrl: "",
      websiteUrl: "",
      contactEmail: currentUser?.email || "",
      contactPhoneNumber: "",
      address: "",
      longitude: "0",
      latitude: "0",
      university: "",
      faculty: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Strip the base URL from pictureUrl before sending
        const picturePath = values.pictureUrl.replace(BaseUrl, "");
        const updatedValues = { ...values, pictureUrl: picturePath };

        const response = await axiosInstance().post("/sa/update-profile", updatedValues);
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
        const response = await axiosInstance().get("/sa/profile");
        console.log("Profile API Response:", response.data);
        if (response.data?.isSuccess && response.data?.data) {
          const profileData = response.data.data;
          
          // Update formik values with fetched data
          formik.setValues({
            name: profileData.name || "",
            biography: profileData.biography || "",
            foundingDate: profileData.foundingDate ? new Date(profileData.foundingDate).toISOString().split('T')[0] : "",
            pictureUrl: profileData.pictureUrl || "",
            joinFormUrl: profileData.joinFormUrl || "",
            websiteUrl: profileData.websiteUrl || "",
            contactEmail: profileData.contactEmail || currentUser?.email || "",
            contactPhoneNumber: profileData.contactPhoneNumber || "",
            address: profileData.address || "",
            longitude: profileData.longitude || "0",
            latitude: profileData.latitude || "0",
            university: profileData.university || "",
            faculty: profileData.faculty || ""
          });

          // Set preview URL if picture exists
          if (profileData.pictureUrl) {
            const fullPictureUrl = profileData.pictureUrl;
            console.log("Setting preview URL:", fullPictureUrl);
            setPreviewUrl(fullPictureUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      }
    };
    
    fetchProfileData();
  }, [currentUser]);

  // Handle picture upload
  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPictureFile(file);
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    const formData = new FormData();
    formData.append("picture", file);

    try {
      setIsLoading(true);
      const response = await axiosInstance().post("/sa/upload-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.isSuccess) {
        formik.setFieldValue("pictureUrl", response.data.data.pictureUrl);
        toast.success("Profile picture uploaded successfully!");
      }
    } catch (error) {
      console.error("Picture upload error:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsLoading(false);
    }
  };

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
              <form onSubmit={formik.handleSubmit} className="space-y-8">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error("Image load error:", e);
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureUpload}
                    className="hidden"
                    id="profile-picture"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    <Upload size={20} />
                    {previewUrl ? "Change Picture" : "Upload Picture"}
                  </label>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Activity Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.name && formik.errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Founding Date
                    </label>
                    <input
                      type="date"
                      name="foundingDate"
                      value={formik.values.foundingDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.foundingDate && formik.errors.foundingDate ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.foundingDate && formik.errors.foundingDate && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.foundingDate}</p>
                    )}
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Biography
                  </label>
                  <textarea
                    name="biography"
                    value={formik.values.biography}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                    className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formik.touched.biography && formik.errors.biography ? "border-red-500" : ""
                    }`}
                  />
                  {formik.touched.biography && formik.errors.biography && (
                    <p className="mt-1 text-sm text-red-400">{formik.errors.biography}</p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formik.values.contactEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
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
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhoneNumber"
                      value={formik.values.contactPhoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.contactPhoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.address && formik.errors.address ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      name="longitude"
                      value={formik.values.longitude}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.longitude && formik.errors.longitude ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.longitude && formik.errors.longitude && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.longitude}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      name="latitude"
                      value={formik.values.latitude}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.latitude && formik.errors.latitude ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.latitude && formik.errors.latitude && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.latitude}</p>
                    )}
                  </div>

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
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.faculty && formik.errors.faculty ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.faculty && formik.errors.faculty && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.faculty}</p>
                    )}
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formik.values.websiteUrl}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.websiteUrl && formik.errors.websiteUrl ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.websiteUrl && formik.errors.websiteUrl && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.websiteUrl}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Join Form URL
                    </label>
                    <input
                      type="url"
                      name="joinFormUrl"
                      value={formik.values.joinFormUrl}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formik.touched.joinFormUrl && formik.errors.joinFormUrl ? "border-red-500" : ""
                      }`}
                    />
                    {formik.touched.joinFormUrl && formik.errors.joinFormUrl && (
                      <p className="mt-1 text-sm text-red-400">{formik.errors.joinFormUrl}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
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