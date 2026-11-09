"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { L, Lang } from "@/data/profile";

type Theme = "light" | "dark";
type Dir = "rtl" | "ltr";

type SiteContextValue = {
  lang: Lang;
  dir: Dir;
  theme: Theme;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** ترجمهٔ یک مقدار دوزبانه */
  t: (value: L) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const LANG_KEY = "site-lang";
const THEME_KEY = "theme";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  // مقدار ذخیره‌شده را بعد از hydration بخوان (بدون خطای hydration)
  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem(LANG_KEY);
      if (savedLang === "fa" || savedLang === "en") setLangState(savedLang);

      const savedTheme = window.localStorage.getItem(THEME_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else {
        setTheme("light");
      }
    } catch {
      /* دسترسی به localStorage ممکن نیست */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "fa" ? "en" : "fa";
      try {
        window.localStorage.setItem(LANG_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setThemeValue = useCallback((next: Theme) => {
    setTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((value: L) => value[lang], [lang]);

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      dir: lang === "fa" ? "rtl" : "ltr",
      theme,
      setLang,
      toggleLang,
      setTheme: setThemeValue,
      toggleTheme,
      t,
    }),
    [lang, theme, setLang, toggleLang, setThemeValue, toggleTheme, t],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSite باید داخل SiteProvider استفاده شود.");
  }
  return ctx;
}
