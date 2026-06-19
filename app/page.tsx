"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, Moon, Zap, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export default function HomePage() {
  const { t } = useLang();
  const h = t.home;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-8 pb-16 sm:pb-20 min-h-[85vh]">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(139,71,255,0.6) 0%, rgba(217,70,239,0.3) 40%, transparent 70%)", filter: "blur(60px)" }}
          />
        </div>

        {/* Zodiac ring */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-8 sm:mb-10">
          {zodiacSigns.map((sign, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const r = 88;
            const cx = 112;
            const x = Math.cos(angle) * r + cx;
            const y = Math.sin(angle) * r + cx;
            return (
              <motion.span
                key={i}
                className="absolute text-mystic-300/50 text-sm"
                style={{ left: x - 8, top: y - 8 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
              >
                {sign}
              </motion.span>
            );
          })}
          {/* Center orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-4xl sm:text-5xl"
            animate={{ boxShadow: [
              "0 0 30px rgba(139,71,255,0.5), inset 0 0 20px rgba(139,71,255,0.3)",
              "0 0 60px rgba(217,70,239,0.7), inset 0 0 40px rgba(217,70,239,0.4)",
              "0 0 30px rgba(139,71,255,0.5), inset 0 0 20px rgba(139,71,255,0.3)",
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle at 35% 35%, rgba(200,150,255,0.4) 0%, rgba(80,20,160,0.8) 60%, rgba(20,0,50,1) 100%)" }}
          >
            🔮
          </motion.div>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold tracking-wide">
            <span className="text-gradient-mystic">{h.title}</span>
          </h1>
          <p className="text-mystic-200/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {h.subtitle}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Link href="/fortune" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-mystic w-full sm:w-auto px-6 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-semibold tracking-widest uppercase flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles size={18} />
              {h.cta}
              <ChevronRight size={16} />
            </motion.div>
          </Link>
          <Link href="/history" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-medium text-mystic-300 border border-mystic-500/25 hover:bg-mystic-500/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Moon size={15} />
              {h.ctaSub}
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 pb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-gradient-gold mb-2">
            {h.featuresTitle}
          </h2>
          <p className="text-mystic-300/60 text-sm">{h.featuresSub}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {h.features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card p-4 sm:p-6 text-center space-y-2 sm:space-y-3"
            >
              <div className="text-2xl sm:text-3xl">{icon}</div>
              <h3 className="font-display text-xs sm:text-sm font-semibold text-mystic-200 tracking-wider">{title}</h3>
              <p className="text-xs text-mystic-400/70 leading-relaxed hidden sm:block">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="px-4 sm:px-6 pb-20 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card-bright p-6 sm:p-10 text-center space-y-5"
        >
          <div className="flex justify-center gap-2 text-xl sm:text-2xl">
            <Star className="text-amber-400 animate-pulse" />
            <Zap className="text-cosmic-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
            <Star className="text-amber-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <h2 className="font-display text-lg sm:text-2xl text-gradient-mystic">{h.bannerTitle}</h2>
          <p className="text-mystic-300/70 text-sm leading-relaxed max-w-lg mx-auto pb-4">{h.bannerDesc}</p>
          <Link href="/fortune">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex btn-mystic px-6 sm:px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              {h.bannerCta}
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
