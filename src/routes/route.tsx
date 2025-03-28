import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Register } from "../pages/Register";
import { FileView } from "../components/FileUpload/FileView";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Settings } from "../pages/Settings";

const AppRoutes: React.FC = () => {
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
        <Route
          path="/file/:id"
          element={
            <DefaultLayout>
              <FileView />
            </DefaultLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
