// Example conversations shown across the site. All brands here are fictional.

export type ChatMsg =
  | { kind: "in" | "out"; text: string; time?: string }
  | {
      kind: "order";
      id: string;
      item: string;
      amount: string;
      payment: string;
      address: string;
      time?: string;
    }
  | { kind: "sys"; text: string; tone?: "flag" | "note" }
  | { kind: "replies"; options: string[] };

/** One step of an animated conversation. */
export type ChatStep =
  | { msg: ChatMsg; wait?: number; typing?: number; callout?: string }
  | { press: number; wait?: number };

export type Conversation = {
  brand: string;
  initial: string;
  msgs: ChatMsg[];
};

/* ---------- Home hero: a COD order confirmed, then a 2 AM question ---------- */
export const HERO_BRAND = { brand: "Kaapi Co.", initial: "K" };

export const HERO_SCRIPT: ChatStep[] = [
  { msg: { kind: "sys", text: "Today" }, wait: 400 },
  {
    msg: {
      kind: "in",
      text: "Hi Priya, thanks for ordering from Kaapi Co.! Please confirm your cash-on-delivery order so we can ship it today.",
      time: "10:42",
    },
    typing: 900,
  },
  {
    msg: {
      kind: "order",
      id: "#KC-2841",
      item: "Cold Brew Starter Kit",
      amount: "₹1,499",
      payment: "Cash on delivery",
      address: "Kothrud, Pune 411038",
      time: "10:42",
    },
    typing: 700,
    callout: "confirm",
  },
  { msg: { kind: "replies", options: ["Confirm order", "Change address", "Cancel order"] }, wait: 150 },
  { press: 0, wait: 1500 },
  { msg: { kind: "out", text: "Confirm order", time: "10:43" }, wait: 350 },
  {
    msg: {
      kind: "in",
      text: "Confirmed ✓ Your kit ships today. Pay ₹1,499 at the door. Tracking link on its way.",
      time: "10:43",
    },
    typing: 900,
    callout: "flag",
  },
  { msg: { kind: "sys", text: "2:14 AM" }, wait: 1600 },
  { msg: { kind: "out", text: "hey is the concentrate sugar free?", time: "2:14" }, wait: 700 },
  {
    msg: {
      kind: "in",
      text: "Yes, zero added sugar. Just coffee and water. Want the 1L refill pack (₹649) added to your next order?",
      time: "2:14",
    },
    typing: 1100,
  },
];

/* ---------- "What it handles": one conversation per job ---------- */
export const HANDLES: { title: string; blurb: string; pkg: string; convo: Conversation }[] = [
  {
    title: "COD confirmation",
    blurb:
      "Every cash-on-delivery order confirmed on WhatsApp before it ships. Fake and unreachable orders get flagged before dispatch.",
    pkg: "COD Shield",
    convo: {
      brand: "Mitti Home",
      initial: "M",
      msgs: [
        {
          kind: "in",
          text: "Hi Rohan, please confirm your COD order #MH-1193 for ₹2,199 so we can dispatch it.",
          time: "4:10",
        },
        { kind: "replies", options: ["Confirm", "Cancel"] },
        { kind: "sys", text: "No reply · customer unreachable", tone: "note" },
        { kind: "sys", text: "Flagged before dispatch · don’t ship", tone: "flag" },
        { kind: "in", text: "Hi Ananya, please confirm your COD order #MH-1194 for ₹1,450.", time: "4:12" },
        { kind: "out", text: "Confirm", time: "4:13" },
        { kind: "in", text: "Thank you! It ships today.", time: "4:13" },
      ],
    },
  },
  {
    title: "Answers, 24x7",
    blurb:
      "Delivery, COD, sizing, ingredients, “which one should I buy”. Answered in seconds, in your voice, at any hour.",
    pkg: "Growth Engine",
    convo: {
      brand: "Dew & Dune",
      initial: "D",
      msgs: [
        { kind: "sys", text: "2:14 AM" },
        { kind: "out", text: "Do you deliver to Guwahati? COD available?", time: "2:14" },
        {
          kind: "in",
          text: "Yes to both. Delivery to 781001 takes 4–6 days, and COD is available on orders up to ₹5,000.",
          time: "2:14",
        },
        { kind: "out", text: "which night cream for dry skin?", time: "2:15" },
        {
          kind: "in",
          text: "Most of our dry-skin customers pick the Ceramide Night Cream (₹799). Want me to send the skincare catalogue?",
          time: "2:15",
        },
        { kind: "replies", options: ["Send catalogue", "Add to cart"] },
      ],
    },
  },
  {
    title: "Abandoned carts",
    blurb:
      "A friendly nudge on WhatsApp, where people actually read messages. Questions get answered right there in the chat.",
    pkg: "Growth Engine",
    convo: {
      brand: "Tana Studio",
      initial: "T",
      msgs: [
        {
          kind: "in",
          text: "Hi Aisha, you left the Linen Kurta Set (M) in your cart. Still thinking it over?",
          time: "7:30",
        },
        { kind: "replies", options: ["Complete order", "I have a question"] },
        { kind: "out", text: "does it come in olive?", time: "7:34" },
        {
          kind: "in",
          text: "It does, and olive in M is in stock. I’ve updated your cart. Checkout takes 20 seconds →",
          time: "7:34",
        },
        { kind: "out", text: "done!", time: "7:36" },
      ],
    },
  },
  {
    title: "Gifting enquiries",
    blurb:
      "Corporate and bulk orders get qualified on quantity, budget, date and city, then handed to your team ready to quote.",
    pkg: "Growth Engine",
    convo: {
      brand: "Sweet Karam House",
      initial: "S",
      msgs: [
        { kind: "out", text: "Hi, we need Diwali hampers for our team", time: "12:05" },
        { kind: "in", text: "Lovely! A few quick questions so our team can quote. How many hampers?", time: "12:05" },
        { kind: "out", text: "around 150", time: "12:06" },
        { kind: "in", text: "Budget per hamper, and delivery by when?", time: "12:06" },
        { kind: "out", text: "₹1,200–1,500. by Oct 20, Mumbai office", time: "12:07" },
        { kind: "sys", text: "Lead sent to your sales team · 150 units · ₹1.2–1.5k · Oct 20 · Mumbai", tone: "flag" },
      ],
    },
  },
  {
    title: "Reorder reminders",
    blurb: "Timed to when customers usually run out, with a one-tap reorder.",
    pkg: "Revenue OS",
    convo: {
      brand: "Nutty Tales",
      initial: "N",
      msgs: [
        { kind: "sys", text: "29 days after delivery" },
        {
          kind: "in",
          text: "Hi Neha! It’s been about a month since your Cashew Butter (500g). Running low?",
          time: "9:00",
        },
        { kind: "replies", options: ["Reorder same · ₹549", "Not yet"] },
        { kind: "out", text: "Reorder same · ₹549", time: "9:12" },
        { kind: "in", text: "Done. Same address, cash on delivery, arriving Thursday.", time: "9:12" },
      ],
    },
  },
];

