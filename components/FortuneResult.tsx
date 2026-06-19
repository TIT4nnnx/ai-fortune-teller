"use client";

import { motion } from "framer-motion";
import { FortuneRecord } from "@/types/fortune";
import { Sparkles, Briefcase, DollarSign, Heart, Star, RefreshCw, Share2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface Props {
  record: FortuneRecord;
  onReset: () => void;
}

export default function FortuneResult({ record, onReset }: Props) {
  const { t } = useLang();
  const r = t.fortune.result;

  const sections = [
    { key: "summary" as const, label: r.sections.summary, icon: Sparkles, gradient: "from-mystic-500/20 to-cosmic-500/10", border: "border-mystic-500/30", iconColor: "text-mystic-300", delay: 0.1 },
    { key: "careerOutlook" as const, label: r.sections.career, icon: Briefcase, gradient: "from-blue-500/15 to-cyan-500/10", border: "border-blue-500/25", iconColor: "text-blue-300", delay: 0.2 },
    { key: "financialOutlook" as const, label: r.sections.financial, icon: DollarSign, gradient: "from-amber-500/15 to-yellow-500/10", border: "border-amber-500/25", iconColor: "text-amber-300", delay: 0.3 },
    { key: "relationshipOutlook" as const, label: r.sections.relationship, icon: Heart, gradient: "from-rose-500/15 to-pink-500/10", border: "border-rose-500/25", iconColor: "text-rose-300", delay: 0.4 },
    { key: "generalAdvice" as const, label: r.sections.advice, icon: Star, gradient: "from-emerald-500/15 to-teal-500/10", border: "border-emerald-500/25", iconColor: "text-emerald-300", delay: 0.5 },
  ];

  const date = new Date(record.timestamp).toLocaleDateString("th-TH", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2 pb-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-3xl sm:text-4xl"
        >🔮</motion.div>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-gradient-mystic">{r.title}</h2>
        <p className="text-mystic-200 font-medium text-sm sm:text-base">{record.name}</p>
        <p className="text-mystic-400/60 text-xs sm:text-sm italic px-4">
          &ldquo;{record.question}&rdquo;
        </p>
        <p className="text-mystic-400/40 text-xs">{date}</p>
        <div className="mystic-divider mx-auto max-w-xs" />
      </motion.div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map(({ key, label, icon: Icon, gradient, border, iconColor, delay }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${gradient} border ${border} overflow-hidden`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/30 flex items-center justify-center ${iconColor}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-xs font-semibold tracking-widest uppercase mb-1.5 ${iconColor} opacity-80`}>
                  {label}
                </h3>
                <p className="text-mystic-100/90 text-sm leading-relaxed">{record.response[key]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-3 pt-2"
      >
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 btn-mystic py-3.5 rounded-xl text-sm font-semibold tracking-wider flex items-center justify-center gap-2 touch-manipulation"
        >
          <RefreshCw size={15} />
          {r.again}
        </motion.button>
        <motion.button
          onClick={() => {
            const text = `✨ ${r.title} ✨\n\n📖 ${record.response.summary}\n\n💼 ${r.sections.career}: ${record.response.careerOutlook}\n\n💰 ${r.sections.financial}: ${record.response.financialOutlook}\n\n💕 ${r.sections.relationship}: ${record.response.relationshipOutlook}\n\n⭐ ${r.sections.advice}: ${record.response.generalAdvice}`;
            navigator.clipboard.writeText(text).catch(() => {});
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="sm:w-auto px-5 py-3.5 rounded-xl text-sm font-medium text-mystic-300 border border-mystic-500/30 hover:bg-mystic-500/10 transition-all flex items-center justify-center gap-2 touch-manipulation"
        >
          <Share2 size={15} />
          {r.copy}
        </motion.button>
      </motion.div>

      <p className="text-center text-xs text-mystic-400/30 pt-1">{r.footer}</p>
    </motion.div>
  );
}
