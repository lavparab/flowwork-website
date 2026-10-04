"use client";

import { track } from "./analytics";
import { CAL_NAMESPACE } from "./cal";
import { currentTheme, type Theme } from "./theme";

/**
 * The booker in our brand colours. It runs in a cal.com iframe that can't read
 * our CSS variables, so the values are copied from globals.css. Lime is always
 * a fill with black text, never text on white (brand guidelines, p. 9).
 */
const CAL_THEME = {
  dark: {
    "cal-brand": "#C1FF72",
    "cal-brand-emphasis": "#D2FF96",
    "cal-brand-text": "#0A0A0A",
    "cal-brand-accent": "#0A0A0A",
    "cal-brand-subtle": "#2C3A1C",
    "cal-bg": "#111111",
    "cal-bg-emphasis": "#1E1E1E",
    "cal-bg-subtle": "#161616",
    "cal-bg-muted": "#141414",
    "cal-bg-inverted": "#F2F2F0",
    "cal-border": "#242424",
    "cal-border-subtle": "#242424",
    "cal-border-emphasis": "#333333",
    "cal-border-muted": "#1E1E1E",
    "cal-border-booker": "#242424",
    "cal-text": "#CFCFCA",
    "cal-text-emphasis": "#F2F2F0",
    "cal-text-subtle": "#A3A39E",
    "cal-text-muted": "#85857F",
    "cal-text-inverted": "#0A0A0A",
    radius: "12px",
  },
  light: {
    "cal-brand": "#C1FF72",
    "cal-brand-emphasis": "#B4F15C",
    "cal-brand-text": "#0A0A0A",
    "cal-brand-accent": "#0A0A0A",
    "cal-brand-subtle": "#E3F4C9",
    "cal-bg": "#FFFFFF",
    "cal-bg-emphasis": "#E9E9E4",
    "cal-bg-subtle": "#F1F1ED",
    "cal-bg-muted": "#F7F7F5",
    "cal-bg-inverted": "#0A0A0A",
    "cal-border": "#E2E2DC",
    "cal-border-subtle": "#E2E2DC",
    "cal-border-emphasis": "#CFCFC9",
    "cal-border-muted": "#F1F1ED",
    "cal-border-booker": "#E2E2DC",
    "cal-text": "#2B2B28",
    "cal-text-emphasis": "#0A0A0A",
    "cal-text-subtle": "#52524D",
    "cal-text-muted": "#686862",
    "cal-text-inverted": "#F7F7F5",
    radius: "12px",
  },
};

/**
 * Loads the Cal.com embed on demand instead of on every page view, so no
 * third-party script competes with the page while it loads. Called when someone
 * shows booking intent (hover, focus or tap on a booking button), when the
 * inline calendar mounts, and once the browser is idle.
 */
export function ensureCal() {
  if (typeof window === "undefined" || window.Cal?.ns?.[CAL_NAMESPACE]) return;

  // Cal.com's official bootstrap shim: queues calls until embed.js has loaded.
  /* eslint-disable */
  (function (C: any, A: string, L: string) {
    let p = function (a: any, ar: any) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
      if (ar[0] === L) {
        const api: any = function () { p(api, arguments); };
        const namespace = ar[1]; api.q = api.q || [];
        if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
        else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  /* eslint-enable */

  const Cal = window.Cal!;
  Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
  // Pass UTM parameters from the page URL through to the booking.
  Cal.config = { ...Cal.config, forwardQueryParams: true };
  const ns = Cal.ns![CAL_NAMESPACE];
  ns("ui", {
    theme: currentTheme(),
    cssVarsPerTheme: CAL_THEME,
    hideEventTypeDetails: false,
    layout: "month_view",
  });
  ns("on", {
    action: "bookingSuccessful",
    callback: () => track("generate_lead", { method: "cal_com" }),
  });
}

/** Keeps an already-loaded calendar in step with the site's theme toggle. */
export function setCalTheme(theme: Theme) {
  window.Cal?.ns?.[CAL_NAMESPACE]?.("ui", { theme });
}
