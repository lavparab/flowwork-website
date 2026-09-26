"use client";

import { useState } from "react";
import { HANDLES } from "@/lib/chat";
import ChatMessage, { ChatAvatar } from "./ChatMessage";

/** "What it handles": five jobs on the left, the matching conversation on the right. */
export default function HandlesTabs() {
  const [active, setActive] = useState(0);
  const current = HANDLES[active];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
      <div role="tablist" aria-label="What Flowwork handles" aria-orientation="vertical" className="border-t border-line">
        {HANDLES.map((h, i) => {
          const selected = i === active;
          return (
            <button
              key={h.title}
              role="tab"
              id={`handle-tab-${i}`}
              aria-selected={selected}
              aria-controls="handle-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                e.preventDefault();
                const next = (i + (e.key === "ArrowDown" ? 1 : HANDLES.length - 1)) % HANDLES.length;
                setActive(next);
                document.getElementById(`handle-tab-${next}`)?.focus();
              }}
              className="group grid w-full grid-cols-[48px_1fr] items-baseline border-b border-line py-[22px] text-left"
            >
              <span className={`text-[13px] tabular-nums ${selected ? "text-accent" : "text-dim"}`}>0{i + 1}</span>
              <span
                className={`text-[22px] font-semibold tracking-[-0.03em] transition-colors ${
                  selected ? "text-text" : "text-dim group-hover:text-muted"
                }`}
              >
                {h.title}
              </span>
              <span
                className={`col-start-2 grid max-w-[440px] text-[15.5px] text-muted transition-[grid-template-rows,opacity,margin] duration-400 ${
                  selected ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <span className="overflow-hidden">
                  {h.blurb}
                  <span className="mt-2 block text-[13px] text-dim">
                    Included in <span className="text-accent">{h.pkg}</span>
                    {h.pkg !== "Revenue OS" && " and up"}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="handle-panel"
        role="tabpanel"
        aria-labelledby={`handle-tab-${active}`}
        className="card overflow-hidden lg:sticky lg:top-[110px]"
      >
        <div className="flex items-center gap-2.5 border-b border-line px-[18px] py-3.5">
          <ChatAvatar initial={current.convo.initial} />
          <div>
            <div className="text-[15px] leading-tight font-semibold">{current.convo.brand}</div>
            <div className="text-[12px] text-dim">Example brand</div>
          </div>
          <span className="ml-auto rounded-full border border-accent/25 px-2.5 py-1 text-[12px] text-accent">
            Automated
          </span>
        </div>
        <div key={active} className="chat-anim dot-bg flex min-h-[470px] flex-col justify-end gap-1.5 px-[18px] py-5">
          {current.convo.msgs.map((m, i) => (
            <ChatMessage key={i} msg={m} style={{ animationDelay: `${i * 0.22}s`, fontSize: m.kind === "in" || m.kind === "out" ? 14.5 : undefined }} />
          ))}
        </div>
      </div>
    </div>
  );
}
