import type { MetadataRoute } from "next";
import { PACKAGES } from "@/lib/packages";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/packages", "/how-it-works", "/rto-calculator", "/faq", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...PACKAGES.map((p) => ({ url: `${SITE.url}/packages/${p.slug}`, priority: 0.8 })),
  ];
}
