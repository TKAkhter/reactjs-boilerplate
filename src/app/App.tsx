import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./routes";

interface AppProps {

  tab: string;

}



const App: React.FC<AppProps> = ({ tab }) => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
