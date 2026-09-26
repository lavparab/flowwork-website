export type Theme = "light" | "dark";

export const THEME_KEY = "theme";
export const THEME_COLORS: Record<Theme, string> = { dark: "#0A0A0A", light: "#F7F7F5" };

/**
 * Runs in <head> before the page paints: a saved choice wins, otherwise the
 * system setting. Kept as a string so it can be inlined without a request.
 */
export const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem("${THEME_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t})()`;

export function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
