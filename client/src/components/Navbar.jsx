import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }
  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white border-b border-gray-200 backdrop-blur-md px-4 md:px-8 py-3 shadow-sm">
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

      {/* Middle Section - Search Bar */}
      <div className="flex-1 w-full md:w-auto mt-3 md:mt-0 md:px-10">
        <label className="flex w-full h-11">
          <div className="flex w-full items-stretch rounded-lg overflow-hidden shadow-sm border border-gray-300 bg-white">
            <input
              type="text"
              placeholder="Search for high-resolution photos"
              className="flex-1 border-none bg-transparent px-4 text-gray-800 placeholder:text-gray-500 text-base focus:outline-none"
            />
          </div>
        </label>
      </div>

      {/* Right Section - Buttons and Profile */}
      <div className="flex items-center gap-2 mt-3 md:mt-0">
        <button className="h-10 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition">
          Logout
        </button>
        <button className="h-10 px-4 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-200 transition">
          History
        </button>
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-indigo-400"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLlkAU4lgfVdiCuot4OtfEjGvkkppaVAt1Et6Wxq_gjmniw4iiolmf6rCs0K_zimdE3qdGp8m6GG3q_JLbvbs3zbiaWJpJmgc_-_KizNeZ6fr4Bh79dgE0hV-VZApjL7WxhJi7UHPqq_vT8mdDj7p9zom0QGruXVsSWma5pUkkyWIIFJ7jBBQeLIeff2_uDhAjl7-ID56YjlW205vzK85TD_7Z9HfFnuACtVWmbQwkIC6826fM4414l9Sed5quYBvvM-_p-TdmaXM")',
          }}
        ></div>
      </div>
    </header>
  );
};

export default Navbar;
