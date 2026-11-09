"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  /** حداکثر زاویه چرخش به درجه */
  max?: number;
};

/** چرخش سه‌بعدی ملایم کارت‌ها با حرکت موس. روی لمس و حالت کم‌حرکت غیرفعال است. */
export function Tilt3D({ children, className = "", max = 6 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;

    const apply = () => {
      raf = 0;
      el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(
        2,
      )}deg) rotateY(${ry.toFixed(2)}deg)`;
    };

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      ry = px * max * 2;
      rx = -py * max * 2;

      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);

      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt3d ${className}`}>
      {children}
    </div>
  );
}
