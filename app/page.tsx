import Link from "next/link";
import BookButton from "@/components/BookButton";
import FaqThread from "@/components/chat/FaqThread";
import HandlesTabs from "@/components/chat/HandlesTabs";
import PhoneDemo from "@/components/chat/PhoneDemo";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PackageCards from "@/components/PackageCards";
import ProcessSteps from "@/components/ProcessSteps";
import RtoCalculator from "@/components/RtoCalculator";
import { HERO_BRAND, HERO_SCRIPT, HOME_FAQ } from "@/lib/chat";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: SITE.name,
          url: SITE.url,
          description: SITE.description,
          logo: `${SITE.url}/brand/flowwork-mark-filled.svg`,
          telephone: SITE.whatsappDisplay,
          areaServed: "IN",
          address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "IN" },
        }}
      />

      {/* ---------------------------------------------------------------- hero */}
      <section className="pt-12 pb-24 md:pt-16">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <div>
            <p className="kicker">WhatsApp automation for Indian D2C brands</p>
            <h1 className="display mt-7">
              Orders confirmed.
              <br />
              Questions answered.
              <br />
              <span className="text-lime">Nobody typed a&nbsp;word.</span>
            </h1>
            <p className="lede mt-7 max-w-[540px]">
              Flowwork turns your WhatsApp Business number into a sales and support channel that runs itself. COD
              orders confirmed before they ship, customers answered at 2 AM, carts recovered, buyers brought back.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BookButton />
              <Link href="/packages" className="btn btn-ghost">
                See packages
              </Link>
            </div>
            <dl className="mt-14 grid max-w-[560px] grid-cols-1 border-t border-line xs:grid-cols-3">
              {[
                ["7 days", "to go live with COD Shield"],
                ["24x7", "replies, in your brand voice"],
                ["0", "messages go live without your approval"],
              ].map(([k, v], i) => (
                <div key={k} className={`pt-[18px] pr-[18px] ${i ? "xs:border-l xs:border-line xs:pl-[18px]" : ""}`}>
                  <dt className="text-[28px] font-bold tracking-[-0.04em]">{k}</dt>
                  <dd className="mt-1 text-[13.5px] leading-snug text-dim">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center xl:justify-start">
            <PhoneDemo
              brand={HERO_BRAND.brand}
              initial={HERO_BRAND.initial}
              script={HERO_SCRIPT}
              label="Example: a customer gets a WhatsApp message asking her to confirm a ₹1,499 cash-on-delivery order, taps Confirm, and gets a reply that it ships today. Later, at 2:14 AM, she asks whether the coffee concentrate is sugar free and gets an answer straight away."
              caption="Example brand · runs without anyone on your team"
              className="mx-auto xl:mx-0"
              callouts={[
                { id: "confirm", title: "Seconds after checkout", text: "Confirmation lands on the customer’s WhatsApp", top: 318 },
                { id: "flag", title: "No reply?", text: "The order is flagged before dispatch", top: 486 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- what it handles */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What it handles</p>
          <h2 className="h2 mt-[18px] mb-14 max-w-[820px] md:mb-16">Five conversations your team never types again.</h2>
          <HandlesTabs />
        </div>
      </section>

      {/* ---------------------------------------------------------------- calculator */}
      <section className="section">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-20">
          <div>
            <p className="eyebrow">RTO calculator</p>
            <h2 className="h2 mt-[18px]">What are returned COD parcels costing you?</h2>
            <p className="lede mt-6 max-w-[520px]">
              A fake or unreachable COD order costs you shipping both ways, packaging and a sale that never happens.
              It shows up as a shipping cost, not a lost sale, which is why nobody owns it.
            </p>
            <p className="mt-5 max-w-[520px] text-muted">
              Move the sliders to your numbers. COD Shield confirms every one of those orders on WhatsApp before it
              ships.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <BookButton>
                Check it with your real data <span className="arrow">→</span>
              </BookButton>
              <Link href="/rto-calculator" className="link-arrow">
                Full calculator <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <RtoCalculator />
        </div>
      </section>

      {/* ---------------------------------------------------------------- packages */}
      <section className="section">
        <div className="wrap">
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Packages</p>
              <h2 className="h2 mt-[18px]">Start where it hurts most.</h2>
            </div>
            <p className="max-w-[380px] text-[16px] text-muted">
              Each package builds on the one before. All of them run on your own WhatsApp Business number, are written
              in your brand voice, and go live only after you approve them.
            </p>
          </div>
          <PackageCards />
          <p className="mt-8 text-center">
            <Link href="/packages" className="link-arrow">
              Compare everything side by side <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- how it works */}
      <section className="section">
        <div className="wrap">
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="h2 mt-[18px] max-w-[720px]">From a 15-minute call to live on WhatsApp.</h2>
            </div>
            <Link href="/how-it-works" className="link-arrow self-start lg:self-auto">
              The full process <span aria-hidden>→</span>
            </Link>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* ---------------------------------------------------------------- faq */}
      <section className="section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 mt-[18px]">Questions founders ask us.</h2>
            <p className="mt-6 max-w-[360px] text-muted">Answered the way we’d answer them on WhatsApp: short.</p>
            <Link href="/faq" className="link-arrow mt-8">
              All questions <span aria-hidden>→</span>
            </Link>
          </div>
          <FaqThread items={HOME_FAQ} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
