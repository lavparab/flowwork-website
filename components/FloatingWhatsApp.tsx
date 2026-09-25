"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import WhatsAppLink, { WhatsAppIcon } from "./WhatsAppLink";

/** A WhatsApp chat button that appears once the visitor scrolls past the first screen. */
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The contact page already puts WhatsApp front and centre.
  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 transition-all duration-300 sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppLink
        location="floating"
        text="Hi Flowwork, I'd like to know more."
        className="flex h-14 items-center gap-2.5 rounded-full border border-lime/40 bg-ink/90 pr-5 pl-4 text-[15px] font-semibold text-lime shadow-[0_10px_40px_rgba(0,0,0,.5)] backdrop-blur-md transition-colors hover:bg-lime hover:text-ink"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span>
          Chat<span className="hidden sm:inline"> on WhatsApp</span>
        </span>
      </WhatsAppLink>
    </div>
  );
}
