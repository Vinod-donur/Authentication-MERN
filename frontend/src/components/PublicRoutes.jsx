// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
