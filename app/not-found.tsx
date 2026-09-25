import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pt-20 pb-32 md:pt-28">
      <div className="wrap max-w-[640px]">
        <h1 className="sr-only">Page not found</h1>
        <div className="card dot-bg flex flex-col gap-2 p-5 sm:p-7">
          <div className="msg msg-out !text-[16px]">
            hey, where’s this page?<span className="msg-time">404</span>
          </div>
          <div className="msg msg-in !text-[16px]">
            It didn’t get confirmed, so we never shipped it. Try one of these instead:
          </div>
          <div className="quick-replies !w-full max-w-[320px] !gap-1.5">
            <Link href="/">Home</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/rto-calculator">RTO calculator</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
