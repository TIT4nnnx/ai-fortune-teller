"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Search, Sparkles, RefreshCw, LogIn } from "lucide-react";
import HistoryCard from "@/components/HistoryCard";
import LoadingOrb from "@/components/LoadingOrb";
import { FortuneRecord } from "@/types/fortune";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function HistoryPage() {
  const { t, lang } = useLang();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const h = t.history;
  const isThai = lang === "th";

  const [records, setRecords] = useState<FortuneRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchHistory = async () => {
    if (!user) { setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/history?userId=${user.uid}`);
      const data = await res.json();
      if (data.success) setRecords(data.data);
      else setError(h.error);
    } catch {
      setError(h.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchHistory();
  }, [user, authLoading]);

  const filtered = records.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 pb-20">
      {/* Header */}
      <div className="text-center pt-2 pb-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <p className="text-mystic-400/60 text-xs tracking-widest uppercase font-semibold">{h.badge}</p>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-gradient-mystic">{h.title}</h1>
          <p className="text-mystic-300/60 text-sm">{h.subtitle}</p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Not logged in */}
        {!authLoading && !user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 sm:p-12 text-center space-y-5"
          >
            <div className="text-5xl">📜</div>
            <h3 className="font-display text-lg text-mystic-200">
              {isThai ? "กรุณาเข้าสู่ระบบเพื่อดูประวัติ" : "Sign in to view your history"}
            </h3>
            <p className="text-mystic-400/60 text-sm">
              {isThai
                ? "ประวัติการดูดวงจะผูกกับบัญชี Google ของคุณ"
                : "Your reading history is linked to your Google account"}
            </p>
            <motion.button
              onClick={signInWithGoogle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-mystic px-6 py-3 rounded-xl text-sm font-semibold tracking-wider inline-flex items-center gap-2"
            >
              <LogIn size={16} />
              {isThai ? "เข้าสู่ระบบด้วย Google" : "Sign in with Google"}
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Search + refresh */}
            {!isLoading && !error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mystic-400/50" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={h.search}
                    className="mystic-input w-full pl-9 pr-4 py-3 text-sm"
                  />
                </div>
                <motion.button
                  onClick={fetchHistory}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-mystic-500/25 text-mystic-400 hover:text-mystic-200 hover:bg-mystic-500/10 transition-all touch-manipulation"
                >
                  <RefreshCw size={15} />
                </motion.button>
              </motion.div>
            )}

            {isLoading ? (
              <div className="glass-card p-8"><LoadingOrb message={h.loading} /></div>
            ) : error ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-10 text-center space-y-4">
                <div className="text-4xl">📚</div>
                <p className="text-mystic-300/70 text-sm">{error}</p>
                <button onClick={fetchHistory} className="text-xs text-mystic-400 hover:text-mystic-200 underline">
                  {isThai ? "ลองอีกครั้ง" : "Try again"}
                </button>
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-10 sm:p-12 text-center space-y-5">
                <div className="text-5xl">🌙</div>
                <div>
                  <h3 className="font-display text-lg text-mystic-200 mb-2">
                    {search ? h.noResult.title : h.empty.title}
                  </h3>
                  <p className="text-mystic-400/60 text-sm">
                    {search ? h.noResult.desc : h.empty.desc}
                  </p>
                </div>
                {!search && (
                  <Link href="/fortune">
                    <motion.div whileHover={{ scale: 1.05 }}
                      className="inline-flex btn-mystic px-6 py-3 rounded-xl text-sm font-semibold tracking-wider items-center gap-2 cursor-pointer touch-manipulation">
                      <Sparkles size={15} />{h.empty.cta}
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            ) : (
              <>
                <p className="text-xs text-mystic-400/50 flex items-center gap-1.5">
                  <Clock size={11} />{h.count(filtered.length)}
                </p>
                <div className="space-y-3">
                  {filtered.map((record, i) => (
                    <HistoryCard key={record.id ?? i} record={record} index={i} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
