import { SITE } from "@/lib/site";
import BookButton from "./BookButton";
import { Mark } from "./Logo";
import WhatsAppLink from "./WhatsAppLink";

export default function CtaSection({
  title = (
    <>
      Your customers are already on WhatsApp. <em className="hl not-italic">Your store should be too.</em>
    </>
  ),
  note = "15 minutes. Free. You leave knowing what your WhatsApp could be doing.",
}: {
  title?: React.ReactNode;
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line pt-32 pb-28 text-center md:pt-36 md:pb-32">
      <Mark className="pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-watermark" />
      <div className="wrap relative">
        <h2 className="h2 mx-auto max-w-[900px]">{title}</h2>
        <p className="mx-auto mt-6 max-w-[520px] text-muted">{note}</p>
        <div className="mt-10 flex justify-center">
          <BookButton location="cta" />
        </div>
        <WhatsAppLink
          location="cta"
          text="Hi Flowwork, I'd like to know more."
          className="mt-6 inline-block text-[14px] text-dim transition-colors hover:text-text"
        >
          or message us on WhatsApp · {SITE.whatsappDisplay}
        </WhatsAppLink>
      </div>
    </section>
  );
}
