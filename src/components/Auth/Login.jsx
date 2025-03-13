import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../store/authStore.js";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, MessageSquare, KeyRound } from "lucide-react";
import LogImg from './../../../public/auth.png'
import AuthImagePattern from "./AuthImagePattern.jsx";
import { Link } from "react-router-dom";

const Login= () => {
    const { handleLogin, apiError , loading} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await handleLogin(values)
        },
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
                                <KeyRound  className="w-6 h-6 text-gray-300" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2 text-gray-100">Welcome Back</h1>
                            <p className="text-gray-300">Sign in to your account</p>
                        </div>
                    </div>
    
                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="form-control">
      <label className="label">
          <span className="label-text font-medium text-gray-100">Email</span>
      </label>
      <div className="relative">
          {/* Email Icon - Centered Vertically */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
              type="email"
              className={`input input-bordered w-full  pl-10 bg-gray-800 text-gray-100  placeholder-gray-400 p-2 rounded-md ${
                  formik.errors.email && 'input-error'
              }`}
              placeholder="you@example.com"
              {...formik.getFieldProps('email')}
          />
          {formik.errors.email && (
              <span className="text-error text-sm text-red-400">{formik.errors.email}</span>
          )}
      </div>
  </div>
  
  <div className="form-control">
      <label className="label">
          <span className="label-text font-medium text-gray-100">Password</span>
      </label>
      <div className="relative">
          {/* Password Icon - Centered Vertically */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full  pl-10 bg-gray-800 text-gray-100 sm placeholder-gray-400 p-2 rounded-md${
                  formik.errors.password && 'input-error'
              }`}
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
          />
          {/* Toggle Password Visibility Button - Centered Vertically */}
          <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
          >
              {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
              )}
          </button>
          {formik.errors.password && (
              <span className="text-error text-sm text-red-400">{formik.errors.password}</span>
          )}
      </div>
  </div>
    
  {apiError && <div className="p-3 text-sm text-red-800 bg-red-50 rounded-xl">{apiError}</div>}
    
                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-gray-100 p-2 rounded-md"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
    
                    <div className="text-center">
                        <p className="text-gray-300">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="link link-primary text-blue-400 hover:text-blue-500">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
    
            {/* Right Side - Image/Pattern */}
            <AuthImagePattern
                title={"Welcome back!"}
                subtitle={"Sign in to continue your conversations and catch up with your messages."}
                image={LogImg}
            />
        </div>
    );
}

export default Login
