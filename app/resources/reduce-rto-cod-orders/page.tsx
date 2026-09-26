import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout, { ExampleMessage } from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

const article = getArticle("reduce-rto-cod-orders");

export const metadata: Metadata = pageMeta({
  title: article.seoTitle,
  description: article.description,
  path: `/resources/${article.slug}`,
  type: "article",
  publishedTime: article.published,
  modifiedTime: article.updated,
});

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        RTO (return to origin) is what happens when a parcel can’t be delivered and travels back to your warehouse.
        For Indian D2C brands, most RTO comes from cash-on-delivery orders: the customer hasn’t paid anything yet, so
        there’s nothing stopping a fake order, a wrong address or a quiet change of mind.
      </p>
      <p>
        The frustrating part is that most of it is preventable, and almost all the prevention happens{" "}
        <strong>before the parcel is packed</strong>. This guide covers why COD orders come back, what each return
        really costs you, and seven things you can do about it.
      </p>

      <h2>What one returned parcel actually costs</h2>
      <p>RTO rarely shows up on your P&amp;L as a lost sale. It hides inside shipping costs. A single return usually means:</p>
      <ul>
        <li>
          <strong>Forward shipping</strong> you paid to send the parcel out
        </li>
        <li>
          <strong>Return shipping</strong> to bring it back
        </li>
        <li>
          <strong>Packaging</strong> that often can’t be reused
        </li>
        <li>
          <strong>Damaged or expired stock</strong>, especially for food, cosmetics and fragile products
        </li>
        <li>
          <strong>Inventory stuck in transit</strong> for days while it could have been sold to someone else
        </li>
        <li>
          <strong>Ad spend</strong> that brought in an order that was never going to convert
        </li>
      </ul>
      <p>
        Multiply that by every returned COD order in a month and the number is usually bigger than founders expect. Our{" "}
        <Link href="/rto-calculator">RTO calculator</Link> does the multiplication with your own numbers.
      </p>

      <h2>Why COD orders come back</h2>
      <p>Before fixing RTO, it helps to know which kind you have. Most returns fall into a few buckets:</p>
      <ul>
        <li>
          <strong>Fake or prank orders</strong> placed with made-up names and numbers
        </li>
        <li>
          <strong>Impulse orders</strong> the customer regrets before the parcel arrives
        </li>
        <li>
          <strong>Wrong or incomplete addresses</strong>: missing flat numbers, landmarks or the wrong pincode
        </li>
        <li>
          <strong>Unreachable customers</strong> who don’t answer the courier’s call
        </li>
        <li>
          <strong>Cash not ready</strong> when the delivery arrives
        </li>
        <li>
          <strong>Slow delivery</strong>, where the customer has already bought elsewhere by the time it turns up
        </li>
      </ul>
      <p>
        Your courier’s RTO reason codes will tell you which of these hurts most. Most of them share one fix: talk to
        the customer before you ship.
      </p>

      <h2>7 ways to reduce RTO on COD orders</h2>

      <h3>1. Confirm every COD order before dispatch</h3>
      <p>
        This is the single biggest lever. As soon as a COD order comes in, send the customer a message with the order
        summary, the amount to pay and the delivery address, and ask them to confirm. WhatsApp works well for this
        because your customers already use it every day and can answer with one tap.
      </p>
      <ExampleMessage replies={["Confirm order", "Change address", "Cancel order"]}>
        Hi Priya, thanks for ordering from Kaapi Co.! Please confirm your cash-on-delivery order #KC-2841 for ₹1,499 so
        we can ship it today. Delivering to: Kothrud, Pune 411038.
      </ExampleMessage>
      <p>
        A real customer confirms in seconds. A fake order never replies. Either way, you learn something before you’ve
        spent a rupee on shipping. We wrote a separate guide on{" "}
        <Link href="/resources/whatsapp-cod-confirmation">what to send and when</Link>.
      </p>

      <h3>2. Hold unconfirmed orders instead of shipping them blind</h3>
      <p>
        Confirmation only helps if you act on the answer. Decide on a simple rule, for example: no confirmation within
        a few hours means the order is flagged and held. Your team then decides whether to try once more, call, or
        cancel. What matters is that an unconfirmed COD order never ships by default.
      </p>

      <h3>3. Fix addresses before the courier finds the problem</h3>
      <p>
        A lot of “customer not available” returns are really address problems. Give customers an easy way to correct
        their address during confirmation, ask for a landmark for areas where addresses are hard to find, and check
        that the pincode is serviceable for COD before you promise delivery.
      </p>

      <h3>4. Set COD rules that match your risk</h3>
      <p>Not every order needs the same treatment. Common rules brands use:</p>
      <ul>
        <li>A COD limit on high-value orders</li>
        <li>Prepaid-only for phone numbers or addresses with repeated past returns</li>
        <li>A small advance payment for pincodes where RTO is consistently high</li>
      </ul>
      <p>
        Start with your own data. Look at RTO by pincode, product and campaign, and only tighten rules where the returns
        actually are, so you don’t turn away good customers.
      </p>

      <h3>5. Give customers a reason to prepay</h3>
      <p>
        Every order that moves from COD to prepaid removes RTO risk entirely. A small prepaid discount, free shipping
        on prepaid orders, or a one-tap payment link sent after the customer confirms can all shift the mix. Keep COD
        available, though: for many customers it’s the reason they’re willing to try a new brand at all.
      </p>

      <h3>6. Keep customers informed after dispatch</h3>
      <p>
        Returns don’t only happen before shipping. Customers who don’t know when a parcel is coming are more likely to
        miss it or refuse it. Send shipping updates, and on the day of delivery, a short message:
      </p>
      <ExampleMessage>Your order is out for delivery today between 2 and 6 PM. Please keep ₹1,499 ready.</ExampleMessage>
      <p>That one line tackles two common reasons for RTO: not being home, and not having the cash ready.</p>

      <h3>7. Measure RTO by source, not just in total</h3>
      <p>
        A single RTO percentage hides where the problem is. Track it by pincode, by product, by courier and by ad
        campaign. Some campaigns bring in impulse buyers who rarely accept delivery, and it’s better to know that before
        you scale the budget. Compare the numbers before and after you start confirming orders so you can see what’s
        working.
      </p>

      <h2>Where to start</h2>
      <p>
        If you do only one thing, confirm every COD order before it ships and hold the ones nobody confirms. It costs
        almost nothing per order and it targets the returns that were never going to be delivered in the first place.
      </p>
      <div className="callout-box">
        <strong>How Flowwork does this:</strong> <Link href="/packages/cod-shield">COD Shield</Link> confirms every
        cash-on-delivery order on WhatsApp the moment it’s placed and flags fake and unreachable orders before dispatch.
        It runs on your own WhatsApp Business number, in your brand voice, and goes live in 7 days.
      </div>
    </ArticleLayout>
  );
}
