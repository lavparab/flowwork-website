import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the Flowwork website, including how we treat examples and estimates, booking an audit, and intellectual property.",
  path: "/terms",
});

// Keep this date current whenever the terms change.
const UPDATED = "25 September 2026";

export default function TermsPage() {
  return (
    <article className="wrap max-w-[820px] pt-16 pb-28 md:pt-24">
      <JsonLd data={breadcrumbLd([{ name: "Terms of use", path: "/terms" }])} />
      <p className="kicker">Legal</p>
      <h1 className="display mt-7 !text-[clamp(40px,5vw,64px)]">Terms of use</h1>
      <p className="mt-5 text-dim">Last updated {UPDATED}</p>

      <div className="prose-legal mt-10">
        <p>
          These terms apply when you use the {SITE.name} website. By using the site, you agree to them. If you don’t
          agree, please don’t use the site.
        </p>

        <h2>About this website</h2>
        <p>
          This website describes the WhatsApp automation services {SITE.name} offers to D2C brands. It is for
          information only and is not an offer to provide services. Any work we do for you is covered by a separate
          written agreement, which takes priority over these terms.
        </p>

        <h2>Examples and estimates</h2>
        <p>
          The conversations, brand names, dashboards and numbers shown on this site are examples. The RTO calculator
          gives an illustrative estimate based only on the numbers you enter. None of it is a guarantee of results
          for your business.
        </p>

        <h2>Booking an audit</h2>
        <p>
          The 15-minute audit is free and doesn’t commit you to anything. Bookings are handled by Cal.com, and their
          own terms apply to that service.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The Flowwork name, logo, website design and content belong to {SITE.name}. Please don’t copy or reuse them
          without our permission. WhatsApp is a trademark of Meta Platforms, Inc. {SITE.name} is not affiliated with
          or endorsed by Meta.
        </p>

        <h2>Links to other sites</h2>
        <p>
          We link to services such as Cal.com and WhatsApp. We’re not responsible for their content or how they
          handle your data.
        </p>

        <h2>Liability</h2>
        <p>
          We work to keep this website accurate and available, but we provide it “as is” and can’t promise it will
          always be error-free. To the extent the law allows, we aren’t liable for any loss that comes from using the
          site.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India, and the courts of {SITE.city}, Maharashtra have jurisdiction.
        </p>

        <h2>Changes and contact</h2>
        <p>
          We may update these terms from time to time, and the date at the top will change when we do. Questions?
          Message us on WhatsApp at <a href={whatsappUrl()}>{SITE.whatsappDisplay}</a>
          {SITE.email && (
            <>
              {" "}
              or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </>
          )}
          . See also our <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </article>
  );
}
