"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, Calendar, HelpCircle, AlertCircle } from "lucide-react";
import { ApiFortuneResponse } from "@/types/fortune";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onResult: (data: ApiFortuneResponse) => void;
  onLoading: (loading: boolean) => void;
  isLoading: boolean;
}

interface FieldErrors {
  name?: string;
  dateOfBirth?: string;
  question?: string;
  general?: string;
}

const monthOptions = [
  { en: "January", th: "มกราคม" },
  { en: "February", th: "กุมภาพันธ์" },
  { en: "March", th: "มีนาคม" },
  { en: "April", th: "เมษายน" },
  { en: "May", th: "พฤษภาคม" },
  { en: "June", th: "มิถุนายน" },
  { en: "July", th: "กรกฎาคม" },
  { en: "August", th: "สิงหาคม" },
  { en: "September", th: "กันยายน" },
  { en: "October", th: "ตุลาคม" },
  { en: "November", th: "พฤศจิกายน" },
  { en: "December", th: "ธันวาคม" },
];

function getDaysInMonth(month: number, year: number): number {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate();
}

export default function FortuneForm({ onResult, onLoading, isLoading }: Props) {
  const { lang, t } = useLang();
  const { user } = useAuth();
  const f = t.fortune.form;
  const isThai = lang === "th";

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const currentYear = new Date().getFullYear();
  const maxDays = getDaysInMonth(parseInt(month) || 1, parseInt(year) || 2000);

  const buildDateString = (): string | null => {
    const y = parseInt(year);
    const m = parseInt(month);
    const d = parseInt(day);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: FieldErrors = {};
    if (!name.trim() || name.trim().length < 2) newErrors.name = f.errors.name;

    const y = parseInt(year);
    const dateStr = buildDateString();
    if (!day || !month || !year || !dateStr) {
      newErrors.dateOfBirth = f.errors.dob;
    } else if (y < 1900 || y > currentYear) {
      newErrors.dateOfBirth = isThai ? `ปี ค.ศ. ต้องอยู่ระหว่าง 1900–${currentYear}` : `Year must be between 1900–${currentYear}`;
    }

    if (!question.trim()) newErrors.question = f.errors.question;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    onLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), dateOfBirth: dateStr, question: question.trim(), lang, userId: user?.uid }),
      });
      const data: ApiFortuneResponse = await res.json();
      onResult(data);
    } catch {
      setErrors({ general: f.errors.network });
    } finally {
      onLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-mystic-200">
          <User size={14} className="text-mystic-400" />
          {f.name}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={f.namePlaceholder}
          className={`mystic-input w-full px-4 py-3.5 text-sm ${errors.name ? "border-red-500/60" : ""}`}
        />
        {errors.name ? (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={12} />{errors.name}
          </motion.p>
        ) : (
          <p className="text-xs text-mystic-400/50">{f.nameHint}</p>
        )}
      </div>

      {/* Date of Birth — split: Day / Month / Year (ค.ศ.) */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-mystic-200">
          <Calendar size={14} className="text-mystic-400" />
          {f.dob}
          <span className="text-mystic-400/40 text-xs font-normal">(ค.ศ. / AD)</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          {/* Day */}
          <div>
            <span className="text-[11px] text-mystic-400/40 mb-1 block">{isThai ? "วัน" : "Day"}</span>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`mystic-input w-full px-3 py-3 text-sm cursor-pointer ${errors.dateOfBirth && !day ? "border-red-500/60" : ""}`}
            >
              <option value="" className="bg-[#0a0015]">—</option>
              {Array.from({ length: maxDays }, (_, i) => (
                <option key={i + 1} value={String(i + 1)} className="bg-[#0a0015]">{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div>
            <span className="text-[11px] text-mystic-400/40 mb-1 block">{isThai ? "เดือน" : "Month"}</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={`mystic-input w-full px-3 py-3 text-sm cursor-pointer ${errors.dateOfBirth && !month ? "border-red-500/60" : ""}`}
            >
              <option value="" className="bg-[#0a0015]">—</option>
              {monthOptions.map((m, i) => (
                <option key={i} value={String(i + 1)} className="bg-[#0a0015]">
                  {isThai ? m.th : m.en}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <span className="text-[11px] text-mystic-400/40 mb-1 block">{isThai ? "ปี (ค.ศ.)" : "Year (AD)"}</span>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2000"
              min={1900}
              max={currentYear}
              className={`mystic-input w-full px-3 py-3 text-sm ${errors.dateOfBirth && !year ? "border-red-500/60" : ""}`}
            />
          </div>
        </div>

        {errors.dateOfBirth ? (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={12} />{errors.dateOfBirth}
          </motion.p>
        ) : (
          <p className="text-xs text-mystic-400/50">{f.dobHint}</p>
        )}
      </div>

      {/* Question */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-mystic-200">
          <HelpCircle size={14} className="text-mystic-400" />
          {f.question}
        </label>
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={f.questionPlaceholder}
            rows={4}
            maxLength={500}
            className={`mystic-input w-full px-4 py-3.5 text-sm resize-none ${errors.question ? "border-red-500/60" : ""}`}
          />
          <span className="absolute bottom-3 right-3 text-xs text-mystic-400/40">{question.length}/500</span>
        </div>
        {errors.question ? (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={12} />{errors.question}
          </motion.p>
        ) : (
          <p className="text-xs text-mystic-400/50">{f.questionHint}</p>
        )}
      </div>

      <AnimatePresence>
        {errors.general && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            <AlertCircle size={16} />{errors.general}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="btn-mystic w-full py-4 rounded-xl text-sm font-semibold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 touch-manipulation"
      >
        <Sparkles size={18} className={isLoading ? "animate-spin" : "animate-pulse"} />
        {isLoading ? f.submitting : f.submit}
        {!isLoading && <Sparkles size={18} className="animate-pulse" />}
      </motion.button>

      <p className="text-center text-xs text-mystic-400/40">{f.footer}</p>
    </motion.form>
  );
}
