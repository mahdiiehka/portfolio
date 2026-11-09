"use client";

import type { L } from "@/data/profile";
import { useSite } from "@/lib/site-context";

type SectionHeadingProps = {
  kicker: L;
  title: L;
  intro?: L;
  align?: "start" | "center";
  index?: string;
};

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "start",
  index,
}: SectionHeadingProps) {
  const { lang } = useSite();
  const centered = align === "center";

  return (
    <div className={centered ? "flex flex-col items-center text-center" : ""}>
      <div className="flex items-center gap-3">
        {index ? (
          <span className="label text-accent">{index}</span>
        ) : null}
        <span className="section-rule h-px bg-accent" aria-hidden />
        <span className="label">{kicker[lang]}</span>
      </div>

      <h2
        className={`mt-4 max-w-3xl text-balance ${
          lang === "en"
            ? "display-en text-[clamp(2.1rem,4.6vw,3.7rem)]"
            : "display-fa text-[clamp(1.7rem,3.9vw,2.9rem)]"
        }`}
      >
        {title[lang]}
      </h2>

      {intro ? (
        <p
          className={`mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {intro[lang]}
        </p>
      ) : null}
    </div>
  );
}
