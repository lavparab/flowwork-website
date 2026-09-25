import type { ChatMsg } from "@/lib/chat";

export default function ChatMessage({
  msg,
  pressed,
  style,
}: {
  msg: ChatMsg;
  /** Index of the quick reply shown as tapped. */
  pressed?: number;
  style?: React.CSSProperties;
}) {
  switch (msg.kind) {
    case "in":
    case "out":
      return (
        <div className={`msg ${msg.kind === "in" ? "msg-in" : "msg-out"}`} style={style}>
          {msg.text}
          {msg.time && <span className="msg-time">{msg.time}</span>}
        </div>
      );
    case "order":
      return (
        <div className="msg msg-in order-card" style={style}>
          <div className="order-thumb">{msg.item}</div>
          <div className="order-row">
            <b className="font-semibold">Order {msg.id}</b>
            <span>1 item</span>
          </div>
          <div className="order-row">
            <span>{msg.payment}</span>
            <b className="font-semibold">{msg.amount}</b>
          </div>
          <div className="order-row">
            <span>{msg.address}</span>
          </div>
          {msg.time && <span className="msg-time">{msg.time}</span>}
        </div>
      );
    case "sys":
      return (
        <div className={`msg-sys ${msg.tone ?? ""}`} style={style}>
          {msg.text}
        </div>
      );
    case "replies":
      return (
        <div className="quick-replies" style={style}>
          {msg.options.map((o, i) => (
            <div key={o} className={pressed === i ? "pressed" : undefined}>
              {o}
            </div>
          ))}
        </div>
      );
  }
}

export function ChatAvatar({ initial, size = 36 }: { initial: string; size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-[#232323] font-bold text-lime"
      style={{ width: size, height: size, fontSize: size * 0.39 }}
      aria-hidden
    >
      {initial}
    </div>
  );
}

export function VerifiedTick() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="#C1FF72" />
      <path
        d="M4.6 8.2l2.2 2.2 4.6-4.8"
        stroke="#0A0A0A"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
