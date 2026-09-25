export const PROCESS = [
  {
    title: "15-minute audit",
    detail: "We look at your orders, COD share, returns and WhatsApp chats, and tell you which package fits, if any.",
  },
  {
    title: "Map and build",
    detail: "We map your store, catalogue, FAQs and policies, then write every flow in your brand voice.",
  },
  {
    title: "You approve",
    detail: "You read every message before a customer does. Nothing goes live without your sign-off.",
  },
  {
    title: "Live on your number",
    detail: "Running on your own WhatsApp Business number in 7 days to 4 weeks, depending on the package.",
  },
];

export default function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS.map((s, i) => (
        <li key={s.title} className="flex flex-col bg-ink p-7">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-[13px] text-lime tabular-nums">
            0{i + 1}
          </span>
          <h3 className="mt-10 text-[21px] font-semibold tracking-[-0.03em]">{s.title}</h3>
          <p className="mt-2 text-[15px] text-muted">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}
