import Link from "next/link";
import { type Article, ARTICLES, formatDate } from "@/lib/articles";
import { breadcrumbLd, ORG_ID } from "@/lib/seo";
import { SITE } from "@/lib/site";
import BookButton from "./BookButton";
import JsonLd from "./JsonLd";

/** Shared frame for resource articles: breadcrumbs, header, prose, schema and a CTA. */
export default function ArticleLayout({ article, children }: { article: Article; children: React.ReactNode }) {
  const url = `${SITE.url}/resources/${article.slug}`;
  const others = ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.description,
          datePublished: article.published,
          dateModified: article.updated,
          inLanguage: "en-IN",
          mainEntityOfPage: url,
          url,
          image: `${SITE.url}/og-image.png`,
          author: { "@type": "Organization", name: SITE.name, url: SITE.url },
          publisher: { "@id": ORG_ID },
          keywords: article.keyword,
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: "Resources", path: "/resources" }, { name: article.title, path: `/resources/${article.slug}` }])} />

      <article className="pt-10 pb-24 md:pt-14">
        <div className="wrap max-w-[780px]">
          <nav aria-label="Breadcrumb" className="text-[14px] text-dim">
            <Link href="/" className="hover:text-text">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/resources" className="hover:text-text">
              Resources
            </Link>
          </nav>

          <h1 className="mt-8 text-[clamp(36px,4.6vw,58px)] leading-[1.04] font-bold tracking-[-0.045em]">{article.title}</h1>
          <p className="lede mt-6">{article.description}</p>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-b border-line pb-8 text-[14px] text-dim">
            <span>By {SITE.name}</span>
            <span>
              Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
            </span>
            <span>{article.readingMinutes} min read</span>
          </p>

          <div className="prose-article mt-10">{children}</div>

          <aside className="card mt-16 p-7 sm:p-9">
            <p className="eyebrow">Flowwork</p>
            <p className="mt-4 text-[26px] leading-tight font-bold tracking-[-0.035em]">
              Want this running on your store without anyone typing?
            </p>
            <p className="mt-3 text-muted">
              We set up WhatsApp automation for Indian D2C brands on your own number, in your brand voice. In a free
              15-minute audit we look at your numbers and tell you which package fits, if any.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <BookButton location={`article:${article.slug}`} />
              <Link href="/packages" className="link-arrow">
                See the packages <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>

          {others.length > 0 && (
            <nav aria-label="More resources" className="mt-16">
              <h2 className="text-[13px] font-medium tracking-[0.08em] text-dim uppercase">Keep reading</h2>
              <ul className="mt-4 border-t border-line">
                {others.map((a) => (
                  <li key={a.slug} className="border-b border-line">
                    <Link href={`/resources/${a.slug}`} className="group flex items-baseline justify-between gap-6 py-5">
                      <span className="text-[19px] font-semibold tracking-[-0.02em] group-hover:text-accent">{a.title}</span>
                      <span className="shrink-0 text-[14px] text-dim">{a.readingMinutes} min</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}

/** A WhatsApp-style example message inside an article. */
export function ExampleMessage({ children, from = "brand" }: { children: React.ReactNode; from?: "brand" | "customer" }) {
  return (
    <figure className={`not-prose my-3 flex ${from === "brand" ? "justify-start" : "justify-end"}`}>
      <div className={`msg ${from === "brand" ? "msg-in" : "msg-out"} max-w-[520px] px-4 py-3 text-[15.5px]`}>{children}</div>
    </figure>
  );
}
