import "./index.css";
import App from "./app/App";
import { createRoot } from "react-dom/client";
import React from "react";
import { ToastNotifier } from "./app/components/ToastNotifier";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastNotifier />
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
