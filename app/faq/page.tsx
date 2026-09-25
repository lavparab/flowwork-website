import type { Metadata } from "next";
import BookButton from "@/components/BookButton";
import FaqThread from "@/components/chat/FaqThread";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { ALL_FAQS, FAQ_GROUPS } from "@/lib/faqs";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Flowwork’s WhatsApp automation for Indian D2C brands: your number, your brand voice, packages, timelines and what we need from you.",
  alternates: { canonical: "/faq" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ALL_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Questions founders ask us.
            <br />
            <span className="text-muted">Answered short.</span>
          </>
        }
        lede="Can’t find yours? Ask it on WhatsApp, or bring it to the 15-minute audit."
      >
        <a href={whatsappUrl("Hi Flowwork, I have a question:")} className="btn btn-ghost">
          Ask on WhatsApp
        </a>
        <BookButton />
      </PageHeader>

      <section className="pb-24">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {FAQ_GROUPS.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slug(g.title)}`}
                    className="block rounded-full border border-line px-4 py-2 text-[15px] text-muted transition-colors hover:text-text lg:rounded-none lg:border-0 lg:border-l lg:px-4 lg:py-2.5 lg:hover:border-lime"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {FAQ_GROUPS.map((g) => (
              <section key={g.title} id={slug(g.title)} className="scroll-mt-28" aria-labelledby={`${slug(g.title)}-h`}>
                <h2 id={`${slug(g.title)}-h`} className="h3 mb-6">
                  {g.title}
                </h2>
                <FaqThread items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
