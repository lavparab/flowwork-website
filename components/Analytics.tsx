"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID } from "@/lib/analytics";
import { ensureCal } from "@/lib/cal-client";

/** Google Analytics 4 (only when NEXT_PUBLIC_GA_ID is set) and an idle-time Cal.com preload. */
export default function Analytics() {
  useEffect(() => {
    // Warm up the booking embed once the page has settled, so the popup opens instantly.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const t = window.setTimeout(() => idle(() => ensureCal()), 5000);
    return () => window.clearTimeout(t);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
