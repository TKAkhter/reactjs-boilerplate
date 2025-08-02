import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Register } from "../pages/Register";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Settings } from "../pages/Settings";
import NotFound from "@/pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AppRoutes: React.FC = () => {
  const authToken = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthMiddleware />}>
        <Route
          path="/dashboard"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DefaultLayout>
              <Settings />
            </DefaultLayout>
          }
        />
        <Route path="*" element={<NotFound isAuthenticated={Boolean(authToken)} />} />
      </Route>
      <Route path="*" element={<NotFound isAuthenticated={Boolean(authToken)} />} />
    </Routes>
  );
};

export default AppRoutes;
