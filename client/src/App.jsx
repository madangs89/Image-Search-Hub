import React, { useState } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import axios from "axios";
import PageLoader from "./components/PageLoader";
import AuthFailure from "./pages/AuthFailure";

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
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
        // navigate("/");
        console.error("Error fetching auth status:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="h-screen overflow-hidden bg-[#fafbff]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/failure" element={<AuthFailure />} />
      </Routes>
    </div>
  );
};

export default App;
