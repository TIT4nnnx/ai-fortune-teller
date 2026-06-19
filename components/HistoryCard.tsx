"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FortuneRecord } from "@/types/fortune";
import { ChevronDown, Calendar } from "lucide-react";

interface Props {
  record: FortuneRecord;
  index: number;
}

export default function HistoryCard({ record, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  const date = record.createdAt
    ? new Date(record.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date(record.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="glass-card overflow-hidden group"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full p-5 text-left flex items-start gap-4 hover:bg-mystic-500/5 transition-colors duration-200"
      >
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-mystic-600 to-cosmic-600 flex items-center justify-center text-white font-display font-bold text-sm">
          {record.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-mystic-100 truncate">{record.name}</h3>
            <span className="text-xs text-mystic-400/50 flex-shrink-0">{date}</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-mystic-400/60">
              <Calendar size={11} />
              {record.dateOfBirth}
            </span>
          </div>

          <p className="text-xs text-mystic-300/60 mt-1.5 line-clamp-2 italic">
            &ldquo;{record.question}&rdquo;
          </p>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-mystic-400/50 group-hover:text-mystic-300 transition-colors"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mystic-divider mx-5" />
            <div className="p-5 space-y-3">
              {[
                { label: "Overview", text: record.response.summary, emoji: "✨" },
                { label: "Career", text: record.response.careerOutlook, emoji: "💼" },
                { label: "Finance", text: record.response.financialOutlook, emoji: "💰" },
                { label: "Relationships", text: record.response.relationshipOutlook, emoji: "💕" },
                { label: "Wisdom", text: record.response.generalAdvice, emoji: "⭐" },
              ].map(({ label, text, emoji }) => (
                <div key={label} className="space-y-1">
                  <p className="text-xs font-semibold text-mystic-400/70 tracking-widest uppercase flex items-center gap-1.5">
                    <span>{emoji}</span>
                    {label}
                  </p>
                  <p className="text-sm text-mystic-200/80 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
