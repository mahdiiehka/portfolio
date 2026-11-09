"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  className?: string;
  /** سرعت تایپ هر کاراکتر به میلی‌ثانیه */
  speed?: number;
};

/** متن را وقتی وارد دید شد، کاراکتر به کاراکتر تایپ می‌کند. */
export function Typewriter({ text, className = "", speed = 45 }: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
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
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const timer = window.setTimeout(() => setCount((prev) => prev + 1), speed);
    return () => window.clearTimeout(timer);
  }, [started, count, text.length, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span className="type-caret" aria-hidden />
    </span>
  );
}
