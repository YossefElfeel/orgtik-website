import { cartTotals, createCartItem } from "./cart-store.js";

// CMS handoff boundary: replace the local preview with the future CMS request.
// Estimates are frontend previews; the CMS must resolve IDs and verify pricing.
export function createCheckoutEnquiry(items, values) {
  const selections = items.map(createCartItem).filter(Boolean);
  return {
    schemaVersion: 1,
    source: "website-checkout",
    status: "local-preview",
    createdAt: new Date().toISOString(),
    customer: {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
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
  return errors;
}
