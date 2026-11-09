import type { Metadata } from "next";
import { profile, type Lang } from "@/data/profile";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Resume — Mahdieh Kargar",
  description: "Bilingual curriculum vitae of Mahdieh Kargar, front-end developer.",
};

const COPY = {
  en: {
    profile: "Profile",
    skills: "Skills",
    soft: "Soft skills",
    projects: "Projects",
    experience: "Experience & Education",
    role: "Front-End Developer",
  },
  fa: {
    profile: "درباره من",
    skills: "مهارت‌ها",
    soft: "مهارت‌های نرم",
    projects: "پروژه‌ها",
    experience: "سابقه و تحصیلات",
    role: "توسعه‌دهنده فرانت‌اند",
  },
} as const;

const SUMMARY: Record<Lang, string> = {
  en: "Front-end developer focused on React, Next.js and TypeScript. I've built an API-driven online store, authentication forms and a corporate website — with a constant focus on performance, accessibility and interface detail.",
  fa: "فرانت‌اند با تمرکز روی React، Next.js و TypeScript. تجربهٔ ساخت فروشگاه اینترنتی متصل به API، فرم‌های احراز هویت و وب‌سایت شرکتی را دارم؛ با تمرکز همیشگی روی عملکرد، دسترس‌پذیری و جزئیات رابط کاربری.",
};

const JOURNEY_SHORT: Record<Lang, Record<number, string>> = {
  en: { 0: "Worked on a company's website." },
  fa: { 0: "کار روی وب‌سایت یک شرکت" },
};

function Sheet({ lang }: { lang: Lang }) {
  const rtl = lang === "fa";
  const copy = COPY[lang];
  const projects = profile.projects.items[lang].filter(
    (project) => !project.comingSoon,
  );

  return (
    <article
      dir={rtl ? "rtl" : "ltr"}
      className="resume rounded-2xl border border-line bg-surface p-8 shadow-[var(--shadow-soft)] sm:p-10 print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none"
    >
      <header className="border-b border-line pb-5 print:border-neutral-300">
        <p className="label text-accent">Curriculum Vitae</p>
        <h1
          className={`mt-2 text-4xl text-ink sm:text-5xl ${
            rtl ? "display-fa" : "display-en"
          }`}
        >
          {profile.hero.headingName[lang]}
        </h1>
        <p className={`mt-1 text-lg text-accent ${rtl ? "font-semibold" : "serif-em"}`}>
          {copy.role}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.76rem] text-muted">
          <span dir="ltr">{profile.contact.email}</span>
          <span>{profile.location[lang]}</span>
          <span dir="ltr">github.com/mahdiiehka</span>
          <span dir="ltr">instagram.com/mahdiiehka_</span>
          <span dir="ltr">t.me/Mahdiieh_ka</span>
        </div>
      </header>

      <section className="mt-5">
        <h2 className="label text-accent">{copy.profile}</h2>
        <p className="mt-2 text-[0.88rem] leading-[1.85] text-inksoft">
          {SUMMARY[lang]}
        </p>
      </section>

      <section className="mt-5">
        <h2 className="label text-accent">{copy.skills}</h2>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {profile.skills.stack.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-inksoft"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-[0.78rem] text-muted">
          <span className="font-medium text-inksoft">{copy.soft}: </span>
          {profile.skills.soft[lang].join(" · ")}
        </p>
      </section>

      <section className="mt-5">
        <h2 className="label text-accent">{copy.projects}</h2>
        <div className="mt-3 space-y-3.5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="border-s-2 border-accent/25 ps-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[0.92rem] font-semibold text-ink">
                  {project.title}
                </h3>
                <span className="text-[0.7rem] text-muted">{project.year}</span>
              </div>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
                {project.desc}
              </p>
              <p className="mt-1 text-[0.7rem] text-accent">
                {project.tags.join(" · ")}
              </p>
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="mt-1 inline-block text-[0.7rem] text-inksoft underline underline-offset-4 hover:text-accent"
                >
                  {project.repo}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="label text-accent">{copy.experience}</h2>
        <div className="mt-3 space-y-3">
          {profile.journey.items[lang].map((item, index) => (
            <div key={item.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[0.88rem] font-semibold text-ink">
                  {item.title}
                </h3>
                <span className="text-[0.7rem] text-muted">{item.year}</span>
              </div>
              <p className="mt-0.5 text-[0.78rem] leading-relaxed text-muted">
                {JOURNEY_SHORT[lang][index] ?? item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-7 border-t border-line pt-3 text-[0.68rem] text-muted print:border-neutral-300">
        {profile.hero.headingName[lang]} — mahdiehkargar.ir
      </footer>
    </article>
  );
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-bg py-10 text-ink print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl px-5 print:max-w-none print:px-0">
        <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
          <a
            href="/"
            className="text-[0.8rem] text-muted transition-colors hover:text-accent"
          >
            ← Back to portfolio
          </a>
          <PrintButton />
        </div>

        <Sheet lang="en" />

        <div className="my-8 print:hidden" aria-hidden />

        <div className="break-before-page">
          <Sheet lang="fa" />
        </div>
      </div>
    </main>
  );
}
