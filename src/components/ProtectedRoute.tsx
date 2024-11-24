import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { isAuthenticated } = useAuth();
  // const location = useLocation();

  if (localStorage.getItem("isAuth") !== "true") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
