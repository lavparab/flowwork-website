/* Google Analytics 4 events. Everything here is a no-op until NEXT_PUBLIC_GA_ID is set. */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "js", target: string | Date, params?: Params) => void;
  }
}

/**
 * Events sent across the site:
 * - book_audit_click      a "Book a 15-min audit" button was clicked ({ location })
 * - generate_lead         a Cal.com booking was completed (GA4 recommended lead event)
 * - whatsapp_click        a WhatsApp link was clicked ({ location })
 * - contact_form_submit   the contact form was sent to WhatsApp
 * - calculator_used       the RTO calculator was changed for the first time on a page
 * - calculator_link_copied
 */
export function track(event: string, params?: Params) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
