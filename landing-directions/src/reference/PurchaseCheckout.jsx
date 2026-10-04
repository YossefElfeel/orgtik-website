import React, {
  useState,
  useRef,
  useEffect,
  useSyncExternalStore,
} from "react";
import { CommerceLayout } from "./CommerceLayout";
import {
  useCart,
  completeCartPurchase,
  dismissCartNotice,
} from "./purchase-store.js";
import {
  quoteCart,
  money,
  termLabel,
  CRM_PORTAL_URL,
} from "./purchase-catalog.js";
import { QuoteSummary, PreviewNote, OrderContents } from "./PurchaseUI";
import { EmptyPurchaseCart } from "./PurchaseCart";
import { PurchaseAction, PurchaseDialog } from "./PurchaseControls";
import {
  simulatePayment,
  provisionCRM,
  validateCustomer,
  savePurchaseSession,
  loadPurchaseSession,
  clearPurchaseSession,
} from "./purchase-adapter.js";
import {
  getPreviewCustomer,
  subscribePreviewCustomer,
  signOutPreviewCustomer,
} from "./purchase-identity.js";
import {
  PAYMENT_METHODS,
  getPaymentMethod,
  validateTestPaymentDetails,
  createTestPaymentAuthorization,
} from "./purchase-payment.js";
import { PaymentDetails } from "./PaymentDetails";

