import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";


import useAuthStore from "../store/AuthStore.js";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading } = useAuthStore();
      const navigate = useNavigate();
      const { resetToken } = useParams();

  const handleSubmit = (e) => {
        e.preventDefault();
        
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    try {
      resetPassword(resetToken, password);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error resetting password");
      console.error("Reset password error:", error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-md"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Reset Password
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your new password and confirm it.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            New Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Confirm Password:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white justify-center font-semibold rounded-lg shadow-md transition duration-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
        >
          {isLoading ? (
            <Loader className="animate-spin text-white m-auto" />
          ) : (
            "Reset Password"
          )}
        </motion.button>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </form>
      <p className="text-sm text-gray-600 text-center mt-4">
        Remembered your password?{" "}
        <Link to="/login" className="text-gray-800 hover:underline font-semibold">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default ResetPasswordPage;
