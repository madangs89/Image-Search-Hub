import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const AuthFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fafbff] to-[#f3f2fb] text-gray-800 px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 12,
        }}
        className="p-6 bg-[#f5f3ff] rounded-full shadow-inner"
      >
        <ShieldAlert size={60} className="text-[#6b21a8]" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-bold mt-6 text-[#6b21a8]"
      >
        Authentication Failed
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-600 max-w-md mt-3"
      >
        It seems your session has expired or your credentials are invalid.
        Please log in again to continue.
      </motion.p>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-2.5 bg-[#6b21a8] text-white rounded-full font-medium shadow hover:bg-[#581c87] transition-all"
      >
        Go to Login
      </motion.button>

      {/* Subtle Footer Note */}
      <p className="mt-8 text-xs text-gray-400">
        © {new Date().getFullYear()} Secure Dashboard by Madan. All rights
        reserved.
      </p>
    </div>
  );
};

export default AuthFailure;
