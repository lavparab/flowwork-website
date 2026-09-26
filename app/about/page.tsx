import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import WhatsAppLink from "@/components/WhatsAppLink";
import { PACKAGES } from "@/lib/packages";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Flowwork, a WhatsApp Automation Agency",
  description:
    "Flowwork is a Pune-based AI automation agency turning WhatsApp into a sales and support channel for Indian D2C brands, on their own number and in their voice.",
  path: "/about",
});

const BELIEFS = [
  {
    title: "Start where it hurts most.",
    body: "Returned COD parcels, a team buried in chats, customers who never reorder. We fix the most expensive problem first, then build from there.",
  },
  {
    title: "It should pay for itself.",
    body: "Fewer returned parcels, recovered carts and repeat orders show up in rupees. If automation can’t earn its keep, we’ll tell you on the audit.",
  },
  {
    title: "Your number, your voice, your call.",
    body: "Everything runs on your own WhatsApp Business number and is written the way your brand talks. Nothing goes live until you’ve approved it.",
  },
  {
    title: "Nobody should type the same reply all day.",
    body: "“Is COD available?” “Where is my order?” Your team has better things to do. The routine chats should run themselves.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE.url}/about`,
          name: "About Flowwork",
          about: { "@id": ORG_ID },
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />

      <PageHeader
        eyebrow="WhatsApp automation agency in Pune"
        title={
          <>
            Automation that pays for itself. <span className="text-muted">That’s the whole brief.</span>
          </>
        }
        lede={`${SITE.name} is an AI automation agency based in ${SITE.city}. We turn WhatsApp into a sales and support channel for Indian D2C brands, so orders get confirmed, customers get answers and buyers come back without anyone on your team replying by hand.`}
      >
        <BookButton location="about-hero" />
      </PageHeader>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Why WhatsApp</p>
            <h2 className="h2 mt-[18px]">Your customers already talk to you there.</h2>
          </div>
          <div className="space-y-5 text-[18px] leading-relaxed text-muted">
            <p>
              For most Indian D2C brands, WhatsApp is where the real conversations happen: “Is COD available on my
              pincode?”, “Where is my order?”, “Do you do bulk orders for Diwali?”. It’s also where a lot of those
              conversations wait hours for a reply, or get missed altogether.
            </p>
            <p>
              Meanwhile, cash-on-delivery orders ship without anyone checking they’re real, abandoned carts get an
              email that sits unread, and happy customers never hear from you again.
            </p>
            <p className="text-text">
              We build the systems that handle all of that on WhatsApp, automatically, in a way that still sounds like
              your brand.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What we believe</p>
          <h2 className="h2 mt-[18px] mb-12 max-w-[760px]">Four rules behind everything we build.</h2>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2">
            {BELIEFS.map((b, i) => (
              <div key={b.title} className="bg-canvas p-7 sm:p-9">
                <span className="text-[13px] text-accent tabular-nums">0{i + 1}</span>
                <h3 className="mt-6 text-[24px] font-bold tracking-[-0.035em]">{b.title}</h3>
                <p className="mt-3 max-w-[460px] text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">What we build</p>
            <h2 className="h2 mt-[18px]">Three packages, each building on the last.</h2>
            <ul className="mt-10 border-t border-line">
              {PACKAGES.map((p) => (
                <li key={p.slug} className="border-b border-line">
                  <Link href={`/packages/${p.slug}`} className="group flex items-baseline justify-between gap-6 py-5">
                    <span>
                      <span className="block text-[20px] font-semibold tracking-[-0.025em] group-hover:text-accent">{p.name}</span>
                      <span className="mt-1 block text-[15px] text-muted">{p.pitch}</span>
                    </span>
                    <span className="shrink-0 text-[14px] text-dim">Live in {p.liveIn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Where we are</p>
            <h2 className="h2 mt-[18px]">Based in {SITE.city}. Working with brands across {SITE.serviceArea}.</h2>
            <p className="mt-6 text-muted">
              We work remotely with D2C brands anywhere in {SITE.serviceArea}. The first step is always the same: a
              free 15-minute audit with Lav Parab, where we look at your numbers and tell you honestly whether we can
              help.
            </p>
            <dl className="mt-10 border-t border-line text-[15.5px]">
              <Row label="Business">{SITE.name}</Row>
              <Row label="Based in">
                {SITE.city}, {SITE.region}, {SITE.country}
              </Row>
              <Row label="Serving">D2C brands across {SITE.serviceArea}</Row>
              <Row label="WhatsApp">
                <WhatsAppLink location="about" className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">
                  {SITE.whatsappDisplay}
                </WhatsAppLink>
              </Row>
              {SITE.email && (
                <Row label="Email">
                  <a href={`mailto:${SITE.email}`} className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">
                    {SITE.email}
                  </a>
                </Row>
              )}
              {SITE.hours && <Row label="Hours">{SITE.hours}</Row>}
            </dl>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-6 border-b border-line py-4">
      <dt className="w-28 shrink-0 text-dim">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
