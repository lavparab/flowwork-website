"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMsg, ChatStep } from "@/lib/chat";
import ChatMessage, { ChatAvatar, VerifiedTick } from "./ChatMessage";

type Item = { key: number; msg: ChatMsg; pressed?: number };
type Callout = { id: string; title: string; text: string; top: number };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Final state of a script, for reduced motion. */
function settle(script: ChatStep[]): Item[] {
  const out: Item[] = [];
  script.forEach((s, i) => {
    if ("press" in s) {
      const last = out.findLast((it) => it.msg.kind === "replies");
      if (last) last.pressed = s.press;
    } else out.push({ key: i, msg: s.msg });
  });
  return out;
}

/**
 * A phone that plays a WhatsApp conversation on a loop. Starts when it scrolls
 * into view and waits between loops while offscreen.
 */
export default function PhoneDemo({
  brand,
  initial,
  script,
  callouts = [],
  caption,
  label,
  className = "mx-auto",
}: {
  brand: string;
  initial: string;
  script: ChatStep[];
  callouts?: Callout[];
  caption?: string;
  /** Plain-text description of the conversation for screen readers. */
  label: string;
  className?: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [typing, setTyping] = useState(false);
  const [shown, setShown] = useState<string[]>([]);
  const [fading, setFading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setItems(settle(script));
      setShown(callouts.map((c) => c.id));
      return;
    }

    // Polled rather than IntersectionObserver-driven, so a phone that is
    // already on screen at load starts straight away in every browser.
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 80 && r.top < window.innerHeight - 80;
    };

    let alive = true;
    let key = 0;
    (async () => {
      while (alive) {
        while (alive && !inView()) await sleep(300);
        setFading(false);
        setItems([]);
        setShown([]);
        for (const step of script) {
          await sleep(step.wait ?? 300);
          if (!alive) return;
          if ("press" in step) {
            setItems((prev) => {
              const next = [...prev];
              for (let i = next.length - 1; i >= 0; i--) {
                if (next[i].msg.kind === "replies") {
                  next[i] = { ...next[i], pressed: step.press };
                  break;
                }
              }
              return next;
            });
            continue;
          }
          if (step.typing) {
            setTyping(true);
            await sleep(step.typing);
            if (!alive) return;
            setTyping(false);
          }
          const k = key++;
          setItems((prev) => [...prev, { key: k, msg: step.msg }]);
          if (step.callout) setShown((prev) => [...prev, step.callout!]);
        }
        await sleep(6000);
        if (!alive) return;
        setFading(true);
        await sleep(600);
      }
    })();

    return () => {
      alive = false;
    };
    // Runs once: the script is static data.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={rootRef} className={`relative w-fit ${className}`}>
      <p className="sr-only">{label}</p>
      <div className="phone" aria-hidden>
        <div className="phone-screen">
          <div className="flex items-center justify-between px-7 pt-4 pb-1.5 text-[14px] font-semibold">
            <span>9:41</span>
            <span className="absolute top-2.5 left-1/2 h-[30px] w-[104px] -translate-x-1/2 rounded-[20px] bg-black" />
            <span className="flex items-center gap-[5px]">
              <i className="block h-1.5 w-[3px] rounded-[1px] bg-text" />
              <i className="block h-2 w-[3px] rounded-[1px] bg-text" />
              <i className="block h-2.5 w-[3px] rounded-[1px] bg-text" />
              <i className="ml-1 block h-[11px] w-[22px] rounded-[3px] bg-text" />
            </span>
          </div>
          <div className="flex items-center gap-2.5 border-b border-bubble bg-s1 px-3.5 pt-2.5 pb-3">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <ChatAvatar initial={initial} />
            <div>
              <div className="flex items-center gap-1.5 text-[15px] leading-tight font-semibold">
                {brand} <VerifiedTick />
              </div>
              <div className="text-[12px] text-dim">Business account</div>
            </div>
          </div>
          <div
            className={`chat-anim dot-bg flex flex-1 flex-col justify-end gap-1.5 overflow-hidden bg-screen px-3 pt-3 pb-2.5 transition-opacity duration-500 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {items.map((it) => (
              <ChatMessage key={it.key} msg={it.msg} pressed={it.pressed} />
            ))}
            {typing && (
              <div className="typing">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 bg-screen px-2.5 pt-2 pb-[26px]">
            <div className="flex h-[38px] flex-1 items-center rounded-[20px] bg-bubble px-4 text-[14px] text-dim">
              Message
            </div>
            <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-lime">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0A0A0A">
                <rect x="9" y="3" width="6" height="12" rx="3" />
                <path d="M5 11a7 7 0 0014 0h-2a5 5 0 01-10 0zm6 8h2v3h-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {callouts.map((c) => (
        <div
          key={c.id}
          aria-hidden
          className={`callout hidden xl:block ${shown.includes(c.id) ? "show" : ""}`}
          style={{ top: c.top }}
        >
          <b>{c.title}</b>
          {c.text}
        </div>
      ))}

      {caption && <p className="mt-6 text-center text-[13px] text-dim">{caption}</p>}
    </div>
  );
}
