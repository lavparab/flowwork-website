/**
 * Real client quotes. The testimonials section on the home page stays hidden
 * until there's at least one entry here. Only add quotes you have permission to use.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Founder, Brand Name"
  /** Optional result to highlight, e.g. "RTO down from 28% to 14% in 6 weeks". */
  result?: string;
};

export const TESTIMONIALS: Testimonial[] = [];
