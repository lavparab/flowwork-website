"use client";

import { track } from "./analytics";
import { CAL_NAMESPACE } from "./cal";
import { currentTheme, type Theme } from "./theme";

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
    cssVarsPerTheme: { dark: { "cal-brand": "#C1FF72" }, light: { "cal-brand": "#0A0A0A" } },
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
