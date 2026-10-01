import {
  createGroup,
  groupName,
  quoteGroup,
  quoteCart,
  CRM_PORTAL_URL,
} from "./purchase-catalog.js";
export const ORDER_SESSION_KEY = "orgtik.purchase-preview.v1";
const payments = new Map();
const setups = new Map();
const clone = (value) => JSON.parse(JSON.stringify(value));
function freeze(value) {
  Object.freeze(value);
  Object.values(value).forEach((v) => {
    if (v && typeof v === "object" && !Object.isFrozen(v)) freeze(v);
  });
  return value;
}
export function validateCustomer(customer) {
  const errors = {};
  if (!customer?.name?.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer?.email?.trim() || ""))
    errors.email = "Enter a valid email address.";
  return errors;
}
export function createPurchaseSnapshot(groups, reference) {
  const quote = quoteCart(groups);
  if (!quote.valid)
    throw new Error("Review the cart and choose all durations before paying.");
  return freeze({
    version: 1,
    reference,
    paymentStatus: "succeeded",
    createdAt: new Date().toISOString(),
    currency: "CHF",
    groups: groups.map((g) => ({
      id: g.id,
      name: groupName(g),
      kind: g.kind,
      lines: quoteGroup(g).lines.map((l) => ({
        ...l,
        activation:
          g.kind === "software" ? "active-preview" : "awaiting-onboarding",
      })),
    })),
    quote: clone(quote),
  });
}
const delay = (signal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("cancelled"));
      return;
    }
    const abort = () => {
      clearTimeout(timer);
      reject(new Error("cancelled"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, 450);
    signal?.addEventListener("abort", abort, { once: true });
  });
// Frontend-only adapter. A production implementation must verify payment and pricing server-side.
export async function simulatePayment({
  groups,
  customer,
  reference,
  outcome = "success",
  signal,
}) {
  if (payments.has(reference)) return payments.get(reference);
  if (Object.keys(validateCustomer(customer)).length)
    throw new Error("Complete your billing details.");
  const stableGroups = groups.map(createGroup);
  if (!quoteCart(stableGroups).valid)
    throw new Error("Your cart needs review.");
  const request = (async () => {
    await delay(signal);
    if (outcome === "declined")
      throw new Error(
        "The demo payment was declined. Your cart is saved; try again.",
      );
    if (outcome === "cancelled") throw new Error("cancelled");
    return createPurchaseSnapshot(stableGroups, reference);
  })();
  payments.set(reference, request);
  try {
    return await request;
  } catch (error) {
    payments.delete(reference);
    throw error;
  }
}
export function createCRMHandoffRequest(
  order,
  customer = null,
  verified = false,
) {
  if (order?.paymentStatus !== "succeeded")
    throw new Error("Account setup requires a successful payment.");
  // Production adapter input: backend purchase reference, immutable quoted lines,
  // terms, renewals, activation, and customer context held only in memory.
  // A refresh retry uses the reference; the backend retrieves customer context.
  return {
    purchaseReference: order.reference,
    customerContext: customer
      ? {
          name: customer.name,
          email: customer.email,
          company: customer.company,
          verified,
        }
      : null,
    purchases: order.groups,
    amounts: order.quote,
    currency: order.currency,
  };
}
export async function provisionCRM(
  order,
  { scenario = "ready", verified = false, customer = null } = {},
) {
  const request = createCRMHandoffRequest(order, customer, verified);
  const prior = setups.get(order.reference);
  if (prior?.status === "ready")
    return {
      ...prior,
      access: verified ? "verified-existing" : "verification-required",
    };
  await delay();
  const result = {
    purchaseReference: request.purchaseReference,
    destination: /^https:\/\//.test(CRM_PORTAL_URL) ? CRM_PORTAL_URL : null,
    status:
      scenario === "failed"
        ? "failed"
        : scenario === "pending"
          ? "pending"
          : "ready",
    access: verified ? "verified-existing" : "verification-required",
  };
  // Reference-keyed setup is idempotent. Pending/failed setups may be retried without payment.
  setups.set(order.reference, result);
  return result;
}
export function savePurchaseSession(order, crm) {
  try {
    window.sessionStorage.setItem(
      ORDER_SESSION_KEY,
      JSON.stringify({
        order,
        crm: { status: crm.status, access: "verification-required" },
      }),
    );
    return true;
  } catch {
    return false;
  }
}
export function loadPurchaseSession() {
  try {
    const value = JSON.parse(
      window.sessionStorage.getItem(ORDER_SESSION_KEY) || "null",
    );
    if (
      value?.order?.version !== 1 ||
      value.order.paymentStatus !== "succeeded" ||
      !Array.isArray(value.order.groups) ||
      !Number.isFinite(value.order.quote?.total)
    )
      return null;
    return {
      order: freeze(value.order),
      crm: {
        status: ["ready", "pending", "failed"].includes(value.crm?.status)
          ? value.crm.status
          : "pending",
        access: "verification-required",
      },
    };
  } catch {
    return null;
  }
}
export function clearPurchaseSession() {
  try {
    window.sessionStorage.removeItem(ORDER_SESSION_KEY);
  } catch {}
}
