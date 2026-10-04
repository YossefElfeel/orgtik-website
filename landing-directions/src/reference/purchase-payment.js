// Available choices in the local simulation; production methods come from the payment backend.
export const PAYMENT_METHODS = Object.freeze([
  Object.freeze({
    id: "card",
    name: "Card",
    description: "Visa or Mastercard",
    icon: "credit-card",
    guidance:
      "Visa and Mastercard payments are simulated here. No card details are required.",
  }),
  Object.freeze({
    id: "twint",
    name: "TWINT",
    description: "Mobile payment",
    icon: "device-mobile",
    guidance:
      "TWINT approval is simulated here. You don’t need to open the app.",
  }),
  Object.freeze({
    id: "paypal",
    name: "PayPal",
    description: "PayPal account",
    icon: "wallet",
    guidance:
      "PayPal approval is simulated here. No PayPal sign-in is required.",
  }),
]);

export function getPaymentMethod(id = "card") {
  const method = PAYMENT_METHODS.find((option) => option.id === id);
  if (!method) throw new Error("Choose an available payment method.");
  return method;
}
