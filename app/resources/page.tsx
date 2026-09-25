import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { ARTICLES, formatDate } from "@/lib/articles";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "D2C Guides to RTO and WhatsApp Selling",
  description:
    "Practical guides for Indian D2C brands on cutting COD returns, confirming orders on WhatsApp and running sales and support on WhatsApp.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Resources", path: "/resources" }])} />
      <PageHeader
        eyebrow="Guides for D2C brands on RTO and WhatsApp"
        title={
          <>
            Resources. <span className="text-muted">Short, practical, no fluff.</span>
          </>
        }
        lede="What we’ve learned about COD returns, WhatsApp and running a D2C store without drowning in chats."
      />

      <section className="pb-24">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-2">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/resources/${a.slug}`}
                  className="card group flex h-full flex-col p-7 transition-colors hover:border-lime sm:p-8"
                >
                  <p className="text-[13px] text-dim">
                    <time dateTime={a.updated}>{formatDate(a.updated)}</time> · {a.readingMinutes} min read
                  </p>
                  <h2 className="mt-5 text-[24px] leading-tight font-bold tracking-[-0.035em] group-hover:text-lime">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-[15.5px] text-muted">{a.description}</p>
                  <span className="mt-auto pt-8 text-[15px] font-semibold">
                    Read the guide <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link href="/rto-calculator" className="card group p-7 transition-colors hover:border-lime">
              <p className="eyebrow">Tool</p>
              <h2 className="mt-4 text-[22px] font-bold tracking-[-0.03em]">RTO calculator</h2>
              <p className="mt-2 text-[15.5px] text-muted">
                Work out what returned COD parcels cost you every month.
              </p>
            </Link>
            <Link href="/faq" className="card group p-7 transition-colors hover:border-lime">
              <p className="eyebrow">Answers</p>
              <h2 className="mt-4 text-[22px] font-bold tracking-[-0.03em]">FAQ</h2>
              <p className="mt-2 text-[15.5px] text-muted">
                Your number, your brand voice, packages, timelines and what we need from you.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
