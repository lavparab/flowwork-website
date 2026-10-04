import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import { OG_IMAGE, ORG_ID, WEBSITE_ID } from "@/lib/seo";
import { PHONE_E164, SITE, SOCIAL_LINKS } from "@/lib/site";
import { THEME_COLORS, THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

// "block": text waits for Inter (48 KB, preloaded) and appears once, already in Inter.
// "optional" left most first-time visitors on the fallback font, and "swap" made long
// pages jump when Inter replaced the fallback.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "block",
});

// Only used for a few small labels, so don't preload it on every page.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "WhatsApp Automation for Indian D2C Brands · Flowwork",
    template: "%s · Flowwork",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_IN", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
  colorScheme: "dark light",
};

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/brand/flowwork-logo-512.png`, width: 512, height: 512 },
      description: SITE.description,
      slogan: SITE.tagline,
      telephone: PHONE_E164,
      ...(SITE.email ? { email: SITE.email } : {}),
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: SITE.serviceArea },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: PHONE_E164,
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS.map(([, url]) => url) } : {}),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE.name,
      url: SITE.url,
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before React loads.
    <html lang="en-IN" className={`${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preload" href="/fonts/inter-rupee.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <JsonLd data={siteGraph} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
