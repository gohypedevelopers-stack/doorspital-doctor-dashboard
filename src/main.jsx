// src/main.jsx
// Entry file: mounts React app and wraps it with BrowserRouter.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { RegistrationProvider } from "./lib/registrationContext.jsx";
import { GlobalLoaderProvider } from "./lib/globalLoaderContext.jsx";
import { ThemeProvider } from "@/components/theme-provider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalLoaderProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RegistrationProvider>
            <App />
          </RegistrationProvider>
        </ThemeProvider>
      </GlobalLoaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