function Confirmation({ order, crm, onCRM, verified, onRestart }) {
  const [busy, setBusy] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const heading = useRef(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  const retry = async () => {
    if (busy) return;
    setBusy(true);
    try {
      onCRM(await provisionCRM(order, { scenario: "ready", verified }));
    } finally {
      setBusy(false);
    }
  };
  let portal = null;
  try {
    const url = new URL(CRM_PORTAL_URL);
    if (url.protocol === "https:") portal = url.href;
  } catch {}
  return (
    <div className="purchase-confirmation">
      <section className="purchase-checkout-panel">
        <span className="purchase-confirmed">
          <i className="ph ph-check-circle" aria-hidden="true" /> Payment
          successful
        </span>
        <p className="purchase-caption">
          Test payment complete. No money was charged.
        </p>
        <h2 ref={heading} tabIndex={-1}>
          Access your customer account.
        </h2>
        <p>
          Order <strong>{order.reference}</strong> · {money(order.quote.total)}{" "}
          paid.
        </p>
        <p className="purchase-receipt-method">
          <i
            className={`ph ph-${getPaymentMethod(order.paymentMethod).icon}`}
            aria-hidden="true"
          />
          Payment method: {getPaymentMethod(order.paymentMethod).name}
        </p>
        <div className="purchase-alert" role="status">
          <strong>
            {crm.status === "ready"
              ? "Your account access is ready."
              : crm.status === "failed"
                ? "Payment succeeded. Account setup needs another try."
                : "Payment succeeded. We’re preparing account access."}
          </strong>
          <p>
            {crm.status === "ready"
              ? "View purchases, payments, and invoices in your OrgTik customer account."
              : "Your purchase is saved. You will not be asked to pay again."}
          </p>
        </div>
        <div className="purchase-confirmation-actions">
          {crm.status === "ready" ? (
            <PurchaseAction onClick={() => setHandoff(true)}>
              {crm.access === "verified-existing"
                ? "Go to my account"
                : "Set up my account"}
            </PurchaseAction>
          ) : (
            <PurchaseAction onClick={retry} disabled={busy}>
              {busy
                ? "Preparing account…"
                : crm.status === "failed"
                  ? "Retry account setup"
                  : "Check account setup"}
            </PurchaseAction>
          )}
          <button
            type="button"
            className="purchase-text-button"
            onClick={onRestart}
          >
            Continue browsing
          </button>
        </div>
        <p className="purchase-caption">
          Software activates after payment. Service periods begin after
          onboarding confirms activation in the CRM.
        </p>
      </section>
      <section className="purchase-checkout-panel">
        <h2>Your purchase</h2>
        <table className="purchase-receipt">
          <thead>
            <tr>
              <th>Package and duration</th>
              <th>Paid upfront</th>
            </tr>
          </thead>
          <tbody>
            {order.groups.flatMap((g) =>
              g.lines.map((line) => (
                <tr key={`${g.id}:${line.catalogId}`}>
                  <td>
                    {line.name}
                    <small>
                      {termLabel(line.months)} ·{" "}
                      {line.autoRenew ? "Auto-renewal on" : "Manual renewal"}
                    </small>
                    <small>
                      {line.activation === "active-preview"
                        ? "Active"
                        : "Awaiting onboarding — period not started"}
                    </small>
                    {line.autoRenew && (
                      <small>
                        Renews for {termLabel(line.months)} at{" "}
                        {money(line.total)}
                      </small>
                    )}
                  </td>
                  <td>
                    {money(line.total)}
                    <small>
                      {line.discount}% {line.reason} saving
                    </small>
                  </td>
                </tr>
              )),
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Total paid</th>
              <th>{money(order.quote.total)}</th>
            </tr>
          </tfoot>
        </table>
        <p>
          View invoices and payment history in your OrgTik customer account.
        </p>
      </section>
      <PurchaseDialog
        open={handoff}
        title="Your CRM account"
        onClose={() => setHandoff(false)}
      >
        <p>
          {verified || emailVerified
            ? "Your email is verified. Continue to your customer account to view purchases, payments, and invoices."
            : "Verify your email to securely access your customer account."}
        </p>
        {!verified && !emailVerified ? (
          <PurchaseAction onClick={() => setEmailVerified(true)}>
            Verify email
          </PurchaseAction>
        ) : portal ? (
          <PurchaseAction href={portal}>Continue to CRM</PurchaseAction>
        ) : (
          <div className="purchase-alert">
            Your purchase is saved. Customer portal access will be available
            once the account connection is configured.
          </div>
        )}
      </PurchaseDialog>
    </div>
  );
}
export default function PurchaseCheckout() {
  const { items } = useCart();
  const identity = useSyncExternalStore(
    subscribePreviewCustomer,
    getPreviewCustomer,
    getPreviewCustomer,
  );
  const [saved] = useState(() => (items.length ? null : loadPurchaseSession()));
  const [order, setOrder] = useState(saved?.order || null);
  const [crm, setCRM] = useState(
    saved?.crm || { status: "pending", access: "verification-required" },
  );
  const [customer, setCustomer] = useState(() =>
    identity ? { ...identity } : { name: "", email: "", company: "" },
  );
  const verified = !saved && !!identity && customer.email === identity.email;
  const guestDraft = useRef({ name: "", email: "", company: "" });
  const previousIdentity = useRef(identity);
  useEffect(() => {
    if (previousIdentity.current === identity) return;
    previousIdentity.current = identity;
    setCustomer(identity ? { ...identity } : { ...guestDraft.current });
    setErrors({});
  }, [identity]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const selectedMethod = paymentMethod ? getPaymentMethod(paymentMethod) : null;
  const paymentReady =
    !!selectedMethod &&
    !Object.keys(validateTestPaymentDetails(paymentMethod, paymentDetails))
      .length;
  const [outcome, setOutcome] = useState("success");
  const [crmScenario, setCRMScenario] = useState("ready");
  const [sessionSaved, setSessionSaved] = useState(true);
  const showTestControls =
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get("qa") === "1";
  const busy = useRef(false);
  const controller = useRef(null);
  const attempt = useRef(null);
  const approvalCart = useRef(items);
  const form = useRef(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (approvalCart.current === items) return;
    approvalCart.current = items;
    if (!order) {
      controller.current?.abort();
      attempt.current = null;
      setPaymentDetails({});
      setErrors({});
    }
  }, [items, order]);
  const updateCRM = (value) => {
    setCRM(value);
    if (order) setSessionSaved(savePurchaseSession(order, value));
  };
  const submit = async (event) => {
    event.preventDefault();
    if (busy.current) return;
    const problems = {
      ...validateCustomer(customer),
      ...(selectedMethod
        ? validateTestPaymentDetails(paymentMethod, paymentDetails)
        : { paymentMethod: "Choose a payment method." }),
    };
    setErrors(problems);
    setError("");
    if (Object.keys(problems).length) {
      const firstError = Object.keys(problems)[0];
      if (firstError === "paymentMethod")
        form.current?.querySelector('[name="paymentMethod"]')?.focus();
      else form.current?.elements[firstError]?.focus();
      return;
    }
    if (!quoteCart(items).valid) {
      setError("Return to the cart and review your selection.");
      return;
    }
    busy.current = true;
    setProcessing(true);
    controller.current = new AbortController();
    attempt.current ||= `ORG-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    try {
      const purchase = await simulatePayment({
        groups: items,
        customer,
        reference: attempt.current,
        paymentMethod,
        authorization: createTestPaymentAuthorization(
          paymentMethod,
          paymentDetails,
        ),
        outcome,
        signal: controller.current.signal,
      });
      const pending = {
        status: "pending",
        access: verified ? "verified-existing" : "verification-required",
      };
      setPaymentDetails({});
      setOrder(purchase);
      setCRM(pending);
      setSessionSaved(savePurchaseSession(purchase, pending));
      completeCartPurchase(purchase.groups.map((g) => g.id));
      dismissCartNotice();
      const setup = await provisionCRM(purchase, {
        scenario: crmScenario,
        verified,
        customer,
      });
      setCRM(setup);
      setSessionSaved(savePurchaseSession(purchase, setup));
    } catch (problem) {
      if (paymentMethod !== "card") setPaymentDetails({});
      setError(
        problem.message === "cancelled"
          ? "Payment cancelled. Your cart has been kept."
          : problem.message,
      );
    } finally {
      busy.current = false;
      setProcessing(false);
    }
  };
  const field = (id, label, type = "text", required = true) => (
    <label key={id}>
      {label}
      {required ? " *" : " (optional)"}
      <input
        name={id}
        type={type}
        maxLength={id === "email" ? 254 : 200}
        autoComplete={id === "company" ? "organization" : id}
        value={customer[id]}
        readOnly={verified && id === "email"}
        onChange={(e) => {
          setCustomer({ ...customer, [id]: e.target.value });
        }}
        required={required}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `payment-${id}-error` : undefined}
      />
      {errors[id] && (
        <span className="purchase-error" id={`payment-${id}-error`}>
          {errors[id]}
        </span>
      )}
    </label>
  );
  return (
    <CommerceLayout checkout complete={!!order}>
      <div className="purchase-surface">
        <div className="commerce-intro">
          <span className="purchase-eyebrow">
            {order ? "Your purchase" : "The next step"}
          </span>
          <h1>{order ? "Purchase confirmed." : "Checkout."}</h1>
          <p>
            {order
              ? "Your payment is complete. Continue to your account for purchases, payments, and invoices."
              : "Review your order and complete your payment."}
          </p>
        </div>
        {!sessionSaved && (
          <p className="purchase-alert">
            This browser cannot retain your receipt. Keep this tab open to
            review your confirmation.
          </p>
        )}
        {order ? (
          <Confirmation
            order={order}
            crm={crm}
            onCRM={updateCRM}
            verified={verified}
            onRestart={() => {
              clearPurchaseSession();
              window.__orgNav?.("/plans");
            }}
          />
        ) : !items.length ? (
          <EmptyPurchaseCart />
        ) : (
          <div className="purchase-layout purchase-checkout-layout">
            <details className="purchase-mobile-order">
              <summary>
                <span>
                  Review your order ·{" "}
                  {items.reduce((n, g) => n + g.lines.length, 0)} items
                  <strong>{money(quoteCart(items).total)} due today</strong>
                </span>
                <i className="ph ph-caret-down" aria-hidden="true" />
              </summary>
              <OrderContents groups={items} />
              <p>
                Full selected periods paid upfront. You save{" "}
                {money(quoteCart(items).saving)}. Tax is not calculated.
              </p>
              <a href="/cart">Edit your selection</a>
            </details>
            <section className="purchase-checkout-panel">
              <form
                ref={form}
                onSubmit={submit}
                noValidate
                aria-busy={processing}
              >
                <div className="purchase-checkout-identity">
                  <div>
                    <strong>
                      {verified
                        ? `Signed in as ${identity.name || identity.email}`
                        : "Guest checkout"}
                    </strong>
                    {verified && <span>{identity.email}</span>}
                  </div>
                  {verified && (
                    <button
                      type="button"
                      disabled={processing}
                      onClick={() => {
                        signOutPreviewCustomer();
                        setCustomer({ ...guestDraft.current });
                        setErrors({});
                      }}
                    >
                      Sign out
                    </button>
                  )}
                </div>
                <h2>Billing details</h2>
                <p>
                  {verified
                    ? "Your purchase will be linked to your OrgTik customer account."
                    : "Your purchase includes an OrgTik customer account where you can view purchases, payments, and invoices. Account access is set up after payment."}
                </p>
                <fieldset
                  disabled={processing}
                  className="purchase-billing-fields"
                >
                  <div className="purchase-fields">
                    {field("name", "Full name")}
                    {field("email", "Email address", "email")}
                    <details className="purchase-company">
                      <summary>Add company details (optional)</summary>
                      {field("company", "Company", "text", false)}
                    </details>
                  </div>
                </fieldset>
                <fieldset
                  className="purchase-payment-methods"
                  disabled={processing}
                  aria-describedby="purchase-payment-disclosure"
                >
                  <legend>Payment method</legend>
                  <div className="purchase-payment-options">
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        className="purchase-payment-option"
                        key={method.id}
                        data-selected={paymentMethod === method.id}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => {
                            if (method.id === paymentMethod) return;
                            setPaymentMethod(method.id);
                            setPaymentDetails({});
                            setErrors({});
                            setError("");
                          }}
                          aria-label={method.name}
                          aria-describedby={`purchase-method-${method.id}-description`}
                        />
                        <i
                          className={`ph ph-${method.icon}`}
                          aria-hidden="true"
                        />
                        <span>
                          <strong>{method.name}</strong>
                          <small
                            id={`purchase-method-${method.id}-description`}
                          >
                            {method.description}
                          </small>
                        </span>
                      </label>
                    ))}
                  </div>
                  {selectedMethod && (
                    <p className="purchase-payment-guidance" role="status">
                      {selectedMethod.guidance}
                    </p>
                  )}
                </fieldset>
                {selectedMethod && (
                  <PaymentDetails
                    key={paymentMethod}
                    methodId={paymentMethod}
                    details={paymentDetails}
                    onChange={setPaymentDetails}
                    errors={errors}
                    onErrors={setErrors}
                    processing={processing}
                    amount={money(quoteCart(items).total)}
                  />
                )}
                <div className="purchase-payment-total">
                  <span>Due today</span>
                  <strong>{money(quoteCart(items).total)}</strong>
                </div>
                <p
                  id="purchase-payment-disclosure"
                  className="purchase-payment-disclosure"
                >
                  No charge is made in this environment.
                </p>
                {error && (
                  <p className="purchase-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={
                    processing || !quoteCart(items).valid || !paymentReady
                  }
                  className="commerce-action purchase-action"
                >
                  <span>
                    {processing && selectedMethod
                      ? `Processing ${selectedMethod.name} payment…`
                      : `Pay ${money(quoteCart(items).total)}`}
                  </span>
                  <span className="commerce-action__arrow">
                    <i className="ph ph-lock-simple" aria-hidden="true" />
                  </span>
                </button>
                <span className="purchase-sr-only" role="status">
                  {processing ? "Processing payment. Please wait." : ""}
                </span>
                {processing && (
                  <button
                    type="button"
                    className="purchase-text-button"
                    onClick={() => controller.current?.abort()}
                  >
                    Cancel payment
                  </button>
                )}
                {!quoteCart(items).valid && (
                  <p className="purchase-error">
                    Your selection needs review.{" "}
                    <a href="/cart">Return to cart</a>.
                  </p>
                )}
                {showTestControls && (
                  <details className="purchase-demo-controls">
                    <summary>Preview payment and account states</summary>
                    <div className="purchase-fields">
                      <label>
                        Payment result
                        <select
                          disabled={processing}
                          value={outcome}
                          onChange={(e) => setOutcome(e.target.value)}
                        >
                          <option value="success">Successful payment</option>
                          <option value="declined">Declined payment</option>
                          <option value="cancelled">Cancelled payment</option>
                        </select>
                      </label>
                      <label>
                        CRM setup result
                        <select
                          disabled={processing}
                          value={crmScenario}
                          onChange={(e) => setCRMScenario(e.target.value)}
                        >
                          <option value="ready">Account ready</option>
                          <option value="pending">Setup pending</option>
                          <option value="failed">Setup failed</option>
                        </select>
                      </label>
                    </div>
                  </details>
                )}
              </form>
            </section>
            <QuoteSummary groups={items} title="Your order">
              <OrderContents groups={items} />
              <a href="/cart">Edit your selection</a>
            </QuoteSummary>
          </div>
        )}
        <PreviewNote />
      </div>
    </CommerceLayout>
  );
}
