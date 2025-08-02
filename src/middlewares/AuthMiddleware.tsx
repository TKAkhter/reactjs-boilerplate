import React from "react";
// Import { useSelector } from "react-redux";
// Import { RootState } from "../redux/store";
import { /* Navigate, */ Outlet } from "react-router-dom";

// Export const AuthMiddleware: React.FC = () => {
//   Const authToken = useSelector((state: RootState) => state.auth.token);

//   Return authToken ? <Outlet /> : <Navigate to="/login" replace />;
// };

export const AuthMiddleware: React.FC = () => {
  return <Outlet />;
};
