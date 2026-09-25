import type { Metadata } from "next";
import CalInline from "@/components/CalInline";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import WhatsAppLink, { WhatsAppIcon } from "@/components/WhatsAppLink";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Book a Free WhatsApp Automation Audit",
  description:
    "Book a free 15-minute audit with Flowwork. We look at your COD orders, returns and WhatsApp chats, and tell you which package fits your store, if any.",
  path: "/contact",
});

const AGENDA = [
  ["5 min", "Your COD share and how many of those orders come back"],
  ["5 min", "How customers reach you on WhatsApp today"],
  ["5 min", "Which package would pay for itself first, if any"],
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE.url}/contact`,
          name: "Book a 15-minute audit with Flowwork",
          about: { "@id": ORG_ID },
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />

      <section className="pt-16 pb-28 md:pt-24">
        <div className="wrap grid items-start gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <h1>
              <span className="kicker">Free WhatsApp automation audit</span>{" "}
              <span className="display mt-7 block !text-[clamp(42px,5vw,72px)]">
                Book a 15-min audit. <span className="text-muted">It’s free.</span>
              </span>
            </h1>
            <p className="lede mt-7 max-w-[480px]">
              Pick a time that suits you. You’ll leave knowing what your WhatsApp could be doing, whether or not you
              work with us.
            </p>

            <dl className="mt-10 border-t border-line">
              {AGENDA.map(([t, d]) => (
                <div key={d} className="flex gap-6 border-b border-line py-4">
                  <dt className="w-14 shrink-0 font-mono text-[13px] text-lime">{t}</dt>
                  <dd className="text-[15.5px] text-muted">{d}</dd>
                </div>
              ))}
            </dl>

            <address className="mt-10 space-y-2 text-[15px] not-italic">
              <p>
                <WhatsAppLink location="contact" text="Hi Flowwork, I'd like to know more." className="btn btn-ghost">
                  <WhatsAppIcon /> WhatsApp {SITE.whatsappDisplay}
                </WhatsAppLink>
              </p>
              {SITE.email && (
                <p className="pt-2">
                  <a href={`mailto:${SITE.email}`} className="text-muted hover:text-text">
                    {SITE.email}
                  </a>
                </p>
              )}
              <p className="pt-3 text-dim">
                {SITE.name} · {SITE.city}, {SITE.region}, {SITE.country}
                {SITE.hours && <> · {SITE.hours}</>}
              </p>
              <p className="text-dim">Working with D2C brands across {SITE.serviceArea}.</p>
            </address>
          </div>

          <div className="space-y-6">
            <CalInline />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
