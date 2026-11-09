"use client";

import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import { ArrowUpRight, FileText, Sparkle, socialIcons } from "./icons";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";
import { TypeLoop } from "./type-loop";

export function Hero() {
  const { lang } = useSite();

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-14 sm:pt-32"
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          {/* ---------- متن ---------- */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-surface px-4 py-2 text-[0.72rem] font-medium text-ink shadow-sm">
                <span className="pulse-dot size-2 rounded-full bg-emerald-500" />
                {profile.hero.eyebrow[lang]}
                <Sparkle className="size-3.5 text-accent" />
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h1
                className={`mt-6 ${
                  lang === "en" ? "display-en" : "display-fa"
                } text-[clamp(2.9rem,7vw,5.2rem)] leading-[1.05]`}
              >
                <TypeLoop
                  key={lang}
                  speed={65}
                  className="block"
                  parts={[
                    {
                      text: profile.hero.headingPrefix[lang],
                      className:
                        "block text-[0.32em] font-medium leading-[1.6] text-muted",
                    },
                    {
                      text: profile.hero.headingName[lang],
                      accent: true,
                      className: "block",
                    },
                  ]}
                />
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <div className="mt-5 flex items-center gap-4">
                <p className="text-[0.95rem] font-medium text-ink">
                  {profile.hero.tagline[lang]}
                </p>
                <span className="h-px w-24 bg-line" aria-hidden />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-md whitespace-pre-line text-[0.92rem] leading-[1.95] text-muted">
                {profile.hero.intro[lang]}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted">
                {profile.hero.rolesLine}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="sheen btn-lift group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.82rem] font-semibold text-accentink"
                >
                  {profile.hero.ctaPrimary[lang]}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#contact"
                  className="btn-lift inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[0.82rem] font-semibold text-ink hover:border-accent hover:text-accent"
                >
                  {profile.hero.ctaSecondary[lang]}
                </a>
                <a
                  href={profile.contact.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lift inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-[0.78rem] font-medium text-inksoft hover:border-accent hover:text-accent"
                >
                  <FileText className="size-4" />
                  {profile.contact.resume[lang]}
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex items-center gap-4">
                {profile.contact.socials.map((social, index) => {
                  const Icon = socialIcons[social.key];
                  return (
                    <div key={social.key} className="flex items-center gap-4">
                      <a
                        href={social.href}
                        target={social.key === "mail" ? undefined : "_blank"}
                        rel={
                          social.key === "mail"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        aria-label={social.label}
                        className="group flex size-10 items-center justify-center rounded-full border border-line text-inksoft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accentink"
                      >
                        <Icon className="size-4" />
                      </a>
                      {index < profile.contact.socials.length - 1 ? (
                        <span
                          className="h-5 w-px bg-line"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ---------- تصویر (جای عکس خالی) ---------- */}
          <Reveal delay={160} className="relative mx-auto w-full max-w-[30rem]">
            <Parallax strength={-16}>
              <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-line bg-surface shadow-[var(--shadow-soft)] dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt={profile.hero.headingName[lang]}
                  className="size-full object-cover transition-[filter] duration-500 dark:brightness-[0.8] dark:contrast-[1.06] dark:saturate-[0.92]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-bg/15 dark:hidden"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#150f0c]/55 via-[#150f0c]/10 to-[#150f0c]/25 dark:block"
                />
              </div>
            </div>
            </Parallax>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
