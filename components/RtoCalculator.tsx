"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { Mark } from "./Logo";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const count = (n: number) => Math.round(n).toLocaleString("en-IN");

const FIELDS = [
  {
    key: "orders",
    ask: "How many orders do you ship a month?",
    unit: "orders",
    min: 200,
    max: 20000,
    step: 100,
    fmt: count,
  },
  {
    key: "cod",
    ask: "How many are paid by cash on delivery?",
    unit: "paid by COD",
    min: 10,
    max: 100,
    step: 5,
    fmt: (v: number) => `${v}%`,
  },
  {
    key: "rto",
    ask: "And how many COD orders come back?",
    unit: "come back",
    min: 5,
    max: 50,
    step: 1,
    fmt: (v: number) => `${v}%`,
  },
  {
    key: "cost",
    ask: "What does one returned parcel cost you?",
    hint: "Shipping both ways, packaging, damage",
    unit: "a parcel",
    min: 60,
    max: 400,
    step: 10,
    fmt: inr,
  },
] as const;

type Key = (typeof FIELDS)[number]["key"];
type Values = Record<Key, number>;

const DEFAULTS: Values = { orders: 1500, cod: 70, rto: 30, cost: 150 };
const PREVENT = [
  { label: "1 in 4", value: 1 / 4 },
  { label: "1 in 3", value: 1 / 3 },
  { label: "1 in 2", value: 1 / 2 },
];

/**
 * "What your COD returns cost you", played as a WhatsApp thread: Flowwork asks,
 * the visitor answers by dragging the slider inside each reply bubble.
 * With `shareable`, the inputs are read from and written to the URL
 * (?orders=&cod=&rto=&cost=&stop=) so a filled-in link can be sent to a prospect.
 */
export default function RtoCalculator({
  shareable = false,
  headingLevel = "h3",
}: {
  shareable?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const id = useId();
  const used = useRef(false);
  const [v, setV] = useState<Values>(DEFAULTS);
  const [prevent, setPrevent] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!shareable) return;
    const q = new URLSearchParams(window.location.search);
    const next = { ...DEFAULTS };
    for (const f of FIELDS) {
      const n = Number(q.get(f.key));
      if (q.has(f.key) && Number.isFinite(n)) next[f.key] = Math.min(f.max, Math.max(f.min, n));
    }
    setV(next);
    const stop = Number(q.get("stop"));
    if (q.has("stop") && Number.isInteger(stop) && stop >= 0 && stop < PREVENT.length) setPrevent(stop);
  }, [shareable]);

  // Only touch the URL once someone moves a slider, so a plain visit keeps a clean URL.
  function update(nextV: Values, nextPrevent: number) {
    setV(nextV);
    setPrevent(nextPrevent);
    if (!used.current) {
      used.current = true;
      track("calculator_used", { page: shareable ? "calculator" : "home" });
    }
    if (!shareable) return;
    const q = new URLSearchParams({
      ...Object.fromEntries(Object.entries(nextV).map(([k, n]) => [k, String(n)])),
      stop: String(nextPrevent),
    });
    window.history.replaceState(null, "", `${window.location.pathname}?${q}`);
  }

  const parcels = v.orders * (v.cod / 100) * (v.rto / 100);
  const lost = parcels * v.cost;
  const saved = lost * PREVENT[prevent].value;

  return (
    <div className="card overflow-hidden" role="group" aria-labelledby={`${id}-title`}>
      <div className="flex items-center gap-2.5 border-b border-line px-[18px] py-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#232323]" aria-hidden>
          <Mark className="h-[18px] w-[18px] text-lime" />
        </span>
        <div>
          <Heading id={`${id}-title`} className="text-[15px] leading-tight font-semibold">
            What your COD returns cost you
          </Heading>
          <p className="text-[12px] text-dim">RTO calculator · monthly</p>
        </div>
        <span className="ml-auto hidden rounded-full border border-[#2f3a22] px-2.5 py-1 text-[12px] text-lime xs:block">
          Estimate
        </span>
      </div>

      <div className="dot-bg flex flex-col gap-1.5 px-3 py-5 sm:px-[18px]">
        {FIELDS.map((f, i) => {
          const value = v[f.key];
          const pct = ((value - f.min) / (f.max - f.min)) * 100;
          return (
            <Fragment key={f.key}>
              <label htmlFor={`${id}-${f.key}`} className={`msg msg-in calc-msg ${i ? "mt-3" : ""}`}>
                {f.ask}
                {"hint" in f && <span className="block text-[12.5px] text-muted">{f.hint}</span>}
              </label>
              <div className="msg msg-out calc-msg calc-answer">
                <output htmlFor={`${id}-${f.key}`} className="flex items-baseline gap-1.5">
                  <b className="text-[20px] leading-none font-semibold tracking-[-0.03em] tabular-nums">{f.fmt(value)}</b>
                  <span className="text-[13.5px]">{f.unit}</span>
                </output>
                <input
                  id={`${id}-${f.key}`}
                  type="range"
                  className="range-ink"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={value}
                  aria-valuetext={`${f.fmt(value)} ${f.unit}`}
                  onChange={(e) => update({ ...v, [f.key]: Number(e.target.value) }, prevent)}
                  style={{ "--p": `${pct}%` } as React.CSSProperties}
                />
              </div>
            </Fragment>
          );
        })}

        <p id={`${id}-prevent`} className="msg msg-in calc-msg mt-3">
          How many of those returns would confirming on WhatsApp stop?
          <span className="block text-[12.5px] text-muted">Your own assumption</span>
        </p>
        <div className="quick-replies calc-replies" role="group" aria-labelledby={`${id}-prevent`}>
          {PREVENT.map((p, i) => (
            <button key={p.label} type="button" aria-pressed={i === prevent} onClick={() => update(v, i)}>
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-1.5" aria-live="polite">
          <p className="msg msg-in calc-msg flex gap-2.5">
            <Mark className="mt-[3px] h-4 w-4 shrink-0 text-lime" />
            <span>
              That’s <b className="font-semibold text-text">{count(parcels)} parcels</b> coming back every month, and{" "}
              <b className="font-semibold text-text">{inr(lost)}</b> lost to returns.
            </span>
          </p>
          <div className="msg msg-in calc-msg flex gap-2.5">
            <Mark className="mt-[3px] h-4 w-4 shrink-0 text-lime" />
            <div>
              <p className="text-[13.5px] text-muted">Back in your pocket every month</p>
              <p className="mt-1 text-[clamp(34px,9vw,42px)] leading-none font-bold tracking-[-0.045em] text-lime tabular-nums">
                {inr(saved)}
              </p>
              <p className="mt-1.5 text-[13.5px] text-muted">{inr(saved * 12)} a year</p>
            </div>
          </div>
        </div>

        <p className="msg-sys note mt-4">Illustrative. On the audit we run this with your real order data.</p>
      </div>

      {shareable && (
        <div className="flex items-center justify-between gap-4 border-t border-line px-[18px] py-3.5">
          <span className="text-[13.5px] text-dim">Your numbers are saved in the link.</span>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                track("calculator_link_copied");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* clipboard blocked: the URL bar already has the link */
              }
            }}
            className="btn btn-ghost btn-sm shrink-0"
          >
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
