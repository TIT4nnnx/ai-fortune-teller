"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn } from "lucide-react";
import FortuneForm from "@/components/FortuneForm";
import FortuneResult from "@/components/FortuneResult";
import LoadingOrb from "@/components/LoadingOrb";
import { ApiFortuneResponse, FortuneRecord } from "@/types/fortune";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function FortunePage() {
  const { t, lang } = useLang();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const fp = t.fortune;
  const isThai = lang === "th";

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FortuneRecord | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleResult = (data: ApiFortuneResponse) => {
    if (data.success && data.data) {
      setResult(data.data);
      setApiError(null);
    } else {
      setApiError(data.error ?? fp.form.errors.network);
    }
  };

  const handleReset = () => { setResult(null); setApiError(null); };

  return (
    <div className="min-h-screen px-4 pb-20">
      {/* Header */}
      <div className="text-center pt-2 pb-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <p className="text-mystic-400/60 text-xs tracking-widest uppercase font-semibold">{fp.badge}</p>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-gradient-mystic">{fp.title}</h1>
          <p className="text-mystic-300/60 text-sm max-w-md mx-auto">{fp.subtitle}</p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Not logged in */}
        {!authLoading && !user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card-bright p-8 sm:p-12 text-center space-y-6"
          >
            <div className="text-5xl">🔮</div>
            <h2 className="font-display text-xl text-mystic-200">
              {isThai ? "กรุณาเข้าสู่ระบบก่อนดูดวง" : "Please sign in to consult the oracle"}
            </h2>
            <p className="text-mystic-400/60 text-sm max-w-sm mx-auto">
              {isThai
                ? "เข้าสู่ระบบด้วย Google เพื่อบันทึกประวัติการดูดวงของคุณ"
                : "Sign in with Google to save your fortune reading history"}
            </p>
            <motion.button
              onClick={signInWithGoogle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-mystic px-8 py-4 rounded-xl text-sm font-semibold tracking-wider inline-flex items-center gap-3"
            >
              <LogIn size={18} />
              {isThai ? "เข้าสู่ระบบด้วย Google" : "Sign in with Google"}
            </motion.button>
          </motion.div>
        ) : (
          /* Main card */
          <div className="glass-card-bright p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 opacity-20"
              style={{ background: "radial-gradient(circle at top left, rgba(139,71,255,0.8) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20"
              style={{ background: "radial-gradient(circle at bottom right, rgba(217,70,239,0.8) 0%, transparent 70%)" }} />

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingOrb message={fp.loading} />
                </motion.div>
              ) : result ? (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <FortuneResult record={result} onReset={handleReset} />
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {apiError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
                      ⚠️ {apiError}
                    </motion.div>
                  )}
                  <FortuneForm onResult={handleResult} onLoading={setIsLoading} isLoading={isLoading} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-5 text-xs text-mystic-400/40">
          {fp.trust.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}
