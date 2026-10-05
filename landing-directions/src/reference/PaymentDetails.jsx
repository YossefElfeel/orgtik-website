import React from "react";
import {
  normalizeTestPaymentInput,
  TEST_CARD_NUMBERS,
  TEST_CARD_EXPIRY,
  TEST_CARD_SECURITY_CODE,
  validateTestPaymentDetails,
} from "./purchase-payment.js";

export function PaymentDetails({
  details,
  onChange,
  errors,
  onErrors,
  processing,
}) {
  const ready = !Object.keys(validateTestPaymentDetails("card", details))
    .length;
  const cardField = (id, label, placeholder, length) => (
    <label key={id}>
      {label} *
      <input
        name={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={length}
        placeholder={placeholder}
        value={details[id] || ""}
        required
        aria-label={`${label} *`}
        aria-invalid={!!errors[id]}
        aria-describedby={`test-payment-notice${errors[id] ? ` ${id}-error` : ""}`}
        onChange={(event) => {
          const value = normalizeTestPaymentInput(id, event.target.value);
          if (value === null) {
            event.target.value = details[id] || "";
            onErrors({
              ...errors,
              [id]: "Only the example test details are accepted.",
            });
            return;
          }
          onChange({ ...details, [id]: value });
          onErrors({ ...errors, [id]: undefined });
        }}
        onBlur={() =>
          onErrors({
            ...errors,
            [id]: validateTestPaymentDetails("card", details)[id],
          })
        }
      />
      {errors[id] && (
        <span className="purchase-error" id={`${id}-error`}>
          {errors[id]}
        </span>
      )}
    </label>
  );
  return (
    <fieldset className="purchase-payment-details" disabled={processing}>
      <legend>Payment details</legend>
      <p id="test-payment-notice" className="purchase-test-payment-note">
        Test mode. Use Visa <strong>4242 4242 4242 4242</strong> or Mastercard{" "}
        <strong>5555 5555 5555 4444</strong>, expiry <strong>12/30</strong>, and
        security code <strong>123</strong>. Real payment details are not
        accepted.
      </p>
      <div className="purchase-fields purchase-card-fields">
        {cardField("cardNumber", "Card number", "4242 4242 4242 4242", 19)}
        {cardField("expiry", "Expiry (MM/YY)", "12/30", 5)}
        {cardField("securityCode", "Security code", "123", 3)}
      </div>
      <button
        type="button"
        className="purchase-text-button"
        onClick={() => {
          onChange({
            cardNumber: TEST_CARD_NUMBERS[0].replace(/(.{4})(?=.)/g, "$1 "),
            expiry: TEST_CARD_EXPIRY,
            securityCode: TEST_CARD_SECURITY_CODE,
          });
          onErrors({
            ...errors,
            cardNumber: undefined,
            expiry: undefined,
            securityCode: undefined,
          });
        }}
      >
        Use example Visa details
      </button>
      <p
        className={`purchase-payment-readiness${ready ? " purchase-payment-readiness--ready" : ""}`}
        role="status"
      >
        {ready
          ? "Card details complete. You can pay below."
          : "Complete the payment details to enable Pay."}
      </p>
    </fieldset>
  );
}
