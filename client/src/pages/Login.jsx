import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="font-display bg-white min-h-screen flex items-center justify-center px-4">
      {/* Gradient Card */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md text-center rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-[1.02]">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4]"></div>
        <div className="absolute inset-0 bg-white/15 backdrop-blur-sm"></div>
        {/* Content */}
        <div className="relative z-10 p-10 flex flex-col items-center w-full">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-sm mb-3">
            Image Search Hub
          </h1>
          <p className="text-white/90 mb-6 text-sm">
            Search beautifully. Collaborate visually.
          </p>
          <h2 className="text-base font-semibold text-white mb-6 tracking-wide">
            Get Started
          </h2>

          {/* Buttons */}
          <div className="flex flex-col w-full max-w-xs gap-4">
            {/* Google */}
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}
              className="flex items-center justify-center gap-3 h-12 rounded-lg bg-white text-gray-800 font-medium shadow-md hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="Google"
              />
              <span>Continue with Google</span>
            </Link>

            {/* Facebook */}
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/auth/facebook`}
              className="flex items-center justify-center gap-3 h-12 rounded-lg bg-[#1877F2] text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency/48/facebook-new.png"
                alt="Facebook"
              />
              <span>Continue with Facebook</span>
            </Link>

            {/* GitHub */}
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/auth/github`}
              className="flex items-center justify-center gap-3 h-12 rounded-lg bg-[#24292E] text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-filled/50/ffffff/github.png"
                alt="GitHub"
              />
              <span>Continue with GitHub</span>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-white/70 mt-8">
            © {new Date().getFullYear()} Image Search Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
