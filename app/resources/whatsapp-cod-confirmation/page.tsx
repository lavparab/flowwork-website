import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout, { ExampleMessage } from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

const article = getArticle("whatsapp-cod-confirmation");

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
        Confirming cash-on-delivery orders before they ship is one of the cheapest ways to{" "}
        <Link href="/resources/reduce-rto-cod-orders">cut RTO</Link>. WhatsApp is the natural place to do it for Indian
        D2C brands: customers already use it every day, they can confirm with one tap, and if something’s wrong with
        the address you can fix it in the same chat.
      </p>
      <p>
        Here’s how to set it up properly: the rules WhatsApp puts on business messages, what the message should say,
        the flows behind each reply, and what to do when nobody answers.
      </p>

      <h2>The WhatsApp rules you need to know</h2>
      <p>
        Order confirmations are sent through the WhatsApp Business Platform, which is run by Meta. A few of its rules
        shape how the flow works:
      </p>
      <ul>
        <li>
          <strong>Customers must opt in.</strong> They need to have agreed to hear from you on WhatsApp. Most brands add
          a WhatsApp opt-in at checkout.
        </li>
        <li>
          <strong>You start conversations with approved templates.</strong> A message your business sends first has to
          use a template that Meta has approved. Order confirmations usually fall under the “utility” category.
        </li>
        <li>
          <strong>Replies open a service window.</strong> Once the customer replies, you can respond freely for 24
          hours. That’s what lets you handle an address change in a natural back-and-forth.
        </li>
      </ul>
      <p>
        None of this is hard, but it means the confirmation message has to be planned and approved up front, not
        improvised order by order.
      </p>

      <h2>When to send it</h2>
      <p>
        Send the confirmation <strong>as soon as the order is placed</strong>. The customer is still thinking about
        your brand, still has their phone in hand, and is most likely to reply. The longer you wait, the more the order
        starts to look like a stranger’s message.
      </p>
      <p>
        Orders placed late at night are fine to confirm straight away too: the customer just placed the order, so
        they’re awake. It’s the reminders that should wait for sensible hours.
      </p>

      <h2>What the message should include</h2>
      <p>Keep it short, and make sure it has everything the customer needs to say yes with confidence:</p>
      <ul>
        <li>The customer’s name and your brand name, so it doesn’t look like spam</li>
        <li>The order number and what they ordered</li>
        <li>The amount to pay on delivery</li>
        <li>The delivery address, so they can spot mistakes</li>
        <li>Clear buttons: Confirm, Change address, Cancel</li>
      </ul>
      <ExampleMessage replies={["Confirm order", "Change address", "Cancel order"]}>
        Hi Priya, thanks for ordering from Kaapi Co.! Please confirm your cash-on-delivery order:
        <br />
        <br />
        Cold Brew Starter Kit × 1 · ₹1,499
        <br />
        Delivering to: Flat 4B, Lane 7, Kothrud, Pune 411038
      </ExampleMessage>

      <h2>What happens after each reply</h2>

      <h3>Confirm</h3>
      <p>
        Thank them, tell them when to expect the parcel, and remind them of the amount. Then mark the order as
        confirmed in your store so it moves to packing.
      </p>
      <ExampleMessage>Confirmed ✓ Your kit ships today. Please keep ₹1,499 ready at delivery.</ExampleMessage>

      <h3>Change address</h3>
      <p>
        Ask for the corrected address in the chat, repeat it back, and update the order before it’s packed. This is
        where WhatsApp beats an IVR call: the customer can type the address, paste a landmark or share a location.
      </p>

      <h3>Cancel</h3>
      <p>
        Cancel the order without friction and, optionally, ask one quick question about why. A cancelled order costs
        you nothing. A parcel that ships and comes back costs you twice.
      </p>

      <h3>No reply</h3>
      <p>This is the case that matters most, because it’s where fake and unreachable orders show up.</p>
      <ol>
        <li>Wait a few hours, then send one friendly reminder saying the order is on hold until they confirm.</li>
        <li>If there’s still no reply, flag the order for your team before dispatch.</li>
        <li>Your team decides: try a call, keep holding, or cancel. What matters is that it doesn’t ship by default.</li>
      </ol>
      <ExampleMessage>
        Just checking in: your order #KC-2841 is on hold until you confirm. Tap Confirm and we’ll ship it today.
      </ExampleMessage>

      <h2>Write it in your brand voice</h2>
      <p>
        The same confirmation can sound like a bank or like your brand. Customers can tell the difference, and a
        message that sounds like you gets more replies than one that sounds like a system notification. Compare:
      </p>
      <ExampleMessage>Dear Customer, your order no. 2841 is pending confirmation. Reply 1 to confirm.</ExampleMessage>
      <ExampleMessage>
        Hi Priya! Your cold brew kit is ready to ship. Just tap Confirm and it leaves today ☕
      </ExampleMessage>
      <p>
        Match how your brand already talks on Instagram and on your packaging, whether that’s formal, playful or
        Hinglish.
      </p>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>
          <strong>Leaving out the amount.</strong> Customers who know what they’ll pay are more likely to have the cash
          ready.
        </li>
        <li>
          <strong>Links without context.</strong> A bare link from an unknown number looks like a scam.
        </li>
        <li>
          <strong>Too many reminders.</strong> One reminder is helpful. Three is spam, and it risks customers blocking
          your number.
        </li>
        <li>
          <strong>Not syncing with your store.</strong> If confirmations and cancellations don’t update the order,
          your warehouse will ship them anyway.
        </li>
        <li>
          <strong>Confirming but not acting.</strong> Collecting confirmations is pointless if unconfirmed orders still
          ship.
        </li>
      </ul>

      <h2>Doing it without anyone on your team typing</h2>
      <p>
        You can run this by hand when you have a few orders a day. Beyond that, it needs to be automatic: the message
        fires the moment the order is placed, replies update the order, and unconfirmed orders are flagged on their
        own.
      </p>
      <div className="callout-box">
        <strong>How Flowwork does this:</strong> <Link href="/packages/cod-shield">COD Shield</Link> sets up exactly
        this flow on your own WhatsApp Business number, written in your brand voice and approved by you before it goes
        live. It’s live in 7 days. Curious what returns are costing you now? Try the{" "}
        <Link href="/rto-calculator">RTO calculator</Link>.
      </div>
    </ArticleLayout>
  );
}
