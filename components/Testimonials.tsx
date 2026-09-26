import { TESTIMONIALS } from "@/lib/proof";

/** Renders nothing until lib/proof.ts has real quotes in it. */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">From our clients</p>
        <h2 className="h2 mt-[18px] mb-12">What founders say.</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col p-7">
              {t.result && <p className="text-[15px] font-semibold text-accent">{t.result}</p>}
              <blockquote className="mt-4 text-[17px] leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-auto pt-6 text-[14px] text-muted">
                <span className="block font-semibold text-text">{t.name}</span>
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
