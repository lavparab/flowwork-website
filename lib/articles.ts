export type Article = {
  slug: string;
  title: string;
  /** Shorter title for the <title> tag (the " · Flowwork" suffix is added). */
  seoTitle: string;
  description: string;
  /** The search phrase this article is written for. */
  keyword: string;
  published: string; // ISO date
  updated: string; // ISO date
  readingMinutes: number;
};

/** Newest first. Add a matching page at app/resources/<slug>/page.tsx. */
export const ARTICLES: Article[] = [
  {
    slug: "reduce-rto-cod-orders",
    title: "How to reduce RTO on COD orders: a practical guide for D2C brands",
    seoTitle: "How to Reduce RTO on COD Orders",
    description:
      "Why cash-on-delivery orders come back, what each return really costs, and seven practical ways Indian D2C brands can cut RTO before the parcel ships.",
    keyword: "reduce RTO COD orders",
    published: "2026-09-25",
    updated: "2026-09-25",
    readingMinutes: 7,
  },
  {
    slug: "whatsapp-cod-confirmation",
    title: "WhatsApp COD confirmation: what to send, when to send it, and what to do when nobody replies",
    seoTitle: "WhatsApp COD Order Confirmation Guide",
    description:
      "How to confirm COD orders on WhatsApp: the rules for business messages, example messages, what to do for confirm, change and cancel, and how to handle no reply.",
    keyword: "WhatsApp COD confirmation",
    published: "2026-09-25",
    updated: "2026-09-25",
    readingMinutes: 6,
  },
];

export function getArticle(slug: string) {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) throw new Error(`Unknown article: ${slug}`);
  return a;
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00+05:30").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
