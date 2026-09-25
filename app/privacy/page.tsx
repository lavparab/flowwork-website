import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { GA_ID } from "@/lib/analytics";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Flowwork collects, uses and protects personal data when you visit our website, book an audit, or when we run WhatsApp automation for your brand.",
  path: "/privacy",
});

// Keep this date current whenever the policy changes.
const UPDATED = "25 September 2026";

export default function PrivacyPage() {
  const contact = SITE.email ? (
    <>
      email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApp{" "}
      <a href={whatsappUrl()}>{SITE.whatsappDisplay}</a>
    </>
  ) : (
    <>
      message us on WhatsApp at <a href={whatsappUrl()}>{SITE.whatsappDisplay}</a>
    </>
  );

  return (
    <article className="wrap max-w-[820px] pt-16 pb-28 md:pt-24">
      <JsonLd data={breadcrumbLd([{ name: "Privacy policy", path: "/privacy" }])} />
      <p className="kicker">Legal</p>
      <h1 className="display mt-7 !text-[clamp(40px,5vw,64px)]">Privacy policy</h1>
      <p className="mt-5 text-dim">Last updated {UPDATED}</p>

      <div className="prose-legal mt-10">
        <p>
          This policy explains how {SITE.name} (“we”, “us”), based in {SITE.city}, {SITE.country}, handles personal
          data when you visit this website, book a call with us, or when we run WhatsApp automation for your brand.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>When you book an audit:</strong> the name, email, phone number and any notes you enter in the
            booking form, which is provided by Cal.com.
          </li>
          <li>
            <strong>When you message us on WhatsApp:</strong> your phone number, profile name and the messages you
            send.
          </li>
          <li>
            <strong>When you use this website:</strong> standard technical data such as your browser type and the pages
            you visit, as recorded by our hosting provider
            {GA_ID
              ? ", and by Google Analytics, which uses cookies to show us how visitors find and use the site (for example, which pages are read and which buttons are clicked)."
              : "."}
          </li>
          <li>
            <strong>When you use the contact form:</strong> nothing is stored by this website. The form opens WhatsApp
            with your message filled in, and it reaches us only if you choose to send it.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To schedule and hold the audit call you booked, and to follow up on it.</li>
          <li>To reply to your messages and provide the services you ask for.</li>
          <li>To keep the website secure and working properly.</li>
        </ul>
        <p>We do not sell personal data, and we do not use it for advertising.</p>

        <h2>Data we handle for our clients</h2>
        <p>
          When we build and run WhatsApp automation for a brand, we process that brand’s customer data (such as names,
          phone numbers, order details and chat messages) only on the brand’s behalf and on its instructions, to
          provide the agreed service. The brand remains responsible for that data as the data fiduciary under
          India’s Digital Personal Data Protection Act, 2023. Messages are sent through the WhatsApp Business
          Platform, operated by Meta.
        </p>

        <h2>Who we share it with</h2>
        <p>We share data only with the service providers we need to run our business, such as:</p>
        <ul>
          <li>Cal.com, for booking calls</li>
          <li>Meta (WhatsApp), for messaging</li>
          <li>Our website hosting provider</li>
          {GA_ID && <li>Google, for website analytics</li>}
        </ul>
        <p>We may also disclose data where the law requires it.</p>

        <h2>How long we keep it</h2>
        <p>
          We keep personal data only as long as we need it for the purposes above, or as long as the law requires.
          Client data is kept for the duration of our engagement with that client, unless they ask us to delete it
          sooner.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to access, correct or erase your personal data, or withdraw consent you have given us. To do
          so, {contact}. We’ll respond within a reasonable time.
        </p>

        <h2>Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect personal data. No system is perfectly
          secure, but we work to keep your data safe.
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy, we’ll update the date at the top of this page. See also our{" "}
          <Link href="/terms">terms of use</Link>.
        </p>

        <h2>Contact</h2>
        <p>Questions about this policy? Please {contact}.</p>
      </div>
    </article>
  );
}
