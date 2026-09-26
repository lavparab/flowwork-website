import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookButton from "@/components/BookButton";
import FaqThread from "@/components/chat/FaqThread";
import PhoneDemo from "@/components/chat/PhoneDemo";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { ARTICLES } from "@/lib/articles";
import { PACKAGE_DEMOS } from "@/lib/chat";
import { getPackage, includedGroups, PACKAGES } from "@/lib/packages";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import Range from "@/components/Range";

export const dynamicParams = false;

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = getPackage((await params).slug);
  if (!pkg) return {};
  return pageMeta({ title: pkg.seoTitle, description: pkg.seoDescription, path: `/packages/${pkg.slug}` });
}

const DEMO_LABELS: Record<string, string> = {
  "cod-shield":
    "Example: a customer confirms a ₹1,499 cash-on-delivery order on WhatsApp and it ships the same day. A second order with no reply and an unreachable number is flagged before dispatch.",
  "growth-engine":
    "Example: at 2:14 AM a customer asks which night cream suits dry skin, gets a recommendation, adds it to her cart in the chat, and the next day gets a shipping update.",
  "revenue-os":
    "Example: 29 days after delivery a customer gets a reorder reminder, asks for two jars instead of one, confirms her address and the order is placed inside WhatsApp.",
};

