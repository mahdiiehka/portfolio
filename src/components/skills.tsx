"use client";

import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import { Check, Github } from "./icons";
import { Reveal } from "./reveal";

function TechIcon({ name }: { name: string }) {
  const key = name.toLowerCase();
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (key.includes("react")) {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (key.includes("next")) {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M8.5 16V8l7 8V8" />
      </svg>
    );
  }

  if (key.includes("tailwind")) {
    return (
      <svg {...common}>
        <path d="M4 10c1.5-3 3.5-4 6-3 1.3.5 2 1.6 3 2.3 1.2.8 2.4.8 4-.3-1.5 3-3.5 4-6 3-1.3-.5-2-1.6-3-2.3-1.2-.8-2.4-.8-4 .3Z" />
        <path d="M4 16c1.5-3 3.5-4 6-3 1.3.5 2 1.6 3 2.3 1.2.8 2.4.8 4-.3-1.5 3-3.5 4-6 3-1.3-.5-2-1.6-3-2.3-1.2-.8-2.4-.8-4 .3Z" />
      </svg>
    );
  }

  if (key.includes("github")) return <Github className="size-[22px]" />;

  if (key.includes("vercel")) {
    return (
      <svg {...common}>
        <path d="M12 4 21 20H3L12 4Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (key.includes("node")) {
    return (
      <svg {...common}>
        <path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z" />
        <path d="M12 8v8M9 10.5l3-1.5 3 1.5" />
      </svg>
    );
  }

  if (key.includes("vs code") || key.includes("vscode")) {
    return (
      <svg {...common}>
        <path d="m14 4 5 3v10l-5 3-8-5.5L3 17l-1-2 6-3-6-3 1-2 3 2.5L14 4Z" />
      </svg>
    );
  }

  const label = key.includes("javascript")
    ? "JS"
    : key.includes("typescript")
      ? "TS"
      : key.includes("html")
        ? "5"
        : key.includes("css")
          ? "3"
          : name.slice(0, 2).toUpperCase();

  return (
    <svg {...common}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}

export function Skills() {
  const { lang } = useSite();

  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="section-rule h-px bg-accent/50" aria-hidden />
            <span className="text-[0.95rem] font-semibold text-inksoft">
              {profile.skills.kicker[lang]}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <h2
              className={`text-balance ${
                lang === "en"
                  ? "display-en text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]"
                  : "display-fa text-[clamp(1.9rem,4.2vw,2.9rem)] leading-[1.35]"
              }`}
            >
              {profile.skills.title[lang]}
            </h2>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-muted">
              {profile.skills.intro[lang]}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {profile.skills.soft[lang].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.72rem] text-inksoft"
                >
                  <Check className="size-3 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {profile.skills.stack.map((tech, index) => (
                <Reveal key={tech} delay={index * 35}>
                  <div
                    className="skill-float group flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-3 transition-colors duration-300 hover:border-accent/45 hover:bg-accentsoft/25 hover:shadow-[var(--shadow-soft)]"
                    style={{
                      animationDelay: `${index * -0.45}s`,
                      animationDuration: `${7 + (index % 3)}s`,
                    }}
                  >
                    <span className="text-accent transition-transform duration-300 group-hover:scale-110">
                      <TechIcon name={tech} />
                    </span>
                    <span className="text-[0.78rem] font-medium text-ink">
                      {tech}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
