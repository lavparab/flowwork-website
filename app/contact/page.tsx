import type { Metadata } from "next";
import CalInline from "@/components/CalInline";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a 15-min audit",
  description:
    "Book a free 15-minute audit with Flowwork. We look at your COD orders, returns and WhatsApp chats, and tell you which package fits, if any.",
  alternates: { canonical: "/contact" },
};

const AGENDA = [
  ["5 min", "Your COD share and how many of those orders come back"],
  ["5 min", "How customers reach you on WhatsApp today"],
  ["5 min", "Which package would pay for itself first, if any"],
];

export default function ContactPage() {
  return (
    <section className="pt-16 pb-28 md:pt-24">
      <div className="wrap grid items-start gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="kicker">Contact</p>
          <h1 className="display mt-7 !text-[clamp(42px,5vw,72px)]">
            Book a 15-min audit.
            <br />
            <span className="text-muted">It’s free.</span>
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

          <div className="mt-10 space-y-3 text-[15px]">
            <p className="text-dim">Rather message?</p>
            <a href={whatsappUrl("Hi Flowwork, I'd like to know more.")} className="btn btn-ghost">
              WhatsApp {SITE.whatsappDisplay}
            </a>
            {SITE.email && (
              <p>
                <a href={`mailto:${SITE.email}`} className="text-muted hover:text-text">
                  {SITE.email}
                </a>
              </p>
            )}
            <p className="pt-2 text-dim">
              {SITE.city}, {SITE.country}
            </p>
          </div>
        </div>

        <CalInline />
      </div>
    </section>
  );
}
