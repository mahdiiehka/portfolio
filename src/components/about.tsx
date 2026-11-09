"use client";

import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import { Compass } from "./icons";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";
import { StatValue } from "./stat-value";

export function About() {
  const { lang } = useSite();

  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* عنوان بخش */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="section-rule h-px bg-accent/50" aria-hidden />
            <span className="text-[0.95rem] font-semibold text-inksoft">
              {profile.about.kicker[lang]}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* جای عکس — فعلاً خالی */}
          <Reveal variant="scale">
            <Parallax strength={-18}>
              <div className="relative">
              <div
                aria-hidden
                className="absolute -start-4 top-8 h-[82%] w-[72%] rounded-[2rem] bg-accent"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-illustration.svg"
                  alt=""
                  aria-hidden
                  className="size-full object-cover"
                />
              </div>
              </div>
            </Parallax>
          </Reveal>

          {/* متن */}
          <div>
            <Reveal delay={80}>
              <h2
                className={`text-balance ${
                  lang === "en"
                    ? "display-en text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02]"
                    : "display-fa text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.35]"
                }`}
              >
                {profile.about.title[lang]}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 space-y-4">
                {profile.about.paragraphs[lang].map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[0.93rem] leading-[1.95] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
                {profile.about.stats[lang].map((stat) => (
                  <div
                    key={stat.label}
                    className="group flex items-baseline gap-3 border-b border-line pb-3 last:border-0 sm:block sm:border-0 sm:pb-0"
                  >
                    <dt className="order-2 text-[0.72rem] leading-snug text-muted sm:order-none sm:mt-1.5 sm:block">
                      {stat.label}
                    </dt>
                    <dd className="order-1 sm:order-none">
                      <span
                        className={`block text-accent transition-colors duration-300 ${
                          lang === "en"
                            ? "display-en text-[2.3rem] leading-none"
                            : "text-[1.8rem] font-extrabold leading-none"
                        }`}
                      >
                        <StatValue value={stat.value} />
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* ---------- مسیر ---------- */}
        <div id="journey" className="mt-24 scroll-mt-24">
          <Reveal>
            <div>
              <div className="flex items-center gap-3">
                <span className="section-rule h-px bg-accent/50" aria-hidden />
                <span className="text-[0.95rem] font-semibold text-inksoft">
                  {profile.journey.kicker[lang]}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>

              <h3
                className={`mt-3 flex items-center gap-3 text-ink ${
                  lang === "en"
                    ? "display-en text-[clamp(2rem,4.4vw,3.2rem)]"
                    : "display-fa text-[clamp(1.8rem,4.2vw,3rem)]"
                }`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent-soft/60 sm:size-10">
                  <Compass className="size-4.5 text-accent" />
                </span>
                {profile.journey.title[lang]}
              </h3>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {profile.journey.items[lang].map((item, index) => (
              <Reveal key={`${item.year}-${index}`} delay={index * 70}>
                <div className="group relative border-t border-line pt-6">
                  <span className="absolute -top-[5px] start-0 size-2.5 rounded-full border-2 border-bg bg-line transition-all duration-500 group-hover:scale-125 group-hover:bg-accent" />
                  <span className="label text-accent">{item.year}</span>
                  <h4 className="mt-3 text-[1.02rem] font-semibold text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
