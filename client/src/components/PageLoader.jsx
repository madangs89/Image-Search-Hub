import React from "react";
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f6ff] to-[#f1efff] text-[#6b21a8] z-[9999]">
      {/* Animated ring */}
      <motion.div
        className="relative w-16 h-16"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#6b21a8] border-l-[#d8b4fe]"></div>
      </motion.div>

      {/* Subtle shimmer text */}
      <motion.p
        className="mt-6 text-lg font-semibold bg-gradient-to-r from-[#6b21a8] to-[#9d6dfd] bg-clip-text text-transparent tracking-wide"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      >
        Loading your dashboard...
      </motion.p>
    </div>
  );
};

export default PageLoader;
