"use client";

import { useEffect, useRef } from "react";

/**
 * پس‌زمینهٔ سه‌بعدی خیلی ظریف: چند کرهٔ محو + حلقهٔ چرخان
 * با پارالاکس آرام موس و اسکرول.
 */
export function Background3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const onMove = (event: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };

    const onScroll = () => {
      el.style.setProperty("--sy", String(Math.min(window.scrollY, 1600)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* هاله‌های نرم */}
      <div
        className="absolute -top-48 end-[-12%] size-[42rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft), transparent 65%)",
          transform:
            "translate3d(calc(var(--mx, 0) * 16px), calc(var(--my, 0) * 16px - var(--sy, 0) * 0.04px), 0)",
        }}
      />
      <div
        className="absolute -bottom-56 start-[-14%] size-[36rem] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--surface-2), transparent 70%)",
          transform:
            "translate3d(calc(var(--mx, 0) * -12px), calc(var(--my, 0) * -12px + var(--sy, 0) * 0.03px), 0)",
        }}
      />

      {/* حلقهٔ چرخان */}
      <div
        className="absolute start-[6%] top-[18%] hidden size-[24rem] rounded-full border border-dashed border-accent/15 lg:block"
        style={{
          transform:
            "translate3d(calc(var(--mx, 0) * 26px), calc(var(--my, 0) * 26px), 0)",
        }}
      >
        <div className="spin-slow size-full rounded-full border border-accent/10" />
      </div>

      {/* کره‌های شیشه‌ای */}
      <div
        className="absolute end-[8%] top-[42%] hidden sm:block"
        style={{
          transform:
            "translate3d(calc(var(--mx, 0) * 34px), calc(var(--my, 0) * 34px), 0)",
        }}
      >
        <div
          className="orb shape-3d size-20 opacity-50 sm:size-24"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div
        className="absolute start-[12%] bottom-[16%] hidden md:block"
        style={{
          transform:
            "translate3d(calc(var(--mx, 0) * -40px), calc(var(--my, 0) * -40px), 0)",
        }}
      >
        <div
          className="orb shape-3d size-12 opacity-40 sm:size-16"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* نقطهٔ کوچک براق */}
      <div
        className="absolute end-[16%] top-[12%] size-2.5 rounded-full bg-accent/30 blur-[1px]"
        style={{
          transform:
            "translate3d(calc(var(--mx, 0) * 50px), calc(var(--my, 0) * 50px), 0)",
        }}
      />
    </div>
  );
}
