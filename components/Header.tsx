"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Clock, Home, Menu, X, LogIn, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isThai = lang === "th";

  const navItems = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/fortune", label: t.nav.fortune, icon: Sparkles },
    { href: "/history", label: t.nav.history, icon: Clock },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 pt-3 md:pt-4">
      <div className={`rounded-2xl border border-mystic-500/20 max-w-5xl mx-auto transition-all duration-200 ${menuOpen ? "bg-[#1a0533] shadow-mystic-lg" : "glass-card"}`}>
        <div className="flex items-center justify-between px-3 md:px-6 py-2.5 md:py-3">

          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-mystic-500 to-cosmic-500 flex items-center justify-center group-hover:shadow-mystic transition-all duration-300">
              <span className="text-sm md:text-lg">🔮</span>
            </div>
            <div className="hidden md:block">
              <p className="font-display text-xs font-semibold text-gradient-mystic tracking-widest uppercase leading-tight">
                {t.nav.brand}
              </p>
              <p className="text-xs text-mystic-300/50 tracking-wider leading-tight">{t.nav.brandSub}</p>
            </div>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
                      ${isActive
                        ? "bg-mystic-500/30 text-mystic-200 border border-mystic-500/40 shadow-mystic"
                        : "text-mystic-300/70 hover:text-mystic-200 hover:bg-mystic-500/15"}`}
                  >
                    <Icon size={14} />
                    <span>{label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Language toggle */}
            <div className="flex items-center bg-black/30 rounded-lg md:rounded-xl border border-mystic-500/20 p-0.5">
              {(["th", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 md:px-2.5 py-1 rounded-md md:rounded-lg text-xs font-bold transition-all duration-200
                    ${lang === l ? "bg-mystic-500/60 text-white shadow-sm" : "text-mystic-400/60 hover:text-mystic-200"}`}
                >
                  {l === "th" ? "TH" : "EN"}
                </button>
              ))}
            </div>

            {/* Auth button — desktop only */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-mystic-500/30" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-mystic-600 flex items-center justify-center text-xs font-bold text-white">
                      {user.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <button
                    onClick={signOut}
                    className="p-2 rounded-lg text-mystic-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title={isThai ? "ออกจากระบบ" : "Sign out"}
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={signInWithGoogle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-mystic-500/20 text-mystic-200 border border-mystic-500/30 hover:bg-mystic-500/30 transition-all"
                >
                  <LogIn size={13} />
                  {isThai ? "เข้าสู่ระบบ" : "Sign in"}
                </motion.button>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-mystic-500/20 text-mystic-300 hover:bg-mystic-500/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mystic-divider mx-4" />
              <nav className="flex flex-col p-3 gap-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive
                          ? "bg-mystic-500/30 text-mystic-200 border border-mystic-500/30"
                          : "text-mystic-300/70 hover:bg-mystic-500/10 hover:text-mystic-200"}`}
                      >
                        <Icon size={16} />
                        {label}
                      </div>
                    </Link>
                  );
                })}

                {/* Mobile auth */}
                <div className="mystic-divider mx-2 my-1" />
                {user ? (
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-mystic-500/30" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-mystic-600 flex items-center justify-center text-xs font-bold text-white">
                          {user.displayName?.charAt(0) || "U"}
                        </div>
                      )}
                      <span className="text-sm text-mystic-200 truncate max-w-[150px]">{user.displayName}</span>
                    </div>
                    <button
                      onClick={() => { signOut(); setMenuOpen(false); }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={13} />
                      {isThai ? "ออกจากระบบ" : "Sign out"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { signInWithGoogle(); setMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-mystic-200 hover:bg-mystic-500/10 transition-all"
                  >
                    <LogIn size={16} />
                    {isThai ? "เข้าสู่ระบบด้วย Google" : "Sign in with Google"}
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
