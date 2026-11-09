"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import { Close, Menu, Moon, Sun } from "./icons";

export function Header() {
  const { lang, t, theme, setTheme, toggleLang } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = profile.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/85 shadow-[0_10px_40px_-32px_rgba(60,20,25,0.5)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#home"
            className="display-en text-[1.45rem] font-bold tracking-tight text-accent"
            aria-label={profile.fullName}
          >
            MK
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {profile.nav.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-active={isActive}
                  className={`link-underline text-[0.8rem] transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-inksoft hover:text-accent"
                  }`}
                >
                  {item[lang]}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* تغییر تم */}
            <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-label="Light theme"
                aria-pressed={theme === "light"}
                className={`flex size-7 items-center justify-center rounded-full transition-colors duration-300 ${
                  theme === "light"
                    ? "bg-accent text-accentink"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Sun className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-label="Dark theme"
                aria-pressed={theme === "dark"}
                className={`flex size-7 items-center justify-center rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-accent text-accentink"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Moon className="size-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={toggleLang}
              aria-label={t(profile.ui.language)}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-2 text-[0.72rem] font-medium text-inksoft transition-colors hover:border-accent hover:text-accent"
            >
              {lang === "en" ? "En" : "Fa"}
              <span aria-hidden className="text-[0.6rem]">▾</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t(profile.ui.menu)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            >
              <Menu className="size-4.5" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="pop-in fixed inset-0 z-[60] flex flex-col bg-bg md:hidden">
          <div className="flex h-[4.5rem] items-center justify-between px-5">
            <span className="display-en text-[1.45rem] font-bold text-accent">
              MK
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={t(profile.ui.close)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
            >
              <Close className="size-4.5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-5 pt-4">
            {profile.nav.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
                className="pop-in flex items-baseline justify-between border-b border-line py-4 text-2xl font-medium text-ink"
              >
                <span>{item[lang]}</span>
                <span className="label text-[0.65rem]">
                  0{index + 1}
                </span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="sheen mt-8 flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-accentink"
            >
              {profile.hero.ctaSecondary[lang]}
            </a>

            <p className="mt-auto py-8 text-center text-xs text-muted">
              {profile.contact.email}
            </p>
          </nav>
        </div>
      ) : null}
    </>
  );
}
