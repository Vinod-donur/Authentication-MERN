import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", color: "bg-red-500", level: 1 };
    if (strength === 2)
      return { label: "Medium", color: "bg-blue-500", level: 2 };
    return { label: "Strong", color: "bg-green-800", level: 3 };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-300 to-gray-400 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-1 px-4 py-2 relative border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
              value={formData.password}
              onChange={handleChange}
            />

            {formData.password && (
              <>
                <div className="h-2 w-full mt-2 rounded bg-gray-300">
                  <div
                    className={`h-full ${strength.color} rounded transition-all`}
                    style={{ width: `${(strength.level / 3) * 100}%` }}
                  ></div>
                </div>
                <p
                  className={`text-sm mt-1 font-medium text-${strength.color.replace(
                    "bg-",
                    ""
                  )}`}
                >
                  Password Strength: {strength.label}
                </p>
              </>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Create Account
          </motion.button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
