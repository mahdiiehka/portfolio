"use client";

import { useEffect, useState } from "react";

type Part = { text: string; accent?: boolean; className?: string };

type TypeLoopProps = {
  parts: Part[];
  /** سرعت تایپ هر کاراکتر (میلی‌ثانیه) */
  speed?: number;
  className?: string;
};

/** متن را یک‌بار تایپ می‌کند و بعد ثابت می‌ماند. */
export function TypeLoop({
  parts,
  speed = 95,
  className = "",
}: TypeLoopProps) {
  const full = parts.map((part) => part.text).join("");
  const [count, setCount] = useState(1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setCount(full.length);
    }
  }, [full.length]);

  useEffect(() => {
    if (reduced) return;
    if (count >= full.length) return;

    const timer = window.setTimeout(() => setCount((value) => value + 1), speed);
    return () => window.clearTimeout(timer);
  }, [count, full.length, speed, reduced]);

  let offset = 0;
  const rendered = parts.map((part, index) => {
    const start = offset;
    offset += part.text.length;

    const visibleLength = Math.max(
      0,
      Math.min(part.text.length, count - start),
    );
    if (visibleLength <= 0) return null;

    const visible = part.text.slice(0, visibleLength);

    return part.accent ? (
      <span key={index} className={`text-accent ${part.className ?? ""}`}>
        {visible}
      </span>
    ) : (
      <span key={index} className={part.className}>
        {visible}
      </span>
    );
  });

  const typing = !reduced && count < full.length;

  return (
    <span className={className}>
      <span className="sr-only">{full}</span>
      <span aria-hidden>
        {rendered}
        {typing ? <span className="type-caret" /> : null}
      </span>
    </span>
  );
}
