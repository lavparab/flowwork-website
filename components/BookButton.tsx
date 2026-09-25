"use client";

import { CAL_LINK, CAL_MODAL_CONFIG, CAL_NAMESPACE, CAL_URL } from "@/lib/cal";

/**
 * The CTA is a real <a href> so it still books a call when JS is off, the embed
 * is blocked, or the click lands before hydration.
 *
 * We open the modal ourselves rather than using Cal's `data-cal-link` attribute:
 * Cal's own document-level click handler opens the modal but never calls
 * preventDefault(), so on an anchor the browser navigates away at the same time
 * and the navigation wins.
 */
export default function BookButton({
  children = (
    <>
      Book a 15-min audit <span className="arrow">→</span>
    </>
  ),
  className = "btn btn-lime",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CAL_URL}
      className={className}
      onClick={(e) => {
        // Let cmd/ctrl/shift/middle-click open the booking page in a new tab.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

        const ns = window.Cal?.ns?.[CAL_NAMESPACE];
        if (!ns) return; // No embed on the page: follow the href.

        e.preventDefault();
        ns("modal", { calLink: CAL_LINK, config: CAL_MODAL_CONFIG });

        // Calls made before embed.js finishes are queued by Cal's init shim. If
        // the script is blocked or errors, that queue never drains, so fall
        // through to the plain booking page instead of leaving a dead button.
        window.setTimeout(() => {
          if (!document.querySelector("cal-modal-box")) {
            window.location.href = CAL_URL;
          }
        }, 2500);
      }}
    >
      {children}
    </a>
  );
}
