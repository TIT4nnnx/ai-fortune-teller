"use client";

import { motion } from "framer-motion";

export default function LoadingOrb({ message = "Reading the stars..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      {/* Crystal ball */}
      <div className="relative w-32 h-32">
        {/* Outer glow rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-mystic-500/30"
            animate={{ scale: [1, 1.5 + i * 0.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
          />
        ))}

        {/* Main orb */}
        <motion.div
          className="w-32 h-32 rounded-full relative overflow-hidden"
          animate={{ boxShadow: [
            "0 0 30px rgba(139,71,255,0.5), inset 0 0 30px rgba(139,71,255,0.3)",
            "0 0 60px rgba(217,70,239,0.7), inset 0 0 50px rgba(217,70,239,0.4)",
            "0 0 30px rgba(139,71,255,0.5), inset 0 0 30px rgba(139,71,255,0.3)",
          ]}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(200,150,255,0.5) 0%, rgba(139,71,255,0.4) 40%, rgba(60,10,120,0.9) 70%, rgba(20,0,50,1) 100%)",
          }}
        >
          {/* Inner swirls */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(217,70,239,0.3) 30%, transparent 60%)",
            }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              background: "conic-gradient(from 180deg, transparent 0%, rgba(139,71,255,0.2) 40%, transparent 70%)",
            }}
          />
          {/* Highlight */}
          <div className="absolute top-4 left-6 w-6 h-4 bg-white/30 rounded-full blur-sm" />
          <div className="absolute top-6 left-8 w-2 h-2 bg-white/50 rounded-full blur-xs" />
        </motion.div>

        {/* Stars orbiting */}
        {["✦", "✧", "⋆"].map((star, i) => (
          <motion.span
            key={i}
            className="absolute text-mystic-300 text-xs font-bold"
            style={{ top: "50%", left: "50%", marginTop: "-8px", marginLeft: "-8px" }}
            animate={{ rotate: 360 + i * 120 }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
          >
            <span
              style={{
                display: "block",
                transform: `translateX(${56 + i * 8}px)`,
              }}
            >
              {star}
            </span>
          </motion.span>
        ))}
      </div>

      {/* Loading text */}
      <div className="text-center">
        <motion.p
          className="font-display text-mystic-200 text-lg tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {message}
        </motion.p>
        <div className="flex justify-center gap-1 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-mystic-400"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
