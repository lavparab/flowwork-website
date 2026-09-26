import { Fragment } from "react";

const NBSP = String.fromCharCode(160); // non-breaking space

/**
 * Gives the en dash in a range ("3–4 weeks") room to breathe, since big headings'
 * tight negative tracking otherwise pushes it into the digits, and keeps the
 * number and its unit on one line.
 */
export default function Range({ children }: { children: string }) {
  return children.split("–").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="range-dash">–</span>}
      {part.replace(/ /g, NBSP)}
    </Fragment>
  ));
}
