/** Top of every inner page. */
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
        <p className="kicker">{eyebrow}</p>
        <h1 className="display mt-7 max-w-[900px] !text-[clamp(42px,5.6vw,80px)]">{title}</h1>
        {lede && <p className="lede mt-7 max-w-[640px]">{lede}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
