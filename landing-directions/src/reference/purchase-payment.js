// Available choices in the local simulation; production methods come from the payment backend.
export const PAYMENT_METHODS = Object.freeze([
  Object.freeze({
    id: "card",
    name: "Card",
    description: "Visa or Mastercard",
    icon: "credit-card",
    guidance: "Complete your card details below, then pay the amount shown.",
  }),
  Object.freeze({
    id: "twint",
    name: "TWINT",
    description: "Mobile payment",
    icon: "device-mobile",
    guidance: "Approve the TWINT payment below, then pay the amount shown.",
  }),
  Object.freeze({
    id: "paypal",
    name: "PayPal",
    description: "PayPal account",
    icon: "wallet",
    guidance: "Approve the PayPal payment below, then pay the amount shown.",
  }),
]);

export function getPaymentMethod(id = "card") {
  const method = PAYMENT_METHODS.find((option) => option.id === id);
  if (!method) throw new Error("Choose an available payment method.");
  return method;
}

// Synthetic inputs only. No real credentials or provider connections belong here.
export const TEST_CARD_NUMBERS = Object.freeze([
  "4242424242424242",
  "5555555555554444",
]);
export const TEST_CARD_EXPIRY = "12/30";
export const TEST_CARD_SECURITY_CODE = "123";

export function normalizeTestPaymentInput(field, value) {
  const text = String(value || "");
  if (field === "cardNumber") {
    if (!/^[\d\s]*$/.test(text)) return null;
    const digits = text.replace(/\s/g, "");
    if (!TEST_CARD_NUMBERS.some((number) => number.startsWith(digits)))
      return null;
    return digits.replace(/(.{4})(?=.)/g, "$1 ");
  }
  if (field === "expiry") {
    if (!/^[\d/\s]*$/.test(text)) return null;
    const digits = text.replace(/[\s/]/g, "");
    if (!TEST_CARD_EXPIRY.replace("/", "").startsWith(digits)) return null;
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  }
  if (field === "securityCode")
    return TEST_CARD_SECURITY_CODE.startsWith(text) ? text : null;
  return null;
}

export function validateTestPaymentDetails(methodId, details = {}) {
  const method = getPaymentMethod(methodId);
  const errors = {};
  if (method.id === "card") {
    if (!TEST_CARD_NUMBERS.includes(details.cardNumber?.replace(/\s/g, "")))
      errors.cardNumber = "Enter one of the example test card numbers.";
    if (details.expiry !== TEST_CARD_EXPIRY)
      errors.expiry = `Use the test expiry ${TEST_CARD_EXPIRY}.`;
    if (details.securityCode !== TEST_CARD_SECURITY_CODE)
      errors.securityCode = `Use the test security code ${TEST_CARD_SECURITY_CODE}.`;
  } else if (details.walletApproved !== true) {
    errors.walletApproval = `Approve the ${method.name} test payment first.`;
  }
  return errors;
}

export function createTestPaymentAuthorization(methodId, details) {
  const method = getPaymentMethod(methodId);
  if (Object.keys(validateTestPaymentDetails(method.id, details)).length)
    throw new Error("Complete your payment details or approval first.");
  // Only this method-specific flag crosses the simulation boundary.
  return Object.freeze({ method: method.id, approved: true });
}
