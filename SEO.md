# SEO checklist status

Status of every item on the Flowwork website SEO checklist, as of 25 September 2026.

- ✅ done in the code
- 👤 needs you (an account, a decision or information only you have)
- ➖ doesn't apply right now, with the reason

Lab results on the production build (Lighthouse, mobile): **SEO 100, Accessibility 100, Best Practices 100**
on every page except /contact (79: Cal.com's third-party cookies). Performance 89–99, CLS 0 everywhere.

---

## Basic website setup

| Item | Status | Notes |
| --- | --- | --- |
| HTTPS / SSL | ✅ | Vercel issues and renews certificates and redirects http → https. HSTS header set in `next.config.ts`. |
| Mobile responsive | ✅ | Checked every page at 375px: no horizontal scroll. Mobile menu tested. |
| Fast loading | ✅ | All pages are static. CSS is inlined, Inter is self-hosted and preloaded, and Cal.com only loads on booking intent or when the browser is idle. |
| Clean URL structure | ✅ | `/packages/cod-shield`, `/resources/reduce-rto-cod-orders`, and so on. No query strings or IDs. |
| Custom 404 page | ✅ | `app/not-found.tsx`. Returns a real 404 status and `noindex`. |
| Favicon | ✅ | `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, plus manifest icons. |
| Proper navigation | ✅ | Packages, How it works, RTO calculator, Resources, About, plus FAQ and Contact in the mobile menu. |
| Footer with important links | ✅ | All packages, About, Resources, FAQ, Contact, Privacy, Terms, WhatsApp and location. |
| sitemap.xml | ✅ | `app/sitemap.ts`: all 15 pages, with last-modified dates. |
| robots.txt | ✅ | `app/robots.ts`: allows everything and points to the sitemap. |
| Canonical URLs | ✅ | Every page sets its own canonical via `pageMeta()` in `lib/seo.ts`. |

## Every page

Checked automatically by crawling the production build. All 15 pages pass.

| Item | Status | Notes |
| --- | --- | --- |
| Unique SEO title | ✅ | All unique, 23–59 characters. |
| Unique meta description | ✅ | All unique, 135–160 characters. |
| One H1 | ✅ | Exactly one per page. The small label above each headline is part of the H1, so the keyword sits in the heading without changing the design. |
| Proper H2/H3 structure | ✅ | No skipped levels on any page. |
| Target keyword | ✅ | See the keyword map below. |
| SEO-friendly URL | ✅ | |
| Relevant content | ✅ | |
| Internal links | ✅ | Packages ↔ guides ↔ calculator ↔ FAQ. No orphan pages. No broken links. |
| Optimized images | ✅ | The site has almost no raster images. The share image and icons are compressed PNGs. Logos are SVG. |
| Image alt text | ✅ | Logos have labels, decorative graphics are hidden from screen readers, and the share image has alt text. |
| Open Graph metadata | ✅ | Title, description, URL, image, site name and locale on every page. |
| Twitter/X metadata | ✅ | `summary_large_image` card with title, description and image. |
| Canonical tag | ✅ | |

## Important pages

| Page | Status | URL |
| --- | --- | --- |
| Home | ✅ | `/` |
| About | ✅ | `/about` |
| Services | ✅ | `/packages` |
| Individual service pages | ✅ | `/packages/cod-shield`, `/packages/growth-engine`, `/packages/revenue-os` |
| Contact | ✅ | `/contact`: calendar, WhatsApp form and WhatsApp link |
| Privacy Policy | ✅ | `/privacy`. Have it reviewed before launch. It mentions Google Analytics automatically once GA is switched on. |
| Terms & Conditions | ✅ | `/terms`. Have it reviewed before launch. |
| Refund/Cancellation Policy | 👤 | Only needed if you take payments on the site (for example Razorpay, which requires one). Tell me your policy and I'll add the page. |
| Blog/Resources | ✅ | `/resources` with two guides. More ideas in the content plan below. |

## Technical SEO

| Item | Status | Notes |
| --- | --- | --- |
| Google Search Console | 👤 | Add a **Domain property** for `theflowwork.com` and verify through DNS. Or set `NEXT_PUBLIC_GSC_VERIFICATION` to use the meta tag the site already supports. |
| Google Analytics 4 | 👤 → ✅ | Code is ready. Create a GA4 property and set `NEXT_PUBLIC_GA_ID` in Vercel. |
| XML sitemap submitted | 👤 | In Search Console → Sitemaps, submit `https://theflowwork.com/sitemap.xml`. |
| Indexing checked | 👤 | After launch, run URL Inspection on the home page and the three package pages, and request indexing. |
| No accidental noindex | ✅ | Only the 404 page is `noindex`. Vercel preview deployments are kept out of Google automatically. |
| No broken links | ✅ | Crawled: 0 broken. |
| 301 redirects configured | ✅ | `/services`, `/pricing`, `/about-us`, `/blog/*`, `/calculator`, `/privacy-policy` and others go to the real pages. Next.js uses 308, which Google treats the same as 301. The old single-page site only had `/`, so no old URLs need redirecting. |
| Correct HTTP status codes | ✅ | 200 for pages, 404 for unknown URLs (including unknown packages), 308 for redirects. |
| No duplicate content | ✅ | Canonicals on every page, trailing-slash URLs redirect, and no duplicate titles or descriptions. |
| HTTPS redirect | ✅ | Handled by Vercel. |
| WWW / non-WWW consistency | ✅ + 👤 | Code redirects `www.theflowwork.com` to `theflowwork.com`. In Vercel → Domains, add both and set the apex as primary. |
| Core Web Vitals optimized | ✅ | Lab: CLS 0, TBT 30–60 ms, LCP 2.2–3.3 s on simulated slow 4G. Check real-user data in Search Console after launch. |
| Structured data/schema | ✅ | See below. |

## Schema

| Type | Status | Where |
| --- | --- | --- |
| Organization | ✅ | Every page (layout), with logo, phone, address locality, service area and contact point. `sameAs` fills in when you add social links. |
| LocalBusiness | ✅ | Home, as `ProfessionalService` (a LocalBusiness type) with the offer catalogue. Add a street address and hours in `lib/site.ts` if you want to show them. |
| WebSite | ✅ | Every page. |
| BreadcrumbList | ✅ | Every inner page. |
| Service | ✅ | Each package page, including everything that package includes. |
| Product | ➖ | You sell services, not products. |
| Article | ✅ | Both guides (`BlogPosting`). |
| FAQ | ✅ | `/faq` (`FAQPage`). Google only shows FAQ rich results for a few government and health sites, but the markup still helps other search and AI tools. |

## Local business

| Item | Status | Notes |
| --- | --- | --- |
| Business name | ✅ | |
| Address | ✅ / 👤 | City, state and country are shown. Add a street address only if you want it public. |
| Phone number | ✅ | WhatsApp number, shown site-wide and in the schema. |
| Business hours | 👤 | Set `hours` in `lib/site.ts` (e.g. "Mon–Sat, 10am–7pm IST") and it appears in the footer, About and Contact pages. |
| Google Maps | ➖ | Only useful with a public street address that clients visit. |
| Google Business Profile | 👤 | Create one as a **service-area business** (hide the address, service area India). Use exactly the same name and phone number as the site. |
| Service areas | ✅ | "Serving D2C brands across India" on About, Contact, the footer and in the schema. |
| Location-specific pages | ➖ | You work remotely with brands anywhere in India, so city pages would be thin, near-duplicate content. |
| Consistent NAP | ✅ | Name, city and phone come from one place (`lib/site.ts`). Use the same details on Google Business Profile and social profiles. |

## Conversion / business

| Item | Status | Notes |
| --- | --- | --- |
| Clear CTA | ✅ | "Book a 15-min audit" in the nav, hero, every page and every section end. |
| Contact form | ✅ | On `/contact`: name, brand, order volume and needs, sent to your WhatsApp. No backend, and nothing stored. |
| Phone button | ➖ / 👤 | Not added, because it's unclear whether the number takes calls. Say so and I'll add a call button. |
| WhatsApp button | ✅ | A floating button on every page (after scrolling), plus links in the footer, CTAs, FAQ, About and Contact. |
| Lead tracking | ✅ | GA4 events: `book_audit_click` (with location), `whatsapp_click` (with location), `generate_lead` (completed Cal.com booking). |
| Form submission tracking | ✅ | `contact_form_submit`. In GA4, mark `generate_lead` and `contact_form_submit` as **key events**. |
| Social links | 👤 | Add URLs in `lib/site.ts` → `social`. They appear in the footer and the Organization schema. |
| Testimonials/reviews | 👤 | A section is built and stays hidden until you add real quotes to `lib/proof.ts`. |
| Portfolio/case studies | 👤 | None yet. Once you have client results you can share, send them over and I'll add a case study page. |
| Clear service/pricing info | ✅ | Services are fully described. Prices are deliberately not shown; the FAQ says quotes follow the audit. |

## Performance

| Item | Status | Notes |
| --- | --- | --- |
| Image compression | ✅ | |
| WebP/AVIF | ➖ | No photos on the site. If you add any, use `next/image` and it converts automatically. |
| Lazy loading | ✅ | The Cal.com embed only loads on hover, focus or tap of a booking button, on /contact, or once the browser is idle. Chat demos start only when on screen. |
| Minified assets | ✅ | Next.js production build. |
| Font optimization | ✅ | Self-hosted Inter (48 KB, Latin subset, preloaded, `display: block`), plus a 1 KB file with just the ₹ glyph. The mono font isn't preloaded. See note 1. |
| Caching | ✅ | Static pages are cached at Vercel's edge. Hashed assets are immutable, and `/brand` files are cached for a day. |
| CDN | ✅ | Vercel's edge network. |
| Minimize third-party scripts | ✅ | Only Cal.com (on intent) and GA4 (if enabled). |
| LCP optimized | ✅ | The LCP element is headline text. LCP is 2.1–2.6 s in Lighthouse's mobile test. |
| INP optimized | ✅ | Very little JavaScript per page. TBT is 30–60 ms. |
| CLS minimized | ✅ | 0 on every page except About (0.025, well under Google's 0.1 limit). |

**1. Fonts.** Inter uses `display: "block"`: text waits for Inter and appears once, already in Inter, so
every visitor sees the real typeface and nothing jumps. `"optional"` left most first-time visitors on the
fallback font, and `"swap"` made long pages shift. Inter's own ₹ sits in an 85 KB extended-Latin file, so the
site loads a 1 KB file with only that glyph instead (`public/fonts/inter-rupee.woff2`). The stylesheet is a
normal cached file rather than inlined, so the font preloads sit at the top of the page.

## Content

| Item | Status | Notes |
| --- | --- | --- |
| Keyword research | ✅ / 👤 | The keyword map below is based on search intent, not measured search volumes. After a month, check Search Console → Performance for the queries that actually bring impressions, then adjust titles. |
| Search intent matched | ✅ | Package pages cover commercial intent, the guides and calculator cover informational intent, and Contact covers transactional intent. |
| Original content | ✅ | |
| Service descriptions | ✅ | |
| FAQs where useful | ✅ | `/faq`, plus FAQs on each package page and the home page. |
| Blog/content strategy | ✅ | Two guides live. Plan below. |
| Internal linking structure | ✅ | |
| No keyword stuffing | ✅ | |
| No duplicate/thin pages | ✅ | |

---

## Keyword map

| Page | Target phrase | Title |
| --- | --- | --- |
| `/` | WhatsApp automation for D2C brands | WhatsApp Automation for Indian D2C Brands · Flowwork |
| `/packages` | WhatsApp automation packages | WhatsApp Automation Packages for D2C Brands |
| `/packages/cod-shield` | WhatsApp COD order confirmation, reduce RTO | COD Shield: WhatsApp COD Confirmation to Cut RTO |
| `/packages/growth-engine` | WhatsApp assistant / chatbot for D2C stores | Growth Engine: WhatsApp Assistant for D2C Stores |
| `/packages/revenue-os` | WhatsApp ordering, reorder reminders | Revenue OS: Sell and Reorder on WhatsApp |
| `/rto-calculator` | RTO calculator, COD return cost | RTO Calculator: What COD Returns Cost You |
| `/resources/reduce-rto-cod-orders` | how to reduce RTO on COD orders | How to Reduce RTO on COD Orders |
| `/resources/whatsapp-cod-confirmation` | WhatsApp COD confirmation | WhatsApp COD Order Confirmation Guide |
| `/how-it-works` | how WhatsApp automation works | How WhatsApp Automation Works for D2C Brands |
| `/faq` | WhatsApp automation FAQ | WhatsApp Automation FAQ for D2C Brands |
| `/about` | WhatsApp automation agency Pune / India | About Flowwork, a WhatsApp Automation Agency |
| `/contact` | WhatsApp automation audit | Book a Free WhatsApp Automation Audit |

## Content plan (next guides)

One every two to four weeks is plenty. Each should link to the matching package and the calculator.

1. Abandoned cart recovery on WhatsApp for Shopify stores → Growth Engine
2. Order and shipping updates on WhatsApp: what to send after dispatch → Growth Engine
3. How to qualify corporate and bulk gifting enquiries → Growth Engine
4. A Diwali WhatsApp campaign checklist for D2C brands (publish by early September) → Growth Engine
5. Reorder reminders: timing them by product type → Revenue OS
6. WhatsApp Business app vs the WhatsApp Business Platform: which does a D2C brand need? → all packages

## Launch checklist (in order)

1. Deploy to Vercel and connect `theflowwork.com` (apex as primary, `www` added too).
2. Create a GA4 property and add `NEXT_PUBLIC_GA_ID` in Vercel. Redeploy. Mark `generate_lead` and
   `contact_form_submit` as key events.
3. Search Console: add a Domain property, verify through DNS, and submit the sitemap.
4. URL Inspection → Request indexing for `/`, `/packages` and the three package pages.
5. Create the Google Business Profile (service-area business, same name and phone).
6. Add social profile URLs, business hours and any testimonials in `lib/site.ts` and `lib/proof.ts`.
7. Update the Cal.com event description (it still describes the old RTO-only audit).
8. After four weeks: check Search Console queries and Core Web Vitals, then adjust.
