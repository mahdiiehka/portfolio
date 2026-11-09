"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[0.78rem] font-semibold text-accentink transition-transform hover:-translate-y-0.5"
    >
      Download PDF / Print
    </button>
  );
}
