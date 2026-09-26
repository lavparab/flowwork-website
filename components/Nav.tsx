"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import BookButton from "./BookButton";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      {/* The blur lives on its own layer: backdrop-filter on the header itself would
          trap the fixed mobile menu inside the 72px bar. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-canvas/80 backdrop-blur-md" />
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Flowwork home" className="shrink-0 text-text">
          <Logo className="h-[26px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`transition-colors hover:text-text ${isActive(l.href) ? "text-text" : "text-muted"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <BookButton location="nav" className="btn btn-lime btn-sm hidden sm:inline-flex">
            Book a 15-min audit
          </BookButton>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 bg-text transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 bg-text transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex flex-col pt-6 pb-10">
          {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b border-line py-5 text-[28px] font-semibold tracking-[-0.03em] ${
                pathname === l.href ? "text-accent" : "text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <BookButton location="mobile-menu" className="btn btn-lime mt-8 w-full" />
        </nav>
      </div>
    </header>
  );
}
