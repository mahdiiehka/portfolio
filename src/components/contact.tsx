"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { useSite } from "@/lib/site-context";
import {
  ArrowUpRight,
  Check,
  MapPin,
  socialIcons,
} from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const SOCIAL_ORDER = ["mail", "telegram", "instagram", "github"] as const;

function handleFromHref(href: string) {
  const parts = href.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "";
  return last.startsWith("@") ? last : `@${last}`;
}

export function Contact() {
  const { lang } = useSite();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "unconfigured" | "activation"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
      });

      if (response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          activationRequired?: boolean;
        } | null;

        if (payload?.activationRequired) {
          setStatus("activation");
          return;
        }

        setStatus("success");
        form.reset();
        return;
      }

      setStatus(response.status === 503 ? "unconfigured" : "error");
    } catch {
      setStatus("error");
    }
  }

  const socials = SOCIAL_ORDER.map((key) =>
    profile.contact.socials.find((social) => social.key === key),
  ).filter((social): social is (typeof profile.contact.socials)[number] =>
    Boolean(social),
  );

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            kicker={profile.contact.kicker}
            title={profile.contact.title}
            intro={profile.contact.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {/* ---------- اطلاعات تماس ---------- */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-ink p-6 text-bg sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -end-20 -top-20 size-64 rounded-full opacity-25 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                }}
              />

              <div className="relative">
                <span className="label text-bg/50!">
                  {lang === "fa" ? "اطلاعات تماس" : "Contact details"}
                </span>
                <h3 className="mt-2 text-[1.35rem] font-semibold">
                  {lang === "fa" ? "راه‌های ارتباطی" : "Ways to reach me"}
                </h3>

                <div className="mt-6 space-y-2.5">
                  {socials.map((social) => {
                    const Icon = socialIcons[social.key];
                    const isMail = social.key === "mail";
                    const value = isMail
                      ? profile.contact.email
                      : handleFromHref(social.href);
                    const href = isMail
                      ? `mailto:${profile.contact.email}`
                      : social.href;

                    return (
                      <a
                        key={social.key}
                        href={href}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noopener noreferrer"}
                        className="group flex items-center gap-3 rounded-2xl border border-bg/10 px-3.5 py-3 transition-colors duration-300 hover:border-accent/60 hover:bg-bg/5"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-bg/15 text-accent">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-bg/45">
                            {isMail
                              ? lang === "fa"
                                ? "ایمیل"
                                : "Email"
                              : social.label}
                          </span>
                          <span
                            dir="ltr"
                            className="block truncate text-end text-[0.82rem] text-bg/85"
                          >
                            {value}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-bg/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-bg/10 pt-5">
                  <span className="flex items-center gap-1.5 text-[0.75rem] text-bg/55">
                    <MapPin className="size-3.5" />
                    {profile.location[lang]}
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.72rem] text-bg/55">
                    <span className="pulse-dot size-1.5 rounded-full bg-accent" />
                    {profile.availability.label[lang]}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------- فرم ---------- */}
          <Reveal delay={90}>
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col rounded-[1.8rem] border border-line bg-surface p-6 sm:p-8"
            >
              <span className="label">
                {lang === "fa" ? "ارسال پیام" : "Send a message"}
              </span>

              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label text-[0.6rem]">
                    {profile.contact.form.name[lang]}
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={profile.contact.form.namePlaceholder[lang]}
                    className="mt-1.5 w-full rounded-xl border border-line bg-bg/40 px-3.5 py-2.5 text-[0.85rem] text-ink transition-colors duration-300 placeholder:text-muted/60 hover:border-muted/50 focus:border-accent focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="label text-[0.6rem]">
                    {profile.contact.form.email[lang]}
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    placeholder={profile.contact.form.emailPlaceholder[lang]}
                    className="mt-1.5 w-full rounded-xl border border-line bg-bg/40 px-3.5 py-2.5 text-[0.85rem] text-ink transition-colors duration-300 placeholder:text-muted/60 hover:border-muted/50 focus:border-accent focus:outline-none"
                  />
                </label>
              </div>

              <label className="mt-4 block flex-1">
                <span className="label text-[0.6rem]">
                  {profile.contact.form.message[lang]}
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder={profile.contact.form.messagePlaceholder[lang]}
                  className="mt-1.5 w-full resize-none rounded-xl border border-line bg-bg/40 px-3.5 py-2.5 text-[0.85rem] text-ink transition-colors duration-300 placeholder:text-muted/60 hover:border-muted/50 focus:border-accent focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="sheen btn-lift group mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.82rem] font-semibold text-accentink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "sending"
                  ? profile.contact.form.sending[lang]
                  : profile.contact.form.submit[lang]}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <div aria-live="polite" className="mt-2">
                {status === "success" ? (
                  <p className="flex items-start gap-2 text-[0.78rem] text-emerald-600 dark:text-emerald-400">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {profile.contact.form.success[lang]}
                  </p>
                ) : null}

                {status === "error" ? (
                  <p className="text-[0.78rem] leading-relaxed text-red-600 dark:text-red-400">
                    {profile.contact.form.error[lang]}{" "}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="underline underline-offset-4"
                    >
                      {profile.contact.email}
                    </a>
                  </p>
                ) : null}

                {status === "unconfigured" ? (
                  <p className="text-[0.78rem] leading-relaxed text-muted">
                    {profile.contact.form.unconfigured[lang]}{" "}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-accent underline underline-offset-4"
                    >
                      {profile.contact.email}
                    </a>
                  </p>
                ) : null}

                {status === "activation" ? (
                  <p className="text-[0.78rem] leading-relaxed text-amber-600 dark:text-amber-400">
                    {profile.contact.form.activation[lang]}{" "}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-accent underline underline-offset-4"
                    >
                      {profile.contact.email}
                    </a>
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
