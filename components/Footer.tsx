import Link from "next/link";
import { PACKAGES } from "@/lib/packages";
import { SITE, whatsappUrl } from "@/lib/site";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-10">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Flowwork home" className="inline-block text-paper">
              <Logo className="h-[26px] w-auto" />
            </Link>
            <p className="mt-5 max-w-[300px] text-[15px] text-muted">{SITE.tagline}</p>
          </div>

          <FooterCol title="Packages">
            {PACKAGES.map((p) => (
              <FooterLink key={p.slug} href={`/packages/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
            <FooterLink href="/packages">Compare packages</FooterLink>
          </FooterCol>

          <FooterCol title="Flowwork">
            <FooterLink href="/how-it-works">How it works</FooterLink>
            <FooterLink href="/rto-calculator">RTO calculator</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Talk to us">
            <li>
              <a href={whatsappUrl()} className="text-muted transition-colors hover:text-text">
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </li>
            {SITE.email && (
              <li>
                <a href={`mailto:${SITE.email}`} className="text-muted transition-colors hover:text-text">
                  {SITE.email}
                </a>
              </li>
            )}
            <li className="text-dim">
              {SITE.city}, {SITE.country}
            </li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-[14px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. AI systems for D2C operations.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-text">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-text">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[13px] font-medium tracking-[0.08em] text-dim uppercase">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-muted transition-colors hover:text-text">
        {children}
      </Link>
    </li>
  );
}
