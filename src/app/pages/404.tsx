// src/app/pages/404.tsx

import Link from "next/link";
import { motion } from "framer-motion";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-bold text-red-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>
      
      {/* Message */}
      <motion.p
        className="text-lg text-gray-300 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mt-6"
      >
        <Link href="/">
          <button className="px-6 py-3 rounded-lg text-lg font-medium bg-red-600 hover:bg-red-700 transition">
            Go Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
