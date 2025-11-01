import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafbff] text-gray-800 px-6 text-center">
      {/* Animated 404 Text */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[6rem] sm:text-[8rem] font-extrabold text-[#6b21a8] select-none"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl sm:text-2xl font-medium mb-4"
      >
        Oops! Page not found.
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-500 max-w-md mb-8"
      >
        The page you’re looking for doesn’t exist or has been moved. 
        Let’s get you back on track.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block bg-[#6b21a8] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#581c87] transition-all"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
