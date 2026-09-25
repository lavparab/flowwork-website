import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import CtaSection from "@/components/CtaSection";
import RtoCalculator from "@/components/RtoCalculator";

export const metadata: Metadata = {
  title: "RTO calculator: what COD returns cost you",
  description:
    "Work out how much fake and unreachable cash-on-delivery orders cost your D2C brand every month, and what confirming them on WhatsApp could save.",
  alternates: { canonical: "/rto-calculator" },
};

const MATH = [
  ["Parcels coming back", "Orders per month × share paid by COD × share of COD orders returned"],
  ["Lost to returns", "Parcels coming back × cost of one returned parcel"],
  ["Back in your pocket", "Lost to returns × the share you expect WhatsApp confirmation to stop"],
];

export default function CalculatorPage() {
  return (
    <>
      <section className="pt-16 pb-24 md:pt-24">
        <div className="wrap grid items-start gap-14 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="kicker">RTO calculator</p>
            <h1 className="display mt-7 !text-[clamp(42px,5.2vw,76px)]">
              What are COD returns <span className="text-lime">really</span> costing you?
            </h1>
            <p className="lede mt-7 max-w-[540px]">
              Every fake or unreachable cash-on-delivery order costs you shipping both ways, packaging and a sale that
              never happens. It hides on your P&amp;L as a shipping cost, which is why nobody on your team owns it.
            </p>
            <p className="mt-5 max-w-[540px] text-muted">
              Set the sliders to your numbers. Your settings are saved in the link, so you can send it to a co-founder.
            </p>
            <div className="mt-9">
              <BookButton>
                Run it with your real order data <span className="arrow">→</span>
              </BookButton>
            </div>
          </div>
          <RtoCalculator shareable />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">The maths</p>
            <h2 className="h2 mt-[18px]">No magic numbers.</h2>
            <p className="mt-6 max-w-[480px] text-muted">
              The calculator only multiplies the numbers you give it. The last slider is your own assumption about how
              many returns confirmation would stop. On the audit we replace every assumption with your actual order
              data.
            </p>
          </div>
          <dl className="border-t border-line">
            {MATH.map(([k, v]) => (
              <div key={k} className="border-b border-line py-6">
                <dt className="font-semibold">{k}</dt>
                <dd className="mt-1 font-mono text-[14px] text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">The fix</p>
            <h2 className="h2 mt-[18px] max-w-[760px]">COD Shield confirms every COD order on WhatsApp before it ships.</h2>
            <p className="mt-6 max-w-[600px] text-muted">
              Orders nobody confirms are flagged before dispatch, so you stop paying to ship parcels that come back.
              Live in 7 days, on your own WhatsApp Business number.
            </p>
          </div>
          <Link href="/packages/cod-shield" className="btn btn-ghost">
            See COD Shield <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Want the real number? <em className="text-lime not-italic">We’ll find it in 15 minutes.</em>
          </>
        }
      />
    </>
  );
}
