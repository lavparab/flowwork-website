export type Faq = { q: string; a: string };

export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "What does Flowwork do?",
        a: "We build AI systems that turn WhatsApp into a sales and support channel for Indian D2C brands. They confirm cash-on-delivery orders before they ship, answer customer questions 24x7, recover abandoned carts, qualify corporate and bulk gifting enquiries, and bring customers back with timely reorder reminders. Your team doesn’t reply manually.",
      },
      {
        q: "Who is it for?",
        a: "Indian D2C brands that sell on their own website, usually on Shopify or WooCommerce, whose customers already message them on WhatsApp. It pays off fastest when cash on delivery is a real share of your orders.",
      },
      {
        q: "What happens on the 15-minute audit?",
        a: "We look at your orders, your COD share and returns, and how customers reach you on WhatsApp. Then we tell you which package fits, if any. It’s free.",
      },
    ],
  },
  {
    title: "WhatsApp and your brand",
    items: [
      {
        q: "Do we need a new WhatsApp number?",
        a: "No. Everything runs on your own WhatsApp Business number, so customers keep messaging the brand they already know.",
      },
      {
        q: "Will it sound like a bot?",
        a: "Every message is written in your brand voice. You read and approve all of it before anything goes live.",
      },
      {
        q: "Does my team still have to reply?",
        a: "No manual replies. Orders get confirmed, questions answered and carts followed up automatically. Leads that need a person, like a 150-hamper gifting order, are handed to your team with the details already collected.",
      },
    ],
  },
  {
    title: "Packages",
    items: [
      {
        q: "Which package should we start with?",
        a: "Start where it hurts most. If returned COD parcels are the problem, COD Shield. If your team is buried in WhatsApp chats, Growth Engine. If you want WhatsApp to become a sales channel of its own, Revenue OS.",
      },
      {
        q: "Do the packages build on each other?",
        a: "Yes. Growth Engine includes everything in COD Shield, and Revenue OS includes everything in Growth Engine. You can start small and move up later.",
      },
      {
        q: "How long does it take to go live?",
        a: "COD Shield goes live in 7 days, Growth Engine in 2 weeks and Revenue OS in 3–4 weeks.",
      },
      {
        q: "How much does it cost?",
        a: "Every store is different, so we quote after the 15-minute audit, once we’ve seen your numbers.",
      },
    ],
  },
  {
    title: "Working together",
    items: [
      {
        q: "What do you need from us?",
        a: "Access to your WhatsApp Business number and your store, your FAQs, policies and catalogue, a few examples of how your brand talks to customers, and one person to review and approve the messages.",
      },
      {
        q: "Which store platforms do you work with?",
        a: "Shopify and WooCommerce stores are the usual fit. If you’re on something else, bring it up on the audit.",
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);
