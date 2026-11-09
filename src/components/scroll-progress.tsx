"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/lib/site-context";

export function ScrollProgress() {
  const { dir } = useSite();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-accent/70 via-accent to-accent transition-transform duration-150 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: dir === "rtl" ? "right" : "left",
        }}
      />
    </div>
  );
}
