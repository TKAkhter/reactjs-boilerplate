import "./index.css";
import App from "./app/App";
import { createRoot } from "react-dom/client";
import React from "react";
import { ToastNotifier } from "./app/components/ToastNotifier";
import { Provider } from "react-redux";
import store from "./app/redux/store";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastNotifier />
      <App />
    </Provider>
  </React.StrictMode>,
);
