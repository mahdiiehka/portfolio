"use client";

import { useEffect, useRef, useState } from "react";

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toLatinDigits(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)));
}

function toFaDigits(value: number) {
  return String(value).replace(/[0-9]/g, (digit) => FA_DIGITS[Number(digit)]);
}

type StatValueProps = {
  value: string;
  className?: string;
};

/** عدد آمار را وقتی وارد دید شد، از صفر تا مقدار نهایی می‌شمارد. */
export function StatValue({ value, className = "" }: StatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const match = value.match(/^([0-9۰-۹]+)(.*)$/u);
  const target = match ? Number(toLatinDigits(match[1])) : null;
  const suffix = match ? match[2] : "";
  const persianDigits = match ? /[۰-۹]/.test(match[1]) : false;

  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      setStarted(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!started || target === null) return;

    let raf = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [started, target]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  const text = persianDigits ? toFaDigits(current) : String(current);

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}
