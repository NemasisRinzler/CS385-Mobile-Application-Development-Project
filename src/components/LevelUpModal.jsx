import React from "react";
import { motion } from "framer-motion";

const LevelUpModal = ({ level, onClose }) => {
  if (!level) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#0b1220] text-white p-6 rounded-lg shadow-xl border border-cyan-700"
      >
        <h2 className="text-2xl font-bold mb-2">LEVEL UP! 🎉</h2>
        <p className="mb-4">You reached level {level} — nice work!</p>
        <button
          className="px-4 py-2 bg-emerald-500 text-black font-bold"
          onClick={onClose}
        >
          Sweet
        </button>
      </motion.div>
    </div>
  );
};

export default LevelUpModal;
