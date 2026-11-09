"use client";

import type { MouseEvent } from "react";
import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import { ArrowUpRight, Code } from "./icons";
import { Reveal } from "./reveal";
import { Tilt3D } from "./tilt-3d";

const MEDIA_BACKGROUNDS = [
  "radial-gradient(120% 120% at 18% 15%, var(--accent-soft), transparent 62%), linear-gradient(135deg, var(--surface-2), var(--surface))",
  "radial-gradient(120% 120% at 82% 20%, var(--accent-soft), transparent 60%), linear-gradient(160deg, var(--surface-2), var(--surface))",
  "radial-gradient(110% 110% at 25% 85%, var(--accent-soft), transparent 58%), linear-gradient(120deg, var(--surface-2), var(--surface))",
];

function trackPointer(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function Projects() {
  const { lang, t } = useSite();
  const items = profile.projects.items[lang];

  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="section-rule h-px bg-accent/50" aria-hidden />
              <h2
                className={`text-ink ${
                  lang === "en"
                    ? "display-en text-[clamp(2rem,4.6vw,3.1rem)]"
                    : "display-fa text-[clamp(1.8rem,4.2vw,2.8rem)]"
                }`}
              >
                {profile.projects.title[lang]}
              </h2>
            </div>

            <a
              href={profile.projects.viewAllHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-accent"
            >
              {profile.projects.viewAll[lang]}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => {
            /* ---------- کارت «به‌زودی» ---------- */
            if (project.comingSoon) {
              return (
                <Reveal
                  key={`${project.title}-${index}`}
                  delay={(index % 3) * 80}
                  className="h-full"
                >
                  <article className="group relative h-full min-h-[19rem] overflow-hidden rounded-[1.2rem] border border-line bg-surface">
                    {project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 size-full scale-110 object-cover blur-[6px] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.14]"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="absolute inset-0 scale-110 blur-[6px]"
                        style={{
                          backgroundImage:
                            MEDIA_BACKGROUNDS[index % MEDIA_BACKGROUNDS.length],
                        }}
                      />
                    )}

                    <div
                      aria-hidden
                      className="absolute inset-0 bg-bg/35 transition-colors duration-500 group-hover:bg-bg/25"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full border border-ink/10 bg-bg/90 px-6 py-2.5 text-[0.78rem] font-semibold tracking-[0.08em] text-ink shadow-[var(--shadow-soft)] backdrop-blur">
                        Coming Soon
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            }

            /* ---------- کارت معمولی ---------- */
            return (
              <Reveal key={`${project.title}-${index}`} delay={(index % 3) * 80}>
                <Tilt3D max={4} className="h-full">
                  <article
                    onMouseMove={trackPointer}
                    className="spotlight group flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-accent/45 hover:shadow-[0_30px_60px_-32px_rgba(110,20,35,0.5)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {project.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                          style={{
                            backgroundImage:
                              MEDIA_BACKGROUNDS[index % MEDIA_BACKGROUNDS.length],
                          }}
                        />
                      )}

                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#1a0d10]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />

                      {project.tags[0] ? (
                        <span className="absolute bottom-3 end-3 rounded-full bg-bg/90 px-3 py-1 text-[0.64rem] font-medium text-ink backdrop-blur transition-transform duration-500 group-hover:-translate-y-0.5">
                          {project.tags[0]}
                        </span>
                      ) : null}

                      <span className="absolute bottom-3 start-3 flex size-9 translate-y-3 items-center justify-center rounded-full bg-bg text-accent opacity-0 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[1rem] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
                        {project.title}
                      </h3>
                    <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-muted">
                      {project.desc}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-3.5">
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[0.74rem] font-semibold text-accent"
                        >
                          {t(profile.projects.labels.demo)}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : null}

                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[0.74rem] font-semibold text-accent"
                        >
                          <Code className="size-3.5" />
                          {t(profile.projects.labels.repo)}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
