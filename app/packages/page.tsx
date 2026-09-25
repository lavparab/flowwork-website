import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PackageCards from "@/components/PackageCards";
import PageHeader from "@/components/PageHeader";
import { COMPARISON, PACKAGES } from "@/lib/packages";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "WhatsApp Automation Packages for D2C Brands",
  description:
    "Compare COD Shield, Growth Engine and Revenue OS: WhatsApp automation packages for Indian D2C brands, live in 7 days to 4 weeks. Each builds on the last.",
  path: "/packages",
});

const PICK = [
  { pain: "Returned COD parcels are eating your margin.", slug: "cod-shield" },
  { pain: "Your team spends hours a day replying on WhatsApp.", slug: "growth-engine" },
  { pain: "You want WhatsApp to become a sales channel of its own.", slug: "revenue-os" },
] as const;

export default function PackagesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Packages", path: "/packages" }])} />
      <PageHeader
        eyebrow="WhatsApp automation packages"
        title={
          <>
            Three packages.{" "}
            <br />
            <span className="text-muted">Each one builds on the last.</span>
          </>
        }
        lede="Start with the problem that costs you most today. Growth Engine includes everything in COD Shield, and Revenue OS includes everything in Growth Engine."
      >
        <BookButton location="packages-hero" />
      </PageHeader>

      <section className="pb-24">
        <div className="wrap">
          <PackageCards headingLevel="h2" />
        </div>
      </section>

      {/* ------------------------------------------------ comparison */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Compare</p>
          <h2 className="h2 mt-[18px] mb-12">Everything, side by side.</h2>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">What each Flowwork package includes</caption>
              <thead>
                <tr className="border-b border-text/80">
                  <th scope="col" className="w-[46%] pb-5 align-bottom text-[13px] font-medium tracking-[0.08em] text-dim uppercase">
                    Feature
                  </th>
                  {PACKAGES.map((p) => (
                    <th key={p.slug} scope="col" className={`px-3 pb-5 align-bottom ${p.popular ? "bg-lime/[0.06]" : ""}`}>
                      <Link href={`/packages/${p.slug}`} className="block hover:text-lime">
                        <span className="block text-[18px] font-bold tracking-[-0.03em]">{p.name}</span>
                        <span className="mt-1 block text-[13px] font-normal text-muted">Live in {p.liveIn}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              {COMPARISON.map((g) => (
                <tbody key={g.group}>
                  <tr>
                    <th colSpan={4} scope="colgroup" className="pt-9 pb-3 text-[13px] font-medium tracking-[0.08em] text-lime uppercase">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.name} className="border-b border-line">
                      <th scope="row" className="py-4 pr-4 text-[15.5px] font-normal">
                        {r.name}
                      </th>
                      {PACKAGES.map((p) => (
                        <td key={p.slug} className={`px-3 py-4 ${p.popular ? "bg-lime/[0.06]" : ""}`}>
                          {p.tier >= r.tier ? (
                            <svg viewBox="0 0 20 20" className="h-5 w-5 text-lime" role="img" aria-label="Included">
                              <circle cx="10" cy="10" r="10" fill="currentColor" />
                              <path d="M5.8 10.3l2.8 2.8 5.6-6" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <span className="text-dim" aria-label="Not included">
                              –
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ which one */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Which one?</p>
          <h2 className="h2 mt-[18px] mb-12 max-w-[720px]">Pick the sentence that sounds like your week.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {PICK.map((x) => {
              const p = PACKAGES.find((pk) => pk.slug === x.slug)!;
              return (
                <Link
                  key={x.slug}
                  href={`/packages/${x.slug}`}
                  className="card group flex flex-col p-7 transition-colors hover:border-lime"
                >
                  <p className="text-[22px] leading-snug font-semibold tracking-[-0.03em]">“{x.pain}”</p>
                  <p className="mt-10 text-[15px] text-muted">
                    Start with <span className="text-lime">{p.name}</span>
                  </p>
                  <span className="mt-1 text-[15px] text-dim transition-colors group-hover:text-text">
                    Live in {p.liveIn} <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="mt-10 max-w-[620px] text-muted">
            Not sure? That’s what the 15-minute audit is for. We look at your numbers and tell you which package fits,
            if any. We quote after the audit, once we’ve seen your store.
          </p>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Not sure where to start? <em className="text-lime not-italic">Start with 15 minutes.</em>
          </>
        }
      />
    </>
  );
}
