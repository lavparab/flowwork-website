export type PackageSlug = "cod-shield" | "growth-engine" | "revenue-os";

export type Feature = { name: string; detail: string };

export type Package = {
  slug: PackageSlug;
  name: string;
  tier: 1 | 2 | 3;
  liveIn: string;
  popular?: boolean;
  /** One line under the name. */
  pitch: string;
  /** Longer description, from the brand copy. */
  summary: string;
  /** Completes the sentence "Best if …" */
  bestFor: string;
  /** Package this one builds on (everything in it is included). */
  buildsOn?: PackageSlug;
  /** What this tier adds on top of the one before. */
  adds: Feature[];
  phases: { when: string; title: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const PACKAGES: Package[] = [
  {
    slug: "cod-shield",
    name: "COD Shield",
    tier: 1,
    liveIn: "7 days",
    pitch: "Stops losses from fake and unreachable COD orders.",
    summary:
      "Every cash-on-delivery order is confirmed on WhatsApp the moment it’s placed. Orders nobody confirms are flagged before dispatch, so you stop paying to ship parcels that come back.",
    bestFor: "returned COD parcels are eating your margin.",
    adds: [
      {
        name: "Instant COD confirmation",
        detail: "A WhatsApp message goes out as soon as a cash-on-delivery order is placed, asking the customer to confirm it.",
      },
      {
        name: "Pre-dispatch flagging",
        detail: "Fake and unreachable orders are flagged for your team before they’re packed and shipped.",
      },
      {
        name: "Written in your brand voice",
        detail: "Every message sounds like your brand, and you approve all of it before it goes live.",
      },
    ],
    phases: [
      { when: "Day 1", title: "Audit and setup", detail: "We look at your COD orders and returns, and connect your store and WhatsApp Business number." },
      { when: "Days 2–4", title: "Build", detail: "Confirmation and flagging flows, written in your brand voice." },
      { when: "Days 5–6", title: "You approve", detail: "You read every message and sign it off. Nothing goes live before that." },
      { when: "Day 7", title: "Live", detail: "Every new COD order is confirmed on WhatsApp before it ships." },
    ],
    faqs: [
      {
        q: "What does “flagged” mean?",
        a: "An order that nobody confirms, or where the customer can’t be reached, is marked for your team before dispatch. You decide whether it ships.",
      },
      {
        q: "Does it cover prepaid orders?",
        a: "COD Shield is built for cash-on-delivery orders, because that’s where fake and unreachable orders come from. Growth Engine adds order updates and customer support on top.",
      },
      {
        q: "Do we need a new WhatsApp number?",
        a: "No. It runs on your own WhatsApp Business number.",
      },
    ],
  },
  {
    slug: "growth-engine",
    name: "Growth Engine",
    tier: 2,
    liveIn: "2 weeks",
    popular: true,
    pitch: "A complete WhatsApp assistant for your store.",
    summary:
      "Everything in COD Shield, plus an assistant that answers questions 24x7, shares your catalogue, sends order updates, recovers abandoned carts, captures gifting enquiries and runs your Diwali campaign.",
    bestFor: "your team spends hours a day replying on WhatsApp.",
    buildsOn: "cod-shield",
    adds: [
      { name: "24x7 answers", detail: "Delivery, COD, sizing, ingredients, “which one should I buy”. Answered in seconds, at any hour." },
      { name: "Catalogue in chat", detail: "Customers browse products and add to cart without leaving WhatsApp." },
      { name: "Order and shipping updates", detail: "Customers always know where their order is, so “where is my order?” stops landing on your team." },
      { name: "Abandoned cart recovery", detail: "A friendly nudge on WhatsApp, with questions answered right in the chat." },
      { name: "Gifting enquiry capture", detail: "Corporate and bulk enquiries are qualified on quantity, budget, date and city, then handed to your team ready to quote." },
      { name: "Your Diwali campaign", detail: "Written in your voice, approved by you, and scheduled before the festive rush." },
    ],
    phases: [
      { when: "Days 1–2", title: "Map", detail: "Your FAQs, catalogue, policies and tone of voice." },
      { when: "Days 3–9", title: "Build", detail: "COD confirmation, answers, catalogue, order updates, cart recovery, gifting capture and your Diwali campaign." },
      { when: "Days 10–13", title: "You approve", detail: "You review every flow and message before a customer sees it." },
      { when: "Day 14", title: "Live", detail: "Your WhatsApp answers, sells and follows up on its own." },
    ],
    faqs: [
      {
        q: "Is COD Shield included?",
        a: "Yes. Growth Engine includes everything in COD Shield, so COD confirmation and pre-dispatch flagging come with it.",
      },
      {
        q: "What’s in the Diwali campaign?",
        a: "A WhatsApp campaign for the festive season, written in your brand voice, approved by you and scheduled before the rush.",
      },
      {
        q: "What happens to gifting enquiries?",
        a: "The assistant asks the questions your team would ask (quantity, budget, delivery date, city) and hands the lead over, ready to quote.",
      },
    ],
  },
  {
    slug: "revenue-os",
    name: "Revenue OS",
    tier: 3,
    liveIn: "3–4 weeks",
    pitch: "WhatsApp becomes a sales channel of its own.",
    summary:
      "Everything in Growth Engine, plus in-chat ordering, automatic reorders, distributor lead capture, festival campaigns all year round and a monthly revenue dashboard.",
    bestFor: "you want WhatsApp to become a revenue line of its own.",
    buildsOn: "growth-engine",
    adds: [
      { name: "In-chat ordering", detail: "Customers place orders right inside WhatsApp, without visiting your website." },
      { name: "Automatic reorders", detail: "Reminders timed to when customers usually run out, with a one-tap reorder." },
      { name: "Distributor lead capture", detail: "Shops and distributors who want to stock your products are qualified and handed to your team." },
      { name: "Year-round festival campaigns", detail: "Rakhi, Diwali, Christmas, wedding season and more, planned and approved well ahead." },
      { name: "Monthly revenue dashboard", detail: "See what WhatsApp brought in each month, from chat orders to recovered carts and reorders." },
    ],
    phases: [
      { when: "Week 1", title: "Map", detail: "Products, reorder cycles, your distributor process and your festival calendar." },
      { when: "Weeks 2–3", title: "Build", detail: "Everything in Growth Engine, plus in-chat ordering, reorders, distributor capture and the dashboard." },
      { when: "Week 3", title: "You approve", detail: "You review every flow, campaign and message before launch." },
      { when: "Weeks 3–4", title: "Live", detail: "WhatsApp takes orders on its own, and you get a revenue report every month." },
    ],
    faqs: [
      {
        q: "Does Revenue OS include the other packages?",
        a: "Yes. It includes everything in Growth Engine, which includes everything in COD Shield.",
      },
      {
        q: "What’s in the monthly dashboard?",
        a: "A monthly view of the revenue WhatsApp brings in: orders placed in chat, recovered carts and reorders.",
      },
      {
        q: "What is distributor lead capture?",
        a: "Enquiries from shops and distributors who want to stock your products get qualified in the chat and handed to your team.",
      },
    ],
  },
];

export function getPackage(slug: string) {
  return PACKAGES.find((p) => p.slug === slug);
}

/** Every feature a package includes, grouped by the tier it comes from. */
export function includedGroups(pkg: Package) {
  return PACKAGES.filter((p) => p.tier <= pkg.tier).map((p) => ({ from: p, features: p.adds }));
}

/** Comparison rows for the packages page. */
export const COMPARISON: { group: string; rows: { name: string; tier: 1 | 2 | 3 }[] }[] = [
  {
    group: "Protect every COD order",
    rows: [
      { name: "Instant COD confirmation on WhatsApp", tier: 1 },
      { name: "Pre-dispatch flagging of fake and unreachable orders", tier: 1 },
    ],
  },
  {
    group: "Support and sell, 24x7",
    rows: [
      { name: "Answers to customer questions, 24x7", tier: 2 },
      { name: "Catalogue sharing in chat", tier: 2 },
      { name: "Order and shipping updates", tier: 2 },
      { name: "Abandoned cart recovery", tier: 2 },
      { name: "Corporate and bulk gifting enquiries", tier: 2 },
      { name: "Diwali campaign", tier: 2 },
    ],
  },
  {
    group: "Turn WhatsApp into a sales channel",
    rows: [
      { name: "In-chat ordering", tier: 3 },
      { name: "Automatic reorders", tier: 3 },
      { name: "Distributor lead capture", tier: 3 },
      { name: "Year-round festival campaigns", tier: 3 },
      { name: "Monthly revenue dashboard", tier: 3 },
    ],
  },
  {
    group: "Always included",
    rows: [
      { name: "Runs on your own WhatsApp Business number", tier: 1 },
      { name: "Written in your brand voice", tier: 1 },
      { name: "Approved by you before it goes live", tier: 1 },
    ],
  },
];
