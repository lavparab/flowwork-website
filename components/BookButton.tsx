"use client";

import { track } from "@/lib/analytics";
import { CAL_LINK, CAL_MODAL_CONFIG, CAL_NAMESPACE, CAL_URL } from "@/lib/cal";
import { ensureCal } from "@/lib/cal-client";
import { currentTheme } from "@/lib/theme";

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
  location = "page",
}: {
  children?: React.ReactNode;
  className?: string;
  /** Where the button sits, for analytics (e.g. "nav", "hero", "cta"). */
  location?: string;
}) {
  return (
    <a
      href={CAL_URL}
      className={className}
      // Start loading the embed as soon as someone shows intent.
      onPointerEnter={ensureCal}
      onFocus={ensureCal}
      onTouchStart={ensureCal}
      onClick={(e) => {
        track("book_audit_click", { location });

        // Let cmd/ctrl/shift/middle-click open the booking page in a new tab.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

        ensureCal();
        const ns = window.Cal?.ns?.[CAL_NAMESPACE];
        if (!ns) return; // No embed: follow the href.

        e.preventDefault();
        ns("modal", { calLink: CAL_LINK, config: { ...CAL_MODAL_CONFIG, theme: currentTheme() } });

        // Calls made before embed.js finishes are queued by Cal's init shim. If
        // the script is blocked or errors, that queue never drains, so fall
        // through to the plain booking page instead of leaving a dead button.
        window.setTimeout(() => {
          if (!document.querySelector("cal-modal-box")) {
            window.location.href = CAL_URL;
          }
        }, 4000);
      }}
    >
      {children}
    </a>
  );
}
