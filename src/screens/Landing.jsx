import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Animated Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Our Platform 🚀
      </motion.h1>

      {/* Animated Bot Name */}
      <motion.h2
        className="text-6xl md:text-6xl font-semibold text-center mt-4 text-yellow-200"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        SockeTron 🤖
      </motion.h2>

      {/* Animated Subtext */}
      <motion.p
        className="text-lg md:text-2xl text-center mt-4 opacity-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Build, Collaborate, and Innovate with Ease
      </motion.p>

      {/* Animated Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition-transform transform hover:scale-105"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Get Started →
      </motion.button>

      {/* Floating Decorative Element */}
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </div>
  );
}
