import { motion } from "framer-motion";
import useAuthStore from "../store/AuthStore";
import { formatDate } from "../utils/date";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!", { autoclose: 2000 });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.", { autoclose: 2000 });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-100 rounded-xl shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 ">
        Dashboard
      </h2>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-300 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Information
          </h3>
          <p className="text-gray-600">Name: {user.name}</p>
          <p className="text-gray-600">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-300 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Account Activity
          </h3>
          <p className="text-gray-600">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
        >
          {isLoading ? (
            <Loader className="animate-spin text-white m-auto" />
          ) : (
            "Logout"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
export default DashboardPage;