export default async function PackagePage({ params }: Props) {
  const pkg = getPackage((await params).slug);
  if (!pkg) notFound();

  const demo = PACKAGE_DEMOS[pkg.slug];
  const groups = includedGroups(pkg);
  const inherited = groups.filter((g) => g.from.slug !== pkg.slug);
  const next = PACKAGES.find((p) => p.tier === pkg.tier + 1);
  const related = ARTICLES.filter((a) => pkg.related?.includes(a.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pkg.name,
          alternateName: `${SITE.name} ${pkg.name}`,
          description: pkg.summary,
          url: `${SITE.url}/packages/${pkg.slug}`,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "Country", name: SITE.serviceArea },
          serviceType: "WhatsApp automation",
          audience: { "@type": "BusinessAudience", name: "Indian D2C brands" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${pkg.name} includes`,
            itemListElement: includedGroups(pkg)
              .flatMap((g) => g.features)
              .map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f.name, description: f.detail } })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Packages", path: "/packages" },
          { name: pkg.name, path: `/packages/${pkg.slug}` },
        ])}
      />

      {/* ------------------------------------------------ hero */}
      <section className="pt-10 pb-24 md:pt-14">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <div>
            <nav aria-label="Breadcrumb" className="text-[14px] text-dim">
              <Link href="/packages" className="hover:text-text">
                Packages
              </Link>
              <span className="mx-2">/</span>
              <span className="text-muted" aria-current="page">
                {pkg.name}
              </span>
            </nav>
            <h1 className="mt-8">
              <span className="kicker">{pkg.keyword}</span>{" "}
              <span className="display mt-5 block !text-[clamp(48px,6vw,88px)]">{pkg.name}</span>
            </h1>
            <p className="mt-4 flex items-center gap-3 text-[13px] font-medium tracking-[0.08em] text-dim uppercase">
              Package 0{pkg.tier} of 03
              {pkg.popular && (
                <span className="rounded-full bg-lime px-2.5 py-0.5 text-[12px] font-semibold tracking-normal text-ink normal-case">
                  Most popular
                </span>
              )}
            </p>
            <p className="mt-6 text-[24px] leading-snug font-semibold tracking-[-0.025em]">{pkg.pitch}</p>
            <p className="lede mt-5 max-w-[560px]">{pkg.summary}</p>

            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-line pt-7">
              <div>
                <p className="text-[13px] text-dim">Live in</p>
                <p className="text-[44px] leading-none font-bold tracking-[-0.055em]"><Range>{pkg.liveIn}</Range></p>
              </div>
              <div className="flex flex-wrap gap-3">
                <BookButton location={`package-hero:${pkg.slug}`} />
                <Link href="#included" className="btn btn-ghost">
                  What’s included
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <PhoneDemo
              brand={demo.brand}
              initial={demo.initial}
              script={demo.script}
              label={DEMO_LABELS[pkg.slug]}
              caption="Example brand · sample conversation"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ included */}
      <section id="included" className="section scroll-mt-16">
        <div className="wrap">
          <p className="eyebrow">What’s included</p>
          <h2 className="h2 mt-[18px] mb-14 max-w-[820px]">
            {pkg.buildsOn ? `Everything in ${getPackage(pkg.buildsOn)!.name}, plus:` : "What you get."}
          </h2>

          <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2">
            {pkg.adds.map((f, i) => (
              <div key={f.name} className="bg-canvas p-7 sm:p-8">
                <span className="text-[13px] text-accent tabular-nums">0{i + 1}</span>
                <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.03em]">{f.name}</h3>
                <p className="mt-2 max-w-[460px] text-[15.5px] text-muted">{f.detail}</p>
              </div>
            ))}
            {pkg.adds.length % 2 === 1 && <div className="hidden bg-canvas md:block" />}
          </div>

          {inherited.length > 0 && (
            <div className={`mt-6 grid gap-4 ${inherited.length > 1 ? "md:grid-cols-2" : ""}`}>
              {inherited.map((g) => (
                <div key={g.from.slug} className="card p-7">
                  <p className="text-[14px] text-dim">
                    Included from{" "}
                    <Link href={`/packages/${g.from.slug}`} className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">
                      {g.from.name}
                    </Link>
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.features.map((f) => (
                      <li key={f.name} className="rounded-full border border-line px-3 py-1.5 text-[14px] text-muted">
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Your number", "Runs on your own WhatsApp Business number."],
              ["Your voice", "Every message is written the way your brand talks."],
              ["Your approval", "Nothing goes live until you’ve signed it off."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[20px] border border-dashed border-line p-6">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-[15px] text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ timeline */}
      <section className="section">
        <div className="wrap">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2 className="h2 mt-[18px]">Live in <Range>{pkg.liveIn}</Range>.</h2>
            </div>
            <p className="max-w-[380px] text-muted">
              Best if {pkg.bestFor}
            </p>
          </div>
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-gradient-to-r from-line via-line to-accent md:block" />
            {pkg.phases.map((ph, i) => (
              <li key={ph.title} className="relative pl-8 md:pt-10 md:pl-0">
                <span
                  aria-hidden
                  className={`absolute top-[2px] left-0 h-[11px] w-[11px] rounded-full md:top-[2px] ${
                    i === pkg.phases.length - 1 ? "bg-accent" : "border border-muted bg-canvas"
                  }`}
                />
                <p className="text-[13px] text-dim">{ph.when}</p>
                <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.025em]">{ph.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{ph.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------ faq + next tier */}
      <section className="section">
        {/* Phones: heading, questions, then the upsell. Desktop: questions on the right. */}
        <div className="wrap grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-x-16 lg:gap-y-10">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="h2 mt-[18px]">About {pkg.name}.</h2>
          </div>
          <FaqThread items={pkg.faqs} className="lg:col-start-2 lg:row-span-2 lg:row-start-1" />
          <div className="lg:col-start-1 lg:row-start-2">
            {next ? (
              <Link href={`/packages/${next.slug}`} className="card group block p-6 transition-colors hover:border-accent">
                <p className="text-[14px] text-dim">Want more?</p>
                <p className="mt-2 text-[20px] leading-snug font-semibold tracking-[-0.025em]">
                  {next.name} adds {next.adds.slice(0, 3).map((f) => f.name.toLowerCase()).join(", ")} and more.
                </p>
                <p className="mt-4 text-[15px] text-accent">
                  Explore {next.name} <span aria-hidden>→</span>
                </p>
              </Link>
            ) : (
              <Link href="/packages" className="link-arrow">
                Compare all packages <span aria-hidden>→</span>
              </Link>
            )}
            {related.length > 0 && (
              <div className="mt-10">
                <p className="text-[13px] font-medium tracking-[0.08em] text-dim uppercase">Related guides</p>
                <ul className="mt-3 space-y-3">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/resources/${a.slug}`} className="text-[16px] text-muted underline-offset-4 hover:text-accent hover:underline">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                  {pkg.slug === "cod-shield" && (
                    <li>
                      <Link href="/rto-calculator" className="text-[16px] text-muted underline-offset-4 hover:text-accent hover:underline">
                        RTO calculator: what COD returns cost you
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            {pkg.name}, live in <Range>{pkg.liveIn}</Range>. <em className="hl not-italic">It starts with 15&nbsp;minutes.</em>
          </>
        }
        note="We look at your numbers first and tell you honestly whether it fits. We quote after the audit."
      />
    </>
  );
}
