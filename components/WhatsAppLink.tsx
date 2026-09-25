"use client";

import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";

/** A link that opens a WhatsApp chat with Flowwork and records the click. */
export default function WhatsAppLink({
  text,
  location,
  className,
  children,
}: {
  /** Pre-filled first message. */
  text?: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={whatsappUrl(text)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => track("whatsapp_click", { location })}
    >
      {children}
    </a>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
