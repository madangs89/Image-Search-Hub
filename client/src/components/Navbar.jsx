import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/status`,
          {
            withCredentials: true,
          }
        );

        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
        console.error("Error fetching auth status:", error);
      }
    })();
  }, []);

  if (location.pathname === "/") return null;

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`
      );
      if (data.success) {
        toast.success("Logout successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-4 py-3">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2 text-indigo-600">
          <div className="size-6">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Image Search Hub
          </h2>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-indigo-600 transition"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="h-10 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Logout
          </button>
          {user && user?._id && (
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-indigo-400"
              style={{
                backgroundImage: `url(${user?.avatar})`,
              }}
            ></div>
          )}
        </div>
      </div>

      {/* Right Section (Mobile Menu) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 px-4 pb-4 border-t border-gray-200 bg-white transition-all duration-300">
          <button
            onClick={handleLogout}
            className="w-full h-10 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
          <div
            className="size-10 rounded-full border-2 border-indigo-400 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLlkAU4lgfVdiCuot4OtfEjGvkkppaVAt1Et6Wxq_gjmniw4iiolmf6rCs0K_zimdE3qdGp8m6GG3q_JLbvbs3zbiaWJpJmgc_-_KizNeZ6fr4Bh79dgE0hV-VZApjL7WxhJi7UHPqq_vT8mdDj7p9zom0QGruXVsSWma5pUkkyWIIFJ7jBBQeLIeff2_uDhAjl7-ID56YjlW205vzK85TD_7Z9HfFnuACtVWmbQwkIC6826fM4414l9Sed5quYBvvM-_p-TdmaXM")',
            }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
