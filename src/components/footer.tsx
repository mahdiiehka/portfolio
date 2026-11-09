"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import { ArrowUp, socialIcons } from "./icons";

export function Footer() {
  const { lang } = useSite();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-[0.72rem] text-muted">
            © <span suppressHydrationWarning>{year ?? ""}</span>{" "}
            {profile.name[lang]} — {profile.footer.rights[lang]}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {profile.contact.socials.map((social) => {
            const Icon = socialIcons[social.key];
            return (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="btn-lift flex size-9 items-center justify-center rounded-full border border-line text-muted hover:border-accent hover:bg-accent hover:text-accentink"
              >
                <Icon className="size-3.5" />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.72rem] font-medium text-inksoft transition-colors hover:border-ink hover:text-ink"
          >
            {profile.footer.backToTop[lang]}
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
