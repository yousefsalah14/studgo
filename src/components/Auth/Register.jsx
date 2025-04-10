/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2, Mail, Lock, User , CalendarClock } from "lucide-react";;
import RegImg from "../../assets/man-with-join-us-sign-for-open-recruitment.jpg"
import AuthImagePattern from "./AuthImagePattern.jsx";

function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isStudentActivityRegister, setIsStudentActivityRegister] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (values) => {

      try {
        setLoading(true);
        const endpoint = isStudentActivityRegister
        ? "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net/api/auth/sa-register"
        : "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net/api/auth/student-Register";
        const { data } = await axios.post(endpoint, values);
        navigate("/login");
      } catch (error) {
        if (error.response?.data?.Errors && Array.isArray(error.response.data.Errors)) {
          setApiError(error.response.data.Errors.join(", "));
        } else {
          setApiError(error.response?.data?.Message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleRegister,
    // validateOnMount: true, // Ensures the button is disabled initially if the form is invalid
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-900 overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                
              {isStudentActivityRegister ? <CalendarClock className="w-6 h-6 text-gray-300" /> :<User className="w-6 h-6 text-gray-300" /> }
              </div>
              <h1 className="text-2xl font-bold mt-2 text-gray-100">
                {isStudentActivityRegister ? "Student Activity Register" : "Register Now!"}
              </h1>
              <p className="text-gray-300">
                {isStudentActivityRegister
                  ? "Register for student activities"
                  : "Create your account to get started"}
              </p>
            </div>
          </div>

          {/* Social Sign-up Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-blue-500 rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-red-500 rounded-md shadow-sm bg-red-600 text-sm font-medium text-white hover:bg-red-700 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="flex space-x-2 bg-gray-800/50 p-1.5 rounded-xl w-full border border-gray-700">
            <button
              type="button"
              onClick={() => setIsStudentActivityRegister(false)}
              className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                !isStudentActivityRegister 
                  ? "bg-blue-500/20 text-white shadow-lg shadow-blue-500/10" 
                  : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              Student Register
            </button>
            <button
              type="button"
              onClick={() => setIsStudentActivityRegister(true)}
              className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                isStudentActivityRegister 
                  ? "bg-blue-500/20 text-white shadow-lg shadow-blue-500/10" 
                  : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              Student Activity Register
            </button>
          </div>

{/* Form */}
<form onSubmit={formik.handleSubmit} className="space-y-6">
  {/* Username Field */}
  <div className="form-control">
    <label className="label text-gray-100 flex items-center gap-2">
       {/* Font Awesome user icon */}
      <span className="flex-1">Username</span>
    </label>
    <div className="relative">
      <input
        type="text"
        name="username"
        className={`input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 pl-10 p-2 rounded-md${
          formik.touched.username && formik.errors.username ? "input-error" : ""
        }`}
        placeholder="Enter your username"
        {...formik.getFieldProps("username")}
      />
      <User className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/> {/* Icon inside input */}
    </div>
    {formik.touched.username && formik.errors.username && (
      <span className="text-error text-sm text-red-400">{formik.errors.username}</span>
    )}
  </div>

  {/* Email Field */}
  <div className="form-control">
    <label className="label text-gray-100 flex items-center gap-2">
      <i className="fas fa-envelope text-gray-400"></i> {/* Font Awesome envelope icon */}
      <span className="flex-1">Email</span>
    </label>
    <div className="relative">
      <input
        type="email"
        name="email"
        className={`input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 pl-10 p-2  rounded-md${
          formik.touched.email && formik.errors.email ? "input-error" : ""
        }`}
        placeholder="you@example.com"
        {...formik.getFieldProps("email")}
      />
      <Mail className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/> {/* Icon inside input */}
    </div>
    {formik.touched.email && formik.errors.email && (
      <span className="text-error text-sm text-red-400">{formik.errors.email}</span>
    )}
  </div>


            {/* Password Field with Requirements */}
            <div className="form-control">
      <label className="label text-gray-100">Password</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className={`input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 pl-10 p-2 rounded-md ${
            formik.touched.password && formik.errors.password ? "input-error" : ""
          }`}
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      {/* Password Requirements */}
      <div className="mt-2 text-sm">
        <p className="mb-1 text-gray-400">Password must contain:</p>
        <ul className="list-disc list-inside space-y-1">
          <li className={formik.values.password.length >= 6 ? "text-green-400" : "text-red-400"}>
            At least 6 characters
          </li>
          <li className={/[A-Z]/.test(formik.values.password) ? "text-green-400" : "text-red-400"}>
            One uppercase letter
          </li>
          <li className={/[0-9]/.test(formik.values.password) ? "text-green-400" : "text-red-400"}>
            One number
          </li>
          <li className={/[@$!%*?&]/.test(formik.values.password) ? "text-green-400" : "text-red-400"}>
            One special character (@$!%*?&)
          </li>
        </ul>
      </div>
      {formik.touched.password && formik.errors.password && (
        <span className="text-red-400 text-sm mt-1">{formik.errors.password}</span>
      )}
    </div>

            {/* API Error */}
            {apiError && <div className="p-3 text-sm text-red-800 bg-red-50 rounded-xl">{apiError}</div>}

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-gray-100 p-2 rounded-md"
                disabled={loading || !formik.isValid || formik.isSubmitting}
                onClick={() => formik.setTouched({ username: true, email: true, password: true })}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
             {/* Right Side - Image/Pattern */}
             <div className="hidden lg:block overflow-hidden">
               <AuthImagePattern
                title={"Welcome back!"}
                subtitle={"Sign in to continue your conversations and catch up with your messages."}
                image={RegImg}
            />
          </div>
    </div>
  );
}

export default Register;
