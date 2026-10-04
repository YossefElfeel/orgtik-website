import React, { useState } from "react";
import { PurchaseAction, PurchaseDialog } from "./PurchaseControls";
import {
  getPaymentMethod,
  normalizeTestPaymentInput,
  TEST_CARD_NUMBERS,
  TEST_CARD_EXPIRY,
  TEST_CARD_SECURITY_CODE,
  validateTestPaymentDetails,
} from "./purchase-payment.js";

export function PaymentDetails({
  methodId,
  details,
  onChange,
  errors,
  onErrors,
  processing,
  amount,
}) {
  const method = getPaymentMethod(methodId);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const ready = !Object.keys(validateTestPaymentDetails(methodId, details))
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
            [id]: validateTestPaymentDetails(methodId, details)[id],
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
      <legend>
        {methodId === "card" ? "Payment details" : `${method.name} approval`}
      </legend>
      {methodId === "card" ? (
        <>
          <p id="test-payment-notice" className="purchase-test-payment-note">
            Test mode. Use Visa <strong>4242 4242 4242 4242</strong> or
            Mastercard <strong>5555 5555 5555 4444</strong>, expiry{" "}
            <strong>12/30</strong>, and security code <strong>123</strong>. Real
            payment details are not accepted.
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
        </>
      ) : (
        <>
          <p id="test-payment-notice">
            {methodId === "twint"
              ? "In a live checkout, approve in the TWINT app or scan its QR code. Here you can preview that approval without opening the app."
              : "In a live checkout, sign in and approve with PayPal. Here you can preview that approval without entering PayPal credentials."}
          </p>
          <PurchaseAction
            secondary
            name="walletApproval"
            aria-describedby={
              errors.walletApproval
                ? "wallet-approval-error"
                : "test-payment-notice"
            }
            onClick={() => setApprovalOpen(true)}
          >
            {details.walletApproved
              ? `Review ${method.name} approval`
              : `Approve with ${method.name}`}
          </PurchaseAction>
          {errors.walletApproval && (
            <p className="purchase-error" id="wallet-approval-error">
              {errors.walletApproval}
            </p>
          )}
          <PurchaseDialog
            open={approvalOpen}
            title={`${method.name} approval`}
            onClose={() => setApprovalOpen(false)}
          >
            <p>
              OrgTik · <strong>{amount}</strong>
            </p>
            <p>
              This is a test approval. No payment is sent and no wallet
              credentials are requested.
            </p>
            <div className="purchase-dialog__actions">
              <PurchaseAction
                onClick={() => {
                  onChange({ walletApproved: true });
                  onErrors({ ...errors, walletApproval: undefined });
                  setApprovalOpen(false);
                }}
              >
                Approve test payment
              </PurchaseAction>
              <PurchaseAction
                secondary
                onClick={() => {
                  onChange({ walletApproved: false });
                  setApprovalOpen(false);
                }}
              >
                Cancel approval
              </PurchaseAction>
            </div>
          </PurchaseDialog>
        </>
      )}
      <p
        className={`purchase-payment-readiness${ready ? " purchase-payment-readiness--ready" : ""}`}
        role="status"
      >
        {ready
          ? methodId === "card"
            ? "Card details complete. You can pay below."
            : `${method.name} approved. You can pay below.`
          : methodId === "card"
            ? "Complete the payment details to enable Pay."
            : `Approve with ${method.name} to enable Pay.`}
      </p>
    </fieldset>
  );
}
