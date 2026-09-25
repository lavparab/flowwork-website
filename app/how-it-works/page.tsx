import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { PROCESS } from "@/components/ProcessSteps";
import { PACKAGES } from "@/lib/packages";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How WhatsApp Automation Works for D2C Brands",
  description:
    "From a free 15-minute audit to live on your own WhatsApp Business number in 7 days to 4 weeks. Written in your brand voice and approved by you before launch.",
  path: "/how-it-works",
});

const STEP_DETAIL = [
  [
    "Your COD share and how many of those orders come back",
    "How many chats your team answers, and when",
    "Where carts, gifting enquiries and repeat orders slip away",
  ],
  [
    "Your catalogue, FAQs, delivery and return policies",
    "How your brand talks to customers",
    "Every flow written for your store, not from a template",
  ],
  [
    "You read every message before a customer does",
    "Every flow, campaign and reply, checked before launch",
    "Nothing goes live until you say yes",
  ],
  [
    "Runs on your own WhatsApp Business number",
    "Customers keep talking to the brand they know",
    "Your team stops replying by hand",
  ],
];

const NEED = [
  "Access to your WhatsApp Business number",
  "Admin access to your store (Shopify or WooCommerce)",
  "Your FAQs, policies and catalogue",
  "A few examples of how your brand talks to customers",
  "One person to review and approve messages",
];

const FIT = [
  "An Indian D2C brand selling on its own website",
  "Customers already message you on WhatsApp",
  "Cash on delivery is a real share of your orders",
  "Your team spends hours a day on chats",
];

const NOT_FIT = [
  "Marketplace-only sellers on Amazon or Flipkart",
  "Brands that don’t want to talk to customers on WhatsApp",
  "Stores just starting out, with a handful of orders a month",
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "How it works", path: "/how-it-works" }])} />
      <PageHeader
        eyebrow="How our WhatsApp automation works"
        title={
          <>
            From a 15-minute call <span className="text-muted">to live on WhatsApp.</span>
          </>
        }
        lede="Four steps, and you sign off on every one of them. Most of the work happens on our side."
      >
        <BookButton location="how-hero" />
      </PageHeader>

      <section className="pb-8">
        <div className="wrap">
          <ol className="border-t border-line">
            {PROCESS.map((s, i) => (
              <li key={s.title} className="grid gap-6 border-b border-line py-12 md:grid-cols-[120px_1fr_1fr] md:gap-10 md:py-14">
                <span className="text-[56px] leading-none font-bold tracking-[-0.06em] text-lime tabular-nums">0{i + 1}</span>
                <div>
                  <h2 className="text-[30px] font-bold tracking-[-0.04em] md:text-[36px]">{s.title}</h2>
                  <p className="mt-3 max-w-[440px] text-muted">{s.detail}</p>
                </div>
                <ul className="space-y-3 md:pt-2">
                  {STEP_DETAIL[i].map((d) => (
                    <li key={d} className="bullet-lime flex gap-3 text-[15.5px]">
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Timelines</p>
          <h2 className="h2 mt-[18px] mb-12">How long each package takes.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {PACKAGES.map((p) => (
              <Link key={p.slug} href={`/packages/${p.slug}`} className="card group p-7 transition-colors hover:border-lime">
                <p className="text-[15px] text-muted">{p.name}</p>
                <p className="mt-3 text-[48px] leading-none font-bold tracking-[-0.06em]">{p.liveIn}</p>
                <ol className="mt-7 space-y-2 border-t border-line pt-5">
                  {p.phases.map((ph) => (
                    <li key={ph.title} className="flex justify-between gap-4 text-[14.5px]">
                      <span>{ph.title}</span>
                      <span className="text-dim">{ph.when}</span>
                    </li>
                  ))}
                </ol>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">What we need from you</p>
            <h2 className="h2 mt-[18px]">Less than you’d think.</h2>
            <ul className="mt-10 border-t border-line">
              {NEED.map((n) => (
                <li key={n} className="flex items-center gap-4 border-b border-line py-4 text-[16px]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-lime/40 text-[12px] text-lime" aria-hidden>
                    ✓
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Fit</p>
            <h2 className="h2 mt-[18px]">Who it’s for.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[20px] border-t-4 border-lime bg-s1 p-6">
                <h3 className="font-semibold">A good fit</h3>
                <ul className="mt-4 space-y-3">
                  {FIT.map((f) => (
                    <li key={f} className="bullet-lime flex gap-3 text-[15px] text-muted">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] border-t-4 border-line bg-s1 p-6">
                <h3 className="font-semibold">Probably not for you</h3>
                <ul className="mt-4 space-y-3">
                  {NOT_FIT.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] text-dim before:content-['–']">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
