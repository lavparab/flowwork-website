/* ------------------------------ Owner-editable ------------------------------ */
export const SITE = {
  name: "Flowwork",
  url: "https://theflowwork.com",
  city: "Pune",
  country: "India",
  whatsappDisplay: "+91 75078 30937",
  /** Leave empty to hide email everywhere (the legal pages fall back to WhatsApp). */
  email: "",
  tagline: "Less time on chats, fewer returned parcels, more repeat orders.",
  description:
    "Flowwork turns WhatsApp into a sales and support channel for Indian D2C brands. COD orders confirmed before they ship, customers answered 24x7, carts recovered and buyers brought back, on your own WhatsApp Business number.",
} as const;
/* --------------------------------------------------------------------------- */

// wa.me wants digits only: no +, spaces or dashes.
const WA_NUMBER = SITE.whatsappDisplay.replace(/\D/g, "");

export function whatsappUrl(text?: string) {
  return `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const NAV_LINKS = [
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/rto-calculator", label: "RTO calculator" },
  { href: "/faq", label: "FAQ" },
] as const;
