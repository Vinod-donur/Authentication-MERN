import  { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

import useAuthStore from "../store/AuthStore.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgotPassword"
              className="text-sm text-gray-800 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
          >
            {isLoading ? (
              <Loader className="animate-spin text-white m-auto" />
            ) : (
              "Login"
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </motion.button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-gray-800 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </>
  );
};

export default LoginPage;
