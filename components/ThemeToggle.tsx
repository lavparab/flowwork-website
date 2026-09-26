"use client";

import { useEffect, useState } from "react";
import { setCalTheme } from "@/lib/cal-client";
import { currentTheme, THEME_COLORS, THEME_KEY, type Theme } from "@/lib/theme";

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
  setCalTheme(theme);
}

function savedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/** Sun/moon button. Follows the system setting until the visitor picks a theme. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Unknown until mounted: the server can't know which theme the head script chose.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const t = currentTheme();
    setTheme(t);
    apply(t);

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (savedTheme()) return;
      const next = e.matches ? "light" : "dark";
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => {
        apply(next);
        setTheme(next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          /* private mode: the choice lasts for this page only */
        }
      }}
      aria-label={theme ? `Switch to ${next} mode` : "Switch colour theme"}
      title={theme ? `Switch to ${next} mode` : undefined}
      className={`grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-text ${className}`}
    >
      {/* Sun on dark (click for light), moon on light (click for dark). */}
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] light:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden h-[18px] w-[18px] light:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
        <path d="M20.5 14.2A8.5 8.5 0 019.8 3.5a8.5 8.5 0 1010.7 10.7z" />
      </svg>
    </button>
  );
}
