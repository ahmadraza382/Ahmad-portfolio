"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Reads/writes the theme from localStorage and reflects it on
 * <html data-theme="...">, exactly like the original portfolio.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let initial: Theme = "light";
    try {
      const stored = localStorage.getItem("pf-theme") as Theme | null;
      if (stored === "light" || stored === "dark") initial = stored;
    } catch {
      /* ignore */
    }
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("pf-theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
