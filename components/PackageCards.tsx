import Link from "next/link";
import { getPackage, PACKAGES } from "@/lib/packages";

/** The three packages side by side, each listing only what it adds to the one before. */
export default function PackageCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {PACKAGES.map((p) => {
        const base = p.buildsOn ? getPackage(p.buildsOn) : undefined;
        const pop = p.popular;
        return (
          <article
            key={p.slug}
            className={`relative flex flex-col rounded-[28px] border p-7 sm:p-8 ${
              pop ? "border-lime bg-lime text-ink" : "border-line bg-s1"
            }`}
          >
            {pop && (
              <span className="absolute top-7 right-7 rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-lime sm:top-8 sm:right-8">
                Most popular
              </span>
            )}
            <H className="text-[26px] font-bold tracking-[-0.035em]">{p.name}</H>
            <p className="mt-8 text-[56px] leading-none font-bold tracking-[-0.06em]">
              <small className={`mb-2 block text-[13px] font-medium tracking-normal ${pop ? "text-[#2d3a1c]" : "text-dim"}`}>
                Live in
              </small>
              {p.liveIn}
            </p>
            <p className={`mt-5 text-[16px] sm:min-h-[48px] ${pop ? "text-[#2d3a1c]" : "text-muted"}`}>{p.pitch}</p>

            <div className={`mt-6 border-t ${pop ? "border-ink/15" : "border-line"}`}>
              {base && (
                <p className={`border-b py-3 text-[15px] font-semibold ${pop ? "border-ink/15" : "border-line"}`}>
                  Everything in {base.name}, plus:
                </p>
              )}
              <ul>
                {p.adds.map((f) => (
                  <li
                    key={f.name}
                    className={`flex gap-2.5 border-b py-[11px] text-[15px] ${pop ? "border-ink/15" : "border-line"} ${
                      pop ? "before:!bg-ink" : ""
                    } bullet-lime`}
                  >
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>

            <p className={`mt-6 mb-6 text-[14px] ${pop ? "text-[#2d3a1c]" : "text-dim"}`}>Best if {p.bestFor}</p>
            <Link
              href={`/packages/${p.slug}`}
              className={`btn mt-auto ${pop ? "btn-ink" : "btn-ghost hover:!border-lime hover:text-lime"}`}
            >
              Explore {p.name} <span className="arrow">→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
