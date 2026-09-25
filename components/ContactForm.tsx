"use client";

import { useId, useState } from "react";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppLink";

const NEEDS = ["COD returns", "Customer chats", "Abandoned carts", "Gifting / bulk orders", "Reorders"];
const VOLUMES = ["Under 300", "300–1,000", "1,000–5,000", "5,000+"];

/**
 * A short enquiry form that opens WhatsApp with the details written out.
 * Nothing is stored or sent from this website.
 */
export default function ContactForm() {
  const id = useId();
  const [needs, setNeeds] = useState<string[]>([]);

  return (
    <form
      className="card p-6 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const lines = [
          "Hi Flowwork, I'd like to talk about WhatsApp automation.",
          "",
          `Name: ${f.get("name")}`,
          `Brand / website: ${f.get("brand")}`,
          f.get("orders") ? `Orders per month: ${f.get("orders")}` : "",
          needs.length ? `Looking for help with: ${needs.join(", ")}` : "",
          f.get("message") ? `\n${f.get("message")}` : "",
        ].filter((l, i) => l !== "" || i === 1);
        track("contact_form_submit", { needs: needs.join("|") || "none" });
        window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
      }}
    >
      <h2 className="text-[22px] font-bold tracking-[-0.03em]">Rather write? Send us the details.</h2>
      <p className="mt-2 text-[15px] text-muted">
        This opens WhatsApp with your message ready to send. Nothing is stored on this website.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${id}-name`}>
          <input id={`${id}-name`} name="name" required autoComplete="name" className="field" />
        </Field>
        <Field label="Brand or website" htmlFor={`${id}-brand`}>
          <input id={`${id}-brand`} name="brand" required autoComplete="organization" className="field" placeholder="yourbrand.in" />
        </Field>
      </div>

      <Field label="Orders per month" htmlFor={`${id}-orders`} className="mt-4">
        <select id={`${id}-orders`} name="orders" className="field" defaultValue="">
          <option value="">Choose one (optional)</option>
          {VOLUMES.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </Field>

      <fieldset className="mt-5">
        <legend className="text-[14px] text-muted">What do you want help with?</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {NEEDS.map((n) => {
            const on = needs.includes(n);
            return (
              <label
                key={n}
                className={`cursor-pointer rounded-full border px-3.5 py-2 text-[14px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime ${
                  on ? "border-lime bg-lime text-ink" : "border-line text-muted hover:border-[#444]"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => setNeeds((cur) => (on ? cur.filter((x) => x !== n) : [...cur, n]))}
                />
                {n}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field label="Anything else? (optional)" htmlFor={`${id}-message`} className="mt-5">
        <textarea id={`${id}-message`} name="message" rows={3} className="field resize-y" />
      </Field>

      <button type="submit" className="btn btn-lime mt-6 w-full sm:w-auto">
        <WhatsAppIcon /> Send on WhatsApp
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-[14px] text-muted">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
