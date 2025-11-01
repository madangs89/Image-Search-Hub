import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#333",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        success: {
          iconTheme: {
            primary: "#6b21a8",
            secondary: "#fff",
          },
        },
      }}
    />
  </BrowserRouter>
);
