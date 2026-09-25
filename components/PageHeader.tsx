/**
 * Top of every inner page. The small label is part of the H1, so the page's
 * keyword phrase ("WhatsApp automation packages") sits in the heading while the
 * big line stays short and punchy.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-24">
      <div className="wrap">
        <h1>
          <span className="kicker">{eyebrow}</span>{" "}
          <span className="display mt-7 block max-w-[900px] !text-[clamp(42px,5.6vw,80px)]">{title}</span>
        </h1>
        {lede && <p className="lede mt-7 max-w-[640px]">{lede}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
