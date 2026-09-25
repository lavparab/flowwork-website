"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "../Logo";

/** Questions as the founder's outgoing messages, answers as Flowwork's replies. */
export default function FaqThread({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Content renders visible on the server; the reveal only arms itself in the
  // browser, and only for threads that start below the fold.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (n: number) =>
    armed
      ? { className: `reveal ${shown ? "on" : ""}`, style: { transitionDelay: `${n * 130}ms` } }
      : { className: "", style: undefined };

  return (
    <div ref={ref} className={`card flex flex-col gap-2 p-4 sm:p-7 ${className}`}>
      {items.map((it, i) => {
        const q = reveal(i * 2);
        const a = reveal(i * 2 + 1);
        return (
          <div key={it.q} className={`flex flex-col gap-2 ${i ? "mt-3" : ""}`}>
            <h3
              className={`msg msg-out max-w-[88%] px-[15px] pt-[11px] pb-[10px] text-[16px] font-normal sm:max-w-[78%] ${q.className}`}
              style={q.style}
            >
              {it.q}
            </h3>
            <div
              className={`msg msg-in flex max-w-[92%] gap-3 px-[15px] pt-[11px] pb-[10px] text-[16px] sm:max-w-[80%] ${a.className}`}
              style={a.style}
            >
              <Mark className="mt-[3px] h-[18px] w-[18px] shrink-0 text-lime" />
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
