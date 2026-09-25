"use client";

import { useEffect, useId, useState } from "react";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

const FIELDS = [
  { key: "orders", label: "Orders per month", min: 200, max: 20000, step: 100, fmt: (v: number) => v.toLocaleString("en-IN") },
  { key: "cod", label: "Paid by cash on delivery", min: 10, max: 100, step: 5, fmt: (v: number) => `${v}%` },
  { key: "rto", label: "COD orders that come back", min: 5, max: 50, step: 1, fmt: (v: number) => `${v}%` },
  {
    key: "cost",
    label: "Cost of one returned parcel",
    hint: "Shipping both ways, packaging, damage",
    min: 60,
    max: 400,
    step: 10,
    fmt: (v: number) => inr(v),
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
 * "What your COD returns cost you", styled as a paper receipt.
 * With `shareable`, the inputs are read from and written to the URL
 * (?orders=&cod=&rto=&cost=&stop=) so a filled-in link can be sent to a prospect.
 */
export default function RtoCalculator({ shareable = false }: { shareable?: boolean }) {
  const id = useId();
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
    <div className="receipt-wrap">
      <div className="receipt" role="group" aria-labelledby={`${id}-title`}>
        <div className="flex items-start justify-between border-b border-dashed border-[var(--r-rule)] pb-[18px]">
          <h3 id={`${id}-title`} className="text-[19px] leading-tight font-bold tracking-[-0.03em]">
            What your COD
            <br />
            returns cost you
          </h3>
          <span className="mono-label text-right leading-relaxed">
            Estimate
            <br />
            Monthly
          </span>
        </div>

        {FIELDS.map((f) => {
          const value = v[f.key];
          const pct = ((value - f.min) / (f.max - f.min)) * 100;
          return (
            <div key={f.key} className="border-b border-dashed border-[#e9e9e3] pt-4 pb-2.5">
              <div className="flex items-baseline gap-2 text-[14.5px]">
                <label htmlFor={`${id}-${f.key}`}>{f.label}</label>
                <span className="leader" />
                <output htmlFor={`${id}-${f.key}`} className="font-mono text-[15px] font-medium">
                  {f.fmt(value)}
                </output>
              </div>
              {"hint" in f && <div className="mt-0.5 text-[12px] text-[var(--r-faint)]">{f.hint}</div>}
              <input
                id={`${id}-${f.key}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={value}
                onChange={(e) => update({ ...v, [f.key]: Number(e.target.value) }, prevent)}
                style={{ "--p": `${pct}%` } as React.CSSProperties}
              />
            </div>
          );
        })}

        <div className="pt-4 pb-1">
          <p className="text-[14.5px]" id={`${id}-prevent`}>
            If confirming on WhatsApp stops
          </p>
          <div className="seg mt-2.5" role="group" aria-labelledby={`${id}-prevent`}>
            {PREVENT.map((p, i) => (
              <button key={p.label} type="button" aria-pressed={i === prevent} onClick={() => update(v, i)}>
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[12px] text-[var(--r-faint)]">of those returns (your assumption)</p>
        </div>

        <div className="mt-4 space-y-1 text-[14.5px]" aria-live="polite">
          <div className="flex justify-between gap-3 py-1">
            <span>Parcels coming back</span>
            <b className="font-mono font-medium">{Math.round(parcels).toLocaleString("en-IN")}</b>
          </div>
          <div className="flex justify-between gap-3 py-1">
            <span>Lost to returns</span>
            <b className="font-mono font-medium text-[#8a2b1a]">−{inr(lost)}</b>
          </div>
        </div>

        <div className="mt-3.5 rounded-[10px] bg-lime px-4 pt-4 pb-3.5" aria-live="polite">
          <span className="mono-label !text-[#2e3a1d]">Back in your pocket / month</span>
          <div className="mt-1 font-mono text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">
            {inr(saved)}
          </div>
          <div className="mt-0.5 text-[13px] text-[#2e3a1d]">{inr(saved * 12)} a year</div>
        </div>

        <p className="mt-5 text-center text-[12px] leading-normal text-[var(--r-faint)]">
          <span className="mb-1.5 block font-mono tracking-[0.2em] text-[var(--r-muted)]">* * * * *</span>
          Illustrative. On the audit we run this with your real order data.
        </p>

        {shareable && (
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* clipboard blocked: the URL bar already has the link */
              }
            }}
            className="mx-auto mt-4 block rounded-full border border-[var(--r-ink)] px-4 py-2 font-mono text-[12px] transition-colors hover:bg-[var(--r-ink)] hover:text-lime"
          >
            {copied ? "Link copied" : "Copy link with these numbers"}
          </button>
        )}
      </div>
    </div>
  );
}
