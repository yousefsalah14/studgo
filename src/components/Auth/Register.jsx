/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2, Mail, Lock, User , CalendarClock } from "lucide-react";;
import RegImg from "./../../../public/man-with-join-us-sign-for-open-recruitment.jpg"
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
        ? "https://studgov2.runasp.net/api/auth/sa-register"
        : "https://studgov2.runasp.net/api/auth/student-Register";
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
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
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
    <div className="h-screen grid lg:grid-cols-2 bg-gray-900">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
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

          {/* Toggle Button */}
          <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg w-full">
            <button
              type="button"
              onClick={() => setIsStudentActivityRegister(false)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                !isStudentActivityRegister ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Student Register
            </button>
            <button
              type="button"
              onClick={() => setIsStudentActivityRegister(true)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isStudentActivityRegister ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
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
      <span className="text-error text-sm text-white">{formik.errors.username}</span>
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
      <span className="text-error text-sm text-white">{formik.errors.email}</span>
    )}
  </div>


            {/* Password Field */}
            <div className="form-control">
      <label className="label text-gray-100">Password</label>
      <div className="relative">
        {/* Lock icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
        {/* Password input */}
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className={`input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 pl-10 p-2  rounded-md ${
            formik.touched.password && formik.errors.password ? "input-error" : ""
          }`}
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
        />
        {/* Eye icon to toggle password visibility */}
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={()=>{setShowPassword(!showPassword)}}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" /> // Eye-off icon when password is visible
          ) : (
            <Eye className="w-5 h-5 text-gray-400" /> // Eye icon when password is hidden
          )}
        </button>
      </div>
      {/* Error message */}
      {formik.touched.password && formik.errors.password && (
        <span className="text-error text-sm text-white">{formik.errors.password}</span>
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
             <AuthImagePattern
              title={"Welcome back!"}
              subtitle={"Sign in to continue your conversations and catch up with your messages."}
              image={RegImg}
          />
    </div>
  );
}

export default Register;
