import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The stylesheet is small, so inline it and skip a render-blocking request.
  experimental: { inlineCss: true },

  async redirects() {
    return [
      // One canonical host: www → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.theflowwork.com" }],
        destination: "https://theflowwork.com/:path*",
        permanent: true,
      },
      // Common guesses and old-style URLs → the real pages (301).
      { source: "/services", destination: "/packages", permanent: true },
      { source: "/services/:slug", destination: "/packages/:slug", permanent: true },
      { source: "/pricing", destination: "/packages", permanent: true },
      { source: "/plans", destination: "/packages", permanent: true },
      { source: "/cod-shield", destination: "/packages/cod-shield", permanent: true },
      { source: "/growth-engine", destination: "/packages/growth-engine", permanent: true },
      { source: "/revenue-os", destination: "/packages/revenue-os", permanent: true },
      { source: "/calculator", destination: "/rto-calculator", permanent: true },
      { source: "/rto", destination: "/rto-calculator", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/audit", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug", destination: "/resources/:slug", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/brand/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
