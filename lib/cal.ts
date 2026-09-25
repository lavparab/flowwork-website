// Cal.com booking config: the one place the booking link is defined.
export const CAL_LINK = "lavparab/ai-automation-audit-with-lavparab";
export const CAL_NAMESPACE = "ai-automation-audit-with-lavparab";

// Plain-URL fallback so the CTA still works if the embed script is blocked or slow.
export const CAL_URL = `https://cal.com/${CAL_LINK}`;

export const CAL_MODAL_CONFIG = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
  theme: "dark",
} as const;

type CalApi = (...args: unknown[]) => void;

declare global {
  interface Window {
    Cal?: CalApi & { ns?: Record<string, CalApi>; loaded?: boolean; config?: Record<string, unknown> };
  }
}