/* ---------- Package page demos ---------- */
export const PACKAGE_DEMOS: Record<string, { brand: string; initial: string; script: ChatStep[] }> = {
  "cod-shield": {
    brand: "Kaapi Co.",
    initial: "K",
    script: [
      { msg: { kind: "sys", text: "Order placed · 10:42" }, wait: 400 },
      {
        msg: {
          kind: "order",
          id: "#KC-2841",
          item: "Cold Brew Starter Kit",
          amount: "₹1,499",
          payment: "Cash on delivery",
          address: "Kothrud, Pune 411038",
          time: "10:42",
        },
        typing: 900,
      },
      { msg: { kind: "replies", options: ["Confirm order", "Change address", "Cancel order"] }, wait: 150 },
      { press: 0, wait: 1400 },
      { msg: { kind: "out", text: "Confirm order", time: "10:43" }, wait: 350 },
      { msg: { kind: "in", text: "Confirmed ✓ Ships today. Pay ₹1,499 at the door.", time: "10:43" }, typing: 800 },
      { msg: { kind: "sys", text: "Order #KC-2842 · no reply, number unreachable", tone: "note" }, wait: 1500 },
      { msg: { kind: "sys", text: "Flagged before dispatch · don’t ship", tone: "flag" }, wait: 900 },
    ],
  },
  "growth-engine": {
    brand: "Dew & Dune",
    initial: "D",
    script: [
      { msg: { kind: "sys", text: "2:14 AM" }, wait: 400 },
      { msg: { kind: "out", text: "which night cream for dry skin?", time: "2:14" }, wait: 600 },
      {
        msg: {
          kind: "in",
          text: "Most of our dry-skin customers pick the Ceramide Night Cream (₹799). Want to see it with the rest of the range?",
          time: "2:14",
        },
        typing: 1000,
      },
      { msg: { kind: "replies", options: ["Send catalogue", "Add to cart"] }, wait: 150 },
      { press: 1, wait: 1300 },
      { msg: { kind: "out", text: "Add to cart", time: "2:15" }, wait: 350 },
      { msg: { kind: "in", text: "Added. Checkout here whenever you’re ready →", time: "2:15" }, typing: 700 },
      { msg: { kind: "sys", text: "Next day · order shipped" }, wait: 1500 },
      {
        msg: { kind: "in", text: "Your Ceramide Night Cream is on its way. Arriving Friday.", time: "11:20" },
        typing: 800,
      },
    ],
  },
  "revenue-os": {
    brand: "Nutty Tales",
    initial: "N",
    script: [
      { msg: { kind: "sys", text: "29 days after delivery" }, wait: 400 },
      {
        msg: { kind: "in", text: "Hi Neha! About a month since your Cashew Butter (500g). Running low?", time: "9:00" },
        typing: 900,
      },
      { msg: { kind: "out", text: "yes! can I get 2 jars this time", time: "9:08" }, wait: 1300 },
      {
        msg: { kind: "in", text: "Of course. 2 × Cashew Butter 500g, ₹1,098. Same address as last time?", time: "9:08" },
        typing: 900,
      },
      { msg: { kind: "replies", options: ["Yes, same address", "Change address"] }, wait: 150 },
      { press: 0, wait: 1200 },
      { msg: { kind: "out", text: "Yes, same address", time: "9:09" }, wait: 350 },
      { msg: { kind: "in", text: "Order #NT-6120 placed. Arriving Thursday.", time: "9:09" }, typing: 800 },
    ],
  },
};

/* ---------- FAQ snippets on the home page ---------- */
export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "Do we need a new WhatsApp number?",
    a: "No. It all runs on your own WhatsApp Business number. Customers keep messaging the brand they already know.",
  },
  {
    q: "Will it sound like a bot?",
    a: "It’s written in your brand voice, and you approve every message before anything goes live.",
  },
  {
    q: "How fast can we launch?",
    a: "COD Shield in 7 days. Growth Engine in 2 weeks. Revenue OS in 3–4 weeks.",
  },
  {
    q: "Does my team still reply manually?",
    a: "That’s the part we take off your plate. Less time on chats, fewer returned parcels, more repeat orders.",
  },
];
