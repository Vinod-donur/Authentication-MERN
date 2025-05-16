// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <LoadingSpinner />;

  if (!isAuthenticated || !user?.isVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
