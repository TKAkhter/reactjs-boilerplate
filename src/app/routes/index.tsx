import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../components/NotFound";
import AuthMiddleware from "../middlewares";
import CreateUser from "../pages/CreateUser";
import FileView from "../components/FileView";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={CreateUser} />
      <AuthMiddleware>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/file/:imageName" component={FileView} />
      </AuthMiddleware>
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
