import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { PACKAGES } from "@/lib/packages";
import { SITE } from "@/lib/site";

// Bump when a page's content changes meaningfully.
const SITE_UPDATED = "2026-09-25";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified = SITE_UPDATED) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    priority,
  });
  return [
    page("", 1),
    page("/packages", 0.9),
    ...PACKAGES.map((p) => page(`/packages/${p.slug}`, 0.9)),
    page("/how-it-works", 0.7),
    page("/rto-calculator", 0.8),
    page("/resources", 0.6),
    ...ARTICLES.map((a) => page(`/resources/${a.slug}`, 0.7, a.updated)),
    page("/about", 0.6),
    page("/faq", 0.6),
    page("/contact", 0.7),
    page("/privacy", 0.2),
    page("/terms", 0.2),
  ];
}
