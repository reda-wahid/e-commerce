import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterSchema as schema } from "../../../Util/Schema.jsx";
import { getUsers, saveUsers } from "../../../services/LocalStordge.jsx";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        const isExist = getUsers().find((i) => i.email === values.email);
        if (isExist) {
          alert("Email already exists");
          return;
        }
        const updatedUsers = [...getUsers(), { ...values, isLoggedIn: true }];
        saveUsers(updatedUsers);
        navigate("/");
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center px-8 bg-linear-to-br from-main_color  via-[#1e293b] to-[#0f172a]">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full  p-8 md:w-112.5 text-white">
        {/* Logo */}
        <div className="text-center -mb-3">
          <h1 className="text-3xl font-bold tracking-wide">
            <span className="bg-linear-to-r from-main_color to-pink-400 bg-clip-text text-transparent">
              Reda
            </span>
            Store
          </h1>
        </div>

        <h2 className="text-sm text-center mb-2">Create Account</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <FaUser className="mr-2 text-gray-300" />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-transparent text-white outline-none text-sm w-full"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <MdEmail className="mr-2 text-gray-300" />
              <input
                type="email"
                name="email"
                placeholder="name@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <RiLockPasswordLine className="mr-2 text-gray-300" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-transparent outline-none text-sm w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <RiLockPasswordLine className="mr-2 text-gray-300" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="********"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="bg-transparent outline-none text-sm w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="w-full py-2 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-500"></div>
          <span className="px-3 text-sm text-gray-400">or sign up with</span>
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

        {/* Login redirect */}
        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-main_color hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
