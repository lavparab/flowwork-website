"use client";

import { useEffect, useState } from "react";
import { CAL_LINK, CAL_MODAL_CONFIG, CAL_NAMESPACE, CAL_URL } from "@/lib/cal";

/** The booking calendar embedded in the page, with a plain link as fallback. */
export default function CalInline() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let tries = 0;
    let fallback: number | undefined;

    // The Cal bootstrap script runs after hydration, so wait for its namespace.
    const poll = window.setInterval(() => {
      const ns = window.Cal?.ns?.[CAL_NAMESPACE];
      if (ns) {
        window.clearInterval(poll);
        ns("inline", { elementOrSelector: "#cal-inline", calLink: CAL_LINK, config: CAL_MODAL_CONFIG });
        // If the embed never renders (blocked script, offline), show the link instead.
        fallback = window.setTimeout(() => {
          if (!document.querySelector("#cal-inline iframe")) setFailed(true);
        }, 8000);
      } else if (++tries > 50) {
        window.clearInterval(poll);
        setFailed(true);
      }
    }, 100);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="card overflow-hidden p-2">
      <div id="cal-inline" className={failed ? "hidden" : "min-h-[560px] w-full"} />
      {failed && (
        <div className="grid min-h-[400px] place-items-center p-8 text-center">
          <div>
            <p className="text-muted">The calendar didn’t load here.</p>
            <a href={CAL_URL} className="btn btn-lime mt-5">
              Open the booking page <span className="arrow">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
