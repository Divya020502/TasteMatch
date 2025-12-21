import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { token, loading, user } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Admin-only route protection
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
