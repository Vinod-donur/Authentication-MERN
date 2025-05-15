import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/AuthStore.js";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, error, isLoading } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);
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
        Forgot Password
      </h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-sm text-gray-600 text-center mb-4">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              "Send Reset Link"
            )}
          </motion.button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      ) : (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Mail className="h-8 w-8 text-white" />
          </motion.div>
          <p className="text-gray-600 mb-6">
            If an account exists for {email}, you will receive a password reset
            link shortly.
          </p>
        </div>
      )}
      <div className="flex justify-end mt-4">
        <Link
          to="/login"
          className="text-sm text-gray-800 hover:underline font-medium"
        >
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
