import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { NotFound } from "../components/NotFound";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Register } from "../pages/Register";
import { FileView } from "../components/FileView";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Settings } from "../pages/Settings";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <AuthMiddleware>
        <DefaultLayout>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/file/:imageName" component={FileView} />
        </DefaultLayout>
      </AuthMiddleware>
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
