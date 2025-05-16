// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div>Loading...</div>;

  if (!isAuthenticated || !user?.isVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
