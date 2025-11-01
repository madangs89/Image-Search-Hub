import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/status`,
          {
            withCredentials: true,
          }
        );
        console.log("Auth Status:", res.data);
        if (res.data.authenticated) {
         navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
        console.error("Error fetching auth status:", error);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
