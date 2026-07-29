import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema as schema } from "../../../Util/Schema.jsx";
import { getUsers, saveUsers } from "../../../services/LocalStordge.jsx";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
   onSubmit: async (values, { setSubmitting }) => {
  try {
    await new Promise((res) => setTimeout(res, 500));
    const foundUserIndex = getUsers().findIndex(
      (user) =>
        user.email === values.email &&
        user.password === values.password
    );

    if (foundUserIndex !== -1) {
      const updatedUsers = getUsers().map((user, index) =>
        index === foundUserIndex
          ? { ...user, isLoggedIn: true }
          : { ...user, isLoggedIn: false }
      );
saveUsers(updatedUsers);
      navigate("/");
    } else {
      alert("your email not found, can you register");
    }
   } finally {
    setSubmitting(false);
   }
}});

  return (
    <div className="min-h-screen flex items-center justify-center px-8 bg-linear-to-br from-main_color  via-[#1e293b] to-[#0f172a]">
      {/* Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl shadow-white/20 w-full  p-8 md:w-112.5 text-white">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">
            <span className="bg-linear-to-r from-main_color to-pink-400 bg-clip-text text-transparent">
              Reda
            </span>
            Store
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email Address</label>
            <div
              className={`flex items-center mt-1 bg-white/10 rounded-lg px-3 py-2 border transition-all duration-200 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-white/20 focus-within:border-purple-500"
              }`}
            >
              <MdEmail size={18} className="text-gray-300 mr-2" />
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="name@email.com"
                className="w-full outline-none bg-transparent text-sm placeholder-gray-400"
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
          {/* Password */}
          <div className="mb-2">
            <label className=" text-sm text-gray-300">Password</label>
            <div
              className={`bg-transparent  border outline-none text-sm w-full ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500 flex items-center mt-1 bg-white/10  rounded-lg px-3 py-2"
                  : "flex items-center mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2"
              }`}
            >
              <RiLockPasswordLine size={18} className="text-gray-300 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="********"
                className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {formik.touched.password ? (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          {/* Forgot */}
          <div className="text-right mb-4">
            <div className="text-sm text-gray-300 hover:text-white">
              Forgot Password?
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="w-full py-2 rounded-lg cursor-pointer bg-linear-to-r from-purple-600 to-main_color disabled:opacity-50"
          >
            Sign In
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-500"></div>
          <span className="px-3 text-sm text-gray-400">or sign in with</span>
          <div className="flex-1 h-px bg-gray-500"></div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center">
            <FaGoogle />
          </button>
          <button className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
            <FaApple />
          </button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-main_color hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
