"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations } from "@/lib/translations";

type AnyTranslation = typeof translations.th | typeof translations.en;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: AnyTranslation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "th" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
