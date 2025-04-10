import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  currentUser: localStorage.getItem("accessToken") 
    ? jwtDecode(localStorage.getItem("accessToken")) 
    : null,
  apiError: null,
  loading: false,  

  handleLogin: async (values) => {
    set({ loading: true, apiError: null });
    try {
      const { data } = await axios.post("https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net/api/auth/login", values);
      const token = `bearer ${data.data.accessToken}`;
      const decodedUser = jwtDecode(data.data.accessToken);
      localStorage.setItem("accessToken", token);
      toast.success("Logged in successfully");
      set({ 
        accessToken: token, 
        currentUser: decodedUser, 
        apiError: null,
        loading: false, 
      });

     
      if (decodedUser.role === "Student") {
        window.location.href = "/"; 
      } else if (decodedUser.role === "StudentActivity") {
        window.location.href = "/student-activity"; 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.Errors?.length
        ? error.response.data.Errors.join(", ")
        : error.response?.data?.Message || "An error occurred";

      set({
        accessToken: null,
        currentUser: null,
        apiError: errorMessage,
        loading: false, 
      });
    }
  },

  handleLogout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null, currentUser: null, apiError: null, loading: false });
  },

  apiRequest: async (endpoint, method = "GET", data = null) => {
    const { accessToken } = get(); // ✅ Get the latest accessToken state

    try {
      const response = await axiosInstance(accessToken)[method.toLowerCase()](endpoint, data);
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error.response);
      throw error.response?.data || error.message;
    }
  },
}));
