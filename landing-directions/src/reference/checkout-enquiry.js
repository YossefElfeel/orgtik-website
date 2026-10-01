import { cartTotals, createCartItem } from "./cart-store.js";

// Optional one-tap answers that help the team quote without back-and-forth.
export const START_OPTIONS = [
  { id: "asap", label: "As soon as possible" },
  { id: "soon", label: "In 1–3 months" },
  { id: "exploring", label: "Just exploring" },
];

export const CONTACT_OPTIONS = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "video", label: "Video call" },
];

const pick = (options, value) =>
  options.some((option) => option.id === value) ? value : null;

// CMS handoff boundary: replace the local preview with the future CMS request.
// Estimates are frontend previews; the CMS must resolve IDs and verify pricing.
export function createCheckoutEnquiry(items, values) {
  const selections = items.map(createCartItem).filter(Boolean);
  return {
    schemaVersion: 2,
    source: "website-checkout",
    status: "local-preview",
    createdAt: new Date().toISOString(),
    customer: {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
    },
    preferences: {
      start: pick(START_OPTIONS, values.start),
      contact: pick(CONTACT_OPTIONS, values.contact),
    },
    message: values.message.trim(),
    items: selections,
    estimate: { currency: "CHF", ...cartTotals(selections) },
  };
}

export function validateCheckout(values) {
  const errors = {};
  if (!values.name.trim())
    errors.name = "Add your full name so we know who to contact.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address so we can reach you.";
  if (values.contact === "phone" && !values.phone?.trim())
    errors.phone =
      "Add a phone number so we can call you, or choose another way to reach you.";
  return errors;
}
