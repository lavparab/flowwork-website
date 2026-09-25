/* ------------------------------ Owner-editable ------------------------------ */
export const SITE = {
  name: "Flowwork",
  url: "https://theflowwork.com",
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  whatsappDisplay: "+91 75078 30937",
  /** Leave empty to hide email everywhere (the legal pages fall back to WhatsApp). */
  email: "",
  /** Where you take on clients. Shown on the site and in structured data. */
  serviceArea: "India",
  /** e.g. "Mon–Sat, 10am–7pm IST". Leave empty to hide. */
  hours: "",
  tagline: "Less time on chats, fewer returned parcels, more repeat orders.",
  description:
    "Flowwork turns WhatsApp into a sales and support channel for Indian D2C brands. COD orders confirmed before they ship, customers answered 24x7, carts recovered and buyers brought back, on your own WhatsApp Business number.",
  /** Full profile URLs. Empty ones are hidden. They also feed the Organization schema. */
  social: {
    linkedin: "",
    instagram: "",
    x: "",
    youtube: "",
  },
} as const;
/* --------------------------------------------------------------------------- */

// wa.me wants digits only: no +, spaces or dashes.
const WA_NUMBER = SITE.whatsappDisplay.replace(/\D/g, "");

export function whatsappUrl(text?: string) {
  return `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** +91XXXXXXXXXX, for structured data. */
export const PHONE_E164 = `+${WA_NUMBER}`;

export const SOCIAL_LINKS = (
  [
    ["LinkedIn", SITE.social.linkedin],
    ["Instagram", SITE.social.instagram],
    ["X", SITE.social.x],
    ["YouTube", SITE.social.youtube],
  ] as const
).filter(([, url]) => url);

export const NAV_LINKS = [
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/rto-calculator", label: "RTO calculator" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
] as const;
