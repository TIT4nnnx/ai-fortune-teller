"use client";

import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-mystic-500/10 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mystic-400/50">
        <p>
          © {year} Mystic Oracle —{" "}
          {lang === "th" ? "พัฒนาโดย" : "Built by"}{" "}
          <span className="text-mystic-300/80 font-medium">Suphakorn Komod</span>
        </p>
        <p className="flex items-center gap-1.5">
          <span>⚡</span>
          Next.js · OpenAI · Firebase
        </p>
      </div>
    </footer>
  );
}
